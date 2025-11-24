"use client";

import { useState, useEffect } from "react";
import { Button } from "@saasfly/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@saasfly/ui/card";
import { Badge } from "@saasfly/ui/badge";
import { Input } from "@saasfly/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@saasfly/ui/select";
import { Avatar, AvatarFallback, AvatarImage } from "@saasfly/ui/avatar";
import { Progress } from "@saasfly/ui/progress";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@saasfly/ui/dialog";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@saasfly/ui/alert-dialog";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@saasfly/ui/dropdown-menu";
import { Label } from "@saasfly/ui/label";
import {
    Search,
    Filter,
    Plus,
    Users,
    Bot,
    Crown,
    Shield,
    User,
    Mail,
    Calendar,
    Activity,
    MoreHorizontal,
    Edit,
    Settings,
    MessageSquare,
    Trash2
} from "lucide-react";
import { toast } from "@saasfly/ui/use-toast";

interface TeamMember {
    id: string;
    name: string;
    role: string;
    email: string;
    avatar?: string | null;
    status: string;
    type: string;
    specialty?: string | null;
    efficiency: number;
    tasksCompleted: number;
    currentProjects: string[];
    createdAt: string;
}

export default function TeamsPage() {
    const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState("");
    const [typeFilter, setTypeFilter] = useState("all");
    const [statusFilter, setStatusFilter] = useState("all");

    // Dialog State
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [editingMember, setEditingMember] = useState<TeamMember | null>(null);
    const [agentName, setAgentName] = useState("");
    const [agentRole, setAgentRole] = useState("");
    const [agentSpecialty, setAgentSpecialty] = useState("");
    const [submitting, setSubmitting] = useState(false);

    // Delete State
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
    const [memberToDelete, setMemberToDelete] = useState<TeamMember | null>(null);

    useEffect(() => {
        fetchTeamMembers();
    }, []);

    const fetchTeamMembers = async () => {
        try {
            const res = await fetch("/api/teams");
            if (res.ok) {
                const data = await res.json();
                setTeamMembers(data);
            }
        } catch (error) {
            console.error("Failed to fetch team members", error);
        } finally {
            setLoading(false);
        }
    };

    const openHireDialog = () => {
        setEditingMember(null);
        setAgentName("");
        setAgentRole("");
        setAgentSpecialty("");
        setIsDialogOpen(true);
    };

    const openEditDialog = (member: TeamMember) => {
        setEditingMember(member);
        setAgentName(member.name);
        setAgentRole(member.role);
        setAgentSpecialty(member.specialty || "");
        setIsDialogOpen(true);
    };

    const handleSaveAgent = async () => {
        if (!agentName || !agentRole) return;

        setSubmitting(true);
        try {
            const payload = {
                name: agentName,
                role: agentRole,
                specialty: agentSpecialty || "General Task Execution",
                type: "ai", // Default to AI for now as per requirement
            };

            let res;
            if (editingMember) {
                // Update existing
                res = await fetch("/api/teams", {
                    method: "PATCH",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ ...payload, id: editingMember.id })
                });
            } else {
                // Create new
                res = await fetch("/api/teams", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        ...payload,
                        email: `agent-${Date.now()}@ai.mybizai.com`,
                    })
                });
            }

            if (res.ok) {
                await fetchTeamMembers();
                setIsDialogOpen(false);
                toast({
                    title: editingMember ? "Agent Updated" : "Agent Hired",
                    description: `${agentName} has been ${editingMember ? "updated" : "added to the team"}.`,
                });
            }
        } catch (error) {
            console.error("Failed to save agent", error);
            toast({
                title: "Error",
                description: "Failed to save agent details.",
                variant: "destructive",
            });
        } finally {
            setSubmitting(false);
        }
    };

    const confirmDelete = (member: TeamMember) => {
        setMemberToDelete(member);
        setIsDeleteDialogOpen(true);
    };

    const handleDelete = async () => {
        if (!memberToDelete) return;

        try {
            const res = await fetch(`/api/teams?id=${memberToDelete.id}`, {
                method: "DELETE"
            });

            if (res.ok) {
                await fetchTeamMembers();
                toast({
                    title: "Team Member Removed",
                    description: `${memberToDelete.name} has been removed from the team.`,
                });
            }
        } catch (error) {
            console.error("Failed to delete member", error);
            toast({
                title: "Error",
                description: "Failed to delete team member.",
                variant: "destructive",
            });
        } finally {
            setIsDeleteDialogOpen(false);
            setMemberToDelete(null);
        }
    };

    const filteredMembers = teamMembers.filter(member => {
        const matchesSearch = member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            member.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
            member.email.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesType = typeFilter === "all" || member.type === typeFilter;
        const matchesStatus = statusFilter === "all" || member.status === statusFilter;

        return matchesSearch && matchesType && matchesStatus;
    });

    const getStatusIcon = (status: string) => {
        switch (status) {
            case "active": return "🟢";
            case "away": return "🟡";
            case "busy": return "🔴";
            case "offline": return "⚫";
            default: return "⚫";
        }
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case "active": return "bg-green-500/10 text-green-500 border-green-500/20";
            case "away": return "bg-yellow-500/10 text-yellow-500 border-yellow-500/20";
            case "busy": return "bg-red-500/10 text-red-500 border-red-500/20";
            case "offline": return "bg-muted/10 text-muted-foreground border-muted/20";
            default: return "bg-muted/10 text-muted-foreground border-muted/20";
        }
    };

    const getRoleIcon = (role: string, type: string) => {
        if (type === "ai") return <Bot className="h-4 w-4" />;
        if (role.toLowerCase().includes("manager")) return <Crown className="h-4 w-4" />;
        if (role.toLowerCase().includes("senior")) return <Shield className="h-4 w-4" />;
        return <User className="h-4 w-4" />;
    };

    return (
        <div className="flex-1 bg-gradient-to-br from-background via-background/50 to-background/20">
            <div className="container mx-auto px-6 py-8">
                {/* Header */}
                <div className="flex items-center justify-between mb-8">
                    <div>
                        <h1 className="text-3xl font-bold mb-2">Team Management</h1>
                        <p className="text-muted-foreground">
                            Manage your human team members and AI agents across all projects
                        </p>
                    </div>

                    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                        <DialogTrigger asChild>
                            <Button
                                onClick={openHireDialog}
                                className="shadow-md transition-all duration-300 hover:shadow-lg"
                            >
                                <Plus className="h-4 w-4 mr-2" />
                                Hire AI Agent
                            </Button>
                        </DialogTrigger>
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle>{editingMember ? "Edit Team Member" : "Hire New AI Agent"}</DialogTitle>
                                <DialogDescription>
                                    {editingMember ? "Update the details of your team member." : "Configure your new AI agent's role and capabilities."}
                                </DialogDescription>
                            </DialogHeader>
                            <div className="grid gap-4 py-4">
                                <div className="grid grid-cols-4 items-center gap-4">
                                    <Label htmlFor="name" className="text-right">
                                        Name
                                    </Label>
                                    <Input
                                        id="name"
                                        value={agentName}
                                        onChange={(e) => setAgentName(e.target.value)}
                                        className="col-span-3"
                                        placeholder="e.g. Research Assistant"
                                    />
                                </div>
                                <div className="grid grid-cols-4 items-center gap-4">
                                    <Label htmlFor="role" className="text-right">
                                        Role
                                    </Label>
                                    <Input
                                        id="role"
                                        value={agentRole}
                                        onChange={(e) => setAgentRole(e.target.value)}
                                        className="col-span-3"
                                        placeholder="e.g. Market Analyst"
                                    />
                                </div>
                                <div className="grid grid-cols-4 items-center gap-4">
                                    <Label htmlFor="specialty" className="text-right">
                                        Specialty
                                    </Label>
                                    <Input
                                        id="specialty"
                                        value={agentSpecialty}
                                        onChange={(e) => setAgentSpecialty(e.target.value)}
                                        className="col-span-3"
                                        placeholder="e.g. Data Analysis"
                                    />
                                </div>
                            </div>
                            <DialogFooter>
                                <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                                    Cancel
                                </Button>
                                <Button onClick={handleSaveAgent} disabled={submitting || !agentName || !agentRole}>
                                    {submitting ? "Saving..." : (editingMember ? "Save Changes" : "Hire Agent")}
                                </Button>
                            </DialogFooter>
                        </DialogContent>
                    </Dialog>

                    <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
                        <AlertDialogContent>
                            <AlertDialogHeader>
                                <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                                <AlertDialogDescription>
                                    This action cannot be undone. This will permanently remove {memberToDelete?.name} from your team.
                                </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                <AlertDialogAction onClick={handleDelete} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
                                    Delete
                                </AlertDialogAction>
                            </AlertDialogFooter>
                        </AlertDialogContent>
                    </AlertDialog>
                </div>

                {/* Filters */}
                <Card className="mb-8 bg-card/50 border-border/50 backdrop-blur-sm">
                    <CardContent className="p-6">
                        <div className="flex flex-col md:flex-row gap-4">
                            <div className="relative flex-1">
                                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                                <Input
                                    placeholder="Search team members..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="pl-10 bg-background/50"
                                />
                            </div>

                            <Select value={typeFilter} onValueChange={setTypeFilter}>
                                <SelectTrigger className="w-48 bg-background/50">
                                    <Filter className="h-4 w-4 mr-2" />
                                    <SelectValue placeholder="Filter by type" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all">All Types</SelectItem>
                                    <SelectItem value="human">Human</SelectItem>
                                    <SelectItem value="ai">AI Agent</SelectItem>
                                </SelectContent>
                            </Select>

                            <Select value={statusFilter} onValueChange={setStatusFilter}>
                                <SelectTrigger className="w-48 bg-background/50">
                                    <SelectValue placeholder="Filter by status" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all">All Status</SelectItem>
                                    <SelectItem value="active">Active</SelectItem>
                                    <SelectItem value="away">Away</SelectItem>
                                    <SelectItem value="busy">Busy</SelectItem>
                                    <SelectItem value="offline">Offline</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </CardContent>
                </Card>

                {/* Team Members Grid */}
                {loading && teamMembers.length === 0 ? (
                    <div className="flex justify-center py-12">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filteredMembers.map((member) => (
                            <Card
                                key={member.id}
                                className="hover:shadow-lg transition-all duration-300 hover:-translate-y-1 cursor-pointer group"
                            >
                                <CardHeader className="pb-3">
                                    <div className="flex items-start justify-between">
                                        <div className="flex items-center gap-3">
                                            <div className="relative">
                                                <Avatar className="h-12 w-12">
                                                    <AvatarImage src={member.avatar || undefined} />
                                                    <AvatarFallback className="bg-primary/10 text-primary">
                                                        {member.type === "ai" ? (
                                                            <Bot className="h-6 w-6" />
                                                        ) : (
                                                            member.name.split(" ").map(n => n[0]).join("")
                                                        )}
                                                    </AvatarFallback>
                                                </Avatar>
                                                <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-background rounded-full flex items-center justify-center text-xs">
                                                    {getStatusIcon(member.status)}
                                                </div>
                                            </div>
                                            <div>
                                                <h3 className="font-semibold">{member.name}</h3>
                                                <div className="flex items-center gap-1 text-sm text-muted-foreground">
                                                    {getRoleIcon(member.role, member.type)}
                                                    <span>{member.role}</span>
                                                </div>
                                            </div>
                                        </div>

                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <Button variant="ghost" size="icon" className="h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity">
                                                    <MoreHorizontal className="h-4 w-4" />
                                                </Button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent align="end">
                                                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                                <DropdownMenuItem onClick={() => openEditDialog(member)}>
                                                    <Edit className="mr-2 h-4 w-4" /> Edit
                                                </DropdownMenuItem>
                                                <DropdownMenuSeparator />
                                                <DropdownMenuItem
                                                    className="text-destructive focus:text-destructive"
                                                    onClick={() => confirmDelete(member)}
                                                >
                                                    <Trash2 className="mr-2 h-4 w-4" /> Delete
                                                </DropdownMenuItem>
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    </div>
                                </CardHeader>

                                <CardContent className="space-y-4">
                                    <div className="flex items-center gap-2">
                                        <Badge className={getStatusColor(member.status)}>
                                            {member.status}
                                        </Badge>
                                        <Badge variant="outline" className={member.type === "ai" ? "bg-primary/10 text-primary border-primary/20" : ""}>
                                            {member.type === "ai" ? "AI Agent" : "Human"}
                                        </Badge>
                                    </div>

                                    {member.specialty && (
                                        <p className="text-sm text-muted-foreground">
                                            <strong>Specialty:</strong> {member.specialty}
                                        </p>
                                    )}

                                    <div className="space-y-2">
                                        <div className="flex justify-between text-sm">
                                            <span className="text-muted-foreground">Efficiency</span>
                                            <span className="font-medium">{member.efficiency}%</span>
                                        </div>
                                        <Progress value={member.efficiency} className="h-2" />
                                    </div>

                                    <div className="grid grid-cols-2 gap-4 text-sm">
                                        <div>
                                            <p className="text-muted-foreground">Tasks Done</p>
                                            <p className="font-semibold">{member.tasksCompleted}</p>
                                        </div>
                                        <div>
                                            <p className="text-muted-foreground">Projects</p>
                                            <p className="font-semibold">{member.currentProjects?.length || 0}</p>
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <p className="text-sm text-muted-foreground">Current Projects:</p>
                                        <div className="flex flex-wrap gap-1">
                                            {member.currentProjects?.slice(0, 2).map((project) => (
                                                <Badge key={project} variant="secondary" className="text-xs">
                                                    {project}
                                                </Badge>
                                            ))}
                                            {(member.currentProjects?.length || 0) > 2 && (
                                                <Badge variant="secondary" className="text-xs">
                                                    +{(member.currentProjects?.length || 0) - 2} more
                                                </Badge>
                                            )}
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                                        <Mail className="h-3 w-3" />
                                        <span className="truncate">{member.email}</span>
                                    </div>

                                    <div className="flex gap-2 pt-2">
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            className="flex-1"
                                            onClick={() => openEditDialog(member)}
                                        >
                                            <Edit className="h-4 w-4 mr-1" />
                                            Edit
                                        </Button>
                                        {member.type === "ai" ? (
                                            <Button
                                                variant="default"
                                                size="sm"
                                                className="flex-1 bg-primary/10 text-primary hover:bg-primary/20 border-primary/20"
                                                onClick={() => window.location.href = `/dashboard/ai-agent?id=${member.id}`}
                                            >
                                                <MessageSquare className="h-4 w-4 mr-1" />
                                                Chat
                                            </Button>
                                        ) : (
                                            <Button
                                                variant="outline"
                                                size="sm"
                                                className="flex-1"
                                                onClick={() => openEditDialog(member)}
                                            >
                                                <Settings className="h-4 w-4 mr-1" />
                                                Manage
                                            </Button>
                                        )}
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                )}

                {!loading && filteredMembers.length === 0 && (
                    <Card className="bg-card/50 border-border/50 backdrop-blur-sm">
                        <CardContent className="flex flex-col items-center justify-center py-16">
                            <div className="text-center space-y-4">
                                <div className="text-6xl opacity-20">👥</div>
                                <h3 className="text-xl font-semibold">No team members found</h3>
                                <p className="text-muted-foreground max-w-md">
                                    No team members match your current filters. Try adjusting your search criteria or add new team members.
                                </p>
                                <Button
                                    onClick={openHireDialog}
                                    className="shadow-md hover:opacity-90"
                                >
                                    <Plus className="h-4 w-4 mr-2" />
                                    Hire AI Agent
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                )}
            </div>
        </div>
    );
}
