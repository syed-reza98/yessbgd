import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { db } from "@/db";
import {
  cmsSitePages,
  cmsPages,
  cmsVentures,
  cmsServices,
  cmsIndustries,
  cmsInsights,
  cmsMenuItems,
  cmsMedia,
  cmsSettings,
  jobApplications,
  contactMessages,
  auditLogs,
} from "@/db/schema";
import { gte, lte, and } from "drizzle-orm";

const TABLE_MAP: Record<string, any> = {
  cms_site_pages: cmsSitePages,
  cms_pages: cmsPages,
  cms_ventures: cmsVentures,
  cms_services: cmsServices,
  cms_industries: cmsIndustries,
  cms_insights: cmsInsights,
  cms_menu_items: cmsMenuItems,
  cms_media: cmsMedia,
  cms_settings: cmsSettings,
  job_applications: jobApplications,
  contact_messages: contactMessages,
  audit_logs: auditLogs,
};

export async function POST(req: NextRequest) {
  try {
    const session = await auth();
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const { action, tables, range, file } = body;

    if (action === "export") {
      const exportedTables: Record<string, any[]> = {};
      const results: { table: string; count: number; error?: string }[] = [];

      for (const tableName of tables || []) {
        const schemaTable = TABLE_MAP[tableName];
        if (!schemaTable) {
          results.push({ table: tableName, count: 0, error: "Unknown table" });
          continue;
        }

        try {
          const rows = await db.select().from(schemaTable);
          exportedTables[tableName] = rows;
          results.push({ table: tableName, count: rows.length });
        } catch (err: any) {
          results.push({ table: tableName, count: 0, error: err.message });
        }
      }

      return NextResponse.json({
        file: {
          format: "yess-site-backup",
          version: 1,
          exported_at: new Date().toISOString(),
          range: range || { from: null, to: null },
          tables: exportedTables,
        },
        results,
      });
    }

    if (action === "import") {
      if (!file?.tables) {
        return NextResponse.json({ error: "Invalid backup file payload" }, { status: 400 });
      }

      const results: { table: string; count: number; error?: string }[] = [];

      for (const [tableName, rows] of Object.entries(file.tables)) {
        if (!Array.isArray(rows)) continue;
        const schemaTable = TABLE_MAP[tableName];
        if (!schemaTable) {
          results.push({ table: tableName, count: 0, error: "Table not supported" });
          continue;
        }

        try {
          let count = 0;
          for (const row of rows) {
            // Upsert / insert ignore
            await db.insert(schemaTable).values(row as any).onDuplicateKeyUpdate({ set: row as any });
            count++;
          }
          results.push({ table: tableName, count });
        } catch (err: any) {
          results.push({ table: tableName, count: 0, error: err.message });
        }
      }

      return NextResponse.json({ results });
    }

    return NextResponse.json({ error: "Invalid action" }, { status: 400 });
  } catch (error: any) {
    console.error("POST /api/admin/data error:", error);
    return NextResponse.json({ error: error.message || "Data operation failed" }, { status: 500 });
  }
}
