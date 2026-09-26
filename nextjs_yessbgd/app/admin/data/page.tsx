"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase/client";
import {
  Database,
  Download,
  Upload,
  RefreshCw,
  CheckCircle2,
  FileText,
  AlertTriangle,
  ShieldCheck,
  Table as TableIcon,
} from "lucide-react";

export default function DatabaseToolsPage() {
  const [exporting, setExporting] = useState(false);
  const [seeding, setSeeding] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  const handleExportJson = async () => {
    setExporting(true);
    setMessage(null);
    try {
      const [
        { data: pages },
        { data: ventures },
        { data: services },
        { data: industries },
        { data: insights },
        { data: openings },
        { data: settings },
        { data: menus },
        { data: apps },
        { data: msgs },
      ] = await Promise.all([
        supabase.from("cms_site_pages").select("*"),
        supabase.from("cms_ventures").select("*"),
        supabase.from("cms_services").select("*"),
        supabase.from("cms_industries").select("*"),
        supabase.from("cms_insights").select("*"),
        supabase.from("cms_openings").select("*"),
        supabase.from("cms_settings").select("*"),
        supabase.from("cms_menu_items").select("*"),
        supabase.from("job_applications").select("*"),
        supabase.from("contact_messages").select("*"),
      ]);

      const dump = {
        exportedAt: new Date().toISOString(),
        instance: "vhffmxoqirbczmcpoqtx",
        schema: "PostgreSQL 17.6",
        tables: {
          cms_site_pages: pages || [],
          cms_ventures: ventures || [],
          cms_services: services || [],
          cms_industries: industries || [],
          cms_insights: insights || [],
          cms_openings: openings || [],
          cms_settings: settings || [],
          cms_menu_items: menus || [],
          job_applications: apps || [],
          contact_messages: msgs || [],
        },
      };

      const blob = new Blob([JSON.stringify(dump, null, 2)], { type: "application/json" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `yessbgd_database_snapshot_${new Date().toISOString().slice(0, 10)}.json`;
      a.click();
      URL.revokeObjectURL(url);
      setMessage("Complete database JSON snapshot exported successfully!");
    } catch (err: any) {
      alert("Failed to export: " + err.message);
    } finally {
      setExporting(false);
    }
  };

  const handleExportCsv = async (tableName: string) => {
    try {
      const { data, error } = await supabase.from(tableName).select("*");
      if (error) throw error;
      if (!data || data.length === 0) {
        alert("No records to export.");
        return;
      }

      const headers = Object.keys(data[0]).join(",");
      const rows = data.map((row) =>
        Object.values(row)
          .map((v) => `"${String(v ?? "").replace(/"/g, '""')}"`)
          .join(",")
      );
      const csv = [headers, ...rows].join("\n");

      const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `${tableName}_export_${new Date().toISOString().slice(0, 10)}.csv`;
      a.click();
      URL.revokeObjectURL(url);
    } catch (err: any) {
      alert("CSV export failed: " + err.message);
    }
  };

  return (
    <div className="space-y-6">
      <div className="pb-6 border-b border-white/10">
        <span className="text-xs font-bold text-[#d4a359] uppercase tracking-widest">
          DATABASE GOVERNANCE & BACKUP
        </span>
        <h1 className="text-3xl font-extrabold text-white mt-1">Data Backup & Seed Tools</h1>
        <p className="text-sm text-slate-400 mt-1">
          Generate complete database snapshots, export candidate ATS reports to CSV, or re-verify database seeding.
        </p>
      </div>

      {message && (
        <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center gap-3 text-emerald-300 text-xs font-semibold">
          <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
          <span>{message}</span>
        </div>
      )}

      {/* Snapshot Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Full Database Snapshot */}
        <div className="admin-glass-card rounded-2xl p-6 border border-white/10 space-y-4 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold text-[#d4a359] uppercase tracking-wider">
                Full Database Backup
              </span>
              <Database className="w-5 h-5 text-[#35b0aa]" />
            </div>
            <h2 className="text-lg font-bold text-white">Export Sovereign Snapshot</h2>
            <p className="text-xs text-slate-400 mt-2 leading-relaxed">
              Dumps all 10 CMS tables (Ventures, Services, Industries, Insights, Pages, ATS Applications, Messages, Menus, Settings) into a JSON document.
            </p>
          </div>

          <button
            onClick={handleExportJson}
            disabled={exporting}
            className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-[#0d6e6e] to-[#35b0aa] text-white font-bold text-xs shadow-md shadow-[#0d6e6e]/20 hover:opacity-90 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
          >
            <Download className="w-4 h-4" />
            <span>{exporting ? "Generating Dump..." : "Download Full JSON Snapshot"}</span>
          </button>
        </div>

        {/* Operational CSV Exports */}
        <div className="admin-glass-card rounded-2xl p-6 border border-white/10 space-y-4 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold text-[#d4a359] uppercase tracking-wider">
                Tabular CSV Exports
              </span>
              <TableIcon className="w-5 h-5 text-indigo-400" />
            </div>
            <h2 className="text-lg font-bold text-white">ATS & Inbound Reports</h2>
            <p className="text-xs text-slate-400 mt-2 leading-relaxed">
              Export operational records into standard CSV format for spreadsheet analysis and board committee reporting.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={() => handleExportCsv("job_applications")}
              className="py-2.5 px-3 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 text-white text-xs font-semibold flex items-center justify-center gap-2 transition-all"
            >
              <Download className="w-3.5 h-3.5 text-[#d4a359]" />
              <span>ATS CSV</span>
            </button>
            <button
              onClick={() => handleExportCsv("contact_messages")}
              className="py-2.5 px-3 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 text-white text-xs font-semibold flex items-center justify-center gap-2 transition-all"
            >
              <Download className="w-3.5 h-3.5 text-[#35b0aa]" />
              <span>Messages CSV</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
