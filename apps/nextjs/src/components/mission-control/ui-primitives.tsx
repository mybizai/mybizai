import * as React from "react";
import { cn } from "~/lib/utils";

export function StatusPill({ children }: { children: string }) {
  return (
    <span className="rounded-full border border-purple-400/40 bg-purple-500/10 px-3 py-1 text-xs uppercase tracking-[0.2em] text-purple-200">
      {children}
    </span>
  );
}

export function PanelCard({ label }: { label: string }) {
  return (
    <div className="rounded-2xl border border-zinc-800 bg-black px-4 py-3 text-sm text-zinc-300">
      {label}
    </div>
  );
}

interface SectionHeaderProps {
  kicker: string;
  title: string;
  description: string;
  className?: string;
}

export function SectionHeader({ kicker, title, description, className }: SectionHeaderProps) {
  return (
    <div className={cn("flex flex-col gap-3 md:flex-row md:items-end md:justify-between", className)}>
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.35em] text-blue-300">{kicker}</p>
        <h2 className="mt-3 text-3xl font-semibold tracking-tight md:text-4xl">{title}</h2>
      </div>
      <p className="max-w-2xl text-sm leading-6 text-zinc-400">{description}</p>
    </div>
  );
}

interface LayerCardProps {
  kicker: string;
  title: string;
  description: string;
  children?: React.ReactNode;
  tone?: "blue" | "purple" | "emerald" | "amber" | "orange" | "cyan" | "lime";
}

export function LayerCard({ kicker, title, description, children, tone = "blue" }: LayerCardProps) {
  const toneMap = {
    blue: "text-blue-300 border-blue-400/20 bg-blue-500/5",
    purple: "text-purple-300 border-purple-400/20 bg-purple-500/5",
    emerald: "text-emerald-300 border-emerald-400/20 bg-emerald-500/5",
    amber: "text-amber-300 border-amber-400/20 bg-amber-500/5",
    orange: "text-orange-300 border-orange-400/20 bg-orange-500/5",
    cyan: "text-cyan-300 border-cyan-400/20 bg-cyan-500/5",
    lime: "text-lime-300 border-lime-400/20 bg-lime-500/5",
  };

  const kickerColor = toneMap[tone].split(" ")[0];

  return (
    <section className="rounded-3xl border border-zinc-800 bg-zinc-950 p-6">
      <p className={cn("text-xs font-semibold uppercase tracking-[0.35em]", kickerColor)}>{kicker}</p>
      <h3 className="mt-3 text-3xl font-semibold tracking-tight md:text-4xl">{title}</h3>
      <p className="mt-4 text-sm leading-7 text-zinc-400">{description}</p>
      {children && <div className="mt-5">{children}</div>}
    </section>
  );
}

export function ChipGrid({ items, tone = "blue" }: { items: string[]; tone?: "blue" | "purple" | "emerald" | "orange" | "cyan" | "lime" | "amber" }) {
  const toneClass = {
    blue: "border-blue-400/20 bg-blue-500/5 text-blue-100",
    purple: "border-purple-400/20 bg-purple-500/5 text-purple-100",
    emerald: "border-emerald-400/20 bg-emerald-500/5 text-emerald-100",
    orange: "border-orange-400/20 bg-orange-500/5 text-orange-100",
    cyan: "border-cyan-400/20 bg-cyan-500/5 text-cyan-100",
    lime: "border-lime-400/20 bg-lime-500/5 text-lime-100",
    amber: "border-amber-400/20 bg-amber-500/5 text-amber-100",
  }[tone];

  return (
    <div className="grid gap-3 md:grid-cols-5">
      {items.map((item) => (
        <div key={item} className={cn("rounded-2xl border p-4 text-sm font-semibold", toneClass)}>{item}</div>
      ))}
    </div>
  );
}
