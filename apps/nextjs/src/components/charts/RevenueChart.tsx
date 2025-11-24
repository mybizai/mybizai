"use client";

import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from "recharts";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "~/components/ui/chart";

const data = [
    { month: "Jan", revenue: 65000, tasks: 145 },
    { month: "Feb", revenue: 59000, tasks: 160 },
    { month: "Mar", revenue: 80000, tasks: 180 },
    { month: "Apr", revenue: 81000, tasks: 200 },
    { month: "May", revenue: 96000, tasks: 240 },
    { month: "Jun", revenue: 115000, tasks: 280 },
];

const chartConfig = {
    revenue: {
        label: "Revenue",
        color: "hsl(var(--primary))",
    },
};

export function RevenueChart() {
    return (
        <ChartContainer config={chartConfig}>
            <ResponsiveContainer width="100%" height="100%">
                <LineChart data={data}>
                    <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                    <XAxis
                        dataKey="month"
                        className="text-muted-foreground"
                        tick={{ fontSize: 12 }}
                    />
                    <YAxis
                        className="text-muted-foreground"
                        tick={{ fontSize: 12 }}
                        tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`}
                    />
                    <ChartTooltip
                        content={<ChartTooltipContent />}
                        formatter={(value) => [`$${value.toLocaleString()}`, "Revenue"]}
                    />
                    <Line
                        type="monotone"
                        dataKey="revenue"
                        stroke="hsl(var(--primary))"
                        strokeWidth={3}
                        dot={{ fill: "hsl(var(--primary))", strokeWidth: 2, r: 4 }}
                        activeDot={{ r: 6, stroke: "hsl(var(--primary))", strokeWidth: 2 }}
                    />
                </LineChart>
            </ResponsiveContainer>
        </ChartContainer>
    );
}
