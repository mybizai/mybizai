import * as React from "react";
import { LayerCard, ChipGrid } from "./ui-primitives";

const insightSurfaces = ["Executive summary", "Agent findings", "Risk notes", "Next actions", "Blocked items"];
const workspaceHealth = ["Context quality", "Team coverage", "Approval depth", "Artifact coverage", "Telemetry readiness"];

export function ObservabilityOpsSection({ lang: _lang = "en" }: { lang?: string }) {
  return (
    <div className="space-y-8">
      <LayerCard
        kicker="Layer 17"
        title="Insight surface"
        description="Creates executive-ready summaries for findings, risks, blocks, and recommended next moves."
        tone="lime"
      >
        <ChipGrid items={insightSurfaces} tone="lime" />
      </LayerCard>

      <LayerCard
        kicker="Layer 18"
        title="Workspace health"
        description="Adds a static health model for context, team coverage, approval depth, artifacts, and telemetry."
        tone="lime"
      >
        <ChipGrid items={workspaceHealth} tone="lime" />
      </LayerCard>
    </div>
  );
}
