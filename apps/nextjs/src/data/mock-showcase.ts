export interface MockAnnotation {
  headline: string;
  description: string;
  highlights?: string[];
}

export const FEATURED_JOURNEY_ORDER = [
  "onboarding_complete",
  "personalization:_industry_focus",
  "ai_platform_dashboard",
  "analytics_&_reports",
  "business_plan_editor",
  "team_management_1",
];

export const MOCK_ANNOTATIONS: Record<string, MockAnnotation> = {
  onboarding_complete: {
    headline: "Guided welcome with instant AI setup",
    description:
      "Shows the zero-to-one onboarding moment where admins see their workspace spin up with prebuilt automations.",
    highlights: [
      "Confirms account provisioning and primary workspace creation",
      "Calls attention to the success hero and quick-next steps",
      "Great opener for demos—stakeholders immediately see value delivered",
    ],
  },
  "personalization:_industry_focus": {
    headline: "Tailored industry configuration",
    description:
      "Demonstrates how MyBizAI captures vertical context to tailor playbooks, copy, and data sources.",
    highlights: [
      "Dynamic copy shifts based on selected industry",
      "Illustrates slider + checklist interaction patterns",
      "Sets up downstream dashboards to feel bespoke",
    ],
  },
  ai_platform_dashboard: {
    headline: "Executive overview dashboard",
    description:
      "High-level command center that stakeholders always ask for—metrics, agent status, and alerts in one place.",
    highlights: [
      "Hero KPI tiles with sparkline trends",
      "Agent activity feed with rich avatars",
      "Callout cards for onboarding nudges and workspace health",
    ],
  },
  "analytics_&_reports": {
    headline: "Deep analytics workspace",
    description:
      "Showcases the reporting layer with filters, charts, and export actions—useful for data-minded buyers.",
    highlights: [
      "Multiple chart types and slicers",
      "Download / schedule actions surfaced contextually",
      "Pairs nicely with the dashboard story for end-to-end insight",
    ],
  },
  business_plan_editor: {
    headline: "Collaborative business plan editor",
    description:
      "Illustrates rich text editing, AI suggestions, and export-ready formatting—perfect for strategic stakeholders.",
    highlights: [
      "Inline AI prompts woven into the document",
      "Commenting affordances hint at real-time coauthoring",
      "Download CTA reinforces tangible deliverables",
    ],
  },
  team_management_1: {
    headline: "Team management & permissions",
    description:
      "Highlights how admins invite collaborators, assign roles, and monitor adoption across the org.",
    highlights: [
      "Role badges and access toggles signal enterprise-readiness",
      "Empty-state helper copy selling the next action",
      "Great closer for the story—shows operational control",
    ],
  },
};

export const CATEGORY_TAGLINES: Record<string, string> = {
  onboarding_complete: "Onboarding",
  "personalization:_industry_focus": "Personalization",
  ai_platform_dashboard: "Executive view",
  "analytics_&_reports": "Analytics",
  business_plan_editor: "Planning",
  team_management_1: "Collaboration",
};
