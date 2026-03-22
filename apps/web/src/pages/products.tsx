import { useEffect, useState } from 'react';
import type { Product } from '@shelfos/types';
import { AppShell } from '../components/app-shell';
import { EmptyState, ErrorState, LoadingState, PageCard, StatusBadge } from '../components/states';
import { api, formatCurrency, getErrorMessage } from '../lib/api';

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function load() {
      try {
        setProducts(await api.getProducts());
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
      title="Product catalog"
      description="A cleaner overview of SKUs, pricing, and replenishment settings for the current organization."
    >
      {loading ? (
        <LoadingState title="Loading products" description="Fetching catalog data and reorder thresholds." />
      ) : null}
      {!loading && error ? <ErrorState title="Products unavailable" description={error} /> : null}
      {!loading && !error && products.length === 0 ? (
        <EmptyState
          title="No products found"
          description="Create products or run the seed script to populate the catalog."
        />
      ) : null}
      {!loading && !error && products.length > 0 ? (
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {products.map((product) => (
            <PageCard key={product.id} className="transition hover:scale-105 hover:shadow-xl hover:shadow-slate-950/40">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h2 className="text-xl font-semibold text-white">{product.name}</h2>
                  <p className="mt-1 text-sm text-slate-400">{product.sku}</p>
                </div>
                <StatusBadge label={product.category || 'Uncategorized'} tone="info" />
              </div>

              <p className="mt-5 text-3xl font-bold text-emerald-400">
                {formatCurrency(product.price)}
              </p>

              <dl className="mt-6 space-y-3 text-sm border-t border-white/10 pt-4 text-slate-300">
                <div className="flex items-center justify-between gap-3 py-2">
                  <dt className="text-slate-500">Barcode</dt>
                  <dd className="font-medium text-white">{product.barcode || 'Not set'}</dd>
                </div>
                <div className="flex items-center justify-between gap-3 py-2">
                  <dt className="text-slate-500">Brand</dt>
                  <dd className="font-medium text-white">{product.brand || 'Not set'}</dd>
                </div>
                <div className="flex items-center justify-between gap-3 py-2">
                  <dt className="text-slate-500">Reorder</dt>
                  <dd className="font-medium text-amber-400">{product.reorderPoint}</dd>
                </div>
                <div className="flex items-center justify-between gap-3 py-2">
                  <dt className="text-slate-500">Qty</dt>
                  <dd className="font-medium text-emerald-400">{product.reorderQty}</dd>
                </div>
              </dl>
            </PageCard>
          ))}
        </div>
      ) : null}
    </AppShell>
  );
}
