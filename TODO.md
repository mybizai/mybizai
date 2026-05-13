# Mission Control Frontend Completion TODO

## Goal

Finish the MyBizAI Mission Control frontend as a coherent, production-grade static product shell based on the uploaded mock flow. The current implementation has proven the direction, but it now needs consolidation, refactoring, route cleanup, responsive polish, and build validation.

This TODO is written for Codex to execute in the repository.

## Current State

Mission Control currently includes many static frontend sections under:

- `apps/nextjs/src/components/mission-control/`
- `apps/nextjs/src/app/[lang]/mission-control/`
- `apps/nextjs/src/data/mission-control.ts`

The work so far added the core product direction:

- Mission Control overview
- Navigation layer
- Operational layer
- Agent layer
- Team builder layer
- Workflow detail layer
- Governance layer
- Commerce layer
- Observability layer
- Artifacts layer
- Multiple batch production layers
- Dynamic mock-derived screen route
- Static commerce placeholder routes

The current problem is that the shell is becoming too section-heavy. It needs to be converted into a clean, maintainable frontend architecture.

## Primary Objective

Convert the current Mission Control implementation from a stacked prototype into a structured app experience.

The finished result should feel like a real product shell, not a long list of disconnected cards.

## Required Product Flow

Preserve this mock-driven route/story order:

1. Project Selection
2. Project Creation Wizard 1
3. Project Creation Wizard 2
4. Project Creation Wizard 3
5. Collaboration Space Setup 1
6. Collaboration Space Setup 2
7. Collaboration Space Setup 3
8. Agent List / Roster
9. Team Builder 1
10. Team Builder 2
11. Team Builder 3
12. Agent Detail View
13. Agent Constitution Editor 1
14. Agent Constitution Editor 2
15. Agent Constitution Editor 3
16. Agent Conversation Hub
17. Performance Dashboard 1
18. Performance Dashboard 2
19. Performance Dashboard 3
20. Decision Audit Trail 1
21. Decision Audit Trail 2
22. Decision Audit Trail 3

Also preserve these commerce routes:

- Pricing
- Subscription
- Checkout
- Payment
- Billing
- Cancellation
- Invoices

## Implementation Tasks

### 1. Audit Existing Mission Control Files

Inspect all files under:

- `apps/nextjs/src/components/mission-control/`
- `apps/nextjs/src/app/[lang]/mission-control/`
- `apps/nextjs/src/data/mission-control.ts`

Identify duplicated layouts, duplicated section headers, duplicated chip grids, oversized page sections, route inconsistencies, import-order issues, and components that should become reusable primitives.

### 2. Create Reusable UI Primitives

Create or refactor into reusable Mission Control components:

- `MissionSection`
- `MissionCard`
- `MissionMetricCard`
- `MissionChipGrid`
- `MissionRouteCard`
- `MissionStatusPill`
- `MissionPageShell`
- `MissionBackLink`

Keep these local to the Mission Control feature unless a broader shared UI component already exists.

Suggested file:

`apps/nextjs/src/components/mission-control/primitives.tsx`

### 3. Consolidate Batch Layers

The batch layer files should not remain as long-term product architecture if they are just collections of cards.

Consolidate the batch layers into coherent product sections:

- Product Lifecycle
- Conversation Cockpit
- Audit Evidence
- Voice Readiness
- Workspace Settings
- Deployment Readiness
- Notification Center
- Access Control
- Integration Slots
- Quality Gates
- Onboarding
- Admin Console
- Data Readiness
- Feedback Loops
- Growth Surfaces
- Templates
- Insights
- Workspace Health
- Collaboration Modes
- Export Controls
- Scenario Planning
- Risk Register
- SLA Surface
- Cost Controls
- Knowledge Base
- Experiment Lab
- Customer Handoff
- Security Posture
- Roadmap Board
- System Readiness

Recommended grouping:

- `/mission-control` = executive overview with high-level cards only
- `/mission-control/live` = live operations and cockpit
- `/mission-control/agents` = roster, capability matrix, team builder preview
- `/mission-control/governance` = constitution, approval queue, risk, audit guardrails
- `/mission-control/commerce` = pricing, subscription, checkout, billing, cancellation, invoices
- `/mission-control/observability` = metrics, telemetry, quality gates, cost controls
- `/mission-control/artifacts` = source library, generated outputs, exports, handoff
- `/mission-control/admin` = access control, settings, integrations, deployment readiness
- `/mission-control/onboarding` = onboarding, profile setup, first mission

### 4. Clean Up Routing

Keep:

- `/[lang]/mission-control`
- `/[lang]/mission-control/[screen]`
- `/[lang]/mission-control/live`
- `/[lang]/mission-control/agents`
- `/[lang]/mission-control/team-builder`
- `/[lang]/mission-control/governance`
- `/[lang]/mission-control/commerce`
- `/[lang]/mission-control/commerce/[commerce]`
- `/[lang]/mission-control/observability`
- `/[lang]/mission-control/artifacts`

Add if useful:

- `/[lang]/mission-control/admin`
- `/[lang]/mission-control/onboarding`

Deprecate or remove if they only duplicate content:

- `/[lang]/mission-control/batch`
- `/[lang]/mission-control/batch-2`
- `/[lang]/mission-control/batch-3`
- `/[lang]/mission-control/batch-4`
- `/[lang]/mission-control/batch-5`

If removing routes, remove unused imports/components as well.

### 5. Improve Overview Page

The overview page should not show every detail layer in full.

Refactor it into:

- Hero
- Primary command routes
- Current mission snapshot
- Core workflow map
- Key metrics
- Next actions
- Links to detailed sections

Avoid a huge endless page.

### 6. Improve Detail Pages

Each major route should have a focused job:

- Live: queue, live thread placeholder, intervention panel, pinned context
- Agents: roster, team builder summary, autonomy posture, capability matrix
- Governance: approval queue, constitution summary, risk register, audit guardrails
- Commerce: pricing/subscription/payment/cancellation/invoice workflow shell
- Observability: health, event stream, cost controls, quality gates
- Artifacts: source library, generated outputs, exports, customer handoff
- Admin: access control, integration slots, deployment readiness, settings
- Onboarding: welcome, business profile, source setup, first mission

Each route should use the same page shell and visual language.

### 7. Data Model Cleanup

Move static lists into data files instead of hardcoding everything inside components.

Suggested files:

- `apps/nextjs/src/data/mission-control.ts`
- optional: `apps/nextjs/src/data/mission-control-sections.ts`

Data should describe:

- routes
- screens
- commerce routes
- agents
- metrics
- lifecycle steps
- governance checks
- artifact types
- admin settings

Avoid duplicating string arrays across components.

### 8. Responsive Design Pass

Ensure all routes behave properly at mobile, tablet, desktop, and wide desktop widths.

Check for:

- overly dense grids
- text overflow
- bad wrapping with long route names
- cards becoming too narrow
- sticky nav behavior
- excessive vertical scrolling on overview

### 9. Visual System Pass

Maintain the current dark Mission Control aesthetic:

- black background
- blue/purple/cyan/emerald accents
- thin borders
- subtle gradients
- no icon dependency
- strong typography
- no cartoon styling

Use consistent spacing and card styles.

Avoid turning every section into a different color theme. Keep accents intentional.

### 10. Accessibility Basics

Check:

- links have readable text
- heading order is sensible
- text contrast is acceptable
- hover-only information is not required
- keyboard navigation works through links/buttons

### 11. Build and Validation

Run the appropriate repo commands after refactor.

Start by inspecting `package.json` scripts.

Likely commands:

```bash
bun install
bun run typecheck
bun run lint
bun run build
```

If the repo has workspace-specific commands, prefer the smallest relevant scope for `apps/nextjs` first, then full repo checks if practical.

Do not ignore TypeScript errors.

If existing unrelated build failures appear, document them clearly in the PR.

### 12. PR Requirements

Open one PR with:

- clear summary
- list of routes changed
- list of components refactored
- screenshots if available
- test/build results
- known limitations

## Acceptance Criteria

The PR is acceptable when:

1. Mission Control has a coherent overview page, not a giant prototype dump.
2. Major product areas have focused routes.
3. Mock-driven 22-screen flow is preserved.
4. Commerce placeholder routes still exist.
5. Reusable primitives replace duplicated card/section markup.
6. Static data is organized and not scattered everywhere.
7. TypeScript passes, or failures are clearly unrelated and documented.
8. Lint passes, or failures are clearly unrelated and documented.
9. Build passes, or failures are clearly unrelated and documented.
10. The UI remains dark, professional, no-icon, and aligned with Mission Control.

## Non-Goals For This Pass

Do not wire real backend orchestration yet.

Do not wire real payments yet.

Do not wire real Supabase storage yet.

Do not add real auth/permission enforcement yet.

Do not replace the product direction with a generic SaaS dashboard.

Do not remove the mock-driven journey.

## Suggested PR Title

`refactor: consolidate Mission Control frontend shell`

## Suggested PR Summary

- Refactors Mission Control into reusable frontend primitives
- Consolidates batch layers into focused product routes
- Cleans route structure and overview page hierarchy
- Preserves mock-driven product flow and commerce placeholders
- Adds build/typecheck validation notes
