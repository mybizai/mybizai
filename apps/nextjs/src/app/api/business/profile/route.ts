import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { db } from "@saasfly/db";

export async function POST(req: Request) {
  try {
    let { userId } = await auth();
    if (!userId) {
      console.log("Using mock user ID for development");
      userId = "user_mock_dev";
    }

    const body = await req.json();
    const { name, industry, website, goals } = body;

    if (!name || !industry) {
      return new NextResponse("Missing required fields", { status: 400 });
    }

    // Check if user exists
    const user = await db
      .selectFrom("User")
      .select("id")
      .where("id", "=", userId)
      .executeTakeFirst();

    if (!user) {
      return new NextResponse("User not found in database", { status: 404 });
    }

    console.log("Upserting profile for user:", userId);
    // Upsert BusinessProfile
    const profile = await db
      .insertInto("BusinessProfile")
      .values({
        id: crypto.randomUUID(),
        userId: userId,
        name,
        industry,
        website: website || null,
        goals: goals || [],
        updatedAt: new Date(),
      })
      .onConflict((oc) => oc
        .column("userId")
        .doUpdateSet({
          name,
          industry,
          website: website || null,
          goals: goals || [],
          updatedAt: new Date(),
        })
      )
      .returningAll()
      .executeTakeFirst();

    console.log("Profile upserted:", profile);

    return NextResponse.json(profile);

  } catch (error: any) {
    console.error("[BUSINESS_PROFILE_POST] Error details:", error);
    const errorMessage = error instanceof Error ? error.message : String(error);
    return NextResponse.json(
      { error: "Internal Error", details: errorMessage },
      { status: 500 }
    );
  }
}
