import { auth } from "@/lib/auth";
import { db } from "@/db";
import { userRoles, profiles } from "@/db/schema";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function GET() {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ role: "user", userId: null, email: null });
  }

  const [roleRow] = await db
    .select()
    .from(userRoles)
    .where(eq(userRoles.userId, session.user.id))
    .limit(1);

  const role = roleRow?.role || "user";

  return NextResponse.json({
    role,
    userId: session.user.id,
    email: session.user.email || null,
  });
}
