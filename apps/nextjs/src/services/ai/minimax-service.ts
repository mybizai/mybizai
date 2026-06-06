import { BusinessIdea, Message } from "~/types/brainstorm";

export class MiniMaxService {
  async generateResponse(messages: Message[], context?: BusinessIdea) {
    const { MiniMax_M2_BASE_URL: baseUrl, MiniMax_M2_CODE_PLAN_API_KEY: apiKey, MiniMax_M2_MODEL: model = "minimax-m2" } = process.env;

    if (!baseUrl || !apiKey) {
      console.warn("MiniMax API keys not found in process.env");
      throw new Error("MiniMax API keys not configured");
    }

    const llmMessages = messages.map(({ role, content }) => ({
      role: role === "ai" ? "assistant" : "user",
      content,
    }));

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

    const openAiBaseUrl = baseUrl.replace('/anthropic', '');

    const response = await fetch(`${openAiBaseUrl}/v1/chat/completions`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model,
        messages: [{ role: "system", content: systemPrompt }, ...llmMessages],
        stream: false,
        reasoning_split: true,
      }),
    });

    if (!response.ok) {
      const error = await response.text();
      console.error(`[${new Date().toISOString()}] MiniMax Error: ${response.status} ${response.statusText} - ${error}\n`);
      throw new Error(`MiniMax API Error: ${error}`);
    }

    const data = await response.json();
    console.log(`[${new Date().toISOString()}] MiniMax Success: ${JSON.stringify(data)}\n`);

    const content = data.choices?.[0]?.message?.content;
    if (typeof content === "string") {
      return content;
    }

    throw new Error("Unexpected response format from MiniMax API");
  }
}

export const minimaxService = new MiniMaxService();