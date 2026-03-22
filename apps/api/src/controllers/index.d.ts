import { CreateProductDto, CreateSupplierDto, CreatePurchaseOrderDto } from '../dtos';
export declare class ProductController {
    createProduct(organizationId: string, data: CreateProductDto): Promise<{
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
    }>;
    getProducts(organizationId: string): Promise<({
        suppliers: ({
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
    })[]>;
    getProduct(organizationId: string, productId: string): Promise<{
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
    } | null>;
    updateProduct(organizationId: string, productId: string, data: any): Promise<any>;
}
export declare class SupplierController {
    createSupplier(organizationId: string, data: CreateSupplierDto): Promise<{
        id: string;
        name: string;
        code: string;
        email: string | null;
        phone: string | null;
        organizationId: string;
        createdAt: Date;
        updatedAt: Date;
    }>;
    getSuppliers(organizationId: string): Promise<({
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
}
export declare class PurchaseOrderController {
    createPurchaseOrder(organizationId: string, data: CreatePurchaseOrderDto): Promise<{
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
    getPurchaseOrders(organizationId: string): Promise<({
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
    getPurchaseOrder(organizationId: string, poId: string): Promise<({
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
    updatePurchaseOrder(organizationId: string, poId: string, data: any): Promise<any>;
}
export declare class AlertController {
    getAlerts(organizationId: string, status?: string): Promise<{
        id: string;
        type: string;
        severity: string;
        status: string;
        productId: string | null;
        organizationId: string;
        message: string;
        data: string | null;
        createdAt: Date;
        updatedAt: Date;
    }[]>;
    updateAlertStatus(organizationId: string, alertId: string, status: string): Promise<any>;
}
