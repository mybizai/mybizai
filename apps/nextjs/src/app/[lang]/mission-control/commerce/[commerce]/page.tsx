import Link from "next/link";
import { notFound } from "next/navigation";

import { MissionControlNav } from "~/components/mission-control/static-shell";
import { commerceRoutes } from "~/data/mission-control";

export default async function CommercePlaceholderRoute({
  params,
}: {
  params: Promise<{ lang: string; commerce: string }>;
}) {
  const { lang, commerce } = await params;
  const route = commerceRoutes.find((item) => item.slug === commerce);

  if (!route) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-black text-white">
      <MissionControlNav lang={lang} />
      <section className="mx-auto max-w-5xl px-6 py-10">
        <div className="rounded-3xl border border-emerald-400/30 bg-[radial-gradient(circle_at_top,#06251a,transparent_48%),#050505] p-8 shadow-[0_0_60px_rgba(0,245,160,0.12)]">
          <p className="text-sm font-semibold uppercase tracking-[0.35em] text-emerald-300">Commerce placeholder</p>
          <h1 className="mt-4 text-5xl font-semibold tracking-tight md:text-7xl">{route.title}</h1>
          <p className="mt-5 max-w-3xl text-lg leading-8 text-zinc-300">{route.summary}</p>
        </div>

        <div className="mt-8 grid gap-5 md:grid-cols-3">
          {["Experience", "Data Model", "Integration"].map((item) => (
            <div key={item} className="rounded-3xl border border-zinc-800 bg-zinc-950 p-6">
              <h2 className="text-2xl font-semibold">{item}</h2>
              <p className="mt-3 text-sm leading-6 text-zinc-400">Static shell slot reserved for the future {route.title.toLowerCase()} workflow.</p>
            </div>
          ))}
        </div>

        <Link href={`/${lang}/mission-control`} className="mt-8 inline-flex rounded-2xl border border-purple-400/30 bg-purple-500/10 px-5 py-3 text-sm text-purple-100 transition hover:bg-purple-500/20">Back to Mission Control</Link>
      </section>
    </main>
  );
}
