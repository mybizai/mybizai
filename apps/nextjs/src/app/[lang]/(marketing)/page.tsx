import Link from "next/link";
import Image from "next/image";

import { AnimatedTooltip } from "@saasfly/ui/animated-tooltip";
import { BackgroundLines } from "@saasfly/ui/background-lines";
import { Button } from "@saasfly/ui/button";
import { ColourfulText } from "@saasfly/ui/colorful-text";
import * as Icons from "@saasfly/ui/icons";

import { CodeCopy } from "~/components/code-copy";
import { Comments } from "~/components/comments";
import { FeaturesGrid } from "~/components/features-grid";
import { MockGalleryClient } from "~/components/mock-gallery.client";
import { RightsideMarketing } from "~/components/rightside-marketing";
import { VideoScroll } from "~/components/video-scroll";
import type { Locale } from "~/config/i18n-config";
import { getDictionary } from "~/lib/get-dictionary";
import { getMockAssets } from "~/lib/mock-library";
import {
  CATEGORY_TAGLINES,
  FEATURED_JOURNEY_ORDER,
  MOCK_ANNOTATIONS,
} from "~/data/mock-showcase";

const people = [
  {
    id: 1,
    name: "tianzx",
    designation: "CEO at MyBizAI",
    image: "https://avatars.githubusercontent.com/u/10096899",
    link: "https://mybizai.com",
  },
  {
    id: 2,
    name: "jackc3",
    designation: "Co-founder at MyBizAI",
    image: "https://avatars.githubusercontent.com/u/10334353",
    link: "https://x.com/BingxunYao",
  },
  {
    id: 3,
    name: "imesong",
    designation: "Contributor",
    image: "https://avatars.githubusercontent.com/u/3849293",
  },
  {
    id: 4,
    name: "ziveen",
    designation: "Contributor",
    image: "https://avatars.githubusercontent.com/u/22560152",
  },
  {
    id: 5,
    name: "Zenuncl",
    designation: "Independent Software Developer",
    image: "https://avatars.githubusercontent.com/u/3316062",
  },
  {
    id: 6,
    name: "Innei",
    designation: "Indie Developer",
    image: "https://avatars.githubusercontent.com/u/41265413",
  },
];

export default async function IndexPage({
  params,
}: {
  params: Promise<{
    lang: Locale;
  }>;
}) {
  const { lang } = await params;
  const dict = await getDictionary(lang);
  const mockAssets = await getMockAssets();
  const assetById = new Map(mockAssets.map((asset) => [asset.id, asset] as const));
  const highlightedMocks = mockAssets.slice(0, 6);
  const journeyOrder = FEATURED_JOURNEY_ORDER.filter((id) =>
    mockAssets.some((asset) => asset.id === id),
  );

  return (
    <>
      <section className="relative w-full overflow-hidden bg-background">
        <BackgroundLines className="flex flex-col items-center justify-center min-h-screen w-full">
          <div className="container relative z-10 flex flex-col items-center justify-center text-center">
            <div className="space-y-6 max-w-4xl">
              <h1 className="text-5xl font-extrabold tracking-tight sm:text-7xl md:text-8xl bg-clip-text text-transparent bg-gradient-to-r from-mybiz-purple via-mybiz-green to-mybiz-purple animate-gradient-x">
                {dict.marketing.title}
              </h1>
              <p className="text-xl text-muted-foreground sm:text-2xl md:text-3xl max-w-2xl mx-auto">
                {dict.marketing.sub_title}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
                <Link href={`/${lang}/login-clerk`}>
                  <Button size="lg" className="w-full sm:w-auto text-lg px-8 py-6 bg-mybiz-purple hover:bg-mybiz-purple/90">
                    {dict.marketing.get_started}
                    <Icons.ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
                <Link href="#" target="_blank" rel="noreferrer">
                  <Button variant="outline" size="lg" className="w-full sm:w-auto text-lg px-8 py-6 border-mybiz-purple/20 hover:bg-mybiz-purple/10">
                    <Icons.GitHub className="mr-2 h-5 w-5" />
                    GitHub
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </BackgroundLines>
      </section>

      {highlightedMocks.length ? (
        <section id="showcase" className="container mt-20">
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div className="space-y-3">
              <h2 className="text-3xl font-semibold tracking-tight text-foreground md:text-4xl">
                {dict.marketing.mock_showcase.title}
              </h2>
              <p className="max-w-2xl text-base text-muted-foreground">
                {dict.marketing.mock_showcase.description}
              </p>
            </div>
            <Button asChild variant="outline">
              <Link href={`/${lang}/experiences`}>
                {dict.marketing.mock_showcase.view_all}
              </Link>
            </Button>
          </div>
          <div className="mt-8">
            <MockGalleryClient
              entries={highlightedMocks}
              enableFilters={false}
              showCodeLinks={false}
              locale={lang}
              taglines={CATEGORY_TAGLINES}
            />
          </div>
        </section>
      ) : null}

      <section
        id="features"
        className="container mt-8 md:mt-[-180px] xl:mt-[-180px]"
      >
        <FeaturesGrid dict={dict.marketing.features_grid} />
      </section>

      <section className="container pt-24">
        <div className="flex flex-col justify-center items-center pt-10">
          <div className="text-lg text-neutral-500 dark:text-neutral-400">{dict.marketing.sponsor.title}</div>
          <div className="mt-4 flex items-center gap-4">
            <Link href="https://go.clerk.com/uKDp7Au" target="_blank">
              <Image src="/images/clerk.png" width="48" height="48" alt="twillot" />
            </Link>
            <Link href="https://www.twillot.com/" target="_blank">
              <Image src="https://www.twillot.com/logo-128.png" width="48" height="48" alt="twillot" />
            </Link>
            <Link href="https://www.setupyourpay.com/" target="_blank">
              <Image src="https://www.setupyourpay.com/logo.png" width="48" height="48" alt="setupyourpay" />
            </Link>
            <Link href="#" target="_blank">
              <div className="flex items-center gap-2 px-4 py-2 rounded-xl border-2 border-dashed border-neutral-300 dark:border-neutral-700 hover:bg-accent dark:hover:bg-neutral-800/30">
                <Icons.Heart className="w-5 h-5 fill-pink-600 text-pink-600 dark:fill-pink-700 dark:text-pink-700" />
                <span className="text-sm font-medium text-neutral-500 dark:text-neutral-200">{dict.marketing.sponsor.donate || ''}</span>
              </div>
            </Link>
          </div>
        </div>
      </section>

      <section className="container pt-8">
        <VideoScroll dict={dict.marketing.video} />
      </section>

      <section className="w-full px-8 pt-10 sm:px-0 sm:pt-24 md:px-0 md:pt-24 xl:px-0 xl:pt-24">
        <div className="flex h-full w-full flex-col items-center pb-[100px] pt-10">
          <div>
            <h1 className="mb-6 text-center text-3xl font-bold dark:text-zinc-100 md:text-5xl">
              {dict.marketing.people_comment.title}
            </h1>
          </div>
          <div className="mb-6 text-lg text-neutral-500 dark:text-neutral-400">
            {dict.marketing.people_comment.desc}
          </div>

          <div className="w-full overflow-x-hidden">
            <Comments />
          </div>
        </div>
      </section>
    </>
  );
}
