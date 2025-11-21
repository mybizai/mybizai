import { Message, Suggestion, BusinessIdea } from "~/types/brainstorm";
import { v4 as uuidv4 } from "uuid";

const DELAY_MS = 800; // Simulate network/thinking delay

export class IdeaGenerationService {

  private async delay(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  async startSession(userName: string = "Entrepreneur"): Promise<Message> {
    await this.delay(DELAY_MS);
    return {
      id: uuidv4(),
      role: "ai",
      content: `Hi ${userName}! I'm your AI Co-founder. I'm here to help you brainstorm and build your next big business. \n\nDo you already have an idea in mind, or should we look for inspiration together?`,
      timestamp: Date.now(),
      suggestions: [
        { id: "1", label: "I have an idea", value: "has_idea", type: "action" },
        { id: "2", label: "Inspire me", value: "inspire_me", type: "action" },
      ],
    };
  }

  async sendMessage(history: Message[], userInput: string): Promise<{ message: Message; updatedIdea?: Partial<BusinessIdea> }> {
    await this.delay(DELAY_MS);

    // Simple keyword matching to simulate "intelligence" for the mock
    const lowerInput = userInput.toLowerCase();
    let content = "";
    let suggestions: Suggestion[] = [];
    let updatedIdea: Partial<BusinessIdea> | undefined;

    if (lowerInput.includes("inspire") || lowerInput.includes("don't have")) {
      content = "Exciting! Let's start with a problem you're passionate about. What industries interest you the most?";
      suggestions = [
        { id: "ind-1", label: "SaaS / Tech", value: "saas", type: "industry" },
        { id: "ind-2", label: "E-commerce", value: "ecommerce", type: "industry" },
        { id: "ind-3", label: "Health & Wellness", value: "health", type: "industry" },
        { id: "ind-4", label: "Sustainability", value: "sustainability", type: "industry" },
      ];
    } else if (lowerInput.includes("saas") || lowerInput.includes("tech")) {
      content = "Tech is a great space. Do you want to build a B2B tool for productivity, or maybe a B2C app for lifestyle?";
      updatedIdea = { industry: "SaaS / Technology" };
      suggestions = [
        { id: "mod-1", label: "B2B Productivity", value: "b2b_prod", type: "business_model" },
        { id: "mod-2", label: "B2C Lifestyle", value: "b2c_life", type: "business_model" },
      ];
    } else if (lowerInput.includes("idea") || lowerInput.includes("build") || lowerInput.includes("create") || lowerInput.includes("want to")) {
      content = "That's a fantastic start! I've updated your project title. Now, tell me more about the problem you're solving. Who is your target audience?";
      updatedIdea = { title: "New Project", description: userInput };
    } else {
      // Generic fallback for now
      content = "That sounds interesting. Let's drill down into the business model. How do you plan to make money?";
      suggestions = [
        { id: "rev-1", label: "Subscription", value: "subscription", type: "business_model" },
        { id: "rev-2", label: "One-time Purchase", value: "one_time", type: "business_model" },
        { id: "rev-3", label: "Freemium", value: "freemium", type: "business_model" },
      ];
    }

    return {
      message: {
        id: uuidv4(),
        role: "ai",
        content,
        timestamp: Date.now(),
        suggestions,
      },
      updatedIdea,
    };
  }

  // Simulate streaming for a more realistic effect
  async *streamMessage(content: string): AsyncGenerator<string> {
    const chunkScale = 5; // Characters per chunk
    for (let i = 0; i < content.length; i += chunkScale) {
      await this.delay(30); // Fast typing speed
      yield content.slice(0, i + chunkScale);
    }
    yield content;
  }
}

export const aiService = new IdeaGenerationService();
