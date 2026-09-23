import { auth } from "@/lib/auth";
import { db } from "@/db";
import { jobApplications, contactMessages } from "@/db/schema";
import { eq, inArray } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function PATCH(request: Request) {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { type, ids, status } = await request.json();
  if (!type || !Array.isArray(ids) || ids.length === 0 || !status) {
    return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
  }

  try {
    if (type === "applications") {
      await db
        .update(jobApplications)
        .set({ status, statusUpdatedAt: new Date() })
        .where(inArray(jobApplications.id, ids));
    } else if (type === "messages") {
      await db
        .update(contactMessages)
        .set({ status, statusUpdatedAt: new Date() })
        .where(inArray(contactMessages.id, ids));
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Status update error:", error);
    return NextResponse.json({ error: "Failed to update status" }, { status: 500 });
  }
}
