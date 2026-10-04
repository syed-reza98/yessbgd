"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { getAdminDashboardStatsAction } from "./actions";
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
      const data = await getAdminDashboardStatsAction();
      const newApps = (data.recentApplications || []).filter(
        (a: any) => a.status === "Submitted" || a.status === "New"
      ).length;
      const newMsgs = (data.recentMessages || []).filter(
        (m: any) => m.status === "new"
      ).length;

      setStats({
        ventures: data.counts.ventures || 13,
        services: data.counts.services || 6,
        industries: data.counts.industries || 8,
        insights: data.counts.insights || 7,
        applications: data.counts.ventures ? data.recentApplications.length : 0,
        newApplications: newApps,
        messages: data.recentMessages.length,
        newMessages: newMsgs,
      });

      setRecentApplications(data.recentApplications || []);
      setRecentMessages(data.recentMessages || []);
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
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-200">
        <div>
          <span className="text-xs font-bold text-teal-700 uppercase tracking-widest">
            EXECUTIVE TELEMETRY & OPERATIONS
          </span>
          <h1 className="text-3xl font-extrabold text-slate-900 mt-1">Console Dashboard</h1>
          <p className="text-sm text-slate-500 mt-1">
            Real-time management for YESS Bangladesh 13 sovereign subsidiaries and operations.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={loadData}
            disabled={loading}
            className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white border border-slate-200 text-xs font-semibold text-slate-700 hover:bg-slate-50 shadow-xs transition-all cursor-pointer"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${loading ? "animate-spin text-teal-700" : ""}`} />
            <span>Refresh Telemetry</span>
          </button>
          <Link
            href="/admin/cms/ventures"
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-[#008744] via-[#059669] to-[#0d6e6e] text-white text-xs font-bold shadow-sm hover:shadow-md transition-all"
          >
            <Plus className="w-4 h-4" />
            <span>Add Venture</span>
          </Link>
        </div>
      </div>

      {/* 2. Top Stats Grid (4 Primary Cards) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <div className="admin-glass-card rounded-2xl p-6 border border-slate-200 hover:border-teal-400/60 shadow-xs transition-all">
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Ventures</span>
            <div className="p-2 rounded-xl bg-teal-50 text-teal-700">
              <Briefcase className="w-5 h-5" />
            </div>
          </div>
          <div className="text-3xl font-extrabold text-slate-900">{stats.ventures}</div>
          <p className="text-xs text-teal-700 font-semibold mt-1">100% Sovereign Portfolios</p>
        </div>

        <div className="admin-glass-card rounded-2xl p-6 border border-slate-200 hover:border-indigo-400/60 shadow-xs transition-all">
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Services</span>
            <div className="p-2 rounded-xl bg-indigo-50 text-indigo-700">
              <Layers className="w-5 h-5" />
            </div>
          </div>
          <div className="text-3xl font-extrabold text-slate-900">{stats.services}</div>
          <p className="text-xs text-slate-500 font-medium mt-1">Core Capability Practices</p>
        </div>

        <div className="admin-glass-card rounded-2xl p-6 border border-slate-200 hover:border-amber-400/60 shadow-xs transition-all">
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">ATS Candidates</span>
            <div className="p-2 rounded-xl bg-amber-50 text-amber-700">
              <Users className="w-5 h-5" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <div className="text-3xl font-extrabold text-slate-900">{stats.applications}</div>
            {stats.newApplications > 0 && (
              <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                {stats.newApplications} new
              </span>
            )}
          </div>
          <p className="text-xs text-slate-500 font-medium mt-1">Talent recruitment pipeline</p>
        </div>

        <div className="admin-glass-card rounded-2xl p-6 border border-slate-200 hover:border-purple-400/60 shadow-xs transition-all">
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Inbound Leads</span>
            <div className="p-2 rounded-xl bg-purple-50 text-purple-700">
              <Mail className="w-5 h-5" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <div className="text-3xl font-extrabold text-slate-900">{stats.messages}</div>
            {stats.newMessages > 0 && (
              <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-amber-50 text-amber-800 border border-amber-200">
                {stats.newMessages} unread
              </span>
            )}
          </div>
          <p className="text-xs text-slate-500 font-medium mt-1">Contact form submissions</p>
        </div>
      </div>

      {/* 3. Quick Action Hub */}
      <div className="admin-glass-card rounded-2xl p-6 border border-slate-200 shadow-xs">
        <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-4 flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-teal-700" />
          <span>Quick Actions & Short-cuts</span>
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          <Link
            href="/admin/pages/home"
            className="p-3.5 rounded-xl bg-slate-50/80 border border-slate-200 hover:bg-white hover:border-teal-300 hover:shadow-xs transition-all flex flex-col items-center text-center gap-2 group"
          >
            <FileText className="w-5 h-5 text-teal-700 group-hover:scale-110 transition-transform" />
            <span className="text-xs font-bold text-slate-800">Edit Home Page</span>
          </Link>

          <Link
            href="/admin/cms/ventures"
            className="p-3.5 rounded-xl bg-slate-50/80 border border-slate-200 hover:bg-white hover:border-teal-300 hover:shadow-xs transition-all flex flex-col items-center text-center gap-2 group"
          >
            <Briefcase className="w-5 h-5 text-amber-700 group-hover:scale-110 transition-transform" />
            <span className="text-xs font-bold text-slate-800">Manage Ventures</span>
          </Link>

          <Link
            href="/admin/applications"
            className="p-3.5 rounded-xl bg-slate-50/80 border border-slate-200 hover:bg-white hover:border-teal-300 hover:shadow-xs transition-all flex flex-col items-center text-center gap-2 group"
          >
            <Users className="w-5 h-5 text-indigo-700 group-hover:scale-110 transition-transform" />
            <span className="text-xs font-bold text-slate-800">Review ATS</span>
          </Link>

          <Link
            href="/admin/messages"
            className="p-3.5 rounded-xl bg-slate-50/80 border border-slate-200 hover:bg-white hover:border-teal-300 hover:shadow-xs transition-all flex flex-col items-center text-center gap-2 group"
          >
            <Mail className="w-5 h-5 text-purple-700 group-hover:scale-110 transition-transform" />
            <span className="text-xs font-bold text-slate-800">Inbound Leads</span>
          </Link>

          <Link
            href="/admin/media"
            className="p-3.5 rounded-xl bg-slate-50/80 border border-slate-200 hover:bg-white hover:border-teal-300 hover:shadow-xs transition-all flex flex-col items-center text-center gap-2 group"
          >
            <RefreshCw className="w-5 h-5 text-emerald-700 group-hover:scale-110 transition-transform" />
            <span className="text-xs font-bold text-slate-800">Media Gallery</span>
          </Link>

          <Link
            href="/admin/data"
            className="p-3.5 rounded-xl bg-slate-50/80 border border-slate-200 hover:bg-white hover:border-teal-300 hover:shadow-xs transition-all flex flex-col items-center text-center gap-2 group"
          >
            <CheckCircle2 className="w-5 h-5 text-rose-700 group-hover:scale-110 transition-transform" />
            <span className="text-xs font-bold text-slate-800">Database Tools</span>
          </Link>
        </div>
      </div>

      {/* 4. Split Activity Tables */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Applications */}
        <div className="admin-glass-card rounded-2xl p-6 border border-slate-200 shadow-xs flex flex-col">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
              <Users className="w-4 h-4 text-teal-700" />
              <span>Recent Job Candidates</span>
            </h2>
            <Link href="/admin/applications" className="text-xs font-bold text-teal-700 hover:underline flex items-center gap-1">
              <span>View All</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="flex-1 overflow-x-auto">
            {recentApplications.length === 0 ? (
              <div className="h-40 flex flex-col items-center justify-center text-slate-400 text-xs">
                <Users className="w-8 h-8 mb-2 opacity-30" />
                <span>No job applications submitted yet.</span>
              </div>
            ) : (
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-slate-200 text-slate-500 bg-slate-50/70">
                    <th className="py-2.5 px-3 font-bold">Candidate</th>
                    <th className="py-2.5 px-3 font-bold">Role</th>
                    <th className="py-2.5 px-3 font-bold">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {recentApplications.map((app) => (
                    <tr key={app.id} className="admin-table-row">
                      <td className="py-3 px-3 font-bold text-slate-900 truncate max-w-[140px]">
                        {app.full_name}
                      </td>
                      <td className="py-3 px-3 text-slate-600 truncate max-w-[120px]">
                        {app.job_title}
                      </td>
                      <td className="py-3 px-3">
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-teal-50 text-teal-700 border border-teal-200">
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
        <div className="admin-glass-card rounded-2xl p-6 border border-slate-200 shadow-xs flex flex-col">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
              <Mail className="w-4 h-4 text-teal-700" />
              <span>Recent Contact Inquiries</span>
            </h2>
            <Link href="/admin/messages" className="text-xs font-bold text-teal-700 hover:underline flex items-center gap-1">
              <span>View All</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="flex-1 overflow-x-auto">
            {recentMessages.length === 0 ? (
              <div className="h-40 flex flex-col items-center justify-center text-slate-400 text-xs">
                <Mail className="w-8 h-8 mb-2 opacity-30" />
                <span>No contact messages received yet.</span>
              </div>
            ) : (
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-slate-200 text-slate-500 bg-slate-50/70">
                    <th className="py-2.5 px-3 font-bold">Sender</th>
                    <th className="py-2.5 px-3 font-bold">Subject</th>
                    <th className="py-2.5 px-3 font-bold">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {recentMessages.map((msg) => (
                    <tr key={msg.id} className="admin-table-row">
                      <td className="py-3 px-3 font-bold text-slate-900 truncate max-w-[140px]">
                        {msg.name}
                      </td>
                      <td className="py-3 px-3 text-slate-600 truncate max-w-[140px]">
                        {msg.subject || msg.practice_area || "General Inquiry"}
                      </td>
                      <td className="py-3 px-3">
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-50 text-amber-800 border border-amber-200 capitalize">
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
