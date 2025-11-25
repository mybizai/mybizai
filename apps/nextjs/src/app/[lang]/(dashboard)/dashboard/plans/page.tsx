"use client";

import { api } from "~/utils/api";
import { Button } from "@saasfly/ui/button";
import Link from "next/link";
import { useRouter, useParams } from "next/navigation";
import { Plus } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@saasfly/ui/card";

export default function PlansPage() {
  const router = useRouter();
  const params = useParams();
  const lang = params.lang as string;
  const utils = api.useUtils();

  const { data: plans, isLoading } = api.businessPlan.list.useQuery();

  const createMutation = api.businessPlan.create.useMutation({
    onSuccess: (newPlan) => {
      if (newPlan && newPlan.id) {
        router.push(`/${lang}/editor/${newPlan.id}`);
      }
      utils.businessPlan.list.invalidate();
    },
  });

  const handleCreate = () => {
    createMutation.mutate({
      title: "Untitled Plan",
    });
  };

  return (
    <div className="flex flex-col space-y-6 p-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Business Plans</h1>
        <Button onClick={handleCreate} disabled={createMutation.isPending}>
          {createMutation.isPending ? "Creating..." : (
            <>
              <Plus className="mr-2 h-4 w-4" />
              Create New Plan
            </>
          )}
        </Button>
      </div>

      {isLoading ? (
        <div>Loading plans...</div>
      ) : plans?.length === 0 ? (
        <div className="flex h-[200px] flex-col items-center justify-center rounded-md border border-dashed text-muted-foreground">
          No plans yet. Create one to get started!
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {plans?.map((plan) => (
                <Link key={plan.id} href={`/${lang}/editor/${plan.id}`} className="block">
                     <Card className="hover:bg-muted/50 transition-colors cursor-pointer">
                        <CardHeader>
                            <CardTitle>{plan.title}</CardTitle>
                            <CardDescription>
                                Last updated: {new Date(plan.updatedAt as Date).toLocaleDateString()}
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <span className="text-sm text-muted-foreground">{plan.status}</span>
                        </CardContent>
                     </Card>
                </Link>
            ))}
        </div>
      )}
    </div>
  );
}
