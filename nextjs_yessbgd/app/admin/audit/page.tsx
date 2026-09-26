"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase/client";
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
    const { data } = await supabase
      .from("audit_logs")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(100);

    setLogs(data || []);
    setLoading(false);
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
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/10">
        <div>
          <span className="text-xs font-bold text-[#d4a359] uppercase tracking-widest">
            IMMUTABLE SECURITY GOVERNANCE
          </span>
          <h1 className="text-3xl font-extrabold text-white mt-1">Audit Trail & Activity Log</h1>
          <p className="text-sm text-slate-400 mt-1">
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
              className="w-full pl-9 pr-4 py-2 bg-white/5 border border-white/10 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#35b0aa]"
            />
          </div>
          <button
            onClick={loadLogs}
            disabled={loading}
            className="p-2.5 rounded-xl bg-white/5 border border-white/10 text-slate-300 hover:text-white hover:bg-white/10 transition-all"
            title="Refresh Logs"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin text-[#d4a359]" : ""}`} />
          </button>
        </div>
      </div>

      <div className="admin-glass-card rounded-2xl border border-white/10 overflow-hidden">
        <div className="p-4 border-b border-white/10 bg-white/5 flex items-center justify-between">
          <span className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-2">
            <History className="w-4 h-4 text-[#d4a359]" />
            <span>Audit Entries ({filtered.length})</span>
          </span>
          <span className="text-[11px] text-slate-400">Showing recent 100 entries</span>
        </div>

        <div className="overflow-x-auto">
          {filtered.length === 0 ? (
            <div className="p-12 text-center text-xs text-slate-500">
              No audit log entries recorded yet. Modifications made in the CMS will appear here in real time.
            </div>
          ) : (
            <div className="divide-y divide-white/5">
              {filtered.map((log) => {
                const isExpanded = expandedLogId === log.id;
                return (
                  <div key={log.id} className="p-4 transition-colors hover:bg-white/[0.02]">
                    <div
                      className="flex items-center justify-between gap-4 cursor-pointer"
                      onClick={() => setExpandedLogId(isExpanded ? null : log.id)}
                    >
                      <div className="flex items-center gap-3">
                        <button className="text-slate-400 hover:text-white">
                          {isExpanded ? (
                            <ChevronDown className="w-4 h-4" />
                          ) : (
                            <ChevronRight className="w-4 h-4" />
                          )}
                        </button>
                        <span
                          className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                            log.action === "INSERT"
                              ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
                              : log.action === "DELETE"
                              ? "bg-rose-500/20 text-rose-400 border border-rose-500/30"
                              : "bg-[#0d6e6e]/30 text-[#35b0aa] border border-[#0d6e6e]/50"
                          }`}
                        >
                          {log.action}
                        </span>
                        <span className="text-xs font-mono font-bold text-white">
                          {log.table_name}
                        </span>
                        {log.record_id && (
                          <span className="text-xs font-mono text-slate-400">
                            id: {log.record_id}
                          </span>
                        )}
                      </div>

                      <div className="flex items-center gap-4 text-xs text-slate-400 font-mono">
                        <span className="flex items-center gap-1.5">
                          <Clock className="w-3.5 h-3.5 text-[#d4a359]" />
                          <span>{new Date(log.created_at).toLocaleString()}</span>
                        </span>
                      </div>
                    </div>

                    {/* Expandable JSON Diff Details */}
                    {isExpanded && (
                      <div className="mt-4 pt-3 border-t border-white/5 grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-mono">
                        <div>
                          <span className="text-[10px] font-bold uppercase tracking-wider text-rose-400 block mb-1">
                            Before Mutation (Old State)
                          </span>
                          <pre className="p-3 bg-black/60 rounded-xl border border-white/5 overflow-x-auto text-[11px] text-slate-300 max-h-60 scrollbar-thin">
                            {log.old_data ? JSON.stringify(log.old_data, null, 2) : "null"}
                          </pre>
                        </div>

                        <div>
                          <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-400 block mb-1">
                            After Mutation (New State)
                          </span>
                          <pre className="p-3 bg-black/60 rounded-xl border border-white/5 overflow-x-auto text-[11px] text-slate-300 max-h-60 scrollbar-thin">
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
