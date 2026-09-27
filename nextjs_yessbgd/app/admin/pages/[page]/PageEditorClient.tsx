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
  const [jsonData, setJsonData] = useState(() => JSON.stringify(initialPage.data || {}, null, 2));
  const [activeTab, setActiveTab] = useState<"en" | "bn">("en");
  const [saving, setSaving] = useState(false);
  const [savedSuccess, setSavedSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleFormatJson = () => {
    try {
      const parsed = JSON.parse(jsonData);
      setJsonData(JSON.stringify(parsed, null, 2));
      setErrorMessage(null);
    } catch (e: any) {
      setErrorMessage("Cannot format: Invalid JSON (" + e.message + ")");
    }
  };

  const handleApplyTemplate = (type: "home" | "faqs" | "team" | "milestones") => {
    let tpl: any = {};
    if (type === "home") {
      tpl = {
        trust_credentials: [
          { label: "ISO-grade standards" },
          { label: "11+ years expertise" },
          { label: "98% client retention" },
          { label: "RJSC C-184920" },
        ],
        hero_coins: [
          { slug: "yess-soft", title: "Yess Soft", subtitle: "Enterprise Cloud & AI", badge: "Tier-1 Cloud Ready", href: "/ventures/yess-soft", image: "/coins/yess-soft.png" },
          { slug: "shondhaan", title: "Shondhaan", subtitle: "National Discovery", badge: "National Engine", href: "/ventures", image: "/coins/shondhaan.png" },
          { slug: "yess-organic-haat", title: "Organic Haat", subtitle: "Farm-to-Fork AgriTech", badge: "10,000+ Growers", href: "/ventures", image: "/coins/yess-organic-haat.png" },
          { slug: "akash-ott", title: "Akash OTT", subtitle: "Bengali Entertainment", badge: "HD Streaming", href: "/services/akash-ott", image: "/coins/akash-ott.png" },
        ],
        metrics: [
          { value: "৳250M+", label: "Sovereign Capital Deployed", desc: "Across 13 subsidiaries", color: "text-[#d4a359]" },
          { value: "500+", label: "Engineers & Specialists", desc: "Across 64 districts", color: "text-[#35b0aa]" },
        ],
        cta_banner: {
          eyebrow: "NATIONAL IMPACT",
          title: "Architecting the Sovereign Digital Future of Bangladesh",
          desc: "Partner with our Dhaka headquarters for bespoke enterprise engineering, venture building, and technology consultation.",
          primary_btn_text: "Schedule Strategic Consultation",
          primary_btn_href: "/contact",
          secondary_btn_text: "Candidate Status Portal",
          secondary_btn_href: "/application-status",
        },
      };
    } else if (type === "faqs") {
      tpl = {
        faqs: [
          { question: "What is the corporate mission of YESS Bangladesh?", answer: "YESS Bangladesh is a sovereign venture builder and enterprise studio empowering youth-led socioeconomic transformation.", category: "General" },
          { question: "How does YESS govern its subsidiaries?", answer: "All subsidiaries are governed under zero-trust operational protocols and statutory RJSC compliance.", category: "Governance" },
        ],
      };
    } else if (type === "team") {
      tpl = {
        team: [
          { name: "Executive Leader", role: "Managing Director & CEO", bio: "Over 15 years in enterprise architecture and strategic venture creation.", photo_url: "/team/ceo.webp" },
        ],
      };
    } else if (type === "milestones") {
      tpl = {
        milestones: [
          { year: "2018", title: "Incorporation & Founding", desc: "Established in Dhaka under statutory RJSC framework." },
          { year: "2024", title: "Scale to 13 Subsidiaries", desc: "Expanded across software, media, agri-tech, and trade." },
        ],
      };
    }
    setJsonData(JSON.stringify(tpl, null, 2));
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setErrorMessage(null);
    setSavedSuccess(false);

    let parsedData = pageData.data;
    if (jsonData.trim()) {
      try {
        parsedData = JSON.parse(jsonData);
      } catch (err: any) {
        setErrorMessage("Invalid JSON in Structured Page Data: " + err.message);
        setSaving(false);
        return;
      }
    }

    try {
      await updateSitePageAction(pageData.page, { ...pageData, data: parsedData });
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
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-200">
        <div className="flex items-center gap-3">
          <Link
            href="/admin/pages"
            className="p-2 rounded-xl bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 transition-all shadow-xs"
          >
            <ArrowLeft className="w-4 h-4" />
          </Link>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-teal-700 uppercase tracking-widest">
                PAGE EDITOR
              </span>
              <span className="text-xs font-mono px-2 py-0.5 rounded bg-slate-100 text-slate-700 border border-slate-200">
                {pageData.path}
              </span>
            </div>
            <h1 className="text-2xl font-extrabold text-slate-900 mt-0.5">
              Editing &ldquo;{pageData.name}&rdquo;
            </h1>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href={pageData.path}
            target="_blank"
            className="flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-slate-700 hover:text-slate-900 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 transition-colors shadow-xs"
          >
            <ExternalLink className="w-3.5 h-3.5 text-teal-700" />
            <span>Preview Live</span>
          </Link>
          <button
            onClick={handleSave}
            disabled={saving}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#008744] via-[#059669] to-[#0d6e6e] text-white text-xs font-bold shadow-md shadow-emerald-950/20 hover:opacity-90 transition-all disabled:opacity-50 cursor-pointer"
          >
            <Save className="w-4 h-4" />
            <span>{saving ? "Publishing Changes..." : "Save & Publish"}</span>
          </button>
        </div>
      </div>

      {savedSuccess && (
        <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center gap-3 text-emerald-800 text-xs font-semibold animate-in fade-in">
          <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
          <span>Page updated and cache revalidated successfully across the sovereign portal!</span>
        </div>
      )}

      {errorMessage && (
        <div className="p-4 rounded-xl bg-rose-50 border border-rose-200 flex items-center gap-3 text-rose-800 text-xs font-semibold">
          <AlertCircle className="w-5 h-5 text-rose-600 shrink-0" />
          <span>{errorMessage}</span>
        </div>
      )}

      {/* Language Switcher Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-200 pb-4">
        <button
          type="button"
          onClick={() => setActiveTab("en")}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
            activeTab === "en"
              ? "bg-[#0d6e6e] text-white shadow-md shadow-[#0d6e6e]/20"
              : "bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-900"
          }`}
        >
          <Globe className="w-3.5 h-3.5" />
          <span>English (Default)</span>
        </button>
        <button
          type="button"
          onClick={() => setActiveTab("bn")}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
            activeTab === "bn"
              ? "bg-[#0d6e6e] text-white shadow-md shadow-[#0d6e6e]/20"
              : "bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-900"
          }`}
        >
          <Globe className="w-3.5 h-3.5 text-amber-500" />
          <span>বাংলা (Bangla Translation)</span>
        </button>
      </div>

      {pageData.page === "contact" && (
        <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 text-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <span className="text-base">🏢</span>
            <span>
              <strong>Note on Office Locations &amp; Corporate Contact:</strong> Physical addresses, executive WhatsApp, and phone numbers are managed globally in{" "}
              <Link href="/admin/settings" className="font-bold underline text-amber-950 hover:text-black">
                Corporate Settings
              </Link>
              .
            </span>
          </div>
          <Link
            href="/admin/settings"
            className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-amber-200/80 hover:bg-amber-300 text-amber-950 font-bold text-[11px] shrink-0 transition-colors w-fit"
          >
            <span>Open Settings</span>
            <ExternalLink className="w-3 h-3" />
          </Link>
        </div>
      )}

      {/* Editor Form */}
      <form onSubmit={handleSave} className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Hero & Content (2 cols) */}
        <div className="lg:col-span-2 space-y-6">
          {/* Hero Section Card */}
          <div className="admin-glass-card rounded-2xl p-6 border border-slate-200 shadow-xs space-y-4">
            <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2 pb-3 border-b border-slate-100">
              <Sparkles className="w-4 h-4 text-teal-700" />
              <span>Hero Section Content</span>
            </h2>

            {activeTab === "en" ? (
              <>
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                    Hero Eyebrow (Gold Tagline)
                  </label>
                  <input
                    type="text"
                    value={pageData.hero_eyebrow || ""}
                    onChange={(e) => setPageData({ ...pageData, hero_eyebrow: e.target.value })}
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm text-slate-900 placeholder-slate-400 focus:bg-white focus:outline-none focus:border-teal-600 focus:ring-1 focus:ring-teal-600 transition-all shadow-xs"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                    Hero Title (Primary Headline)
                  </label>
                  <input
                    type="text"
                    value={pageData.hero_title || ""}
                    onChange={(e) => setPageData({ ...pageData, hero_title: e.target.value })}
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm text-slate-900 placeholder-slate-400 focus:bg-white focus:outline-none focus:border-teal-600 focus:ring-1 focus:ring-teal-600 transition-all shadow-xs"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                    Hero Subtitle (Lead Paragraph)
                  </label>
                  <textarea
                    rows={4}
                    value={pageData.hero_subtitle || ""}
                    onChange={(e) => setPageData({ ...pageData, hero_subtitle: e.target.value })}
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm text-slate-900 placeholder-slate-400 focus:bg-white focus:outline-none focus:border-teal-600 focus:ring-1 focus:ring-teal-600 transition-all shadow-xs"
                  />
                </div>
              </>
            ) : (
              <>
                <div>
                  <label className="block text-xs font-bold text-teal-800 uppercase tracking-wider mb-2">
                    হিরো আইব্রো (বাংলা)
                  </label>
                  <input
                    type="text"
                    value={pageData.hero_eyebrow_bn || ""}
                    onChange={(e) => setPageData({ ...pageData, hero_eyebrow_bn: e.target.value })}
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm text-slate-900 placeholder-slate-400 focus:bg-white focus:outline-none focus:border-teal-600 focus:ring-1 focus:ring-teal-600 transition-all shadow-xs"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-teal-800 uppercase tracking-wider mb-2">
                    হিরো শিরোনাম (বাংলা)
                  </label>
                  <input
                    type="text"
                    value={pageData.hero_title_bn || ""}
                    onChange={(e) => setPageData({ ...pageData, hero_title_bn: e.target.value })}
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm text-slate-900 placeholder-slate-400 focus:bg-white focus:outline-none focus:border-teal-600 focus:ring-1 focus:ring-teal-600 transition-all shadow-xs"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-teal-800 uppercase tracking-wider mb-2">
                    হিরো সাবটাইটেল (বাংলা বিবরণ)
                  </label>
                  <textarea
                    rows={4}
                    value={pageData.hero_subtitle_bn || ""}
                    onChange={(e) => setPageData({ ...pageData, hero_subtitle_bn: e.target.value })}
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm text-slate-900 placeholder-slate-400 focus:bg-white focus:outline-none focus:border-teal-600 focus:ring-1 focus:ring-teal-600 transition-all shadow-xs"
                  />
                </div>
              </>
            )}

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                Hero Background Image URL / CDN Path
              </label>
              <input
                type="text"
                value={pageData.hero_image || ""}
                onChange={(e) => setPageData({ ...pageData, hero_image: e.target.value })}
                placeholder="/assets/heroes/yess_bangla_hero_bg.png"
                className="w-full px-4 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm font-mono text-slate-800 focus:bg-white focus:outline-none focus:border-teal-600 focus:ring-1 focus:ring-teal-600 transition-all shadow-xs"
              />
            </div>
          </div>

          {/* Intro Body / Narrative Copy */}
          <div className="admin-glass-card rounded-2xl p-6 border border-slate-200 shadow-xs space-y-4">
            <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2 pb-3 border-b border-slate-100">
              <FileText className="w-4 h-4 text-teal-700" />
              <span>Introductory Prose & Narrative Block</span>
            </h2>

            {activeTab === "en" ? (
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                  Intro Body Copy (English)
                </label>
                <textarea
                  rows={5}
                  value={pageData.body || ""}
                  onChange={(e) => setPageData({ ...pageData, body: e.target.value })}
                  placeholder="Introductory body copy..."
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm text-slate-900 placeholder-slate-400 focus:bg-white focus:outline-none focus:border-teal-600 focus:ring-1 focus:ring-teal-600 transition-all shadow-xs"
                />
              </div>
            ) : (
              <div>
                <label className="block text-xs font-bold text-teal-800 uppercase tracking-wider mb-2">
                  ভূমিকা বিবরণ (বাংলা)
                </label>
                <textarea
                  rows={5}
                  value={pageData.body_bn || ""}
                  onChange={(e) => setPageData({ ...pageData, body_bn: e.target.value })}
                  placeholder="বাংলা ভূমিকা বিবরণ..."
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm text-slate-900 placeholder-slate-400 focus:bg-white focus:outline-none focus:border-teal-600 focus:ring-1 focus:ring-teal-600 transition-all shadow-xs"
                />
              </div>
            )}
          </div>

          {/* Structured Page Data (JSON) */}
          <div className="admin-glass-card rounded-2xl p-6 border border-slate-200 shadow-xs space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-100">
              <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-amber-600" />
                <span>Structured Section Data (JSON Schema)</span>
              </h2>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handleFormatJson}
                  className="px-2.5 py-1 text-[11px] font-bold rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors cursor-pointer"
                >
                  Beautify JSON
                </button>
                <span className="text-[11px] font-mono bg-slate-100 text-slate-600 px-2 py-0.5 rounded border border-slate-200">
                  jsonb
                </span>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <span className="text-[11px] font-semibold text-slate-500">Insert Template:</span>
              <button
                type="button"
                onClick={() => handleApplyTemplate("home")}
                className="px-2 py-0.5 text-[10px] font-bold rounded bg-teal-50 hover:bg-teal-100 text-teal-800 border border-teal-200 transition-colors cursor-pointer"
              >
                Home Sections
              </button>
              <button
                type="button"
                onClick={() => handleApplyTemplate("faqs")}
                className="px-2 py-0.5 text-[10px] font-bold rounded bg-teal-50 hover:bg-teal-100 text-teal-800 border border-teal-200 transition-colors cursor-pointer"
              >
                FAQ List
              </button>
              <button
                type="button"
                onClick={() => handleApplyTemplate("team")}
                className="px-2 py-0.5 text-[10px] font-bold rounded bg-teal-50 hover:bg-teal-100 text-teal-800 border border-teal-200 transition-colors cursor-pointer"
              >
                Team Members
              </button>
              <button
                type="button"
                onClick={() => handleApplyTemplate("milestones")}
                className="px-2 py-0.5 text-[10px] font-bold rounded bg-teal-50 hover:bg-teal-100 text-teal-800 border border-teal-200 transition-colors cursor-pointer"
              >
                Milestones
              </button>
            </div>

            <textarea
              rows={12}
              value={jsonData}
              onChange={(e) => setJsonData(e.target.value)}
              placeholder="{}"
              className="w-full font-mono text-xs p-4 bg-slate-900 text-emerald-400 rounded-xl border border-slate-800 focus:outline-none focus:ring-1 focus:ring-teal-500 shadow-inner"
              spellCheck={false}
            />
          </div>
        </div>

        {/* Right Column: SEO & Settings (1 col) */}
        <div className="space-y-6">
          <div className="admin-glass-card rounded-2xl p-6 border border-slate-200 shadow-xs space-y-4">
            <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2 pb-3 border-b border-slate-100">
              <Search className="w-4 h-4 text-emerald-600" />
              <span>Search Engine Optimization (SEO)</span>
            </h2>

            {activeTab === "en" ? (
              <>
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                    SEO Meta Title
                  </label>
                  <input
                    type="text"
                    value={pageData.seo_title || ""}
                    onChange={(e) => setPageData({ ...pageData, seo_title: e.target.value })}
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm text-slate-900 placeholder-slate-400 focus:bg-white focus:outline-none focus:border-teal-600 focus:ring-1 focus:ring-teal-600 transition-all shadow-xs"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                    SEO Meta Description
                  </label>
                  <textarea
                    rows={3}
                    value={pageData.seo_description || ""}
                    onChange={(e) => setPageData({ ...pageData, seo_description: e.target.value })}
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm text-slate-900 placeholder-slate-400 focus:bg-white focus:outline-none focus:border-teal-600 focus:ring-1 focus:ring-teal-600 transition-all shadow-xs"
                  />
                </div>
              </>
            ) : (
              <>
                <div>
                  <label className="block text-xs font-bold text-teal-800 uppercase tracking-wider mb-2">
                    এসইও টাইটেল (বাংলা)
                  </label>
                  <input
                    type="text"
                    value={pageData.seo_title_bn || ""}
                    onChange={(e) => setPageData({ ...pageData, seo_title_bn: e.target.value })}
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm text-slate-900 placeholder-slate-400 focus:bg-white focus:outline-none focus:border-teal-600 focus:ring-1 focus:ring-teal-600 transition-all shadow-xs"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-teal-800 uppercase tracking-wider mb-2">
                    এসইও বিবরণ (বাংলা)
                  </label>
                  <textarea
                    rows={3}
                    value={pageData.seo_description_bn || ""}
                    onChange={(e) => setPageData({ ...pageData, seo_description_bn: e.target.value })}
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm text-slate-900 placeholder-slate-400 focus:bg-white focus:outline-none focus:border-teal-600 focus:ring-1 focus:ring-teal-600 transition-all shadow-xs"
                  />
                </div>
              </>
            )}
          </div>

          <div className="admin-glass-card rounded-2xl p-6 border border-slate-200 shadow-xs space-y-4">
            <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider pb-3 border-b border-slate-100">
              Publishing Controls
            </h2>

            <div className="flex items-center justify-between">
              <div>
                <span className="text-xs font-bold text-slate-900 block">Published Status</span>
                <span className="text-[11px] text-slate-500">Make live on sovereign portal</span>
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
