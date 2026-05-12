import Link from "next/link";

const artifactTypes = [
  { title: "Source Library", count: "14", detail: "Uploaded briefs, PDFs, transcripts, research files, and supporting materials." },
  { title: "Agent Outputs", count: "27", detail: "Drafts, reports, strategy notes, generated assets, and structured task results." },
  { title: "Decision Evidence", count: "132", detail: "Tool calls, approvals, overrides, source references, and audit-linked events." },
  { title: "Delivery Package", count: "06", detail: "Final exports, project summaries, invoice records, and handoff-ready artifacts." },
];

const artifactLifecycle = [
  "Ingest source material",
  "Attach to project context",
  "Reference during agent work",
  "Bind to decisions and approvals",
  "Package final delivery",
];

export function MissionArtifactsLayer({ lang = "en" }: { lang?: string }) {
  return (
    <section className="mt-12 space-y-8">
      <div className="rounded-3xl border border-cyan-400/20 bg-[radial-gradient(circle_at_top_right,#062436,transparent_45%),#050505] p-8">
        <p className="text-xs font-semibold uppercase tracking-[0.35em] text-cyan-300">Artifacts layer</p>
        <div className="mt-4 grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
          <div>
            <h2 className="text-4xl font-semibold tracking-tight md:text-6xl">Project memory surface</h2>
            <p className="mt-5 text-sm leading-7 text-zinc-400">Adds a production-facing artifact layer for source files, generated outputs, decision evidence, and final delivery packages before storage and upload wiring are connected.</p>
          </div>
          <Link href={`/${lang}/mission-control/project-selection`} className="rounded-3xl border border-cyan-400/30 bg-cyan-500/10 p-5 text-sm font-semibold text-cyan-100 transition hover:bg-cyan-500/20">Start with project context</Link>
        </div>
      </div>

      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
        {artifactTypes.map((artifact) => (
          <div key={artifact.title} className="rounded-3xl border border-zinc-800 bg-zinc-950 p-5">
            <div className="text-xs uppercase tracking-[0.3em] text-zinc-500">{artifact.title}</div>
            <div className="mt-3 text-4xl font-semibold text-white">{artifact.count}</div>
            <p className="mt-3 text-sm leading-6 text-zinc-400">{artifact.detail}</p>
          </div>
        ))}
      </div>

      <section className="rounded-3xl border border-zinc-800 bg-zinc-950 p-6">
        <h3 className="text-2xl font-semibold tracking-tight">Artifact lifecycle</h3>
        <div className="mt-6 grid gap-4 md:grid-cols-5">
          {artifactLifecycle.map((step, index) => (
            <div key={step} className="rounded-2xl border border-zinc-800 bg-black p-4">
              <div className="text-xs font-semibold uppercase tracking-[0.35em] text-cyan-300">{String(index + 1).padStart(2, "0")}</div>
              <div className="mt-3 text-sm font-semibold leading-6 text-zinc-200">{step}</div>
            </div>
          ))}
        </div>
      </section>
    </section>
  );
}
