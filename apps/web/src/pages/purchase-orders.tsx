import { useEffect, useState } from 'react';
import type { PurchaseOrder } from '@shelfos/types';
import { AppShell } from '../components/app-shell';
import { EmptyState, ErrorState, LoadingState, PageCard, StatusBadge } from '../components/states';
import { api, formatCurrency, formatDateOnly, getErrorMessage } from '../lib/api';

function getStatusTone(status: PurchaseOrder['status']) {
  switch (status) {
    case 'received':
      return 'success';
    case 'sent':
      return 'info';
    case 'cancelled':
      return 'danger';
    default:
      return 'warning';
  }
}

export default function PurchaseOrdersPage() {
  const [orders, setOrders] = useState<PurchaseOrder[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function load() {
      try {
        setOrders(await api.getPurchaseOrders());
      } catch (loadError) {
        setError(getErrorMessage(loadError));
      } finally {
        setLoading(false);
      }
    }

    void load();
  }, []);

  return (
    <AppShell
      title="Purchase orders"
      description="Track replenishment work from draft through receipt with totals, supplier context, and line counts."
    >
      {loading ? (
        <LoadingState
          title="Loading purchase orders"
          description="Fetching replenishment history and supplier details."
        />
      ) : null}
      {!loading && error ? <ErrorState title="Purchase orders unavailable" description={error} /> : null}
      {!loading && !error && orders.length === 0 ? (
        <EmptyState
          title="No purchase orders found"
          description="Create an order or run the seed script to load demo data."
        />
      ) : null}
      {!loading && !error && orders.length > 0 ? (
        <PageCard>
          <div className="flex items-center justify-between gap-4">
            <div>
              <h2 className="text-xl font-semibold text-white">Order queue</h2>
              <p className="mt-1 text-sm text-slate-400">
                The newest orders appear first, with totals formatted consistently.
              </p>
            </div>
            <StatusBadge label={`${orders.length} orders`} tone="info" />
          </div>

          <div className="mt-6 rounded-xl overflow-hidden border border-white/10">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-white/10 text-left text-sm">
                <thead className="bg-white/5 text-slate-300">
                  <tr>
                    <th className="px-6 py-4 font-semibold text-xs uppercase tracking-wider">Order</th>
                    <th className="px-6 py-4 font-semibold text-xs uppercase tracking-wider">Supplier</th>
                    <th className="px-6 py-4 font-semibold text-xs uppercase tracking-wider">Total</th>
                    <th className="px-6 py-4 font-semibold text-xs uppercase tracking-wider">Status</th>
                    <th className="px-6 py-4 font-semibold text-xs uppercase tracking-wider">Items</th>
                    <th className="px-6 py-4 font-semibold text-xs uppercase tracking-wider">Created</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {orders.map((order) => (
                    <tr key={order.id} className="bg-slate-900/30 transition hover:bg-slate-800/50">
                      <td className="px-6 py-4 font-bold text-white">{order.orderNumber}</td>
                      <td className="px-6 py-4 text-slate-300">{order.supplier.name}</td>
                      <td className="px-6 py-4 font-bold text-emerald-400">{formatCurrency(order.totalAmount)}</td>
                      <td className="px-6 py-4">
                        <StatusBadge label={order.status} tone={getStatusTone(order.status)} />
                      </td>
                      <td className="px-6 py-4">
                        <span className="font-semibold text-blue-400">{order.lineItems.length} item{order.lineItems.length !== 1 ? 's' : ''}</span>
                      </td>
                      <td className="px-6 py-4 text-slate-400">{formatDateOnly(order.createdAt)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </PageCard>
      ) : null}
    </AppShell>
  );
}
