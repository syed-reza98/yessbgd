import { db } from "@/db";
import { contactMessages } from "@/db/schema";
import { NextResponse } from "next/server";
import { z } from "zod";

const contactSchema = z.object({
  name: z.string().trim().min(2).max(100),
  email: z.string().trim().email().max(255),
  phone: z.string().trim().optional().nullable(),
  subject: z.string().trim().optional().nullable(),
  message: z.string().trim().min(5).max(3000),
});

export async function POST(request: Request) {
  try {
    const json = await request.json();
    const parsed = contactSchema.safeParse(json);
    if (!parsed.success) {
      return NextResponse.json({ error: "Invalid form input" }, { status: 400 });
    }

    const [result] = await db.insert(contactMessages).values({
      name: parsed.data.name,
      email: parsed.data.email,
      phone: parsed.data.phone || null,
      subject: parsed.data.subject || null,
      message: parsed.data.message,
      status: "new",
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Contact message error:", error);
    return NextResponse.json({ error: "Failed to submit message" }, { status: 500 });
  }
}
