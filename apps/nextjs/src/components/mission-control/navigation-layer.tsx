import Link from "next/link";

const primaryRoutes = [
  { label: "Overview", href: "mission-control", detail: "Full command surface" },
  { label: "Live", href: "mission-control/live", detail: "Mission queue control" },
  { label: "Governance", href: "mission-control/governance", detail: "Approval and policy layer" },
  { label: "Commerce", href: "mission-control/commerce", detail: "Revenue workflow shell" },
  { label: "Observability", href: "mission-control/observability", detail: "Telemetry and event surface" },
  { label: "Artifacts", href: "mission-control/artifacts", detail: "Project memory surface" },
];

const routeGroups = [
  { title: "Project setup", routes: ["Project Selection", "Creation Wizard", "Collaboration Setup"] },
  { title: "Agent operations", routes: ["Agent Roster", "Team Builder", "Conversation Hub"] },
  { title: "Control layers", routes: ["Governance", "Commerce", "Observability"] },
  { title: "Records", routes: ["Artifacts", "Performance", "Decision Audit"] },
];

export function MissionNavigationLayer({ lang = "en" }: { lang?: string }) {
  return (
    <section className="mt-12 space-y-8">
      <div className="rounded-3xl border border-indigo-400/20 bg-[radial-gradient(circle_at_top,#17143a,transparent_45%),#050505] p-8">
        <p className="text-xs font-semibold uppercase tracking-[0.35em] text-indigo-300">Navigation layer</p>
        <div className="mt-4 grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
          <div>
            <h2 className="text-4xl font-semibold tracking-tight md:text-6xl">Command routing map</h2>
            <p className="mt-5 text-sm leading-7 text-zinc-400">Adds a production navigation layer that makes the growing Mission Control shell easier to operate across live operations, governance, commerce, observability, artifacts, and the full mock-derived workflow.</p>
          </div>
          <div className="rounded-3xl border border-zinc-800 bg-black p-5">
            <div className="text-4xl font-semibold text-white">6</div>
            <div className="mt-2 text-xs uppercase tracking-[0.3em] text-zinc-500">Primary command routes</div>
          </div>
        </div>
      </div>

      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {primaryRoutes.map((route) => (
          <Link key={route.href} href={`/${lang}/${route.href}`} className="rounded-3xl border border-zinc-800 bg-zinc-950 p-5 transition hover:border-indigo-400/60 hover:shadow-[0_0_35px_rgba(99,102,241,0.14)]">
            <div className="text-2xl font-semibold tracking-tight text-white">{route.label}</div>
            <p className="mt-3 text-sm leading-6 text-zinc-400">{route.detail}</p>
          </Link>
        ))}
      </div>

      <div className="grid gap-5 lg:grid-cols-4">
        {routeGroups.map((group) => (
          <section key={group.title} className="rounded-3xl border border-zinc-800 bg-zinc-950 p-5">
            <h3 className="text-xl font-semibold tracking-tight">{group.title}</h3>
            <div className="mt-5 space-y-3">
              {group.routes.map((route) => (
                <div key={route} className="rounded-2xl border border-zinc-800 bg-black px-4 py-3 text-sm text-zinc-300">{route}</div>
              ))}
            </div>
          </section>
        ))}
      </div>
    </section>
  );
}
