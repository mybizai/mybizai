import Link from "next/link";

const layers = [
  { n: "21", title: "Scenario planner", items: ["Best case", "Base case", "Risk case", "Recovery path", "Decision trigger"] },
  { n: "22", title: "Risk register", items: ["Product", "Security", "Commerce", "Operational", "Compliance"] },
  { n: "23", title: "SLA surface", items: ["Response", "Uptime", "Escalation", "Recovery", "Reporting"] },
  { n: "24", title: "Cost controls", items: ["Token budget", "Agent limits", "Tool limits", "Spend alerts", "Approval caps"] },
  { n: "25", title: "Knowledge base", items: ["Sources", "Policies", "Templates", "Memory", "FAQs"] },
  { n: "26", title: "Experiment lab", items: ["Variants", "Hypotheses", "Metrics", "Results", "Rollout"] },
  { n: "27", title: "Customer handoff", items: ["Summary", "Deliverables", "Approvals", "Next steps", "Archive"] },
  { n: "28", title: "Security posture", items: ["Sessions", "Roles", "Secrets", "Events", "Reviews"] },
  { n: "29", title: "Roadmap board", items: ["Now", "Next", "Later", "Blocked", "Shipped"] },
  { n: "30", title: "System readiness", items: ["Frontend", "Backend", "Data", "AI", "Deploy"] },
];

export function MissionBatchProductionLayersFive({ lang = "en" }: { lang?: string }) {
  return (
    <section className="mt-12 space-y-8">
      <div className="rounded-3xl border border-sky-400/20 bg-[radial-gradient(circle_at_top_left,#082335,transparent_45%),#050505] p-8">
        <p className="text-xs font-semibold uppercase tracking-[0.35em] text-sky-300">Batch production layers 05</p>
        <h2 className="mt-4 text-4xl font-semibold tracking-tight md:text-6xl">Scale readiness pass</h2>
        <p className="mt-5 max-w-4xl text-sm leading-7 text-zinc-400">Adds ten more static production layers in one branch, expanding the shell into risk, cost, security, experimentation, customer handoff, roadmap, and readiness surfaces.</p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {layers.map((layer) => (
          <section key={layer.n} className="rounded-3xl border border-zinc-800 bg-zinc-950 p-6">
            <p className="text-xs font-semibold uppercase tracking-[0.35em] text-sky-300">Layer {layer.n}</p>
            <h3 className="mt-3 text-3xl font-semibold tracking-tight">{layer.title}</h3>
            <div className="mt-5 grid gap-3 md:grid-cols-5">
              {layer.items.map((item) => (
                <Link key={item} href={`/${lang}/mission-control`} className="rounded-2xl border border-sky-400/20 bg-sky-500/5 p-4 text-sm font-semibold text-sky-100 transition hover:bg-sky-500/10">{item}</Link>
              ))}
            </div>
          </section>
        ))}
      </div>
    </section>
  );
}
