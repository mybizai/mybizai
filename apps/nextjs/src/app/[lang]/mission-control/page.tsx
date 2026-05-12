const flowScreens = [
  { phase: "01", title: "Project Selection", status: "Entry", summary: "Choose an active workspace or launch a new agentic project.", panels: ["Active Workspaces", "Recent Agent Runs", "Priority Queue"] },
  { phase: "02", title: "Project Creation Wizard 1", status: "Setup", summary: "Capture mission, business context, constraints, and desired outcome.", panels: ["Project Brief", "Business Goal", "Success Criteria"] },
  { phase: "03", title: "Project Creation Wizard 2", status: "Setup", summary: "Select capabilities, source materials, workflow intensity, and execution style.", panels: ["Capability Matrix", "Knowledge Sources", "Autonomy Level"] },
  { phase: "04", title: "Project Creation Wizard 3", status: "Setup", summary: "Confirm execution plan, dependencies, review gates, and launch readiness.", panels: ["Execution Preview", "Dependencies", "Launch Controls"] },
  { phase: "05", title: "Collaboration Space Setup 1", status: "Workspace", summary: "Create the shared operating space where humans and agents collaborate.", panels: ["Space Name", "Participants", "Operating Rules"] },
  { phase: "06", title: "Collaboration Space Setup 2", status: "Workspace", summary: "Configure communication channels, interrupts, approvals, and handoff behavior.", panels: ["Channel Rules", "Escalation Paths", "Human Breakpoints"] },
  { phase: "07", title: "Collaboration Space Setup 3", status: "Workspace", summary: "Finalize workspace context, pinned artifacts, and agent memory boundaries.", panels: ["Artifacts", "Shared Context", "Launch Space"] },
  { phase: "08", title: "Agent List / Roster", status: "Team", summary: "Browse agents by role, status, workload, skill fit, and autonomy.", panels: ["Agent Directory", "Capability Tags", "Availability"] },
  { phase: "09", title: "Team Builder 1", status: "Team", summary: "Draft the first agent team using smart matching against the project brief.", panels: ["Suggested Team", "Fit Scores", "Role Coverage"] },
  { phase: "10", title: "Team Builder 2", status: "Team", summary: "Tune responsibilities, dependencies, and review authority.", panels: ["Role Assignment", "Dependency Map", "Approval Rules"] },
  { phase: "11", title: "Team Builder 3", status: "Team", summary: "Finalize the launch-ready agent team and operating model.", panels: ["Team Preview", "Load Balance", "Start Team"] },
  { phase: "12", title: "Agent Detail View", status: "Agent", summary: "Inspect individual agent profile, capability stack, current task, and logs.", panels: ["Agent Profile", "Current Run", "Activity Log"] },
  { phase: "13", title: "Agent Constitution Editor 1", status: "Governance", summary: "Define role boundaries, allowed actions, and behavioral guardrails.", panels: ["Principles", "Permissions", "Restrictions"] },
  { phase: "14", title: "Agent Constitution Editor 2", status: "Governance", summary: "Review policy conflicts, escalation logic, and operating rules.", panels: ["Policy Review", "Conflict Checks", "Escalations"] },
  { phase: "15", title: "Agent Constitution Editor 3", status: "Governance", summary: "Approve constitution changes and publish them to the active team.", panels: ["Diff Review", "Approvals", "Publish"] },
  { phase: "16", title: "Agent Conversation Hub", status: "Live", summary: "Primary mission room for human-agent collaboration, live context, and interventions.", panels: ["Live Thread", "Agent Queue", "Intervention Panel"] },
  { phase: "17", title: "Performance Dashboard 1", status: "Ops", summary: "Track agent health, throughput, latency, and project status.", panels: ["Health Grid", "Throughput", "Latency"] },
  { phase: "18", title: "Performance Dashboard 2", status: "Ops", summary: "Compare token use, success rate, and workload across agents.", panels: ["Token Usage", "Success Rate", "Agent Load"] },
  { phase: "19", title: "Performance Dashboard 3", status: "Ops", summary: "Surface bottlenecks, cost hotspots, and operational recommendations.", panels: ["Bottlenecks", "Cost Hotspots", "Recommendations"] },
  { phase: "20", title: "Decision Audit Trail 1", status: "Audit", summary: "Review decisions, tool calls, approvals, and state transitions.", panels: ["Decision Log", "Tool Calls", "Approvals"] },
  { phase: "21", title: "Decision Audit Trail 2", status: "Audit", summary: "Trace reasoning paths, dependency chains, and human interventions.", panels: ["Trace View", "Dependencies", "Interventions"] },
  { phase: "22", title: "Decision Audit Trail 3", status: "Audit", summary: "Export governance evidence, incident records, and final project audit package.", panels: ["Evidence", "Incidents", "Export"] },
];

const commerceRoutes = ["Pricing", "Subscription", "Checkout", "Payment", "Billing", "Cancellation", "Invoices"];

export default function MissionControlPage() {
  return (
    <main className="min-h-screen bg-black text-white">
      <section className="mx-auto max-w-7xl px-6 py-10">
        <div className="rounded-3xl border border-blue-500/30 bg-[radial-gradient(circle_at_top,#111a3a,transparent_42%),#050505] p-8 shadow-[0_0_60px_rgba(0,71,255,0.18)]">
          <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-3xl">
              <p className="text-sm font-semibold uppercase tracking-[0.35em] text-blue-300">MyBizAI Mission Control</p>
              <h1 className="mt-4 text-5xl font-semibold tracking-tight md:text-7xl">Agentic operating system app shell</h1>
              <p className="mt-5 text-lg text-zinc-300">Production-facing route map built from the real mock sequence: project setup, collaboration, agent team management, live hub, governance, performance, and audit.</p>
            </div>
            <div className="rounded-2xl border border-purple-400/30 bg-white/5 p-5 text-sm text-zinc-300">
              <div className="text-3xl font-semibold text-white">22</div>
              <div className="mt-1 uppercase tracking-[0.25em] text-zinc-400">Mock screens mapped</div>
            </div>
          </div>
        </div>

        <div className="mt-8 grid gap-4 md:grid-cols-7">
          {commerceRoutes.map((route) => (
            <div key={route} className="rounded-2xl border border-zinc-800 bg-zinc-950 px-4 py-3 text-center text-sm text-zinc-300">
              {route}
            </div>
          ))}
        </div>

        <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {flowScreens.map((screen) => (
            <article key={screen.phase} className="group rounded-3xl border border-zinc-800 bg-zinc-950 p-5 transition hover:border-blue-500/70 hover:shadow-[0_0_35px_rgba(0,71,255,0.18)]">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="text-xs font-semibold uppercase tracking-[0.35em] text-blue-300">{screen.phase}</div>
                  <h2 className="mt-3 text-2xl font-semibold tracking-tight">{screen.title}</h2>
                </div>
                <span className="rounded-full border border-purple-400/40 bg-purple-500/10 px-3 py-1 text-xs uppercase tracking-[0.2em] text-purple-200">{screen.status}</span>
              </div>
              <p className="mt-4 min-h-16 text-sm leading-6 text-zinc-400">{screen.summary}</p>
              <div className="mt-5 grid gap-3">
                {screen.panels.map((panel) => (
                  <div key={panel} className="rounded-2xl border border-zinc-800 bg-black px-4 py-3 text-sm text-zinc-300">{panel}</div>
                ))}
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
