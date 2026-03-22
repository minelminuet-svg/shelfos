import Link from 'next/link';

const featureCards = [
  {
    label: 'Dashboard',
    eyebrow: '01',
    description: 'See inventory risk, live activity, and purchasing pressure in one place.',
    href: '/dashboard',
  },
  {
    label: 'Inventory',
    eyebrow: '02',
    description: 'Track balances by location and spot low-stock exposure before it becomes a fire drill.',
    href: '/inventory',
  },
  {
    label: 'Products',
    eyebrow: '03',
    description: 'Keep SKUs, pricing, and reorder rules clean enough for the rest of the operation to trust.',
    href: '/products',
  },
  {
    label: 'Suppliers',
    eyebrow: '04',
    description: 'Review vendor relationships and preferred product links without hunting through raw records.',
    href: '/suppliers',
  },
  {
    label: 'Purchase Orders',
    eyebrow: '05',
    description: 'Follow replenishment work from draft to receipt with line-level visibility.',
    href: '/purchase-orders',
  },
  {
    label: 'Alerts',
    eyebrow: '06',
    description: 'Focus on inventory exceptions that need action instead of watching every SKU manually.',
    href: '/alerts',
  },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,_rgba(52,211,153,0.22),_transparent_28%),linear-gradient(180deg,_#020617_0%,_#0f172a_45%,_#111827_100%)] text-slate-100">
      <div className="mx-auto flex min-h-screen max-w-7xl flex-col px-4 py-8 sm:px-6 lg:px-8">
        <header className="flex flex-col gap-6 rounded-[2rem] border border-white/10 bg-white/5 p-8 shadow-2xl shadow-slate-950/30">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-400 font-semibold text-slate-950">
                SO
              </span>
              <div>
                <div className="text-lg font-semibold">ShelfOS</div>
                <div className="text-sm text-slate-400">Professional demo workspace</div>
              </div>
            </div>
            <Link
              href="/dashboard"
              className="rounded-full bg-white px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-emerald-100"
            >
              Open dashboard
            </Link>
          </div>

          <div className="grid gap-8 lg:grid-cols-[1.3fr_0.7fr]">
            <div>
              <p className="mb-3 text-xs font-semibold uppercase tracking-[0.3em] text-emerald-200">
                Retail operations command center
              </p>
              <h1 className="max-w-3xl text-4xl font-semibold tracking-tight text-white sm:text-6xl">
                Inventory, purchasing, and alerts in one calmer workflow.
              </h1>
              <p className="mt-5 max-w-2xl text-base leading-7 text-slate-300">
                This project now has stronger API validation, safer inventory updates, shared frontend types,
                a repaired workspace build, and a complete supplier view so the demo feels like a real product
                instead of a stitched-together prototype.
              </p>
            </div>

            <div className="rounded-[1.5rem] border border-white/10 bg-slate-950/60 p-6">
              <p className="text-sm font-medium text-white">What is included</p>
              <ul className="mt-4 space-y-3 text-sm text-slate-300">
                <li>Typed API requests and runtime DTO validation</li>
                <li>Safer transfer and inventory balance handling</li>
                <li>Shared page shell and cleaner navigation</li>
                <li>Suppliers page and improved data presentation</li>
              </ul>
            </div>
          </div>
        </header>

        <section className="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {featureCards.map((card) => (
            <Link
              key={card.href}
              href={card.href}
              className="rounded-[1.5rem] border border-white/10 bg-white/5 p-6 transition hover:-translate-y-1 hover:border-emerald-300/40 hover:bg-white/10"
            >
              <p className="text-xs font-semibold uppercase tracking-[0.28em] text-emerald-200">{card.eyebrow}</p>
              <h2 className="mt-4 text-2xl font-semibold text-white">{card.label}</h2>
              <p className="mt-3 text-sm leading-6 text-slate-300">{card.description}</p>
            </Link>
          ))}
        </section>
      </div>
    </div>
  );
}
