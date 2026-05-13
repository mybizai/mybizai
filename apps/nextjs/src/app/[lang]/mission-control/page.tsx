import { MissionAgentLayer } from "~/components/mission-control/agent-layer";
import { MissionArtifactsLayer } from "~/components/mission-control/artifacts-layer";
import { MissionBatchProductionLayers } from "~/components/mission-control/batch-production-layers";
import { MissionBatchProductionLayersTwo } from "~/components/mission-control/batch-production-layers-2";
import { MissionBatchProductionLayersThree } from "~/components/mission-control/batch-production-layers-3";
import { MissionBatchProductionLayersFour } from "~/components/mission-control/batch-production-layers-4";
import { MissionBatchProductionLayersFive } from "~/components/mission-control/batch-production-layers-5";
import { MissionCommerceLayer } from "~/components/mission-control/commerce-layer";
import { MissionGovernanceLayer } from "~/components/mission-control/governance-layer";
import { MissionNavigationLayer } from "~/components/mission-control/navigation-layer";
import { MissionObservabilityLayer } from "~/components/mission-control/observability-layer";
import { MissionOperationalLayer } from "~/components/mission-control/production-layer";
import { MissionTeamBuilderLayer } from "~/components/mission-control/team-builder-layer";
import { MissionWorkflowDetailLayer } from "~/components/mission-control/workflow-detail-layer";
import { CommerceStrip, MissionControlNav, MissionHero, ScreenGrid } from "~/components/mission-control/static-shell";

export default async function MissionControlPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;

  return (
    <main className="min-h-screen bg-black text-white">
      <MissionControlNav lang={lang} />
      <section className="mx-auto max-w-7xl px-6 py-10">
        <MissionHero lang={lang} />
        <MissionNavigationLayer lang={lang} />
        <MissionOperationalLayer lang={lang} />
        <MissionAgentLayer lang={lang} />
        <MissionTeamBuilderLayer lang={lang} />
        <MissionWorkflowDetailLayer lang={lang} />
        <MissionGovernanceLayer lang={lang} />
        <MissionCommerceLayer lang={lang} />
        <MissionObservabilityLayer lang={lang} />
        <MissionArtifactsLayer lang={lang} />
        <MissionBatchProductionLayers lang={lang} />
        <MissionBatchProductionLayersTwo lang={lang} />
        <MissionBatchProductionLayersThree lang={lang} />
        <MissionBatchProductionLayersFour lang={lang} />
        <MissionBatchProductionLayersFive lang={lang} />
        <div className="mt-12">
          <CommerceStrip lang={lang} />
        </div>
        <div className="mt-10">
          <ScreenGrid lang={lang} />
        </div>
      </section>
    </main>
  );
}
