import { db } from "@/db";
import {
  cmsVentures,
  cmsServices,
  cmsIndustries,
  cmsInsights,
  cmsSitePages,
  cmsPages,
  cmsMenuItems,
  cmsSettings,
  contactMessages,
  jobApplications,
} from "@/db/schema";
import { eq, asc, desc } from "drizzle-orm";
import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const resource = searchParams.get("resource");

  try {
    switch (resource) {
      case "ventures": {
        const rows = await db
          .select()
          .from(cmsVentures)
          .where(eq(cmsVentures.isPublished, true))
          .orderBy(asc(cmsVentures.sortOrder));
        return NextResponse.json(rows);
      }
      case "services": {
        const rows = await db
          .select()
          .from(cmsServices)
          .where(eq(cmsServices.isPublished, true))
          .orderBy(asc(cmsServices.sortOrder));
        return NextResponse.json(rows);
      }
      case "industries": {
        const rows = await db
          .select()
          .from(cmsIndustries)
          .where(eq(cmsIndustries.isPublished, true))
          .orderBy(asc(cmsIndustries.sortOrder));
        return NextResponse.json(rows);
      }
      case "insights": {
        const rows = await db
          .select()
          .from(cmsInsights)
          .where(eq(cmsInsights.isPublished, true))
          .orderBy(desc(cmsInsights.publishedAt));
        return NextResponse.json(rows);
      }
      case "menus": {
        const location = searchParams.get("location") || "header";
        const rows = await db
          .select()
          .from(cmsMenuItems)
          .where(eq(cmsMenuItems.location, location))
          .orderBy(asc(cmsMenuItems.sortOrder));
        return NextResponse.json(rows);
      }
      case "settings": {
        const rows = await db.select().from(cmsSettings).orderBy(asc(cmsSettings.sortOrder));
        return NextResponse.json(rows);
      }
      case "site-pages": {
        const rows = await db.select().from(cmsSitePages).orderBy(asc(cmsSitePages.sortOrder));
        return NextResponse.json(rows);
      }
      case "site-page": {
        const page = searchParams.get("page");
        if (!page) return NextResponse.json(null);
        const [row] = await db
          .select()
          .from(cmsSitePages)
          .where(eq(cmsSitePages.page, page))
          .limit(1);
        return NextResponse.json(row || null);
      }
      default:
        return NextResponse.json({ error: "Unknown resource" }, { status: 400 });
    }
  } catch (error) {
    console.error("CMS API error:", error);
    // Return empty array gracefully so fallback static data activates
    return NextResponse.json([]);
  }
}
