"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabase/client";
import {
  Briefcase,
  Layers,
  Users,
  Mail,
  ArrowRight,
  TrendingUp,
  ShieldCheck,
  Sparkles,
  FileText,
  Clock,
  CheckCircle2,
  RefreshCw,
  Plus,
  ExternalLink,
} from "lucide-react";

export default function AdminDashboardPage() {
  const [stats, setStats] = useState({
    ventures: 13,
    services: 6,
    industries: 8,
    insights: 7,
    applications: 0,
    newApplications: 0,
    messages: 0,
    newMessages: 0,
  });
  const [recentApplications, setRecentApplications] = useState<any[]>([]);
  const [recentMessages, setRecentMessages] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const loadData = async () => {
    setLoading(true);
    try {
      const [
        { count: venturesCount },
        { count: servicesCount },
        { count: industriesCount },
        { count: insightsCount },
        { data: apps, count: appsCount },
        { data: msgs, count: msgsCount },
      ] = await Promise.all([
        supabase.from("cms_ventures").select("*", { count: "exact", head: true }),
        supabase.from("cms_services").select("*", { count: "exact", head: true }),
        supabase.from("cms_industries").select("*", { count: "exact", head: true }),
        supabase.from("cms_insights").select("*", { count: "exact", head: true }),
        supabase.from("job_applications").select("*").order("created_at", { ascending: false }).limit(5),
        supabase.from("contact_messages").select("*").order("created_at", { ascending: false }).limit(5),
      ]);

      const newApps = (apps || []).filter((a) => a.status === "Submitted" || a.status === "New").length;
      const newMsgs = (msgs || []).filter((m) => m.status === "new").length;

      setStats({
        ventures: venturesCount || 13,
        services: servicesCount || 6,
        industries: industriesCount || 8,
        insights: insightsCount || 7,
        applications: appsCount || (apps || []).length,
        newApplications: newApps,
        messages: msgsCount || (msgs || []).length,
        newMessages: newMsgs,
      });

      setRecentApplications(apps || []);
      setRecentMessages(msgs || []);
    } catch (err) {
      console.warn("Could not fetch live dashboard telemetry:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <div className="space-y-8">
      {/* 1. Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/10">
        <div>
          <span className="text-xs font-bold text-[#d4a359] uppercase tracking-widest">
            EXECUTIVE TELEMETRY & OPERATIONS
          </span>
          <h1 className="text-3xl font-extrabold text-white mt-1">Console Dashboard</h1>
          <p className="text-sm text-slate-400 mt-1">
            Real-time management for YESS Bangladesh 13 sovereign subsidiaries and operations.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={loadData}
            disabled={loading}
            className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white/5 border border-white/10 text-xs font-medium text-slate-300 hover:text-white hover:bg-white/10 transition-all"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${loading ? "animate-spin text-[#d4a359]" : ""}`} />
            <span>Refresh Telemetry</span>
          </button>
          <Link
            href="/admin/cms/ventures"
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-[#0d6e6e] to-[#35b0aa] text-white text-xs font-bold shadow-md shadow-[#0d6e6e]/20 hover:opacity-90 transition-all"
          >
            <Plus className="w-4 h-4" />
            <span>Add Venture</span>
          </Link>
        </div>
      </div>

      {/* 2. Top Stats Grid (4 Primary Cards) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <div className="admin-glass-card rounded-2xl p-6 border border-white/10 hover:border-[#35b0aa]/40 transition-all">
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Ventures</span>
            <div className="p-2 rounded-xl bg-[#0d6e6e]/20 text-[#35b0aa]">
              <Briefcase className="w-5 h-5" />
            </div>
          </div>
          <div className="text-3xl font-extrabold text-white">{stats.ventures}</div>
          <p className="text-xs text-[#d4a359] font-medium mt-1">100% Sovereign Portfolios</p>
        </div>

        <div className="admin-glass-card rounded-2xl p-6 border border-white/10 hover:border-[#35b0aa]/40 transition-all">
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Services</span>
            <div className="p-2 rounded-xl bg-indigo-500/20 text-indigo-400">
              <Layers className="w-5 h-5" />
            </div>
          </div>
          <div className="text-3xl font-extrabold text-white">{stats.services}</div>
          <p className="text-xs text-slate-400 font-medium mt-1">Core Capability Practices</p>
        </div>

        <div className="admin-glass-card rounded-2xl p-6 border border-white/10 hover:border-[#35b0aa]/40 transition-all">
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">ATS Candidates</span>
            <div className="p-2 rounded-xl bg-amber-500/20 text-amber-400">
              <Users className="w-5 h-5" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <div className="text-3xl font-extrabold text-white">{stats.applications}</div>
            {stats.newApplications > 0 && (
              <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                {stats.newApplications} new
              </span>
            )}
          </div>
          <p className="text-xs text-slate-400 font-medium mt-1">Talent recruitment pipeline</p>
        </div>

        <div className="admin-glass-card rounded-2xl p-6 border border-white/10 hover:border-[#35b0aa]/40 transition-all">
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Inbound Leads</span>
            <div className="p-2 rounded-xl bg-purple-500/20 text-purple-400">
              <Mail className="w-5 h-5" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <div className="text-3xl font-extrabold text-white">{stats.messages}</div>
            {stats.newMessages > 0 && (
              <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-[#d4a359]/20 text-[#d4a359] border border-[#d4a359]/30">
                {stats.newMessages} unread
              </span>
            )}
          </div>
          <p className="text-xs text-slate-400 font-medium mt-1">Contact form submissions</p>
        </div>
      </div>

      {/* 3. Quick Action Hub */}
      <div className="admin-glass-card rounded-2xl p-6 border border-white/10">
        <h2 className="text-sm font-bold text-white uppercase tracking-wider mb-4 flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-[#d4a359]" />
          <span>Quick Actions & Short-cuts</span>
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          <Link
            href="/admin/pages/home"
            className="p-3.5 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-[#35b0aa]/50 transition-all flex flex-col items-center text-center gap-2 group"
          >
            <FileText className="w-5 h-5 text-[#35b0aa] group-hover:scale-110 transition-transform" />
            <span className="text-xs font-semibold text-slate-200">Edit Home Page</span>
          </Link>

          <Link
            href="/admin/cms/ventures"
            className="p-3.5 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-[#35b0aa]/50 transition-all flex flex-col items-center text-center gap-2 group"
          >
            <Briefcase className="w-5 h-5 text-[#d4a359] group-hover:scale-110 transition-transform" />
            <span className="text-xs font-semibold text-slate-200">Manage Ventures</span>
          </Link>

          <Link
            href="/admin/applications"
            className="p-3.5 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-[#35b0aa]/50 transition-all flex flex-col items-center text-center gap-2 group"
          >
            <Users className="w-5 h-5 text-indigo-400 group-hover:scale-110 transition-transform" />
            <span className="text-xs font-semibold text-slate-200">Review ATS</span>
          </Link>

          <Link
            href="/admin/messages"
            className="p-3.5 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-[#35b0aa]/50 transition-all flex flex-col items-center text-center gap-2 group"
          >
            <Mail className="w-5 h-5 text-purple-400 group-hover:scale-110 transition-transform" />
            <span className="text-xs font-semibold text-slate-200">Inbound Leads</span>
          </Link>

          <Link
            href="/admin/media"
            className="p-3.5 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-[#35b0aa]/50 transition-all flex flex-col items-center text-center gap-2 group"
          >
            <RefreshCw className="w-5 h-5 text-emerald-400 group-hover:scale-110 transition-transform" />
            <span className="text-xs font-semibold text-slate-200">Media Gallery</span>
          </Link>

          <Link
            href="/admin/data"
            className="p-3.5 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-[#35b0aa]/50 transition-all flex flex-col items-center text-center gap-2 group"
          >
            <CheckCircle2 className="w-5 h-5 text-rose-400 group-hover:scale-110 transition-transform" />
            <span className="text-xs font-semibold text-slate-200">Database Tools</span>
          </Link>
        </div>
      </div>

      {/* 4. Split Activity Tables */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Applications */}
        <div className="admin-glass-card rounded-2xl p-6 border border-white/10 flex flex-col">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
              <Users className="w-4 h-4 text-[#d4a359]" />
              <span>Recent Job Candidates</span>
            </h2>
            <Link href="/admin/applications" className="text-xs text-[#35b0aa] hover:underline flex items-center gap-1">
              <span>View All</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="flex-1 overflow-x-auto">
            {recentApplications.length === 0 ? (
              <div className="h-40 flex flex-col items-center justify-center text-slate-500 text-xs">
                <Users className="w-8 h-8 mb-2 opacity-30" />
                <span>No job applications submitted yet.</span>
              </div>
            ) : (
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-white/10 text-slate-400">
                    <th className="py-2.5 font-bold">Candidate</th>
                    <th className="py-2.5 font-bold">Role</th>
                    <th className="py-2.5 font-bold">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {recentApplications.map((app) => (
                    <tr key={app.id} className="admin-table-row">
                      <td className="py-3 font-semibold text-white truncate max-w-[140px]">
                        {app.full_name}
                      </td>
                      <td className="py-3 text-slate-300 truncate max-w-[120px]">
                        {app.job_title}
                      </td>
                      <td className="py-3">
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#0d6e6e]/20 text-[#35b0aa] border border-[#0d6e6e]/40">
                          {app.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>

        {/* Recent Inbound Leads */}
        <div className="admin-glass-card rounded-2xl p-6 border border-white/10 flex flex-col">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
              <Mail className="w-4 h-4 text-[#d4a359]" />
              <span>Recent Contact Inquiries</span>
            </h2>
            <Link href="/admin/messages" className="text-xs text-[#35b0aa] hover:underline flex items-center gap-1">
              <span>View All</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="flex-1 overflow-x-auto">
            {recentMessages.length === 0 ? (
              <div className="h-40 flex flex-col items-center justify-center text-slate-500 text-xs">
                <Mail className="w-8 h-8 mb-2 opacity-30" />
                <span>No contact messages received yet.</span>
              </div>
            ) : (
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-white/10 text-slate-400">
                    <th className="py-2.5 font-bold">Sender</th>
                    <th className="py-2.5 font-bold">Subject</th>
                    <th className="py-2.5 font-bold">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {recentMessages.map((msg) => (
                    <tr key={msg.id} className="admin-table-row">
                      <td className="py-3 font-semibold text-white truncate max-w-[140px]">
                        {msg.name}
                      </td>
                      <td className="py-3 text-slate-300 truncate max-w-[140px]">
                        {msg.subject || msg.practice_area || "General Inquiry"}
                      </td>
                      <td className="py-3">
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-500/20 text-amber-400 border border-amber-500/30 capitalize">
                          {msg.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
