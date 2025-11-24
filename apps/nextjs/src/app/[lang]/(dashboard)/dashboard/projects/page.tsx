"use client";

import { useState } from "react";
import { Button } from "@saasfly/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@saasfly/ui/card";
import { Badge } from "@saasfly/ui/badge";
import { Input } from "@saasfly/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@saasfly/ui/select";
import { Progress } from "@saasfly/ui/progress";
import {
    Search,
    Filter,
    Plus,
    Calendar,
    Users,
    Clock,
    CheckCircle,
    AlertCircle,
    PlayCircle,
    PauseCircle,
    MoreHorizontal,
    Eye,
    Edit
} from "lucide-react";
import { format } from "date-fns";

interface Project {
    id: string;
    name: string;
    description: string;
    status: "planning" | "active" | "paused" | "completed" | "cancelled";
    progress: number;
    dueDate: Date;
    team: string[];
    category: string;
    priority: "low" | "medium" | "high";
    createdDate: Date;
}

const mockProjects: Project[] = [
    {
        id: "1",
        name: "AI-Powered E-commerce Platform",
        description: "Complete marketplace solution with intelligent product recommendations",
        status: "active",
        progress: 75,
        dueDate: new Date("2024-02-15"),
        team: ["Sarah Johnson", "Mike Chen", "AI Assistant"],
        category: "Development",
        priority: "high",
        createdDate: new Date("2024-01-01")
    },
    {
        id: "2",
        name: "Sustainable Food Delivery Service",
        description: "Carbon-neutral delivery platform with local restaurant partnerships",
        status: "planning",
        progress: 25,
        dueDate: new Date("2024-03-20"),
        team: ["Emily Davis", "Research AI"],
        category: "Business Planning",
        priority: "medium",
        createdDate: new Date("2024-01-10")
    },
    {
        id: "3",
        name: "Smart Home IoT Hub",
        description: "Unified control system for all smart home devices",
        status: "completed",
        progress: 100,
        dueDate: new Date("2024-01-30"),
        team: ["Hardware Team", "IoT AI"],
        category: "Development",
        priority: "high",
        createdDate: new Date("2023-12-01")
    }
];

export default function ProjectsPage() {
    const [projects] = useState(mockProjects);
    const [searchQuery, setSearchQuery] = useState("");
    const [statusFilter, setStatusFilter] = useState("all");
    const [categoryFilter, setCategoryFilter] = useState("all");

    const filteredProjects = projects.filter(project => {
        const matchesSearch = project.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            project.description.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesStatus = statusFilter === "all" || project.status === statusFilter;
        const matchesCategory = categoryFilter === "all" || project.category === categoryFilter;

        return matchesSearch && matchesStatus && matchesCategory;
    });

    const getStatusIcon = (status: string) => {
        switch (status) {
            case "active": return <PlayCircle className="h-4 w-4" />;
            case "planning": return <Clock className="h-4 w-4" />;
            case "paused": return <PauseCircle className="h-4 w-4" />;
            case "completed": return <CheckCircle className="h-4 w-4" />;
            case "cancelled": return <AlertCircle className="h-4 w-4" />;
            default: return <Clock className="h-4 w-4" />;
        }
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case "active": return "bg-green-500/10 text-green-500 border-green-500/20";
            case "planning": return "bg-yellow-500/10 text-yellow-500 border-yellow-500/20";
            case "paused": return "bg-muted/10 text-muted-foreground border-muted/20";
            case "completed": return "bg-green-500/10 text-green-500 border-green-500/20";
            case "cancelled": return "bg-red-500/10 text-red-500 border-red-500/20";
            default: return "bg-muted/10 text-muted-foreground border-muted/20";
        }
    };

    const getPriorityColor = (priority: string) => {
        switch (priority) {
            case "high": return "bg-red-500/10 text-red-500 border-red-500/20";
            case "medium": return "bg-yellow-500/10 text-yellow-500 border-yellow-500/20";
            case "low": return "bg-green-500/10 text-green-500 border-green-500/20";
            default: return "bg-muted/10 text-muted-foreground border-muted/20";
        }
    };

    return (
        <div className="flex-1 bg-gradient-to-br from-background via-background/50 to-background/20">
            <div className="container mx-auto px-6 py-8">
                {/* Header */}
                <div className="flex items-center justify-between mb-8">
                    <div>
                        <h1 className="text-3xl font-bold mb-2">Projects</h1>
                        <p className="text-muted-foreground">
                            Manage and track all your business projects from inception to delivery
                        </p>
                    </div>
                    <Button className="shadow-md transition-all duration-300 hover:shadow-lg">
                        <Plus className="h-4 w-4 mr-2" />
                        New Project
                    </Button>
                </div>

                {/* Filters */}
                <Card className="mb-8 bg-card/50 border-border/50 backdrop-blur-sm">
                    <CardContent className="p-6">
                        <div className="flex flex-col md:flex-row gap-4">
                            <div className="relative flex-1">
                                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                                <Input
                                    placeholder="Search projects..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="pl-10 bg-background/50"
                                />
                            </div>

                            <Select value={statusFilter} onValueChange={setStatusFilter}>
                                <SelectTrigger className="w-48 bg-background/50">
                                    <Filter className="h-4 w-4 mr-2" />
                                    <SelectValue placeholder="Filter by status" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all">All Status</SelectItem>
                                    <SelectItem value="active">Active</SelectItem>
                                    <SelectItem value="planning">Planning</SelectItem>
                                    <SelectItem value="paused">Paused</SelectItem>
                                    <SelectItem value="completed">Completed</SelectItem>
                                    <SelectItem value="cancelled">Cancelled</SelectItem>
                                </SelectContent>
                            </Select>

                            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                                <SelectTrigger className="w-48 bg-background/50">
                                    <SelectValue placeholder="Filter by category" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all">All Categories</SelectItem>
                                    <SelectItem value="Development">Development</SelectItem>
                                    <SelectItem value="Business Planning">Business Planning</SelectItem>
                                    <SelectItem value="Marketing">Marketing</SelectItem>
                                    <SelectItem value="Research">Research</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </CardContent>
                </Card>

                {/* Projects Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredProjects.map((project, index) => (
                        <Card
                            key={project.id}
                            className="hover:shadow-lg transition-all duration-300 hover:-translate-y-1 cursor-pointer"
                        >
                            <CardHeader className="pb-3">
                                <div className="flex items-start justify-between">
                                    <div className="space-y-2">
                                        <CardTitle className="text-lg">{project.name}</CardTitle>
                                        <div className="flex items-center gap-2">
                                            <Badge className={getStatusColor(project.status)}>
                                                {getStatusIcon(project.status)}
                                                <span className="ml-1 capitalize">{project.status}</span>
                                            </Badge>
                                            <Badge variant="outline" className={getPriorityColor(project.priority)}>
                                                {project.priority}
                                            </Badge>
                                        </div>
                                    </div>
                                    <Button variant="ghost" size="icon" className="h-8 w-8">
                                        <MoreHorizontal className="h-4 w-4" />
                                    </Button>
                                </div>
                            </CardHeader>

                            <CardContent className="space-y-4">
                                <CardDescription className="line-clamp-2">
                                    {project.description}
                                </CardDescription>

                                <div className="space-y-2">
                                    <div className="flex justify-between text-sm">
                                        <span className="text-muted-foreground">Progress</span>
                                        <span className="font-medium">{project.progress}%</span>
                                    </div>
                                    <Progress value={project.progress} className="h-2" />
                                </div>

                                <div className="space-y-2 text-sm">
                                    <div className="flex items-center gap-2 text-muted-foreground">
                                        <Calendar className="h-4 w-4" />
                                        Due: {format(project.dueDate, "MMM dd, yyyy")}
                                    </div>

                                    <div className="flex items-center gap-2 text-muted-foreground">
                                        <Users className="h-4 w-4" />
                                        {project.team.slice(0, 2).join(", ")}
                                        {project.team.length > 2 && ` +${project.team.length - 2} more`}
                                    </div>
                                </div>

                                <div className="flex gap-2 pt-2">
                                    <Button variant="outline" size="sm" className="flex-1">
                                        <Eye className="h-4 w-4 mr-1" />
                                        View
                                    </Button>
                                    <Button variant="outline" size="sm" className="flex-1">
                                        <Edit className="h-4 w-4 mr-1" />
                                        Edit
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>

                {filteredProjects.length === 0 && (
                    <Card className="bg-card/50 border-border/50 backdrop-blur-sm">
                        <CardContent className="flex flex-col items-center justify-center py-16">
                            <div className="text-center space-y-4">
                                <div className="text-6xl opacity-20">📋</div>
                                <h3 className="text-xl font-semibold">No projects found</h3>
                                <p className="text-muted-foreground max-w-md">
                                    No projects match your current filters. Try adjusting your search criteria or create a new project.
                                </p>
                                <Button className="shadow-md hover:opacity-90">
                                    <Plus className="h-4 w-4 mr-2" />
                                    Create New Project
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                )}
            </div>
        </div>
    );
}
