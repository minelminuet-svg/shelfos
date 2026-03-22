"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.InventoryService = void 0;
const prisma_1 = __importDefault(require("../utils/prisma"));
class InventoryService {
    async createStockMovement(organizationId, data) {
        // Create stock movement record
        const movement = await prisma_1.default.stockMovement.create({
            data: {
                type: data.type,
                quantity: data.quantity,
                notes: data.notes,
                organizationId,
                productId: data.productId,
                inventoryLocationId: data.inventoryLocationId,
                fromLocationId: data.fromLocationId,
            },
            include: {
                product: true,
                location: true,
            },
        });
        // Update inventory balance
        const balance = await prisma_1.default.inventoryBalance.findUnique({
            where: {
                organizationId_productId_inventoryLocationId: {
                    organizationId,
                    productId: data.productId,
                    inventoryLocationId: data.inventoryLocationId,
                },
            },
        });
        if (balance) {
            await prisma_1.default.inventoryBalance.update({
                where: { id: balance.id },
                data: {
                    quantity: balance.quantity + data.quantity,
                },
            });
        }
        else {
            await prisma_1.default.inventoryBalance.create({
                data: {
                    quantity: data.quantity,
                    organizationId,
                    productId: data.productId,
                    inventoryLocationId: data.inventoryLocationId,
                },
            });
        }
        // Check if we need to create an alert
        const product = await prisma_1.default.product.findUnique({
            where: { id: data.productId },
        });
        if (product && balance) {
            const newQuantity = balance.quantity + data.quantity;
            if (newQuantity <= product.reorderPoint && newQuantity > 0) {
                await prisma_1.default.alert.create({
                    data: {
                        type: 'low_stock',
                        severity: 'warning',
                        status: 'open',
                        organizationId,
                        message: `Product "${product.name}" is at ${newQuantity} units (reorder point: ${product.reorderPoint})`,
                        data: JSON.stringify({
                            productId: product.id,
                            currentStock: newQuantity,
                            reorderPoint: product.reorderPoint,
                        }),
                    },
                });
            }
        }
        return movement;
    }
    async getInventoryBalance(organizationId, productId) {
        return await prisma_1.default.inventoryBalance.findMany({
            where: {
                organizationId,
                ...(productId && { productId }),
            },
            include: {
                product: true,
                location: true,
            },
        });
    }
    async getStockMovements(organizationId, limit = 100, offset = 0) {
        return await prisma_1.default.stockMovement.findMany({
            where: { organizationId },
            include: {
                product: true,
                location: true,
            },
            orderBy: { createdAt: 'desc' },
            take: limit,
            skip: offset,
        });
    }
}
exports.InventoryService = InventoryService;
