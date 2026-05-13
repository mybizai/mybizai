import * as React from "react";
import Link from "next/link";
import { LayerCard, ChipGrid } from "./ui-primitives";

const auditItems = ["Decision event", "Tool invocation", "Human approval", "Commerce guardrail", "Artifact export"];
const qualityGates = ["UX Review", "Policy Check", "Commerce Gate", "Perf Audit", "Merge Ready"];

export function GovernanceComplianceSection({ lang = "en" }: { lang?: string }) {
  return (
    <div className="space-y-8">
      <LayerCard
        kicker="Layer 03"
        title="Audit evidence"
        description="Frames traceable events for decisions, tools, approvals, commerce guardrails, and artifact exports."
        tone="blue"
      >
        <div className="space-y-3">
          {auditItems.map((item) => (
            <Link key={item} href={`/${lang}/mission-control/governance-audit`} className="block rounded-2xl border border-blue-400/20 bg-blue-500/5 p-4 text-sm font-semibold text-blue-100 transition hover:bg-blue-500/10">{item}</Link>
          ))}
        </div>
      </LayerCard>

      <LayerCard
        kicker="Layer 10"
        title="Quality gates"
        description="Adds the review surface for UX, policy, commerce, performance, and merge readiness."
        tone="emerald"
      >
        <ChipGrid items={qualityGates} tone="emerald" />
      </LayerCard>
    </div>
  );
}
