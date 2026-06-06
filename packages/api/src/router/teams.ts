import { z } from "zod";
import { db } from "@saasfly/db";
import { createTRPCRouter, protectedProcedure } from "../trpc";
import { nanoid } from "nanoid";

export const teamsRouter = createTRPCRouter({
  createTeam: protectedProcedure
    .input(z.object({
      name: z.string(),
    }))
    .mutation(async ({ ctx, input }) => {
      const { name } = input;
      const userId = ctx.userId;

      const id = nanoid();
      const now = new Date();
      const newTeam = {
        id,
        name,
        userId,
        createdAt: now,
        updatedAt: now,
      };

      await db.insertInto("Team")
        .values(newTeam)
        .execute();

      return newTeam;
    }),

  getTeams: protectedProcedure
    .query(async ({ ctx }) => {
      const userId = ctx.userId;

      return await db.selectFrom("Team")
        .selectAll()
        .where("userId", "=", userId)
        .orderBy("createdAt", "desc")
        .execute();
    }),

  getTeam: protectedProcedure
    .input(z.object({
      teamId: z.string(),
    }))
    .query(async ({ ctx, input }) => {
      const { teamId } = input;
      const userId = ctx.userId;

      return await db.selectFrom("Team")
        .selectAll()
        .where("id", "=", teamId)
        .where("userId", "=", userId)
        .executeTakeFirst();
    }),

  updateTeam: protectedProcedure
    .input(z.object({
      teamId: z.string(),
      name: z.string(),
    }))
    .mutation(async ({ ctx, input }) => {
      const { teamId, name } = input;
      const userId = ctx.userId;

      await db.updateTable("Team")
        .set({ name, updatedAt: new Date() })
        .where("id", "=", teamId)
        .where("userId", "=", userId)
        .execute();

      return { success: true };
    }),

  deleteTeam: protectedProcedure
    .input(z.object({
      teamId: z.string(),
    }))
    .mutation(async ({ ctx, input }) => {
      const { teamId } = input;
      const userId = ctx.userId;

      await db.deleteFrom("Team")
        .where("id", "=", teamId)
        .where("userId", "=", userId)
        .execute();

      return { success: true };
    }),
});
