"use client";

import Link from "next/link";
import {
  TrendingUp,
  Building2,
  Users,
  ShieldCheck,
  BrainCircuit,
  Scale,
  TreePine,
  GraduationCap,
  Globe2,
  ArrowRight,
  Stamp,
} from "lucide-react";
import { useLanguage } from "@/components/LanguageProvider";
import type { CmsSitePage } from "@/lib/cms";

interface AboutClientProps {
  sitePage?: CmsSitePage | null;
}

export function AboutClient({ sitePage }: AboutClientProps) {
  const { language } = useLanguage();
  const isBn = language === "bn";

  const metrics = [
    {
      value: isBn ? "৮+" : "8+",
      label: isBn ? "কাজের অভিজ্ঞতা (বছর)" : "Operating Years",
      desc: isBn ? "২০১৮ সাল থেকে প্রাতিষ্ঠানিক ভেঞ্চার বিল্ডিং।" : "Continuous institutional venture building since 2018.",
      icon: TrendingUp,
      accent: "text-[#d4a359]",
    },
    {
      value: isBn ? "১৩টি" : "13",
      label: isBn ? "সাবসিডিয়ারি প্রতিষ্ঠান" : "Subsidiaries",
      desc: isBn ? "আঞ্চলিক স্কেলে পরিচালিত স্বাধীন পোর্টফোলিও কোম্পানি।" : "Independent portfolio companies operating at regional scale.",
      icon: Building2,
      accent: "text-[#35b0aa]",
    },
    {
      value: isBn ? "৫০০+" : "500+",
      label: isBn ? "প্রকৌশলী ও কর্মী" : "Engineers & Operators",
      desc: isBn ? "পূর্ণকালীন প্রযুক্তি, কৃষিবিদ ও প্রোডাক্ট প্রতিভা।" : "Full-time engineering, agronomist & product talent.",
      icon: Users,
      accent: "text-white",
    },
    {
      value: "ISO",
      label: "9001 / 27001",
      desc: isBn ? "প্রত্যয়িত গভর্ন্যান্স, সাইবার নিরাপত্তা ও ডেটা প্রোটোকল।" : "Certified governance, cybersecurity & data protocols.",
      icon: ShieldCheck,
      accent: "text-[#f6c87a]",
    },
  ];

  const strategicPillars = [
    {
      num: "1",
      title: isBn ? "১. উদ্ভাবন ও ডিপ টেক" : "1. Innovation & Deep Tech",
      tagline: isBn ? "সার্বভৌম মাইক্রোসার্ভিস ও ট্রানজ্যাকশনাল এআই মেশ।" : "Sovereign microservices and transactional AI mesh.",
      desc: isBn
        ? "ব্যাংকিং ও বিধিবদ্ধ এন্টারপ্রাইজ অটোমেশন জুড়ে মিশন-গুরুত্বপূর্ণ উচ্চ-কনকারেন্সি লোড পরিচালনার জন্য প্রকৌশলকৃত ক্লাউড অবকাঠামো।"
        : "AI, microservices, cloud telemetry, and sovereign transactional infrastructure architected to handle mission-critical high-concurrency loads across banking and statutory enterprise automation.",
      icon: BrainCircuit,
      category: isBn ? "সার্বভৌম ক্লাউড ও এআই" : "Sovereign Cloud & AI",
      subtext: isBn ? "টায়ার-৩ অবকাঠামো • উচ্চ গতি" : "Tier-3 Infra • High Concurrency",
      metric1Label: isBn ? "মূল ইঞ্জিন" : "Core Engines",
      metric1Val: "Yess Soft & Shondhaan",
      metric2Label: isBn ? "দৈনিক লেনদেন" : "Daily Throughput",
      metric2Val: isBn ? "১০ লাখ+ / দিন" : "1M+ Txn/day",
      href: "/about/methodology",
      action: isBn ? "আর্কিটেকচার দেখুন" : "Explore Architecture",
    },
    {
      num: "2",
      title: isBn ? "২. প্রাতিষ্ঠানিক সুশাসন ও স্বচ্ছতা" : "2. Institutional Governance & Transparency",
      tagline: isBn ? "দ্বিপাক্ষিক বিশ্বাসযোগ্য মানদণ্ড ও স্বচ্ছ নিরীক্ষা পথ।" : "Bilateral fiduciary standards and clean audit trails.",
      desc: isBn
        ? "RJSC C-184920 এর অধীনে নিবন্ধিত, বাংলাদেশ ব্যাংকের আর্থিক কমপ্লায়েন্স ও স্বাধীন বোর্ড তদারকি অনুসরণ করে পরিচালিত।"
        : "Registered under RJSC C-184920, adhering to strict Bangladesh Bank fiduciary compliance, independent board oversight, and clean audit trails.",
      icon: Scale,
      category: isBn ? "আইনগত সুশাসন" : "Statutory Fiduciary",
      subtext: "RJSC C-184920 • BB Compliant",
      metric1Label: isBn ? "নিবন্ধন" : "Incorporation",
      metric1Val: "RJSC Dhaka C-184920",
      metric2Label: isBn ? "কমপ্লায়েন্স" : "Compliance",
      metric2Val: "BIDA & Central Bank",
      href: "/about/leadership",
      action: isBn ? "গভর্ন্যান্স বোর্ড দেখুন" : "Review Governance Board",
    },
    {
      num: "3",
      title: isBn ? "৩. টেকসই কৃষি ও ইএসজি" : "3. ESG & Sustainable Agribusiness",
      tagline: isBn ? "কৃষকের ন্যায্য মূল্য ও কোল্ড-চেইন স্বচ্ছতা।" : "Direct farmer fair-trade and cold-chain transparency.",
      desc: isBn
        ? "রাসায়নিকমুক্ত সাপ্লাই চেইন স্বচ্ছতা, কোল্ড-চেইন আইওটি ট্র্যাকিং এবং সরাসরি গ্রামীণ কৃষক সমবায়।"
        : "Zero-chemical supply chain transparency, cold-chain IoT tracking, and direct rural farmer cooperatives establishing ethical agricultural commerce.",
      icon: TreePine,
      category: isBn ? "টেকসই ভ্যালু চেইন" : "Sustainable Value Chain",
      subtext: isBn ? "আইওটি কোল্ড-চেইন • ৩০+ হাব" : "IoT Cold-Chain • 30+ Hubs",
      metric1Label: isBn ? "গ্রামীণ নাগাল" : "Rural Reach",
      metric1Val: isBn ? "১০,০০০+ কৃষক" : "10,000+ Farmers",
      metric2Label: isBn ? "ট্রেসেবিলিটি" : "Traceability",
      metric2Val: isBn ? "১০০% আইওটি যাচাইকৃত" : "100% Verified IoT",
      href: "/ventures",
      action: isBn ? "অর্গানিক হাট দেখুন" : "Explore Organic Haat",
    },
    {
      num: "4",
      title: isBn ? "৪. যুব নেতৃত্ব ও মানবসম্পদ" : "4. Youth Leadership & Human Capital",
      tagline: isBn ? "শীর্ষস্থানীয় দেশীয় প্রকৌশল প্রতিভা লালন।" : "Nurturing high-caliber domestic engineering talent.",
      desc: isBn
        ? "বুয়েট, ঢাবি এবং শীর্ষস্থানীয় পলিটেকনিক প্রতিষ্ঠানের প্রকৌশলীদের নির্বাহী আর্কিটেক্ট ও প্রোডাক্ট ম্যানেজার হিসেবে গড়ে তোলা।"
        : "Nurturing top 1% engineering cohorts from BUET, DU, and premier polytechnic institutes into executive architects and product managers.",
      icon: GraduationCap,
      category: isBn ? "জনমিতিক লভ্যাংশ" : "Demographic Dividend",
      subtext: isBn ? "শীর্ষ ১% প্রতিভা • নেতৃত্ব ট্র্যাক" : "Top 1% Talent • Leadership Track",
      metric1Label: isBn ? "কর্মীবাহিনী" : "Workforce",
      metric1Val: isBn ? "৫০০+ প্রকৌশলী" : "500+ Engineers",
      metric2Label: isBn ? "ধরে রাখার হার" : "Retention Rate",
      metric2Val: isBn ? "৯৪% দীর্ঘমেয়াদী" : "94% Long-Term",
      href: "/careers",
      action: isBn ? "ট্যালেন্ট পোর্টাল দেখুন" : "Explore Talent Portal",
    },
    {
      num: "5",
      title: isBn ? "৫. বৈশ্বিক গুণগত মানদণ্ড" : "5. Global Quality Benchmarks",
      tagline: isBn ? "রপ্তানি-মানের সফটওয়্যার পাইপলাইন ও টায়ার-৩ নির্ভরযোগ্যতা।" : "Export-grade software pipelines and Tier-3 residency.",
      desc: isBn
        ? "রপ্তানি-মানের সফটওয়্যার পাইপলাইন, CMMI-সংযুক্ত কর্মপদ্ধতি এবং টায়ার-৩ ডেটা সেন্টার আর্কিটেকচার।"
        : "Export-grade software pipelines, CMMI-aligned methodologies, and Tier-3 sovereign data center architectures ensuring resilient uptime and multi-tenant security.",
      icon: ShieldCheck,
      category: isBn ? "এন্টারপ্রাইজ গ্রেড" : "Enterprise Grade",
      subtext: "ISO 27001 • CMMI Level 3",
      metric1Label: isBn ? "অর্জিত মান" : "Standard Met",
      metric1Val: "ISO 9001 / 27001",
      metric2Label: isBn ? "আপটাইম এসএলএ" : "Uptime SLA",
      metric2Val: "99.98% Guaranteed",
      href: "/about/standards",
      action: isBn ? "সার্টিফিকেশন দেখুন" : "Verify Certifications",
    },
    {
      num: "6",
      title: isBn ? "৬. ক্রস-বর্ডার স্কেল ও লজিস্টিকস" : "6. Cross-Border Scale & Logistics",
      tagline: isBn ? "সার্বভৌম সাপ্লাই চেইন ও আঞ্চলিক ওটিটি মিডিয়া।" : "Sovereign supply chain resilience and regional OTT media.",
      desc: isBn
        ? "৬৪ জেলার ফ্রেইট ডেলিভারি নেটওয়ার্ক ও সিডিএন এজ নোড সমন্বয় করে এশীয় বাণিজ্য করিডোরে বাংলাদেশকে যুক্ত করা।"
        : "Consolidating 64-district freight fulfillment networks and sovereign CDN edge nodes, bridging domestic production with regional Asian trade corridors.",
      icon: Globe2,
      category: isBn ? "দেশব্যাপী উপস্থিতি" : "Nationwide Reach",
      subtext: isBn ? "৬৪ জেলা • আন্তর্জাতিক করিডোর" : "64 Districts • Cross-Border Corridors",
      metric1Label: isBn ? "কভারেজ" : "Coverage",
      metric1Val: isBn ? "সমগ্র বাংলাদেশ" : "Pan-Bangladesh",
      metric2Label: isBn ? "আর্কিটেকচার" : "Architecture",
      metric2Val: isBn ? "জিরো-বাফার সিডিএন" : "Zero-Buffer CDN",
      href: "/ventures",
      action: isBn ? "লজিস্টিকস ফ্লিট দেখুন" : "Explore Logistics Fleet",
    },
  ];

  const timelineMilestones = [
    {
      year: "18",
      tag: isBn ? "সূচনা" : "FOUNDATION",
      title: isBn ? "২০১৮: সূচনা ও বীজ ইনকিউবেশন" : "2018: Inception & Seed Incubation",
      desc: isBn
        ? "ঢাকায় বিশেষায়িত সফটওয়্যার স্টুডিও হিসেবে নিবন্ধিত। সাব-কন্ট্রাক্টিংয়ের চেয়ে নিজস্ব আইপি অগ্রাধিকার দিয়ে যাত্রা শুরু।"
        : "Registered in Dhaka as a specialized software studio. Formulated the core venture incubator thesis prioritizing proprietary IP over subcontracting.",
      cardTitle: isBn ? "RJSC ঢাকা'র অধীনে ইনকর্পোরেশন" : "Incorporation under RJSC Dhaka",
      cardSubtitle: isBn ? "১২ জন ফুল-স্ট্যাক সফটওয়্যার প্রকৌশলীর প্রতিষ্ঠাতা দল।" : "Founding cohort of 12 full-stack software engineers.",
      initiative: isBn ? "উদ্যোগ" : "Initiative",
    },
    {
      year: "20",
      tag: isBn ? "অবকাঠামো" : "INFRASTRUCTURE",
      title: isBn ? "২০২০: ইয়েস সফট ও এন্টারপ্রাইজ ক্লাউডের যাত্রা" : "2020: Launch of Yess Soft & Enterprise Cloud",
      desc: isBn
        ? "ফিনটেক মাইক্রোসার্ভিস, ইআরপি স্যুট এবং জাতীয় স্কেলের সফটওয়্যার আর্কিটেকচারের প্রসার।"
        : "Scaling fintech microservices, ERP suites, and national-scale software architectures to support banking and statutory enterprise automation.",
      cardTitle: isBn ? "১০ লাখ+ দৈনিক মূল লেনদেন" : "1,000,000+ Daily Core Transactions",
      cardSubtitle: isBn ? "আঞ্চলিক বাণিজ্য সহায়ক মাল্টি-ক্লাউড অবকাঠামো।" : "Multi-cloud deployments supporting regional trade.",
      initiative: isBn ? "সাবসিডিয়ারি স্কেল" : "Subsidiary Scale",
    },
    {
      year: "22",
      tag: isBn ? "এগ্রিটেক ও ইএসজি" : "AGRITECH & ESG",
      title: isBn ? "২০২২: ইয়েস অর্গানিক হাট ও এগ্রিটেক লজিস্টিকস" : "2022: Emergence of YESS Organic Haat & Agritech Logistics",
      desc: isBn
        ? "বগুড়া ও রাজশাহীর ৩০+ কৃষি হাবের সাথে সরাসরি ঢাকা শহরের গ্রাহকদের যুক্ত করে কোল্ড-চেইন ডেলিভারি।"
        : "Launch of cold-chain farmer-to-door distribution, connecting 30+ farming hubs in Bogura and Rajshahi with urban Dhaka consumers.",
      cardTitle: isBn ? "ন্যায্য মূল্য মডেল প্রতিষ্ঠিত" : "Fair Compensation Model Established",
      cardSubtitle: isBn ? "২,৫০০+ গ্রামীণ কৃষক পরিবারের সরাসরি সম্পৃক্ততা।" : "Over 2,500 rural farming households connected directly.",
      initiative: isBn ? "টেকসই সোর্সিং" : "Sustainable Sourcing",
    },
    {
      year: "24",
      tag: isBn ? "সম্প্রসারণ" : "EXPANSION",
      title: isBn ? "২০২৪: ক্রস-বর্ডার বাণিজ্য ও মিডিয়া বিস্তার" : "2024: Cross-Border Trade & Media Expansion",
      desc: isBn
        ? "দেশলজিক্স এক্সপ্রেস আঞ্চলিক ফরওয়ার্ডিং এবং আকাশ ওটিটি মিডিয়া প্ল্যাটফর্মের উদ্বোধন।"
        : "Inauguration of DeshLogix Express regional forwarding and Akash OTT media platforms, diversifying portfolio streams into distribution and culture.",
      cardTitle: isBn ? "দেশব্যাপী পূর্ণাঙ্গ নেটওয়ার্ক" : "Pan-Bangladesh Fulfilment Network",
      cardSubtitle: isBn ? "৬৪-জেলার ফ্রেইট ডেলিভারি ও সার্বভৌম এজ সিডিএন।" : "64-district freight delivery & sovereign CDN nodes.",
      initiative: isBn ? "বহুমুখীকরণ" : "Diversification",
    },
    {
      year: "26",
      tag: isBn ? "প্রাতিষ্ঠানিক দিগন্ত" : "INSTITUTIONAL HORIZON",
      title: isBn ? "২০২৬: বহুমুখী সার্বভৌম কনগ্লোমারেট রূপান্তর" : "2026: Multi-Sector Sovereign Conglomerate Structure",
      desc: isBn
        ? "৫০ মিলিয়ন ডলার সমমূল্যের প্রাতিষ্ঠানিক মূল্যায়ন সহ ১৩টি সাবসিডিয়ারির একীভূত রূপ।"
        : "Consolidating 13 subsidiaries with $50M+ cumulative enterprise valuation, preparing for institutional debt facilities and regional sovereign partnerships.",
      cardTitle: isBn ? "টায়ার-১ ভেঞ্চার ইকোসিস্টেম" : "Tier-1 Venture Ecosystem",
      cardSubtitle: isBn ? "১৩টি সাবসিডিয়ারি • আঞ্চলিক রপ্তানি দক্ষতা।" : "13 Subsidiaries • Regional Export Competence.",
      initiative: isBn ? "একীভূত ভিশন" : "Consolidated Vision",
    },
  ];

  return (
    <div className="flex flex-col w-full">
      {/* 1. Hero Section */}
      <section className="relative bg-gradient-to-b from-slate-50 via-white to-slate-50/60 text-slate-900 pt-28 pb-16 sm:pt-32 sm:pb-20 lg:pt-36 lg:pb-24 overflow-hidden border-b border-slate-200/80 min-h-[auto] sm:min-h-[540px] lg:min-h-[600px] flex flex-col justify-center">
        <div
          className="absolute inset-0 z-0 bg-cover bg-center pointer-events-none mix-blend-multiply opacity-30"
          style={{ backgroundImage: "url('/assets/about-team-bd.jpg')" }}
        />
        <div className="absolute inset-0 z-0 bg-gradient-to-r from-white/90 via-white/80 to-white/60 pointer-events-none" />

        <div className="absolute inset-0 bg-[radial-gradient(#008744_1px,transparent_1px)] [background-size:24px_24px] opacity-15 pointer-events-none" />
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs font-semibold text-slate-500 mb-6">
            <Link href="/" className="hover:text-emerald-700 transition-colors">
              {isBn ? "হোম" : "Home"}
            </Link>
            <span className="text-slate-300">/</span>
            <span className="text-emerald-800 font-bold">{isBn ? "আমাদের সম্পর্কে" : "About Us"}</span>
          </nav>

          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold uppercase tracking-wider mb-6 shadow-xs">
            <span className="w-2 h-2 rounded-full bg-emerald-600 animate-ping" />
            <span>
              {isBn
                ? "— প্রাতিষ্ঠানিক ম্যান্ডেট ও ঐতিহ্য —"
                : sitePage?.hero_eyebrow || "— INSTITUTIONAL MANDATE & HERITAGE —"}
            </span>
          </div>

          <div className="max-w-4xl">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-900 mb-6 leading-tight">
              {isBn ? (
                <>
                  বাংলাদেশে টেকসই ভেঞ্চার আর্কিটেকচার এবং{" "}
                  <span className="bg-gradient-to-r from-emerald-600 via-teal-700 to-emerald-800 bg-clip-text text-transparent">
                    সার্বভৌম প্রযুক্তির
                  </span>{" "}
                  অগ্রদূত।
                </>
              ) : sitePage?.hero_title ? (
                sitePage.hero_title
              ) : (
                <>
                  Pioneering Sustainable Venture Architecture &amp;{" "}
                  <span className="bg-gradient-to-r from-emerald-600 via-teal-700 to-emerald-800 bg-clip-text text-transparent">
                    Sovereign Tech
                  </span>{" "}
                  in Bangladesh.
                </>
              )}
            </h1>
            <p className="text-sm sm:text-base text-slate-600 max-w-3xl leading-relaxed mb-12">
              {isBn
                ? "বাংলাদেশের দ্রুত বর্ধনশীল জনমিতিক সম্ভাবনাকে আন্তর্জাতিক প্রকৌশল মানের সাথে সংযুক্ত করতে প্রতিষ্ঠিত — যা ক্লাউড, এগ্রিটেক ও ফিনটেক খাতে সার্বভৌম এন্টারপ্রাইজ তৈরিতে গতি সঞ্চার করছে।"
                : sitePage?.hero_subtitle ||
                  "Founded to bridge international engineering standards with Bangladesh's high-growth demographic dividend, accelerating sovereign enterprises across cloud, agritech, and fintech."}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 pt-6 border-t border-slate-200">
            {metrics.map((metric) => {
              const Icon = metric.icon;
              return (
                <div
                  key={metric.label}
                  className="bg-white/90 backdrop-blur-md border border-slate-200 rounded-2xl p-6 hover:border-emerald-500/50 hover:shadow-md transition-all group shadow-xs"
                >
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-3xl sm:text-4xl font-extrabold text-emerald-700 group-hover:scale-105 transition-transform">
                      {metric.value}
                    </span>
                    <Icon className="w-6 h-6 text-emerald-600" />
                  </div>
                  <div className="text-sm font-bold text-slate-900 mb-1">{metric.label}</div>
                  <p className="text-xs text-slate-500">{metric.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 2. Strategic Pillars */}
      <section className="py-20 bg-background relative border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-bold text-primary uppercase tracking-widest">
              {isBn ? "আমাদের মূল ভিত্তি" : "PILLARS OF RESILIENCE"}
            </span>
            <h2 className="font-display font-extrabold text-2xl sm:text-3xl lg:text-4xl text-foreground mt-2 mb-4">
              {isBn
                ? "আমাদের প্রবৃদ্ধির ভিত্তিপ্রস্তরসমূহ"
                : "Strategic Foundational Pillars Architecting Our Growth"}
            </h2>
            <p className="text-xs sm:text-sm text-foreground/70 max-w-2xl mx-auto leading-relaxed">
              {isBn
                ? "প্রতিটি উল্লম্ব খাত সর্বোচ্চ প্রাতিষ্ঠানিক মানে গঠিত, যা ঝুঁকি কমিয়ে সামগ্রিক সামাজিক ও অর্থনৈতিক কল্যাণ নিশ্চিত করে।"
                : "Each vertical is engineered to institutional rigor, insulating early-stage risks while maximizing societal and financial returns."}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {strategicPillars.map((pillar) => {
              const Icon = pillar.icon;
              return (
                <article
                  key={pillar.title}
                  className="glass-card rounded-2xl border border-border p-7 flex flex-col justify-between hover:shadow-xl hover:border-primary/40 transition-all duration-200 group"
                >
                  <div>
                    <div className="flex items-start justify-between mb-4">
                      <div className="w-12 h-12 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary group-hover:scale-105 transition-transform">
                        <Icon className="w-6 h-6" />
                      </div>
                      <div className="text-right">
                        <span className="inline-block px-3 py-1 rounded-full text-[11px] font-bold bg-primary/10 text-primary border border-primary/20">
                          {pillar.category}
                        </span>
                        <p className="text-[10px] text-foreground/50 mt-1 font-medium">{pillar.subtext}</p>
                      </div>
                    </div>

                    <h3 className="font-display font-bold text-lg text-foreground group-hover:text-primary transition-colors leading-snug">
                      {pillar.title}
                    </h3>
                    <p className="text-xs font-semibold text-[#7e5713] dark:text-[#f6c87a] mt-0.5">{pillar.tagline}</p>
                    <p className="text-xs sm:text-sm text-foreground/70 mt-2 mb-4 leading-relaxed line-clamp-3">
                      {pillar.desc}
                    </p>
                  </div>

                  <div>
                    <div className="py-2.5 px-3 rounded-xl bg-muted/50 border border-border mb-4 text-xs grid grid-cols-2 gap-2">
                      <div>
                        <span className="text-[10px] text-foreground/60 block">{pillar.metric1Label}</span>
                        <span className="font-bold text-foreground text-xs">{pillar.metric1Val}</span>
                      </div>
                      <div>
                        <span className="text-[10px] text-foreground/60 block">{pillar.metric2Label}</span>
                        <span className="font-bold text-primary text-xs">{pillar.metric2Val}</span>
                      </div>
                    </div>

                    <div className="pt-4 border-t border-border flex items-center justify-between text-xs font-semibold text-primary">
                      <Link
                        href={pillar.href}
                        className="inline-flex items-center gap-1.5 hover:underline group-hover:translate-x-0.5 transition-transform"
                      >
                        <span>{pillar.action}</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* 3. Timeline */}
      <section className="py-20 bg-muted/20 border-b border-border relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-bold text-primary uppercase tracking-widest">
              {isBn ? "আমাদের ইতিহাস ও অগ্রগতি" : "INSTITUTIONAL TRAJECTORY"}
            </span>
            <h2 className="font-display font-extrabold text-2xl sm:text-3xl lg:text-4xl text-foreground mt-2 mb-4">
              {isBn ? "এক দশকের অর্জনের মাইলফলক" : "Milestones of a Decade in the Making"}
            </h2>
            <p className="text-xs sm:text-sm text-foreground/70 max-w-2xl mx-auto leading-relaxed">
              {isBn
                ? "বুটিপ ক্লাউড কনসালটেন্সি থেকে একটি প্রাতিষ্ঠানিক হোল্ডিং কাঠামো হিসেবে সার্বভৌম ডিজিটাল রূপান্তরের ইতিহাস।"
                : "From a boutique cloud consultancy to an institutional holding structure driving sovereign digital and tangible supply chains."}
            </p>
          </div>

          <div className="relative">
            <div className="hidden md:block absolute left-1/2 -translate-x-1/2 top-4 bottom-4 w-0.5 bg-gradient-to-b from-primary via-amber-500 to-primary" />

            <div className="space-y-12">
              {timelineMilestones.map((milestone, idx) => {
                const isEven = idx % 2 === 0;
                return (
                  <div
                    key={milestone.year}
                    className={`flex flex-col md:flex-row items-center justify-between gap-8 relative ${
                      isEven ? "" : "md:flex-row-reverse"
                    }`}
                  >
                    <div className={`w-full md:w-5/12 ${isEven ? "text-left md:text-right" : "text-left"}`}>
                      <span className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold mb-2 border border-primary/20">
                        {milestone.tag}
                      </span>
                      <h3 className="font-display font-bold text-base sm:text-lg text-foreground">{milestone.title}</h3>
                      <p className="text-xs sm:text-sm text-foreground/70 mt-2 leading-relaxed">{milestone.desc}</p>
                    </div>

                    <div className="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center font-bold text-xs shadow-md z-10 ring-4 ring-background shrink-0">
                      {milestone.year}
                    </div>

                    <div className="w-full md:w-5/12 glass-card p-5 rounded-2xl border border-border shadow-sm">
                      <div className="text-[11px] font-semibold text-amber-600 dark:text-amber-400">
                        {milestone.initiative}
                      </div>
                      <div className="font-display text-xs sm:text-sm font-bold text-foreground mt-0.5">
                        {milestone.cardTitle}
                      </div>
                      <div className="text-xs text-foreground/60 mt-1">{milestone.cardSubtitle}</div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* 4. Leadership Keynote */}
      <section className="py-20 bg-gradient-to-br from-slate-50 via-emerald-50/20 to-amber-50/20 text-slate-900 relative overflow-hidden border-b border-slate-200">
        <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#008744_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none" />
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="bg-white/95 border border-slate-200/90 rounded-3xl p-8 sm:p-12 shadow-xl shadow-slate-900/5 relative space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-6 pb-8 border-b border-slate-100">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-full border-2 border-dashed border-amber-600 flex items-center justify-center text-amber-700 bg-amber-50">
                  <Stamp className="w-7 h-7" />
                </div>
                <div>
                  <span className="text-xs font-bold text-amber-700 uppercase tracking-wider block">
                    {isBn ? "ম্যানেজিং পার্টনারের বক্তব্য" : "MANAGING PARTNER KEYNOTE"}
                  </span>
                  <h3 className="font-display text-xl font-bold text-slate-900">
                    {isBn ? "বোর্ড গভর্ন্যান্স ও লক্ষ্য" : "Board Governance & Purpose"}
                  </h3>
                </div>
              </div>
              <span className="px-3 py-1 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800 border border-emerald-300">
                {isBn ? "RJSC বোর্ড অনুমোদিত" : "RJSC Board Ratified"}
              </span>
            </div>

            <p className="text-sm sm:text-base text-slate-700 leading-relaxed italic">
              {isBn
                ? "“আমরা YESS বাংলাদেশকে কেবল একটি বিনিয়োগ প্রতিষ্ঠান হিসেবে নয়, বরং একটি প্রাতিষ্ঠানিক জাতি-গঠন ইঞ্জিন হিসেবে গড়ে তুলেছি। একবিংশ শতাব্দীতে প্রকৃত সার্বভৌমত্ব হলো ডিজিটাল, কৃষি ও অবকাঠামোগত। দেশীয় প্রযুক্তি প্রতিভাকে লালন করে এবং আন্তর্জাতিক আর্থিক শৃঙ্খলা নিশ্চিত করে, আমরা নিশ্চিত করি যে আমাদের প্রতিটি উদ্যোগ বাংলাদেশের মানুষের জন্য স্থায়ী কল্যাণ বয়ে আনবে।”"
                : "“We architected YESS Bangladesh not merely as an investment syndicate, but as an institutional nation-building engine. True sovereignty in the 21st century is digital, agrarian, and infrastructural. By fostering homegrown engineering talent and enforcing international fiduciary discipline, we ensure every venture created under our umbrella delivers enduring value for the people of Bangladesh.”"}
            </p>

            <div className="pt-6 border-t border-slate-100 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <p className="text-sm font-bold text-slate-900">
                  {isBn ? "নির্বাহী কমিটি ও পরিচালনা পর্ষদ" : "Executive Committee & Governing Board"}
                </p>
                <p className="text-xs text-slate-500">YESS Bangladesh • RJSC Reg: C-184920</p>
              </div>
              <Link
                href="/about/leadership"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#008744] via-[#059669] to-[#0d6e6e] text-white text-xs font-bold transition-all shadow-sm hover:shadow-md"
              >
                <span>{isBn ? "পরিচালনা পর্ষদ দেখুন" : "View Full Executive Board"}</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 5. 64 Districts Footprint */}
      <section className="py-16 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div className="p-6 rounded-2xl glass-card border border-border">
              <span className="font-display text-3xl sm:text-4xl font-extrabold text-primary block mb-1">
                {isBn ? "৬৪" : "64"}
              </span>
              <span className="text-xs font-bold text-foreground block">
                {isBn ? "জেলায় সেবা বিস্তার" : "Districts Covered"}
              </span>
              <span className="text-[11px] text-foreground/60">
                {isBn ? "দেশব্যাপী উপস্থিতি" : "Pan-Bangladesh Presence"}
              </span>
            </div>
            <div className="p-6 rounded-2xl glass-card border border-border">
              <span className="font-display text-3xl sm:text-4xl font-extrabold text-amber-500 block mb-1">
                {isBn ? "১০,০০০+" : "10,000+"}
              </span>
              <span className="text-xs font-bold text-foreground block">
                {isBn ? "যুক্ত কৃষক" : "Farmers Onboarded"}
              </span>
              <span className="text-[11px] text-foreground/60">
                {isBn ? "পুনরুৎপাদনমূলক এগ্রোটেক" : "Regenerative Agrotech"}
              </span>
            </div>
            <div className="p-6 rounded-2xl glass-card border border-border">
              <span className="font-display text-3xl sm:text-4xl font-extrabold text-primary block mb-1">
                {isBn ? "৪৮ লাখ+" : "4.8M"}
              </span>
              <span className="text-xs font-bold text-foreground block">
                {isBn ? "ডিজিটাল দর্শক" : "Digital Viewers"}
              </span>
              <span className="text-[11px] text-foreground/60">
                {isBn ? "আকাশ ওটিটি ও টিভি" : "Akash OTT & TV"}
              </span>
            </div>
            <div className="p-6 rounded-2xl glass-card border border-border">
              <span className="font-display text-3xl sm:text-4xl font-extrabold text-amber-500 block mb-1">
                {isBn ? "১৩টি" : "13"}
              </span>
              <span className="text-xs font-bold text-foreground block">
                {isBn ? "সাবসিডিয়ারি ভেঞ্চার" : "Subsidiary Ventures"}
              </span>
              <span className="text-[11px] text-foreground/60">
                {isBn ? "$৫০ মিলিয়ন+ মূল্যায়ন ভিত্তি" : "$50M+ Valuation Base"}
              </span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
