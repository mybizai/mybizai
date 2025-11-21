import path from "path";
import { promises as fs } from "fs";

import { resolveMocksRoot } from "~/lib/mock-library";

const MIME_TYPES: Record<string, string> = {
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".webp": "image/webp",
  ".html": "text/html; charset=utf-8",
  ".htm": "text/html; charset=utf-8",
};

export async function GET(
  _request: Request,
  context: { params: { mockPath?: string[] } },
) {
  const segments = context.params.mockPath ?? [];
  if (!segments.length) {
    return new Response("Not found", { status: 404 });
  }

  const mockRoot = await resolveMocksRoot();
  if (!mockRoot) {
    return new Response("Not found", { status: 404 });
  }

  const requestedPath = path.join(mockRoot, ...segments);
  const normalizedPath = path.normalize(requestedPath);

  if (!normalizedPath.startsWith(mockRoot)) {
    return new Response("Not found", { status: 404 });
  }

  try {
    const file = await fs.readFile(normalizedPath);
    const extension = path.extname(normalizedPath).toLowerCase();
    const contentType = MIME_TYPES[extension] ?? "application/octet-stream";

    return new Response(file, {
      headers: {
        "Content-Type": contentType,
        "Cache-Control": "public, max-age=86400, immutable",
      },
    });
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === "ENOENT") {
      return new Response("Not found", { status: 404 });
    }

    return new Response("Internal Server Error", { status: 500 });
  }
}
