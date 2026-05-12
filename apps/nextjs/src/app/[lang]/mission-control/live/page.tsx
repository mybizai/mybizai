import Link from "next/link";

import { MissionControlNav } from "~/components/mission-control/static-shell";

const lanes = [
  { title: "Queued", count: "05", items: ["Market scan", "Competitor synthesis", "Pricing check"] },
  { title: "Running", count: "03", items: ["Workflow architecture", "Offer positioning", "Governance review"] },
  { title: "Paused", count: "02", items: ["Payment policy", "Cancellation language"] },
  { title: "Complete", count: "18", items: ["Project setup", "Team draft", "Audit baseline"] },
];

export default async function LiveOperationsPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;

  return (
    <main className="min-h-screen bg-black text-white">
      <MissionControlNav lang={lang} />
      <section className="mx-auto max-w-7xl px-6 py-10">
        <div className="rounded-3xl border border-purple-400/30 bg-[radial-gradient(circle_at_top,#1d123a,transparent_48%),#050505] p-8">
          <p className="text-sm font-semibold uppercase tracking-[0.35em] text-purple-300">Live operations</p>
          <h1 className="mt-4 text-5xl font-semibold tracking-tight md:text-7xl">Mission queue control</h1>
          <p className="mt-5 max-w-3xl text-lg leading-8 text-zinc-300">Static operational board for visualizing agent queues, paused work, and completed execution lanes before backend state streaming is connected.</p>
        </div>

        <div className="mt-8 grid gap-5 lg:grid-cols-4">
          {lanes.map((lane) => (
            <section key={lane.title} className="rounded-3xl border border-zinc-800 bg-zinc-950 p-5">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-semibold">{lane.title}</h2>
                <span className="rounded-full border border-blue-400/30 bg-blue-500/10 px-3 py-1 text-sm text-blue-200">{lane.count}</span>
              </div>
              <div className="mt-5 space-y-3">
                {lane.items.map((item) => (
                  <div key={item} className="rounded-2xl border border-zinc-800 bg-black p-4 text-sm text-zinc-300">{item}</div>
                ))}
              </div>
            </section>
          ))}
        </div>

        <Link href={`/${lang}/mission-control/agent-conversation-hub`} className="mt-8 inline-flex rounded-2xl border border-purple-400/30 bg-purple-500/10 px-5 py-3 text-sm text-purple-100 transition hover:bg-purple-500/20">Open conversation hub</Link>
      </section>
    </main>
  );
}
