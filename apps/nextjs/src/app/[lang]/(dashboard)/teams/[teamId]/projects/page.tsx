import { DashboardHeader } from "~/components/header";
import { DashboardShell } from "~/components/shell";
import { Projects } from "~/components/projects";

export const metadata = {
  title: "Projects",
  description: "Manage your projects.",
};

export default function ProjectsPage({
  params,
}: {
  params: { teamId: string };
}) {
  return (
    <DashboardShell>
      <DashboardHeader
        heading="Projects"
        text="Create and manage your projects."
      />
      <div className="grid gap-10">
        <Projects teamId={params.teamId} />
      </div>
    </DashboardShell>
  );
}
