import { Body, Controller, Get, Param, Post, Req } from '@nestjs/common';
import { ProductController } from '../controllers';
import { CreateProductDto } from '../dtos';
import { OrganizationRequest } from '../types/organization-request';

@Controller('products')
export class ProductsController {
  private controller = new ProductController();

  @Get()
  async getProducts(@Req() req: OrganizationRequest) {
    return this.controller.getProducts(req.organizationId);
  }

  @Get(':id')
  async getProduct(@Param('id') id: string, @Req() req: OrganizationRequest) {
    return this.controller.getProduct(req.organizationId, id);
  }

  @Post()
  async createProduct(@Body() data: CreateProductDto, @Req() req: OrganizationRequest) {
    return this.controller.createProduct(req.organizationId, data);
  }
}
