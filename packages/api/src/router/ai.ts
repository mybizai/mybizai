import { z } from "zod";
import OpenAI from "openai";
import { createTRPCRouter, protectedProcedure } from "../trpc";
import { TRPCError } from "@trpc/server";

// Initialize OpenAI client
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY || "dummy-key",
});

export const aiRouter = createTRPCRouter({
  generateIdea: protectedProcedure
    .input(z.object({
        industry: z.string().optional(),
        interests: z.string().optional(),
    }))
    .mutation(async ({ input }) => {
        // Fallback for sandbox/development without keys
        if (!process.env.OPENAI_API_KEY || process.env.OPENAI_API_KEY === "dummy-key") {
             // Simulate delay
            await new Promise((resolve) => setTimeout(resolve, 1000));

            return {
                idea: "Eco-Friendly Packaging Solutions",
                description: `Based on your interest in ${input.industry || "General"} and ${input.interests || "Sustainability"}, we suggest a service providing biodegradable packaging for e-commerce businesses.`,
                market: "B2B Logistics",
                raw: "Mock response: API key missing."
            };
        }

        try {
            const completion = await openai.chat.completions.create({
                messages: [
                    { role: "system", content: "You are a creative business consultant. Return a JSON object with 'idea', 'description', and 'market' fields." },
                    { role: "user", content: `Generate a business idea. Industry: ${input.industry ?? "Any"}. Interests: ${input.interests ?? "Any"}.` }
                ],
                model: "gpt-3.5-turbo",
                response_format: { type: "json_object" },
            });

            const text = completion.choices[0].message.content;
            if (!text) throw new Error("No response from AI");

            return JSON.parse(text);
        } catch (error) {
            console.error("AI Error:", error);
            throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: "Failed to generate idea" });
        }
    }),
});
