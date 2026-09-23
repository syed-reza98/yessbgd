import { auth } from "@/lib/auth";
import { db } from "@/db";
import { jobApplications } from "@/db/schema";
import { desc, eq, inArray } from "drizzle-orm";
import { NextResponse } from "next/server";
import { unlink } from "fs/promises";
import { join } from "path";

export async function GET() {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const list = await db
      .select()
      .from(jobApplications)
      .orderBy(desc(jobApplications.createdAt));

    return NextResponse.json(
      list.map((item) => ({
        id: item.id,
        job_slug: item.jobSlug,
        job_title: item.jobTitle,
        full_name: item.fullName,
        email: item.email,
        phone: item.phone,
        linkedin: item.linkedin,
        cover_letter: item.coverLetter,
        resume_path: item.resumePath,
        resume_name: item.resumeName,
        resume_size: item.resumeSize,
        resume_type: item.resumeType,
        status: item.status,
        status_note: item.statusNote,
        created_at: item.createdAt?.toISOString(),
        status_updated_at: item.statusUpdatedAt?.toISOString(),
      })),
    );
  } catch (error) {
    console.error("Fetch applications error:", error);
    return NextResponse.json({ error: "Failed to fetch applications" }, { status: 500 });
  }
}

export async function PATCH(request: Request) {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json();
  const { id, ids, status, status_note } = body;

  try {
    if (ids && Array.isArray(ids)) {
      await db
        .update(jobApplications)
        .set({ status, statusUpdatedAt: new Date() })
        .where(inArray(jobApplications.id, ids));
      return NextResponse.json({ success: true });
    }

    if (id) {
      const updateData: Record<string, unknown> = {};
      if (status !== undefined) {
        updateData.status = status;
        updateData.statusUpdatedAt = new Date();
      }
      if (status_note !== undefined) {
        updateData.statusNote = status_note || null;
      }

      await db
        .update(jobApplications)
        .set(updateData)
        .where(eq(jobApplications.id, id));

      return NextResponse.json({ success: true });
    }

    return NextResponse.json({ error: "Missing id or ids" }, { status: 400 });
  } catch (error) {
    console.error("Update applications error:", error);
    return NextResponse.json({ error: "Failed to update" }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");
  const idsParam = searchParams.get("ids");
  const ids = idsParam ? idsParam.split(",") : id ? [id] : [];

  if (ids.length === 0) {
    return NextResponse.json({ error: "No ids provided" }, { status: 400 });
  }

  try {
    // Optionally delete files from public/uploads
    const appsToDelete = await db
      .select({ resumePath: jobApplications.resumePath })
      .from(jobApplications)
      .where(inArray(jobApplications.id, ids));

    for (const app of appsToDelete) {
      if (app.resumePath && app.resumePath.startsWith("/uploads/")) {
        try {
          const filePath = join(process.cwd(), "public", app.resumePath);
          await unlink(filePath);
        } catch {
          // ignore if already deleted
        }
      }
    }

    await db.delete(jobApplications).where(inArray(jobApplications.id, ids));

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Delete application error:", error);
    return NextResponse.json({ error: "Failed to delete" }, { status: 500 });
  }
}
