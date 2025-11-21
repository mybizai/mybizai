"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@saasfly/ui";
import * as Icons from "@saasfly/ui/icons";
import { Button } from "@saasfly/ui/button";
import { ScrollArea } from "@saasfly/ui/scroll-area";
import { ChevronLeft, ChevronRight, ChevronDown } from "lucide-react";
import * as Lucide from "lucide-react";

import type { SidebarNavItem } from "~/types";
import { getMockNavigation, type MockCategory } from "~/config/ui/mocks";

const iconMapObj = new Map<string, React.ComponentType<{ className?: string }>>([
    ["billing", Icons.Billing],
    ["chart", Icons.Dashboard],
    ["check", Icons.Check],
    ["chevronLeft", Icons.ChevronLeft],
    ["chevronRight", Icons.ChevronRight],
    ["close", Icons.Close],
    ["dashboard", Icons.Dashboard],
    ["dollarSign", Icons.Billing],
    ["download", Lucide.Download],
    ["ellipsis", Icons.Ellipsis],
    ["gitHub", Icons.GitHub],
    ["google", Icons.Google],
    ["help", Icons.Help],
    ["laptop", Icons.Laptop],
    ["logo", Icons.Logo],
    ["media", Lucide.Image],
    ["messages", Lucide.MessagesSquare],
    ["moon", Icons.Moon],
    ["page", Icons.Page],
    ["pizza", Lucide.Pizza],
    ["post", Icons.Post],
    ["search", Icons.Search],
    ["settings", Icons.Settings],
    ["spinner", Icons.Spinner],
    ["sun", Icons.Sun],
    ["trash", Icons.Trash],
    ["twitter", Icons.Twitter],
    ["user", Icons.User],
    ["warning", Icons.Warning],
    ["add", Icons.Add],
    ["arrowRight", Icons.ArrowRight],
    ["Home", Lucide.Home],
    ["Bot", Lucide.Bot],
    ["FolderKanban", Lucide.FolderKanban],
    ["Briefcase", Lucide.Briefcase],
    ["Megaphone", Lucide.Megaphone],
    ["BarChart3", Lucide.BarChart3],
    ["Users", Lucide.Users],
    ["Settings", Icons.Settings],
    ["Shield", Lucide.Shield],
    ["BookOpen", Lucide.BookOpen],
    ["CreditCard", Icons.Billing],
    ["Info", Lucide.Info],
]);

interface DashboardSidebarProps {
    isCollapsed: boolean;
    toggleCollapse: () => void;
}

export function DashboardSidebar({
    isCollapsed,
    toggleCollapse,
}: DashboardSidebarProps) {
    const path = usePathname();
    const mockCategories = getMockNavigation();
    const [expandedCategories, setExpandedCategories] = React.useState<Set<string>>(
        new Set(["core", "ai_agents", "projects"])
    );

    const toggleCategory = (categoryId: string) => {
        setExpandedCategories((prev) => {
            const next = new Set(prev);
            if (next.has(categoryId)) {
                next.delete(categoryId);
            } else {
                next.add(categoryId);
            }
            return next;
        });
    };

    return (
        <aside
            className={cn(
                "relative hidden flex-col border-r bg-background/60 backdrop-blur-xl transition-all duration-300 ease-in-out md:flex",
                isCollapsed ? "w-[80px]" : "w-[260px]"
            )}
        >
            <Button
                variant="ghost"
                size="sm"
                onClick={toggleCollapse}
                className="absolute -right-3 top-6 z-50 h-6 w-6 rounded-full border bg-background p-0 shadow-md"
            >
                {isCollapsed ? (
                    <ChevronRight className="h-4 w-4" />
                ) : (
                    <ChevronLeft className="h-4 w-4" />
                )}
            </Button>

            <ScrollArea className="flex-1 py-4">
                <nav className="grid gap-1 px-2">
                    {mockCategories.map((category) => {
                        const Icon = iconMapObj.get(category.icon) ?? Lucide.Home;
                        const isExpanded = expandedCategories.has(category.id);

                        return (
                            <div key={category.id} className="space-y-1">
                                <Button
                                    variant="ghost"
                                    onClick={() => toggleCategory(category.id)}
                                    className={cn(
                                        "w-full justify-start gap-3 px-3 py-2 text-sm font-medium",
                                        isCollapsed && "justify-center px-2"
                                    )}
                                >
                                    <Icon className="h-4 w-4 shrink-0" />
                                    {!isCollapsed && (
                                        <>
                                            <span className="flex-1 text-left">{category.title}</span>
                                            <ChevronDown
                                                className={cn(
                                                    "h-4 w-4 transition-transform",
                                                    isExpanded && "rotate-180"
                                                )}
                                            />
                                        </>
                                    )}
                                </Button>

                                {!isCollapsed && isExpanded && (
                                    <div className="ml-6 space-y-1 border-l border-border pl-3">
                                        {category.items.map((item) => {
                                            const isActive = path === item.href || path.startsWith(item.href + "/");

                                            return (
                                                <Link
                                                    key={item.id}
                                                    href={item.href}
                                                    className={cn(
                                                        "block rounded-md px-3 py-1.5 text-sm transition-colors",
                                                        isActive
                                                            ? "bg-mybiz-purple/10 text-mybiz-purple font-medium"
                                                            : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                                                    )}
                                                >
                                                    {item.title}
                                                </Link>
                                            );
                                        })}
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </nav>
            </ScrollArea>

            {!isCollapsed && (
                <div className="border-t p-4">
                    <div className="rounded-lg bg-gradient-to-br from-mybiz-purple/10 to-mybiz-green/10 p-4">
                        <p className="text-sm font-semibold text-foreground">Upgrade to Pro</p>
                        <p className="mt-1 text-xs text-muted-foreground">
                            Unlock all features and unlimited projects
                        </p>
                        <Button className="mt-3 w-full bg-mybiz-purple hover:bg-mybiz-purple/90" size="sm">
                            Upgrade Now
                        </Button>
                    </div>
                </div>
            )}
        </aside>
    );
}
