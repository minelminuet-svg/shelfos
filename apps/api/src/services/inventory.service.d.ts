import { CreateStockMovementDto } from '../dtos';
export declare class InventoryService {
    createStockMovement(organizationId: string, data: CreateStockMovementDto): Promise<{
        product: {
            id: string;
            sku: string;
            name: string;
            barcode: string | null;
            category: string | null;
            brand: string | null;
            price: import("@prisma/client/runtime/library").Decimal;
            reorderPoint: number;
            reorderQty: number;
            organizationId: string;
            createdAt: Date;
            updatedAt: Date;
        };
        location: {
            id: string;
            name: string;
            code: string;
            type: string;
            organizationId: string;
            createdAt: Date;
            updatedAt: Date;
        };
    } & {
        id: string;
        type: string;
        quantity: number;
        notes: string | null;
        organizationId: string;
        productId: string;
        inventoryLocationId: string;
        fromLocationId: string | null;
        storeId: string | null;
        purchaseOrderId: string | null;
        createdAt: Date;
    }>;
    getInventoryBalance(organizationId: string, productId?: string): Promise<({
        product: {
            id: string;
            sku: string;
            name: string;
            barcode: string | null;
            category: string | null;
            brand: string | null;
            price: import("@prisma/client/runtime/library").Decimal;
            reorderPoint: number;
            reorderQty: number;
            organizationId: string;
            createdAt: Date;
            updatedAt: Date;
        };
        location: {
            id: string;
            name: string;
            code: string;
            type: string;
            organizationId: string;
            createdAt: Date;
            updatedAt: Date;
        };
    } & {
        id: string;
        quantity: number;
        organizationId: string;
        productId: string;
        inventoryLocationId: string;
        createdAt: Date;
        updatedAt: Date;
    })[]>;
    getStockMovements(organizationId: string, limit?: number, offset?: number): Promise<({
        product: {
            id: string;
            sku: string;
            name: string;
            barcode: string | null;
            category: string | null;
            brand: string | null;
            price: import("@prisma/client/runtime/library").Decimal;
            reorderPoint: number;
            reorderQty: number;
            organizationId: string;
            createdAt: Date;
            updatedAt: Date;
        };
        location: {
            id: string;
            name: string;
            code: string;
            type: string;
            organizationId: string;
            createdAt: Date;
            updatedAt: Date;
        };
    } & {
        id: string;
        type: string;
        quantity: number;
        notes: string | null;
        organizationId: string;
        productId: string;
        inventoryLocationId: string;
        fromLocationId: string | null;
        storeId: string | null;
        purchaseOrderId: string | null;
        createdAt: Date;
    })[]>;
}
