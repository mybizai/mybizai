import { DashboardHeader } from "~/components/header";
import { DashboardShell } from "~/components/shell";
import { PersonalizationWizard } from "~/components/brainstorm/wizard/personalization-wizard";

export const metadata = {
    title: "New Idea Generation",
    description: "Brainstorm and refine your next big business idea.",
};

export default function NewIdeaPage() {
    return (
        <DashboardShell>
            <DashboardHeader
                heading="New Idea Generation"
                text="Let's kickstart your entrepreneurial journey. First, tell us a bit about what you're looking for."
            />
            <div className="mt-8">
                <PersonalizationWizard />
            </div>
        </DashboardShell>
    );
}
