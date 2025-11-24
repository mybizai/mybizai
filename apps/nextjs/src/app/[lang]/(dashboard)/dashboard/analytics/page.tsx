"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@saasfly/ui";
import { RevenueChart } from "~/components/charts/RevenueChart";
import { TasksChart } from "~/components/charts/TasksChart";
import { BarChart3, TrendingUp, DollarSign, Target, Users, Activity } from "lucide-react";

export default function AnalyticsPage() {
    const stats = [
        {
            title: "Total Revenue",
            value: "$2.4M",
            change: "+15.2%",
            icon: DollarSign
        },
        {
            title: "Active Projects",
            value: "23",
            change: "+8",
            icon: Target
        },
        {
            title: "Team Efficiency",
            value: "94%",
            change: "+3.1%",
            icon: Activity
        },
        {
            title: "Client Satisfaction",
            value: "4.8/5",
            change: "+0.2",
            icon: Users
        }
    ];

    return (
        <div className="flex-1 space-y-4 p-8 pt-6">
            <div className="flex items-center justify-between space-y-2">
                <h2 className="text-3xl font-bold tracking-tight">Analytics & Reports</h2>
            </div>

            {/* Key Stats */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                {stats.map((stat) => (
                    <Card key={stat.title}>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">
                                {stat.title}
                            </CardTitle>
                            <stat.icon className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{stat.value}</div>
                            <p className="text-xs text-muted-foreground">
                                {stat.change} from last month
                            </p>
                        </CardContent>
                    </Card>
                ))}
            </div>

            {/* Charts */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                <Card className="col-span-4">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <BarChart3 className="h-5 w-5 text-primary" />
                            Revenue Analytics
                        </CardTitle>
                        <CardDescription>
                            Monthly revenue trends and forecasting
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="pl-2">
                        <div className="h-[350px]">
                            <RevenueChart />
                        </div>
                    </CardContent>
                </Card>

                <Card className="col-span-3">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <TrendingUp className="h-5 w-5" />
                            Task Performance
                        </CardTitle>
                        <CardDescription>
                            Project completion and efficiency metrics
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="h-[350px]">
                            <TasksChart />
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
