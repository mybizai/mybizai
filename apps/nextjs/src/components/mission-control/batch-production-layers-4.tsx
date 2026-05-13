import Link from "next/link";

const templateTypes = ["Launch plan", "Market analysis", "Offer design", "Ops review", "Audit package"];
const insightSurfaces = ["Executive summary", "Agent findings", "Risk notes", "Next actions", "Blocked items"];
const workspaceHealth = ["Context quality", "Team coverage", "Approval depth", "Artifact coverage", "Telemetry readiness"];
const collaborationModes = ["Solo operator", "Human team", "Agent team", "Mixed review", "Executive mode"];
const exportFormats = ["PDF", "CSV", "Markdown", "JSON", "Audit bundle"];

function LayerPanel({ kicker, title, description, children }: { kicker: string; title: string; description: string; children: React.ReactNode }) {
  return (
    <section className="rounded-3xl border border-zinc-800 bg-zinc-950 p-6">
      <p className="text-xs font-semibold uppercase tracking-[0.35em] text-lime-300">{kicker}</p>
      <h3 className="mt-3 text-3xl font-semibold tracking-tight md:text-4xl">{title}</h3>
      <p className="mt-4 text-sm leading-7 text-zinc-400">{description}</p>
      <div className="mt-5">{children}</div>
    </section>
  );
}

function ItemGrid({ items }: { items: string[] }) {
  return (
    <div className="grid gap-3 md:grid-cols-5">
      {items.map((item) => (
        <div key={item} className="rounded-2xl border border-lime-400/20 bg-lime-500/5 p-4 text-sm font-semibold text-lime-100">{item}</div>
      ))}
    </div>
  );
}

export function MissionBatchProductionLayersFour({ lang = "en" }: { lang?: string }) {
  return (
    <section className="mt-12 space-y-8">
      <div className="rounded-3xl border border-lime-400/20 bg-[radial-gradient(circle_at_top_left,#223508,transparent_45%),#050505] p-8">
        <p className="text-xs font-semibold uppercase tracking-[0.35em] text-lime-300">Batch production layers 04</p>
        <h2 className="mt-4 text-4xl font-semibold tracking-tight md:text-6xl">Operator productivity pass</h2>
        <p className="mt-5 max-w-4xl text-sm leading-7 text-zinc-400">Adds five more static production layers in one branch: templates, insights, workspace health, collaboration modes, and export controls.</p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <LayerPanel kicker="Layer 16" title="Template library" description="Frames reusable mission templates for repeatable business workflows.">
          <ItemGrid items={templateTypes} />
        </LayerPanel>

        <LayerPanel kicker="Layer 17" title="Insight surface" description="Creates executive-ready summaries for findings, risks, blocks, and recommended next moves.">
          <ItemGrid items={insightSurfaces} />
        </LayerPanel>

        <LayerPanel kicker="Layer 18" title="Workspace health" description="Adds a static health model for context, team coverage, approval depth, artifacts, and telemetry.">
          <ItemGrid items={workspaceHealth} />
        </LayerPanel>

        <LayerPanel kicker="Layer 19" title="Collaboration modes" description="Prepares the UI model for solo, team, agent, mixed review, and executive workflows.">
          <ItemGrid items={collaborationModes} />
        </LayerPanel>
      </div>

      <LayerPanel kicker="Layer 20" title="Export controls" description="Adds static export format controls for future report, data, and audit package generation.">
        <div className="grid gap-3 md:grid-cols-5">
          {exportFormats.map((format) => (
            <Link key={format} href={`/${lang}/mission-control/artifacts`} className="rounded-2xl border border-lime-400/20 bg-lime-500/5 p-4 text-sm font-semibold text-lime-100 transition hover:bg-lime-500/10">{format}</Link>
          ))}
        </div>
      </LayerPanel>
    </section>
  );
}
