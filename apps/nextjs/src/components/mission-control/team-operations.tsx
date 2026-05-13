import * as React from "react";
import Link from "next/link";
import { ChipGrid, LayerCard } from "./ui-primitives";

const agentProfiles = [
  { code: "PM", name: "Project Manager", role: "Coordination", autonomy: "80%", state: "Idle" },
  { code: "RA", name: "Research Analyst", role: "Evidence", autonomy: "70%", state: "Searching" },
  { code: "WA", name: "Workflow Architect", role: "Planning", autonomy: "90%", state: "Synthesizing" },
  { code: "GA", name: "Governance Auditor", role: "Policy", autonomy: "40%", state: "Reviewing" },
  { code: "CA", name: "Commerce Agent", role: "Revenue", autonomy: "30%", state: "Locked" },
  { code: "OA", name: "Ops Analyst", role: "Telemetry", autonomy: "60%", state: "Watching health" },
];

const accessRoles = ["Owner", "Admin", "Operator", "Reviewer", "Viewer"];

export function TeamOperationsSection({ lang = "en" }: { lang?: string }) {
  return (
    <div className="space-y-8">
      <section className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-3xl font-semibold tracking-tight">AI Workforce</h2>
          <Link href={`/${lang}/mission-control/team`} className="text-sm font-semibold text-purple-400 hover:text-purple-300">View roster</Link>
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
      </section>

      <LayerCard
        kicker="Layer 08"
        title="Access control"
        description="Defines the initial static role model for workspace-level permissions and review authority."
        tone="purple"
      >
        <ChipGrid items={accessRoles} tone="purple" />
      </LayerCard>
    </div>
  );
}
