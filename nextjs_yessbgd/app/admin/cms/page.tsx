"use client";

import Link from "next/link";
import {
  Briefcase,
  Layers,
  Globe,
  FileText,
  Users,
  ArrowRight,
  Database,
  CheckCircle2,
  Sparkles,
} from "lucide-react";

const ENTITIES = [
  {
    type: "ventures",
    title: "Ventures",
    titleBn: "ভেঞ্চার",
    desc: "13 sovereign operating subsidiaries including Yess Soft, Akash TV, Akash OTT, Shondhaan, and Organic Haat.",
    count: "13 Entities",
    icon: Briefcase,
    color: "from-amber-500/20 to-amber-500/5",
    border: "hover:border-[#d4a359]/50",
    badge: "text-[#d4a359] bg-[#d4a359]/10",
  },
  {
    type: "services",
    title: "Services & Capabilities",
    titleBn: "সার্ভিস ও সমাধান",
    desc: "6 core disciplines including OTT Platform Engineering, Enterprise ERP, Sovereign Cloud Mesh, and Legal Advisory.",
    count: "6 Services",
    icon: Layers,
    color: "from-teal-500/20 to-teal-500/5",
    border: "hover:border-[#35b0aa]/50",
    badge: "text-[#35b0aa] bg-[#35b0aa]/10",
  },
  {
    type: "industries",
    title: "Industry Verticals",
    titleBn: "ইন্ডাস্ট্রি খাত",
    desc: "8 sector transformation practices covering RMG & Garments, Banking & FinTech, Media, and Agriculture.",
    count: "8 Verticals",
    icon: Globe,
    color: "from-blue-500/20 to-blue-500/5",
    border: "hover:border-blue-400/50",
    badge: "text-blue-400 bg-blue-500/10",
  },
  {
    type: "insights",
    title: "Insights & Research",
    titleBn: "ইনসাইট ও আর্টিকেল",
    desc: "Engineering whitepapers, peer-reviewed research, policy briefs, and architectural blueprints.",
    count: "7 Whitepapers",
    icon: FileText,
    color: "from-purple-500/20 to-purple-500/5",
    border: "hover:border-purple-400/50",
    badge: "text-purple-400 bg-purple-500/10",
  },
  {
    type: "openings",
    title: "Careers & Openings",
    titleBn: "চাকরির পদ",
    desc: "Engineering, Product Design, Agritech IoT, and Corporate Governance job postings with BDT salary bands.",
    count: "16 Roles",
    icon: Users,
    color: "from-emerald-500/20 to-emerald-500/5",
    border: "hover:border-emerald-400/50",
    badge: "text-emerald-400 bg-emerald-500/10",
  },
];

export default function CmsHubPage() {
  return (
    <div className="space-y-6">
      <div className="pb-6 border-b border-slate-200">
        <span className="text-xs font-bold text-teal-700 uppercase tracking-widest">
          DYNAMIC ENTITY MANAGEMENT
        </span>
        <h1 className="text-3xl font-extrabold text-slate-900 mt-1">Content Collections</h1>
        <p className="text-sm text-slate-500 mt-1">
          Select a content collection to create, edit, or publish entities across the YESS Bangladesh ecosystem.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {ENTITIES.map((ent) => {
          const Icon = ent.icon;
          return (
            <Link
              key={ent.type}
              href={`/admin/cms/${ent.type}`}
              className={`admin-glass-card rounded-2xl p-6 border border-slate-200 shadow-xs hover:border-teal-400 hover:shadow-md transition-all duration-200 group flex flex-col justify-between`}
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="p-3 rounded-xl bg-teal-50 border border-teal-100 group-hover:scale-110 transition-transform">
                    <Icon className="w-6 h-6 text-teal-700" />
                  </div>
                  <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${ent.badge}`}>
                    {ent.count}
                  </span>
                </div>
                <h2 className="text-lg font-bold text-slate-900 group-hover:text-teal-700 transition-colors">
                  {ent.title}
                </h2>
                <p className="text-xs text-slate-500 mt-2 leading-relaxed">
                  {ent.desc}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-teal-700 group-hover:text-teal-900">
                <span>Manage Collection</span>
                <ArrowRight className="w-4 h-4 text-teal-700 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
