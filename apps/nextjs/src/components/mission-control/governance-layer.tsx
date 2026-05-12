import Link from "next/link";

const governanceChecks = [
  { title: "Action Boundaries", status: "Configured", detail: "Agents can propose high-impact actions but require approval before execution." },
  { title: "Source Traceability", status: "Required", detail: "Every recommendation must attach source context, artifact reference, or explicit uncertainty." },
  { title: "Commerce Protection", status: "Guarded", detail: "Purchasing, cancellation, billing, and payment workflows require human confirmation." },
  { title: "Audit Retention", status: "Enabled", detail: "Decision events, overrides, and handoffs are preserved in the project record." },
];

const approvalQueue = [
  { item: "Publish agent constitution", risk: "Medium", owner: "Governance Auditor" },
  { item: "Authorize checkout route copy", risk: "High", owner: "Commerce Reviewer" },
  { item: "Export project evidence package", risk: "Low", owner: "Audit Agent" },
];

export function MissionGovernanceLayer({ lang = "en" }: { lang?: string }) {
  return (
    <section className="mt-12 space-y-8">
      <div className="rounded-3xl border border-purple-400/20 bg-[radial-gradient(circle_at_top_right,#21103d,transparent_45%),#050505] p-8">
        <p className="text-xs font-semibold uppercase tracking-[0.35em] text-purple-300">Governance layer</p>
        <div className="mt-4 grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
          <div>
            <h2 className="text-4xl font-semibold tracking-tight md:text-6xl">Human-controlled autonomy</h2>
            <p className="mt-5 text-sm leading-7 text-zinc-400">Adds a production-facing control layer for approvals, risk visibility, commerce guardrails, and audit-ready traceability before autonomous orchestration is wired in.</p>
          </div>
          <div className="rounded-3xl border border-zinc-800 bg-black p-5">
            <div className="text-4xl font-semibold text-white">4</div>
            <div className="mt-2 text-xs uppercase tracking-[0.3em] text-zinc-500">Core guardrails</div>
          </div>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1fr_0.9fr]">
        <section className="rounded-3xl border border-zinc-800 bg-zinc-950 p-6">
          <h3 className="text-2xl font-semibold tracking-tight">Governance checks</h3>
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            {governanceChecks.map((check) => (
              <div key={check.title} className="rounded-2xl border border-zinc-800 bg-black p-5">
                <div className="flex items-start justify-between gap-4">
                  <h4 className="font-semibold text-white">{check.title}</h4>
                  <span className="rounded-full border border-emerald-400/30 bg-emerald-500/10 px-3 py-1 text-xs uppercase tracking-[0.2em] text-emerald-200">{check.status}</span>
                </div>
                <p className="mt-4 text-sm leading-6 text-zinc-400">{check.detail}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="rounded-3xl border border-zinc-800 bg-zinc-950 p-6">
          <h3 className="text-2xl font-semibold tracking-tight">Approval queue</h3>
          <div className="mt-6 space-y-4">
            {approvalQueue.map((approval) => (
              <div key={approval.item} className="rounded-2xl border border-purple-400/20 bg-purple-500/5 p-4">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <div className="font-semibold text-white">{approval.item}</div>
                    <div className="mt-2 text-xs uppercase tracking-[0.25em] text-zinc-500">{approval.owner}</div>
                  </div>
                  <span className="rounded-full border border-blue-400/30 bg-blue-500/10 px-3 py-1 text-xs text-blue-200">{approval.risk}</span>
                </div>
              </div>
            ))}
          </div>
          <Link href={`/${lang}/mission-control/agent-constitution-editor-1`} className="mt-6 inline-flex rounded-2xl border border-purple-400/30 bg-purple-500/10 px-5 py-3 text-sm font-semibold text-purple-100 transition hover:bg-purple-500/20">Open constitution editor</Link>
        </section>
      </div>
    </section>
  );
}
