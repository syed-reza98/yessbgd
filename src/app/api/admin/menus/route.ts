import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { db } from "@/db";
import { cmsMenuItems } from "@/db/schema";
import { eq, asc } from "drizzle-orm";

export async function GET(req: NextRequest) {
  try {
    const session = await auth();
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const rows = await db.select().from(cmsMenuItems).orderBy(asc(cmsMenuItems.location), asc(cmsMenuItems.sortOrder));
    return NextResponse.json(rows);
  } catch (error: any) {
    console.error("GET /api/admin/menus error:", error);
    return NextResponse.json({ error: error.message || "Failed to fetch menus" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const session = await auth();
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const id = body.id || crypto.randomUUID();

    const newRecord = {
      id,
      location: body.location || "header",
      label: body.label || "",
      labelBn: body.label_bn || body.labelBn || null,
      href: body.href || "/",
      parentId: body.parent_id || body.parentId || null,
      depth: typeof body.depth === "number" ? body.depth : 0,
      sortOrder: typeof body.sort_order === "number" ? body.sort_order : (typeof body.sortOrder === "number" ? body.sortOrder : 0),
      isPublished: body.is_published !== undefined ? Boolean(body.is_published) : (body.isPublished !== undefined ? Boolean(body.isPublished) : true),
      isExternal: Boolean(body.is_external || body.isExternal),
      visibleTo: body.visible_to || body.visibleTo || "all",
      icon: body.icon || null,
      badge: body.badge || null,
      badgeBn: body.badge_bn || body.badgeBn || null,
      accent: body.accent || null,
      itemStyle: body.item_style || body.itemStyle || "plain",
      groupLabel: body.group_label || body.groupLabel || null,
      description: body.description || null,
      descriptionBn: body.description_bn || body.descriptionBn || null,
    };

    await db.insert(cmsMenuItems).values(newRecord);
    return NextResponse.json({ success: true, item: newRecord });
  } catch (error: any) {
    console.error("POST /api/admin/menus error:", error);
    return NextResponse.json({ error: error.message || "Failed to create menu item" }, { status: 500 });
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const session = await auth();
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const { id, items, ...fields } = body;

    // Support batch update if `items` array is provided (e.g. for reordering / structure persist)
    if (Array.isArray(items)) {
      for (const item of items) {
        if (!item.id) continue;
        const patchData: any = {};
        if (item.sort_order !== undefined) patchData.sortOrder = item.sort_order;
        if (item.sortOrder !== undefined) patchData.sortOrder = item.sortOrder;
        if (item.parent_id !== undefined) patchData.parentId = item.parent_id;
        if (item.parentId !== undefined) patchData.parentId = item.parentId;
        if (item.depth !== undefined) patchData.depth = item.depth;
        if (item.is_published !== undefined) patchData.isPublished = Boolean(item.is_published);
        if (item.isPublished !== undefined) patchData.isPublished = Boolean(item.isPublished);

        if (Object.keys(patchData).length > 0) {
          await db.update(cmsMenuItems).set(patchData).where(eq(cmsMenuItems.id, item.id));
        }
      }
      return NextResponse.json({ success: true });
    }

    if (!id) {
      return NextResponse.json({ error: "Missing menu item id" }, { status: 400 });
    }

    const patchData: any = {};
    if (fields.location !== undefined) patchData.location = fields.location;
    if (fields.label !== undefined) patchData.label = fields.label;
    if (fields.label_bn !== undefined || fields.labelBn !== undefined) {
      patchData.labelBn = fields.label_bn !== undefined ? fields.label_bn : fields.labelBn;
    }
    if (fields.href !== undefined) patchData.href = fields.href;
    if (fields.parent_id !== undefined || fields.parentId !== undefined) {
      patchData.parentId = fields.parent_id !== undefined ? fields.parent_id : fields.parentId;
    }
    if (fields.depth !== undefined) patchData.depth = fields.depth;
    if (fields.sort_order !== undefined || fields.sortOrder !== undefined) {
      patchData.sortOrder = fields.sort_order !== undefined ? fields.sort_order : fields.sortOrder;
    }
    if (fields.is_published !== undefined || fields.isPublished !== undefined) {
      patchData.isPublished = Boolean(fields.is_published !== undefined ? fields.is_published : fields.isPublished);
    }
    if (fields.is_external !== undefined || fields.isExternal !== undefined) {
      patchData.isExternal = Boolean(fields.is_external !== undefined ? fields.is_external : fields.isExternal);
    }
    if (fields.visible_to !== undefined || fields.visibleTo !== undefined) {
      patchData.visibleTo = fields.visible_to !== undefined ? fields.visible_to : fields.visibleTo;
    }
    if (fields.icon !== undefined) patchData.icon = fields.icon;
    if (fields.badge !== undefined) patchData.badge = fields.badge;
    if (fields.badge_bn !== undefined || fields.badgeBn !== undefined) {
      patchData.badgeBn = fields.badge_bn !== undefined ? fields.badge_bn : fields.badgeBn;
    }
    if (fields.accent !== undefined) patchData.accent = fields.accent;
    if (fields.item_style !== undefined || fields.itemStyle !== undefined) {
      patchData.itemStyle = fields.item_style !== undefined ? fields.item_style : fields.itemStyle;
    }
    if (fields.group_label !== undefined || fields.groupLabel !== undefined) {
      patchData.groupLabel = fields.group_label !== undefined ? fields.group_label : fields.groupLabel;
    }
    if (fields.description !== undefined) patchData.description = fields.description;
    if (fields.description_bn !== undefined || fields.descriptionBn !== undefined) {
      patchData.descriptionBn = fields.description_bn !== undefined ? fields.description_bn : fields.descriptionBn;
    }

    await db.update(cmsMenuItems).set(patchData).where(eq(cmsMenuItems.id, id));
    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error("PATCH /api/admin/menus error:", error);
    return NextResponse.json({ error: error.message || "Failed to update menu item" }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const session = await auth();
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    if (!id) {
      return NextResponse.json({ error: "Missing id" }, { status: 400 });
    }

    await db.delete(cmsMenuItems).where(eq(cmsMenuItems.id, id));
    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error("DELETE /api/admin/menus error:", error);
    return NextResponse.json({ error: error.message || "Failed to delete menu item" }, { status: 500 });
  }
}
