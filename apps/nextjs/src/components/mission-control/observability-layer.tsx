import Link from "next/link";

const healthMetrics = [
  { label: "Agent health", value: "94%", detail: "Composite readiness across active agents" },
  { label: "Success rate", value: "91%", detail: "Completed runs without human rollback" },
  { label: "Avg latency", value: "280ms", detail: "Static placeholder for stream response timing" },
  { label: "Token spend", value: "182K", detail: "Estimated usage across mission activity" },
];

const eventFeed = [
  "Project Manager decomposed launch plan",
  "Governance Auditor paused commerce copy review",
  "Research Analyst attached source artifact",
  "Workflow Architect updated dependency sequence",
  "Audit Agent exported decision packet",
];

const toolHeatmap = [
  ["Search", "High"],
  ["RAG", "High"],
  ["Planner", "Medium"],
  ["Commerce", "Guarded"],
  ["Audit", "Medium"],
  ["Export", "Low"],
];

export function MissionObservabilityLayer({ lang = "en" }: { lang?: string }) {
  return (
    <section className="mt-12 space-y-8">
      <div className="rounded-3xl border border-blue-400/20 bg-[radial-gradient(circle_at_top,#071833,transparent_45%),#050505] p-8">
        <p className="text-xs font-semibold uppercase tracking-[0.35em] text-blue-300">Observability layer</p>
        <div className="mt-4 grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
          <div>
            <h2 className="text-4xl font-semibold tracking-tight md:text-6xl">Operational telemetry shell</h2>
            <p className="mt-5 text-sm leading-7 text-zinc-400">Adds a frontend observability layer for agent health, success rate, latency, usage, tool heat, and event activity before real telemetry is connected.</p>
          </div>
          <Link href={`/${lang}/mission-control/performance-dashboard-1`} className="rounded-3xl border border-blue-400/30 bg-blue-500/10 p-5 text-sm font-semibold text-blue-100 transition hover:bg-blue-500/20">Open performance dashboard</Link>
        </div>
      </div>

      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
        {healthMetrics.map((metric) => (
          <div key={metric.label} className="rounded-3xl border border-zinc-800 bg-zinc-950 p-5">
            <div className="text-xs uppercase tracking-[0.3em] text-zinc-500">{metric.label}</div>
            <div className="mt-3 text-4xl font-semibold text-white">{metric.value}</div>
            <p className="mt-3 text-sm leading-6 text-zinc-400">{metric.detail}</p>
          </div>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-[1fr_0.8fr]">
        <section className="rounded-3xl border border-zinc-800 bg-zinc-950 p-6">
          <h3 className="text-2xl font-semibold tracking-tight">Event stream</h3>
          <div className="mt-6 space-y-3">
            {eventFeed.map((event, index) => (
              <div key={event} className="rounded-2xl border border-zinc-800 bg-black p-4 text-sm text-zinc-300">
                <span className="mr-3 text-blue-300">{String(index + 1).padStart(2, "0")}</span>{event}
              </div>
            ))}
          </div>
        </section>

        <section className="rounded-3xl border border-zinc-800 bg-zinc-950 p-6">
          <h3 className="text-2xl font-semibold tracking-tight">Tool usage heat</h3>
          <div className="mt-6 grid gap-3">
            {toolHeatmap.map(([tool, heat]) => (
              <div key={tool} className="flex items-center justify-between rounded-2xl border border-zinc-800 bg-black px-4 py-3 text-sm">
                <span className="text-zinc-200">{tool}</span>
                <span className="rounded-full border border-purple-400/30 bg-purple-500/10 px-3 py-1 text-xs uppercase tracking-[0.2em] text-purple-200">{heat}</span>
              </div>
            ))}
          </div>
        </section>
      </div>
    </section>
  );
}
