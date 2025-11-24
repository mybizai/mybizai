"use client";

export const dynamic = "force-dynamic";

import { useState, useRef, useEffect } from "react";
import nextDynamic from "next/dynamic";
const BusinessPlanEditor = nextDynamic(
    () => import("~/components/editor/business-plan-editor").then((mod) => mod.BusinessPlanEditor),
    { ssr: false }
);
import { Button } from "@saasfly/ui/button";

import { useBrainstormStore } from "~/stores/brainstorm-store";

import { Loader2, Sparkles, Printer } from "lucide-react";
import { useBusinessPlanStore } from "~/stores/business-plan-store";
import { useReactToPrint } from "react-to-print";

const SECTIONS = [
    { id: "executive-summary", title: "Executive Summary" },
    { id: "company-overview", title: "Company Overview" },
    { id: "market-analysis", title: "Market Analysis" },
    { id: "products-services", title: "Products & Services" },
    { id: "marketing-strategy", title: "Marketing Strategy" },
    { id: "financial-plan", title: "Financial Plan" },
];

export default function BusinessPlanPage() {
    const [activeSection, setActiveSection] = useState(SECTIONS[0]?.id || "");
    const [isDrafting, setIsDrafting] = useState(false);
    const { session } = useBrainstormStore();
    const { updateSection, setPlanId, setSections } = useBusinessPlanStore();

    const printRef = useRef(null);
    const componentRef = useRef(null); // Added componentRef
    const handlePrint = useReactToPrint({
        // @ts-ignore
        content: () => componentRef.current,
        documentTitle: "Business Plan",
    });

    useEffect(() => {
        const fetchPlan = async () => {
            try {
                // Try to find existing plan
                const res = await fetch("/api/business-plans");
                const plan = await res.json();

                if (plan) {
                    setPlanId(plan.id);
                    if (plan.content) {
                        setSections(plan.content as Record<string, any>);
                    }
                } else {
                    // Create new plan if none exists
                    const createRes = await fetch("/api/business-plans", {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({
                            title: session?.idea?.title || "My Business Plan",
                            content: {}
                        }),
                    });
                    const newPlan = await createRes.json();
                    setPlanId(newPlan.id);
                }
            } catch (error) {
                console.error("Failed to fetch/create plan", error);
            }
        };

        fetchPlan();
    }, [setPlanId, setSections, session?.idea?.title]);

    const handleDraftSection = async () => {
        if (!session?.idea) return;

        setIsDrafting(true);
        try {
            const response = await fetch("/api/ai/draft-plan", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    sectionName: SECTIONS.find(s => s.id === activeSection)?.title,
                    context: session.idea
                }),
            });

            const data = await response.json();
            if (data.content) {
                updateSection(activeSection, data.content);
            }
        } catch (error) {
            console.error("Failed to draft section", error);
        } finally {
            setIsDrafting(false);
        }
    };

    return (
        <div className="flex h-full">
            {/* Sidebar */}
            <div className="w-64 border-r bg-gray-50 dark:bg-gray-900 p-4 flex flex-col">
                <h2 className="font-semibold mb-4 text-lg">Plan Sections</h2>
                <div className="space-y-1 flex-1">
                    {SECTIONS.map((section) => (
                        <button
                            key={section.id}
                            onClick={() => setActiveSection(section.id)}
                            className={`w-full text-left px-3 py-2 rounded-md text-sm transition-colors ${activeSection === section.id
                                ? "bg-primary text-primary-foreground font-medium shadow-sm"
                                : "hover:bg-gray-200 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300"
                                } `}
                        >
                            {section.title}
                        </button>
                    ))}
                </div>
                <div className="pt-4 border-t mt-4">
                    <Button variant="outline" className="w-full" onClick={handlePrint}>
                        <Printer className="mr-2 h-4 w-4" />
                        Export PDF
                    </Button>
                </div>
            </div>

            {/* Main Content */}
            <div className="flex-1 p-8 overflow-y-auto" ref={printRef}>
                <div className="flex justify-between items-center mb-6 print:hidden">
                    <h1 className="text-2xl font-bold">
                        {SECTIONS.find((s) => s.id === activeSection)?.title || "Section"}
                    </h1>
                    <Button
                        onClick={handleDraftSection}
                        disabled={isDrafting || !session?.idea}
                        variant="default"
                        className="shadow-sm"
                    >
                        {isDrafting ? (
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        ) : (
                            <Sparkles className="mr-2 h-4 w-4" />
                        )}
                        Draft with AI
                    </Button>
                </div>

                {/* Print Header (Only visible when printing) */}
                <div className="hidden print:block mb-8">
                    <h1 className="text-3xl font-bold text-center mb-2">{session?.idea?.title || "Business Plan"}</h1>
                    <p className="text-center text-gray-500">{new Date().toLocaleDateString()}</p>
                </div>

                <BusinessPlanEditor
                    key={activeSection}
                    sectionId={activeSection}
                />
            </div>
        </div>
    );
}

