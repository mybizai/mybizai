import { CommerceStrip, MissionControlNav, MissionHero, ScreenGrid } from "~/components/mission-control/static-shell";

export default async function MissionControlPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;

  return (
    <main className="min-h-screen bg-black text-white">
      <MissionControlNav lang={lang} />
      <section className="mx-auto max-w-7xl px-6 py-10">
        <MissionHero lang={lang} />
        <div className="mt-8">
          <CommerceStrip lang={lang} />
        </div>
        <div className="mt-10">
          <ScreenGrid lang={lang} />
        </div>
      </section>
    </main>
  );
}
