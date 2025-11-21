"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";

import { Button } from "@saasfly/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@saasfly/ui/card";
import { cn } from "@saasfly/ui";

import type { MockAsset } from "~/lib/mock-library";

interface MockGalleryClientProps {
  entries: MockAsset[];
  enableFilters?: boolean;
  showCodeLinks?: boolean;
  locale: string;
  taglines?: Record<string, string>;
}

const TAG_COLORS = [
  "bg-blue-500/10 text-blue-600 dark:text-blue-300",
  "bg-emerald-500/10 text-emerald-600 dark:text-emerald-300",
  "bg-amber-500/10 text-amber-600 dark:text-amber-300",
  "bg-purple-500/10 text-purple-600 dark:text-purple-300",
  "bg-rose-500/10 text-rose-600 dark:text-rose-300",
];

export function MockGalleryClient({
  entries,
  enableFilters = true,
  showCodeLinks = true,
  locale,
  taglines,
}: MockGalleryClientProps) {
  const categoryMap = useMemo(() => {
    const map = new Map<string, { label: string; count: number }>();
    entries.forEach((entry) => {
      const existing = map.get(entry.category);
      map.set(entry.category, {
        label: entry.categoryLabel,
        count: (existing?.count ?? 0) + 1,
      });
    });

    return map;
  }, [entries]);

  const categories = useMemo(() => {
    const map = new Map<string, string>();
    entries.forEach((entry) => {
      map.set(entry.category, entry.categoryLabel);
    });

    return [
      { value: "all", label: "All" },
      ...Array.from(map.entries()).map(([value, label]) => ({ value, label })),
    ];
  }, [entries]);

  const [activeCategory, setActiveCategory] = useState<string>(
    categories[0]?.value ?? "all",
  );

  const filteredEntries = useMemo(() => {
    if (activeCategory === "all") {
      return entries;
    }

    return entries.filter((entry) => entry.category === activeCategory);
  }, [entries, activeCategory]);

  if (!entries.length) {
    return null;
  }

  return (
    <div className="space-y-6">
      {enableFilters ? (
        <div className="flex flex-wrap gap-2">
          {categories.map((category) => (
            <Button
              key={category.value}
              type="button"
              variant={
                activeCategory === category.value ? "default" : "outline"
              }
              onClick={() => setActiveCategory(category.value)}
              className="h-9 px-3 text-sm"
            >
              {category.label}
              <span className="ml-2 rounded-full bg-background/60 px-2 text-xs text-muted-foreground">
                {category.value === "all"
                  ? entries.length
                  : categoryMap.get(category.value)?.count ?? 0}
              </span>
            </Button>
          ))}
        </div>
      ) : null}

      <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
        {filteredEntries.map((entry) => {
          const hasCode = Boolean(entry.codeUrl && showCodeLinks);
          const displayTags = entry.scenarioLabels.length
            ? entry.scenarioLabels
            : taglines?.[entry.id]
              ? [taglines[entry.id]]
              : [];
          const href = `/${locale}/experiences/${
            entry.routePath || encodeURIComponent(entry.id)
          }`;

          return (
            <Link
              href={href}
              key={entry.id}
              className="group block focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/60"
            >
              <Card className="flex h-full flex-col overflow-hidden border-border/60 bg-card/80 shadow-sm transition group-hover:-translate-y-1 group-hover:shadow-lg dark:bg-muted/20">
                <div className="relative aspect-[16/9] w-full overflow-hidden border-b border-border/50 bg-gradient-to-br from-muted/60 via-background to-muted/40">
                  <Image
                    src={entry.imageUrl}
                    alt={entry.title}
                    width={1600}
                    height={900}
                    unoptimized
                    className="h-full w-full object-cover transition group-hover:scale-105"
                  />
                </div>

                <CardHeader className="pb-0">
                  <CardDescription className="text-xs uppercase tracking-wide text-muted-foreground/70">
                    {entry.categoryLabel}
                  </CardDescription>
                  <CardTitle className="text-lg font-semibold text-foreground">
                    {entry.title}
                  </CardTitle>
                </CardHeader>

                <CardContent className="flex flex-1 flex-col gap-4">
                  {displayTags.length ? (
                    <div className="flex flex-wrap gap-2">
                      {displayTags.map((label, tagIndex) => (
                        <span
                          key={`${entry.id}-${label}`}
                          className={cn(
                            "rounded-full px-3 py-1 text-xs font-medium",
                            TAG_COLORS[tagIndex % TAG_COLORS.length],
                          )}
                        >
                          {label}
                        </span>
                      ))}
                    </div>
                  ) : null}

                  {hasCode ? (
                    <div className="mt-auto">
                      <Button
                        asChild
                        variant="outline"
                        size="sm"
                        onClick={(event) => event.stopPropagation()}
                      >
                        <a
                          href={entry.codeUrl}
                          target="_blank"
                          rel="noreferrer"
                        >
                          Open HTML Mock
                        </a>
                      </Button>
                    </div>
                  ) : null}
                </CardContent>
              </Card>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
