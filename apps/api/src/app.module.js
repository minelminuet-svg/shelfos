"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const products_controller_1 = require("./routes/products.controller");
const suppliers_controller_1 = require("./routes/suppliers.controller");
const inventory_controller_1 = require("./routes/inventory.controller");
const alerts_controller_1 = require("./routes/alerts.controller");
const dashboard_controller_1 = require("./routes/dashboard.controller");
const organization_middleware_1 = require("./middleware/organization.middleware");
let AppModule = class AppModule {
    configure(consumer) {
        consumer.apply(organization_middleware_1.OrganizationMiddleware).forRoutes('api/*');
    }
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [],
        controllers: [
            products_controller_1.ProductsController,
            suppliers_controller_1.SuppliersController,
            suppliers_controller_1.PurchaseOrdersController,
            inventory_controller_1.InventoryController,
            alerts_controller_1.AlertsController,
            dashboard_controller_1.DashboardController,
        ],
        providers: [],
    })
], AppModule);
