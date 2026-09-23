"use client";

import { use, useEffect, useMemo, useState } from "react";
import { Link } from "@/components/ui/link";
import { AdminPageHeader } from "@/components/admin/AdminShell";
import { getCmsConfig } from "@/lib/cmsSchema";
import { AdminTableSkeleton, AdminLoadingState } from "@/components/admin/AdminLoading";
import { Plus, Eye, EyeOff, Trash2, Pencil, ArrowLeft } from "lucide-react";

type Row = Record<string, unknown> & { id: string; is_published?: boolean };

export default function AdminCmsList({ params }: { params: Promise<{ type: string }> }) {
  const { type } = use(params);
  const cfg = useMemo(() => getCmsConfig(type), [type]);
  const [rows, setRows] = useState<Row[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [filter, setFilter] = useState("");

  const load = async () => {
    if (!cfg) {
      setError("Unknown content type");
      return;
    }
    try {
      const res = await fetch(`/api/admin/cms?type=${type}`);
      if (!res.ok) {
        if (res.status === 401) {
          window.location.href = "/admin/login";
          return;
        }
        throw new Error("Failed to load items");
      }
      const data = await res.json();
      setRows(data);
    } catch (e) {
      setError((e as Error).message);
      setRows([]);
    }
  };

  useEffect(() => {
    void load();
  }, [type, cfg]);

  if (!cfg) {
    return (
      <section>
        <div>
          <p className="text-sm text-destructive">Unknown CMS type: {type}</p>
          <Link to="/admin/cms" className="mt-4 inline-block text-sm text-primary">
            ← Back to CMS
          </Link>
        </div>
      </section>
    );
  }

  const togglePublish = async (row: Row) => {
    const next = !row.is_published;
    setRows((prev) => prev?.map((r) => (r.id === row.id ? { ...r, is_published: next } : r)) ?? null);
    try {
      const res = await fetch(`/api/admin/cms?type=${type}&id=${row.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ is_published: next }),
      });
      if (!res.ok) throw new Error("Toggle publish failed");
    } catch (e) {
      alert((e as Error).message);
      setRows((prev) => prev?.map((r) => (r.id === row.id ? { ...r, is_published: !next } : r)) ?? null);
    }
  };

  const remove = async (row: Row) => {
    if (!confirm(`Delete "${String(row.title ?? row.id)}"? This cannot be undone.`)) return;
    try {
      const res = await fetch(`/api/admin/cms?type=${type}&id=${row.id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Delete failed");
      setRows((prev) => prev?.filter((r) => r.id !== row.id) ?? null);
    } catch (e) {
      alert((e as Error).message);
    }
  };

  const filtered = (rows ?? []).filter((r) => {
    if (!filter) return true;
    const q = filter.toLowerCase();
    return cfg.listColumns.some((c) => String(r[c.key] ?? "").toLowerCase().includes(q));
  });

  return (
    <>
      <AdminPageHeader title={cfg.label} description={cfg.description} />
      <section>
        <div>

          <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
            <Link
              to="/admin/cms"
              className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground"
            >
              <ArrowLeft className="h-4 w-4" /> All content
            </Link>
            <div className="flex flex-wrap items-center gap-2">
              <input
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                placeholder="Filter…"
                className="rounded-lg border border-glass-border bg-white/60 px-3 py-1.5 text-sm outline-none focus:border-primary dark:bg-white/5"
              />
              <Link
                to="/admin/cms/$type/$id"
                params={{ type, id: "new" }}
                className="inline-flex items-center gap-1.5 rounded-full bg-gradient-primary px-4 py-2 text-sm font-semibold text-primary-foreground shadow-glow"
              >
                <Plus className="h-4 w-4" /> New {cfg.label.slice(0, -1)}
              </Link>
            </div>
          </div>

          {error && <p className="text-sm text-destructive">{error}</p>}
          {!rows && !error && <AdminTableSkeleton cols={cfg.listColumns.length + 2} />}
          {rows && filtered.length === 0 && (
            <div className="rounded-2xl glass-card p-8 text-center text-sm text-muted-foreground">
              কোন এন্ট্রি নেই। উপরে "New" বোতাম চেপে যোগ করুন।
            </div>
          )}
          {filtered.length > 0 && (
            <div className="overflow-x-auto rounded-2xl glass-card">
              <table className="w-full text-sm">
                <thead className="border-b border-glass-border text-left text-xs uppercase tracking-wide text-muted-foreground">
                  <tr>
                    {cfg.listColumns.map((c) => (
                      <th key={c.key} className="px-4 py-3 font-medium">{c.label}</th>
                    ))}
                    <th className="px-4 py-3 font-medium">Status</th>
                    <th className="px-4 py-3 font-medium text-right">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((row) => (
                    <tr key={row.id} className="border-b border-glass-border/50 last:border-0">
                      {cfg.listColumns.map((c) => (
                        <td key={c.key} className="px-4 py-3">
                          {String(row[c.key] ?? "—")}
                        </td>
                      ))}
                      <td className="px-4 py-3">
                        <span
                          className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs ${
                            row.is_published
                              ? "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400"
                              : "bg-muted text-muted-foreground"
                          }`}
                        >
                          {row.is_published ? "Published" : "Draft"}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center justify-end gap-1">
                          <button
                            onClick={() => togglePublish(row)}
                            className="rounded-md p-1.5 text-muted-foreground hover:bg-muted hover:text-foreground"
                            title={row.is_published ? "Unpublish" : "Publish"}
                          >
                            {row.is_published ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                          </button>
                          <Link
                            to="/admin/cms/$type/$id"
                            params={{ type, id: row.id }}
                            className="rounded-md p-1.5 text-muted-foreground hover:bg-muted hover:text-foreground"
                            title="Edit"
                          >
                            <Pencil className="h-4 w-4" />
                          </Link>
                          <button
                            onClick={() => remove(row)}
                            className="rounded-md p-1.5 text-destructive hover:bg-destructive/10"
                            title="Delete"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
