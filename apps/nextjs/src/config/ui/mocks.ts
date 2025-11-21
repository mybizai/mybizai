import type { SidebarNavItem } from "~/types";

export interface MockCategory {
    id: string;
    title: string;
    icon: string;
    items: SidebarNavItem[];
}

export const getMockNavigation = (): MockCategory[] => [
    {
        id: "core",
        title: "Core",
        icon: "Home",
        items: [
            { id: "dashboard", title: "Dashboard", href: "/en/dashboard" },
            { id: "user_profile", title: "Profile", href: "/en/experiences/mybizai_user_profile" },
            { id: "settings", title: "Settings", href: "/en/experiences/mybizai_settings" },
            { id: "notifications", title: "Notifications", href: "/en/experiences/mybizai_notifications" },
        ],
    },
    {
        id: "ai_agents",
        title: "AI Agents",
        icon: "Bot",
        items: [
            { id: "ai_marketplace", title: "Marketplace", href: "/en/experiences/mybizai_ai_agent_marketplace" },
            { id: "ai_platform", title: "Platform Dashboard", href: "/en/experiences/ai_platform_dashboard" },
            { id: "ai_feedback", title: "Agent Feedback", href: "/en/experiences/ai_agent_feedback" },
            { id: "ai_config", title: "Skill Configuration", href: "/en/experiences/ai_agent_skill_configuration" },
            { id: "ai_customization", title: "Customization", href: "/en/experiences/settings:_ai_agent_customization" },
        ],
    },
    {
        id: "projects",
        title: "Projects",
        icon: "FolderKanban",
        items: [
            { id: "project_tracking", title: "Project Tracking", href: "/en/experiences/project_tracking" },
            { id: "project_templates", title: "Templates", href: "/en/experiences/mybizai_project_templates" },
            { id: "project_history", title: "Version History", href: "/en/experiences/project_version_history" },
            { id: "project_timeline", title: "Timeline", href: "/en/experiences/project_history_timeline" },
            { id: "project_notes", title: "Meeting Notes", href: "/en/experiences/project_meeting_notes" },
            { id: "collaboration", title: "Collaboration Editor", href: "/en/experiences/real-time_collaboration_editor" },
            { id: "archived", title: "Archived Projects", href: "/en/experiences/archived_projects_list" },
        ],
    },
    {
        id: "business_tools",
        title: "Business Tools",
        icon: "Briefcase",
        items: [
            { id: "business_plan", title: "Business Plan Editor", href: "/en/experiences/business_plan_editor" },
            { id: "financial", title: "Financial Projections", href: "/en/experiences/financial_projections_tool" },
            { id: "market_research", title: "Market Research", href: "/en/experiences/market_research_visualization" },
            { id: "competitive", title: "Competitive Analysis", href: "/en/experiences/competitive_analysis_tool" },
            { id: "new_idea", title: "New Idea", href: "/en/dashboard/new-idea" },
            { id: "legal", title: "Legal & Compliance", href: "/en/experiences/legal_&_compliance_guidance" },
        ],
    },
    {
        id: "marketing",
        title: "Marketing",
        icon: "Megaphone",
        items: [
            { id: "campaign", title: "Campaign Planner", href: "/en/experiences/marketing_campaign_planner" },
            { id: "brand", title: "Brand Identity Kit", href: "/en/experiences/brand_identity_kit_builder" },
        ],
    },
    {
        id: "analytics",
        title: "Analytics",
        icon: "BarChart3",
        items: [
            { id: "analytics_reports", title: "Analytics & Reports", href: "/en/experiences/analytics_&_reports" },
            { id: "custom_report_1", title: "Custom Report Builder", href: "/en/experiences/mybizai_custom_report_builder_1" },
            { id: "reporting_prefs", title: "Reporting Preferences", href: "/en/experiences/analytics:_reporting_preferences" },
        ],
    },
    {
        id: "team",
        title: "Team",
        icon: "Users",
        items: [
            { id: "team_mgmt_1", title: "Team Management", href: "/en/experiences/team_management_1" },
            { id: "team_comm", title: "Communication Hub", href: "/en/experiences/team_communication_hub" },
            { id: "invite", title: "Invite Members", href: "/en/experiences/invite_team_members" },
            { id: "permissions", title: "Permissions", href: "/en/experiences/set_member_permissions" },
            { id: "guest", title: "Guest Access", href: "/en/experiences/guest_access_management" },
            { id: "activity_log", title: "Activity Log", href: "/en/experiences/team_management:_activity_log" },
        ],
    },
    {
        id: "settings_config",
        title: "Settings",
        icon: "Settings",
        items: [
            { id: "data_privacy", title: "Data & Privacy", href: "/en/experiences/settings:_data_&_privacy" },
            { id: "integrations", title: "Integrations", href: "/en/dashboard/settings" },
            { id: "notifications_prefs", title: "Notifications", href: "/en/experiences/settings:_notification_preferences" },
            { id: "language", title: "Language & Region", href: "/en/experiences/settings:_language_&_region" },
            { id: "calendar", title: "Calendar Integration", href: "/en/experiences/calendar_integration" },
        ],
    },
    {
        id: "security",
        title: "Security",
        icon: "Shield",
        items: [
            { id: "2fa_setup_app", title: "2FA - Authenticator", href: "/en/experiences/2fa_setup:_authenticator_app" },
            { id: "2fa_setup_sms", title: "2FA - SMS", href: "/en/experiences/2fa_setup:_sms" },
            { id: "2fa_backup", title: "2FA - Backup Codes", href: "/en/experiences/2fa:_backup_codes" },
        ],
    },
    {
        id: "resources",
        title: "Resources",
        icon: "BookOpen",
        items: [
            { id: "academy", title: "Academy", href: "/en/experiences/mybizai_academy" },
            { id: "help", title: "Help & Support", href: "/en/experiences/mybizai_help_&_support" },
            { id: "community", title: "Community Forum", href: "/en/experiences/mybizai_community_forum" },
            { id: "blog", title: "Blog", href: "/en/experiences/mybizai_blog" },
            { id: "webinars", title: "Webinars & Events", href: "/en/experiences/mybizai_webinars_&_events" },
            { id: "resource_lib", title: "Resource Library", href: "/en/experiences/mybizai_resource_library" },
        ],
    },
    {
        id: "billing",
        title: "Billing",
        icon: "CreditCard",
        items: [
            { id: "subscription", title: "Subscription", href: "/en/dashboard/billing" },
            { id: "plans", title: "Plans Comparison", href: "/en/experiences/mybizai_plan_comparison" },
            { id: "referral", title: "Referral Program", href: "/en/experiences/mybizai_referral_program" },
        ],
    },
    {
        id: "info",
        title: "Information",
        icon: "Info",
        items: [
            { id: "about", title: "About Us", href: "/en/experiences/mybizai_about_us" },
            { id: "contact", title: "Contact Us", href: "/en/experiences/mybizai_contact_us" },
            { id: "terms", title: "Terms of Service", href: "/en/experiences/mybizai_terms_of_service" },
            { id: "privacy", title: "Privacy Policy", href: "/en/experiences/mybizai_privacy_policy" },
            { id: "system_status", title: "System Status", href: "/en/experiences/mybizai_system_status" },
        ],
    },
];
