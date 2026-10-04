import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import { db } from "@/lib/db";
import { jobApplications } from "@/lib/db/schema";
import { eq, or } from "drizzle-orm";
import { resolveResumePath } from "@/lib/storage";
import fs from "fs/promises";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await auth();
  if (!session?.user) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  const { id } = await params;
  if (!id) {
    return new NextResponse("Not Found", { status: 404 });
  }

  const [application] = await db
    .select()
    .from(jobApplications)
    .where(
      or(
        eq(jobApplications.id, id),
        eq(jobApplications.referenceNumber, id)
      )
    )
    .limit(1);

  if (!application) {
    return new NextResponse("Application not found", { status: 404 });
  }

  const rawPath = application.resumePath || application.resumeUrl;
  if (!rawPath) {
    return new NextResponse("No resume attached to this application", {
      status: 404,
    });
  }

  const resolved = resolveResumePath(rawPath);
  if (!resolved) {
    return new NextResponse("Resume file could not be located", { status: 404 });
  }

  try {
    const fileBuffer = await fs.readFile(resolved);
    const contentType = application.resumeType || "application/pdf";
    const fileName = application.resumeName || "resume.pdf";

    return new Response(fileBuffer, {
      headers: {
        "Content-Type": contentType,
        "Content-Disposition": `inline; filename="${encodeURIComponent(fileName)}"`,
        "Cache-Control": "private, no-cache, no-store",
      },
    });
  } catch (err) {
    console.error("Failed to read resume file:", err);
    return new NextResponse("File read error", { status: 500 });
  }
}
