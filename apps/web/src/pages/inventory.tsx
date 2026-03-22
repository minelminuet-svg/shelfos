import { useEffect, useState } from 'react';
import type { InventoryBalance } from '@shelfos/types';
import { AppShell } from '../components/app-shell';
import { EmptyState, ErrorState, LoadingState, PageCard, StatusBadge } from '../components/states';
import { api, getErrorMessage } from '../lib/api';

export default function InventoryPage() {
  const [balances, setBalances] = useState<InventoryBalance[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function load() {
      try {
        setBalances(await api.getInventoryBalances());
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
      title="Inventory balances"
      description="Track stock by location and quickly see which balances are below their reorder thresholds."
    >
      {loading ? (
        <LoadingState
          title="Loading inventory"
          description="Collecting balances from all inventory locations."
        />
      ) : null}
      {!loading && error ? <ErrorState title="Inventory unavailable" description={error} /> : null}
      {!loading && !error && balances.length === 0 ? (
        <EmptyState
          title="No balances found"
          description="Seed the database or create movements to populate inventory."
        />
      ) : null}
      {!loading && !error && balances.length > 0 ? (
        <PageCard>
          <div className="flex items-center justify-between gap-4">
            <div>
              <h2 className="text-xl font-semibold text-white">Current stock levels</h2>
              <p className="mt-1 text-sm text-slate-400">
                Every balance is scoped to the active organization and location.
              </p>
            </div>
            <StatusBadge label={`${balances.length} balances`} tone="info" />
          </div>

          <div className="mt-6 rounded-xl overflow-hidden border border-white/10">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-white/10 text-left text-sm">
                <thead className="bg-white/5 text-slate-300">
                  <tr>
                    <th className="px-6 py-4 font-semibold text-xs uppercase tracking-wider">Product</th>
                    <th className="px-6 py-4 font-semibold text-xs uppercase tracking-wider">Location</th>
                    <th className="px-6 py-4 font-semibold text-xs uppercase tracking-wider">Quantity</th>
                    <th className="px-6 py-4 font-semibold text-xs uppercase tracking-wider">Reorder</th>
                    <th className="px-6 py-4 font-semibold text-xs uppercase tracking-wider">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {balances.map((balance) => {
                    const isLow = balance.quantity <= balance.product.reorderPoint;
                    return (
                      <tr key={balance.id} className="bg-slate-900/30 transition hover:bg-slate-800/50">
                        <td className="px-6 py-4">
                          <div className="font-semibold text-white">{balance.product.name}</div>
                          <div className="text-xs text-slate-500 mt-1">{balance.product.sku}</div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-slate-200">{balance.location.name}</div>
                          <div className="text-xs text-slate-500 mt-1">{balance.location.type}</div>
                        </td>
                        <td className="px-6 py-4">
                          <span className={`font-bold text-lg ${
                            isLow ? 'text-rose-400' : 'text-emerald-400'
                          }`}>
                            {balance.quantity}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-slate-400">{balance.product.reorderPoint}</td>
                        <td className="px-6 py-4">
                          <StatusBadge
                            label={isLow ? '⚠️ Low' : '✅ OK'}
                            tone={isLow ? 'danger' : 'success'}
                          />
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </PageCard>
      ) : null}
    </AppShell>
  );
}
