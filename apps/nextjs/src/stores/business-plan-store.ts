import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import debounce from "lodash.debounce";

interface BusinessPlanState {
    planId: string | null;
    sections: Record<string, any>; // JSON content for each section
    isSaving: boolean;
    lastSavedAt: Date | null;

    setPlanId: (id: string) => void;
    setSections: (sections: Record<string, any>) => void;
    updateSection: (sectionId: string, content: any) => void;
    getSectionContent: (sectionId: string) => any;
    savePlan: () => Promise<void>;
}

export const useBusinessPlanStore = create<BusinessPlanState>()(
    persist(
        (set, get) => ({
            planId: null,
            sections: {},
            isSaving: false,
            lastSavedAt: null,

            setPlanId: (id) => set({ planId: id }),

            setSections: (sections) => set({ sections }),

            updateSection: (sectionId, content) => {
                set((state) => ({
                    sections: {
                        ...state.sections,
                        [sectionId]: content,
                    },
                }));
                get().savePlan();
            },

            getSectionContent: (sectionId) => {
                return get().sections[sectionId];
            },

            savePlan: async () => {
                const { planId, sections } = get();
                if (!planId) return;

                set({ isSaving: true });
                try {
                    await fetch(`/api/business-plan/${planId}`, {
                        method: "PUT",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({ content: sections }),
                    });
                    set({ lastSavedAt: new Date(), isSaving: false });
                } catch (error) {
                    console.error("Failed to save plan", error);
                    set({ isSaving: false });
                }
            },
        }),
        {
            name: "business-plan-storage",
            storage: createJSONStorage(() => (typeof window !== "undefined" ? localStorage : undefined)),
            skipHydration: true,
        }
    )
);
