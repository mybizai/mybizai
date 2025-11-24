import type { Locale } from "~/config/i18n-config";
import { getDictionary } from "~/lib/get-dictionary";
import type { DashboardConfig } from "~/types";

export const getDashboardConfig = async ({
  params: { lang },
}: {
  params: {
    lang: Locale;
  };
}): Promise<DashboardConfig> => {
  const dict = await getDictionary(lang);

  return {
    mainNav: [
      {
        title: dict.common.dashboard.main_nav_documentation,
        href: "/docs",
      },
      {
        title: dict.common.dashboard.main_nav_support,
        href: "/support",
        disabled: true,
      },
    ],
    sidebarNav: [
      {
        id: "dashboard",
        title: "Dashboard",
        href: "/dashboard",
        icon: "Home",
      },
      {
        id: "projects",
        title: "Projects",
        href: "/dashboard/projects",
        icon: "Briefcase",
      },
      {
        id: "analytics",
        title: "Analytics",
        href: "/dashboard/analytics",
        icon: "BarChart3",
      },
      {
        id: "teams",
        title: "Teams",
        href: "/dashboard/teams",
        icon: "Users",
      },
      {
        id: "brand-identity",
        title: "Brand Identity",
        href: "/dashboard/brand-identity",
        icon: "Palette",
      },
      {
        id: "business-plans",
        title: "Business Plans",
        href: "/dashboard/plan", // Mapping to our existing plan page
        icon: "FileText",
      },
      {
        id: "marketing",
        title: "Marketing",
        href: "/dashboard/marketing",
        icon: "Megaphone",
      },
      {
        id: "market-research",
        title: "Market Research",
        href: "/dashboard/market-research",
        icon: "TrendingUp",
      },
      {
        id: "calendar",
        title: "Calendar",
        href: "/dashboard/calendar",
        icon: "Calendar",
      },
      // Tools
      {
        id: "templates",
        title: "Templates",
        href: "/dashboard/templates",
        icon: "BookOpen",
      },
      {
        id: "brainstorming",
        title: "Brainstorming",
        href: "/dashboard/brainstorm",
        icon: "Lightbulb",
      },
      {
        id: "personalization",
        title: "Personalization",
        href: "/dashboard/personalization",
        icon: "Settings",
      },
      {
        id: "plans",
        title: "Plans",
        href: "/dashboard/plans",
        icon: "CreditCard",
      },
      // AI Tools
      {
        id: "ai-agent",
        title: "AI Agent Dashboard",
        href: "/dashboard/ai-agent",
        icon: "Bot",
      },
      {
        id: "competitive-analysis",
        title: "Competitive Analysis",
        href: "/dashboard/competitive-analysis",
        icon: "Target",
      },
      {
        id: "financial-projections",
        title: "Financial Projections",
        href: "/dashboard/financial-projections",
        icon: "TrendingUp",
      },
      {
        id: "team-invite",
        title: "Team Invitations",
        href: "/dashboard/team-invite",
        icon: "Users",
      },
      // Resources
      {
        id: "legal-compliance",
        title: "Legal & Compliance",
        href: "/dashboard/legal-compliance",
        icon: "Scale",
      },
      {
        id: "help-support",
        title: "Help & Support",
        href: "/dashboard/help-support",
        icon: "HelpCircle",
      },
      {
        id: "academy",
        title: "Academy",
        href: "/dashboard/academy",
        icon: "GraduationCap",
      },
      {
        id: "data-import",
        title: "Data Import",
        href: "/dashboard/data-import",
        icon: "Upload",
      },
      {
        id: "archived-projects",
        title: "Archived Projects",
        href: "/dashboard/archived-projects",
        icon: "Archive",
      },
      // Business Tools
      {
        id: "reports",
        title: "Reports",
        href: "/dashboard/reports",
        icon: "BarChart3",
      },
      {
        id: "integrations",
        title: "Integrations",
        href: "/dashboard/integrations",
        icon: "Plug",
      },
      // Account
      {
        id: "profile",
        title: "Profile",
        href: "/dashboard/profile",
        icon: "User",
      },
      {
        id: "notifications",
        title: "Notifications",
        href: "/dashboard/notifications",
        icon: "Bell",
      },
      {
        id: "activity",
        title: "Activity Feed",
        href: "/dashboard/activity",
        icon: "Activity",
      },
    ],
  };
};
