"use client";

import * as React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@saasfly/ui/card";
import { Activity, Bot, CheckCircle, DollarSign, TrendingUp } from "lucide-react";
import { cn } from "@saasfly/ui";

export function AgentDashboard() {
    return (
        <div className="space-y-8">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <Card className="bg-gradient-to-br from-mybiz-purple/10 to-transparent border-mybiz-purple/20">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
                        <DollarSign className="h-4 w-4 text-mybiz-purple" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">$45,231.89</div>
                        <p className="text-xs text-muted-foreground">
                            +20.1% from last month
                        </p>
                    </CardContent>
                </Card>
                <Card className="bg-gradient-to-br from-mybiz-green/10 to-transparent border-mybiz-green/20">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Active Agents</CardTitle>
                        <Bot className="h-4 w-4 text-mybiz-green" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">+12</div>
                        <p className="text-xs text-muted-foreground">
                            +3 new agents deployed
                        </p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Tasks Completed</CardTitle>
                        <CheckCircle className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">+2350</div>
                        <p className="text-xs text-muted-foreground">
                            +180 since last hour
                        </p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">System Health</CardTitle>
                        <Activity className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">99.9%</div>
                        <p className="text-xs text-muted-foreground">
                            All systems operational
                        </p>
                    </CardContent>
                </Card>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                <Card className="col-span-4">
                    <CardHeader>
                        <CardTitle>Overview</CardTitle>
                    </CardHeader>
                    <CardContent className="pl-2">
                        {/* Placeholder for a chart */}
                        <div className="h-[200px] w-full rounded-md bg-muted/20 flex items-center justify-center text-muted-foreground">
                            Chart Placeholder
                        </div>
                    </CardContent>
                </Card>
                <Card className="col-span-3">
                    <CardHeader>
                        <CardTitle>Recent Activity</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-8">
                            <div className="flex items-center">
                                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-mybiz-purple/20">
                                    <Bot className="h-5 w-5 text-mybiz-purple" />
                                </div>
                                <div className="ml-4 space-y-1">
                                    <p className="text-sm font-medium leading-none">
                                        Sales Agent Alpha
                                    </p>
                                    <p className="text-sm text-muted-foreground">
                                        Closed a deal with TechCorp
                                    </p>
                                </div>
                                <div className="ml-auto font-medium">+$1,999.00</div>
                            </div>
                            <div className="flex items-center">
                                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-mybiz-green/20">
                                    <TrendingUp className="h-5 w-5 text-mybiz-green" />
                                </div>
                                <div className="ml-4 space-y-1">
                                    <p className="text-sm font-medium leading-none">
                                        Marketing Bot
                                    </p>
                                    <p className="text-sm text-muted-foreground">
                                        Optimized ad campaign
                                    </p>
                                </div>
                                <div className="ml-auto font-medium">+15% CTR</div>
                            </div>
                            <div className="flex items-center">
                                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-500/20">
                                    <CheckCircle className="h-5 w-5 text-blue-500" />
                                </div>
                                <div className="ml-4 space-y-1">
                                    <p className="text-sm font-medium leading-none">
                                        Support Droid
                                    </p>
                                    <p className="text-sm text-muted-foreground">
                                        Resolved 50 tickets
                                    </p>
                                </div>
                                <div className="ml-auto font-medium">2m ago</div>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
