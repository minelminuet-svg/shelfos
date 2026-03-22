export type Organization = {
    id: string;
    name: string;
    slug: string;
};
export type Product = {
    id: string;
    sku: string;
    name: string;
    barcode?: string;
    price: number;
    reorderPoint: number;
};
export type InventoryBalance = {
    id: string;
    quantity: number;
    productId: string;
    locationId: string;
};
export type Alert = {
    id: string;
    type: 'low_stock' | 'out_of_stock';
    severity: 'info' | 'warning' | 'critical';
    status: 'open' | 'resolved';
    message: string;
};
