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

export function Teams() {
  const router = useRouter();
  const [createOpen, setCreateOpen] = useState(false);
  const [teamName, setTeamName] = useState("");

  const { data: teams, refetch } = api.teams.getTeams.useQuery();

  const createMutation = api.teams.createTeam.useMutation({
    onSuccess: () => {
      setCreateOpen(false);
      setTeamName("");
      refetch();
    },
  });

  const handleCreate = () => {
    createMutation.mutate({ name: teamName });
  };

  const handleViewProjects = (teamId: string) => {
    router.push(`/dashboard/teams/${teamId}/projects`);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold tracking-tight">Teams</h2>
        <Dialog open={createOpen} onOpenChange={setCreateOpen}>
          <DialogTrigger asChild>
            <Button>Create Team</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create New Team</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Input
                    placeholder="Team Name"
                    value={teamName}
                    onChange={(e) => setTeamName(e.target.value)}
                />
              </div>
              <Button onClick={handleCreate} disabled={createMutation.isPending} className="w-full">
                {createMutation.isPending ? "Creating..." : "Create Team"}
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
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {teams?.map((team) => (
              <TableRow key={team.id}>
                <TableCell className="font-medium">{team.name}</TableCell>
                <TableCell className="text-right">
                  <Button variant="ghost" size="sm" onClick={() => handleViewProjects(team.id)}>
                    View Projects
                  </Button>
                </TableCell>
              </TableRow>
            ))}
            {teams?.length === 0 && (
                <TableRow>
                    <TableCell colSpan={2} className="text-center py-4">
                        No teams found. Create one!
                    </TableCell>
                </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
