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

export function Tasks({ projectId }: { projectId: string }) {
  const [createOpen, setCreateOpen] = useState(false);
  const [taskName, setTaskName] = useState("");
  const [taskDescription, setTaskDescription] = useState("");
  const [taskDueDate, setTaskDueDate] = useState("");
  const [taskPriority, setTaskPriority] = useState("");
  const [taskAssignee, setTaskAssignee] = useState("");

  const { data: tasks, refetch } = api.tasks.getTasks.useQuery({ projectId });

  const createMutation = api.tasks.createTask.useMutation({
    onSuccess: () => {
      setCreateOpen(false);
      setTaskName("");
      setTaskDescription("");
      setTaskDueDate("");
      setTaskPriority("");
      setTaskAssignee("");
      refetch();
    },
  });

  const handleCreate = () => {
    createMutation.mutate({
      name: taskName,
      description: taskDescription,
      dueDate: taskDueDate,
      priority: taskPriority,
      assigneeId: taskAssignee,
      projectId,
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold tracking-tight">Tasks</h2>
        <Dialog open={createOpen} onOpenChange={setCreateOpen}>
          <DialogTrigger asChild>
            <Button>Create Task</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create New Task</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Input
                    placeholder="Task Name"
                    value={taskName}
                    onChange={(e) => setTaskName(e.target.value)}
                />
                <Input
                    placeholder="Task Description"
                    value={taskDescription}
                    onChange={(e) => setTaskDescription(e.target.value)}
                />
                <Input
                    type="date"
                    placeholder="Due Date"
                    value={taskDueDate}
                    onChange={(e) => setTaskDueDate(e.target.value)}
                />
                <Input
                    placeholder="Priority"
                    value={taskPriority}
                    onChange={(e) => setTaskPriority(e.target.value)}
                />
                <Input
                    placeholder="Assignee ID"
                    value={taskAssignee}
                    onChange={(e) => setTaskAssignee(e.target.value)}
                />
              </div>
              <Button onClick={handleCreate} disabled={createMutation.isPending} className="w-full">
                {createMutation.isPending ? "Creating..." : "Create Task"}
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
              <TableHead>Due Date</TableHead>
              <TableHead>Priority</TableHead>
              <TableHead>Assignee</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {tasks?.map((task) => (
              <TableRow key={task.id}>
                <TableCell className="font-medium">{task.name}</TableCell>
                <TableCell>{task.description}</TableCell>
                <TableCell>{task.dueDate ? new Date(task.dueDate).toLocaleDateString() : ""}</TableCell>
                <TableCell>{task.priority}</TableCell>
                <TableCell>{task.assigneeId}</TableCell>
              </TableRow>
            ))}
            {tasks?.length === 0 && (
                <TableRow>
                    <TableCell colSpan={5} className="text-center py-4">
                        No tasks found. Create one!
                    </TableCell>
                </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
