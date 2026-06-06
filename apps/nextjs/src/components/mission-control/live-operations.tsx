import * as React from "react";
import Link from "next/link";
import { LayerCard, ChipGrid } from "./ui-primitives";

const conversationPanels = ["Live Thread", "Agent Queue", "Human Intervention", "Pinned Context"];
const voiceStates = ["Input waveform", "Live transcription", "Agent voice identity", "Playback state"];
const collaborationModes = ["Solo operator", "Human team", "Agent team", "Mixed review", "Executive mode"];
const feedbackLoops = ["User rating", "Agent self-review", "Outcome score", "Escalation note", "Retrospective"];

export function LiveOperationsSection({ lang = "en" }: { lang?: string }) {
  return (
    <div className="space-y-8">
      <LayerCard
        kicker="Layer 02"
        title="Conversation cockpit"
        description="Creates the product surface for live chat, agent queue visibility, intervention actions, and pinned context."
        tone="purple"
      >
        <div className="grid gap-3 md:grid-cols-2">
          {conversationPanels.map((panel) => (
            <Link key={panel} href={`/${lang}/mission-control/live-ops`} className="rounded-2xl border border-purple-400/20 bg-purple-500/5 p-4 text-sm font-semibold text-purple-100 transition hover:bg-purple-500/10">{panel}</Link>
          ))}
        </div>
      </LayerCard>

      <LayerCard
        kicker="Layer 04"
        title="Voice readiness"
        description="Prepares the interface model for STT/TTS, waveform states, transcription, and unique agent voice identity."
        tone="cyan"
      >
        <ChipGrid items={voiceStates} tone="cyan" />
      </LayerCard>

      <LayerCard
        kicker="Layer 14"
        title="Feedback loops"
        description="Adds user feedback, self-review, outcome scoring, escalation notes, and retrospectives as visible product concepts."
        tone="emerald"
      >
        <ChipGrid items={feedbackLoops} tone="emerald" />
      </LayerCard>

      <LayerCard
        kicker="Layer 19"
        title="Collaboration modes"
        description="Prepares the UI model for solo, team, agent, mixed review, and executive workflows."
        tone="lime"
      >
        <ChipGrid items={collaborationModes} tone="lime" />
      </LayerCard>
    </div>
  );
}
