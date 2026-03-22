"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DashboardController = void 0;
const common_1 = require("@nestjs/common");
const prisma_1 = __importDefault(require("../utils/prisma"));
let DashboardController = class DashboardController {
    async getSummary(req) {
        const organizationId = req.organizationId;
        // Get key metrics
        const [lowStockAlerts, openPOs, totalProducts, totalInventoryValue] = await Promise.all([
            prisma_1.default.alert.count({
                where: { organizationId, status: 'open', severity: 'warning' },
            }),
            prisma_1.default.purchaseOrder.count({
                where: { organizationId, status: 'draft' },
            }),
            prisma_1.default.product.count({
                where: { organizationId },
            }),
            prisma_1.default.inventoryBalance.findMany({
                where: { organizationId },
                include: { product: true },
            }),
        ]);
        const inventoryValue = totalInventoryValue.reduce((sum, item) => sum + (item.quantity * Number(item.product.price)), 0);
        return {
            lowStockAlerts,
            openPOs,
            totalProducts,
            inventoryValue,
        };
    }
    async getRecentMovements(req) {
        return prisma_1.default.stockMovement.findMany({
            where: { organizationId: req.organizationId },
            include: { product: true, location: true },
            orderBy: { createdAt: 'desc' },
            take: 10,
        });
    }
};
exports.DashboardController = DashboardController;
__decorate([
    (0, common_1.Get)('summary'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], DashboardController.prototype, "getSummary", null);
__decorate([
    (0, common_1.Get)('recent-movements'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], DashboardController.prototype, "getRecentMovements", null);
exports.DashboardController = DashboardController = __decorate([
    (0, common_1.Controller)('api/dashboard')
], DashboardController);
