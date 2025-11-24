"use client";

import * as React from "react";
import { DashboardSidebar } from "~/components/dashboard-sidebar";

import { type SidebarNavItem } from "~/types";

interface DashboardLayoutClientProps {
    children: React.ReactNode;
    sidebarItems: SidebarNavItem[];
    params: {
        lang: string;
    };
}

export function DashboardLayoutClient({ children, sidebarItems }: DashboardLayoutClientProps) {
    const [isCollapsed, setIsCollapsed] = React.useState(false);

    return (
        <div className="container flex flex-1 gap-6 md:gap-10">
            <DashboardSidebar
                isCollapsed={isCollapsed}
                toggleCollapse={() => setIsCollapsed(!isCollapsed)}
                items={sidebarItems}
            />
            <main className="flex w-full flex-1 flex-col overflow-hidden">
                {children}
            </main>
        </div>
    );
}
