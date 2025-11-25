"use client";

import { useState, useEffect, useRef } from "react";
import { api } from "~/utils/api";
import { Button } from "@saasfly/ui/button";
import { Input } from "@saasfly/ui/input";
import { cn } from "@saasfly/ui";

interface TeamChatProps {
  memberId: string;
  memberName: string;
}

export function TeamChat({ memberId, memberName }: TeamChatProps) {
  const [message, setMessage] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const { data: messages, refetch } = api.teams.getMessages.useQuery(
    { teamId: memberId }
  );

  useEffect(() => {
    const interval = setInterval(() => {
      void refetch();
    }, 3000);
    return () => clearInterval(interval);
  }, [refetch]);

  const sendMessageMutation = api.teams.sendMessage.useMutation({
    onSuccess: () => {
      setMessage("");
      refetch();
    },
  });

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = () => {
    if (!message.trim()) return;
    sendMessageMutation.mutate({ content: message, teamId: memberId });
  };

  return (
    <div className="flex flex-col h-[500px] border rounded-lg overflow-hidden bg-background">
      <div className="p-4 border-b bg-muted/50">
        <h3 className="font-semibold">Chat with {memberName}</h3>
      </div>
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages?.map((msg) => (
          <div
            key={msg.id}
            className={cn(
              "flex flex-col max-w-[80%]",
              msg.role === "user" ? "ml-auto items-end" : "mr-auto items-start"
            )}
          >
             <div
              className={cn(
                "p-3 rounded-lg text-sm",
                msg.role === "user"
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted text-foreground"
              )}
            >
              {msg.content}
            </div>
            <span className="text-xs text-muted-foreground mt-1">
                {new Date(msg.createdAt).toLocaleTimeString()}
            </span>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
      <div className="p-4 border-t flex gap-2">
        <Input
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
          placeholder="Type a message..."
          disabled={sendMessageMutation.isPending}
        />
        <Button onClick={handleSend} disabled={sendMessageMutation.isPending}>
          Send
        </Button>
      </div>
    </div>
  );
}
