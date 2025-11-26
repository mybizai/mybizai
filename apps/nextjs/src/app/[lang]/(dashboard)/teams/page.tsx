import { DashboardHeader } from "~/components/header";
import { DashboardShell } from "~/components/shell";
import { Teams } from "~/components/teams";

export const metadata = {
  title: "Team Management",
  description: "Manage your teams.",
};

export default function TeamsPage() {
  return (
    <DashboardShell>
      <DashboardHeader
        heading="Teams"
        text="Create and manage your teams."
      />
      <div className="grid gap-10">
        <Teams />
      </div>
    </DashboardShell>
  );
}
