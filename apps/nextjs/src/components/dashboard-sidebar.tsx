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
    items: SidebarNavItem[];
}

export function DashboardSidebar({
    isCollapsed,
    toggleCollapse,
    items,
}: DashboardSidebarProps) {
    const path = usePathname();
    // Group items by category if needed, or just render flat list if that's what we have
    // The reference project had groups (Navigation, Tools, etc.), but our dashboard.ts is a flat list.
    // We can infer groups or just render a single group for now.
    // For now, let's render a single group "Navigation" for the flat list, 
    // or we can try to group them based on comments/structure if we had that metadata.
    // Since dashboard.ts is flat, we'll render them directly.

    // However, the existing code expects categories. Let's adapt.
    // We'll create a single "Menu" category for now to keep it simple and working.

    const [expandedCategories, setExpandedCategories] = React.useState<Set<string>>(
        new Set(["menu"])
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
                    <div className="space-y-1">
                        {!isCollapsed && (
                            <h4 className="mb-2 px-4 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                                Menu
                            </h4>
                        )}
                        {items.map((item) => {
                            const isActive = path === item.href || path.startsWith(item.href + "/");

                            return (
                                <Link
                                    key={item.id}
                                    href={item.href || "#"}
                                    className={cn(
                                        "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors",
                                        isActive
                                            ? "bg-mybiz-purple/10 text-mybiz-purple"
                                            : "text-muted-foreground hover:bg-accent hover:text-accent-foreground",
                                        isCollapsed && "justify-center px-2"
                                    )}
                                    title={isCollapsed ? item.title : undefined}
                                >
                                    {!isCollapsed && <span>{item.title}</span>}
                                    {isCollapsed && <span className="text-xs font-bold">{item.title.substring(0, 2)}</span>}
                                </Link>
                            );
                        })}
                    </div>
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
