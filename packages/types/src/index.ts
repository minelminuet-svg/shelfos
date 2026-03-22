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
  category?: string | null;
  brand?: string | null;
  price: string;
  reorderPoint: number;
  reorderQty: number;
};

export type Supplier = {
  id: string;
  name: string;
  code: string;
  email?: string | null;
  phone?: string | null;
  products: Array<{
    id: string;
    isPreferred: boolean;
    leadDays: number;
    product: Pick<Product, 'id' | 'name' | 'sku'>;
  }>;
};

export type InventoryBalance = {
  id: string;
  quantity: number;
  productId: string;
  inventoryLocationId: string;
  product: Product;
  location: {
    id: string;
    name: string;
    code: string;
    type: string;
  };
};

export type Alert = {
  id: string;
  type: 'low_stock' | 'out_of_stock' | 'high_stock' | 'dead_stock';
  severity: 'info' | 'warning' | 'critical';
  status: 'open' | 'acknowledged' | 'resolved';
  message: string;
  createdAt: string;
  productId?: string | null;
};

export type StockMovement = {
  id: string;
  type: string;
  quantity: number;
  notes?: string | null;
  createdAt: string;
  product: Pick<Product, 'id' | 'name' | 'sku'>;
  location: {
    id: string;
    name: string;
    code: string;
    type: string;
  };
  fromLocation?: {
    id: string;
    name: string;
    code: string;
    type: string;
  } | null;
};

export type PurchaseOrder = {
  id: string;
  orderNumber: string;
  status: 'draft' | 'sent' | 'received' | 'cancelled';
  totalAmount: string;
  createdAt: string;
  supplier: Pick<Supplier, 'id' | 'name' | 'code'>;
  lineItems: Array<{
    id: string;
    quantity: number;
    unitPrice: string;
    lineTotal: string;
    product: Pick<Product, 'id' | 'name' | 'sku'>;
  }>;
};

export type DashboardSummary = {
  lowStockAlerts: number;
  openPOs: number;
  totalProducts: number;
  inventoryValue: number;
};
