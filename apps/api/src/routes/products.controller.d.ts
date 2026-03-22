import { CreateProductDto } from '../dtos';
export declare class ProductsController {
    private controller;
    getProducts(req: any): Promise<({
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
    getProduct(id: string, req: any): Promise<{
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
    createProduct(data: CreateProductDto, req: any): Promise<{
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
}
