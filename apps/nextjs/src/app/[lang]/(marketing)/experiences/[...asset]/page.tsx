import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Balancer from "react-wrap-balancer";

import { cn } from "@saasfly/ui";
import { Button } from "@saasfly/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@saasfly/ui/card";

import type { Locale } from "~/config/i18n-config";
import { getDictionary } from "~/lib/get-dictionary";
import {
  getMockAssetByRoute,
  getMockAssets,
  getMockAssetNeighbours,
  type MockAsset,
} from "~/lib/mock-library";
import {
  FEATURED_JOURNEY_ORDER,
  MOCK_ANNOTATIONS,
} from "~/data/mock-showcase";

interface ExperiencesDetailParams {
  params: {
    lang: Locale;
    asset?: string[];
  };
}

function buildAssetHref(locale: string, asset: MockAsset) {
  const route = asset.routePath || encodeURIComponent(asset.id);
  return `/${locale}/experiences/${route}`;
}

export async function generateMetadata({
  params: { lang, asset = [] },
}: ExperiencesDetailParams): Promise<Metadata> {
  const [dict, mockAsset] = await Promise.all([
    getDictionary(lang),
    getMockAssetByRoute(asset),
  ]);

  if (!mockAsset) {
    return {};
  }

  const title = `${mockAsset.title} • ${dict.marketing.mock_showcase.title}`;

  return {
    title,
    description: dict.marketing.mock_showcase.description,
    openGraph: {
      title,
      images: [{ url: mockAsset.imageUrl }],
    },
    twitter: {
      title,
      images: [mockAsset.imageUrl],
    },
  };
}

export default async function ExperiencesDetailPage({
  params: { lang, asset = [] },
}: ExperiencesDetailParams) {
  const [dict, mockAsset, allAssets] = await Promise.all([
    getDictionary(lang),
    getMockAssetByRoute(asset),
    getMockAssets(),
  ]);

  if (!mockAsset) {
    notFound();
  }

  const assetById = new Map(allAssets.map((item) => [item.id, item] as const));
  const coreJourneys = FEATURED_JOURNEY_ORDER.map((id) => assetById.get(id)).filter(
    (item): item is MockAsset => Boolean(item),
  );

  const otherJourneys = allAssets
    .filter((item) => item.id !== mockAsset.id && !FEATURED_JOURNEY_ORDER.includes(item.id))
    .sort((a, b) => a.title.localeCompare(b.title));

  const neighbours = await getMockAssetNeighbours(mockAsset.id);
  const annotation = MOCK_ANNOTATIONS[mockAsset.id];

  const related = allAssets
    .filter((item) => item.category === mockAsset.category && item.id !== mockAsset.id)
    .slice(0, 6);

  return (
    <section className="container py-12 lg:py-16">
      <div className="grid gap-10 lg:grid-cols-[260px_1fr]">
        <aside className="hidden lg:block">
          <div className="sticky top-24 space-y-8">
            {coreJourneys.length ? (
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.3em] text-muted-foreground">
                  Core journeys
                </p>
                <nav className="mt-3 space-y-1">
                  {coreJourneys.map((journey) => {
                    const isActive = journey.id === mockAsset.id;
                    const href = buildAssetHref(lang, journey);
                    const label =
                      MOCK_ANNOTATIONS[journey.id]?.headline ?? journey.title;
                    return (
                      <Link
                        key={`core-${journey.id}`}
                        href={href}
                        className={cn(
                          "flex items-center rounded-lg px-3 py-2 text-sm transition",
                          isActive
                            ? "bg-primary/10 text-primary"
                            : "text-muted-foreground hover:bg-muted/50 hover:text-foreground",
                        )}
                      >
                        {label}
                      </Link>
                    );
                  })}
                </nav>
              </div>
            ) : null}

            {otherJourneys.length ? (
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.3em] text-muted-foreground">
                  All screens
                </p>
                <nav className="mt-3 space-y-1">
                  {otherJourneys.map((journey) => {
                    const isActive = journey.id === mockAsset.id;
                    const href = buildAssetHref(lang, journey);
                    return (
                      <Link
                        key={`others-${journey.id}`}
                        href={href}
                        className={cn(
                          "flex items-center rounded-lg px-3 py-2 text-sm transition",
                          isActive
                            ? "bg-primary/10 text-primary"
                            : "text-muted-foreground hover:bg-muted/50 hover:text-foreground",
                        )}
                      >
                        {journey.title}
                      </Link>
                    );
                  })}
                </nav>
              </div>
            ) : null}
          </div>
        </aside>

        <div className="space-y-10">
          <div className="flex flex-wrap items-center justify-between gap-3 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <Link href={`/${lang}/experiences`} className="hover:text-primary">
                Experiences
              </Link>
              <span>/</span>
              <span>{mockAsset.categoryLabel}</span>
            </div>
            <div className="flex items-center gap-2">
              {neighbours.previous ? (
                <Button asChild variant="ghost" size="sm" className="px-3">
                  <Link href={buildAssetHref(lang, neighbours.previous)}>
                    ← {neighbours.previous.title}
                  </Link>
                </Button>
              ) : null}
              {neighbours.next ? (
                <Button asChild variant="ghost" size="sm" className="px-3">
                  <Link href={buildAssetHref(lang, neighbours.next)}>
                    {neighbours.next.title} →
                  </Link>
                </Button>
              ) : null}
            </div>
          </div>

          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div className="space-y-3 max-w-3xl">
              <p className="text-sm font-semibold uppercase tracking-widest text-primary/80">
                {dict.marketing.mock_showcase.badge}
              </p>
              <h1 className="text-4xl font-bold tracking-tight text-foreground md:text-5xl">
                <Balancer>{mockAsset.title}</Balancer>
              </h1>
              {mockAsset.scenarioLabels.length ? (
                <div className="flex flex-wrap gap-2">
                  {mockAsset.scenarioLabels.map((label, index) => (
                    <span
                      key={`${mockAsset.id}-tag-${label}-${index}`}
                      className="rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary"
                    >
                      {label}
                    </span>
                  ))}
                </div>
              ) : null}
            </div>
            <div className="flex flex-wrap gap-3">
              <Button variant="outline" asChild>
                <Link href={`/${lang}/experiences`}>
                  {dict.marketing.mock_showcase.back_to_home}
                </Link>
              </Button>
              {mockAsset.codeUrl ? (
                <Button asChild>
                  <a href={mockAsset.codeUrl} target="_blank" rel="noreferrer">
                    View HTML Mock
                  </a>
                </Button>
              ) : null}
              <Button asChild variant="secondary">
                <a href={mockAsset.imageUrl} target="_blank" rel="noreferrer">
                  Open Full Image
                </a>
              </Button>
            </div>
          </div>

          <Card className="overflow-hidden border-border/50 bg-muted/30">
            <CardHeader className="border-b border-border/40">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {mockAsset.categoryLabel}
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="relative w-full overflow-hidden bg-background">
                <Image
                  src={mockAsset.imageUrl}
                  alt={mockAsset.title}
                  width={1920}
                  height={1080}
                  unoptimized
                  className="h-full w-full object-contain bg-[radial-gradient(circle_at_top,_rgba(20,_20,_60,_0.35),_transparent_60%)]"
                />
              </div>
            </CardContent>
          </Card>

      {annotation ? (
        <div className="grid gap-4 rounded-xl border border-border/50 bg-card/60 p-6">
          <div>
            <h2 className="text-xl font-semibold text-foreground">
              {annotation.headline}
            </h2>
            <p className="mt-2 text-sm text-muted-foreground">
              {annotation.description}
            </p>
          </div>
          {annotation.highlights?.length ? (
            <ul className="space-y-2 text-sm text-muted-foreground">
              {annotation.highlights.map((point, index) => (
                <li key={`${mockAsset.id}-detail-highlight-${index}`} className="flex gap-2">
                  <span className="mt-1 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-primary/70" />
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          ) : null}
        </div>
      ) : null}

      {related.length ? (
        <div className="space-y-6">
          <div className="space-y-2">
            <h2 className="text-2xl font-semibold text-foreground">
              Related Experiences
            </h2>
            <p className="text-sm text-muted-foreground">
              Explore more screens from the {mockAsset.categoryLabel} flow.
            </p>
          </div>
          <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
            {related.map((item) => (
              <Link
                key={item.id}
                href={buildAssetHref(lang, item)}
                className="group block focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/60"
              >
                <Card className="h-full overflow-hidden border-border/50 bg-card/70 transition group-hover:-translate-y-1 group-hover:shadow-md">
                  <div className="relative aspect-[16/9] w-full overflow-hidden border-b border-border/40">
                    <Image
                      src={item.imageUrl}
                      alt={item.title}
                      width={800}
                      height={450}
                      unoptimized
                      className="h-full w-full object-cover transition group-hover:scale-105"
                    />
                  </div>
                  <CardHeader className="pb-4">
                    <CardTitle className="text-base font-medium">
                      {item.title}
                    </CardTitle>
                  </CardHeader>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      ) : null}
        </div>
      </div>
    </section>
  );
}
