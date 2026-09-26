"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { updateSitePageAction } from "@/app/admin/actions";
import {
  ArrowLeft,
  Save,
  CheckCircle2,
  Globe,
  Sparkles,
  FileText,
  Search,
  ExternalLink,
  AlertCircle,
} from "lucide-react";

export function PageEditorClient({ initialPage }: { initialPage: any }) {
  const router = useRouter();
  const [pageData, setPageData] = useState(initialPage);
  const [activeTab, setActiveTab] = useState<"en" | "bn">("en");
  const [saving, setSaving] = useState(false);
  const [savedSuccess, setSavedSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setErrorMessage(null);
    setSavedSuccess(false);

    try {
      await updateSitePageAction(pageData.page, pageData);
      setSavedSuccess(true);
      router.refresh();
      setTimeout(() => setSavedSuccess(false), 3000);
    } catch (err: any) {
      setErrorMessage(err.message || "Failed to update page.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/10">
        <div className="flex items-center gap-3">
          <Link
            href="/admin/pages"
            className="p-2 rounded-xl bg-white/5 border border-white/10 text-slate-300 hover:text-white hover:bg-white/10 transition-all"
          >
            <ArrowLeft className="w-4 h-4" />
          </Link>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-[#d4a359] uppercase tracking-widest">
                PAGE EDITOR
              </span>
              <span className="text-xs font-mono px-2 py-0.5 rounded bg-white/10 text-slate-300">
                {pageData.path}
              </span>
            </div>
            <h1 className="text-2xl font-extrabold text-white mt-0.5">
              Editing &ldquo;{pageData.name}&rdquo;
            </h1>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href={pageData.path}
            target="_blank"
            className="flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-slate-300 hover:text-white bg-white/5 border border-white/10 rounded-xl transition-colors"
          >
            <ExternalLink className="w-3.5 h-3.5 text-[#d4a359]" />
            <span>Preview Live</span>
          </Link>
          <button
            onClick={handleSave}
            disabled={saving}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#0d6e6e] to-[#35b0aa] text-white text-xs font-bold shadow-lg shadow-[#0d6e6e]/20 hover:opacity-90 transition-all disabled:opacity-50"
          >
            <Save className="w-4 h-4" />
            <span>{saving ? "Publishing Changes..." : "Save & Publish"}</span>
          </button>
        </div>
      </div>

      {savedSuccess && (
        <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center gap-3 text-emerald-300 text-xs font-semibold animate-in fade-in">
          <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
          <span>Page updated and cache revalidated successfully across the sovereign portal!</span>
        </div>
      )}

      {errorMessage && (
        <div className="p-4 rounded-xl bg-rose-500/10 border border-rose-500/30 flex items-center gap-3 text-rose-300 text-xs font-semibold">
          <AlertCircle className="w-5 h-5 text-rose-400 shrink-0" />
          <span>{errorMessage}</span>
        </div>
      )}

      {/* Language Switcher Tabs */}
      <div className="flex items-center gap-2 border-b border-white/10 pb-4">
        <button
          type="button"
          onClick={() => setActiveTab("en")}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
            activeTab === "en"
              ? "bg-[#0d6e6e] text-white shadow-md shadow-[#0d6e6e]/30"
              : "bg-white/5 text-slate-400 hover:text-white"
          }`}
        >
          <Globe className="w-3.5 h-3.5" />
          <span>English (Default)</span>
        </button>
        <button
          type="button"
          onClick={() => setActiveTab("bn")}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
            activeTab === "bn"
              ? "bg-[#0d6e6e] text-white shadow-md shadow-[#0d6e6e]/30"
              : "bg-white/5 text-slate-400 hover:text-white"
          }`}
        >
          <Globe className="w-3.5 h-3.5 text-[#d4a359]" />
          <span>বাংলা (Bangla Translation)</span>
        </button>
      </div>

      {/* Editor Form */}
      <form onSubmit={handleSave} className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Hero & Content (2 cols) */}
        <div className="lg:col-span-2 space-y-6">
          {/* Hero Section Card */}
          <div className="admin-glass-card rounded-2xl p-6 border border-white/10 space-y-4">
            <h2 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2 pb-3 border-b border-white/10">
              <Sparkles className="w-4 h-4 text-[#d4a359]" />
              <span>Hero Section Content</span>
            </h2>

            {activeTab === "en" ? (
              <>
                <div>
                  <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
                    Hero Eyebrow (Gold Tagline)
                  </label>
                  <input
                    type="text"
                    value={pageData.hero_eyebrow || ""}
                    onChange={(e) => setPageData({ ...pageData, hero_eyebrow: e.target.value })}
                    className="w-full px-4 py-2.5 bg-black/40 border border-white/10 rounded-xl text-sm text-white focus:outline-none focus:border-[#35b0aa]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
                    Hero Title (Primary Headline)
                  </label>
                  <input
                    type="text"
                    value={pageData.hero_title || ""}
                    onChange={(e) => setPageData({ ...pageData, hero_title: e.target.value })}
                    className="w-full px-4 py-2.5 bg-black/40 border border-white/10 rounded-xl text-sm text-white focus:outline-none focus:border-[#35b0aa]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
                    Hero Subtitle (Lead Paragraph)
                  </label>
                  <textarea
                    rows={4}
                    value={pageData.hero_subtitle || ""}
                    onChange={(e) => setPageData({ ...pageData, hero_subtitle: e.target.value })}
                    className="w-full px-4 py-2.5 bg-black/40 border border-white/10 rounded-xl text-sm text-white focus:outline-none focus:border-[#35b0aa]"
                  />
                </div>
              </>
            ) : (
              <>
                <div>
                  <label className="block text-xs font-bold text-[#d4a359] uppercase tracking-wider mb-2">
                    হিরো আইব্রো (বাংলা)
                  </label>
                  <input
                    type="text"
                    value={pageData.hero_eyebrow_bn || ""}
                    onChange={(e) => setPageData({ ...pageData, hero_eyebrow_bn: e.target.value })}
                    className="w-full px-4 py-2.5 bg-black/40 border border-white/10 rounded-xl text-sm text-white focus:outline-none focus:border-[#35b0aa]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#d4a359] uppercase tracking-wider mb-2">
                    হিরো শিরোনাম (বাংলা)
                  </label>
                  <input
                    type="text"
                    value={pageData.hero_title_bn || ""}
                    onChange={(e) => setPageData({ ...pageData, hero_title_bn: e.target.value })}
                    className="w-full px-4 py-2.5 bg-black/40 border border-white/10 rounded-xl text-sm text-white focus:outline-none focus:border-[#35b0aa]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#d4a359] uppercase tracking-wider mb-2">
                    হিরো সাবটাইটেল (বাংলা বিবরণ)
                  </label>
                  <textarea
                    rows={4}
                    value={pageData.hero_subtitle_bn || ""}
                    onChange={(e) => setPageData({ ...pageData, hero_subtitle_bn: e.target.value })}
                    className="w-full px-4 py-2.5 bg-black/40 border border-white/10 rounded-xl text-sm text-white focus:outline-none focus:border-[#35b0aa]"
                  />
                </div>
              </>
            )}

            <div>
              <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
                Hero Background Image URL / CDN Path
              </label>
              <input
                type="text"
                value={pageData.hero_image || ""}
                onChange={(e) => setPageData({ ...pageData, hero_image: e.target.value })}
                placeholder="/assets/heroes/yess_bangla_hero_bg.png"
                className="w-full px-4 py-2.5 bg-black/40 border border-white/10 rounded-xl text-sm font-mono text-slate-300 focus:outline-none focus:border-[#35b0aa]"
              />
            </div>
          </div>

          {/* Intro Body / Narrative Copy */}
          <div className="admin-glass-card rounded-2xl p-6 border border-white/10 space-y-4">
            <h2 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2 pb-3 border-b border-white/10">
              <FileText className="w-4 h-4 text-[#35b0aa]" />
              <span>Introductory Prose & Narrative Block</span>
            </h2>

            {activeTab === "en" ? (
              <div>
                <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
                  Intro Body Copy (English)
                </label>
                <textarea
                  rows={5}
                  value={pageData.body || ""}
                  onChange={(e) => setPageData({ ...pageData, body: e.target.value })}
                  placeholder="Introductory body copy..."
                  className="w-full px-4 py-2.5 bg-black/40 border border-white/10 rounded-xl text-sm text-white focus:outline-none focus:border-[#35b0aa]"
                />
              </div>
            ) : (
              <div>
                <label className="block text-xs font-bold text-[#d4a359] uppercase tracking-wider mb-2">
                  ভূমিকা বিবরণ (বাংলা)
                </label>
                <textarea
                  rows={5}
                  value={pageData.body_bn || ""}
                  onChange={(e) => setPageData({ ...pageData, body_bn: e.target.value })}
                  placeholder="বাংলা ভূমিকা বিবরণ..."
                  className="w-full px-4 py-2.5 bg-black/40 border border-white/10 rounded-xl text-sm text-white focus:outline-none focus:border-[#35b0aa]"
                />
              </div>
            )}
          </div>
        </div>

        {/* Right Column: SEO & Settings (1 col) */}
        <div className="space-y-6">
          <div className="admin-glass-card rounded-2xl p-6 border border-white/10 space-y-4">
            <h2 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2 pb-3 border-b border-white/10">
              <Search className="w-4 h-4 text-emerald-400" />
              <span>Search Engine Optimization (SEO)</span>
            </h2>

            {activeTab === "en" ? (
              <>
                <div>
                  <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
                    SEO Meta Title
                  </label>
                  <input
                    type="text"
                    value={pageData.seo_title || ""}
                    onChange={(e) => setPageData({ ...pageData, seo_title: e.target.value })}
                    className="w-full px-4 py-2.5 bg-black/40 border border-white/10 rounded-xl text-sm text-white focus:outline-none focus:border-[#35b0aa]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
                    SEO Meta Description
                  </label>
                  <textarea
                    rows={3}
                    value={pageData.seo_description || ""}
                    onChange={(e) => setPageData({ ...pageData, seo_description: e.target.value })}
                    className="w-full px-4 py-2.5 bg-black/40 border border-white/10 rounded-xl text-sm text-white focus:outline-none focus:border-[#35b0aa]"
                  />
                </div>
              </>
            ) : (
              <>
                <div>
                  <label className="block text-xs font-bold text-[#d4a359] uppercase tracking-wider mb-2">
                    এসইও টাইটেল (বাংলা)
                  </label>
                  <input
                    type="text"
                    value={pageData.seo_title_bn || ""}
                    onChange={(e) => setPageData({ ...pageData, seo_title_bn: e.target.value })}
                    className="w-full px-4 py-2.5 bg-black/40 border border-white/10 rounded-xl text-sm text-white focus:outline-none focus:border-[#35b0aa]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#d4a359] uppercase tracking-wider mb-2">
                    এসইও বিবরণ (বাংলা)
                  </label>
                  <textarea
                    rows={3}
                    value={pageData.seo_description_bn || ""}
                    onChange={(e) => setPageData({ ...pageData, seo_description_bn: e.target.value })}
                    className="w-full px-4 py-2.5 bg-black/40 border border-white/10 rounded-xl text-sm text-white focus:outline-none focus:border-[#35b0aa]"
                  />
                </div>
              </>
            )}
          </div>

          <div className="admin-glass-card rounded-2xl p-6 border border-white/10 space-y-4">
            <h2 className="text-sm font-bold text-white uppercase tracking-wider pb-3 border-b border-white/10">
              Publishing Controls
            </h2>

            <div className="flex items-center justify-between">
              <div>
                <span className="text-xs font-bold text-slate-200 block">Published Status</span>
                <span className="text-[11px] text-slate-400">Make live on sovereign portal</span>
              </div>
              <input
                type="checkbox"
                checked={pageData.is_published ?? true}
                onChange={(e) => setPageData({ ...pageData, is_published: e.target.checked })}
                className="w-5 h-5 accent-[#0d6e6e] rounded cursor-pointer"
              />
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
