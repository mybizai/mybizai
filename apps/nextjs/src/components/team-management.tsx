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
import { TeamChat } from "./team-chat";

export function TeamManagement() {
  const [inviteOpen, setInviteOpen] = useState(false);
  const [chatOpen, setChatOpen] = useState(false);
  const [selectedMember, setSelectedMember] = useState<{ id: string; name: string } | null>(null);

  const [inviteEmail, setInviteEmail] = useState("");
  const [inviteRole, setInviteRole] = useState("Member");
  const [inviteName, setInviteName] = useState("");

  const { data: members, refetch } = api.teams.getMembers.useQuery();

  const inviteMutation = api.teams.inviteMember.useMutation({
    onSuccess: () => {
      setInviteOpen(false);
      setInviteEmail("");
      setInviteName("");
      refetch();
    },
  });

  const handleInvite = () => {
    inviteMutation.mutate({ email: inviteEmail, role: inviteRole, name: inviteName });
  };

  const openChat = (member: { id: string; name: string }) => {
    setSelectedMember(member);
    setChatOpen(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold tracking-tight">Team Members</h2>
        <Dialog open={inviteOpen} onOpenChange={setInviteOpen}>
          <DialogTrigger asChild>
            <Button>Invite Member</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Invite New Member</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Input
                    placeholder="Name"
                    value={inviteName}
                    onChange={(e) => setInviteName(e.target.value)}
                />
                <Input
                  placeholder="Email"
                  value={inviteEmail}
                  onChange={(e) => setInviteEmail(e.target.value)}
                />
                <Input
                    placeholder="Role"
                    value={inviteRole}
                    onChange={(e) => setInviteRole(e.target.value)}
                />
              </div>
              <Button onClick={handleInvite} disabled={inviteMutation.isPending} className="w-full">
                {inviteMutation.isPending ? "Inviting..." : "Send Invitation"}
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
              <TableHead>Email</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Type</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {members?.map((member) => (
              <TableRow key={member.id}>
                <TableCell className="font-medium">{member.name}</TableCell>
                <TableCell>{member.email}</TableCell>
                <TableCell>{member.role}</TableCell>
                 <TableCell>{member.type}</TableCell>
                <TableCell className="text-right">
                  <Button variant="ghost" size="sm" onClick={() => openChat(member)}>
                    Chat
                  </Button>
                </TableCell>
              </TableRow>
            ))}
            {members?.length === 0 && (
                <TableRow>
                    <TableCell colSpan={5} className="text-center py-4">
                        No members found. Invite someone!
                    </TableCell>
                </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <Dialog open={chatOpen} onOpenChange={setChatOpen}>
        <DialogContent className="sm:max-w-[500px]">
           {selectedMember && (
               <TeamChat memberId={selectedMember.id} memberName={selectedMember.name} />
           )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
