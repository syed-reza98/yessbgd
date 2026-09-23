"use client";

import { useEffect, useMemo, useState } from "react";
import { AdminPageHeader } from "@/components/admin/AdminShell";
import { RefreshCw, Filter } from "lucide-react";

type AuditRow = {
  id: string;
  createdAt: string;
  created_at?: string;
  actorId: string | null;
  actor_id?: string | null;
  action: "INSERT" | "UPDATE" | "DELETE";
  tableName: string;
  table_name?: string;
  recordId: string | null;
  record_id?: string | null;
  oldData: Record<string, unknown> | null;
  old_data?: Record<string, unknown> | null;
  newData: Record<string, unknown> | null;
  new_data?: Record<string, unknown> | null;
};

const ACTION_STYLES: Record<string, string> = {
  INSERT: "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border-emerald-500/30",
  UPDATE: "bg-primary/15 text-primary border-primary/30",
  DELETE: "bg-destructive/10 text-destructive border-destructive/30",
};

function diffSummary(row: AuditRow): string {
  if (row.action === "INSERT") return "Created";
  if (row.action === "DELETE") return "Removed";
  const before = (row.oldData || row.old_data || {}) as Record<string, unknown>;
  const after = (row.newData || row.new_data || {}) as Record<string, unknown>;
  const changes: string[] = [];
  for (const k of Object.keys(after)) {
    if (k === "status_updated_at" || k === "statusUpdatedAt") continue;
    if (JSON.stringify(before[k]) !== JSON.stringify(after[k])) {
      changes.push(k);
    }
  }
  return changes.length ? `Updated: ${changes.join(", ")}` : "Updated";
}

export default function AdminAudit() {
  const [rows, setRows] = useState<AuditRow[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [table, setTable] = useState<string>("all");
  const [action, setAction] = useState<string>("all");
  const [query, setQuery] = useState("");

  const load = async () => {
    setError(null);
    try {
      const res = await fetch("/api/admin/audit");
      if (!res.ok) throw new Error("Failed to fetch audit logs");
      const data = await res.json();
      setRows((data ?? []) as AuditRow[]);
    } catch (e: any) {
      setError(e.message);
      setRows([]);
    }
  };

  useEffect(() => {
    void load();
  }, []);

  const tables = useMemo(() => {
    const s = new Set<string>();
    (rows ?? []).forEach((r) => s.add(r.tableName || r.table_name || ""));
    return Array.from(s).filter(Boolean).sort();
  }, [rows]);

  const filtered = (rows ?? []).filter((r) => {
    const tbl = r.tableName || r.table_name;
    if (table !== "all" && tbl !== table) return false;
    if (action !== "all" && r.action !== action) return false;
    if (query.trim()) {
      const q = query.toLowerCase();
      const hay = JSON.stringify({
        ...r.oldData,
        ...r.old_data,
        ...r.newData,
        ...r.new_data,
        id: r.recordId || r.record_id,
      }).toLowerCase();
      if (!hay.includes(q)) return false;
    }
    return true;
  });

  return (
    <>
      <AdminPageHeader
        title="Audit log"
        description="Every database change to applications, messages, and roles. Last 500 events."
      />
      <section>
        <div>
          <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
            <div className="text-sm text-muted-foreground">
              {rows ? `${filtered.length} of ${rows.length} event${rows.length === 1 ? "" : "s"}` : "Loading…"}
            </div>
            <div className="flex gap-2">
              <button
                onClick={load}
                className="inline-flex items-center gap-2 rounded-full border border-border px-4 py-2 text-sm font-semibold hover:bg-secondary"
              >
                <RefreshCw className="h-4 w-4" /> Refresh
              </button>
            </div>
          </div>

          <div className="mb-6 grid gap-3 rounded-2xl border border-border bg-card p-4 sm:grid-cols-3">
            <div>
              <label className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                <Filter className="inline h-3 w-3 mr-1" /> Table
              </label>
              <select
                value={table}
                onChange={(e) => setTable(e.target.value)}
                className="mt-1 w-full rounded-lg border border-border bg-background px-3 py-2 text-sm"
              >
                <option value="all">All tables</option>
                {tables.map((t) => (
                  <option key={t} value={t}>
                    {t}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                Action
              </label>
              <select
                value={action}
                onChange={(e) => setAction(e.target.value)}
                className="mt-1 w-full rounded-lg border border-border bg-background px-3 py-2 text-sm"
              >
                <option value="all">All actions</option>
                <option value="INSERT">Insert</option>
                <option value="UPDATE">Update</option>
                <option value="DELETE">Delete</option>
              </select>
            </div>
            <div>
              <label className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                Search
              </label>
              <input
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Field, value, ID…"
                className="mt-1 w-full rounded-lg border border-border bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-primary/20"
              />
            </div>
          </div>

          {error && (
            <div className="mb-6 rounded-xl border border-destructive/30 bg-destructive/10 p-4 text-sm text-destructive">
              {error}
            </div>
          )}

          {rows && filtered.length === 0 && !error && (
            <div className="rounded-2xl border border-border bg-card p-10 text-center text-sm text-muted-foreground">
              No events match your filters.
            </div>
          )}

          <div className="grid gap-3">
            {filtered.map((r) => {
              const tbl = r.tableName || r.table_name;
              const recId = r.recordId || r.record_id;
              const actId = r.actorId || r.actor_id;
              const dateStr = r.createdAt || r.created_at || "";
              const beforeData = r.oldData || r.old_data;
              const afterData = r.newData || r.new_data;

              return (
                <article key={r.id} className="rounded-2xl border border-border bg-card p-5">
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <div className="flex items-center gap-2">
                      <span
                        className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider ${
                          ACTION_STYLES[r.action] || "bg-secondary text-foreground"
                        }`}
                      >
                        {r.action}
                      </span>
                      <code className="rounded bg-secondary px-2 py-0.5 text-xs font-mono">{tbl}</code>
                      {recId && (
                        <code className="text-xs text-muted-foreground font-mono">
                          #{recId.slice(0, 8)}
                        </code>
                      )}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {dateStr ? new Date(dateStr).toLocaleString() : "—"}
                    </div>
                  </div>
                  <p className="mt-2 text-sm text-foreground/85">{diffSummary(r)}</p>
                  {(afterData || beforeData) && (
                    <details className="mt-3">
                      <summary className="cursor-pointer text-xs font-semibold text-primary">View payload</summary>
                      <pre className="mt-2 overflow-x-auto rounded-lg bg-secondary/60 p-3 text-[11px] leading-relaxed">
{JSON.stringify({ before: beforeData, after: afterData }, null, 2)}
                      </pre>
                    </details>
                  )}
                  {actId && (
                    <p className="mt-2 text-[11px] text-muted-foreground">
                      Actor: <code className="font-mono">{actId.slice(0, 8)}…</code>
                    </p>
                  )}
                </article>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}
