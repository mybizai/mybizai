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

        // Get AI response
        const { message: aiMessage, updatedIdea } = await aiService.sendMessage(
            session.messages,
            content
        );

        // Update state with AI response and any idea updates
        set((state) => {
            if (!state.session) return {};

            let newIdea = state.session.idea;
            if (updatedIdea) {
                newIdea = { ...newIdea, ...updatedIdea, updatedAt: Date.now() };
            }

            return {
                session: {
                    ...state.session,
                    idea: newIdea,
                    messages: [...state.session.messages, aiMessage],
                },
                isTyping: false,
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
