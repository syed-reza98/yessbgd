import { db } from "@/db";
import { jobApplications } from "@/db/schema";
import { eq, and, sql } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { ref, email } = await request.json();

    if (!ref || !email) {
      return NextResponse.json({ error: "Reference ID and email are required" }, { status: 400 });
    }

    const cleanEmail = String(email).trim().toLowerCase();
    const cleanRef = String(ref).trim().toLowerCase();

    // Match either full UUID or 8-character prefix
    const rows = await db
      .select({
        id: jobApplications.id,
        jobTitle: jobApplications.jobTitle,
        fullName: jobApplications.fullName,
        email: jobApplications.email,
        status: jobApplications.status,
        statusNote: jobApplications.statusNote,
        statusUpdatedAt: jobApplications.statusUpdatedAt,
        createdAt: jobApplications.createdAt,
      })
      .from(jobApplications)
      .where(
        and(
          eq(sql`LOWER(${jobApplications.email})`, cleanEmail),
          sql`(LOWER(${jobApplications.id}) = ${cleanRef} OR LOWER(SUBSTRING(${jobApplications.id}, 1, 8)) = ${cleanRef})`,
        ),
      )
      .limit(1);

    if (!rows.length) {
      return NextResponse.json({ row: null });
    }

    return NextResponse.json({ row: rows[0] });
  } catch (error) {
    console.error("Lookup application error:", error);
    return NextResponse.json({ error: "Server error during lookup" }, { status: 500 });
  }
}
