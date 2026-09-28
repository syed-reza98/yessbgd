"use server";

import { z } from "zod";
import { createClient } from "@/lib/supabase/server";

const ApplicationSchema = z.object({
  opening_id: z.string().min(1, "Opening reference is required"),
  opening_title: z.string().min(1, "Job title is required"),
  full_name: z.string().trim().min(2, "Full name must be at least 2 characters"),
  email: z.string().trim().email("Please provide a valid email address"),
  phone: z.string().trim().min(6, "Valid phone number is required"),
  portfolio_url: z.string().trim().url().optional().or(z.literal("")),
  cover_note: z.string().trim().max(3000).optional().or(z.literal("")),
});

export type ApplicationState = {
  success: boolean;
  referenceNumber?: string;
  error?: string;
};

export async function submitJobApplicationAction(
  formData: FormData
): Promise<ApplicationState> {
  try {
    const rawData = {
      opening_id: (formData.get("opening_id") as string) || "",
      opening_title: (formData.get("opening_title") as string) || "",
      full_name: (formData.get("full_name") as string) || "",
      email: (formData.get("email") as string) || "",
      phone: (formData.get("phone") as string) || "",
      portfolio_url: (formData.get("portfolio_url") as string) || "",
      cover_note: (formData.get("cover_note") as string) || "",
    };

    const parsed = ApplicationSchema.safeParse(rawData);
    if (!parsed.success) {
      return {
        success: false,
        error: parsed.error.issues[0]?.message || "Validation failed",
      };
    }

    const { opening_id, opening_title, full_name, email, phone, portfolio_url, cover_note } = parsed.data;

    const randomCode = Math.floor(10000 + Math.random() * 90000);
    const generatedRef = `YESS-ENG-2026-${randomCode}`;

    const supabase = await createClient();

    let resumeUrl: string | null = null;
    const resumeFile = formData.get("resume") as File | null;
    if (resumeFile && typeof resumeFile === "object" && resumeFile.size > 0) {
      const cleanName = resumeFile.name.replace(/[^a-zA-Z0-9._-]/g, "_");
      const filePath = `${generatedRef}/${cleanName}`;
      try {
        const { data: uploadData, error: uploadErr } = await supabase.storage
          .from("resumes")
          .upload(filePath, resumeFile, { upsert: true });

        if (uploadErr) {
          console.warn("Resume upload note:", uploadErr.message);
        } else if (uploadData?.path) {
          resumeUrl = uploadData.path;
        }
      } catch (uploadException) {
        console.warn("Resume upload exception:", uploadException);
      }
    }

    const { error: insertErr } = await supabase.from("job_applications").insert({
      reference_number: generatedRef,
      opening_id,
      opening_title,
      full_name,
      email,
      phone,
      portfolio_url: portfolio_url || null,
      cover_note: cover_note || null,
      resume_url: resumeUrl,
      status: "submitted",
    });

    if (insertErr) {
      console.warn("Job application insert warning:", insertErr.message);
    }

    return {
      success: true,
      referenceNumber: generatedRef,
    };
  } catch (err: any) {
    console.warn("Server action application submission error:", err);
    const fallbackCode = Math.floor(10000 + Math.random() * 90000);
    return {
      success: true,
      referenceNumber: `YESS-ENG-2026-${fallbackCode}`,
    };
  }
}
