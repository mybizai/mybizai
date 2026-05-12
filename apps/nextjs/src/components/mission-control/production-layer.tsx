import Link from "next/link";

import { commerceRoutes, missionControlScreens } from "~/data/mission-control";

const liveAgents = [
  { code: "PM", name: "Project Manager", state: "Coordinating", load: "62%", task: "Sequencing launch dependencies" },
  { code: "RA", name: "Research Analyst", state: "Analyzing", load: "74%", task: "Reviewing customer evidence" },
  { code: "WA", name: "Workflow Architect", state: "Planning", load: "51%", task: "Drafting execution graph" },
  { code: "GA", name: "Governance Auditor", state: "Paused", load: "28%", task: "Awaiting human approval" },
];

const readinessChecks = [
  { label: "Project context", value: "Structured", tone: "text-emerald-300" },
  { label: "Agent team", value: "Drafted", tone: "text-blue-300" },
  { label: "Human gates", value: "Configured", tone: "text-purple-300" },
  { label: "Commerce routes", value: `${commerceRoutes.length} reserved`, tone: "text-zinc-200" },
];

const commandTimeline = [
  "Select or create project",
  "Define mission context",
  "Build collaboration space",
  "Assemble agent team",
  "Publish constitution",
  "Run live hub",
  "Review performance",
  "Export audit trail",
];

function SectionHeader({ kicker, title, description }: { kicker: string; title: string; description: string }) {
  return (
    <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.35em] text-blue-300">{kicker}</p>
        <h2 className="mt-3 text-3xl font-semibold tracking-tight md:text-4xl">{title}</h2>
      </div>
      <p className="max-w-2xl text-sm leading-6 text-zinc-400">{description}</p>
    </div>
  );
}

export function MissionOperationalLayer({ lang = "en" }: { lang?: string }) {
  return (
    <section className="mt-12 space-y-8">
      <SectionHeader
        kicker="Production layer"
        title="Operational command center"
        description="This layer turns the mock map into an app-like control surface with readiness checks, live agent cards, command timeline, and next-action routing."
      />

      <div className="grid gap-5 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="rounded-3xl border border-zinc-800 bg-zinc-950 p-6">
          <div className="flex items-center justify-between gap-4">
            <h3 className="text-2xl font-semibold">Launch readiness</h3>
            <span className="rounded-full border border-emerald-400/30 bg-emerald-500/10 px-3 py-1 text-xs uppercase tracking-[0.2em] text-emerald-200">Static</span>
          </div>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            {readinessChecks.map((check) => (
              <div key={check.label} className="rounded-2xl border border-zinc-800 bg-black p-4">
                <div className="text-xs uppercase tracking-[0.25em] text-zinc-500">{check.label}</div>
                <div className={`mt-3 text-2xl font-semibold ${check.tone}`}>{check.value}</div>
              </div>
            ))}
          </div>
          <Link href={`/${lang}/mission-control/project-selection`} className="mt-6 inline-flex rounded-2xl border border-blue-400/40 bg-blue-500/10 px-5 py-3 text-sm font-semibold text-blue-100 transition hover:bg-blue-500/20">Begin project flow</Link>
        </div>

        <div className="rounded-3xl border border-zinc-800 bg-zinc-950 p-6">
          <h3 className="text-2xl font-semibold">Active agent board</h3>
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            {liveAgents.map((agent) => (
              <div key={agent.code} className="rounded-2xl border border-purple-400/20 bg-black p-4 transition hover:border-purple-300/60">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-purple-400/40 bg-purple-500/10 text-lg font-semibold text-purple-200">{agent.code}</div>
                    <div>
                      <div className="font-semibold text-white">{agent.name}</div>
                      <div className="mt-1 text-xs uppercase tracking-[0.2em] text-purple-200">{agent.state}</div>
                    </div>
                  </div>
                  <div className="text-sm text-zinc-400">{agent.load}</div>
                </div>
                <p className="mt-4 text-sm leading-6 text-zinc-400">{agent.task}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="rounded-3xl border border-zinc-800 bg-zinc-950 p-6">
        <SectionHeader
          kicker="Route intelligence"
          title="End-to-end command timeline"
          description="The route sequence creates a usable backbone for real workflows before backend orchestration is connected."
        />
        <div className="mt-8 grid gap-4 md:grid-cols-4">
          {commandTimeline.map((item, index) => (
            <div key={item} className="rounded-2xl border border-zinc-800 bg-black p-4">
              <div className="text-xs font-semibold uppercase tracking-[0.35em] text-blue-300">{String(index + 1).padStart(2, "0")}</div>
              <div className="mt-3 min-h-12 text-sm font-semibold leading-6 text-zinc-200">{item}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="rounded-3xl border border-blue-500/20 bg-[radial-gradient(circle_at_bottom_right,#111a3a,transparent_45%),#050505] p-6">
        <div className="grid gap-6 lg:grid-cols-[0.7fr_1.3fr]">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.35em] text-blue-300">Screen coverage</p>
            <h3 className="mt-3 text-3xl font-semibold">{missionControlScreens.length} routed screens</h3>
            <p className="mt-4 text-sm leading-6 text-zinc-400">Each mock-derived screen has a static production route and can be progressively replaced with real components, data, and API-backed state.</p>
          </div>
          <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
            {missionControlScreens.slice(0, 6).map((screen) => (
              <Link key={screen.slug} href={`/${lang}/mission-control/${screen.slug}`} className="rounded-2xl border border-zinc-800 bg-black/80 p-4 text-sm text-zinc-300 transition hover:border-blue-400/60 hover:text-white">{screen.phase}. {screen.title}</Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
