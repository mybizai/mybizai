import { DashboardHeader } from "~/components/header";
import { DashboardShell } from "~/components/shell";
import { TeamManagement } from "~/components/team-management";

export const metadata = {
  title: "Team Management",
  description: "Manage your team and chat with them.",
};

export default function TeamPage() {
  return (
    <DashboardShell>
      <DashboardHeader
        heading="Team Management"
        text="Manage your team members and communicate with them."
      />
      <div className="grid gap-10">
        <TeamManagement />
      </div>
    </DashboardShell>
  );
}
