"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase/client";
import { updateApplicationStatusAction } from "@/app/admin/actions";
import {
  Users,
  Search,
  Filter,
  FileText,
  CheckCircle2,
  Clock,
  ChevronRight,
  ExternalLink,
  MessageSquare,
  ShieldCheck,
  Mail,
  Phone,
} from "lucide-react";

const STAGES = ["Submitted", "Under review", "Interview", "Offer", "Hired", "Rejected"] as const;

export default function ApplicationsAtsPage() {
  const [applications, setApplications] = useState<any[]>([]);
  const [selectedApp, setSelectedApp] = useState<any | null>(null);
  const [statusNote, setStatusNote] = useState("");
  const [updating, setUpdating] = useState(false);
  const [query, setQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const loadApps = async () => {
    const { data } = await supabase
      .from("job_applications")
      .select("*")
      .order("created_at", { ascending: false });
    setApplications(data || []);
    if (data && data.length > 0 && !selectedApp) {
      setSelectedApp(data[0]);
      setStatusNote(data[0].status_note || "");
    }
  };

  useEffect(() => {
    loadApps();
  }, []);

  const handleUpdateStatus = async (newStatus: string) => {
    if (!selectedApp) return;
    setUpdating(true);
    try {
      await updateApplicationStatusAction(selectedApp.id, newStatus, statusNote);
      setSelectedApp({ ...selectedApp, status: newStatus, status_note: statusNote });
      setApplications((prev) =>
        prev.map((a) =>
          a.id === selectedApp.id ? { ...a, status: newStatus, status_note: statusNote } : a
        )
      );
    } catch (err: any) {
      alert(err.message || "Failed to update status.");
    } finally {
      setUpdating(false);
    }
  };

  const filtered = applications.filter((a) => {
    const matchesQuery =
      a.full_name?.toLowerCase().includes(query.toLowerCase()) ||
      a.email?.toLowerCase().includes(query.toLowerCase()) ||
      a.job_title?.toLowerCase().includes(query.toLowerCase());
    const matchesFilter = statusFilter === "all" || a.status === statusFilter;
    return matchesQuery && matchesFilter;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/10">
        <div>
          <span className="text-xs font-bold text-[#d4a359] uppercase tracking-widest">
            TALENT RECRUITMENT & CANDIDATE EVALUATION
          </span>
          <h1 className="text-3xl font-extrabold text-white mt-1">Applicant Tracking System (ATS)</h1>
          <p className="text-sm text-slate-400 mt-1">
            Review submissions, advance candidates through the 5-stage sovereign pipeline, and inspect resumes.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="w-full sm:w-64 relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search candidate or role..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 bg-white/5 border border-white/10 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#35b0aa]"
            />
          </div>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1">
        {["all", ...STAGES].map((st) => (
          <button
            key={st}
            onClick={() => setStatusFilter(st)}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold capitalize transition-all ${
              statusFilter === st
                ? "bg-[#0d6e6e] text-white"
                : "bg-white/5 text-slate-400 hover:text-white hover:bg-white/10"
            }`}
          >
            {st}
          </button>
        ))}
      </div>

      {/* Split ATS View */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Candidates List (5 cols) */}
        <div className="lg:col-span-5 admin-glass-card rounded-2xl border border-white/10 overflow-hidden flex flex-col h-[700px]">
          <div className="p-4 border-b border-white/10 bg-white/5 flex items-center justify-between">
            <span className="text-xs font-bold text-white uppercase tracking-wider">
              Candidates ({filtered.length})
            </span>
          </div>

          <div className="flex-1 overflow-y-auto divide-y divide-white/5">
            {filtered.length === 0 ? (
              <div className="p-8 text-center text-xs text-slate-500">
                No job applications found matching filter.
              </div>
            ) : (
              filtered.map((app) => {
                const active = selectedApp?.id === app.id;
                return (
                  <button
                    key={app.id}
                    onClick={() => {
                      setSelectedApp(app);
                      setStatusNote(app.status_note || "");
                    }}
                    className={`w-full p-4 text-left transition-all flex items-start justify-between gap-3 ${
                      active ? "bg-[#0d6e6e]/20 border-l-4 border-[#35b0aa]" : "hover:bg-white/5"
                    }`}
                  >
                    <div>
                      <div className="font-bold text-sm text-white">{app.full_name}</div>
                      <div className="text-xs text-[#d4a359] font-medium mt-0.5">{app.job_title}</div>
                      <div className="text-[11px] text-slate-400 mt-1 font-mono">
                        Ref: {app.id.substring(0, 8)}...
                      </div>
                    </div>
                    <div className="flex flex-col items-end gap-1 shrink-0">
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-white/10 text-slate-300">
                        {app.status}
                      </span>
                      <span className="text-[10px] text-slate-500">
                        {new Date(app.created_at).toLocaleDateString()}
                      </span>
                    </div>
                  </button>
                );
              })
            )}
          </div>
        </div>

        {/* Candidate Detail Inspector (7 cols) */}
        <div className="lg:col-span-7 admin-glass-card rounded-2xl border border-white/10 p-6 flex flex-col h-[700px] overflow-y-auto space-y-6">
          {selectedApp ? (
            <>
              {/* Header */}
              <div className="flex items-start justify-between gap-4 pb-4 border-b border-white/10">
                <div>
                  <h2 className="text-xl font-extrabold text-white">{selectedApp.full_name}</h2>
                  <p className="text-xs text-[#35b0aa] font-semibold mt-0.5">{selectedApp.job_title}</p>
                  <div className="flex items-center gap-4 text-xs text-slate-400 mt-2 font-mono">
                    <span className="flex items-center gap-1.5">
                      <Mail className="w-3.5 h-3.5 text-[#d4a359]" />
                      <a href={`mailto:${selectedApp.email}`} className="hover:underline">{selectedApp.email}</a>
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Phone className="w-3.5 h-3.5 text-[#d4a359]" />
                      <span>{selectedApp.phone}</span>
                    </span>
                  </div>
                </div>

                <div className="text-right">
                  <span className="text-[10px] uppercase font-bold text-slate-400 block">Candidate Vault Ref</span>
                  <span className="text-xs font-mono font-bold text-[#d4a359]">{selectedApp.id}</span>
                </div>
              </div>

              {/* 5-Stage Stepper Controls */}
              <div className="space-y-3">
                <span className="text-xs font-bold text-slate-300 uppercase tracking-wider block">
                  Candidate Pipeline Stage
                </span>
                <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
                  {STAGES.map((stage) => {
                    const isCurrent = selectedApp.status === stage;
                    return (
                      <button
                        key={stage}
                        onClick={() => handleUpdateStatus(stage)}
                        disabled={updating}
                        className={`py-2 px-2 rounded-xl text-[11px] font-bold transition-all ${
                          isCurrent
                            ? "bg-[#0d6e6e] text-white shadow-md shadow-[#0d6e6e]/40 border border-[#35b0aa]/40"
                            : "bg-white/5 text-slate-400 hover:text-white hover:bg-white/10 border border-white/5"
                        }`}
                      >
                        {stage}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Recruiter Evaluation Note */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-300 uppercase tracking-wider block">
                  Recruiter Feedback & Status Directive Note
                </label>
                <textarea
                  rows={3}
                  value={statusNote}
                  onChange={(e) => setStatusNote(e.target.value)}
                  placeholder="e.g. Cleared technical screening. Interview Round 2 scheduled for Thursday..."
                  className="w-full px-4 py-2.5 bg-black/40 border border-white/10 rounded-xl text-xs text-white focus:outline-none focus:border-[#35b0aa]"
                />
                <button
                  onClick={() => handleUpdateStatus(selectedApp.status)}
                  disabled={updating}
                  className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/15 text-white text-xs font-semibold transition-all"
                >
                  {updating ? "Saving..." : "Save Note"}
                </button>
              </div>

              {/* Cover Letter */}
              <div className="space-y-2 pt-2 border-t border-white/10">
                <span className="text-xs font-bold text-slate-300 uppercase tracking-wider block">
                  Cover Letter / Introduction
                </span>
                <div className="p-4 bg-black/40 rounded-xl border border-white/5 text-xs text-slate-300 leading-relaxed whitespace-pre-line">
                  {selectedApp.cover_letter}
                </div>
              </div>

              {/* Resume File Inspector */}
              <div className="space-y-2 pt-2 border-t border-white/10">
                <span className="text-xs font-bold text-slate-300 uppercase tracking-wider block">
                  Submitted Resume / Dossier
                </span>
                <div className="flex items-center justify-between p-3.5 bg-white/5 rounded-xl border border-white/10">
                  <div className="flex items-center gap-3">
                    <FileText className="w-5 h-5 text-[#d4a359]" />
                    <div>
                      <div className="text-xs font-bold text-white">{selectedApp.resume_name}</div>
                      <div className="text-[10px] text-slate-400 font-mono">
                        {Math.round((selectedApp.resume_size || 0) / 1024)} KB • {selectedApp.resume_type}
                      </div>
                    </div>
                  </div>
                  <span className="text-xs text-slate-400 font-mono">
                    Stored in: resumes/{selectedApp.resume_path}
                  </span>
                </div>
              </div>
            </>
          ) : (
            <div className="m-auto text-center text-xs text-slate-500">
              Select a candidate from the left panel to inspect application dossier.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
