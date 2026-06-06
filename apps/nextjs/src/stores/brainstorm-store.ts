import { create } from 'zustand';
import { BrainstormSession, BusinessIdea } from '~/types/brainstorm';
import { aiService } from '~/services/mock/ai-service';
import { v4 as uuidv4 } from 'uuid';
import { Message } from '@saasfly/common';

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

        try {
            const response = await fetch("/api/ai/brainstorm", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    messages: get().session!.messages,
                    context: get().session!.idea,
                }),
            });

            if (!response.ok) {
                throw new Error("Failed to get AI response");
            }

            const { content: aiContent, updates } = await response.json();

            const aiMessage: Message = {
                id: uuidv4(),
                role: "ai",
                content: aiContent,
                timestamp: Date.now(),
            };

            set((state) => {
                if (!state.session) return {};
                const newIdea = updates ? { ...state.session.idea, ...updates, updatedAt: Date.now() } : state.session.idea;
                return {
                    session: {
                        ...state.session,
                        messages: [...state.session.messages, aiMessage],
                        idea: newIdea,
                    },
                    isTyping: false,
                };
            });
        } catch (error) {
            console.error("Brainstorm send message error:", error);
            set({ isTyping: false });
        }
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