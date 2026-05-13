import * as React from "react";
import Link from "next/link";
import { LayerCard, ChipGrid } from "./ui-primitives";

const settingsGroups = ["Workspace", "Agents", "Governance", "Commerce", "Observability"];
const adminPanels = ["Organization", "Members", "Security", "Billing access", "Audit defaults"];
const exportFormats = ["PDF", "CSV", "Markdown", "JSON", "Audit bundle"];
const notificationChannels = ["Email", "In-app", "Slack", "Webhook", "Mobile push"];
const integrationSlots = ["Vector DB", "LLM Provider", "Auth Service", "Billing Engine", "Search API"];
const dataReadiness = ["Profile data", "Project context", "Agent memory", "Artifacts", "Telemetry"];

export function WorkspaceAdminSection({ lang = "en" }: { lang?: string }) {
  return (
    <div className="space-y-8">
      <LayerCard
        kicker="Layer 05"
        title="Workspace settings"
        description="Adds the static product model for configuring workspace identity, agents, governance, commerce, and observability."
        tone="blue"
      >
        <ChipGrid items={settingsGroups} tone="blue" />
      </LayerCard>

      <LayerCard
        kicker="Layer 07"
        title="Notification cockpit"
        description="Prepares the UI model for alerts, summaries, external channel events, and audit-sensitive notifications."
        tone="blue"
      >
        <ChipGrid items={notificationChannels} tone="blue" />
      </LayerCard>

      <LayerCard
        kicker="Layer 09"
        title="Integration slots"
        description="Creates visible placeholders for the core systems that will power the static shell later."
        tone="cyan"
      >
        <ChipGrid items={integrationSlots} tone="cyan" />
      </LayerCard>

      <LayerCard
        kicker="Layer 12"
        title="Admin console"
        description="Creates the static management surface for organization settings, members, security, billing access, and audit defaults."
        tone="blue"
      >
        <ChipGrid items={adminPanels} tone="blue" />
      </LayerCard>

      <LayerCard
        kicker="Layer 13"
        title="Data readiness"
        description="Shows the readiness model for profile data, project context, memory, artifacts, and telemetry before backend data checks are connected."
        tone="purple"
      >
        <ChipGrid items={dataReadiness} tone="purple" />
      </LayerCard>

      <LayerCard
        kicker="Layer 20"
        title="Export controls"
        description="Adds static export format controls for future report, data, and audit package generation."
        tone="lime"
      >
        <div className="grid gap-3 md:grid-cols-5">
          {exportFormats.map((format) => (
            <Link key={format} href={`/${lang}/mission-control/admin`} className="rounded-2xl border border-lime-400/20 bg-lime-500/5 p-4 text-sm font-semibold text-lime-100 transition hover:bg-lime-500/10">{format}</Link>
          ))}
        </div>
      </LayerCard>
    </div>
  );
}
