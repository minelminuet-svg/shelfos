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
Object.defineProperty(exports, "__esModule", { value: true });
exports.PurchaseOrdersController = exports.SuppliersController = void 0;
const common_1 = require("@nestjs/common");
const controllers_1 = require("../controllers");
let SuppliersController = class SuppliersController {
    constructor() {
        this.controller = new controllers_1.SupplierController();
    }
    async getSuppliers(req) {
        return this.controller.getSuppliers(req.organizationId);
    }
    async createSupplier(data, req) {
        return this.controller.createSupplier(req.organizationId, data);
    }
};
exports.SuppliersController = SuppliersController;
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], SuppliersController.prototype, "getSuppliers", null);
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], SuppliersController.prototype, "createSupplier", null);
exports.SuppliersController = SuppliersController = __decorate([
    (0, common_1.Controller)('api/suppliers')
], SuppliersController);
let PurchaseOrdersController = class PurchaseOrdersController {
    constructor() {
        this.controller = new controllers_1.PurchaseOrderController();
    }
    async getPurchaseOrders(req) {
        return this.controller.getPurchaseOrders(req.organizationId);
    }
    async getPurchaseOrder(id, req) {
        return this.controller.getPurchaseOrder(req.organizationId, id);
    }
    async createPurchaseOrder(data, req) {
        return this.controller.createPurchaseOrder(req.organizationId, data);
    }
};
exports.PurchaseOrdersController = PurchaseOrdersController;
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], PurchaseOrdersController.prototype, "getPurchaseOrders", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], PurchaseOrdersController.prototype, "getPurchaseOrder", null);
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], PurchaseOrdersController.prototype, "createPurchaseOrder", null);
exports.PurchaseOrdersController = PurchaseOrdersController = __decorate([
    (0, common_1.Controller)('api/purchase-orders')
], PurchaseOrdersController);
