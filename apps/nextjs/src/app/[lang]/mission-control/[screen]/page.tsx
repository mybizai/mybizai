import { notFound } from "next/navigation";

import { MissionScreenPage } from "~/components/mission-control/static-shell";
import { missionControlScreens } from "~/data/mission-control";

export default async function MissionControlScreenRoute({
  params,
}: {
  params: Promise<{ lang: string; screen: string }>;
}) {
  const { lang, screen: screenSlug } = await params;
  const screen = missionControlScreens.find((item) => item.slug === screenSlug);

  if (!screen) {
    notFound();
  }

  return <MissionScreenPage screen={screen} lang={lang} />;
}
