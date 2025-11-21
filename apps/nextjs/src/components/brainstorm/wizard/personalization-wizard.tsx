"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button, Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@saasfly/ui";
import { useBrainstormStore } from "~/stores/brainstorm-store";
import { useRouter } from "next/navigation";

// Step Components (Inline for now, can extract later)
const IndustryStep = ({ onSelect }: { onSelect: (value: string) => void }) => {
    const industries = [
        { id: "saas", label: "SaaS / Tech", icon: "💻" },
        { id: "ecommerce", label: "E-commerce", icon: "🛍️" },
        { id: "health", label: "Health & Wellness", icon: "❤️" },
        { id: "finance", label: "FinTech", icon: "💰" },
        { id: "education", label: "EdTech", icon: "🎓" },
        { id: "other", label: "Other / Undecided", icon: "❓" },
    ];

    return (
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
            {industries.map((ind) => (
                <Button
                    key={ind.id}
                    variant="outline"
                    className="h-24 flex-col gap-2 text-lg hover:border-primary hover:bg-primary/5"
                    onClick={() => onSelect(ind.label)}
                >
                    <span className="text-2xl">{ind.icon}</span>
                    {ind.label}
                </Button>
            ))}
        </div>
    );
};

const ModelStep = ({ onSelect }: { onSelect: (value: string) => void }) => {
    const models = [
        { id: "b2b", label: "B2B", desc: "Business to Business" },
        { id: "b2c", label: "B2C", desc: "Business to Consumer" },
        { id: "marketplace", label: "Marketplace", desc: "Connecting buyers & sellers" },
        { id: "subscription", label: "Subscription", desc: "Recurring revenue" },
    ];

    return (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {models.map((mod) => (
                <Button
                    key={mod.id}
                    variant="outline"
                    className="h-20 justify-start px-6 text-left hover:border-primary hover:bg-primary/5"
                    onClick={() => onSelect(mod.label)}
                >
                    <div className="flex flex-col items-start">
                        <span className="text-lg font-semibold">{mod.label}</span>
                        <span className="text-sm text-muted-foreground">{mod.desc}</span>
                    </div>
                </Button>
            ))}
        </div>
    );
};

export function PersonalizationWizard() {
    const [step, setStep] = React.useState(0);
    const [preferences, setPreferences] = React.useState({ industry: "", model: "" });
    const initSession = useBrainstormStore((state) => state.initSession);
    const router = useRouter();

    const handleIndustrySelect = (industry: string) => {
        setPreferences((prev) => ({ ...prev, industry }));
        setStep(1);
    };

    const handleModelSelect = async (model: string) => {
        const finalPrefs = { ...preferences, model };
        setPreferences(finalPrefs);

        // Initialize session and redirect to the brainstorming interface
        await initSession(finalPrefs);
        // TODO: Redirect to the actual chat interface route. 
        // For now, we'll just log it and maybe show a "Loading" state.
        console.log("Session initialized with:", finalPrefs);
        router.push("/en/dashboard/brainstorm"); // We need to create this route!
    };

    return (
        <div className="mx-auto max-w-3xl">
            <AnimatePresence mode="wait">
                {step === 0 && (
                    <motion.div
                        key="step0"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                    >
                        <Card>
                            <CardHeader>
                                <CardTitle>Choose an Industry</CardTitle>
                                <CardDescription>What space do you want to innovate in?</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <IndustryStep onSelect={handleIndustrySelect} />
                            </CardContent>
                        </Card>
                    </motion.div>
                )}

                {step === 1 && (
                    <motion.div
                        key="step1"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                    >
                        <Card>
                            <CardHeader>
                                <CardTitle>Select a Business Model</CardTitle>
                                <CardDescription>How do you envision delivering value?</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <ModelStep onSelect={handleModelSelect} />
                            </CardContent>
                            <CardFooter>
                                <Button variant="ghost" onClick={() => setStep(0)}>Back</Button>
                            </CardFooter>
                        </Card>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
