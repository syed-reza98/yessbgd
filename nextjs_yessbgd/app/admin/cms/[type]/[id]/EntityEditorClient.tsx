"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  saveVentureAction,
  saveServiceAction,
  saveIndustryAction,
  saveInsightAction,
  saveOpeningAction,
} from "@/app/admin/actions";
import {
  ArrowLeft,
  Save,
  CheckCircle2,
  AlertCircle,
  ExternalLink,
  Sparkles,
} from "lucide-react";

export function EntityEditorClient({
  type,
  id,
  initialData,
}: {
  type: string;
  id: string;
  initialData: any;
}) {
  const router = useRouter();
  const isNew = id === "new";
  const [formData, setFormData] = useState<any>(
    initialData || {
      slug: "",
      title: "",
      tagline: "",
      description: "",
      category: "",
      department: "",
      status: "active",
      image_path: "",
      sort_order: 1,
      is_published: true,
      body_md: "",
      author: "",
      salary_range: "",
      data: {},
    }
  );

  const [saving, setSaving] = useState(false);
  const [savedSuccess, setSavedSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setErrorMessage(null);
    setSavedSuccess(false);

    try {
      if (type === "ventures") {
        await saveVentureAction(formData.slug, formData);
      } else if (type === "services") {
        await saveServiceAction(formData.slug, formData);
      } else if (type === "industries") {
        await saveIndustryAction(formData.slug, formData);
      } else if (type === "insights") {
        await saveInsightAction(formData.slug, formData);
      } else if (type === "openings") {
        await saveOpeningAction(formData.slug, formData);
      }

      setSavedSuccess(true);
      router.refresh();
      if (isNew) {
        router.push(`/admin/cms/${type}/${formData.slug}`);
      }
      setTimeout(() => setSavedSuccess(false), 3000);
    } catch (err: any) {
      setErrorMessage(err.message || "Failed to save entity.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-200">
        <div className="flex items-center gap-3">
          <Link
            href={`/admin/cms/${type}`}
            className="p-2 rounded-xl bg-white border border-slate-200 text-slate-600 hover:text-slate-900 hover:bg-slate-50 transition-all shadow-xs"
          >
            <ArrowLeft className="w-4 h-4" />
          </Link>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-amber-600 uppercase tracking-widest capitalize">
                {type} Editor
              </span>
              <span className="text-xs font-mono px-2 py-0.5 rounded bg-slate-100 border border-slate-200 text-slate-600">
                {formData.slug || "new-item"}
              </span>
            </div>
            <h1 className="text-2xl font-extrabold text-slate-900 mt-0.5">
              {isNew ? `Create New ${type}` : `Editing: ${formData.title || formData.slug}`}
            </h1>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {!isNew && (
            <Link
              href={`/${type}/${formData.slug}`}
              target="_blank"
              className="flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-slate-600 hover:text-slate-900 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 shadow-xs transition-colors"
            >
              <ExternalLink className="w-3.5 h-3.5 text-teal-600" />
              <span>Preview Live</span>
            </Link>
          )}
          <button
            onClick={handleSave}
            disabled={saving}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-teal-700 to-teal-600 text-white text-xs font-bold shadow-md shadow-teal-700/20 hover:opacity-95 transition-all disabled:opacity-50"
          >
            <Save className="w-4 h-4" />
            <span>{saving ? "Saving..." : "Save & Publish"}</span>
          </button>
        </div>
      </div>

      {savedSuccess && (
        <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center gap-3 text-emerald-800 text-xs font-semibold animate-in fade-in">
          <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
          <span>Entity saved and cache revalidated successfully!</span>
        </div>
      )}

      {errorMessage && (
        <div className="p-4 rounded-xl bg-rose-50 border border-rose-200 flex items-center gap-3 text-rose-800 text-xs font-semibold">
          <AlertCircle className="w-5 h-5 text-rose-600 shrink-0" />
          <span>{errorMessage}</span>
        </div>
      )}

      <form onSubmit={handleSave} className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Details (2 cols) */}
        <div className="lg:col-span-2 space-y-6">
          <div className="admin-glass-card rounded-2xl p-6 space-y-4">
            <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2 pb-3 border-b border-slate-200">
              <Sparkles className="w-4 h-4 text-amber-600" />
              <span>Core Information</span>
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                  Title / Name
                </label>
                <input
                  type="text"
                  required
                  value={formData.title || ""}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="e.g. Yess Soft"
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm text-slate-900 placeholder:text-slate-400 focus:bg-white focus:outline-none focus:border-teal-600 focus:ring-1 focus:ring-teal-600"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                  Slug (URL Identifier)
                </label>
                <input
                  type="text"
                  required
                  disabled={!isNew}
                  value={formData.slug || ""}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      slug: e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, "-"),
                    })
                  }
                  placeholder="e.g. yess-soft"
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm font-mono text-slate-900 placeholder:text-slate-400 focus:bg-white focus:outline-none focus:border-teal-600 focus:ring-1 focus:ring-teal-600 disabled:opacity-60 disabled:bg-slate-100"
                />
              </div>
            </div>

            {type === "ventures" && (
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                  Tagline
                </label>
                <input
                  type="text"
                  value={formData.tagline || ""}
                  onChange={(e) => setFormData({ ...formData, tagline: e.target.value })}
                  placeholder="Engineering software that scales with your ambition."
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm text-slate-900 placeholder:text-slate-400 focus:bg-white focus:outline-none focus:border-teal-600 focus:ring-1 focus:ring-teal-600"
                />
              </div>
            )}

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                Summary / Short Description
              </label>
              <textarea
                rows={3}
                value={formData.description || formData.summary || ""}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    description: e.target.value,
                    summary: e.target.value,
                  })
                }
                placeholder="High-level descriptive overview..."
                className="w-full px-4 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm text-slate-900 placeholder:text-slate-400 focus:bg-white focus:outline-none focus:border-teal-600 focus:ring-1 focus:ring-teal-600"
              />
            </div>

            {type === "insights" && (
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                  Article Markdown Body
                </label>
                <textarea
                  rows={10}
                  value={formData.body_md || ""}
                  onChange={(e) => setFormData({ ...formData, body_md: e.target.value })}
                  placeholder="### Section Heading&#10;&#10;Longform technical prose..."
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm font-mono text-slate-900 placeholder:text-slate-400 focus:bg-white focus:outline-none focus:border-teal-600 focus:ring-1 focus:ring-teal-600"
                />
              </div>
            )}

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                Image / Graphic Asset Path
              </label>
              <input
                type="text"
                value={formData.image_path || formData.cover_image || ""}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    image_path: e.target.value,
                    cover_image: e.target.value,
                  })
                }
                placeholder="/assets/ventures/yess-soft.jpg"
                className="w-full px-4 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm font-mono text-slate-900 placeholder:text-slate-400 focus:bg-white focus:outline-none focus:border-teal-600 focus:ring-1 focus:ring-teal-600"
              />
            </div>
          </div>
        </div>

        {/* Sidebar Controls (1 col) */}
        <div className="space-y-6">
          <div className="admin-glass-card rounded-2xl p-6 space-y-4">
            <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider pb-3 border-b border-slate-200">
              Taxonomy & Status
            </h2>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                Category / Vertical / Department
              </label>
              <input
                type="text"
                value={formData.category || formData.department || ""}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    category: e.target.value,
                    department: e.target.value,
                  })
                }
                placeholder="e.g. Technology & AI"
                className="w-full px-4 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm text-slate-900 placeholder:text-slate-400 focus:bg-white focus:outline-none focus:border-teal-600 focus:ring-1 focus:ring-teal-600"
              />
            </div>

            {type === "openings" && (
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                  Salary Range (BDT)
                </label>
                <input
                  type="text"
                  value={formData.salary_range || ""}
                  onChange={(e) => setFormData({ ...formData, salary_range: e.target.value })}
                  placeholder="৳ 2,50,000 – ৳ 3,80,000 / month"
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm text-slate-900 placeholder:text-slate-400 focus:bg-white focus:outline-none focus:border-teal-600 focus:ring-1 focus:ring-teal-600"
                />
              </div>
            )}

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                Sort Order Priority
              </label>
              <input
                type="number"
                value={formData.sort_order || 0}
                onChange={(e) => setFormData({ ...formData, sort_order: parseInt(e.target.value) || 0 })}
                className="w-full px-4 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm text-slate-900 placeholder:text-slate-400 focus:bg-white focus:outline-none focus:border-teal-600 focus:ring-1 focus:ring-teal-600"
              />
            </div>

            <div className="pt-2 border-t border-slate-200 flex items-center justify-between">
              <div>
                <span className="text-xs font-bold text-slate-800 block">Published Status</span>
                <span className="text-[11px] text-slate-500">Visible on public portal</span>
              </div>
              <input
                type="checkbox"
                checked={formData.is_published ?? true}
                onChange={(e) => setFormData({ ...formData, is_published: e.target.checked })}
                className="w-5 h-5 accent-teal-600 rounded cursor-pointer"
              />
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
