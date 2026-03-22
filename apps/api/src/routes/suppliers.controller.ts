import { Body, Controller, Get, Param, Post, Req } from '@nestjs/common';
import { PurchaseOrderController, SupplierController } from '../controllers';
import { CreatePurchaseOrderDto, CreateSupplierDto } from '../dtos';
import { OrganizationRequest } from '../types/organization-request';

@Controller('suppliers')
export class SuppliersController {
  private controller = new SupplierController();

  @Get()
  async getSuppliers(@Req() req: OrganizationRequest) {
    return this.controller.getSuppliers(req.organizationId);
  }

  @Post()
  async createSupplier(@Body() data: CreateSupplierDto, @Req() req: OrganizationRequest) {
    return this.controller.createSupplier(req.organizationId, data);
  }
}

@Controller('purchase-orders')
export class PurchaseOrdersController {
  private controller = new PurchaseOrderController();

  @Get()
  async getPurchaseOrders(@Req() req: OrganizationRequest) {
    return this.controller.getPurchaseOrders(req.organizationId);
  }

  @Get(':id')
  async getPurchaseOrder(@Param('id') id: string, @Req() req: OrganizationRequest) {
    return this.controller.getPurchaseOrder(req.organizationId, id);
  }

  @Post()
  async createPurchaseOrder(
    @Body() data: CreatePurchaseOrderDto,
    @Req() req: OrganizationRequest,
  ) {
    return this.controller.createPurchaseOrder(req.organizationId, data);
  }
}
