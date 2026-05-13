import * as React from "react";
import { LayerCard, ChipGrid } from "./ui-primitives";

const commerceGuardrails = [
  { title: "Price protection", status: "Active", detail: "Prevents unauthorized price overrides in automated workflows." },
  { title: "Subscription sync", status: "Enabled", detail: "Ensures agent-driven seat management matches active Stripe plans." },
  { title: "Checkout audit", status: "Manual", detail: "All agent-initiated checkout requests require human multi-sig." },
];

const growthSurfaces = ["Upgrade prompts", "Usage insights", "Team invites", "Template library", "Success stories"];

export function CommerceOpsSection({ lang: _lang = "en" }: { lang?: string }) {
  return (
    <div className="space-y-8">
      <section className="rounded-3xl border border-zinc-800 bg-zinc-950 p-6">
        <h3 className="text-2xl font-semibold tracking-tight">Commerce guardrails</h3>
        <div className="mt-6 grid gap-4 md:grid-cols-3">
          {commerceGuardrails.map((guard) => (
            <div key={guard.title} className="rounded-2xl border border-zinc-800 bg-black p-5">
              <div className="flex items-start justify-between gap-4">
                <h4 className="font-semibold text-white">{guard.title}</h4>
                <span className="rounded-full border border-emerald-400/30 bg-emerald-500/10 px-3 py-1 text-xs uppercase tracking-[0.2em] text-emerald-200">{guard.status}</span>
              </div>
              <p className="mt-4 text-sm leading-6 text-zinc-400">{guard.detail}</p>
            </div>
          ))}
        </div>
      </section>

      <LayerCard
        kicker="Layer 15"
        title="Growth surfaces"
        description="Adds static product growth surfaces for upgrades, usage insights, invites, templates, and success storytelling."
        tone="cyan"
      >
        <ChipGrid items={growthSurfaces} tone="cyan" />
      </LayerCard>
    </div>
  );
}
