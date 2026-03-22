import axios from 'axios';
import type {
  Alert,
  DashboardSummary,
  InventoryBalance,
  Product,
  PurchaseOrder,
  StockMovement,
  Supplier,
} from '@shelfos/types';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api';

const client = axios.create({
  baseURL: API_URL,
  timeout: 10000,
});

async function getData<T>(path: string) {
  const response = await client.get<T>(path);
  return response.data;
}

export const api = {
  getDashboardSummary: () => getData<DashboardSummary>('/dashboard/summary'),
  getRecentMovements: () => getData<StockMovement[]>('/dashboard/recent-movements'),
  getInventoryBalances: () => getData<InventoryBalance[]>('/inventory/balances'),
  getProducts: () => getData<Product[]>('/products'),
  getSuppliers: () => getData<Supplier[]>('/suppliers'),
  getPurchaseOrders: () => getData<PurchaseOrder[]>('/purchase-orders'),
  getAlerts: () => getData<Alert[]>('/alerts'),
};

export function formatCurrency(value: number | string) {
  const numericValue = typeof value === 'number' ? value : Number(value);
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(Number.isFinite(numericValue) ? numericValue : 0);
}

export function formatDate(value: string) {
  return new Intl.DateTimeFormat('en-US', {
    dateStyle: 'medium',
    timeStyle: 'short',
  }).format(new Date(value));
}

export function formatDateOnly(value: string) {
  return new Intl.DateTimeFormat('en-US', {
    dateStyle: 'medium',
  }).format(new Date(value));
}

export function formatLabel(value: string) {
  return value.replace(/_/g, ' ');
}

export function getErrorMessage(error: unknown) {
  if (axios.isAxiosError(error)) {
    return error.response?.data?.message || error.message || 'Request failed.';
  }

  if (error instanceof Error) {
    return error.message;
  }

  return 'Something went wrong.';
}
