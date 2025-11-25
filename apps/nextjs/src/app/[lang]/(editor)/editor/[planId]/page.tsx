"use client";

import { api } from "~/utils/api";
import { Button } from "@saasfly/ui/button";
import { Input } from "@saasfly/ui/input";
import { useParams, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { toast } from "@saasfly/ui/use-toast";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";

export default function EditorPage() {
  const params = useParams();
  const planId = params.planId as string;
  const lang = (params.lang as string) || "en";
  const utils = api.useUtils();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const { data: plan, isLoading, error } = api.businessPlan.byId.useQuery(
    { id: planId ?? "" },
    { enabled: !!planId }
  );

  const updateMutation = api.businessPlan.update.useMutation({
    onSuccess: () => {
       toast({
         title: "Saved",
         description: "Business plan saved successfully.",
       });
       utils.businessPlan.byId.invalidate({ id: planId });
    },
    onError: (err) => {
        toast({
            title: "Error",
            description: err.message,
            variant: "destructive",
        });
    }
  });

  useEffect(() => {
    if (plan) {
        setTitle(plan.title);
        // Casting content to any to access properties safely
        const c = plan.content as any;
        setContent(c?.text || "");
    }
  }, [plan]);

  const handleSave = () => {
    updateMutation.mutate({
        id: planId,
        title,
        content: { text: content }
    });
  };

  if (isLoading) return <div className="p-8">Loading editor...</div>;
  if (error) return <div className="p-8 text-red-500">Error loading plan: {error.message}</div>;

  return (
    <div className="flex flex-col h-screen bg-background">
      <header className="flex items-center justify-between border-b px-6 py-4">
        <div className="flex items-center gap-4">
            <Link href={`/${lang}/dashboard/plans`}>
                <Button variant="ghost" size="icon">
                    <ChevronLeft className="h-4 w-4" />
                </Button>
            </Link>
            <Input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="font-bold text-lg border-none focus-visible:ring-0 w-[300px] bg-transparent"
                placeholder="Plan Title"
            />
        </div>
        <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground mr-4">
                {updateMutation.isPending ? "Saving..." : "Saved"}
            </span>
            <Button onClick={handleSave} disabled={updateMutation.isPending}>
                Save
            </Button>
        </div>
      </header>
      <main className="flex-1 p-6 bg-muted/10">
        <div className="max-w-4xl mx-auto h-full bg-card rounded-lg border shadow-sm p-6">
            <textarea
                className="w-full h-full resize-none focus:outline-none bg-transparent"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Start writing your business plan..."
            />
        </div>
      </main>
    </div>
  );
}
