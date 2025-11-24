import { db } from "@saasfly/db";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function PUT(
    req: Request,
    { params }: { params: { id: string } }
) {
    let { userId } = await auth();

    if (!userId) {
        return new NextResponse("Unauthorized", { status: 401 });
    }

    try {
        const json = await req.json();
        const { content, title } = json;

        // Verify ownership
        const existingPlan = await db
            .selectFrom("BusinessPlan")
            .select("id")
            .where("id", "=", params.id)
            .where("userId", "=", userId)
            .executeTakeFirst();

        if (!existingPlan) {
            return new NextResponse("Not Found or Unauthorized", { status: 404 });
        }

        const updatedPlan = await db
            .updateTable("BusinessPlan")
            .set({
                content: content,
                title: title,
                updatedAt: new Date(),
            })
            .where("id", "=", params.id)
            .returningAll()
            .executeTakeFirst();

        return NextResponse.json(updatedPlan);
    } catch (error) {
        console.error("[BUSINESS_PLAN_UPDATE]", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}
