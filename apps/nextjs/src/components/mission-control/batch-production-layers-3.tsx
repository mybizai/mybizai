import Link from "next/link";

const onboardingSteps = ["Welcome", "Business profile", "Goals", "Sources", "First mission"];
const adminPanels = ["Organization", "Members", "Security", "Billing access", "Audit defaults"];
const dataReadiness = ["Profile data", "Project context", "Agent memory", "Artifacts", "Telemetry"];
const feedbackLoops = ["User rating", "Agent self-review", "Outcome score", "Escalation note", "Retrospective"];
const growthSurfaces = ["Upgrade prompts", "Usage insights", "Team invites", "Template library", "Success stories"];

function LayerBlock({ kicker, title, description, children }: { kicker: string; title: string; description: string; children: React.ReactNode }) {
  return (
    <section className="rounded-3xl border border-zinc-800 bg-zinc-950 p-6">
      <p className="text-xs font-semibold uppercase tracking-[0.35em] text-orange-300">{kicker}</p>
      <h3 className="mt-3 text-3xl font-semibold tracking-tight md:text-4xl">{title}</h3>
      <p className="mt-4 text-sm leading-7 text-zinc-400">{description}</p>
      <div className="mt-5">{children}</div>
    </section>
  );
}

function ChipGrid({ items, tone }: { items: string[]; tone: "orange" | "blue" | "purple" | "green" | "cyan" }) {
  const toneClass = {
    orange: "border-orange-400/20 bg-orange-500/5 text-orange-100",
    blue: "border-blue-400/20 bg-blue-500/5 text-blue-100",
    purple: "border-purple-400/20 bg-purple-500/5 text-purple-100",
    green: "border-emerald-400/20 bg-emerald-500/5 text-emerald-100",
    cyan: "border-cyan-400/20 bg-cyan-500/5 text-cyan-100",
  }[tone];

  return (
    <div className="grid gap-3 md:grid-cols-5">
      {items.map((item) => (
        <div key={item} className={`rounded-2xl border p-4 text-sm font-semibold ${toneClass}`}>{item}</div>
      ))}
    </div>
  );
}

export function MissionBatchProductionLayersThree({ lang = "en" }: { lang?: string }) {
  return (
    <section className="mt-12 space-y-8">
      <div className="rounded-3xl border border-orange-400/20 bg-[radial-gradient(circle_at_top_right,#351c08,transparent_45%),#050505] p-8">
        <p className="text-xs font-semibold uppercase tracking-[0.35em] text-orange-300">Batch production layers 03</p>
        <h2 className="mt-4 text-4xl font-semibold tracking-tight md:text-6xl">Experience expansion pass</h2>
        <p className="mt-5 max-w-4xl text-sm leading-7 text-zinc-400">Adds five more static production layers in one branch: onboarding, admin console, data readiness, feedback loops, and growth surfaces.</p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <LayerBlock kicker="Layer 11" title="Onboarding path" description="Frames the first-run flow from welcome through business setup, source collection, and the first mission.">
          <ChipGrid items={onboardingSteps} tone="orange" />
        </LayerBlock>

        <LayerBlock kicker="Layer 12" title="Admin console" description="Creates the static management surface for organization settings, members, security, billing access, and audit defaults.">
          <ChipGrid items={adminPanels} tone="blue" />
        </LayerBlock>

        <LayerBlock kicker="Layer 13" title="Data readiness" description="Shows the readiness model for profile data, project context, memory, artifacts, and telemetry before backend data checks are connected.">
          <ChipGrid items={dataReadiness} tone="purple" />
        </LayerBlock>

        <LayerBlock kicker="Layer 14" title="Feedback loops" description="Adds user feedback, self-review, outcome scoring, escalation notes, and retrospectives as visible product concepts.">
          <ChipGrid items={feedbackLoops} tone="green" />
        </LayerBlock>
      </div>

      <LayerBlock kicker="Layer 15" title="Growth surfaces" description="Adds static product growth surfaces for upgrades, usage insights, invites, templates, and success storytelling.">
        <div className="grid gap-3 md:grid-cols-5">
          {growthSurfaces.map((surface) => (
            <Link key={surface} href={`/${lang}/mission-control/commerce`} className="rounded-2xl border border-cyan-400/20 bg-cyan-500/5 p-4 text-sm font-semibold text-cyan-100 transition hover:bg-cyan-500/10">{surface}</Link>
          ))}
        </div>
      </LayerBlock>
    </section>
  );
}
