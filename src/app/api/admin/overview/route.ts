import { auth } from "@/lib/auth";
import { db } from "@/db";
import { jobApplications, contactMessages, cmsVentures, cmsServices, cmsIndustries, cmsInsights } from "@/db/schema";
import { count, desc } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const limit = Math.min(25, Math.max(1, Number(searchParams.get("limit")) || 8));

  try {
    const [[appsCount], [msgsCount], recentApps, recentMsgs, [vCount], [sCount], [iCount], [inCount]] =
      await Promise.all([
        db.select({ count: count() }).from(jobApplications),
        db.select({ count: count() }).from(contactMessages),
        db
          .select({
            id: jobApplications.id,
            created_at: jobApplications.createdAt,
            full_name: jobApplications.fullName,
            job_title: jobApplications.jobTitle,
            status: jobApplications.status,
          })
          .from(jobApplications)
          .orderBy(desc(jobApplications.createdAt))
          .limit(limit),
        db
          .select({
            id: contactMessages.id,
            created_at: contactMessages.createdAt,
            name: contactMessages.name,
            subject: contactMessages.subject,
            status: contactMessages.status,
          })
          .from(contactMessages)
          .orderBy(desc(contactMessages.createdAt))
          .limit(limit),
        db.select({ count: count() }).from(cmsVentures),
        db.select({ count: count() }).from(cmsServices),
        db.select({ count: count() }).from(cmsIndustries),
        db.select({ count: count() }).from(cmsInsights),
      ]);

    return NextResponse.json({
      appsCount: appsCount?.count ?? 0,
      msgsCount: msgsCount?.count ?? 0,
      recentApps: recentApps.map((a) => ({
        ...a,
        created_at: a.created_at?.toISOString(),
      })),
      recentMsgs: recentMsgs.map((m) => ({
        ...m,
        created_at: m.created_at?.toISOString(),
      })),
      cmsCounts: {
        ventures: vCount?.count ?? 0,
        services: sCount?.count ?? 0,
        industries: iCount?.count ?? 0,
        insights: inCount?.count ?? 0,
      },
    });
  } catch (error) {
    console.error("Dashboard overview error:", error);
    return NextResponse.json({ error: "Failed to load dashboard data" }, { status: 500 });
  }
}
