import { DashboardHeader } from "~/components/header";
import { DashboardShell } from "~/components/shell";
import { Tasks } from "~/components/tasks";

export const metadata = {
  title: "Tasks",
  description: "Manage your tasks.",
};

export default function TasksPage({
  params,
}: {
  params: { teamId: string; projectId: string };
}) {
  return (
    <DashboardShell>
      <DashboardHeader
        heading="Tasks"
        text="Create and manage your tasks."
      />
      <div className="grid gap-10">
        <Tasks projectId={params.projectId} />
      </div>
    </DashboardShell>
  );
}
