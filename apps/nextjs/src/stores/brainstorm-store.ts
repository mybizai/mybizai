import { create } from 'zustand';
import { BrainstormSession, BusinessIdea, Message } from '~/types/brainstorm';
import { aiService } from '~/services/mock/ai-service';
import { v4 as uuidv4 } from 'uuid';

interface BrainstormState {
    session: BrainstormSession | null;
    isTyping: boolean;

    // Actions
    initSession: (preferences?: { industry?: string; model?: string }) => Promise<void>;
    sendMessage: (content: string) => Promise<void>;
    updateIdea: (updates: Partial<BusinessIdea>) => void;
    resetSession: () => void;
}

export const useBrainstormStore = create<BrainstormState>((set, get) => ({
    session: null,
    isTyping: false,

    initSession: async (preferences) => {
        set({ isTyping: true });

        // Create initial empty idea with preferences
        const initialIdea: BusinessIdea = {
            id: uuidv4(),
            title: "Untitled Idea",
            description: "",
            industry: preferences?.industry,
            businessModel: preferences?.model,
            status: 'draft',
            createdAt: Date.now(),
            updatedAt: Date.now(),
        };

        const initialMessage = await aiService.startSession();

        set({
            session: {
                id: uuidv4(),
                idea: initialIdea,
                messages: [initialMessage],
                step: 'init',
            },
            isTyping: false,
        });
    },

    sendMessage: async (content: string) => {
        const { session } = get();
        if (!session) return;

        // Add user message
        const userMessage: Message = {
            id: uuidv4(),
            role: 'user',
            content,
            timestamp: Date.now(),
        };

        set((state) => ({
            session: state.session ? {
                ...state.session,
                messages: [...state.session.messages, userMessage],
            } : null,
            isTyping: true,
        }));

        // Call Real API
        const response = await fetch("/api/ai/brainstorm", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                messages: [...get().session!.messages, userMessage],
                context: get().session!.idea
            }),
        });

        if (!response.ok) {
            throw new Error("Failed to get AI response");
        }

        const data = await response.json();
        const aiContent = data.content;
        const updates = data.updates;

        // Simulate streaming for UI effect (optional, since we are not streaming from API yet)
        // We can just add the message directly for now, or keep the streaming effect locally
        // Let's keep the local streaming effect for better UX

        const aiMessageId = uuidv4();
        const aiMessage: Message = {
            id: aiMessageId,
            role: "ai",
            content: "", // Start empty
            timestamp: Date.now(),
        };

        set((state) => ({
            session: state.session ? {
                ...state.session,
                messages: [...state.session.messages, aiMessage]
            } : null,
            isTyping: true
        }));

        // Stream the content locally
        let currentContent = "";
        const words = aiContent.split(" ");

        for (const word of words) {
            currentContent += word + " ";
            set((state) => ({
                session: state.session ? {
                    ...state.session,
                    messages: state.session.messages.map(m =>
                        m.id === aiMessageId ? { ...m, content: currentContent } : m
                    )
                } : null
            }));
            await new Promise(resolve => setTimeout(resolve, 50)); // Fast local stream
        }

        set((state) => {
            if (!state.session) return {};

            // Apply updates if any
            let newIdea = state.session.idea;
            if (updates && Object.keys(updates).length > 0) {
                newIdea = { ...newIdea, ...updates, updatedAt: Date.now() };
            }

            return {
                session: {
                    ...state.session,
                    messages: [...state.session.messages], // Messages already added via local stream
                    idea: newIdea,
                },
            };
        });
    },

    updateIdea: (updates: Partial<BusinessIdea>) => {
        set((state) => ({
            session: state.session ? {
                ...state.session,
                idea: { ...state.session.idea, ...updates, updatedAt: Date.now() },
            } : null,
        }));
    },

    resetSession: () => set({ session: null, isTyping: false }),
}));
