"use client";

import * as React from "react";
import { useBrainstormStore } from "~/stores/brainstorm-store";
import { ScrollArea, Button, Textarea, Avatar, AvatarFallback, AvatarImage, cn } from "@saasfly/ui";
import { Send } from "lucide-react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

export function ChatInterface() {
    const { session, isTyping, sendMessage, initSession } = useBrainstormStore();
    const [input, setInput] = React.useState("");
    const scrollRef = React.useRef<HTMLDivElement>(null);

    // Auto-init session if missing (e.g. direct navigation)
    React.useEffect(() => {
        if (!session) {
            void initSession();
        }
    }, [session, initSession]);

    // Auto-scroll to bottom
    React.useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollIntoView({ behavior: "smooth", block: "end" });
        }
    }, [session?.messages, isTyping]);

    const handleSend = async () => {
        if (!input.trim()) return;
        const content = input;
        setInput("");
        await sendMessage(content);
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            handleSend();
        }
    };

    if (!session) {
        return <div className="flex h-full items-center justify-center">Loading session...</div>;
    }

    return (
        <div className="flex h-full flex-col">
            {/* Messages Area */}
            <ScrollArea className="flex-1 p-4">
                <div className="flex flex-col gap-4 pb-4">
                    {session.messages.map((msg) => (
                        <div
                            key={msg.id}
                            className={cn(
                                "flex w-full gap-2",
                                msg.role === "user" ? "flex-row-reverse" : "flex-row"
                            )}
                        >
                            <Avatar className="h-8 w-8 shrink-0">
                                {msg.role === "ai" ? (
                                    <AvatarImage src="/images/ai-avatar.png" />
                                ) : (
                                    <AvatarImage src="/images/user-avatar.png" />
                                )}
                                <AvatarFallback>{msg.role === "ai" ? "AI" : "ME"}</AvatarFallback>
                            </Avatar>

                            <div
                                className={cn(
                                    "max-w-[80%] rounded-lg px-4 py-2 text-sm",
                                    msg.role === "user"
                                        ? "bg-primary text-primary-foreground"
                                        : "bg-muted text-foreground"
                                )}
                            >
                                <div className="prose prose-sm dark:prose-invert max-w-none break-words">
                                    <ReactMarkdown remarkPlugins={[remarkGfm]}>
                                        {msg.content}
                                    </ReactMarkdown>
                                </div>

                                {/* Suggestions Chips */}
                                {msg.suggestions && msg.suggestions.length > 0 && (
                                    <div className="mt-3 flex flex-wrap gap-2">
                                        {msg.suggestions.map((sugg) => (
                                            <Button
                                                key={sugg.id}
                                                variant="secondary"
                                                size="sm"
                                                className="h-7 text-xs"
                                                onClick={() => sendMessage(sugg.label)}
                                            >
                                                {sugg.label}
                                            </Button>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}

                    {isTyping && (
                        <div className="flex w-full gap-2">
                            <Avatar className="h-8 w-8 shrink-0">
                                <AvatarFallback>AI</AvatarFallback>
                            </Avatar>
                            <div className="flex items-center gap-1 rounded-lg bg-muted px-4 py-2">
                                <span className="h-2 w-2 animate-bounce rounded-full bg-foreground/50 [animation-delay:-0.3s]"></span>
                                <span className="h-2 w-2 animate-bounce rounded-full bg-foreground/50 [animation-delay:-0.15s]"></span>
                                <span className="h-2 w-2 animate-bounce rounded-full bg-foreground/50"></span>
                            </div>
                        </div>
                    )}
                    <div ref={scrollRef} />
                </div>
            </ScrollArea>

            {/* Input Area */}
            <div className="border-t p-4">
                <div className="flex gap-2">
                    <Textarea
                        placeholder="Type your message..."
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={handleKeyDown}
                        className="min-h-[60px] resize-none"
                    />
                    <Button size="icon" className="h-[60px] w-[60px]" onClick={handleSend} disabled={isTyping || !input.trim()}>
                        <Send className="h-5 w-5" />
                    </Button>
                </div>
            </div>
        </div>
    );
}
