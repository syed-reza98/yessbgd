// Site-wide data backup helpers — daily export (download) and restore (upload).
// Uses the Next.js /api/admin/data API backed by MySQL / Drizzle ORM.

export type BackupTable = {
  name: string;
  label: string;
  labelBn: string;
  dateColumn: string;
  conflictKey: string;
  group: "content" | "operations" | "system";
};

export const BACKUP_TABLES: BackupTable[] = [
  { name: "cms_site_pages", label: "Site pages", labelBn: "সাইট পেইজ", dateColumn: "updated_at", conflictKey: "id", group: "content" },
  { name: "cms_pages", label: "Page blocks", labelBn: "পেইজ ব্লক", dateColumn: "updated_at", conflictKey: "id", group: "content" },
  { name: "cms_ventures", label: "Ventures", labelBn: "ভেঞ্চার", dateColumn: "updated_at", conflictKey: "id", group: "content" },
  { name: "cms_services", label: "Services", labelBn: "সার্ভিস", dateColumn: "updated_at", conflictKey: "id", group: "content" },
  { name: "cms_industries", label: "Industries", labelBn: "ইন্ডাস্ট্রি", dateColumn: "updated_at", conflictKey: "id", group: "content" },
  { name: "cms_insights", label: "Insights", labelBn: "ইনসাইট", dateColumn: "updated_at", conflictKey: "id", group: "content" },
  { name: "cms_menu_items", label: "Menus", labelBn: "মেনু", dateColumn: "updated_at", conflictKey: "id", group: "content" },
  { name: "cms_media", label: "Media library", labelBn: "ইমেজ গ্যালারি", dateColumn: "updated_at", conflictKey: "id", group: "content" },
  { name: "cms_settings", label: "Site settings", labelBn: "সাইট সেটিংস", dateColumn: "updated_at", conflictKey: "id", group: "content" },
  { name: "job_applications", label: "Job applications", labelBn: "চাকরির আবেদন", dateColumn: "created_at", conflictKey: "id", group: "operations" },
  { name: "contact_messages", label: "Contact messages", labelBn: "যোগাযোগ বার্তা", dateColumn: "created_at", conflictKey: "id", group: "operations" },
  { name: "audit_logs", label: "Audit log", labelBn: "অডিট লগ", dateColumn: "created_at", conflictKey: "id", group: "system" },
];

export type DateRange = { from: string | null; to: string | null };

export type BackupFile = {
  format: "yess-site-backup";
  version: 1;
  exported_at: string;
  range: DateRange;
  tables: Record<string, Record<string, unknown>[]>;
};

export type TableResult = { table: string; count: number; error?: string };

/* ------------------------------ date helpers ------------------------------ */

export function isoDay(d: Date) {
  const y = d.getFullYear();
  const m = `${d.getMonth() + 1}`.padStart(2, "0");
  const day = `${d.getDate()}`.padStart(2, "0");
  return `${y}-${m}-${day}`;
}

export function todayRange(): DateRange {
  const t = isoDay(new Date());
  return { from: t, to: t };
}

export function shiftDays(days: number): DateRange {
  const to = new Date();
  const from = new Date();
  from.setDate(from.getDate() - days);
  return { from: isoDay(from), to: isoDay(to) };
}

/* --------------------------------- export --------------------------------- */

export async function buildBackup(
  tables: BackupTable[],
  range: DateRange,
  onProgress?: (table: string) => void,
): Promise<{ file: BackupFile; results: TableResult[] }> {
  for (const t of tables) {
    onProgress?.(t.name);
  }

  const res = await fetch("/api/admin/data", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      action: "export",
      tables: tables.map((t) => t.name),
      range,
    }),
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({ error: "Failed to export data" }));
    throw new Error(err.error || "Export failed");
  }

  const data = await res.json();
  return data;
}

export function downloadBlob(content: string, filename: string, type: string) {
  const blob = new Blob([content], { type });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}

export function toCsv(rows: Record<string, unknown>[]): string {
  if (!rows.length) return "";
  const cols = Array.from(new Set(rows.flatMap((r) => Object.keys(r))));
  const cell = (v: unknown) => {
    if (v === null || v === undefined) return "";
    const s = typeof v === "object" ? JSON.stringify(v) : String(v);
    return /[",\n]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s;
  };
  return [cols.join(","), ...rows.map((r) => cols.map((c) => cell(r[c])).join(","))].join("\n");
}

export function backupFilename(range: DateRange, ext: string) {
  const tag = range.from && range.to ? (range.from === range.to ? range.from : `${range.from}_${range.to}`) : "all";
  return `yess-data-${tag}.${ext}`;
}

/* --------------------------------- import --------------------------------- */

export function parseBackup(text: string): BackupFile {
  const json = JSON.parse(text) as Partial<BackupFile>;
  if (!json || typeof json !== "object" || !json.tables || typeof json.tables !== "object") {
    throw new Error("ফাইলটি সঠিক ব্যাকআপ ফাইল নয়।");
  }
  return {
    format: "yess-site-backup",
    version: 1,
    exported_at: json.exported_at ?? new Date().toISOString(),
    range: json.range ?? { from: null, to: null },
    tables: json.tables as Record<string, Record<string, unknown>[]>,
  };
}

export async function restoreBackup(
  file: BackupFile,
  tableNames: string[],
  onProgress?: (table: string) => void,
): Promise<TableResult[]> {
  for (const name of tableNames) {
    onProgress?.(name);
  }

  // Filter file tables to only requested ones
  const filteredTables: Record<string, any[]> = {};
  for (const name of tableNames) {
    if (file.tables[name]) {
      filteredTables[name] = file.tables[name];
    }
  }

  const res = await fetch("/api/admin/data", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      action: "import",
      file: { ...file, tables: filteredTables },
      tables: tableNames,
    }),
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({ error: "Failed to restore data" }));
    throw new Error(err.error || "Restore failed");
  }

  const data = await res.json();
  return data.results || [];
}
