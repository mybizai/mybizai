import path from "path";
import { promises as fs } from "fs";
import type { Stats } from "fs";

const CANDIDATE_OFFSETS: string[][] = [
  ["..", "..", "mocks"],
  ["..", "mocks"],
  ["mocks"],
  ["..", "..", "..", "mocks"],
];

let cachedMocksRoot: string | null = null;
let cachedAssets: MockAsset[] | null = null;
let cachedNeighbours: Map<string, { previous?: MockAsset; next?: MockAsset }> | null = null;

const SCREEN_FILE_NAMES = new Set([
  "screen.png",
  "screen.jpg",
  "screen.jpeg",
  "screen.webp",
]);

const CODE_FILE_NAMES = new Set([
  "code.html",
  "code.htm",
]);

export interface MockAsset {
  id: string;
  title: string;
  category: string;
  categoryLabel: string;
  scenarioLabels: string[];
  imageUrl: string;
  codeUrl?: string;
  routePath: string;
  segments: string[];
}

const toPosix = (value: string) => value.split(path.sep).join("/");

const toRoutePath = (relativePath: string) =>
  toPosix(relativePath)
    .split("/")
    .map((segment) => encodeURIComponent(segment))
    .join("/");

const humanize = (segment: string) =>
  segment
    .replace(/[_:-]+/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .replace(/\b\w/g, (char) => char.toUpperCase());

async function collectMocks(
  mockRoot: string,
  directory: string,
  segments: string[] = [],
  acc: MockAsset[] = [],
): Promise<MockAsset[]> {
  const dirents = await fs.readdir(directory, { withFileTypes: true });

  let detectedScreen: string | undefined;
  let detectedCode: string | undefined;

  for (const dirent of dirents) {
    if (dirent.isDirectory()) {
      await collectMocks(
        mockRoot,
        path.join(directory, dirent.name),
        [...segments, dirent.name],
        acc,
      );
      continue;
    }

    if (SCREEN_FILE_NAMES.has(dirent.name)) {
      detectedScreen = path.join(directory, dirent.name);
    }

    if (CODE_FILE_NAMES.has(dirent.name)) {
      detectedCode = path.join(directory, dirent.name);
    }
  }

  if (detectedScreen) {
    const relativeScreen = path.relative(mockRoot, detectedScreen);
    const relativeCode = detectedCode
      ? path.relative(mockRoot, detectedCode)
      : undefined;

    const categorySlug = segments[0] ?? "root";
    const scenarioLabels = segments.slice(1).map(humanize);
    const relativeDirectory = path.relative(mockRoot, directory);
    const normalizedDirectory = toPosix(relativeDirectory);
    const slugSegments = normalizedDirectory.split("/").filter(Boolean);
    const routePath = slugSegments.length
      ? slugSegments.map((segment) => encodeURIComponent(segment)).join("/")
      : encodeURIComponent(categorySlug);

    acc.push({
      id: normalizedDirectory,
      title: segments.length ? segments.map(humanize).join(" › ") : "Showcase",
      category: categorySlug,
      categoryLabel: humanize(categorySlug),
      scenarioLabels,
      imageUrl: `/api/mocks/${toRoutePath(relativeScreen)}`,
      codeUrl: relativeCode ? `/api/mocks/${toRoutePath(relativeCode)}` : undefined,
      routePath,
      segments: slugSegments,
    });
  }

  return acc;
}

export async function resolveMocksRoot(): Promise<string | null> {
  if (cachedMocksRoot) {
    return cachedMocksRoot;
  }

  for (const segments of CANDIDATE_OFFSETS) {
    const candidate = path.resolve(process.cwd(), ...segments);
    let stats: Stats | null = null;
    try {
      stats = await fs.stat(candidate);
    } catch {
      stats = null;
    }

    if (stats?.isDirectory()) {
      cachedMocksRoot = candidate;
      return cachedMocksRoot;
    }
  }

  cachedMocksRoot = null;
  return null;
}

export async function getMockAssets(): Promise<MockAsset[]> {
  if (cachedAssets) {
    return cachedAssets;
  }

  const mockRoot = await resolveMocksRoot();
  if (!mockRoot) {
    return [];
  }

  const assets = await collectMocks(mockRoot, mockRoot);

  cachedAssets = assets.sort((a, b) => {
    if (a.category === b.category) {
      return a.title.localeCompare(b.title);
    }
    return a.category.localeCompare(b.category);
  });

  return cachedAssets;
}

export async function getMockAssetByRoute(
  routeSegments: string[],
): Promise<MockAsset | undefined> {
  const assets = await getMockAssets();
  const targetPath = routeSegments.map((segment) => encodeURIComponent(segment)).join("/");
  return assets.find((asset) => asset.routePath === targetPath);
}

export function resetMockCache() {
  cachedAssets = null;
  cachedMocksRoot = null;
  cachedNeighbours = null;
}

export async function getMockAssetNeighbours(assetId: string) {
  if (cachedNeighbours) {
    return (
      cachedNeighbours.get(assetId) ?? { previous: undefined, next: undefined }
    );
  }

  const assets = await getMockAssets();
  cachedNeighbours = new Map();

  const ordered = assets.slice().sort((a, b) => a.title.localeCompare(b.title));

  ordered.forEach((asset, index) => {
    cachedNeighbours?.set(asset.id, {
      previous: index > 0 ? ordered[index - 1] : undefined,
      next: index < ordered.length - 1 ? ordered[index + 1] : undefined,
    });
  });

  return (
    cachedNeighbours.get(assetId) ?? { previous: undefined, next: undefined }
  );
}
