import {
  Body,
  Controller,
  DefaultValuePipe,
  Get,
  ParseIntPipe,
  Post,
  Query,
  Req,
} from '@nestjs/common';
import { CreateStockMovementDto } from '../dtos';
import { InventoryService } from '../services/inventory.service';
import { OrganizationRequest } from '../types/organization-request';

const inventoryService = new InventoryService();

@Controller('inventory')
export class InventoryController {
  @Get('balances')
  async getBalances(
    @Req() req: OrganizationRequest,
    @Query('productId') productId?: string,
  ) {
    return inventoryService.getInventoryBalance(req.organizationId, productId);
  }

  @Get('movements')
  async getMovements(
    @Req() req: OrganizationRequest,
    @Query('limit', new DefaultValuePipe(100), ParseIntPipe) limit = 100,
    @Query('offset', new DefaultValuePipe(0), ParseIntPipe) offset = 0,
  ) {
    return inventoryService.getStockMovements(req.organizationId, limit, offset);
  }

  @Post('movements')
  async createMovement(@Body() data: CreateStockMovementDto, @Req() req: OrganizationRequest) {
    return inventoryService.createStockMovement(req.organizationId, data);
  }
}
