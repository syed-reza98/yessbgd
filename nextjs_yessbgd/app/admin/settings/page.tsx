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
} from "lucide-react";

export default function SiteSettingsPage() {
  const [branding, setBranding] = useState<any>({
    companyName: "YESS Bangladesh",
    companyNameBn: "ইয়েস বাংলাদেশ",
    legalName: "Yess Bangla Private Limited",
    registrationNo: "C-184920",
    logoUrl: "/assets/logos/yess-bangla-logo.png",
    letterheadUrl: "/assets/logos/yess-bangla-letterhead.jpeg",
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
          if (brand) setBranding(brand.value);
          if (cont) setContact(cont.value);
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
      setSavedSuccess(true);
      setTimeout(() => setSavedSuccess(false), 3000);
    } catch (err: any) {
      alert(err.message || "Failed to save settings.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/10">
        <div>
          <span className="text-xs font-bold text-[#d4a359] uppercase tracking-widest">
            CORPORATE CONFIGURATION & IDENTITY
          </span>
          <h1 className="text-3xl font-extrabold text-white mt-1">Site Settings & Branding</h1>
          <p className="text-sm text-slate-400 mt-1">
            Global corporate identity, statutory registration, official contact desks, and office locations.
          </p>
        </div>

        <button
          onClick={handleSave}
          disabled={saving}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#0d6e6e] to-[#35b0aa] text-white text-xs font-bold shadow-lg shadow-[#0d6e6e]/20 hover:opacity-90 transition-all disabled:opacity-50"
        >
          <Save className="w-4 h-4" />
          <span>{saving ? "Saving Changes..." : "Save Settings"}</span>
        </button>
      </div>

      {savedSuccess && (
        <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center gap-3 text-emerald-300 text-xs font-semibold">
          <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
          <span>Corporate settings updated and cache revalidated across the portal!</span>
        </div>
      )}

      <form onSubmit={handleSave} className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Branding & Entity Identity */}
        <div className="admin-glass-card rounded-2xl p-6 border border-white/10 space-y-4">
          <h2 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2 pb-3 border-b border-white/10">
            <Building2 className="w-4 h-4 text-[#d4a359]" />
            <span>Corporate Branding & Identity</span>
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
                Brand Name (English)
              </label>
              <input
                type="text"
                value={branding.companyName || ""}
                onChange={(e) => setBranding({ ...branding, companyName: e.target.value })}
                className="w-full px-4 py-2 bg-black/40 border border-white/10 rounded-xl text-xs text-white focus:outline-none focus:border-[#35b0aa]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-[#d4a359] uppercase tracking-wider mb-2">
                ব্র্যান্ড নাম (বাংলা)
              </label>
              <input
                type="text"
                value={branding.companyNameBn || ""}
                onChange={(e) => setBranding({ ...branding, companyNameBn: e.target.value })}
                className="w-full px-4 py-2 bg-black/40 border border-white/10 rounded-xl text-xs text-white focus:outline-none focus:border-[#35b0aa]"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
                Statutory Legal Entity
              </label>
              <input
                type="text"
                value={branding.legalName || ""}
                onChange={(e) => setBranding({ ...branding, legalName: e.target.value })}
                className="w-full px-4 py-2 bg-black/40 border border-white/10 rounded-xl text-xs text-white focus:outline-none focus:border-[#35b0aa]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
                RJSC Registration No.
              </label>
              <input
                type="text"
                value={branding.registrationNo || ""}
                onChange={(e) => setBranding({ ...branding, registrationNo: e.target.value })}
                className="w-full px-4 py-2 bg-black/40 border border-white/10 rounded-xl text-xs font-mono text-white focus:outline-none focus:border-[#35b0aa]"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
              Primary Brand Logo URL / Path
            </label>
            <input
              type="text"
              value={branding.logoUrl || ""}
              onChange={(e) => setBranding({ ...branding, logoUrl: e.target.value })}
              className="w-full px-4 py-2 bg-black/40 border border-white/10 rounded-xl text-xs font-mono text-slate-300 focus:outline-none focus:border-[#35b0aa]"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
              Corporate Letterhead Seal URL
            </label>
            <input
              type="text"
              value={branding.letterheadUrl || ""}
              onChange={(e) => setBranding({ ...branding, letterheadUrl: e.target.value })}
              className="w-full px-4 py-2 bg-black/40 border border-white/10 rounded-xl text-xs font-mono text-slate-300 focus:outline-none focus:border-[#35b0aa]"
            />
          </div>
        </div>

        {/* Corporate Inquiries & Desks */}
        <div className="admin-glass-card rounded-2xl p-6 border border-white/10 space-y-4">
          <h2 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2 pb-3 border-b border-white/10">
            <Phone className="w-4 h-4 text-[#35b0aa]" />
            <span>Corporate Communication Channels</span>
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
                Executive Hotline
              </label>
              <input
                type="text"
                value={contact.phone || ""}
                onChange={(e) => setContact({ ...contact, phone: e.target.value })}
                className="w-full px-4 py-2 bg-black/40 border border-white/10 rounded-xl text-xs font-mono text-white focus:outline-none focus:border-[#35b0aa]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
                WhatsApp Business Hotline
              </label>
              <input
                type="text"
                value={contact.whatsapp || ""}
                onChange={(e) => setContact({ ...contact, whatsapp: e.target.value })}
                className="w-full px-4 py-2 bg-black/40 border border-white/10 rounded-xl text-xs font-mono text-white focus:outline-none focus:border-[#35b0aa]"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
                Primary Corporate Email
              </label>
              <input
                type="email"
                value={contact.email || ""}
                onChange={(e) => setContact({ ...contact, email: e.target.value })}
                className="w-full px-4 py-2 bg-black/40 border border-white/10 rounded-xl text-xs font-mono text-white focus:outline-none focus:border-[#35b0aa]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
                Investment Desk Email
              </label>
              <input
                type="email"
                value={contact.investEmail || ""}
                onChange={(e) => setContact({ ...contact, investEmail: e.target.value })}
                className="w-full px-4 py-2 bg-black/40 border border-white/10 rounded-xl text-xs font-mono text-white focus:outline-none focus:border-[#35b0aa]"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
              Registered Office Address (English)
            </label>
            <input
              type="text"
              value={contact.address || ""}
              onChange={(e) => setContact({ ...contact, address: e.target.value })}
              className="w-full px-4 py-2 bg-black/40 border border-white/10 rounded-xl text-xs text-white focus:outline-none focus:border-[#35b0aa]"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-[#d4a359] uppercase tracking-wider mb-2">
              নিবন্ধিত অফিস ঠিকানা (বাংলা)
            </label>
            <input
              type="text"
              value={contact.addressBn || ""}
              onChange={(e) => setContact({ ...contact, addressBn: e.target.value })}
              className="w-full px-4 py-2 bg-black/40 border border-white/10 rounded-xl text-xs text-white focus:outline-none focus:border-[#35b0aa]"
            />
          </div>
        </div>
      </form>
    </div>
  );
}
