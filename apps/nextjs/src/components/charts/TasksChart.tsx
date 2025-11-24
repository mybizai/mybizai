"use client";

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from "recharts";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "~/components/ui/chart";

const data = [
    { name: "Marketing", completed: 45, pending: 15, automated: 30 },
    { name: "Sales", completed: 38, pending: 12, automated: 25 },
    { name: "Operations", completed: 52, pending: 8, automated: 40 },
    { name: "Finance", completed: 35, pending: 5, automated: 28 },
    { name: "HR", completed: 28, pending: 10, automated: 18 },
];

const chartConfig = {
    completed: {
        label: "Completed",
        color: "hsl(var(--chart-1))",
    },
    pending: {
        label: "Pending",
        color: "hsl(var(--chart-2))",
    },
    automated: {
        label: "Automated",
        color: "hsl(var(--chart-3))",
    },
};

export function TasksChart() {
    return (
        <ChartContainer config={chartConfig}>
            <ResponsiveContainer width="100%" height="100%">
                <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                    <XAxis
                        dataKey="name"
                        className="text-muted-foreground"
                        tick={{ fontSize: 12 }}
                    />
                    <YAxis
                        className="text-muted-foreground"
                        tick={{ fontSize: 12 }}
                    />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Bar dataKey="completed" fill="hsl(var(--chart-1))" radius={[0, 0, 4, 4]} />
                    <Bar dataKey="pending" fill="hsl(var(--chart-2))" radius={[0, 0, 4, 4]} />
                    <Bar dataKey="automated" fill="hsl(var(--chart-3))" radius={[4, 4, 0, 0]} />
                </BarChart>
            </ResponsiveContainer>
        </ChartContainer>
    );
}
