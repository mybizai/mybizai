import Link from "next/link";

const teamRoles = [
  { role: "Lead", agent: "Project Manager", fit: "96%", responsibility: "Owns sequencing, delegation, and final mission handoff." },
  { role: "Research", agent: "Research Analyst", fit: "91%", responsibility: "Collects evidence, validates assumptions, and attaches sources." },
  { role: "Architecture", agent: "Workflow Architect", fit: "89%", responsibility: "Converts goals into execution graphs and dependency maps." },
  { role: "Governance", agent: "Governance Auditor", fit: "94%", responsibility: "Reviews risky actions, commerce changes, and policy conflicts." },
  { role: "Commerce", agent: "Commerce Analyst", fit: "86%", responsibility: "Frames pricing, subscription, billing, and cancellation flows." },
  { role: "Ops", agent: "Ops Analyst", fit: "88%", responsibility: "Tracks telemetry, run health, cost, and bottlenecks." },
];

const dependencyPlan = [
  "Research feeds workflow architecture",
  "Workflow architecture feeds team execution",
  "Governance gates commerce changes",
  "Ops telemetry feeds audit records",
  "Final artifacts package all outputs",
];

export function MissionTeamBuilderLayer({ lang = "en" }: { lang?: string }) {
  return (
    <section className="mt-12 space-y-8">
      <div className="rounded-3xl border border-fuchsia-400/20 bg-[radial-gradient(circle_at_top_left,#2b1036,transparent_45%),#050505] p-8">
        <p className="text-xs font-semibold uppercase tracking-[0.35em] text-fuchsia-300">Team builder layer</p>
        <div className="mt-4 grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
          <div>
            <h2 className="text-4xl font-semibold tracking-tight md:text-6xl">Mission-ready team assembly</h2>
            <p className="mt-5 text-sm leading-7 text-zinc-400">Adds a production-facing team builder layer for recommended roles, agent fit scoring, responsibility mapping, and dependency planning before drag/drop team orchestration is wired in.</p>
          </div>
          <Link href={`/${lang}/mission-control/team-builder-1`} className="rounded-3xl border border-fuchsia-400/30 bg-fuchsia-500/10 p-5 text-sm font-semibold text-fuchsia-100 transition hover:bg-fuchsia-500/20">Open team builder</Link>
        </div>
      </div>

      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {teamRoles.map((item) => (
          <div key={item.role} className="rounded-3xl border border-zinc-800 bg-zinc-950 p-5 transition hover:border-fuchsia-400/60">
            <div className="flex items-start justify-between gap-4">
              <div>
                <div className="text-xs uppercase tracking-[0.3em] text-zinc-500">{item.role}</div>
                <h3 className="mt-2 text-2xl font-semibold text-white">{item.agent}</h3>
              </div>
              <span className="rounded-full border border-fuchsia-400/30 bg-fuchsia-500/10 px-3 py-1 text-xs text-fuchsia-200">{item.fit}</span>
            </div>
            <p className="mt-4 text-sm leading-6 text-zinc-400">{item.responsibility}</p>
          </div>
        ))}
      </div>

      <section className="rounded-3xl border border-zinc-800 bg-zinc-950 p-6">
        <h3 className="text-2xl font-semibold tracking-tight">Dependency plan</h3>
        <div className="mt-6 grid gap-4 md:grid-cols-5">
          {dependencyPlan.map((step, index) => (
            <div key={step} className="rounded-2xl border border-zinc-800 bg-black p-4">
              <div className="text-xs font-semibold uppercase tracking-[0.35em] text-fuchsia-300">{String(index + 1).padStart(2, "0")}</div>
              <div className="mt-3 text-sm font-semibold leading-6 text-zinc-200">{step}</div>
            </div>
          ))}
        </div>
      </section>
    </section>
  );
}
