"use client";

import Image from "next/image";
import Link from "next/link";

import { Button } from "@saasfly/ui/button";
import { Card, CardContent, CardTitle } from "@saasfly/ui/card";

import type { MockAsset } from "~/lib/mock-library";
import type { MockAnnotation } from "~/data/mock-showcase";

interface MockSpotlightProps {
  locale: string;
  asset: MockAsset;
  annotation?: MockAnnotation;
}

export function MockSpotlight({ locale, asset, annotation }: MockSpotlightProps) {
  const href = `/${locale}/experiences/${
    asset.routePath || encodeURIComponent(asset.id)
  }`;
  const copy = annotation ?? {
    headline: asset.title,
    description:
      "Walk through this experience to see how the interface comes together end to end.",
  };

  return (
    <Card className="overflow-hidden border-border/50 bg-card/80 shadow-lg">
      <div className="grid gap-6 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)]">
        <div className="relative order-2 h-full w-full bg-muted/40 lg:order-1">
          <Image
            src={asset.imageUrl}
            alt={asset.title}
            width={1920}
            height={1080}
            unoptimized
            className="h-full w-full object-cover"
          />
        </div>
        <div className="order-1 flex flex-col justify-between space-y-6 p-6 lg:order-2">
          <div className="space-y-3">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-primary/80">
              Featured Journey
            </p>
            <CardTitle className="text-3xl font-bold text-foreground">
              {copy.headline}
            </CardTitle>
            {asset.scenarioLabels.length ? (
              <div className="flex flex-wrap gap-2">
                {asset.scenarioLabels.map((label) => (
                  <span
                    key={`${asset.id}-spotlight-${label}`}
                    className="rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary"
                  >
                    {label}
                  </span>
                ))}
              </div>
            ) : null}
          </div>

          <CardContent className="p-0 space-y-4">
            <p className="text-sm text-muted-foreground">{copy.description}</p>
            {copy.highlights?.length ? (
              <ul className="space-y-2 text-sm text-muted-foreground">
                {copy.highlights.map((item, index) => (
                  <li key={`${asset.id}-highlight-${index}`} className="flex gap-2">
                    <span className="mt-1 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-primary/70" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            ) : null}
            <div className="mt-6 flex flex-wrap gap-3">
              <Button asChild>
                <Link href={href}>View this journey</Link>
              </Button>
              <Button asChild variant="outline">
                <a href={asset.imageUrl} target="_blank" rel="noreferrer">
                  Open full image
                </a>
              </Button>
            </div>
          </CardContent>
        </div>
      </div>
    </Card>
  );
}
