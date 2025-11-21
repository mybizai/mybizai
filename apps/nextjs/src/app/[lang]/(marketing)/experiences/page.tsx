import type { Metadata } from "next";
import Link from "next/link";

import { Button } from "@saasfly/ui/button";

import { MockGalleryClient } from "~/components/mock-gallery.client";
import { MockSpotlight } from "~/components/mock-spotlight";
import {
  FEATURED_JOURNEY_ORDER,
  MOCK_ANNOTATIONS,
  CATEGORY_TAGLINES,
} from "~/data/mock-showcase";
import type { Locale } from "~/config/i18n-config";
import { getDictionary } from "~/lib/get-dictionary";
import { getMockAssets } from "~/lib/mock-library";

export async function generateMetadata({
  params: { lang },
}: {
  params: { lang: Locale };
}): Promise<Metadata> {
  const dict = await getDictionary(lang);

  return {
    title: `${dict.marketing.mock_showcase.title} | MyBizAI`,
    description: dict.marketing.mock_showcase.description,
  };
}

export default async function ExperiencesPage({
  params,
}: {
  params: Promise<{
    lang: Locale;
  }>;
}) {
  const { lang } = await params;
  const [dict, mocks] = await Promise.all([
    getDictionary(lang),
    getMockAssets(),
  ]);

  const totalCategories = new Set(mocks.map((mock) => mock.category)).size;
  const byId = new Map(mocks.map((mock) => [mock.id, mock] as const));

  const spotlight = FEATURED_JOURNEY_ORDER.map((id) => byId.get(id)).find(
    (item): item is typeof mocks[number] => Boolean(item),
  ) ?? mocks[0];

  const curatedSequence = FEATURED_JOURNEY_ORDER.map((id) => byId.get(id)).filter(
    (item): item is typeof mocks[number] => Boolean(item),
  );

  const curatedRemainder = FEATURED_JOURNEY_ORDER.filter(
    (id) => id !== spotlight?.id,
  )
    .map((id) => byId.get(id))
    .filter((item): item is typeof mocks[number] => Boolean(item));

  const remainingAlphabetical = mocks
    .filter((mock) =>
      mock.id !== spotlight?.id && !FEATURED_JOURNEY_ORDER.includes(mock.id),
    )
    .sort((a, b) => a.title.localeCompare(b.title));

  const galleryEntries = [...curatedRemainder, ...remainingAlphabetical];
  const spotlightAnnotation = spotlight ? MOCK_ANNOTATIONS[spotlight.id] : undefined;
  const quickTour = curatedSequence;

  return (
    <section className="container space-y-10 py-16">
      <div className="grid gap-8 text-center md:space-y-5">
        <div className="space-y-4">
          <p className="text-sm font-semibold uppercase tracking-widest text-primary/80">
            {dict.marketing.mock_showcase.badge}
          </p>
          <h1 className="text-4xl font-bold tracking-tight text-foreground md:text-5xl">
            {dict.marketing.mock_showcase.title}
          </h1>
          <p className="mx-auto max-w-3xl text-lg text-muted-foreground">
            {dict.marketing.mock_showcase.description}
          </p>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-muted-foreground">
          <span className="rounded-full border border-border/60 px-4 py-2">
            {mocks.length} curated screens
          </span>
          <span className="rounded-full border border-border/60 px-4 py-2">
            {totalCategories} primary product journeys
          </span>
          <span className="rounded-full border border-border/60 px-4 py-2">
            Ready for stakeholder walkthroughs
          </span>
        </div>

        <div className="flex justify-center">
          <Button asChild variant="outline">
            <Link href={`/${lang}`}>{dict.marketing.mock_showcase.back_to_home}</Link>
          </Button>
        </div>
      </div>

      {quickTour.length ? (
        <div className="rounded-xl border border-border/50 bg-card/60 p-6">
          <h2 className="text-lg font-semibold text-foreground">Quick tour</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Share these six screens in order to give a complete story—from first-run
            onboarding through collaboration and analytics.
          </p>
          <ol className="mt-4 space-y-3 text-sm text-muted-foreground">
            {quickTour.map((journey, index) => {
              const annotation = MOCK_ANNOTATIONS[journey.id];
              return (
                <li
                  key={`${journey.id}-quick-tour`}
                  className="flex items-start gap-3 rounded-lg border border-border/40 bg-background/60 p-3"
                >
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary/10 text-xs font-semibold text-primary">
                    {index + 1}
                  </span>
                  <div className="space-y-1">
                    <Link
                      href={`/${lang}/experiences/${journey.routePath || encodeURIComponent(journey.id)}`}
                      className="font-medium text-foreground hover:text-primary"
                    >
                      {annotation?.headline ?? journey.title}
                    </Link>
                    <p className="text-xs text-muted-foreground">
                      {annotation?.description ?? journey.categoryLabel}
                    </p>
                  </div>
                </li>
              );
            })}
          </ol>
        </div>
      ) : null}

      {spotlight ? (
        <MockSpotlight
          locale={lang}
          asset={spotlight}
          annotation={spotlightAnnotation}
        />
      ) : null}

      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-semibold">Browse every experience</h2>
          <p className="text-sm text-muted-foreground">
            Use the filters to jump to the journey that matters for today’s
            conversation.
          </p>
        </div>
        <MockGalleryClient
          entries={galleryEntries}
          enableFilters
          showCodeLinks
          locale={lang}
          taglines={CATEGORY_TAGLINES}
        />
      </div>
    </section>
  );
}
