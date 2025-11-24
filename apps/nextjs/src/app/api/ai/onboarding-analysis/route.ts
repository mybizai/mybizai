import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { db } from "@saasfly/db";

import { minimaxService } from "~/services/ai/minimax-service";
import { SYSTEM_PROMPTS } from "~/lib/ai/prompts";

export async function POST(req: Request) {
    console.log("[ONBOARDING_ANALYSIS] Received request");
    try {
        let { userId } = await auth();
        if (!userId) {
            console.log("[ONBOARDING_ANALYSIS] Using mock user ID");
            userId = "user_mock_dev";
        }

        const body = await req.json();
        const { businessName, industry, website, goals } = body;
        console.log("[ONBOARDING_ANALYSIS] Processing for:", { businessName, industry });

        if (!businessName || !industry || !goals || goals.length === 0) {
            return new NextResponse("Missing required fields", { status: 400 });
        }

        const userPrompt = `
    Analyze this business profile:
    - Business Name: ${businessName}
    - Industry: ${industry}
    - Website: ${website || "N/A"}
    - Goals: ${goals.join(", ")}
    
    Generate the "Growth Plan" (Executive Brief) as a JSON object.
    `;

        const response = await minimaxService.chat([
            { role: "system", content: SYSTEM_PROMPTS.ONBOARDING_ANALYSIS },
            { role: "user", content: userPrompt },
        ]);

        // Attempt to parse JSON from the response if it's wrapped in markdown code blocks
        let jsonString = response;
        if (response.includes("```json")) {
            jsonString = response.split("```json")[1].split("```")[0];
        } else if (response.includes("```")) {
            jsonString = response.split("```")[1].split("```")[0];
        }

        try {
            const analysisResult = JSON.parse(jsonString.trim());

            // Save the analysis to the database
            await db.updateTable("BusinessProfile")
                .set({ growthPlan: analysisResult })
                .where("userId", "=", userId)
                .execute();

            return NextResponse.json(analysisResult);
        } catch (e: any) {
            console.error("Failed to parse AI response as JSON:", response, e);
            const errorMessage = e instanceof Error ? e.message : String(e);
            return NextResponse.json(
                { error: "Failed to generate valid analysis", details: errorMessage },
                { status: 500 }
            );
        }

    } catch (error: any) {
        console.error("[ONBOARDING_ANALYSIS]", error);
        return NextResponse.json(
            { error: "Internal Error", details: error.message },
            { status: 500 }
        );
    }
}
