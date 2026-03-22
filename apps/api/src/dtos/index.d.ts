export interface CreateOrganizationDto {
    name: string;
    slug: string;
}
export interface UpdateOrganizationDto {
    name?: string;
}
export interface CreateUserDto {
    email: string;
    name: string;
    password: string;
    organizationId: string;
    role?: string;
}
export interface LoginDto {
    email: string;
    password: string;
}
export interface CreateProductDto {
    sku: string;
    name: string;
    barcode?: string;
    category?: string;
    brand?: string;
    price: number;
    reorderPoint?: number;
    reorderQty?: number;
}
export interface UpdateProductDto {
    name?: string;
    price?: number;
    reorderPoint?: number;
    reorderQty?: number;
}
export interface CreateStockMovementDto {
    type: string;
    productId: string;
    quantity: number;
    inventoryLocationId: string;
    fromLocationId?: string;
    notes?: string;
}
export interface CreateSupplierDto {
    name: string;
    code: string;
    email?: string;
    phone?: string;
}
export interface CreatePurchaseOrderDto {
    supplierId: string;
    lineItems: Array<{
        productId: string;
        quantity: number;
        unitPrice: number;
    }>;
}
export interface UpdatePurchaseOrderDto {
    status?: string;
}
export interface CreateStoreDto {
    name: string;
    code: string;
}
export interface CreateLocationDto {
    name: string;
    code: string;
    type: string;
}
