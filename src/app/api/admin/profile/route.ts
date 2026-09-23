import { auth } from "@/lib/auth";
import { db } from "@/db";
import { profiles } from "@/db/schema";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function GET() {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const [profile] = await db
    .select()
    .from(profiles)
    .where(eq(profiles.id, session.user.id))
    .limit(1);

  if (profile) {
    return NextResponse.json({
      id: profile.id,
      full_name: profile.fullName,
      phone: profile.phone,
      job_title: profile.jobTitle,
      avatar_url: profile.avatarUrl,
      language: profile.language,
      theme: profile.theme,
      items_per_page: profile.itemsPerPage,
      notify_new_application: profile.notifyNewApplication,
      notify_new_message: profile.notifyNewMessage,
      created_at: profile.createdAt?.toISOString(),
      updated_at: profile.updatedAt?.toISOString(),
    });
  }

  // Create default profile if missing
  await db.insert(profiles).values({
    id: session.user.id,
  });

  return NextResponse.json({
    id: session.user.id,
    full_name: null,
    phone: null,
    job_title: null,
    avatar_url: null,
    language: "en",
    theme: "system",
    items_per_page: 25,
    notify_new_application: true,
    notify_new_message: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  });
}

export async function PATCH(request: Request) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json();
  const updateData: Record<string, unknown> = {
    updatedAt: new Date(),
  };

  if ("full_name" in body) updateData.fullName = body.full_name;
  if ("phone" in body) updateData.phone = body.phone;
  if ("job_title" in body) updateData.jobTitle = body.job_title;
  if ("avatar_url" in body) updateData.avatarUrl = body.avatar_url;
  if ("language" in body) updateData.language = body.language;
  if ("theme" in body) updateData.theme = body.theme;
  if ("items_per_page" in body) updateData.itemsPerPage = body.items_per_page;
  if ("notify_new_application" in body) updateData.notifyNewApplication = body.notify_new_application;
  if ("notify_new_message" in body) updateData.notifyNewMessage = body.notify_new_message;

  await db
    .update(profiles)
    .set(updateData)
    .where(eq(profiles.id, session.user.id));

  return NextResponse.json({ success: true });
}
