import { useEffect, useState } from 'react';
import type { Alert } from '@shelfos/types';
import { AppShell } from '../components/app-shell';
import { EmptyState, ErrorState, LoadingState, PageCard, StatusBadge } from '../components/states';
import { api, formatDate, formatLabel, getErrorMessage } from '../lib/api';

function getSeverityTone(severity: Alert['severity']) {
  switch (severity) {
    case 'critical':
      return 'danger';
    case 'warning':
      return 'warning';
    default:
      return 'info';
  }
}

export default function AlertsPage() {
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function load() {
      try {
        setAlerts(await api.getAlerts());
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
      title="Alerts and exceptions"
      description="Review inventory issues with clearer severity treatment and consistent timestamps."
    >
      {loading ? (
        <LoadingState title="Loading alerts" description="Fetching the latest inventory exceptions." />
      ) : null}
      {!loading && error ? <ErrorState title="Alerts unavailable" description={error} /> : null}
      {!loading && !error && alerts.length === 0 ? (
        <EmptyState
          title="No alerts found"
          description="When the system raises inventory exceptions, they will appear here."
        />
      ) : null}
      {!loading && !error && alerts.length > 0 ? (
        <div className="space-y-4">
          {alerts.map((alert) => (
            <PageCard key={alert.id} className="transition hover:scale-[1.02] hover:shadow-xl hover:shadow-slate-950/40">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                <div className="flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <StatusBadge label={formatLabel(alert.type)} tone="info" />
                    <StatusBadge label={alert.severity} tone={getSeverityTone(alert.severity)} />
                    <StatusBadge
                      label={alert.status}
                      tone={alert.status === 'resolved' ? 'success' : 'neutral'}
                    />
                  </div>
                  <p className="mt-4 text-lg font-semibold text-white leading-relaxed">{alert.message}</p>
                  <p className="mt-3 text-sm text-slate-500 italic">{formatDate(alert.createdAt)}</p>
                </div>
                {alert.severity === 'critical' && (
                  <div className="shrink-0 h-10 w-10 rounded-full bg-rose-500/20 border border-rose-500/30 flex items-center justify-center">
                    <div className="text-xl">🔴</div>
                  </div>
                )}
                {alert.severity === 'warning' && (
                  <div className="shrink-0 h-10 w-10 rounded-full bg-amber-500/20 border border-amber-500/30 flex items-center justify-center">
                    <div className="text-xl">⚠️</div>
                  </div>
                )}
              </div>
            </PageCard>
          ))}
        </div>
      ) : null}
    </AppShell>
  );
}
