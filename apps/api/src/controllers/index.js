"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AlertController = exports.PurchaseOrderController = exports.SupplierController = exports.ProductController = void 0;
const prisma_1 = __importDefault(require("../utils/prisma"));
class ProductController {
    async createProduct(organizationId, data) {
        return await prisma_1.default.product.create({
            data: {
                ...data,
                organizationId,
            },
        });
    }
    async getProducts(organizationId) {
        return await prisma_1.default.product.findMany({
            where: { organizationId },
            include: {
                suppliers: {
                    include: { supplier: true },
                },
            },
        });
    }
    async getProduct(organizationId, productId) {
        return await prisma_1.default.product.findFirst({
            where: {
                organizationId,
                id: productId,
            },
        });
    }
    async updateProduct(organizationId, productId, data) {
        return await prisma_1.default.product.updateMany({
            where: {
                organizationId,
                id: productId,
            },
            data,
        });
    }
}
exports.ProductController = ProductController;
class SupplierController {
    async createSupplier(organizationId, data) {
        return await prisma_1.default.supplier.create({
            data: {
                ...data,
                organizationId,
            },
        });
    }
    async getSuppliers(organizationId) {
        return await prisma_1.default.supplier.findMany({
            where: { organizationId },
            include: {
                products: {
                    include: { product: true },
                },
            },
        });
    }
}
exports.SupplierController = SupplierController;
class PurchaseOrderController {
    async createPurchaseOrder(organizationId, data) {
        let totalAmount = 0;
        for (const item of data.lineItems) {
            totalAmount += item.quantity * item.unitPrice;
        }
        const po = await prisma_1.default.purchaseOrder.create({
            data: {
                orderNumber: `PO-${Date.now()}`,
                status: 'draft',
                supplierId: data.supplierId,
                organizationId,
                totalAmount: totalAmount,
                lineItems: {
                    create: data.lineItems.map(item => ({
                        ...item,
                        lineTotal: item.quantity * item.unitPrice,
                    })),
                },
            },
            include: {
                lineItems: true,
                supplier: true,
            },
        });
        return po;
    }
    async getPurchaseOrders(organizationId) {
        return await prisma_1.default.purchaseOrder.findMany({
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
    async getPurchaseOrder(organizationId, poId) {
        return await prisma_1.default.purchaseOrder.findFirst({
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
    }
    async updatePurchaseOrder(organizationId, poId, data) {
        return await prisma_1.default.purchaseOrder.updateMany({
            where: {
                organizationId,
                id: poId,
            },
            data,
        });
    }
}
exports.PurchaseOrderController = PurchaseOrderController;
class AlertController {
    async getAlerts(organizationId, status) {
        return await prisma_1.default.alert.findMany({
            where: {
                organizationId,
                ...(status && { status }),
            },
            orderBy: { createdAt: 'desc' },
        });
    }
    async updateAlertStatus(organizationId, alertId, status) {
        return await prisma_1.default.alert.updateMany({
            where: {
                organizationId,
                id: alertId,
            },
            data: { status },
        });
    }
}
exports.AlertController = AlertController;
