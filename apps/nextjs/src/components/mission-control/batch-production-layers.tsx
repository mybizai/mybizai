import Link from "next/link";

const projectStages = ["Brief", "Sources", "Team", "Launch", "Delivery"];
const conversationPanels = ["Live Thread", "Agent Queue", "Human Intervention", "Pinned Context"];
const auditItems = ["Decision event", "Tool invocation", "Human approval", "Commerce guardrail", "Artifact export"];
const voiceStates = ["Input waveform", "Live transcription", "Agent voice identity", "Playback state"];
const settingsGroups = ["Workspace", "Agents", "Governance", "Commerce", "Observability"];

function BatchHeader({ kicker, title, description }: { kicker: string; title: string; description: string }) {
  return (
    <div className="rounded-3xl border border-zinc-800 bg-zinc-950 p-6">
      <p className="text-xs font-semibold uppercase tracking-[0.35em] text-blue-300">{kicker}</p>
      <h3 className="mt-3 text-3xl font-semibold tracking-tight md:text-4xl">{title}</h3>
      <p className="mt-4 text-sm leading-7 text-zinc-400">{description}</p>
    </div>
  );
}

export function MissionBatchProductionLayers({ lang = "en" }: { lang?: string }) {
  return (
    <section className="mt-12 space-y-8">
      <div className="rounded-3xl border border-amber-400/20 bg-[radial-gradient(circle_at_top_right,#2b2108,transparent_45%),#050505] p-8">
        <p className="text-xs font-semibold uppercase tracking-[0.35em] text-amber-300">Batch production layers</p>
        <h2 className="mt-4 text-4xl font-semibold tracking-tight md:text-6xl">Five-layer acceleration pass</h2>
        <p className="mt-5 max-w-4xl text-sm leading-7 text-zinc-400">Adds five static production layers in one branch: project lifecycle, conversation cockpit, audit evidence, voice readiness, and workspace settings.</p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <section className="space-y-4">
          <BatchHeader kicker="Layer 01" title="Project lifecycle" description="Shows the project moving from brief intake through source attachment, team creation, launch, and delivery." />
          <div className="grid gap-3 md:grid-cols-5">
            {projectStages.map((stage, index) => (
              <div key={stage} className="rounded-2xl border border-zinc-800 bg-black p-4">
                <div className="text-xs uppercase tracking-[0.3em] text-amber-300">{String(index + 1).padStart(2, "0")}</div>
                <div className="mt-3 text-sm font-semibold text-zinc-200">{stage}</div>
              </div>
            ))}
          </div>
        </section>

        <section className="space-y-4">
          <BatchHeader kicker="Layer 02" title="Conversation cockpit" description="Creates the product surface for live chat, agent queue visibility, intervention actions, and pinned context." />
          <div className="grid gap-3 md:grid-cols-2">
            {conversationPanels.map((panel) => (
              <Link key={panel} href={`/${lang}/mission-control/agent-conversation-hub`} className="rounded-2xl border border-purple-400/20 bg-purple-500/5 p-4 text-sm font-semibold text-purple-100 transition hover:bg-purple-500/10">{panel}</Link>
            ))}
          </div>
        </section>

        <section className="space-y-4">
          <BatchHeader kicker="Layer 03" title="Audit evidence" description="Frames traceable events for decisions, tools, approvals, commerce guardrails, and artifact exports." />
          <div className="space-y-3">
            {auditItems.map((item) => (
              <Link key={item} href={`/${lang}/mission-control/decision-audit-trail-1`} className="block rounded-2xl border border-blue-400/20 bg-blue-500/5 p-4 text-sm font-semibold text-blue-100 transition hover:bg-blue-500/10">{item}</Link>
            ))}
          </div>
        </section>

        <section className="space-y-4">
          <BatchHeader kicker="Layer 04" title="Voice readiness" description="Prepares the interface model for STT/TTS, waveform states, transcription, and unique agent voice identity." />
          <div className="grid gap-3 md:grid-cols-2">
            {voiceStates.map((state) => (
              <div key={state} className="rounded-2xl border border-cyan-400/20 bg-cyan-500/5 p-4 text-sm font-semibold text-cyan-100">{state}</div>
            ))}
          </div>
        </section>
      </div>

      <section className="rounded-3xl border border-zinc-800 bg-zinc-950 p-6">
        <BatchHeader kicker="Layer 05" title="Workspace settings" description="Adds the static product model for configuring workspace identity, agents, governance, commerce, and observability." />
        <div className="mt-5 grid gap-3 md:grid-cols-5">
          {settingsGroups.map((group) => (
            <div key={group} className="rounded-2xl border border-zinc-800 bg-black p-4 text-sm font-semibold text-zinc-200">{group}</div>
          ))}
        </div>
      </section>
    </section>
  );
}
