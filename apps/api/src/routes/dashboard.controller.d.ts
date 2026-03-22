export declare class DashboardController {
    getSummary(req: any): Promise<{
        lowStockAlerts: number;
        openPOs: number;
        totalProducts: number;
        inventoryValue: number;
    }>;
    getRecentMovements(req: any): Promise<({
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
