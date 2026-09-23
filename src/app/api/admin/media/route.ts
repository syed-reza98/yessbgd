import { auth } from "@/lib/auth";
import { db } from "@/db";
import { cmsMedia } from "@/db/schema";
import { desc, eq } from "drizzle-orm";
import { NextResponse } from "next/server";
import { writeFile, unlink, mkdir } from "fs/promises";
import { join } from "path";

export async function GET() {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const rows = await db
      .select()
      .from(cmsMedia)
      .orderBy(desc(cmsMedia.createdAt));

    return NextResponse.json(
      rows.map((r) => ({
        id: r.id,
        file_name: r.fileName,
        url: r.url,
        path: r.path,
        mime_type: r.mimeType,
        size_bytes: r.sizeBytes,
        alt_text: r.altText,
        folder: r.folder,
        created_at: r.createdAt?.toISOString(),
      }))
    );
  } catch (error) {
    console.error("Media GET error:", error);
    return NextResponse.json({ error: "Failed to fetch media" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const formData = await request.formData();
    const file = formData.get("file") as File | null;
    const folder = String(formData.get("folder") || "general").trim();
    const alt = String(formData.get("alt") || "").trim();

    if (!file || !(file instanceof File)) {
      return NextResponse.json({ error: "File required" }, { status: 400 });
    }

    const uploadDir = join(process.cwd(), "public", "uploads", "media", folder);
    await mkdir(uploadDir, { recursive: true });

    const safe = file.name.replace(/[^a-zA-Z0-9._-]/g, "-").toLowerCase();
    const fileName = `${Date.now()}-${safe}`;
    const filePath = join(uploadDir, fileName);

    const buffer = Buffer.from(await file.arrayBuffer());
    await writeFile(filePath, buffer);

    const publicPath = `/uploads/media/${folder}/${fileName}`;
    const newId = crypto.randomUUID();

    await db.insert(cmsMedia).values({
      id: newId,
      fileName: file.name,
      url: publicPath,
      path: publicPath,
      mimeType: file.type,
      sizeBytes: file.size,
      altText: alt || null,
      folder,
    });

    return NextResponse.json({
      success: true,
      id: newId,
      path: publicPath,
      url: publicPath,
    });
  } catch (error) {
    console.error("Media upload error:", error);
    return NextResponse.json({ error: "Failed to upload media" }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");

  if (!id) {
    return NextResponse.json({ error: "Missing id" }, { status: 400 });
  }

  try {
    const [row] = await db
      .select()
      .from(cmsMedia)
      .where(eq(cmsMedia.id, id))
      .limit(1);

    if (row?.path && row.path.startsWith("/uploads/")) {
      try {
        const filePath = join(process.cwd(), "public", row.path);
        await unlink(filePath);
      } catch {
        // ignore if not exists
      }
    }

    await db.delete(cmsMedia).where(eq(cmsMedia.id, id));
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Media delete error:", error);
    return NextResponse.json({ error: "Failed to delete media" }, { status: 500 });
  }
}
