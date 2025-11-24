"use client";

import { useState, useEffect, useRef } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Button } from "@saasfly/ui/button";
import { Input } from "@saasfly/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@saasfly/ui/avatar";
import { Bot, Send, ArrowLeft, User } from "lucide-react";
import { cn } from "~/lib/utils";

interface Message {
    role: "user" | "assistant";
    content: string;
}

interface Agent {
    id: string;
    name: string;
    role: string;
    avatar?: string | null;
    specialty?: string;
    type: string;
}

export default function AIAgentPage() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const agentId = searchParams.get("id");

    const [agent, setAgent] = useState<Agent | null>(null);
    const [messages, setMessages] = useState<Message[]>([]);
    const [input, setInput] = useState("");
    const [loading, setLoading] = useState(false);
    const [initializing, setInitializing] = useState(true);
    const scrollRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!agentId) {
            router.push("/dashboard/teams");
            return;
        }
        fetchAgent();
    }, [agentId]);

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [messages]);

    const fetchAgent = async () => {
        try {
            const res = await fetch(`/api/teams?id=${agentId}`);
            if (res.ok) {
                const data = await res.json();
                setAgent(data);

                // Fetch History
                const historyRes = await fetch(`/api/ai/chat?agentId=${agentId}`);
                if (historyRes.ok) {
                    const history = await historyRes.json();
                    if (history.length > 0) {
                        setMessages(history);
                    } else {
                        // Add initial greeting if no history
                        setMessages([
                            {
                                role: "assistant",
                                content: `Hello! I'm ${data.name}, your ${data.role}. How can I help you with ${data.specialty || "your tasks"} today?`
                            }
                        ]);
                    }
                }
            } else {
                router.push("/dashboard/teams");
            }
        } catch (error) {
            console.error("Failed to fetch agent", error);
        } finally {
            setInitializing(false);
        }
    };

    const sendMessage = async () => {
        if (!input.trim() || loading || !agent) return;

        const userMessage: Message = { role: "user", content: input };
        setMessages(prev => [...prev, userMessage]);
        setInput("");
        setLoading(true);

        try {
            const res = await fetch("/api/ai/chat", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    message: userMessage.content,
                    agentId: agent.id
                })
            });

            if (res.ok) {
                const data = await res.json();
                setMessages(prev => [...prev, { role: "assistant", content: data.content }]);
            } else {
                console.error("Failed to send message");
            }
        } catch (error) {
            console.error("Error sending message", error);
        } finally {
            setLoading(false);
        }
    };

    if (initializing) {
        return (
            <div className="flex items-center justify-center h-screen">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
            </div>
        );
    }

    if (!agent) return null;

    return (
        <div className="flex flex-col h-[calc(100vh-4rem)] bg-background">
            <header className="flex items-center gap-4 px-6 py-4 border-b bg-card/50 backdrop-blur-sm">
                <Button variant="ghost" size="icon" onClick={() => router.back()}>
                    <ArrowLeft className="h-5 w-5" />
                </Button>
                <Avatar className="h-10 w-10">
                    <AvatarImage src={agent.avatar || undefined} />
                    <AvatarFallback className="bg-primary/10 text-primary">
                        <Bot className="h-6 w-6" />
                    </AvatarFallback>
                </Avatar>
                <div>
                    <h1 className="font-semibold">{agent.name}</h1>
                    <p className="text-xs text-muted-foreground">{agent.role} • {agent.specialty}</p>
                </div>
            </header>

            <div className="flex-1 overflow-y-auto p-6 space-y-4" ref={scrollRef}>
                {messages.map((msg, idx) => (
                    <div
                        key={idx}
                        className={cn(
                            "flex gap-3 max-w-[80%]",
                            msg.role === "user" ? "ml-auto flex-row-reverse" : ""
                        )}
                    >
                        <Avatar className="h-8 w-8 mt-1">
                            <AvatarFallback className={cn(
                                "text-xs",
                                msg.role === "assistant" ? "bg-primary/10 text-primary" : "bg-muted"
                            )}>
                                {msg.role === "assistant" ? <Bot className="h-4 w-4" /> : <User className="h-4 w-4" />}
                            </AvatarFallback>
                        </Avatar>
                        <div
                            className={cn(
                                "rounded-lg p-3 text-sm",
                                msg.role === "user"
                                    ? "bg-primary text-primary-foreground"
                                    : "bg-muted/50"
                            )}
                        >
                            {msg.content}
                        </div>
                    </div>
                ))}
                {loading && (
                    <div className="flex gap-3 max-w-[80%]">
                        <Avatar className="h-8 w-8 mt-1">
                            <AvatarFallback className="bg-primary/10 text-primary">
                                <Bot className="h-4 w-4" />
                            </AvatarFallback>
                        </Avatar>
                        <div className="bg-muted/50 rounded-lg p-3">
                            <div className="flex gap-1">
                                <span className="animate-bounce">●</span>
                                <span className="animate-bounce delay-100">●</span>
                                <span className="animate-bounce delay-200">●</span>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            <div className="p-4 border-t bg-card/50 backdrop-blur-sm">
                <form
                    onSubmit={(e) => { e.preventDefault(); sendMessage(); }}
                    className="flex gap-2 container mx-auto max-w-4xl"
                >
                    <Input
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder={`Message ${agent.name}...`}
                        disabled={loading}
                        className="flex-1"
                    />
                    <Button type="submit" disabled={loading || !input.trim()}>
                        <Send className="h-4 w-4" />
                    </Button>
                </form>
            </div>
        </div>
    );
}
