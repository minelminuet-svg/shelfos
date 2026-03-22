import Link from 'next/link';
import { useRouter } from 'next/router';
import type { ReactNode } from 'react';

const navigation = [
  { href: '/dashboard', label: 'Dashboard' },
  { href: '/inventory', label: 'Inventory' },
  { href: '/products', label: 'Products' },
  { href: '/suppliers', label: 'Suppliers' },
  { href: '/purchase-orders', label: 'Purchase Orders' },
  { href: '/alerts', label: 'Alerts' },
];

type AppShellProps = {
  title: string;
  description: string;
  children: ReactNode;
};

export function AppShell({ title, description, children }: AppShellProps) {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <div className="absolute inset-x-0 top-0 h-80 bg-[radial-gradient(circle_at_top,_rgba(34,197,94,0.24),_transparent_45%),radial-gradient(circle_at_right,_rgba(59,130,246,0.18),_transparent_35%)]" />
      <div className="relative">
        <header className="border-b border-white/10 bg-slate-950/80 backdrop-blur">
          <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-5 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between gap-4">
              <Link href="/" className="flex items-center gap-3">
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-emerald-400 font-semibold text-slate-950">
                  SO
                </span>
                <div>
                  <div className="text-lg font-semibold">ShelfOS</div>
                  <div className="text-sm text-slate-400">Retail operations workspace</div>
                </div>
              </Link>
              <span className="rounded-full border border-emerald-400/30 bg-emerald-400/10 px-3 py-1 text-xs font-medium uppercase tracking-[0.24em] text-emerald-200">
                Demo
              </span>
            </div>

            <nav className="flex flex-wrap gap-2">
              {navigation.map((item) => {
                const active = router.pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`rounded-full px-4 py-2 text-sm transition ${
                      active
                        ? 'bg-white text-slate-950'
                        : 'border border-white/10 bg-white/5 text-slate-300 hover:bg-white/10 hover:text-white'
                    }`}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </nav>
          </div>
        </header>

        <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
          <section className="mb-8 rounded-[2rem] border border-white/10 bg-white/5 p-8 shadow-2xl shadow-slate-950/30">
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.28em] text-emerald-200">
              Operations overview
            </p>
            <h1 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl">{title}</h1>
            <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-300 sm:text-base">{description}</p>
          </section>

          {children}
        </main>
      </div>
    </div>
  );
}
