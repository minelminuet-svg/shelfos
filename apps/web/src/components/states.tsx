import type { ReactNode } from 'react';

type MessageProps = {
  title: string;
  description: string;
};

export function PageCard({ children }: { children: ReactNode }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-gradient-to-br from-slate-900/50 to-slate-950/50 p-8 shadow-2xl shadow-slate-950/30 backdrop-blur-sm">
      {children}
    </div>
  );
}

export function LoadingState({ title, description }: MessageProps) {
  return (
    <PageCard>
      <div className="space-y-3">
        <div className="h-3 w-24 rounded-full bg-emerald-400/40" />
        <div className="h-8 w-56 rounded-full bg-white/10" />
        <div className="h-4 w-full max-w-xl rounded-full bg-white/10" />
        <p className="text-sm text-slate-300">{title}</p>
        <p className="text-sm text-slate-400">{description}</p>
      </div>
    </PageCard>
  );
}

export function ErrorState({ title, description }: MessageProps) {
  return (
    <PageCard>
      <div className="space-y-3">
        <span className="inline-flex rounded-full border border-rose-400/30 bg-rose-400/10 px-3 py-1 text-xs font-medium uppercase tracking-[0.24em] text-rose-200">
          Needs attention
        </span>
        <h2 className="text-xl font-semibold text-white">{title}</h2>
        <p className="text-sm text-slate-300">{description}</p>
      </div>
    </PageCard>
  );
}

export function EmptyState({ title, description }: MessageProps) {
  return (
    <PageCard>
      <div className="space-y-3">
        <span className="inline-flex rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium uppercase tracking-[0.24em] text-slate-300">
          Empty state
        </span>
        <h2 className="text-xl font-semibold text-white">{title}</h2>
        <p className="text-sm text-slate-300">{description}</p>
      </div>
    </PageCard>
  );
}

export function MetricCard({
  label,
  value,
  tone = 'default',
}: {
  label: string;
  value: string;
  tone?: 'default' | 'success' | 'warning' | 'danger';
}) {
  const toneConfig = {
    default: { bg: 'bg-blue-500/10 border-blue-400/30', text: 'text-blue-300', icon: '📊' },
    success: { bg: 'bg-emerald-500/10 border-emerald-400/30', text: 'text-emerald-300', icon: '✅' },
    warning: { bg: 'bg-amber-500/10 border-amber-400/30', text: 'text-amber-300', icon: '⚠️' },
    danger: { bg: 'bg-rose-500/10 border-rose-400/30', text: 'text-rose-300', icon: '🔴' },
  };
  const config = toneConfig[tone];

  return (
    <div className={`rounded-2xl border ${config.bg} bg-gradient-to-br backdrop-blur p-6 transition hover:scale-105 hover:shadow-xl hover:shadow-slate-950/40`}>
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <p className="text-sm text-slate-400 font-medium">{label}</p>
          <p className={`mt-3 text-4xl font-bold ${config.text}`}>{value}</p>
        </div>
        <div className="text-3xl opacity-50">{config.icon}</div>
      </div>
    </div>
  );
}

export function StatusBadge({
  label,
  tone = 'neutral',
}: {
  label: string;
  tone?: 'neutral' | 'success' | 'warning' | 'danger' | 'info';
}) {
  const toneClasses = {
    neutral: 'border-white/10 bg-white/5 text-slate-200',
    success: 'border-emerald-400/30 bg-emerald-400/10 text-emerald-200',
    warning: 'border-amber-400/30 bg-amber-400/10 text-amber-200',
    danger: 'border-rose-400/30 bg-rose-400/10 text-rose-200',
    info: 'border-sky-400/30 bg-sky-400/10 text-sky-200',
  };

  return (
    <span className={`inline-flex rounded-full border px-3 py-1 text-xs font-medium capitalize ${toneClasses[tone]}`}>
      {label}
    </span>
  );
}
