import Link from "next/link";

const agentProfiles = [
  { code: "PM", name: "Project Manager", role: "Coordinator", autonomy: "70%", state: "Sequencing work" },
  { code: "RA", name: "Research Analyst", role: "Evidence", autonomy: "55%", state: "Collecting context" },
  { code: "WA", name: "Workflow Architect", role: "Planner", autonomy: "65%", state: "Building graph" },
  { code: "GA", name: "Governance Auditor", role: "Control", autonomy: "35%", state: "Awaiting approval" },
  { code: "CA", name: "Commerce Analyst", role: "Revenue", autonomy: "20%", state: "Guarded review" },
  { code: "OA", name: "Ops Analyst", role: "Telemetry", autonomy: "60%", state: "Watching health" },
];

const capabilityMatrix = [
  ["Planning", "PM", "WA"],
  ["Research", "RA", "PM"],
  ["Governance", "GA", "PM"],
  ["Commerce", "CA", "GA"],
  ["Observability", "OA", "WA"],
  ["Delivery", "PM", "OA"],
];

export function MissionAgentLayer({ lang = "en" }: { lang?: string }) {
  return (
    <section className="mt-12 space-y-8">
      <div className="rounded-3xl border border-purple-400/20 bg-[radial-gradient(circle_at_top_left,#21103d,transparent_45%),#050505] p-8">
        <p className="text-xs font-semibold uppercase tracking-[0.35em] text-purple-300">Agent layer</p>
        <div className="mt-4 grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
          <div>
            <h2 className="text-4xl font-semibold tracking-tight md:text-6xl">AI workforce surface</h2>
            <p className="mt-5 text-sm leading-7 text-zinc-400">Adds a production-facing agent roster layer with role identity, autonomy posture, operating state, and capability mapping before live agent data is connected.</p>
          </div>
          <Link href={`/${lang}/mission-control/agent-list-roster`} className="rounded-3xl border border-purple-400/30 bg-purple-500/10 p-5 text-sm font-semibold text-purple-100 transition hover:bg-purple-500/20">Open agent roster</Link>
        </div>
      </div>

      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {agentProfiles.map((agent) => (
          <div key={agent.code} className="rounded-3xl border border-zinc-800 bg-zinc-950 p-5 transition hover:border-purple-400/60">
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-purple-400/40 bg-purple-500/10 text-xl font-semibold text-purple-200">{agent.code}</div>
                <div>
                  <h3 className="text-xl font-semibold text-white">{agent.name}</h3>
                  <p className="mt-1 text-xs uppercase tracking-[0.25em] text-zinc-500">{agent.role}</p>
                </div>
              </div>
              <span className="rounded-full border border-blue-400/30 bg-blue-500/10 px-3 py-1 text-xs text-blue-200">{agent.autonomy}</span>
            </div>
            <p className="mt-5 text-sm leading-6 text-zinc-400">{agent.state}</p>
          </div>
        ))}
      </div>

      <section className="rounded-3xl border border-zinc-800 bg-zinc-950 p-6">
        <h3 className="text-2xl font-semibold tracking-tight">Capability matrix</h3>
        <div className="mt-6 grid gap-3 md:grid-cols-2 xl:grid-cols-3">
          {capabilityMatrix.map(([capability, primary, secondary]) => (
            <div key={capability} className="rounded-2xl border border-zinc-800 bg-black p-4">
              <div className="text-sm font-semibold text-white">{capability}</div>
              <div className="mt-3 flex gap-2 text-xs uppercase tracking-[0.2em] text-zinc-400">
                <span className="rounded-full border border-purple-400/30 bg-purple-500/10 px-3 py-1 text-purple-200">{primary}</span>
                <span className="rounded-full border border-blue-400/30 bg-blue-500/10 px-3 py-1 text-blue-200">{secondary}</span>
              </div>
            </div>
          ))}
        </div>
      </section>
    </section>
  );
}
