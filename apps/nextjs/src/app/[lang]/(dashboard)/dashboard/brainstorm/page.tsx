import { DashboardHeader } from "~/components/header";
import { DashboardShell } from "~/components/shell";
import { ChatInterface } from "~/components/brainstorm/chat/chat-interface";
import { IdeaCanvas } from "~/components/brainstorm/canvas/idea-canvas";

export const metadata = {
    title: "Brainstorming Session",
    description: "Collaborate with your AI Co-founder.",
};

export default function BrainstormPage() {
    return (
        <DashboardShell>
            <div className="flex h-[calc(100vh-8rem)] flex-col gap-4 md:flex-row">
                {/* Left: Chat Interface */}
                <div className="flex-1 overflow-hidden rounded-xl border bg-background shadow-sm">
                    <ChatInterface />
                </div>

                {/* Right: Live Idea Canvas */}
                <div className="hidden w-1/3 flex-col gap-4 overflow-hidden rounded-xl border bg-muted/30 p-4 md:flex">
                    <div className="mb-2">
                        <h2 className="text-lg font-semibold">Idea Canvas</h2>
                        <p className="text-sm text-muted-foreground">Live updates as we chat</p>
                    </div>
                    <IdeaCanvas />
                </div>
            </div>
        </DashboardShell>
    );
}
