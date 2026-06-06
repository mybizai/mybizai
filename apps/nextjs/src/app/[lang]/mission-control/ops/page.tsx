import Link from "next/link";
import { ObservabilityOpsSection } from "~/components/mission-control/observability-ops";
import { MissionControlNav } from "~/components/mission-control/static-shell";

export default async function MissionOpsPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;

  return (
    <main className="min-h-screen bg-black text-white">
      <MissionControlNav lang={lang} />
      <section className="mx-auto max-w-7xl px-6 py-10">
        <ObservabilityOpsSection lang={lang} />
        <div className="mt-8">
          <Link href={`/${lang}/mission-control`} className="inline-flex rounded-2xl border border-blue-400/30 bg-blue-500/10 px-5 py-3 text-sm font-semibold text-blue-100 transition hover:bg-blue-500/20">Back to Mission Control</Link>
        </div>
      </section>
    </main>
  );
}
