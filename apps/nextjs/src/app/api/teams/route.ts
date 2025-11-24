import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { db } from "@saasfly/db";
import { nanoid } from "nanoid";

export async function GET(req: Request) {
    try {
        let userId = "user_mock_dev";
        try {
            const { userId: authUserId } = await auth();
            if (authUserId) userId = authUserId;
        } catch (e) {
            console.warn("Auth check failed, defaulting to mock user");
        }

        if (!userId) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        const { searchParams } = new URL(req.url);
        const id = searchParams.get("id");

        let query = db.selectFrom("TeamMember")
            .selectAll()
            .where("userId", "=", userId);

        if (id) {
            query = query.where("id", "=", id);
        }

        const teamMembers = await query
            .orderBy("createdAt", "desc")
            .execute();

        if (id && teamMembers.length === 0) {
            return new NextResponse("Not Found", { status: 404 });
        }

        if (id) {
            return NextResponse.json(teamMembers[0]);
        }

        return NextResponse.json(teamMembers);
    } catch (error) {
        console.error("[TEAMS_GET]", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}

export async function POST(req: Request) {
    try {
        let userId = "user_mock_dev";
        try {
            const { userId: authUserId } = await auth();
            if (authUserId) userId = authUserId;
        } catch (e) {
            console.warn("Auth check failed, defaulting to mock user");
        }

        if (!userId) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        const body = await req.json();
        const { name, role, email, type, specialty } = body;

        const newMember = await db.insertInto("TeamMember")
            .values({
                id: nanoid(),
                userId,
                name,
                role,
                email,
                type: type || "human",
                status: "active",
                specialty,
                efficiency: type === "ai" ? 99 : 85,
                tasksCompleted: 0,
                currentProjects: [],
                updatedAt: new Date(),
            })
            .returningAll()
            .executeTakeFirst();

        return NextResponse.json(newMember);
    } catch (error) {
        console.error("[TEAMS_POST]", error);
        return new NextResponse(error instanceof Error ? error.message : "Internal Error", { status: 500 });
    }
}

export async function DELETE(req: Request) {
    try {
        let userId = "user_mock_dev";
        try {
            const { userId: authUserId } = await auth();
            if (authUserId) userId = authUserId;
        } catch (e) {
            console.warn("Auth check failed, defaulting to mock user");
        }

        if (!userId) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        const { searchParams } = new URL(req.url);
        const id = searchParams.get("id");

        if (!id) {
            return new NextResponse("Missing ID", { status: 400 });
        }

        await db.deleteFrom("TeamMember")
            .where("id", "=", id)
            .where("userId", "=", userId)
            .execute();

        return new NextResponse("Deleted", { status: 200 });
    } catch (error) {
        console.error("[TEAMS_DELETE]", error);
        return new NextResponse(error instanceof Error ? error.message : "Internal Error", { status: 500 });
    }
}

export async function PATCH(req: Request) {
    try {
        let userId = "user_mock_dev";
        try {
            const { userId: authUserId } = await auth();
            if (authUserId) userId = authUserId;
        } catch (e) {
            console.warn("Auth check failed, defaulting to mock user");
        }

        if (!userId) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        const body = await req.json();
        const { id, ...updates } = body;

        if (!id) {
            return new NextResponse("Missing ID", { status: 400 });
        }

        const updatedMember = await db.updateTable("TeamMember")
            .set({
                ...updates,
                updatedAt: new Date(),
            })
            .where("id", "=", id)
            .where("userId", "=", userId)
            .returningAll()
            .executeTakeFirst();

        return NextResponse.json(updatedMember);
    } catch (error) {
        console.error("[TEAMS_PATCH]", error);
        return new NextResponse(error instanceof Error ? error.message : "Internal Error", { status: 500 });
    }
}
