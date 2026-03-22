import { Controller, Get, Req } from '@nestjs/common';
import prisma from '../utils/prisma';
import { OrganizationRequest } from '../types/organization-request';

@Controller('dashboard')
export class DashboardController {
  @Get('summary')
  async getSummary(@Req() req: OrganizationRequest) {
    const organizationId = req.organizationId;

    const [lowStockAlerts, openPOs, totalProducts, inventoryBalances] = await Promise.all([
      prisma.alert.count({
        where: { organizationId, status: 'open', type: 'low_stock' },
      }),
      prisma.purchaseOrder.count({
        where: {
          organizationId,
          status: { in: ['draft', 'sent'] },
        },
      }),
      prisma.product.count({
        where: { organizationId },
      }),
      prisma.inventoryBalance.findMany({
        where: { organizationId },
        include: { product: true },
      }),
    ]);

    const inventoryValue = inventoryBalances.reduce(
      (sum, item) => sum + item.quantity * Number(item.product.price),
      0,
    );

    return {
      lowStockAlerts,
      openPOs,
      totalProducts,
      inventoryValue,
    };
  }

  @Get('recent-movements')
  async getRecentMovements(@Req() req: OrganizationRequest) {
    return prisma.stockMovement.findMany({
      where: { organizationId: req.organizationId },
      include: { product: true, location: true, fromLocation: true },
      orderBy: { createdAt: 'desc' },
      take: 10,
    });
  }
}
