"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { getAdminSitePagesAction } from "../actions";
import { FileText, Edit, Globe, CheckCircle2, XCircle, ArrowUpRight, Search } from "lucide-react";

export default function SitePagesDirectoryPage() {
  const [pages, setPages] = useState<any[]>([]);
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getAdminSitePagesAction().then((data) => {
      setPages(data || []);
      setLoading(false);
    });
  }, []);

  const filtered = pages.filter(
    (p) =>
      p.name.toLowerCase().includes(query.toLowerCase()) ||
      (p.name_bn && p.name_bn.includes(query)) ||
      p.path.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-200">
        <div>
          <span className="text-xs font-bold text-teal-700 uppercase tracking-widest">
            SITE PAGES & BILINGUAL CONTENT
          </span>
          <h1 className="text-3xl font-extrabold text-slate-900 mt-1">Pages Manager</h1>
          <p className="text-sm text-slate-500 mt-1">
            Manage heroes, SEO metadata, and introductory copy across all core routes in English and Bangla.
          </p>
        </div>
        <div className="w-full sm:w-64 relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search pages..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-white border border-slate-300 rounded-xl text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-teal-600 focus:ring-1 focus:ring-teal-600 shadow-xs"
          />
        </div>
      </div>

      <div className="admin-glass-card rounded-2xl border border-slate-200 overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50/80 text-slate-500 text-xs uppercase tracking-wider font-bold">
                <th className="py-3 px-6">Page Name</th>
                <th className="py-3 px-6">URL Path</th>
                <th className="py-3 px-6">Bangla (বাংলা)</th>
                <th className="py-3 px-6">Status</th>
                <th className="py-3 px-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filtered.map((p) => (
                <tr key={p.id} className="admin-table-row transition-colors">
                  <td className="py-4 px-6 font-bold text-slate-900 flex items-center gap-3">
                    <FileText className="w-4 h-4 text-teal-700" />
                    <span>{p.name}</span>
                  </td>
                  <td className="py-4 px-6 font-mono text-xs text-slate-500">
                    {p.path}
                  </td>
                  <td className="py-4 px-6 text-slate-700">
                    {p.name_bn || "—"}
                  </td>
                  <td className="py-4 px-6">
                    {p.is_published ? (
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>Published</span>
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-rose-50 text-rose-700 border border-rose-200">
                        <XCircle className="w-3.5 h-3.5" />
                        <span>Draft</span>
                      </span>
                    )}
                  </td>
                  <td className="py-4 px-6 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Link
                        href={p.path}
                        target="_blank"
                        className="p-2 text-slate-400 hover:text-slate-800 hover:bg-slate-100 rounded-lg transition-colors"
                        title="View Public Page"
                      >
                        <ArrowUpRight className="w-4 h-4" />
                      </Link>
                      <Link
                        href={`/admin/pages/${p.page}`}
                        className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-teal-50 text-teal-800 border border-teal-200 hover:bg-teal-100 text-xs font-bold transition-all shadow-xs"
                      >
                        <Edit className="w-3.5 h-3.5" />
                        <span>Edit Content</span>
                      </Link>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
