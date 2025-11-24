import { MiniMaxService } from "~/services/ai/minimax-service";
import { NextResponse } from "next/server";

export const runtime = "edge";

export async function POST(req: Request) {
    try {
        const { sectionName, context } = await req.json();

        if (!sectionName || !context) {
            return NextResponse.json(
                { error: "Missing sectionName or context" },
                { status: 400 }
            );
        }

        const service = new MiniMaxService();

        // Construct a specific prompt for the section
        const prompt = `
      You are an expert business consultant helping a user write their business plan.
      
      Context about the business:
      ${JSON.stringify(context)}

      Task: Write a draft for the "${sectionName}" section of the business plan.
      
      Guidelines:
      - Be professional, clear, and concise.
      - Use standard business terminology.
      - Structure the content with appropriate headings (H3, H4) and bullet points.
      - Return the content in Markdown format (which will be converted to HTML/JSON by the editor).
      - Do not include the section title itself as a header, just the content.
    `;

        const messages = [
            { role: "user", content: prompt }
        ];

        // Reuse the generateResponse method (we might need to adapt it if it expects specific types)
        // For now, we'll assume it works or we'll create a new method in MiniMaxService if needed.
        // Ideally, we should add a 'generateSection' method to MiniMaxService for cleaner separation.
        // But for MVP, we can reuse the existing one if we massage the input.

        // Since generateResponse expects Message[] and context, let's adapt:
        const responseText = await service.generateResponse(messages as any, context);

        return NextResponse.json({ content: responseText });

    } catch (error: any) {
        console.error("Error drafting plan:", error);
        return NextResponse.json(
            { error: error.message || "Failed to generate draft" },
            { status: 500 }
        );
    }
}
