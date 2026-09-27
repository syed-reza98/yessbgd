"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  Plus,
  Search,
  CheckCircle2,
  XCircle,
  Edit,
  Trash2,
  ExternalLink,
  Briefcase,
  Layers,
  Globe,
  FileText,
  Users,
} from "lucide-react";
import { deleteVentureAction } from "@/app/admin/actions";

const TYPE_CONFIGS: Record<string, { title: string; table: string; pathPrefix: string; icon: any }> = {
  ventures: { title: "Ventures", table: "cms_ventures", pathPrefix: "/ventures", icon: Briefcase },
  services: { title: "Services", table: "cms_services", pathPrefix: "/services", icon: Layers },
  industries: { title: "Industries", table: "cms_industries", pathPrefix: "/industries", icon: Globe },
  insights: { title: "Insights", table: "cms_insights", pathPrefix: "/insights", icon: FileText },
  openings: { title: "Careers & Openings", table: "cms_openings", pathPrefix: "/careers", icon: Users },
};

export function CollectionListClient({
  type,
  initialItems,
}: {
  type: string;
  initialItems: any[];
}) {
  const router = useRouter();
  const [items, setItems] = useState<any[]>(initialItems);
  const [query, setQuery] = useState("");
  const [deletingSlug, setDeletingSlug] = useState<string | null>(null);

  const config = TYPE_CONFIGS[type] || {
    title: type,
    table: `cms_${type}`,
    pathPrefix: `/${type}`,
    icon: Briefcase,
  };
  const Icon = config.icon;

  const filtered = items.filter(
    (item) =>
      item.title?.toLowerCase().includes(query.toLowerCase()) ||
      item.slug?.toLowerCase().includes(query.toLowerCase()) ||
      (item.category && item.category.toLowerCase().includes(query.toLowerCase())) ||
      (item.department && item.department.toLowerCase().includes(query.toLowerCase()))
  );

  const handleDelete = async (slug: string) => {
    if (!confirm(`Are you sure you want to delete "${slug}"?`)) return;
    setDeletingSlug(slug);
    try {
      if (type === "ventures") {
        await deleteVentureAction(slug);
      }
      setItems((prev) => prev.filter((i) => i.slug !== slug));
      router.refresh();
    } catch (err: any) {
      alert(err.message || "Failed to delete item.");
    } finally {
      setDeletingSlug(null);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-200">
        <div className="flex items-center gap-3">
          <Link
            href="/admin/cms"
            className="p-2 rounded-xl bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 transition-all shadow-xs"
          >
            <ArrowLeft className="w-4 h-4" />
          </Link>
          <div>
            <span className="text-xs font-bold text-teal-700 uppercase tracking-widest">
              COLLECTION DIRECTORY
            </span>
            <h1 className="text-2xl font-extrabold text-slate-900 mt-0.5 flex items-center gap-2">
              <Icon className="w-6 h-6 text-teal-700" />
              <span>{config.title} ({items.length})</span>
            </h1>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="w-full sm:w-64 relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder={`Search ${type}...`}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 bg-white border border-slate-300 rounded-xl text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-teal-600 focus:ring-1 focus:ring-teal-600 shadow-xs"
            />
          </div>
          <Link
            href={`/admin/cms/${type}/new`}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-[#008744] via-[#059669] to-[#0d6e6e] text-white text-xs font-bold shadow-sm hover:shadow-md transition-all shrink-0"
          >
            <Plus className="w-4 h-4" />
            <span>Create New</span>
          </Link>
        </div>
      </div>

      <div className="admin-glass-card rounded-2xl border border-slate-200 overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50/80 text-slate-500 text-xs uppercase tracking-wider font-bold">
                <th className="py-3 px-6">Title / Name</th>
                <th className="py-3 px-6">Slug</th>
                <th className="py-3 px-6">Category / Detail</th>
                <th className="py-3 px-6">Status</th>
                <th className="py-3 px-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filtered.map((item) => (
                <tr key={item.id || item.slug} className="admin-table-row transition-colors">
                  <td className="py-4 px-6 font-bold text-slate-900">
                    <div className="truncate max-w-[220px]">{item.title}</div>
                    {item.tagline && (
                      <div className="text-xs text-slate-500 font-normal truncate max-w-[220px]">
                        {item.tagline}
                      </div>
                    )}
                  </td>
                  <td className="py-4 px-6 font-mono text-xs text-slate-500">
                    {item.slug}
                  </td>
                  <td className="py-4 px-6 text-xs text-slate-600">
                    {item.category || item.department || item.level || "—"}
                  </td>
                  <td className="py-4 px-6">
                    {item.is_published ? (
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
                        href={`${config.pathPrefix}/${item.slug}`}
                        target="_blank"
                        className="p-2 text-slate-400 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors"
                        title="View Public Page"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </Link>
                      <Link
                        href={`/admin/cms/${type}/${item.slug}`}
                        className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-teal-50 text-teal-800 border border-teal-200 hover:bg-teal-100 text-xs font-bold transition-all shadow-xs"
                      >
                        <Edit className="w-3.5 h-3.5" />
                        <span>Edit</span>
                      </Link>
                      {type === "ventures" && (
                        <button
                          onClick={() => handleDelete(item.slug)}
                          disabled={deletingSlug === item.slug}
                          className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer"
                          title="Delete"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      )}
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
