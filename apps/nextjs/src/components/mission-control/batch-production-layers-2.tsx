import Link from "next/link";

const deploymentStates = ["Local", "Preview", "Review", "Production", "Rollback"];
const notificationChannels = ["In-app alerts", "Email summaries", "Slack-ready events", "Audit notifications"];
const accessRoles = ["Owner", "Admin", "Operator", "Reviewer", "Viewer"];
const integrationSlots = ["Auth", "Storage", "Payments", "Telemetry", "Agent runtime"];
const qualityGates = ["UX review", "Policy review", "Commerce review", "Performance review", "Merge review"];

function LayerCard({ kicker, title, description, children }: { kicker: string; title: string; description: string; children: React.ReactNode }) {
  return (
    <section className="rounded-3xl border border-zinc-800 bg-zinc-950 p-6">
      <p className="text-xs font-semibold uppercase tracking-[0.35em] text-rose-300">{kicker}</p>
      <h3 className="mt-3 text-3xl font-semibold tracking-tight md:text-4xl">{title}</h3>
      <p className="mt-4 text-sm leading-7 text-zinc-400">{description}</p>
      <div className="mt-5">{children}</div>
    </section>
  );
}

export function MissionBatchProductionLayersTwo({ lang = "en" }: { lang?: string }) {
  return (
    <section className="mt-12 space-y-8">
      <div className="rounded-3xl border border-rose-400/20 bg-[radial-gradient(circle_at_top_left,#35101a,transparent_45%),#050505] p-8">
        <p className="text-xs font-semibold uppercase tracking-[0.35em] text-rose-300">Batch production layers 02</p>
        <h2 className="mt-4 text-4xl font-semibold tracking-tight md:text-6xl">Operational hardening pass</h2>
        <p className="mt-5 max-w-4xl text-sm leading-7 text-zinc-400">Adds five more static production layers in one branch: deployment readiness, notifications, access control, integrations, and quality gates.</p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <LayerCard kicker="Layer 06" title="Deployment readiness" description="Frames the release path from local work through preview, review, production, and rollback planning.">
          <div className="grid gap-3 md:grid-cols-5">
            {deploymentStates.map((state, index) => (
              <div key={state} className="rounded-2xl border border-zinc-800 bg-black p-4">
                <div className="text-xs uppercase tracking-[0.3em] text-rose-300">{String(index + 1).padStart(2, "0")}</div>
                <div className="mt-3 text-sm font-semibold text-zinc-200">{state}</div>
              </div>
            ))}
          </div>
        </LayerCard>

        <LayerCard kicker="Layer 07" title="Notification center" description="Prepares the UI model for alerts, summaries, external channel events, and audit-sensitive notifications.">
          <div className="grid gap-3 md:grid-cols-2">
            {notificationChannels.map((channel) => (
              <div key={channel} className="rounded-2xl border border-blue-400/20 bg-blue-500/5 p-4 text-sm font-semibold text-blue-100">{channel}</div>
            ))}
          </div>
        </LayerCard>

        <LayerCard kicker="Layer 08" title="Access control" description="Defines the initial static role model for workspace-level permissions and review authority.">
          <div className="grid gap-3 md:grid-cols-5">
            {accessRoles.map((role) => (
              <div key={role} className="rounded-2xl border border-purple-400/20 bg-purple-500/5 p-4 text-sm font-semibold text-purple-100">{role}</div>
            ))}
          </div>
        </LayerCard>

        <LayerCard kicker="Layer 09" title="Integration slots" description="Creates visible placeholders for the core systems that will power the static shell later.">
          <div className="grid gap-3 md:grid-cols-5">
            {integrationSlots.map((slot) => (
              <div key={slot} className="rounded-2xl border border-cyan-400/20 bg-cyan-500/5 p-4 text-sm font-semibold text-cyan-100">{slot}</div>
            ))}
          </div>
        </LayerCard>
      </div>

      <LayerCard kicker="Layer 10" title="Quality gates" description="Adds the review surface for UX, policy, commerce, performance, and merge readiness.">
        <div className="grid gap-3 md:grid-cols-5">
          {qualityGates.map((gate) => (
            <Link key={gate} href={`/${lang}/mission-control/observability`} className="rounded-2xl border border-emerald-400/20 bg-emerald-500/5 p-4 text-sm font-semibold text-emerald-100 transition hover:bg-emerald-500/10">{gate}</Link>
          ))}
        </div>
      </LayerCard>
    </section>
  );
}
