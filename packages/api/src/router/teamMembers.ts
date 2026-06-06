import { z } from "zod";
import { db } from "@saasfly/db";
import { createTRPCRouter, protectedProcedure } from "../trpc";
import { nanoid } from "nanoid";

export const teamMembersRouter = createTRPCRouter({
  inviteMember: protectedProcedure
    .input(z.object({
      email: z.string().email(),
      role: z.string(),
      name: z.string().optional(),
    }))
    .mutation(async ({ ctx, input }) => {
       const { email, role, name } = input;
       const userId = ctx.userId;

       const id = nanoid();
       const now = new Date();
       const newMember = {
            id,
            userId,
            name: name || email.split('@')[0] || "Member",
            email,
            role,
            type: "human",
            status: "active",
            efficiency: 85,
            tasksCompleted: 0,
            currentProjects: [] as string[],
            createdAt: now,
            updatedAt: now,
       };

       await db.insertInto("TeamMember")
        .values(newMember)
        .execute();

        return newMember;
    }),

  getMembers: protectedProcedure
    .input(z.object({
        teamId: z.string()
    }))
    .query(async ({ ctx, input }) => {
        const { teamId } = input;
        const userId = ctx.userId;

        return await db.selectFrom("TeamMember")
            .selectAll()
            .innerJoin("TeamMemberOnTeam", "TeamMember.id", "TeamMemberOnTeam.teamMemberId")
            .where("TeamMemberOnTeam.teamId", "=", teamId)
            .where("TeamMember.userId", "=", userId)
            .orderBy("TeamMember.createdAt", "desc")
            .execute();
    }),

  sendMessage: protectedProcedure
    .input(z.object({
        content: z.string(),
        teamId: z.string()
    }))
    .mutation(async ({ ctx, input }) => {
        const { content, teamId } = input;
        const userId = ctx.userId;

        const member = await db.selectFrom("TeamMember")
            .select("id")
            .where("id", "=", teamId)
            .where("userId", "=", userId)
            .executeTakeFirst();

        if (!member) {
            throw new Error("Member not found");
        }

        await db.insertInto("ChatMessage")
            .values({
                id: nanoid(),
                role: "user",
                content,
                agentId: teamId,
                userId,
                createdAt: new Date(),
            })
            .execute();

        return { success: true };
    }),

  getMessages: protectedProcedure
    .input(z.object({
        teamId: z.string()
    }))
    .query(async ({ ctx, input }) => {
        const { teamId } = input;
        const userId = ctx.userId;

        return await db.selectFrom("ChatMessage")
            .selectAll()
            .where("agentId", "=", teamId)
            .where("userId", "=", userId)
            .orderBy("createdAt", "asc")
            .execute();
    })
});
