import { useEffect, useState } from 'react';
import type { DashboardSummary, StockMovement } from '@shelfos/types';
import { AppShell } from '../components/app-shell';
import {
  EmptyState,
  ErrorState,
  LoadingState,
  MetricCard,
  PageCard,
  StatusBadge,
} from '../components/states';
import { api, formatCurrency, formatDate, formatLabel, getErrorMessage } from '../lib/api';

export default function DashboardPage() {
  const [summary, setSummary] = useState<DashboardSummary | null>(null);
  const [movements, setMovements] = useState<StockMovement[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function load() {
      try {
        const [summaryData, movementsData] = await Promise.all([
          api.getDashboardSummary(),
          api.getRecentMovements(),
        ]);
        setSummary(summaryData);
        setMovements(movementsData);
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
      title="Operations dashboard"
      description="A live view of alerts, open replenishment work, and recent stock activity across the demo organization."
    >
      {loading ? (
        <LoadingState
          title="Loading dashboard"
          description="Pulling summary metrics and recent stock activity."
        />
      ) : null}
      {!loading && error ? <ErrorState title="Dashboard unavailable" description={error} /> : null}
      {!loading && !error && summary ? (
        <div className="space-y-8">
          <section className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            <MetricCard label="Low-stock alerts" value={summary.lowStockAlerts.toString()} tone="danger" />
            <MetricCard label="Open purchase orders" value={summary.openPOs.toString()} tone="warning" />
            <MetricCard label="Total products" value={summary.totalProducts.toString()} />
            <MetricCard
              label="Inventory value"
              value={formatCurrency(summary.inventoryValue)}
              tone="success"
            />
          </section>

          {movements.length === 0 ? (
            <EmptyState
              title="No recent stock movements"
              description="Once movements are recorded, the latest activity will show up here."
            />
          ) : (
            <PageCard>
              <div className="flex items-center justify-between gap-4">
                <div>
                  <h2 className="text-xl font-semibold text-white">Recent stock movements</h2>
                  <p className="mt-1 text-sm text-slate-400">
                    The ten latest inventory events captured by the API.
                  </p>
                </div>
                <StatusBadge label={`${movements.length} events`} tone="info" />
              </div>

              <div className="mt-6 rounded-xl overflow-hidden border border-white/10">
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-white/10 text-left text-sm">
                    <thead className="bg-white/5 text-slate-300">
                      <tr>
                        <th className="px-6 py-4 font-semibold text-xs uppercase tracking-wider">Product</th>
                        <th className="px-6 py-4 font-semibold text-xs uppercase tracking-wider">Movement</th>
                        <th className="px-6 py-4 font-semibold text-xs uppercase tracking-wider">Quantity</th>
                        <th className="px-6 py-4 font-semibold text-xs uppercase tracking-wider">Location</th>
                        <th className="px-6 py-4 font-semibold text-xs uppercase tracking-wider">Time</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                      {movements.map((movement) => (
                        <tr key={movement.id} className="bg-slate-900/30 transition hover:bg-slate-800/50">
                          <td className="px-6 py-4">
                            <div className="font-semibold text-white">{movement.product.name}</div>
                            <div className="text-xs text-slate-500 mt-1">{movement.product.sku}</div>
                          </td>
                          <td className="px-6 py-4">
                            <StatusBadge label={formatLabel(movement.type)} tone="info" />
                          </td>
                          <td className="px-6 py-4">
                            <span className={`font-bold text-lg ${
                              movement.quantity > 0 ? 'text-emerald-400' : 'text-rose-400'
                            }`}>
                              {movement.quantity > 0 ? '↑ +' : '↓ '}{Math.abs(movement.quantity)}
                            </span>
                          </td>
                          <td className="px-6 py-4">
                            <div className="text-slate-200">{movement.location.name}</div>
                            {movement.fromLocation ? (
                              <div className="text-xs text-slate-500 mt-1">from {movement.fromLocation.name}</div>
                            ) : null}
                          </td>
                          <td className="px-6 py-4 text-slate-400 text-sm">{formatDate(movement.createdAt)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </PageCard>
          )}
        </div>
      ) : null}
    </AppShell>
  );
}
