"use client";

import { useEffect, useState } from "react";
import { getAdminAuditLogsAction } from "@/app/admin/actions";
import {
  History,
  Search,
  RefreshCw,
  Clock,
  ShieldCheck,
  ChevronDown,
  ChevronRight,
  Code,
} from "lucide-react";

export default function AuditTrailPage() {
  const [logs, setLogs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [expandedLogId, setExpandedLogId] = useState<string | null>(null);
  const [query, setQuery] = useState("");

  const loadLogs = async () => {
    setLoading(true);
    try {
      const data = await getAdminAuditLogsAction();
      setLogs(data || []);
    } catch (err) {
      console.error("Failed to load audit logs:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadLogs();
  }, []);

  const filtered = logs.filter(
    (l) =>
      l.table_name?.toLowerCase().includes(query.toLowerCase()) ||
      l.action?.toLowerCase().includes(query.toLowerCase()) ||
      l.record_id?.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-200">
        <div>
          <span className="text-xs font-bold text-amber-600 uppercase tracking-widest">
            IMMUTABLE SECURITY GOVERNANCE
          </span>
          <h1 className="text-3xl font-extrabold text-slate-900 mt-1">Audit Trail & Activity Log</h1>
          <p className="text-sm text-slate-500 mt-1">
            Tamper-evident record of all administrative modifications, publishing actions, and status updates.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="w-full sm:w-64 relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search table or action..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 bg-white border border-slate-300 rounded-xl text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-teal-600 focus:ring-1 focus:ring-teal-600"
            />
          </div>
          <button
            onClick={loadLogs}
            disabled={loading}
            className="p-2.5 rounded-xl bg-white border border-slate-200 text-slate-600 hover:text-slate-900 hover:bg-slate-50 shadow-xs transition-all"
            title="Refresh Logs"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin text-amber-600" : ""}`} />
          </button>
        </div>
      </div>

      <div className="admin-glass-card rounded-2xl overflow-hidden">
        <div className="p-4 border-b border-slate-200 bg-slate-50 flex items-center justify-between">
          <span className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
            <History className="w-4 h-4 text-amber-600" />
            <span>Audit Entries ({filtered.length})</span>
          </span>
          <span className="text-[11px] text-slate-500">Showing recent 100 entries</span>
        </div>

        <div className="overflow-x-auto">
          {filtered.length === 0 ? (
            <div className="p-12 text-center text-xs text-slate-500">
              No audit log entries recorded yet. Modifications made in the CMS will appear here in real time.
            </div>
          ) : (
            <div className="divide-y divide-slate-100">
              {filtered.map((log) => {
                const isExpanded = expandedLogId === log.id;
                return (
                  <div key={log.id} className="p-4 transition-colors hover:bg-slate-50/80">
                    <div
                      className="flex items-center justify-between gap-4 cursor-pointer"
                      onClick={() => setExpandedLogId(isExpanded ? null : log.id)}
                    >
                      <div className="flex items-center gap-3">
                        <button className="text-slate-400 hover:text-slate-700">
                          {isExpanded ? (
                            <ChevronDown className="w-4 h-4" />
                          ) : (
                            <ChevronRight className="w-4 h-4" />
                          )}
                        </button>
                        <span
                          className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                            log.action === "INSERT"
                              ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                              : log.action === "DELETE"
                              ? "bg-rose-50 text-rose-700 border border-rose-200"
                              : "bg-teal-50 text-teal-700 border border-teal-200"
                          }`}
                        >
                          {log.action}
                        </span>
                        <span className="text-xs font-mono font-bold text-slate-900">
                          {log.table_name}
                        </span>
                        {log.record_id && (
                          <span className="text-xs font-mono text-slate-500">
                            id: {log.record_id}
                          </span>
                        )}
                      </div>

                      <div className="flex items-center gap-4 text-xs text-slate-500 font-mono">
                        <span className="flex items-center gap-1.5">
                          <Clock className="w-3.5 h-3.5 text-amber-600" />
                          <span>{new Date(log.created_at).toLocaleString()}</span>
                        </span>
                      </div>
                    </div>

                    {/* Expandable JSON Diff Details */}
                    {isExpanded && (
                      <div className="mt-4 pt-3 border-t border-slate-200 grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-mono">
                        <div>
                          <span className="text-[10px] font-bold uppercase tracking-wider text-rose-700 block mb-1">
                            Before Mutation (Old State)
                          </span>
                          <pre className="p-3 bg-slate-900 rounded-xl border border-slate-800 overflow-x-auto text-[11px] text-slate-200 max-h-60 scrollbar-thin">
                            {log.old_data ? JSON.stringify(log.old_data, null, 2) : "null"}
                          </pre>
                        </div>

                        <div>
                          <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-700 block mb-1">
                            After Mutation (New State)
                          </span>
                          <pre className="p-3 bg-slate-900 rounded-xl border border-slate-800 overflow-x-auto text-[11px] text-slate-200 max-h-60 scrollbar-thin">
                            {log.new_data ? JSON.stringify(log.new_data, null, 2) : "null"}
                          </pre>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
