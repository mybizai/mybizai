"use client";

import { useState } from "react";
import { api } from "~/utils/api";
import { Button } from "@saasfly/ui/button";
import { Input } from "@saasfly/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@saasfly/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@saasfly/ui/table";
import { useRouter } from "next/navigation";

export function Projects({ teamId }: { teamId: string }) {
  const router = useRouter();
  const [createOpen, setCreateOpen] = useState(false);
  const [projectName, setProjectName] = useState("");
  const [projectDescription, setProjectDescription] = useState("");
  const [projectStartDate, setProjectStartDate] = useState("");
  const [projectEndDate, setProjectEndDate] = useState("");

  const { data: projects, refetch } = api.projects.getProjects.useQuery({ teamId });

  const createMutation = api.projects.createProject.useMutation({
    onSuccess: () => {
      setCreateOpen(false);
      setProjectName("");
      setProjectDescription("");
      setProjectStartDate("");
      setProjectEndDate("");
      refetch();
    },
  });

  const handleCreate = () => {
    createMutation.mutate({
      name: projectName,
      description: projectDescription,
      startDate: projectStartDate,
      endDate: projectEndDate,
      teamId,
    });
  };

  const handleViewTasks = (projectId: string) => {
    router.push(`/dashboard/teams/${teamId}/projects/${projectId}/tasks`);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold tracking-tight">Projects</h2>
        <Dialog open={createOpen} onOpenChange={setCreateOpen}>
          <DialogTrigger asChild>
            <Button>Create Project</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create New Project</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Input
                    placeholder="Project Name"
                    value={projectName}
                    onChange={(e) => setProjectName(e.target.value)}
                />
                <Input
                    placeholder="Project Description"
                    value={projectDescription}
                    onChange={(e) => setProjectDescription(e.target.value)}
                />
                <Input
                    type="date"
                    placeholder="Start Date"
                    value={projectStartDate}
                    onChange={(e) => setProjectStartDate(e.target.value)}
                />
                <Input
                    type="date"
                    placeholder="End Date"
                    value={projectEndDate}
                    onChange={(e) => setProjectEndDate(e.target.value)}
                />
              </div>
              <Button onClick={handleCreate} disabled={createMutation.isPending} className="w-full">
                {createMutation.isPending ? "Creating..." : "Create Project"}
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="border rounded-md">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Description</TableHead>
              <TableHead>Start Date</TableHead>
              <TableHead>End Date</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {projects?.map((project) => (
              <TableRow key={project.id}>
                <TableCell className="font-medium">{project.name}</TableCell>
                <TableCell>{project.description}</TableCell>
                <TableCell>{new Date(project.startDate).toLocaleDateString()}</TableCell>
                <TableCell>{project.endDate ? new Date(project.endDate).toLocaleDateString() : ""}</TableCell>
                <TableCell className="text-right">
                  <Button variant="ghost" size="sm" onClick={() => handleViewTasks(project.id)}>
                    View Tasks
                  </Button>
                </TableCell>
              </TableRow>
            ))}
            {projects?.length === 0 && (
                <TableRow>
                    <TableCell colSpan={5} className="text-center py-4">
                        No projects found. Create one!
                    </TableCell>
                </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
