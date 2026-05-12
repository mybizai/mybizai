import Link from "next/link";

const commerceStates = [
  { title: "Pricing", status: "Draft", detail: "Plan comparison, package positioning, and conversion copy for the public buying path." },
  { title: "Subscription", status: "Account", detail: "Current plan, usage visibility, renewal state, and upgrade or downgrade intent." },
  { title: "Checkout", status: "Purchase", detail: "Order review, selected package, business details, and terms acceptance." },
  { title: "Payment", status: "Guarded", detail: "Payment method collection, confirmation, and secure handoff to the payment provider." },
  { title: "Billing", status: "Admin", detail: "Billing profile, tax details, payment methods, and account-level controls." },
  { title: "Cancellation", status: "Retention", detail: "Cancellation reason capture, save offers, downgrade path, and final confirmation." },
  { title: "Invoices", status: "Records", detail: "Receipt history, invoice downloads, billing events, and audit-friendly records." },
];

const purchaseGuardrails = [
  "Never auto-purchase without explicit human confirmation",
  "Always show final price, billing interval, and renewal terms",
  "Require confirmation before cancellation or downgrade",
  "Attach commerce events to the audit trail",
];

export function MissionCommerceLayer({ lang = "en" }: { lang?: string }) {
  return (
    <section className="mt-12 space-y-8">
      <div className="rounded-3xl border border-emerald-400/20 bg-[radial-gradient(circle_at_top_left,#06291e,transparent_45%),#050505] p-8">
        <p className="text-xs font-semibold uppercase tracking-[0.35em] text-emerald-300">Commerce layer</p>
        <div className="mt-4 grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
          <div>
            <h2 className="text-4xl font-semibold tracking-tight md:text-6xl">Revenue workflow shell</h2>
            <p className="mt-5 text-sm leading-7 text-zinc-400">Adds the missing subscription, purchasing, payment, billing, cancellation, and invoice structure so the app shell now has a safe commercial path ready for real provider wiring.</p>
          </div>
          <div className="rounded-3xl border border-zinc-800 bg-black p-5">
            <div className="text-4xl font-semibold text-white">7</div>
            <div className="mt-2 text-xs uppercase tracking-[0.3em] text-zinc-500">Commerce routes</div>
          </div>
        </div>
      </div>

      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
        {commerceStates.map((state) => (
          <Link key={state.title} href={`/${lang}/mission-control/commerce/${state.title.toLowerCase()}`} className="rounded-3xl border border-zinc-800 bg-zinc-950 p-5 transition hover:border-emerald-400/60 hover:shadow-[0_0_35px_rgba(0,245,160,0.12)]">
            <div className="flex items-start justify-between gap-4">
              <h3 className="text-2xl font-semibold tracking-tight">{state.title}</h3>
              <span className="rounded-full border border-emerald-400/30 bg-emerald-500/10 px-3 py-1 text-xs uppercase tracking-[0.2em] text-emerald-200">{state.status}</span>
            </div>
            <p className="mt-4 text-sm leading-6 text-zinc-400">{state.detail}</p>
          </Link>
        ))}
      </div>

      <div className="rounded-3xl border border-zinc-800 bg-zinc-950 p-6">
        <h3 className="text-2xl font-semibold tracking-tight">Purchase guardrails</h3>
        <div className="mt-6 grid gap-4 md:grid-cols-2">
          {purchaseGuardrails.map((rule) => (
            <div key={rule} className="rounded-2xl border border-emerald-400/20 bg-emerald-500/5 p-4 text-sm leading-6 text-emerald-100">{rule}</div>
          ))}
        </div>
      </div>
    </section>
  );
}
