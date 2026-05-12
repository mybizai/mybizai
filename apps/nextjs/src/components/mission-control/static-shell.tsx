import Link from "next/link";

import { commerceRoutes, missionControlScreens, type MissionControlScreen } from "~/data/mission-control";

function StatusPill({ children }: { children: string }) {
  return <span className="rounded-full border border-purple-400/40 bg-purple-500/10 px-3 py-1 text-xs uppercase tracking-[0.2em] text-purple-200">{children}</span>;
}

function PanelCard({ label }: { label: string }) {
  return <div className="rounded-2xl border border-zinc-800 bg-black px-4 py-3 text-sm text-zinc-300">{label}</div>;
}

export function MissionControlNav({ lang = "en" }: { lang?: string }) {
  const navItems = [
    { href: `/${lang}/mission-control`, label: "Overview" },
    { href: `/${lang}/mission-control/project-selection`, label: "Start" },
    { href: `/${lang}/mission-control/agent-conversation-hub`, label: "Live Hub" },
    { href: `/${lang}/mission-control/performance-dashboard-1`, label: "Ops" },
    { href: `/${lang}/mission-control/decision-audit-trail-1`, label: "Audit" },
  ];

  return (
    <nav className="sticky top-0 z-30 border-b border-blue-500/20 bg-black/80 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-6 py-4">
        <Link href={`/${lang}/mission-control`} className="bg-gradient-to-r from-blue-300 via-purple-300 to-emerald-300 bg-clip-text text-lg font-semibold tracking-tight text-transparent">MyBizAI</Link>
        <div className="hidden items-center gap-5 md:flex">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href} className="text-xs font-semibold uppercase tracking-[0.25em] text-zinc-400 transition hover:text-white">{item.label}</Link>
          ))}
        </div>
      </div>
    </nav>
  );
}

export function MissionHero({ lang = "en" }: { lang?: string }) {
  return (
    <div className="rounded-3xl border border-blue-500/30 bg-[radial-gradient(circle_at_top,#111a3a,transparent_42%),#050505] p-8 shadow-[0_0_60px_rgba(0,71,255,0.18)]">
      <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
        <div className="max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-[0.35em] text-blue-300">MyBizAI Mission Control</p>
          <h1 className="mt-4 text-5xl font-semibold tracking-tight md:text-7xl">Agentic operating system app shell</h1>
          <p className="mt-5 text-lg text-zinc-300">Production-facing static shell built from the real mock sequence: project setup, collaboration, agent team management, live hub, governance, performance, audit, and commerce placeholders.</p>
        </div>
        <div className="grid gap-3 sm:grid-cols-2 lg:w-80">
          <Link href={`/${lang}/mission-control/project-selection`} className="rounded-2xl border border-blue-400/40 bg-blue-500/10 p-5 text-sm text-blue-100 transition hover:bg-blue-500/20">
            <div className="text-3xl font-semibold text-white">Start</div>
            <div className="mt-1 uppercase tracking-[0.25em] text-blue-200">Project flow</div>
          </Link>
          <Link href={`/${lang}/mission-control/agent-conversation-hub`} className="rounded-2xl border border-purple-400/40 bg-purple-500/10 p-5 text-sm text-purple-100 transition hover:bg-purple-500/20">
            <div className="text-3xl font-semibold text-white">Live</div>
            <div className="mt-1 uppercase tracking-[0.25em] text-purple-200">Agent hub</div>
          </Link>
        </div>
      </div>
    </div>
  );
}

export function CommerceStrip({ lang = "en" }: { lang?: string }) {
  return (
    <div className="grid gap-4 md:grid-cols-7">
      {commerceRoutes.map((route) => (
        <Link key={route.slug} href={`/${lang}/mission-control/commerce/${route.slug}`} className="rounded-2xl border border-zinc-800 bg-zinc-950 px-4 py-3 text-center text-sm text-zinc-300 transition hover:border-emerald-400/60 hover:text-white">{route.title}</Link>
      ))}
    </div>
  );
}

export function ScreenGrid({ lang = "en" }: { lang?: string }) {
  return (
    <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
      {missionControlScreens.map((screen) => (
        <Link key={screen.phase} href={`/${lang}/mission-control/${screen.slug}`} className="group rounded-3xl border border-zinc-800 bg-zinc-950 p-5 transition hover:border-blue-500/70 hover:shadow-[0_0_35px_rgba(0,71,255,0.18)]">
          <div className="flex items-start justify-between gap-4">
            <div>
              <div className="text-xs font-semibold uppercase tracking-[0.35em] text-blue-300">{screen.phase}</div>
              <h2 className="mt-3 text-2xl font-semibold tracking-tight">{screen.title}</h2>
            </div>
            <StatusPill>{screen.status}</StatusPill>
          </div>
          <p className="mt-4 min-h-16 text-sm leading-6 text-zinc-400">{screen.summary}</p>
          <div className="mt-5 grid gap-3">
            {screen.panels.map((panel) => <PanelCard key={panel} label={panel} />)}
          </div>
        </Link>
      ))}
    </div>
  );
}

export function MissionScreenPage({ screen, lang = "en" }: { screen: MissionControlScreen; lang?: string }) {
  const currentIndex = missionControlScreens.findIndex((item) => item.slug === screen.slug);
  const previous = currentIndex > 0 ? missionControlScreens[currentIndex - 1] : undefined;
  const next = currentIndex < missionControlScreens.length - 1 ? missionControlScreens[currentIndex + 1] : undefined;

  return (
    <main className="min-h-screen bg-black text-white">
      <MissionControlNav lang={lang} />
      <section className="mx-auto max-w-7xl px-6 py-10">
        <div className="rounded-3xl border border-blue-500/30 bg-[radial-gradient(circle_at_top,#101a3a,transparent_48%),#050505] p-8">
          <div className="flex flex-col gap-8 lg:flex-row lg:items-start lg:justify-between">
            <div className="max-w-4xl">
              <p className="text-sm font-semibold uppercase tracking-[0.35em] text-blue-300">Screen {screen.phase}</p>
              <h1 className="mt-4 text-5xl font-semibold tracking-tight md:text-7xl">{screen.title}</h1>
              <p className="mt-5 max-w-3xl text-lg leading-8 text-zinc-300">{screen.summary}</p>
            </div>
            <StatusPill>{screen.status}</StatusPill>
          </div>
        </div>

        <div className="mt-8 grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
          <section className="rounded-3xl border border-zinc-800 bg-zinc-950 p-6">
            <h2 className="text-2xl font-semibold">Primary workspace</h2>
            <p className="mt-3 text-sm leading-6 text-zinc-400">{screen.objective}</p>
            <div className="mt-6 grid gap-4 md:grid-cols-3">
              {screen.panels.map((panel) => <PanelCard key={panel} label={panel} />)}
            </div>
            <div className="mt-8 rounded-3xl border border-blue-500/20 bg-black p-5">
              <div className="grid gap-4 md:grid-cols-3">
                {screen.metrics.map((metric) => (
                  <div key={metric} className="rounded-2xl border border-zinc-800 bg-zinc-950 p-4">
                    <div className="text-2xl font-semibold">{metric}</div>
                    <div className="mt-2 text-xs uppercase tracking-[0.25em] text-zinc-500">Static metric</div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <aside className="rounded-3xl border border-zinc-800 bg-zinc-950 p-6">
            <h2 className="text-2xl font-semibold">Flow position</h2>
            <div className="mt-6 space-y-3">
              {previous ? <Link href={`/${lang}/mission-control/${previous.slug}`} className="block rounded-2xl border border-zinc-800 bg-black p-4 text-sm text-zinc-300 transition hover:border-blue-400/60">Previous: {previous.title}</Link> : null}
              {next ? <Link href={`/${lang}/mission-control/${next.slug}`} className="block rounded-2xl border border-zinc-800 bg-black p-4 text-sm text-zinc-300 transition hover:border-blue-400/60">Next: {next.title}</Link> : null}
              <Link href={`/${lang}/mission-control`} className="block rounded-2xl border border-purple-400/30 bg-purple-500/10 p-4 text-sm text-purple-100 transition hover:bg-purple-500/20">Back to full map</Link>
            </div>
          </aside>
        </div>
      </section>
    </main>
  );
}
