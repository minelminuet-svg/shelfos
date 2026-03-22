import { CreateSupplierDto, CreatePurchaseOrderDto } from '../dtos';
export declare class SuppliersController {
    private controller;
    getSuppliers(req: any): Promise<({
        products: ({
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
        } & {
            id: string;
            supplierId: string;
            productId: string;
            isPreferred: boolean;
            leadDays: number;
            createdAt: Date;
        })[];
    } & {
        id: string;
        name: string;
        code: string;
        email: string | null;
        phone: string | null;
        organizationId: string;
        createdAt: Date;
        updatedAt: Date;
    })[]>;
    createSupplier(data: CreateSupplierDto, req: any): Promise<{
        id: string;
        name: string;
        code: string;
        email: string | null;
        phone: string | null;
        organizationId: string;
        createdAt: Date;
        updatedAt: Date;
    }>;
}
export declare class PurchaseOrdersController {
    private controller;
    getPurchaseOrders(req: any): Promise<({
        supplier: {
            id: string;
            name: string;
            code: string;
            email: string | null;
            phone: string | null;
            organizationId: string;
            createdAt: Date;
            updatedAt: Date;
        };
        lineItems: ({
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
        } & {
            id: string;
            purchaseOrderId: string;
            productId: string;
            quantity: number;
            unitPrice: import("@prisma/client/runtime/library").Decimal;
            lineTotal: import("@prisma/client/runtime/library").Decimal;
            createdAt: Date;
        })[];
    } & {
        id: string;
        orderNumber: string;
        status: string;
        supplierId: string;
        organizationId: string;
        totalAmount: import("@prisma/client/runtime/library").Decimal;
        sentAt: Date | null;
        receivedAt: Date | null;
        createdAt: Date;
        updatedAt: Date;
    })[]>;
    getPurchaseOrder(id: string, req: any): Promise<({
        supplier: {
            id: string;
            name: string;
            code: string;
            email: string | null;
            phone: string | null;
            organizationId: string;
            createdAt: Date;
            updatedAt: Date;
        };
        lineItems: ({
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
        } & {
            id: string;
            purchaseOrderId: string;
            productId: string;
            quantity: number;
            unitPrice: import("@prisma/client/runtime/library").Decimal;
            lineTotal: import("@prisma/client/runtime/library").Decimal;
            createdAt: Date;
        })[];
    } & {
        id: string;
        orderNumber: string;
        status: string;
        supplierId: string;
        organizationId: string;
        totalAmount: import("@prisma/client/runtime/library").Decimal;
        sentAt: Date | null;
        receivedAt: Date | null;
        createdAt: Date;
        updatedAt: Date;
    }) | null>;
    createPurchaseOrder(data: CreatePurchaseOrderDto, req: any): Promise<{
        supplier: {
            id: string;
            name: string;
            code: string;
            email: string | null;
            phone: string | null;
            organizationId: string;
            createdAt: Date;
            updatedAt: Date;
        };
        lineItems: {
            id: string;
            purchaseOrderId: string;
            productId: string;
            quantity: number;
            unitPrice: import("@prisma/client/runtime/library").Decimal;
            lineTotal: import("@prisma/client/runtime/library").Decimal;
            createdAt: Date;
        }[];
    } & {
        id: string;
        orderNumber: string;
        status: string;
        supplierId: string;
        organizationId: string;
        totalAmount: import("@prisma/client/runtime/library").Decimal;
        sentAt: Date | null;
        receivedAt: Date | null;
        createdAt: Date;
        updatedAt: Date;
    }>;
}
