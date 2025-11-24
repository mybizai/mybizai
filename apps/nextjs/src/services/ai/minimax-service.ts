import { BusinessIdea, Message } from "~/types/brainstorm";

export class MiniMaxService {
    async generateResponse(messages: Message[], context?: BusinessIdea) {
        let baseUrl = process.env.MiniMax_M2_BASE_URL;
        let apiKey = process.env.MiniMax_M2_CODE_PLAN_API_KEY;
        const model = process.env.MiniMax_M2_MODEL || "minimax-m2";

        if (!baseUrl || !apiKey) {
            console.warn("MiniMax API keys not found in process.env");
        }

        if (!baseUrl || !apiKey) {
            throw new Error("MiniMax API keys not configured");
        }

        // Convert internal messages to LLM format
        const llmMessages = messages.map((m) => ({
            role: m.role === "ai" ? "assistant" : "user",
            content: m.content,
        }));

        // Add system prompt with context
        const systemPrompt = `You are an expert AI Co-founder for a business builder platform called MyBizAI.
    Your goal is to help the user brainstorm and refine their business idea.
    
    Current Idea Context:
    Title: ${context?.title || "Untitled"}
    Industry: ${context?.industry || "Unknown"}
    Model: ${context?.businessModel || "Unknown"}
    Description: ${context?.description || "None"}
    
    Instructions:
    1. Be encouraging, insightful, and concise.
    2. Ask probing questions to help clarify the idea.
    3. If the user provides enough info, suggest updates to the business plan (Title, Description, etc.).
    4. Return your response in JSON format with two fields: "content" (your message) and "updates" (optional object with fields to update in the BusinessIdea).
    
    Example JSON response:
    {
      "content": "That sounds like a solid SaaS model. Have you considered...",
      "updates": {
        "title": "Construction Project Manager Pro",
        "targetAudience": "Small to medium construction firms"
      }
    }`;

        // Use OpenAI-compatible endpoint
        // If BASE_URL ends with /anthropic, strip it to use /v1
        const openAiBaseUrl = baseUrl.replace('/anthropic', '');

        const response = await fetch(`${openAiBaseUrl}/v1/chat/completions`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${apiKey}`,
            },
            body: JSON.stringify({
                model: model,
                messages: [
                    { role: "system", content: systemPrompt },
                    ...llmMessages
                ],
                stream: false,
                // Enable reasoning split for MiniMax-M2
                reasoning_split: true
            }),
        });

        if (!response.ok) {
            const error = await response.text();
            console.error(`[${new Date().toISOString()}] MiniMax Error: ${response.status} ${response.statusText} - ${error}\n`);
            throw new Error(`MiniMax API Error: ${error}`);
        }

        const data = await response.json();
        // Log success
        // Log success
        console.log(`[${new Date().toISOString()}] MiniMax Success: ${JSON.stringify(data)}\n`);

        // Handle MiniMax/Anthropic response structure
        if (data.content && Array.isArray(data.content)) {
            const textBlock = data.content.find((c: any) => c.type === 'text');
            if (textBlock) {
                return textBlock.text;
            }
        }

        // Fallback to choices if available (standard OpenAI format)
        if (data.choices && data.choices.length > 0) {
            return data.choices[0].message.content;
        }

        throw new Error("Unexpected response format from MiniMax API");
    }
    async chat(messages: { role: string; content: string }[]) {
        let baseUrl = process.env.MiniMax_M2_BASE_URL;
        let apiKey = process.env.MiniMax_M2_CODE_PLAN_API_KEY;
        const model = process.env.MiniMax_M2_MODEL || "minimax-m2";

        if (!baseUrl || !apiKey) {
            throw new Error("MiniMax API keys not configured");
        }

        // Ensure base URL is correct for OpenAI compatible endpoint
        const openAiBaseUrl = baseUrl.replace('/anthropic', '');

        const response = await fetch(`${openAiBaseUrl}/v1/chat/completions`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${apiKey}`,
            },
            body: JSON.stringify({
                model: model,
                messages: messages,
                stream: false,
            }),
        });

        if (!response.ok) {
            const error = await response.text();
            console.error(`[${new Date().toISOString()}] MiniMax Chat Error: ${response.status} ${response.statusText} - ${error}\n`);
            throw new Error(`MiniMax API Error: ${error}`);
        }

        const data = await response.json();

        if (data.choices && data.choices.length > 0) {
            return data.choices[0].message.content;
        }

        throw new Error("Unexpected response format from MiniMax API");
    }
}

export const minimaxService = new MiniMaxService();
