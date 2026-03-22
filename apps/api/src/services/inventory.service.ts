import { BadRequestException, NotFoundException } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { ALERT_SEVERITY, ALERT_STATUS, STOCK_MOVEMENT_TYPES } from '../constants';
import { CreateStockMovementDto } from '../dtos';
import prisma from '../utils/prisma';

type TransactionClient = Prisma.TransactionClient;

export class InventoryService {
  async createStockMovement(organizationId: string, data: CreateStockMovementDto) {
    const [product] = await Promise.all([
      this.getProductOrThrow(organizationId, data.productId),
      this.getLocationOrThrow(organizationId, data.inventoryLocationId),
    ]);

    if (data.type === STOCK_MOVEMENT_TYPES.TRANSFER) {
      if (!data.fromLocationId) {
        throw new BadRequestException('Transfer movements require a source location.');
      }

      if (data.fromLocationId === data.inventoryLocationId) {
        throw new BadRequestException('Transfer source and destination cannot match.');
      }

      if (data.quantity < 0) {
        throw new BadRequestException('Transfer quantity must be a positive integer.');
      }

      await this.getLocationOrThrow(organizationId, data.fromLocationId);
    }

    const movement = await prisma.$transaction(async (tx) => {
      if (data.type === STOCK_MOVEMENT_TYPES.TRANSFER) {
        await this.applyInventoryChange(
          tx,
          organizationId,
          data.productId,
          data.fromLocationId!,
          -Math.abs(data.quantity),
        );
        await this.applyInventoryChange(
          tx,
          organizationId,
          data.productId,
          data.inventoryLocationId,
          Math.abs(data.quantity),
        );
      } else {
        await this.applyInventoryChange(
          tx,
          organizationId,
          data.productId,
          data.inventoryLocationId,
          data.quantity,
        );
      }

      return tx.stockMovement.create({
        data: {
          type: data.type,
          quantity: data.type === STOCK_MOVEMENT_TYPES.TRANSFER
            ? Math.abs(data.quantity)
            : data.quantity,
          notes: data.notes,
          organizationId,
          productId: data.productId,
          inventoryLocationId: data.inventoryLocationId,
          fromLocationId: data.fromLocationId,
        },
        include: {
          product: true,
          location: true,
          fromLocation: true,
        },
      });
    });

    await this.syncLowStockAlert(organizationId, product.id);
    return movement;
  }

  async getInventoryBalance(organizationId: string, productId?: string) {
    return prisma.inventoryBalance.findMany({
      where: {
        organizationId,
        ...(productId && { productId }),
      },
      include: {
        product: true,
        location: true,
      },
      orderBy: [{ product: { name: 'asc' } }, { location: { name: 'asc' } }],
    });
  }

  async getStockMovements(organizationId: string, limit = 100, offset = 0) {
    return prisma.stockMovement.findMany({
      where: { organizationId },
      include: {
        product: true,
        location: true,
        fromLocation: true,
      },
      orderBy: { createdAt: 'desc' },
      take: limit,
      skip: offset,
    });
  }

  private async getProductOrThrow(organizationId: string, productId: string) {
    const product = await prisma.product.findFirst({
      where: {
        id: productId,
        organizationId,
      },
    });

    if (!product) {
      throw new NotFoundException('Product not found.');
    }

    return product;
  }

  private async getLocationOrThrow(organizationId: string, locationId: string) {
    const location = await prisma.inventoryLocation.findFirst({
      where: {
        id: locationId,
        organizationId,
      },
    });

    if (!location) {
      throw new NotFoundException('Inventory location not found.');
    }

    return location;
  }

  private async applyInventoryChange(
    tx: TransactionClient,
    organizationId: string,
    productId: string,
    inventoryLocationId: string,
    delta: number,
  ) {
    const balance = await tx.inventoryBalance.findUnique({
      where: {
        organizationId_productId_inventoryLocationId: {
          organizationId,
          productId,
          inventoryLocationId,
        },
      },
    });

    const nextQuantity = (balance?.quantity ?? 0) + delta;
    if (nextQuantity < 0) {
      throw new BadRequestException('Movement would result in negative inventory.');
    }

    if (balance) {
      return tx.inventoryBalance.update({
        where: { id: balance.id },
        data: { quantity: nextQuantity },
      });
    }

    return tx.inventoryBalance.create({
      data: {
        quantity: nextQuantity,
        organizationId,
        productId,
        inventoryLocationId,
      },
    });
  }

  private async syncLowStockAlert(organizationId: string, productId: string) {
    const [product, balances, existingAlert] = await Promise.all([
      prisma.product.findFirst({
        where: {
          id: productId,
          organizationId,
        },
      }),
      prisma.inventoryBalance.findMany({
        where: {
          organizationId,
          productId,
        },
        select: { quantity: true },
      }),
      prisma.alert.findFirst({
        where: {
          organizationId,
          type: 'low_stock',
          productId,
        },
        orderBy: { createdAt: 'desc' },
      }),
    ]);

    if (!product) {
      return;
    }

    const totalQuantity = balances.reduce((sum, balance) => sum + balance.quantity, 0);
    if (totalQuantity <= product.reorderPoint) {
      const severity = totalQuantity === 0 ? ALERT_SEVERITY.CRITICAL : ALERT_SEVERITY.WARNING;
      const message = `Product "${product.name}" has ${totalQuantity} units available across all locations (reorder point: ${product.reorderPoint}).`;
      const alertPayload = {
        type: 'low_stock',
        severity,
        status: ALERT_STATUS.OPEN,
        organizationId,
        productId,
        message,
        data: JSON.stringify({
          productId: product.id,
          currentStock: totalQuantity,
          reorderPoint: product.reorderPoint,
        }),
      };

      if (existingAlert) {
        await prisma.alert.update({
          where: { id: existingAlert.id },
          data: alertPayload,
        });
        return;
      }

      await prisma.alert.create({ data: alertPayload });
      return;
    }

    if (existingAlert && existingAlert.status !== ALERT_STATUS.RESOLVED) {
      await prisma.alert.update({
        where: { id: existingAlert.id },
        data: {
          status: ALERT_STATUS.RESOLVED,
          message: `Product "${product.name}" has recovered to ${totalQuantity} units.`,
        },
      });
    }
  }
}
