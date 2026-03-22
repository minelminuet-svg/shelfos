import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { ProductsController } from './routes/products.controller';
import { SuppliersController, PurchaseOrdersController } from './routes/suppliers.controller';
import { InventoryController } from './routes/inventory.controller';
import { AlertsController } from './routes/alerts.controller';
import { DashboardController } from './routes/dashboard.controller';
import { OrganizationMiddleware } from './middleware/organization.middleware';

@Module({
  imports: [],
  controllers: [
    ProductsController,
    SuppliersController,
    PurchaseOrdersController,
    InventoryController,
    AlertsController,
    DashboardController,
  ],
  providers: [],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(OrganizationMiddleware).forRoutes({
      path: '*',
      method: RequestMethod.ALL,
    });
  }
}
