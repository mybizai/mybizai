import Link from "next/link";

const workflowStages = [
  { label: "Intake", owner: "Human", status: "Ready", detail: "Mission brief, target outcome, constraints, and source materials are captured before agent assignment." },
  { label: "Planning", owner: "PM Agent", status: "Mapped", detail: "The project manager agent decomposes the mission into executable work packages and review gates." },
  { label: "Execution", owner: "Agent Team", status: "Queued", detail: "Specialized agents execute tasks with visible state, dependency order, and interrupt support." },
  { label: "Governance", owner: "Audit Agent", status: "Guarded", detail: "Constitution checks, human approvals, and decision logs are attached to each important action." },
  { label: "Delivery", owner: "System", status: "Packaged", detail: "Artifacts, performance metrics, and audit evidence are bundled into the final project record." },
];

const artifactSlots = [
  "Project brief",
  "Source documents",
  "Agent outputs",
  "Decision logs",
  "Performance exports",
  "Final package",
];

const interventionRules = [
  "Pause before irreversible action",
  "Require approval for payment or billing changes",
  "Escalate low-confidence recommendations",
  "Record human override reason",
  "Attach source artifact to each decision",
];

function DetailCard({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="rounded-3xl border border-zinc-800 bg-zinc-950 p-6">
      <h3 className="text-2xl font-semibold tracking-tight">{title}</h3>
      <div className="mt-5">{children}</div>
    </section>
  );
}

export function MissionWorkflowDetailLayer({ lang = "en" }: { lang?: string }) {
  return (
    <section className="mt-12 space-y-8">
      <div className="rounded-3xl border border-blue-500/20 bg-[radial-gradient(circle_at_top_left,#0b1736,transparent_48%),#050505] p-8">
        <p className="text-xs font-semibold uppercase tracking-[0.35em] text-blue-300">Workflow detail</p>
        <div className="mt-4 grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
          <div>
            <h2 className="text-4xl font-semibold tracking-tight md:text-6xl">Execution model layer</h2>
            <p className="mt-5 text-sm leading-7 text-zinc-400">Adds the next production-grade layer: mission lifecycle, artifact slots, and human intervention rules. This gives the static frontend an operational shape before API-backed orchestration is wired in.</p>
          </div>
          <div className="grid gap-3 sm:grid-cols-3">
            {["Lifecycle", "Artifacts", "Intervention"].map((item) => (
              <div key={item} className="rounded-2xl border border-zinc-800 bg-black p-4 text-center text-sm font-semibold text-zinc-200">{item}</div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
        <DetailCard title="Mission lifecycle">
          <div className="space-y-4">
            {workflowStages.map((stage, index) => (
              <div key={stage.label} className="rounded-2xl border border-zinc-800 bg-black p-4">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                  <div>
                    <div className="text-xs font-semibold uppercase tracking-[0.3em] text-blue-300">{String(index + 1).padStart(2, "0")} · {stage.owner}</div>
                    <div className="mt-2 text-xl font-semibold text-white">{stage.label}</div>
                  </div>
                  <span className="w-fit rounded-full border border-emerald-400/30 bg-emerald-500/10 px-3 py-1 text-xs uppercase tracking-[0.2em] text-emerald-200">{stage.status}</span>
                </div>
                <p className="mt-3 text-sm leading-6 text-zinc-400">{stage.detail}</p>
              </div>
            ))}
          </div>
        </DetailCard>

        <div className="space-y-6">
          <DetailCard title="Artifact slots">
            <div className="grid gap-3">
              {artifactSlots.map((slot) => (
                <div key={slot} className="rounded-2xl border border-zinc-800 bg-black px-4 py-3 text-sm text-zinc-300">{slot}</div>
              ))}
            </div>
          </DetailCard>

          <DetailCard title="Intervention rules">
            <div className="space-y-3">
              {interventionRules.map((rule) => (
                <div key={rule} className="rounded-2xl border border-purple-400/20 bg-purple-500/5 px-4 py-3 text-sm leading-6 text-purple-100">{rule}</div>
              ))}
            </div>
          </DetailCard>
        </div>
      </div>

      <div className="flex flex-col gap-3 sm:flex-row">
        <Link href={`/${lang}/mission-control/live`} className="rounded-2xl border border-purple-400/30 bg-purple-500/10 px-5 py-3 text-sm font-semibold text-purple-100 transition hover:bg-purple-500/20">Open live operations</Link>
        <Link href={`/${lang}/mission-control/decision-audit-trail-1`} className="rounded-2xl border border-blue-400/30 bg-blue-500/10 px-5 py-3 text-sm font-semibold text-blue-100 transition hover:bg-blue-500/20">Review audit trail</Link>
      </div>
    </section>
  );
}
