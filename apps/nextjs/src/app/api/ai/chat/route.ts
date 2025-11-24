import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { db } from "@saasfly/db";
import { minimaxService } from "~/services/ai/minimax-service";
import { nanoid } from "nanoid";

export async function GET(req: Request) {
    try {
        let userId = "user_mock_dev";
        try {
            const { userId: authUserId } = await auth();
            if (authUserId) userId = authUserId;
        } catch (e) {
            console.warn("Auth check failed, defaulting to mock user");
        }

        if (!userId) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        const { searchParams } = new URL(req.url);
        const agentId = searchParams.get("agentId");

        if (!agentId) {
            return new NextResponse("Missing agentId", { status: 400 });
        }

        const messages = await db.selectFrom("ChatMessage")
            .selectAll()
            .where("agentId", "=", agentId)
            .where("userId", "=", userId)
            .orderBy("createdAt", "asc")
            .execute();

        return NextResponse.json(messages);
    } catch (error) {
        console.error("[AI_CHAT_GET]", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}

export async function POST(req: Request) {
    try {
        let userId = "user_mock_dev";
        try {
            const { userId: authUserId } = await auth();
            if (authUserId) userId = authUserId;
        } catch (e) {
            console.warn("Auth check failed, defaulting to mock user");
        }

        if (!userId) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        const body = await req.json();
        const { message, agentId } = body; // Expecting single message now

        if (!message || !agentId) {
            return new NextResponse("Missing message or agentId", { status: 400 });
        }

        // 1. Verify Agent
        const agent = await db.selectFrom("TeamMember")
            .selectAll()
            .where("id", "=", agentId)
            .where("userId", "=", userId)
            .executeTakeFirst();

        if (!agent || agent.type !== "ai") {
            return new NextResponse("Agent not found or invalid", { status: 404 });
        }

        // 2. Save User Message
        await db.insertInto("ChatMessage")
            .values({
                id: nanoid(),
                role: "user",
                content: message,
                agentId,
                userId,
                createdAt: new Date(),
            })
            .execute();

        // 3. Fetch History for Context (last 20 messages)
        const history = await db.selectFrom("ChatMessage")
            .selectAll()
            .where("agentId", "=", agentId)
            .where("userId", "=", userId)
            .orderBy("createdAt", "desc")
            .limit(20)
            .execute();

        // Reverse to chronological order
        const contextMessages = history.reverse().map(msg => ({
            role: msg.role,
            content: msg.content
        }));

        // 4. Construct System Prompt
        const systemPrompt = `You are ${agent.name}, a ${agent.role} at MyBizAI.
Your specialty is: ${agent.specialty || "General Assistance"}.

Instructions:
1. Always stay in character as ${agent.name}.
2. Use your expertise in ${agent.specialty} to help the user.
3. Be professional, helpful, and concise.
4. If you don't know something, admit it but offer to research (simulate research).
`;

        const chatMessages = [
            { role: "system", content: systemPrompt },
            ...contextMessages
        ];

        // 5. Call LLM
        const aiResponseContent = await minimaxService.chat(chatMessages);

        // 6. Save AI Response
        await db.insertInto("ChatMessage")
            .values({
                id: nanoid(),
                role: "assistant",
                content: aiResponseContent,
                agentId,
                userId,
                createdAt: new Date(),
            })
            .execute();

        return NextResponse.json({ content: aiResponseContent });

    } catch (error) {
        console.error("[AI_CHAT_POST]", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}
