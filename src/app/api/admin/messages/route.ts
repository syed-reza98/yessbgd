import { auth } from "@/lib/auth";
import { db } from "@/db";
import { contactMessages } from "@/db/schema";
import { desc, eq, inArray } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function GET() {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const list = await db
      .select()
      .from(contactMessages)
      .orderBy(desc(contactMessages.createdAt));

    return NextResponse.json(
      list.map((m) => ({
        id: m.id,
        name: m.name,
        email: m.email,
        phone: m.phone,
        subject: m.subject,
        message: m.message,
        status: m.status,
        status_note: m.statusNote,
        created_at: m.createdAt?.toISOString(),
        status_updated_at: m.statusUpdatedAt?.toISOString(),
      })),
    );
  } catch (error) {
    console.error("Fetch contact messages error:", error);
    return NextResponse.json({ error: "Failed to fetch messages" }, { status: 500 });
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
        .update(contactMessages)
        .set({ status, statusUpdatedAt: new Date() })
        .where(inArray(contactMessages.id, ids));
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
        .update(contactMessages)
        .set(updateData)
        .where(eq(contactMessages.id, id));

      return NextResponse.json({ success: true });
    }

    return NextResponse.json({ error: "Missing id or ids" }, { status: 400 });
  } catch (error) {
    console.error("Update message error:", error);
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
    await db.delete(contactMessages).where(inArray(contactMessages.id, ids));
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Delete message error:", error);
    return NextResponse.json({ error: "Failed to delete" }, { status: 500 });
  }
}
