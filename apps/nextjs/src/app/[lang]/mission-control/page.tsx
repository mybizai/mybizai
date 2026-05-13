import Link from "next/link";
import {
  MissionControlNav,
  MissionHero,
  CommerceStrip,
  ScreenGrid
} from "~/components/mission-control/static-shell";
import { ProjectManagementSection } from "~/components/mission-control/project-management";
import { TeamOperationsSection } from "~/components/mission-control/team-operations";
import { LiveOperationsSection } from "~/components/mission-control/live-operations";
import { GovernanceComplianceSection } from "~/components/mission-control/governance-compliance";
import { ObservabilityOpsSection } from "~/components/mission-control/observability-ops";
import { WorkspaceAdminSection } from "~/components/mission-control/workspace-admin";
import { CommerceOpsSection } from "~/components/mission-control/commerce-ops";

export default async function MissionControlPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;

  const functionalAreas = [
    { title: "Project Management", id: "project", Component: ProjectManagementSection, href: "/project" },
    { title: "Team Operations", id: "team", Component: TeamOperationsSection, href: "/team" },
    { title: "Live Operations", id: "live", Component: LiveOperationsSection, href: "/live-ops" },
    { title: "Governance & Audit", id: "governance", Component: GovernanceComplianceSection, href: "/governance-audit" },
    { title: "Commerce Ops", id: "commerce", Component: CommerceOpsSection, href: "/commerce" },
    { title: "Observability & Ops", id: "ops", Component: ObservabilityOpsSection, href: "/ops" },
    { title: "Workspace & Admin", id: "admin", Component: WorkspaceAdminSection, href: "/admin" },
  ];

  return (
    <main className="min-h-screen bg-black text-white">
      <MissionControlNav lang={lang} />
      <section className="mx-auto max-w-7xl px-6 py-10 space-y-16">
        <MissionHero lang={lang} />

        <div className="grid gap-12 lg:grid-cols-2">
          {functionalAreas.map(({ title, id, Component, href }) => (
            <div key={id} className="space-y-6">
              <div className="flex items-center justify-between border-b border-zinc-800 pb-4">
                <h2 className="text-2xl font-bold tracking-tight">{title}</h2>
                <Link
                  href={`/${lang}/mission-control${href}`}
                  className="text-sm font-semibold text-blue-400 hover:text-blue-300 transition"
                >
                  Enter Surface →
                </Link>
              </div>
              <div className="opacity-80 hover:opacity-100 transition-opacity">
                <Component lang={lang} />
              </div>
            </div>
          ))}
        </div>

        <div className="space-y-8 border-t border-zinc-800 pt-16">
          <div className="flex flex-col gap-4">
            <h2 className="text-3xl font-bold tracking-tight">Commerce Workflow</h2>
            <p className="text-zinc-400 max-w-2xl">Production-ready commerce routes reserved for pricing, subscription, and billing management.</p>
          </div>
          <CommerceStrip lang={lang} />
        </div>

        <div className="space-y-8 border-t border-zinc-800 pt-16">
          <div className="flex flex-col gap-4">
            <h2 className="text-3xl font-bold tracking-tight">Mission Screen Roster</h2>
            <p className="text-zinc-400 max-w-2xl">Direct access to all 22 mock-driven functional screens in the Mission Control sequence.</p>
          </div>
          <ScreenGrid lang={lang} />
        </div>
      </section>
    </main>
  );
}
