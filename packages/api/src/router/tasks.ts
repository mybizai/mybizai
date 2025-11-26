import { z } from "zod";
import { db } from "@saasfly/db";
import { createTRPCRouter, protectedProcedure } from "../trpc";
import { nanoid } from "nanoid";

export const tasksRouter = createTRPCRouter({
  createTask: protectedProcedure
    .input(z.object({
      name: z.string(),
      description: z.string().optional(),
      dueDate: z.string().optional(),
      priority: z.string().optional(),
      projectId: z.string(),
      assigneeId: z.string().optional(),
    }))
    .mutation(async ({ ctx, input }) => {
      const { name, description, dueDate, priority, projectId, assigneeId } = input;

      const id = nanoid();
      const now = new Date();
      const newTask = {
        id,
        name,
        description,
        dueDate: dueDate ? new Date(dueDate) : null,
        priority: priority || "medium",
        projectId,
        assigneeId,
        createdAt: now,
        updatedAt: now,
      };

      await db.insertInto("Task")
        .values(newTask)
        .execute();

      return newTask;
    }),

  getTasks: protectedProcedure
    .input(z.object({
      projectId: z.string(),
    }))
    .query(async ({ ctx, input }) => {
      const { projectId } = input;

      return await db.selectFrom("Task")
        .selectAll()
        .where("projectId", "=", projectId)
        .orderBy("createdAt", "desc")
        .execute();
    }),

  getTask: protectedProcedure
    .input(z.object({
      taskId: z.string(),
    }))
    .query(async ({ ctx, input }) => {
      const { taskId } = input;

      return await db.selectFrom("Task")
        .selectAll()
        .where("id", "=", taskId)
        .executeTakeFirst();
    }),

  updateTask: protectedProcedure
    .input(z.object({
      taskId: z.string(),
      name: z.string(),
      description: z.string().optional(),
      dueDate: z.string().optional(),
      priority: z.string().optional(),
      status: z.string().optional(),
      assigneeId: z.string().optional(),
    }))
    .mutation(async ({ ctx, input }) => {
      const { taskId, name, description, dueDate, priority, status, assigneeId } = input;

      await db.updateTable("Task")
        .set({
          name,
          description,
          dueDate: dueDate ? new Date(dueDate) : null,
          priority,
          status,
          assigneeId,
          updatedAt: new Date(),
        })
        .where("id", "=", taskId)
        .execute();

      return { success: true };
    }),

  deleteTask: protectedProcedure
    .input(z.object({
      taskId: z.string(),
    }))
    .mutation(async ({ ctx, input }) => {
      const { taskId } = input;

      await db.deleteFrom("Task")
        .where("id", "=", taskId)
        .execute();

      return { success: true };
    }),
});
