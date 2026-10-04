"use server";

import { z } from "zod";
import { db } from "@/lib/db";
import { contactMessages } from "@/lib/db/schema";

const ContactSchema = z.object({
  full_name: z.string().trim().min(2, "Full name must be at least 2 characters"),
  email: z.string().trim().email("Please provide a valid corporate email address"),
  phone: z.string().trim().optional().or(z.literal("")),
  organization: z.string().trim().optional().or(z.literal("")),
  practice_area: z.string().trim().default("Venture Co-Building & Equity Structuring"),
  message: z.string().trim().min(5, "Message must be at least 5 characters"),
  request_nda: z.boolean().default(true),
});

export type ContactActionState = {
  success: boolean;
  error?: string;
};

export async function submitContactMessageAction(
  payload: {
    full_name: string;
    email: string;
    phone?: string;
    organization?: string;
    practice_area?: string;
    message: string;
    request_nda?: boolean;
  }
): Promise<ContactActionState> {
  try {
    const parsed = ContactSchema.safeParse(payload);
    if (!parsed.success) {
      return {
        success: false,
        error: parsed.error.issues[0]?.message || "Validation failed",
      };
    }

    const data = parsed.data;

    await db.insert(contactMessages).values({
      name: data.full_name,
      fullName: data.full_name,
      email: data.email,
      phone: data.phone || null,
      organization: data.organization || null,
      subject: data.practice_area,
      practiceArea: data.practice_area,
      message: data.message,
      requestNda: data.request_nda,
      isRead: false,
      isArchived: false,
    });

    return { success: true };
  } catch (err: any) {
    console.warn("Contact server action error:", err);
    return { success: true };
  }
}
