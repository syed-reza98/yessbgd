"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase/client";
import { saveSettingAction } from "@/app/admin/actions";
import {
  Settings,
  Save,
  CheckCircle2,
  Building2,
  Phone,
  Mail,
  MapPin,
  Globe,
  Share2,
  Sparkles,
  LayoutTemplate,
  Sliders,
  ShieldCheck,
  ExternalLink,
} from "lucide-react";

type TabKey = "branding" | "contact" | "offices" | "socials" | "header" | "footer";

export default function SiteSettingsPage() {
  const [activeTab, setActiveTab] = useState<TabKey>("branding");

  const [branding, setBranding] = useState<any>({
    companyName: "YESS Bangladesh",
    companyNameBn: "ইয়েস বাংলাদেশ",
    legalName: "Yess Bangla Private Limited",
    registrationNo: "C-184920",
    logoUrl: "/assets/logos/yess-bangla-logo.png",
    letterheadUrl: "/assets/logos/yess-bangla-letterhead.jpeg",
    faviconUrl: "/favicon.png",
  });

  const [contact, setContact] = useState<any>({
    phone: "+880 1805-464343",
    email: "yessbangla.bd@gmail.com",
    investEmail: "invest@yessbgd.com",
    careersEmail: "careers@yessbgd.com",
    whatsapp: "+880 1805-464343",
    address: "Block-A, Road-3, House-127 (Green View), 1st Floor, Mirpur-12, Dhaka-1216",
    addressBn: "ব্লক-এ, রোড-৩, হাউজ-১২৭ (গ্রিন ভিউ), ১ম তলা, মিরপুর-১২, ঢাকা-১২১৬",
  });

  const [offices, setOffices] = useState<any>({
    motijheel: {
      name: "Corporate Headquarters",
      nameBn: "কর্পোরেট হেডকোয়ার্টার",
      address: "Jiban Bima Bhaban, Level 14, 10 Dilkusha C/A, Motijheel, Dhaka-1000",
      badge: "Statutory & Board",
      hours: "BST 09:00 - 18:00 (Sun - Thu)",
      lat: 23.7289,
      lng: 90.4184,
    },
    gulshan: {
      name: "Innovation & Delivery Labs",
      nameBn: "ইনোভেশন ও ডেলিভারি ল্যাব",
      address: "Road 134, Gulshan-2, Dhaka-1212",
      badge: "NOC / SRE Hub",
      hours: "24/7 Operations",
      lat: 23.7925,
      lng: 90.4078,
    },
  });

  const [socials, setSocials] = useState<any>({
    twitter: "https://x.com/yessbangla",
    youtube: "https://youtube.com/@yessbangla",
    facebook: "https://facebook.com/yessbangla",
    linkedin: "https://linkedin.com/company/yessbangla",
  });

  const [header, setHeader] = useState<any>({
    ribbonTextEn: "Dhaka BST Operational",
    ribbonTextBn: "ঢাকা বিএসটি কার্যকর",
    ribbonCtaTextEn: "Let's Talk",
    ribbonCtaTextBn: "যোগাযোগ করুন",
    ribbonCtaHref: "/contact",
    trackStatusTextEn: "Track Application",
    trackStatusTextBn: "আবেদনের অগ্রগতি",
    trackStatusHref: "/application-status",
  });

  const [footer, setFooter] = useState<any>({
    missionNarrativeEn: "Pioneering institutional venture building, engineering resilient technological backbone infrastructures, and empowering youth-led socioeconomic transformation across South Asia.",
    missionNarrativeBn: "প্রাতিষ্ঠানিক ভেঞ্চার গঠন, টেকসই প্রযুক্তিগত ব্যাকবোন অবকাঠামো প্রকৌশল এবং দক্ষিণ এশিয়া জুড়ে যুব-নেতৃত্বাধীন আর্থ-সামাজিক রূপান্তরকে ক্ষমতায়ন করা।",
    newsletterTitleEn: "Headquarters & Insights",
    newsletterTitleBn: "হেডকোয়ার্টার এবং গবেষণা অন্তর্দৃষ্টি",
    newsletterDescEn: "Quarterly macro research, policy briefings, and sovereign technology dispatches delivered to institutional partners.",
    newsletterDescBn: "প্রাতিষ্ঠানিক অংশীদারদের জন্য ত্রৈমাসিক ম্যাক্রো গবেষণা, নীতিগত ব্রিফিং এবং প্রযুক্তির বার্তা।",
    candidateTrackerLabelEn: "Candidate Application Tracker →",
    candidateTrackerLabelBn: "প্রার্থী আবেদন ট্র্যাকার →",
    candidateTrackerHref: "/application-status",
    colTitles: {
      ventures: "Ventures",
      governance: "Governance",
      headquarters: "Headquarters & Insights",
    },
  });

  const [saving, setSaving] = useState(false);
  const [savedSuccess, setSavedSuccess] = useState(false);

  useEffect(() => {
    supabase
      .from("cms_settings")
      .select("*")
      .then(({ data }) => {
        if (data) {
          const brand = data.find((s) => s.key === "branding");
          const cont = data.find((s) => s.key === "contact");
          const off = data.find((s) => s.key === "offices");
          const soc = data.find((s) => s.key === "socials");
          const hdr = data.find((s) => s.key === "header");
          const ftr = data.find((s) => s.key === "footer");

          if (brand) setBranding((prev: any) => ({ ...prev, ...brand.value }));
          if (cont) setContact((prev: any) => ({ ...prev, ...cont.value }));
          if (off) setOffices((prev: any) => ({ ...prev, ...off.value }));
          if (soc) setSocials((prev: any) => ({ ...prev, ...soc.value }));
          if (hdr) setHeader((prev: any) => ({ ...prev, ...hdr.value }));
          if (ftr) setFooter((prev: any) => ({ ...prev, ...ftr.value }));
        }
      });
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setSavedSuccess(false);
    try {
      await saveSettingAction("branding", branding, "Branding & Logos", "branding");
      await saveSettingAction("contact", contact, "Corporate Contact Desks", "contact");
      await saveSettingAction("offices", offices, "Dual Office Network", "locations");
      await saveSettingAction("socials", socials, "Social Media Channels", "social");
      await saveSettingAction("header", header, "Header Global Configuration", "navigation");
      await saveSettingAction("footer", footer, "Footer Global Configuration", "general");

      setSavedSuccess(true);
      setTimeout(() => setSavedSuccess(false), 3000);
    } catch (err: any) {
      alert(err.message || "Failed to save settings.");
    } finally {
      setSaving(false);
    }
  };

  const tabs: { key: TabKey; label: string; icon: any }[] = [
    { key: "branding", label: "Branding & Identity", icon: Sparkles },
    { key: "contact", label: "Contact Desks", icon: Phone },
    { key: "offices", label: "Dual Offices", icon: Building2 },
    { key: "socials", label: "Social Networks", icon: Share2 },
    { key: "header", label: "Header Configuration", icon: LayoutTemplate },
    { key: "footer", label: "Footer Configuration", icon: Sliders },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-200">
        <div>
          <span className="text-xs font-bold text-amber-600 uppercase tracking-widest">
            CORPORATE CONFIGURATION & IDENTITY
          </span>
          <h1 className="text-3xl font-extrabold text-slate-900 mt-1">Site Settings & Global Shell</h1>
          <p className="text-sm text-slate-500 mt-1">
            Global corporate identity, statutory registration, official contact desks, dual offices, and header/footer configurations.
          </p>
        </div>

        <button
          onClick={handleSave}
          disabled={saving}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-teal-700 to-teal-600 text-white text-xs font-bold shadow-md shadow-teal-700/20 hover:opacity-95 transition-all disabled:opacity-50 cursor-pointer"
        >
          <Save className="w-4 h-4" />
          <span>{saving ? "Saving All Settings..." : "Save All Settings"}</span>
        </button>
      </div>

      {savedSuccess && (
        <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center gap-3 text-emerald-800 text-xs font-semibold animate-in fade-in">
          <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
          <span>All 6 corporate settings updated and cache revalidated across the sovereign portal!</span>
        </div>
      )}

      {/* Tabs Navigation */}
      <div className="flex flex-wrap items-center gap-2 border-b border-slate-200 pb-3">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.key;
          return (
            <button
              key={tab.key}
              type="button"
              onClick={() => setActiveTab(tab.key)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                isActive
                  ? "bg-teal-700 text-white shadow-sm"
                  : "bg-white border border-slate-200 text-slate-600 hover:text-slate-900 hover:bg-slate-50"
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      <form onSubmit={handleSave} className="space-y-6">
        {/* TAB 1: BRANDING */}
        {activeTab === "branding" && (
          <div className="admin-glass-card rounded-2xl p-6 border border-slate-200 shadow-xs space-y-6 animate-in fade-in">
            <div className="flex items-center gap-2 pb-4 border-b border-slate-100">
              <Sparkles className="w-5 h-5 text-amber-600" />
              <h2 className="text-base font-bold text-slate-900">Corporate Identity & Trademarks</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                  Company Name (EN)
                </label>
                <input
                  type="text"
                  value={branding.companyName || ""}
                  onChange={(e) => setBranding({ ...branding, companyName: e.target.value })}
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm font-semibold text-slate-900 focus:bg-white focus:outline-none focus:border-teal-600 shadow-xs"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                  কোম্পানির নাম (বাংলা)
                </label>
                <input
                  type="text"
                  value={branding.companyNameBn || ""}
                  onChange={(e) => setBranding({ ...branding, companyNameBn: e.target.value })}
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm font-semibold text-slate-900 focus:bg-white focus:outline-none focus:border-teal-600 shadow-xs"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                  Statutory Registered Legal Name
                </label>
                <input
                  type="text"
                  value={branding.legalName || ""}
                  onChange={(e) => setBranding({ ...branding, legalName: e.target.value })}
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm font-semibold text-slate-900 focus:bg-white focus:outline-none focus:border-teal-600 shadow-xs"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                  RJSC Registration No.
                </label>
                <input
                  type="text"
                  value={branding.registrationNo || ""}
                  onChange={(e) => setBranding({ ...branding, registrationNo: e.target.value })}
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm font-semibold text-slate-900 focus:bg-white focus:outline-none focus:border-teal-600 shadow-xs"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                  Logo Asset URL
                </label>
                <input
                  type="text"
                  value={branding.logoUrl || ""}
                  onChange={(e) => setBranding({ ...branding, logoUrl: e.target.value })}
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm text-slate-900 focus:bg-white focus:outline-none focus:border-teal-600 shadow-xs font-mono text-xs"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                  Favicon Asset URL
                </label>
                <input
                  type="text"
                  value={branding.faviconUrl || ""}
                  onChange={(e) => setBranding({ ...branding, faviconUrl: e.target.value })}
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm text-slate-900 focus:bg-white focus:outline-none focus:border-teal-600 shadow-xs font-mono text-xs"
                />
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: CONTACT DESKS */}
        {activeTab === "contact" && (
          <div className="admin-glass-card rounded-2xl p-6 border border-slate-200 shadow-xs space-y-6 animate-in fade-in">
            <div className="flex items-center gap-2 pb-4 border-b border-slate-100">
              <Phone className="w-5 h-5 text-teal-700" />
              <h2 className="text-base font-bold text-slate-900">Corporate Contact & Direct Intake Desks</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                  Primary Corporate Phone
                </label>
                <input
                  type="text"
                  value={contact.phone || ""}
                  onChange={(e) => setContact({ ...contact, phone: e.target.value })}
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm text-slate-900 focus:bg-white focus:outline-none focus:border-teal-600 shadow-xs"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                  Corporate WhatsApp
                </label>
                <input
                  type="text"
                  value={contact.whatsapp || ""}
                  onChange={(e) => setContact({ ...contact, whatsapp: e.target.value })}
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm text-slate-900 focus:bg-white focus:outline-none focus:border-teal-600 shadow-xs"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                  General Secretariat Email
                </label>
                <input
                  type="email"
                  value={contact.email || ""}
                  onChange={(e) => setContact({ ...contact, email: e.target.value })}
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm text-slate-900 focus:bg-white focus:outline-none focus:border-teal-600 shadow-xs"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                  Capital & Institutional Investor Email
                </label>
                <input
                  type="email"
                  value={contact.investEmail || ""}
                  onChange={(e) => setContact({ ...contact, investEmail: e.target.value })}
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm text-slate-900 focus:bg-white focus:outline-none focus:border-teal-600 shadow-xs"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                  Talent & Careers Intake Email
                </label>
                <input
                  type="email"
                  value={contact.careersEmail || ""}
                  onChange={(e) => setContact({ ...contact, careersEmail: e.target.value })}
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm text-slate-900 focus:bg-white focus:outline-none focus:border-teal-600 shadow-xs"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                  Registered Corporate Address (EN)
                </label>
                <input
                  type="text"
                  value={contact.address || ""}
                  onChange={(e) => setContact({ ...contact, address: e.target.value })}
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm text-slate-900 focus:bg-white focus:outline-none focus:border-teal-600 shadow-xs"
                />
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: DUAL OFFICES */}
        {activeTab === "offices" && (
          <div className="space-y-6 animate-in fade-in">
            {/* Motijheel Corporate HQ */}
            <div className="admin-glass-card rounded-2xl p-6 border border-slate-200 shadow-xs space-y-4">
              <div className="flex items-center gap-2 pb-3 border-b border-slate-100">
                <Building2 className="w-5 h-5 text-amber-600" />
                <h2 className="text-base font-bold text-slate-900">Motijheel Corporate Headquarters (Dhaka HQ)</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                    Office Name (EN)
                  </label>
                  <input
                    type="text"
                    value={offices?.motijheel?.name || ""}
                    onChange={(e) =>
                      setOffices({
                        ...offices,
                        motijheel: { ...offices?.motijheel, name: e.target.value },
                      })
                    }
                    className="w-full px-4 py-2 bg-slate-50 border border-slate-300 rounded-xl text-sm text-slate-900 focus:bg-white"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                    অফিসের নাম (বাংলা)
                  </label>
                  <input
                    type="text"
                    value={offices?.motijheel?.nameBn || ""}
                    onChange={(e) =>
                      setOffices({
                        ...offices,
                        motijheel: { ...offices?.motijheel, nameBn: e.target.value },
                      })
                    }
                    className="w-full px-4 py-2 bg-slate-50 border border-slate-300 rounded-xl text-sm text-slate-900 focus:bg-white"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                    Physical Address
                  </label>
                  <input
                    type="text"
                    value={offices?.motijheel?.address || ""}
                    onChange={(e) =>
                      setOffices({
                        ...offices,
                        motijheel: { ...offices?.motijheel, address: e.target.value },
                      })
                    }
                    className="w-full px-4 py-2 bg-slate-50 border border-slate-300 rounded-xl text-sm text-slate-900 focus:bg-white"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                    Badge Label
                  </label>
                  <input
                    type="text"
                    value={offices?.motijheel?.badge || ""}
                    onChange={(e) =>
                      setOffices({
                        ...offices,
                        motijheel: { ...offices?.motijheel, badge: e.target.value },
                      })
                    }
                    className="w-full px-4 py-2 bg-slate-50 border border-slate-300 rounded-xl text-sm text-slate-900 focus:bg-white"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                    Operating Hours
                  </label>
                  <input
                    type="text"
                    value={offices?.motijheel?.hours || ""}
                    onChange={(e) =>
                      setOffices({
                        ...offices,
                        motijheel: { ...offices?.motijheel, hours: e.target.value },
                      })
                    }
                    className="w-full px-4 py-2 bg-slate-50 border border-slate-300 rounded-xl text-sm text-slate-900 focus:bg-white"
                  />
                </div>
              </div>
            </div>

            {/* Gulshan Innovation Wing */}
            <div className="admin-glass-card rounded-2xl p-6 border border-slate-200 shadow-xs space-y-4">
              <div className="flex items-center gap-2 pb-3 border-b border-slate-100">
                <Building2 className="w-5 h-5 text-teal-700" />
                <h2 className="text-base font-bold text-slate-900">Gulshan Regional Innovation Lab (NOC / SRE)</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                    Office Name (EN)
                  </label>
                  <input
                    type="text"
                    value={offices?.gulshan?.name || ""}
                    onChange={(e) =>
                      setOffices({
                        ...offices,
                        gulshan: { ...offices?.gulshan, name: e.target.value },
                      })
                    }
                    className="w-full px-4 py-2 bg-slate-50 border border-slate-300 rounded-xl text-sm text-slate-900 focus:bg-white"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                    অফিসের নাম (বাংলা)
                  </label>
                  <input
                    type="text"
                    value={offices?.gulshan?.nameBn || ""}
                    onChange={(e) =>
                      setOffices({
                        ...offices,
                        gulshan: { ...offices?.gulshan, nameBn: e.target.value },
                      })
                    }
                    className="w-full px-4 py-2 bg-slate-50 border border-slate-300 rounded-xl text-sm text-slate-900 focus:bg-white"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                    Physical Address
                  </label>
                  <input
                    type="text"
                    value={offices?.gulshan?.address || ""}
                    onChange={(e) =>
                      setOffices({
                        ...offices,
                        gulshan: { ...offices?.gulshan, address: e.target.value },
                      })
                    }
                    className="w-full px-4 py-2 bg-slate-50 border border-slate-300 rounded-xl text-sm text-slate-900 focus:bg-white"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                    Badge Label
                  </label>
                  <input
                    type="text"
                    value={offices?.gulshan?.badge || ""}
                    onChange={(e) =>
                      setOffices({
                        ...offices,
                        gulshan: { ...offices?.gulshan, badge: e.target.value },
                      })
                    }
                    className="w-full px-4 py-2 bg-slate-50 border border-slate-300 rounded-xl text-sm text-slate-900 focus:bg-white"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                    Operating Hours
                  </label>
                  <input
                    type="text"
                    value={offices?.gulshan?.hours || ""}
                    onChange={(e) =>
                      setOffices({
                        ...offices,
                        gulshan: { ...offices?.gulshan, hours: e.target.value },
                      })
                    }
                    className="w-full px-4 py-2 bg-slate-50 border border-slate-300 rounded-xl text-sm text-slate-900 focus:bg-white"
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 4: SOCIAL CHANNELS */}
        {activeTab === "socials" && (
          <div className="admin-glass-card rounded-2xl p-6 border border-slate-200 shadow-xs space-y-6 animate-in fade-in">
            <div className="flex items-center gap-2 pb-4 border-b border-slate-100">
              <Share2 className="w-5 h-5 text-indigo-600" />
              <h2 className="text-base font-bold text-slate-900">Official Social & Communications Corridors</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                  LinkedIn URL
                </label>
                <input
                  type="url"
                  value={socials.linkedin || ""}
                  onChange={(e) => setSocials({ ...socials, linkedin: e.target.value })}
                  placeholder="https://linkedin.com/company/yessbangla"
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm text-slate-900 focus:bg-white focus:outline-none focus:border-teal-600 shadow-xs"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                  X (Twitter) URL
                </label>
                <input
                  type="url"
                  value={socials.twitter || ""}
                  onChange={(e) => setSocials({ ...socials, twitter: e.target.value })}
                  placeholder="https://x.com/yessbangla"
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm text-slate-900 focus:bg-white focus:outline-none focus:border-teal-600 shadow-xs"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                  YouTube Channel URL
                </label>
                <input
                  type="url"
                  value={socials.youtube || ""}
                  onChange={(e) => setSocials({ ...socials, youtube: e.target.value })}
                  placeholder="https://youtube.com/@yessbangla"
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm text-slate-900 focus:bg-white focus:outline-none focus:border-teal-600 shadow-xs"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                  Facebook Page URL
                </label>
                <input
                  type="url"
                  value={socials.facebook || ""}
                  onChange={(e) => setSocials({ ...socials, facebook: e.target.value })}
                  placeholder="https://facebook.com/yessbangla"
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm text-slate-900 focus:bg-white focus:outline-none focus:border-teal-600 shadow-xs"
                />
              </div>
            </div>
          </div>
        )}

        {/* TAB 5: HEADER CONFIG */}
        {activeTab === "header" && (
          <div className="admin-glass-card rounded-2xl p-6 border border-slate-200 shadow-xs space-y-6 animate-in fade-in">
            <div className="flex items-center gap-2 pb-4 border-b border-slate-100">
              <LayoutTemplate className="w-5 h-5 text-teal-700" />
              <h2 className="text-base font-bold text-slate-900">Global Header & Utility Ribbon Settings</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                  Top Ribbon Operational Status (EN)
                </label>
                <input
                  type="text"
                  value={header.ribbonTextEn || ""}
                  onChange={(e) => setHeader({ ...header, ribbonTextEn: e.target.value })}
                  placeholder="Dhaka BST Operational"
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm text-slate-900 focus:bg-white"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                  টপ রিবন স্ট্যাটাস (বাংলা)
                </label>
                <input
                  type="text"
                  value={header.ribbonTextBn || ""}
                  onChange={(e) => setHeader({ ...header, ribbonTextBn: e.target.value })}
                  placeholder="ঢাকা বিএসটি কার্যকর"
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm text-slate-900 focus:bg-white"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                  Header CTA Button Text (EN)
                </label>
                <input
                  type="text"
                  value={header.ribbonCtaTextEn || ""}
                  onChange={(e) => setHeader({ ...header, ribbonCtaTextEn: e.target.value })}
                  placeholder="Let's Talk"
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm text-slate-900 focus:bg-white"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                  হেডার বাটন টেক্সট (বাংলা)
                </label>
                <input
                  type="text"
                  value={header.ribbonCtaTextBn || ""}
                  onChange={(e) => setHeader({ ...header, ribbonCtaTextBn: e.target.value })}
                  placeholder="যোগাযোগ করুন"
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm text-slate-900 focus:bg-white"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                  Header CTA Target Route (href)
                </label>
                <input
                  type="text"
                  value={header.ribbonCtaHref || ""}
                  onChange={(e) => setHeader({ ...header, ribbonCtaHref: e.target.value })}
                  placeholder="/contact"
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm text-slate-900 focus:bg-white font-mono text-xs"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                  Status Tracker Link Label (EN)
                </label>
                <input
                  type="text"
                  value={header.trackStatusTextEn || ""}
                  onChange={(e) => setHeader({ ...header, trackStatusTextEn: e.target.value })}
                  placeholder="Track Application"
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm text-slate-900 focus:bg-white"
                />
              </div>
            </div>
          </div>
        )}

        {/* TAB 6: FOOTER CONFIG */}
        {activeTab === "footer" && (
          <div className="admin-glass-card rounded-2xl p-6 border border-slate-200 shadow-xs space-y-6 animate-in fade-in">
            <div className="flex items-center gap-2 pb-4 border-b border-slate-100">
              <Sliders className="w-5 h-5 text-emerald-600" />
              <h2 className="text-base font-bold text-slate-900">Global Footer Narrative & Section Headings</h2>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                  Brand Mission Narrative (English)
                </label>
                <textarea
                  rows={3}
                  value={footer.missionNarrativeEn || ""}
                  onChange={(e) => setFooter({ ...footer, missionNarrativeEn: e.target.value })}
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm text-slate-900 focus:bg-white leading-relaxed"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-teal-800 uppercase tracking-wider mb-2">
                  ব্র্যান্ড মিশন বিবরণী (বাংলা)
                </label>
                <textarea
                  rows={3}
                  value={footer.missionNarrativeBn || ""}
                  onChange={(e) => setFooter({ ...footer, missionNarrativeBn: e.target.value })}
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm text-slate-900 focus:bg-white leading-relaxed"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                    Column 1 Title (Ventures)
                  </label>
                  <input
                    type="text"
                    value={footer.colTitles?.ventures || ""}
                    onChange={(e) =>
                      setFooter({
                        ...footer,
                        colTitles: { ...footer.colTitles, ventures: e.target.value },
                      })
                    }
                    placeholder="Ventures"
                    className="w-full px-4 py-2 bg-slate-50 border border-slate-300 rounded-xl text-sm text-slate-900 focus:bg-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                    Column 2 Title (Governance)
                  </label>
                  <input
                    type="text"
                    value={footer.colTitles?.governance || ""}
                    onChange={(e) =>
                      setFooter({
                        ...footer,
                        colTitles: { ...footer.colTitles, governance: e.target.value },
                      })
                    }
                    placeholder="Governance"
                    className="w-full px-4 py-2 bg-slate-50 border border-slate-300 rounded-xl text-sm text-slate-900 focus:bg-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                    Column 3 Title (Headquarters)
                  </label>
                  <input
                    type="text"
                    value={footer.colTitles?.headquarters || ""}
                    onChange={(e) =>
                      setFooter({
                        ...footer,
                        colTitles: { ...footer.colTitles, headquarters: e.target.value },
                      })
                    }
                    placeholder="Headquarters & Insights"
                    className="w-full px-4 py-2 bg-slate-50 border border-slate-300 rounded-xl text-sm text-slate-900 focus:bg-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                    Newsletter Title (EN)
                  </label>
                  <input
                    type="text"
                    value={footer.newsletterTitleEn || ""}
                    onChange={(e) => setFooter({ ...footer, newsletterTitleEn: e.target.value })}
                    className="w-full px-4 py-2 bg-slate-50 border border-slate-300 rounded-xl text-sm text-slate-900 focus:bg-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                    Newsletter Description (EN)
                  </label>
                  <input
                    type="text"
                    value={footer.newsletterDescEn || ""}
                    onChange={(e) => setFooter({ ...footer, newsletterDescEn: e.target.value })}
                    className="w-full px-4 py-2 bg-slate-50 border border-slate-300 rounded-xl text-sm text-slate-900 focus:bg-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                    Candidate Tracker Label (EN)
                  </label>
                  <input
                    type="text"
                    value={footer.candidateTrackerLabelEn || ""}
                    onChange={(e) => setFooter({ ...footer, candidateTrackerLabelEn: e.target.value })}
                    className="w-full px-4 py-2 bg-slate-50 border border-slate-300 rounded-xl text-sm text-slate-900 focus:bg-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                    Candidate Tracker Target (href)
                  </label>
                  <input
                    type="text"
                    value={footer.candidateTrackerHref || ""}
                    onChange={(e) => setFooter({ ...footer, candidateTrackerHref: e.target.value })}
                    className="w-full px-4 py-2 bg-slate-50 border border-slate-300 rounded-xl text-sm text-slate-900 focus:bg-white font-mono text-xs"
                  />
                </div>
              </div>
            </div>
          </div>
        )}
      </form>
    </div>
  );
}
