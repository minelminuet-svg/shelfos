import { useEffect, useState } from 'react';
import type { Supplier } from '@shelfos/types';
import { AppShell } from '../components/app-shell';
import { EmptyState, ErrorState, LoadingState, PageCard, StatusBadge } from '../components/states';
import { api, getErrorMessage } from '../lib/api';

export default function SuppliersPage() {
  const [suppliers, setSuppliers] = useState<Supplier[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function load() {
      try {
        setSuppliers(await api.getSuppliers());
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
      title="Suppliers"
      description="A vendor view with contact details, linked products, and preferred supplier relationships."
    >
      {loading ? (
        <LoadingState title="Loading suppliers" description="Pulling vendor profiles and linked product data." />
      ) : null}
      {!loading && error ? <ErrorState title="Suppliers unavailable" description={error} /> : null}
      {!loading && !error && suppliers.length === 0 ? (
        <EmptyState
          title="No suppliers found"
          description="Create suppliers or run the seed script to load demo vendors."
        />
      ) : null}
      {!loading && !error && suppliers.length > 0 ? (
        <div className="grid gap-4 xl:grid-cols-2">
          {suppliers.map((supplier) => (
            <PageCard key={supplier.id}>
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h2 className="text-xl font-semibold text-white">{supplier.name}</h2>
                  <p className="mt-1 text-sm text-slate-400">{supplier.code}</p>
                </div>
                <StatusBadge label={`${supplier.products.length} linked products`} tone="info" />
              </div>

              <dl className="mt-5 grid gap-3 text-sm text-slate-300 sm:grid-cols-2">
                <div>
                  <dt className="text-slate-400">Email</dt>
                  <dd className="mt-1">{supplier.email || 'Not set'}</dd>
                </div>
                <div>
                  <dt className="text-slate-400">Phone</dt>
                  <dd className="mt-1">{supplier.phone || 'Not set'}</dd>
                </div>
              </dl>

              <div className="mt-6">
                <h3 className="text-sm font-medium text-white">Preferred coverage</h3>
                <div className="mt-3 flex flex-wrap gap-2">
                  {supplier.products.length === 0 ? (
                    <StatusBadge label="No linked products" tone="neutral" />
                  ) : (
                    supplier.products.map((entry) => (
                      <StatusBadge
                        key={entry.id}
                        label={`${entry.product.name} · ${entry.leadDays}d`}
                        tone={entry.isPreferred ? 'success' : 'neutral'}
                      />
                    ))
                  )}
                </div>
              </div>
            </PageCard>
          ))}
        </div>
      ) : null}
    </AppShell>
  );
}
