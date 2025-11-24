"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "~/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@saasfly/ui/card";
import { Input } from "@saasfly/ui/input";
import { Label } from "@saasfly/ui/label";
import { RadioGroup, RadioGroupItem } from "@saasfly/ui/radio-group";
import { Textarea } from "@saasfly/ui/textarea";
import { Checkbox } from "@saasfly/ui/checkbox";
import {
    Rocket,
    Building2,
    ArrowRight,
    CheckCircle2,
    BarChart3,
    Users,
    Globe,
    Zap,
    Mic
} from "lucide-react";
import { cn } from "~/lib/utils";

type Step = "choice" | "profile" | "goals" | "analysis";

export function BusinessOnboardingWizard() {
    const router = useRouter();
    const [step, setStep] = useState<Step>("choice");
    const [path, setPath] = useState<"new" | "existing" | null>(null);
    const [loading, setLoading] = useState(false);

    // Form State
    const [businessName, setBusinessName] = useState("");
    const [industry, setIndustry] = useState("");
    const [website, setWebsite] = useState("");
    const [goals, setGoals] = useState<string[]>([]);

    const handleChoice = (choice: "new" | "existing" | "create") => {
        setPath(choice as any);
        if (choice === "new") {
            // Redirect to existing ideation flow
            router.push("/dashboard/brainstorm");
        } else if (choice === "create") {
            // Redirect to discovery flow
            router.push("/dashboard/brainstorm?mode=discovery");
        } else {
            setStep("profile");
        }
    };

    const handleProfileSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setStep("goals");
    };

    const [analysisResult, setAnalysisResult] = useState<any>(null);
    const [error, setError] = useState<string | null>(null);

    const handleGoalsSubmit = async () => {
        setLoading(true);
        setError(null);

        try {
            // Save business profile
            const saveResponse = await fetch("/api/business/profile", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    name: businessName,
                    industry,
                    website,
                    goals: goals,
                }),
            });

            if (!saveResponse.ok) {
                const errorData = await saveResponse.json().catch(() => ({}));
                throw new Error(errorData.details || errorData.error || "Failed to save profile");
            }

            // Generate analysis
            const analysisResponse = await fetch("/api/ai/onboarding-analysis", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    businessName,
                    industry,
                    website,
                    goals: goals,
                }),
            });

            if (!analysisResponse.ok) {
                const errorData = await analysisResponse.json().catch(() => ({}));
                throw new Error(errorData.details || errorData.error || "Failed to generate analysis");
            }

            const data = await analysisResponse.json();
            setAnalysisResult(data);
            setStep("analysis");
        } catch (error: any) {
            console.error("Error details:", JSON.stringify(error, null, 2));
            const errorMessage = error.message || (typeof error === 'object' ? JSON.stringify(error) : String(error));
            setError(errorMessage);
        } finally {
            setLoading(false);
        }
    };

    const toggleGoal = (goal: string) => {
        setGoals(prev =>
            prev.includes(goal)
                ? prev.filter(g => g !== goal)
                : [...prev, goal]
        );
    };

    return (
        <div className="w-full">
            {error && (
                <div className="mb-6 rounded-lg bg-destructive/10 p-4 text-sm text-destructive">
                    {error}
                </div>
            )}
            {step === "choice" && (
                <div className="grid gap-6 md:grid-cols-3">
                    <Card
                        className="group relative cursor-pointer overflow-hidden border-primary/20 transition-all duration-500 hover:-translate-y-1 hover:border-primary hover:shadow-[0_0_30px_-5px_hsl(var(--primary)/0.3)]"
                        onClick={() => handleChoice("new")}
                    >
                        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                        <CardHeader className="relative">
                            <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                                <Rocket className="h-6 w-6" />
                            </div>
                            <CardTitle className="text-xl">I have a New Idea</CardTitle>
                            <CardDescription>
                                Start from scratch. Brainstorm, validate, and build your business plan with AI.
                            </CardDescription>
                        </CardHeader>
                    </Card>

                    <Card
                        className="group relative cursor-pointer overflow-hidden border-primary/20 transition-all duration-500 hover:-translate-y-1 hover:border-blue-500 hover:shadow-[0_0_30px_-5px_rgba(59,130,246,0.4)]"
                        onClick={() => handleChoice("create")}
                    >
                        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                        <CardHeader className="relative">
                            <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-blue-500/10 text-blue-500 transition-colors group-hover:bg-blue-500 group-hover:text-white">
                                <Zap className="h-6 w-6" />
                            </div>
                            <CardTitle className="text-xl">I want to start a Business</CardTitle>
                            <CardDescription>
                                Explore profitable niches, generate ideas, and find your path to entrepreneurship.
                            </CardDescription>
                        </CardHeader>
                    </Card>

                    <Card
                        className="group relative cursor-pointer overflow-hidden border-primary/20 transition-all duration-500 hover:-translate-y-1 hover:border-primary hover:shadow-[0_0_30px_-5px_hsl(var(--primary)/0.3)]"
                        onClick={() => handleChoice("existing")}
                    >
                        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                        <CardHeader className="relative">
                            <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                                <Building2 className="h-6 w-6" />
                            </div>
                            <CardTitle className="text-xl">I have an Existing Business</CardTitle>
                            <CardDescription>
                                Scale up. Optimize operations, expand to new markets, and automate workflows.
                            </CardDescription>
                        </CardHeader>
                    </Card>
                </div>
            )}

            {step === "profile" && (
                <Card>
                    <CardHeader>
                        <div className="flex items-center justify-between">
                            <div>
                                <CardTitle>Tell us about your business</CardTitle>
                                <CardDescription>
                                    We'll analyze your business to recommend the best growth strategies.
                                </CardDescription>
                            </div>
                            <Button variant="ghost" size="icon" className="rounded-full hover:bg-primary/10" title="Voice Input (Coming Soon)">
                                <Mic className="h-5 w-5 text-muted-foreground" />
                            </Button>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleProfileSubmit} className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="name">Business Name</Label>
                                <Input
                                    id="name"
                                    placeholder="Acme Corp"
                                    value={businessName}
                                    onChange={(e) => setBusinessName(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="industry">Industry</Label>
                                <Input
                                    id="industry"
                                    placeholder="e.g. E-commerce, SaaS, Consulting"
                                    value={industry}
                                    onChange={(e) => setIndustry(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="website">Website (Optional)</Label>
                                <Input
                                    id="website"
                                    placeholder="https://example.com"
                                    value={website}
                                    onChange={(e) => setWebsite(e.target.value)}
                                />
                                <p className="text-xs text-muted-foreground">
                                    We can scan your website to auto-fill details.
                                </p>
                            </div>
                            <Button type="submit" className="w-full">
                                Next: Define Goals <ArrowRight className="ml-2 h-4 w-4" />
                            </Button>
                        </form>
                    </CardContent>
                </Card>
            )}

            {step === "goals" && (
                <Card>
                    <CardHeader>
                        <div className="flex items-center justify-between">
                            <div>
                                <CardTitle>What are your main goals?</CardTitle>
                                <CardDescription>
                                    Select all that apply. We'll customize your dashboard accordingly.
                                </CardDescription>
                            </div>
                            <Button variant="ghost" size="icon" className="rounded-full hover:bg-primary/10" title="Voice Input (Coming Soon)">
                                <Mic className="h-5 w-5 text-muted-foreground" />
                            </Button>
                        </div>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div className="grid gap-4 md:grid-cols-2">
                            {[
                                { id: "marketing", label: "Marketing & Sales", icon: BarChart3, desc: "Get more leads and automate campaigns" },
                                { id: "operations", label: "Operations & Efficiency", icon: Zap, desc: "Automate tasks and improve workflows" },
                                { id: "expansion", label: "Growth & Expansion", icon: Globe, desc: "Enter new markets or raise funding" },
                                { id: "team", label: "Team Management", icon: Users, desc: "Hire and manage AI & human teams" },
                            ].map((item) => (
                                <div
                                    key={item.id}
                                    className={cn(
                                        "flex cursor-pointer items-start space-x-4 rounded-lg border p-4 transition-all hover:bg-accent",
                                        goals.includes(item.id) && "border-primary bg-primary/5"
                                    )}
                                    onClick={() => toggleGoal(item.id)}
                                >
                                    <div className={cn("rounded-full p-2", goals.includes(item.id) ? "bg-primary text-primary-foreground" : "bg-muted")}>
                                        <item.icon className="h-4 w-4" />
                                    </div>
                                    <div className="space-y-1">
                                        <h4 className="font-medium leading-none">{item.label}</h4>
                                        <p className="text-sm text-muted-foreground">{item.desc}</p>
                                    </div>
                                    {goals.includes(item.id) && (
                                        <CheckCircle2 className="ml-auto h-5 w-5 text-primary" />
                                    )}
                                </div>
                            ))}
                        </div>
                        <Button
                            onClick={handleGoalsSubmit}
                            className="w-full"
                            disabled={goals.length === 0}
                        >
                            Generate Growth Plan <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                    </CardContent>
                </Card>
            )}

            {step === "analysis" && (
                <Card className="border-primary/50 bg-gradient-to-br from-background to-primary/5">
                    <CardContent className="flex flex-col items-center justify-center py-12 text-center">
                        {loading ? (
                            <>
                                <div className="mb-6 relative">
                                    <div className="absolute inset-0 animate-ping rounded-full bg-primary/20"></div>
                                    <div className="relative rounded-full bg-primary/10 p-4">
                                        <Zap className="h-12 w-12 text-primary animate-pulse" />
                                    </div>
                                </div>
                                <h3 className="text-2xl font-bold mb-2">Analyzing your business...</h3>
                                <p className="text-muted-foreground max-w-md mb-8">
                                    Our AI is generating a custom strategic roadmap based on your goals for {businessName}.
                                </p>
                                <div className="w-full max-w-xs space-y-2">
                                    <div className="flex justify-between text-xs text-muted-foreground">
                                        <span>Scanning industry trends...</span>
                                        <span>100%</span>
                                    </div>
                                    <div className="h-2 w-full overflow-hidden rounded-full bg-secondary">
                                        <div className="h-full w-full animate-progress origin-left bg-primary"></div>
                                    </div>
                                </div>
                            </>
                        ) : (
                            <div className="w-full text-left space-y-6">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <h3 className="text-2xl font-bold">{analysisResult?.executiveBrief?.title || "Growth Plan"}</h3>
                                        <p className="text-muted-foreground">{analysisResult?.executiveBrief?.summary}</p>
                                    </div>
                                    <div className="flex flex-col items-end gap-2">
                                        <div className="flex items-center gap-2">
                                            <div className="relative flex h-8 w-8 items-center justify-center rounded-full bg-primary/10">
                                                <div className="absolute inset-0 animate-ping rounded-full bg-primary/20"></div>
                                                <Mic className="h-4 w-4 text-primary" />
                                            </div>
                                            <span className="text-xs font-medium text-primary">Voice Active</span>
                                        </div>
                                        <div className="text-right">
                                            <div className="text-sm font-medium text-muted-foreground">Detected Mode</div>
                                            <div className="text-xl font-bold text-primary">{analysisResult?.mode}</div>
                                        </div>
                                    </div>
                                </div>

                                <div className="grid gap-4 md:grid-cols-2">
                                    <Card>
                                        <CardHeader>
                                            <CardTitle className="text-base">Key Leverage Points</CardTitle>
                                        </CardHeader>
                                        <CardContent>
                                            <ul className="list-disc pl-4 space-y-2">
                                                {analysisResult?.executiveBrief?.keyLeveragePoints?.map((point: string, i: number) => (
                                                    <li key={i} className="text-sm">{point}</li>
                                                ))}
                                            </ul>
                                        </CardContent>
                                    </Card>
                                    <Card>
                                        <CardHeader>
                                            <CardTitle className="text-base">Recommended Protocol</CardTitle>
                                        </CardHeader>
                                        <CardContent>
                                            <div className="mb-4 text-lg font-semibold text-primary">
                                                {analysisResult?.executiveBrief?.recommendedProtocol}
                                            </div>
                                            <div className="space-y-2">
                                                <div className="text-sm font-medium">Next Steps:</div>
                                                <ul className="list-disc pl-4 space-y-1 text-sm text-muted-foreground">
                                                    {analysisResult?.executiveBrief?.nextSteps?.map((step: string, i: number) => (
                                                        <li key={i}>{step}</li>
                                                    ))}
                                                </ul>
                                            </div>
                                        </CardContent>
                                    </Card>
                                </div>

                                <Button
                                    className="w-full"
                                    onClick={() => router.push("/dashboard?onboarding=complete")}
                                >
                                    Enter Dashboard <ArrowRight className="ml-2 h-4 w-4" />
                                </Button>
                            </div>
                        )}
                    </CardContent>
                </Card>
            )}
        </div>
    );
}

