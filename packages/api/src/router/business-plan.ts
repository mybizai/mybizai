import { z } from "zod";
import { db } from "@saasfly/db";
import { createTRPCRouter, protectedProcedure } from "../trpc";
import { TRPCError } from "@trpc/server";

export const businessPlanRouter = createTRPCRouter({
  list: protectedProcedure.query(async ({ ctx }) => {
    return await db
      .selectFrom("BusinessPlan")
      .selectAll()
      .where("userId", "=", ctx.userId)
      .orderBy("createdAt", "desc")
      .execute();
  }),

  byId: protectedProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input }) => {
      const plan = await db
        .selectFrom("BusinessPlan")
        .selectAll()
        .where("id", "=", input.id)
        .where("userId", "=", ctx.userId)
        .executeTakeFirst();

      if (!plan) {
        throw new TRPCError({ code: "NOT_FOUND" });
      }

      return plan;
    }),

  create: protectedProcedure
    .input(
      z.object({
        title: z.string().min(1),
        content: z.any().optional(), // Content is JSON
      })
    )
    .mutation(async ({ ctx, input }) => {
      // Generate a simplified ID since we don't have cuid() helper here easily,
      // or rely on crypto.
      const id = crypto.randomUUID();

      return await db
        .insertInto("BusinessPlan")
        .values({
          id: id,
          userId: ctx.userId,
          title: input.title,
          content: input.content ?? {},
          // status has default "DRAFT"
          updatedAt: new Date(),
        })
        .returningAll()
        .executeTakeFirst();
    }),

  update: protectedProcedure
    .input(
      z.object({
        id: z.string(),
        title: z.string().optional(),
        content: z.any().optional(),
        status: z.string().optional(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const result = await db
        .updateTable("BusinessPlan")
        .set({
            ...(input.title ? { title: input.title } : {}),
            ...(input.content ? { content: input.content } : {}),
            ...(input.status ? { status: input.status } : {}),
            updatedAt: new Date()
        })
        .where("id", "=", input.id)
        .where("userId", "=", ctx.userId)
        .returningAll()
        .executeTakeFirst();

      if (!result) {
         throw new TRPCError({ code: "NOT_FOUND" });
      }
      return result;
    }),

  delete: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      await db
        .deleteFrom("BusinessPlan")
        .where("id", "=", input.id)
        .where("userId", "=", ctx.userId)
        .execute();
    }),
});
