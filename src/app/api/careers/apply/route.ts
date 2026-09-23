import { db } from "@/db";
import { jobApplications } from "@/db/schema";
import { NextResponse } from "next/server";
import { writeFile, mkdir } from "fs/promises";
import { join } from "path";
import { z } from "zod";

const MAX_RESUME_BYTES = 5 * 1024 * 1024;
const ALLOWED_EXTS = ["pdf", "doc", "docx"];

export async function POST(request: Request) {
  try {
    const formData = await request.formData();

    const fullName = String(formData.get("fullName") || "").trim();
    const email = String(formData.get("email") || "").trim();
    const phone = String(formData.get("phone") || "").trim();
    const location = String(formData.get("location") || "").trim();
    const linkedin = String(formData.get("linkedin") || "").trim();
    const coverLetter = String(formData.get("coverLetter") || "").trim();
    const jobSlug = String(formData.get("jobSlug") || "").trim();
    const jobTitle = String(formData.get("jobTitle") || "").trim();
    const resume = formData.get("resume") as File | null;

    if (!fullName || !email || !phone || !coverLetter || !jobSlug || !jobTitle) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    if (!resume || !(resume instanceof File)) {
      return NextResponse.json({ error: "Resume file required" }, { status: 400 });
    }

    if (resume.size > MAX_RESUME_BYTES) {
      return NextResponse.json({ error: "File exceeds 5MB size limit" }, { status: 400 });
    }

    const ext = resume.name.split(".").pop()?.toLowerCase() || "";
    if (!ALLOWED_EXTS.includes(ext)) {
      return NextResponse.json({ error: "Invalid file type. Only PDF/DOC/DOCX allowed" }, { status: 400 });
    }

    // Save resume to public/uploads/resumes
    const uploadDir = join(process.cwd(), "public", "uploads", "resumes", jobSlug);
    await mkdir(uploadDir, { recursive: true });

    const safeName = resume.name.replace(/[^a-zA-Z0-9._-]/g, "_");
    const fileName = `${Date.now()}-${crypto.randomUUID()}-${safeName}`;
    const filePath = join(uploadDir, fileName);

    const buffer = Buffer.from(await resume.arrayBuffer());
    await writeFile(filePath, buffer);

    const publicPath = `/uploads/resumes/${jobSlug}/${fileName}`;
    const newId = crypto.randomUUID();

    await db.insert(jobApplications).values({
      id: newId,
      jobSlug,
      jobTitle,
      fullName,
      email,
      phone,
      applicantLocation: location || null,
      linkedin: linkedin || null,
      coverLetter,
      resumeName: resume.name,
      resumePath: publicPath,
      resumeSize: resume.size,
      resumeType: resume.type || "application/octet-stream",
      status: "Submitted",
      statusUpdatedAt: new Date(),
    });

    return NextResponse.json({
      success: true,
      id: newId,
      createdAt: new Date().toISOString(),
      email,
    });
  } catch (error) {
    console.error("Job application error:", error);
    return NextResponse.json({ error: "Failed to submit application" }, { status: 500 });
  }
}
