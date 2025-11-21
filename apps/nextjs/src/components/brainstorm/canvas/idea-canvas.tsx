"use client";

import { useBrainstormStore } from "~/stores/brainstorm-store";
import { Card, CardContent, CardHeader, CardTitle, Badge, ScrollArea, Button } from "@saasfly/ui";
import { useRouter } from "next/navigation";
import { Save } from "lucide-react";

export function IdeaCanvas() {
    const session = useBrainstormStore((state) => state.session);
    const router = useRouter();

    const handleSave = async () => {
        // In a real app, we'd make an API call here.
        // For now, we assume the state is persisted or we just redirect.
        console.log("Saving idea and redirecting...");
        // router.push("/en/dashboard");
        // router.refresh(); 
        window.location.href = "/en/dashboard"; // Hard redirect as fallback
    };

    if (!session) {
        return (
            <div className="flex h-full items-center justify-center text-muted-foreground">
                Start a session to see your idea take shape.
            </div>
        );
    }

    const { idea } = session;

    return (
        <ScrollArea className="h-full pr-4">
            <div className="space-y-4">
                <Card>
                    <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium text-muted-foreground">Title</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-xl font-bold">{idea.title || "Untitled Project"}</div>
                    </CardContent>
                </Card>

                <div className="grid grid-cols-1 gap-2">
                    <Card>
                        <CardHeader className="pb-2">
                            <CardTitle className="text-xs font-medium text-muted-foreground">Industry</CardTitle>
                        </CardHeader>
                        <CardContent className="pb-2">
                            {idea.industry ? <Badge variant="secondary">{idea.industry}</Badge> : <span className="text-sm text-muted-foreground">TBD</span>}
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="pb-2">
                            <CardTitle className="text-xs font-medium text-muted-foreground">Business Model</CardTitle>
                        </CardHeader>
                        <CardContent className="pb-2">
                            {idea.businessModel ? <Badge variant="outline">{idea.businessModel}</Badge> : <span className="text-sm text-muted-foreground">TBD</span>}
                        </CardContent>
                    </Card>
                </div>

                <Card>
                    <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium text-muted-foreground">Description</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-sm text-muted-foreground">
                            {idea.description || "As we chat, I'll summarize your idea here..."}
                        </p>
                    </CardContent>
                </Card>

                {/* Placeholder for future sections */}
                <div className="rounded-lg border border-dashed p-4 text-center text-xs text-muted-foreground">
                    Target Audience & Revenue Streams will appear here
                </div>

                <div className="pt-4">
                    <Button className="w-full" onClick={(e) => {
                        e.preventDefault();
                        console.log("Save button clicked!");
                        handleSave();
                    }} type="button">
                        <Save className="mr-2 h-4 w-4" />
                        Save Idea to Dashboard
                    </Button>
                </div>
            </div>
        </ScrollArea>
    );
}
