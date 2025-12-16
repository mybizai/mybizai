import { openAi } from "@ai-sdk/openai";
import { streamText } from "ai";
import type { NextRequest } from "next/server";
import { auth } from "@saasfly/auth";

export async function POST(req: NextRequest) {
  const session = await auth();
  if (!session) {
    return new Response("Unauthorized", { status: 401 });
  }

  const { prompt }: { prompt: string } = await req.json();

  const result = await streamText({
    model: openAi("gpt-4-turbo-2024-04-09"),
    prompt,
  });

  return result.toAIStreamResponse();
}
