import { z } from "zod";
import { db } from "@saasfly/db";
import { createTRPCRouter, protectedProcedure } from "../trpc";
import { nanoid } from "nanoid";

export const projectsRouter = createTRPCRouter({
  createProject: protectedProcedure
    .input(z.object({
      name: z.string(),
      description: z.string().optional(),
      startDate: z.string(),
      endDate: z.string().optional(),
      teamId: z.string(),
    }))
    .mutation(async ({ ctx, input }) => {
      const { name, description, startDate, endDate, teamId } = input;

      const id = nanoid();
      const now = new Date();
      const newProject = {
        id,
        name,
        description,
        startDate: new Date(startDate),
        endDate: endDate ? new Date(endDate) : null,
        teamId,
        createdAt: now,
        updatedAt: now,
      };

      await db.insertInto("Project")
        .values(newProject)
        .execute();

      return newProject;
    }),

  getProjects: protectedProcedure
    .input(z.object({
      teamId: z.string(),
    }))
    .query(async ({ ctx, input }) => {
      const { teamId } = input;
      const userId = ctx.userId;

      return await db.selectFrom("Project")
        .selectAll()
        .where("teamId", "=", teamId)
        .orderBy("createdAt", "desc")
        .execute();
    }),

  getProject: protectedProcedure
    .input(z.object({
      projectId: z.string(),
    }))
    .query(async ({ ctx, input }) => {
      const { projectId } = input;

      return await db.selectFrom("Project")
        .selectAll()
        .where("id", "=", projectId)
        .executeTakeFirst();
    }),

  updateProject: protectedProcedure
    .input(z.object({
      projectId: z.string(),
      name: z.string(),
      description: z.string().optional(),
      startDate: z.string(),
      endDate: z.string().optional(),
    }))
    .mutation(async ({ ctx, input }) => {
      const { projectId, name, description, startDate, endDate } = input;

      await db.updateTable("Project")
        .set({
          name,
          description,
          startDate: new Date(startDate),
          endDate: endDate ? new Date(endDate) : null,
          updatedAt: new Date(),
        })
        .where("id", "=", projectId)
        .execute();

      return { success: true };
    }),

  deleteProject: protectedProcedure
    .input(z.object({
      projectId: z.string(),
    }))
    .mutation(async ({ ctx, input }) => {
      const { projectId } = input;

      await db.deleteFrom("Project")
        .where("id", "=", projectId)
        .execute();

      return { success: true };
    }),
});
