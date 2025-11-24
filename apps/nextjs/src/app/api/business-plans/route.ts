import { db } from "@saasfly/db";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function GET() {
    let { userId } = await auth();

    if (!userId) {
        return new NextResponse("Unauthorized", { status: 401 });
    }

    try {
        const plan = await db
            .selectFrom("BusinessPlan")
            .selectAll()
            .where("userId", "=", userId)
            .orderBy("updatedAt", "desc")
            .executeTakeFirst();

        return NextResponse.json(plan || null);
    } catch (error) {
        console.error("[BUSINESS_PLANS_GET]", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}

export async function POST(req: Request) {
    let { userId } = await auth();

    if (!userId) {
        return new NextResponse("Unauthorized", { status: 401 });
    }

    try {
        const json = await req.json();
        const { title, content } = json;

        const plan = await db
            .insertInto("BusinessPlan")
            .values({
                id: crypto.randomUUID(),
                userId,
                title: title || "Untitled Plan",
                content: content || {},
                updatedAt: new Date(),
            })
            .returningAll()
            .executeTakeFirst();

        return NextResponse.json(plan);
    } catch (error) {
        console.error("[BUSINESS_PLANS_POST]", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}
