import * as React from "react";
import { ChipGrid, LayerCard } from "./ui-primitives";

const projectStages = ["Brief", "Sources", "Team", "Launch", "Delivery"];
const onboardingSteps = ["Welcome", "Business profile", "Goals", "Sources", "First mission"];
const templateTypes = ["Launch plan", "Market analysis", "Offer design", "Ops review", "Audit package"];
const workflowSteps = ["Node identification", "Edge mapping", "Dependency resolution", "Runtime simulation"];

export function ProjectManagementSection({ lang: _lang = "en" }: { lang?: string }) {
  return (
    <div className="space-y-8">
      <LayerCard
        kicker="Layer 01"
        title="Project lifecycle"
        description="Shows the project moving from brief intake through source attachment, team creation, launch, and delivery."
        tone="amber"
      >
        <ChipGrid items={projectStages} tone="amber" />
      </LayerCard>

      <LayerCard
        kicker="Layer 06"
        title="Workflow detail"
        description="Drills into the specific agentic execution graph, identifying nodes, edges, and dependencies."
        tone="orange"
      >
        <ChipGrid items={workflowSteps} tone="orange" />
      </LayerCard>

      <LayerCard
        kicker="Layer 11"
        title="Onboarding path"
        description="Frames the first-run flow from welcome through business setup, source collection, and the first mission."
        tone="orange"
      >
        <ChipGrid items={onboardingSteps} tone="orange" />
      </LayerCard>

      <LayerCard
        kicker="Layer 16"
        title="Template library"
        description="Frames reusable mission templates for repeatable business workflows."
        tone="lime"
      >
        <ChipGrid items={templateTypes} tone="lime" />
      </LayerCard>
    </div>
  );
}
