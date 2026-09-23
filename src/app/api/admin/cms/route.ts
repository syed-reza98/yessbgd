import { auth } from "@/lib/auth";
import { db } from "@/db";
import { cmsVentures, cmsServices, cmsIndustries, cmsInsights } from "@/db/schema";
import { eq, asc, desc } from "drizzle-orm";
import { NextResponse } from "next/server";

const TABLE_MAP = {
  ventures: cmsVentures,
  services: cmsServices,
  industries: cmsIndustries,
  insights: cmsInsights,
} as const;

type CmsKey = keyof typeof TABLE_MAP;

export async function GET(request: Request) {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const type = searchParams.get("type") as CmsKey | null;
  const id = searchParams.get("id");

  if (!type || !TABLE_MAP[type]) {
    return NextResponse.json({ error: "Invalid CMS type" }, { status: 400 });
  }

  const table = TABLE_MAP[type];

  try {
    if (id) {
      const [item] = await db
        .select()
        .from(table as any)
        .where(eq((table as any).id, id))
        .limit(1);

      if (!item) {
        return NextResponse.json({ error: "Not found" }, { status: 404 });
      }
      return NextResponse.json(item);
    }

    const items = await db
      .select()
      .from(table as any)
      .orderBy(
        "sortOrder" in table
          ? asc((table as any).sortOrder)
          : desc((table as any).createdAt)
      );

    // Normalize keys for frontend expectations (snake_case)
    const normalized = items.map((it: any) => ({
      ...it,
      is_published: it.isPublished,
      sort_order: it.sortOrder,
      image_path: it.imagePath,
      cover_image: it.coverImage,
      body_md: it.bodyMd,
      published_at: it.publishedAt?.toISOString?.() || it.publishedAt,
      created_at: it.createdAt?.toISOString?.() || it.createdAt,
      updated_at: it.updatedAt?.toISOString?.() || it.updatedAt,
    }));

    return NextResponse.json(normalized);
  } catch (error) {
    console.error("CMS API error:", error);
    return NextResponse.json({ error: "Failed to fetch CMS data" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const type = searchParams.get("type") as CmsKey | null;

  if (!type || !TABLE_MAP[type]) {
    return NextResponse.json({ error: "Invalid CMS type" }, { status: 400 });
  }

  const table = TABLE_MAP[type];
  const body = await request.json();

  try {
    const newId = crypto.randomUUID();
    const payload: Record<string, unknown> = {
      id: newId,
      ...body,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    // Convert snake_case to schema keys if needed
    if ("is_published" in body) payload.isPublished = body.is_published;
    if ("sort_order" in body) payload.sortOrder = Number(body.sort_order);
    if ("image_path" in body) payload.imagePath = body.image_path;
    if ("cover_image" in body) payload.coverImage = body.cover_image;
    if ("body_md" in body) payload.bodyMd = body.body_md;
    if ("published_at" in body) payload.publishedAt = body.published_at ? new Date(body.published_at) : null;

    delete payload.is_published;
    delete payload.sort_order;
    delete payload.image_path;
    delete payload.cover_image;
    delete payload.body_md;
    delete payload.published_at;

    await db.insert(table as any).values(payload);

    return NextResponse.json({ success: true, id: newId });
  } catch (error) {
    console.error("CMS create error:", error);
    return NextResponse.json({ error: "Failed to create entry" }, { status: 500 });
  }
}

export async function PATCH(request: Request) {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const type = searchParams.get("type") as CmsKey | null;
  const id = searchParams.get("id");

  if (!type || !TABLE_MAP[type] || !id) {
    return NextResponse.json({ error: "Invalid CMS type or missing id" }, { status: 400 });
  }

  const table = TABLE_MAP[type];
  const body = await request.json();

  try {
    const payload: Record<string, unknown> = {
      ...body,
      updatedAt: new Date(),
    };

    if ("is_published" in body) payload.isPublished = body.is_published;
    if ("sort_order" in body) payload.sortOrder = Number(body.sort_order);
    if ("image_path" in body) payload.imagePath = body.image_path;
    if ("cover_image" in body) payload.coverImage = body.cover_image;
    if ("body_md" in body) payload.bodyMd = body.body_md;
    if ("published_at" in body) payload.publishedAt = body.published_at ? new Date(body.published_at) : null;

    delete payload.id;
    delete payload.is_published;
    delete payload.sort_order;
    delete payload.image_path;
    delete payload.cover_image;
    delete payload.body_md;
    delete payload.published_at;

    await db
      .update(table as any)
      .set(payload)
      .where(eq((table as any).id, id));

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("CMS update error:", error);
    return NextResponse.json({ error: "Failed to update entry" }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const type = searchParams.get("type") as CmsKey | null;
  const id = searchParams.get("id");

  if (!type || !TABLE_MAP[type] || !id) {
    return NextResponse.json({ error: "Invalid CMS type or missing id" }, { status: 400 });
  }

  const table = TABLE_MAP[type];

  try {
    await db.delete(table as any).where(eq((table as any).id, id));
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("CMS delete error:", error);
    return NextResponse.json({ error: "Failed to delete entry" }, { status: 500 });
  }
}
