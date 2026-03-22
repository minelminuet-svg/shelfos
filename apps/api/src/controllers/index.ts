import { BadRequestException, NotFoundException } from '@nestjs/common';
import prisma from '../utils/prisma';
import {
  CreateProductDto,
  CreatePurchaseOrderDto,
  CreateSupplierDto,
  UpdateAlertStatusDto,
  UpdateProductDto,
  UpdatePurchaseOrderDto,
} from '../dtos';

function roundCurrency(value: number) {
  return Number(value.toFixed(2));
}

function buildPurchaseOrderNumber() {
  const timestamp = new Date().toISOString().replace(/\D/g, '').slice(0, 14);
  const suffix = Math.floor(Math.random() * 900 + 100);
  return `PO-${timestamp}-${suffix}`;
}

export class ProductController {
  async createProduct(organizationId: string, data: CreateProductDto) {
    return prisma.product.create({
      data: {
        ...data,
        organizationId,
      },
    });
  }

  async getProducts(organizationId: string) {
    return prisma.product.findMany({
      where: { organizationId },
      include: {
        suppliers: {
          include: {
            supplier: {
              select: {
                id: true,
                name: true,
                code: true,
              },
            },
          },
        },
      },
      orderBy: [{ name: 'asc' }],
    });
  }

  async getProduct(organizationId: string, productId: string) {
    const product = await prisma.product.findFirst({
      where: {
        organizationId,
        id: productId,
      },
    });

    if (!product) {
      throw new NotFoundException('Product not found.');
    }

    return product;
  }

  async updateProduct(organizationId: string, productId: string, data: UpdateProductDto) {
    const product = await prisma.product.findFirst({
      where: {
        organizationId,
        id: productId,
      },
      select: { id: true },
    });

    if (!product) {
      throw new NotFoundException('Product not found.');
    }

    return prisma.product.update({
      where: { id: product.id },
      data,
    });
  }
}

export class SupplierController {
  async createSupplier(organizationId: string, data: CreateSupplierDto) {
    return prisma.supplier.create({
      data: {
        ...data,
        organizationId,
      },
    });
  }

  async getSuppliers(organizationId: string) {
    return prisma.supplier.findMany({
      where: { organizationId },
      include: {
        products: {
          include: {
            product: {
              select: {
                id: true,
                name: true,
                sku: true,
              },
            },
          },
          orderBy: [{ isPreferred: 'desc' }, { product: { name: 'asc' } }],
        },
      },
      orderBy: [{ name: 'asc' }],
    });
  }
}

export class PurchaseOrderController {
  async createPurchaseOrder(organizationId: string, data: CreatePurchaseOrderDto) {
    const supplier = await prisma.supplier.findFirst({
      where: {
        id: data.supplierId,
        organizationId,
      },
      select: { id: true },
    });

    if (!supplier) {
      throw new NotFoundException('Supplier not found.');
    }

    const productIds = [...new Set(data.lineItems.map((item) => item.productId))];
    const products = await prisma.product.findMany({
      where: {
        organizationId,
        id: { in: productIds },
      },
      select: { id: true },
    });

    if (products.length !== productIds.length) {
      throw new BadRequestException('One or more purchase-order items reference unknown products.');
    }

    const lineItems = data.lineItems.map((item) => ({
      ...item,
      lineTotal: roundCurrency(item.quantity * item.unitPrice),
    }));

    const totalAmount = roundCurrency(
      lineItems.reduce((sum, item) => sum + item.lineTotal, 0),
    );

    return prisma.purchaseOrder.create({
      data: {
        orderNumber: buildPurchaseOrderNumber(),
        status: 'draft',
        supplierId: data.supplierId,
        organizationId,
        totalAmount,
        lineItems: {
          create: lineItems,
        },
      },
      include: {
        lineItems: {
          include: { product: true },
        },
        supplier: true,
      },
    });
  }

  async getPurchaseOrders(organizationId: string) {
    return prisma.purchaseOrder.findMany({
      where: { organizationId },
      include: {
        supplier: true,
        lineItems: {
          include: { product: true },
        },
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  async getPurchaseOrder(organizationId: string, poId: string) {
    const purchaseOrder = await prisma.purchaseOrder.findFirst({
      where: {
        organizationId,
        id: poId,
      },
      include: {
        supplier: true,
        lineItems: {
          include: { product: true },
        },
      },
    });

    if (!purchaseOrder) {
      throw new NotFoundException('Purchase order not found.');
    }

    return purchaseOrder;
  }

  async updatePurchaseOrder(
    organizationId: string,
    poId: string,
    data: UpdatePurchaseOrderDto,
  ) {
    const purchaseOrder = await prisma.purchaseOrder.findFirst({
      where: {
        organizationId,
        id: poId,
      },
      select: { id: true },
    });

    if (!purchaseOrder) {
      throw new NotFoundException('Purchase order not found.');
    }

    return prisma.purchaseOrder.update({
      where: { id: purchaseOrder.id },
      data,
    });
  }
}

export class AlertController {
  async getAlerts(organizationId: string, status?: string) {
    return prisma.alert.findMany({
      where: {
        organizationId,
        ...(status && { status }),
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  async updateAlertStatus(
    organizationId: string,
    alertId: string,
    data: UpdateAlertStatusDto,
  ) {
    const alert = await prisma.alert.findFirst({
      where: {
        organizationId,
        id: alertId,
      },
      select: { id: true },
    });

    if (!alert) {
      throw new NotFoundException('Alert not found.');
    }

    return prisma.alert.update({
      where: { id: alert.id },
      data: { status: data.status },
    });
  }
}
