import { auth } from "@/lib/auth";
import { db } from "@/db";
import { cmsSettings } from "@/db/schema";
import { asc, eq, inArray } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const key = searchParams.get("key");
  const keys = searchParams.get("keys");

  try {
    if (key) {
      const [item] = await db
        .select()
        .from(cmsSettings)
        .where(eq(cmsSettings.key, key))
        .limit(1);
      return NextResponse.json(item || null);
    }

    if (keys) {
      const keyList = keys.split(",");
      const items = await db
        .select()
        .from(cmsSettings)
        .where(inArray(cmsSettings.key, keyList));
      return NextResponse.json(items);
    }

    const items = await db
      .select()
      .from(cmsSettings)
      .orderBy(asc(cmsSettings.sortOrder));

    return NextResponse.json(
      items.map((it) => ({
        id: it.id,
        key: it.key,
        label: it.label,
        group: it.group,
        value: it.value,
        sort_order: it.sortOrder,
      }))
    );
  } catch (error) {
    console.error("Settings GET error:", error);
    return NextResponse.json({ error: "Failed to fetch cmsSettings" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json();
  const { key, label, group, value, sort_order } = body;

  if (!key) {
    return NextResponse.json({ error: "Key required" }, { status: 400 });
  }

  try {
    const newId = crypto.randomUUID();
    await db.insert(cmsSettings).values({
      id: newId,
      key,
      label: label || key,
      group: group || "custom",
      value: value ?? {},
      sortOrder: sort_order ?? 0,
    });

    return NextResponse.json({ success: true, id: newId });
  } catch (error) {
    console.error("Settings POST error:", error);
    return NextResponse.json({ error: "Failed to create setting" }, { status: 500 });
  }
}

export async function PATCH(request: Request) {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json();

  try {
    if (Array.isArray(body)) {
      // Bulk update
      for (const item of body) {
        if (item.id) {
          const updateData: Record<string, unknown> = { updatedAt: new Date() };
          if (item.value !== undefined) updateData.value = item.value;
          if (item.label !== undefined) updateData.label = item.label;
          if (item.sort_order !== undefined) updateData.sortOrder = item.sort_order;

          await db
            .update(cmsSettings)
            .set(updateData)
            .where(eq(cmsSettings.id, item.id));
        } else if (item.key) {
          // Upsert by key
          const [existing] = await db
            .select()
            .from(cmsSettings)
            .where(eq(cmsSettings.key, item.key))
            .limit(1);

          if (existing) {
            await db
              .update(cmsSettings)
              .set({ value: item.value, updatedAt: new Date() })
              .where(eq(cmsSettings.id, existing.id));
          } else {
            await db.insert(cmsSettings).values({
              id: crypto.randomUUID(),
              key: item.key,
              label: item.label || item.key,
              group: item.group || "branding",
              value: item.value,
              sortOrder: item.sort_order ?? 0,
            });
          }
        }
      }
      return NextResponse.json({ success: true });
    }

    const { id, key, value, label, group, sort_order } = body;
    if (id) {
      const updateData: Record<string, unknown> = { updatedAt: new Date() };
      if (value !== undefined) updateData.value = value;
      if (label !== undefined) updateData.label = label;
      if (group !== undefined) updateData.group = group;
      if (sort_order !== undefined) updateData.sortOrder = sort_order;

      await db.update(cmsSettings).set(updateData).where(eq(cmsSettings.id, id));
      return NextResponse.json({ success: true });
    }

    if (key) {
      const [existing] = await db
        .select()
        .from(cmsSettings)
        .where(eq(cmsSettings.key, key))
        .limit(1);

      if (existing) {
        await db
          .update(cmsSettings)
          .set({ value, updatedAt: new Date() })
          .where(eq(cmsSettings.id, existing.id));
      } else {
        await db.insert(cmsSettings).values({
          id: crypto.randomUUID(),
          key,
          label: label || key,
          group: group || "general",
          value,
          sortOrder: sort_order ?? 0,
        });
      }
      return NextResponse.json({ success: true });
    }

    return NextResponse.json({ error: "Missing id or key" }, { status: 400 });
  } catch (error) {
    console.error("Settings PATCH error:", error);
    return NextResponse.json({ error: "Failed to update setting" }, { status: 500 });
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
    await db.delete(cmsSettings).where(eq(cmsSettings.id, id));
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Settings DELETE error:", error);
    return NextResponse.json({ error: "Failed to delete setting" }, { status: 500 });
  }
}
