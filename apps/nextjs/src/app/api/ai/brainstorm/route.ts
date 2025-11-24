import { NextResponse } from "next/server";
import { minimaxService } from "~/services/ai/minimax-service";

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { messages, context } = body;

        if (!messages || !Array.isArray(messages)) {
            return NextResponse.json(
                { error: "Invalid messages format" },
                { status: 400 }
            );
        }

        const response = await minimaxService.generateResponse(messages, context);

        // Parse the JSON response from the AI
        // The AI is instructed to return JSON, but it might be wrapped in markdown code blocks
        let parsedResponse;
        try {
            const cleanContent = response.replace(/```json\n?|\n?```/g, "").trim();
            parsedResponse = JSON.parse(cleanContent);
        } catch (e) {
            // Fallback if AI didn't return valid JSON
            console.warn("AI response was not valid JSON:", response);
            parsedResponse = {
                content: response,
                updates: {}
            };
        }

        return NextResponse.json(parsedResponse);
    } catch (error) {
        console.error("Brainstorm API Error:", error);
        return NextResponse.json(
            { error: error instanceof Error ? error.message : "Failed to generate response" },
            { status: 500 }
        );
    }
}
