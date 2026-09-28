"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { useLanguage } from "@/components/LanguageProvider";

// Comprehensive English to Bengali translation dictionary
const TRANSLATION_MAP: Record<string, string> = {
  // Navigation & General
  "Home": "হোম",
  "About": "আমাদের সম্পর্কে",
  "About Us": "আমাদের সম্পর্কে",
  "Services": "সেবাসমূহ",
  "Ventures": "ভেঞ্চার",
  "Industries": "ইন্ডাস্ট্রি",
  "Insights": "ইনসাইট",
  "Careers": "ক্যারিয়ার",
  "Contact": "যোগাযোগ",
  "FAQ": "প্রশ্নোত্তর",
  "Get in Touch": "যোগাযোগ করুন",
  "Let's Talk": "কথা বলুন",
  "Explore": "এক্সপ্লোর করুন",
  "Read more": "আরও পড়ুন",
  "Read More": "আরও পড়ুন",
  "Learn more": "আরও জানুন",
  "Learn More": "আরও জানুন",
  "View all": "সকল দেখুন",
  "View All": "সকল দেখুন",
  "Loading More...": "আরও লোড হচ্ছে...",
  "All rights reserved.": "সর্বস্বত্ব সংরক্ষিত।",
  "Privacy Policy": "গোপনীয়তা নীতি",
  "Terms of Service": "সেবার শর্তাবলী",
  "Terms & Conditions": "ব্যবহারের শর্তাবলী",
  "Sitemap": "সাইটম্যাপ",

  // Page: About Us
  "About Us — Leading Institutional Venture Builder": "আমাদের সম্পর্কে — শীর্ষস্থানীয় প্রাতিষ্ঠানিক ভেঞ্চার নির্মাতা",
  "— INSTITUTIONAL MANDATE & HERITAGE —": "— প্রাতিষ্ঠানিক ম্যান্ডেট ও ঐতিহ্য —",
  "Pioneering Sustainable Venture Architecture & Sovereign Tech in Bangladesh.": "বাংলাদেশে টেকসই ভেঞ্চার আর্কিটেকচার এবং সার্বভৌম প্রযুক্তির অগ্রদূত।",
  "Pioneering Sustainable Venture Architecture & Sovereign Tech in Bangladesh": "বাংলাদেশে টেকসই ভেঞ্চার আর্কিটেকচার এবং সার্বভৌম প্রযুক্তির অগ্রদূত",
  "Founded to bridge international engineering standards with Bangladesh's high-growth demographic dividend, accelerating sovereign enterprises across cloud, agritech, and fintech.": "বাংলাদেশের দ্রুত বর্ধনশীল জনমিতিক সম্ভাবনাকে আন্তর্জাতিক প্রকৌশল মানের সাথে সংযুক্ত করতে প্রতিষ্ঠিত — যা ক্লাউড, এগ্রিটেক ও ফিনটেক খাতে সার্বভৌম এন্টারপ্রাইজ তৈরিতে গতি সঞ্চার করছে।",
  "Operating Years": "কাজের অভিজ্ঞতা (বছর)",
  "Continuous institutional venture building since 2018.": "২০১৮ সাল থেকে প্রাতিষ্ঠানিক ভেঞ্চার বিল্ডিং।",
  "Subsidiaries": "সাবসিডিয়ারি প্রতিষ্ঠান",
  "Independent portfolio companies operating at regional scale.": "আঞ্চলিক স্কেলে পরিচালিত স্বাধীন পোর্টফোলিও কোম্পানি।",
  "Engineers & Operators": "প্রকৌশলী ও কর্মী",
  "Full-time engineering, agronomist & product talent.": "পূর্ণকালীন প্রযুক্তি, কৃষিবিদ ও প্রোডাক্ট প্রতিভা।",
  "Certified governance, cybersecurity & data protocols.": "প্রত্যয়িত গভর্ন্যান্স, সাইবার নিরাপত্তা ও ডেটা প্রোটোকল।",
  "PILLARS OF RESILIENCE": "আমাদের মূল ভিত্তি",
  "Strategic Foundational Pillars Architecting Our Growth": "আমাদের প্রবৃদ্ধির ভিত্তিপ্রস্তরসমূহ",
  "Each vertical is engineered to institutional rigor, insulating early-stage risks while maximizing societal and financial returns.": "প্রতিটি উল্লম্ব খাত সর্বোচ্চ প্রাতিষ্ঠানিক মানে গঠিত, যা ঝুঁকি কমিয়ে সামগ্রিক সামাজিক ও অর্থনৈতিক কল্যাণ নিশ্চিত করে।",
  "1. Innovation & Deep Tech": "১. উদ্ভাবন ও ডিপ টেক",
  "Sovereign microservices and transactional AI mesh.": "সার্বভৌম মাইক্রোসার্ভিস ও ট্রানজ্যাকশনাল এআই মেশ।",
  "AI, microservices, cloud telemetry, and sovereign transactional infrastructure architected to handle mission-critical high-concurrency loads across banking and statutory enterprise automation.": "ব্যাংকিং ও বিধিবদ্ধ এন্টারপ্রাইজ অটোমেশন জুড়ে মিশন-গুরুত্বপূর্ণ উচ্চ-কনকারেন্সি লোড পরিচালনার জন্য প্রকৌশলকৃত ক্লাউড অবকাঠামো।",
  "Sovereign Cloud & AI": "সার্বভৌম ক্লাউড ও এআই",
  "Tier-3 Infra • High Concurrency": "টায়ার-৩ অবকাঠামো • উচ্চ গতি",
  "Core Engines": "মূল ইঞ্জিন",
  "Daily Throughput": "দৈনিক লেনদেন",
  "Explore Architecture": "আর্কিটেকচার দেখুন",
  "2. Institutional Governance & Transparency": "২. প্রাতিষ্ঠানিক সুশাসন ও স্বচ্ছতা",
  "Bilateral fiduciary standards and clean audit trails.": "দ্বিপাক্ষিক বিশ্বাসযোগ্য মানদণ্ড ও স্বচ্ছ নিরীক্ষা পথ।",
  "Registered under RJSC C-184920, adhering to strict Bangladesh Bank fiduciary compliance, independent board oversight, and clean audit trails.": "RJSC C-184920 এর অধীনে নিবন্ধিত, বাংলাদেশ ব্যাংকের আর্থিক কমপ্লায়েন্স ও স্বাধীন বোর্ড তদারকি অনুসরণ করে পরিচালিত।",
  "Statutory Fiduciary": "আইনগত সুশাসন",
  "Incorporation": "নিবন্ধন",
  "Compliance": "কমপ্লায়েন্স",
  "Review Governance Board": "গভর্ন্যান্স বোর্ড দেখুন",
  "3. ESG & Sustainable Agribusiness": "৩. টেকসই কৃষি ও ইএসজি",
  "Direct farmer fair-trade and cold-chain transparency.": "কৃষকের ন্যায্য মূল্য ও কোল্ড-চেইন স্বচ্ছতা।",
  "Zero-chemical supply chain transparency, cold-chain IoT tracking, and direct rural farmer cooperatives establishing ethical agricultural commerce.": "রাসায়নিকমুক্ত সাপ্লাই চেইন স্বচ্ছতা, কোল্ড-চেইন আইওটি ট্র্যাকিং এবং সরাসরি গ্রামীণ কৃষক সমবায়।",
  "Sustainable Value Chain": "টেকসই ভ্যালু চেইন",
  "IoT Cold-Chain • 30+ Hubs": "আইওটি কোল্ড-চেইন • ৩০+ হাব",
  "Rural Reach": "গ্রামীণ নাগাল",
  "Traceability": "ট্রেসেবিলিটি",
  "100% Verified IoT": "১০০% আইওটি যাচাইকৃত",
  "Explore Organic Haat": "অর্গানিক হাট দেখুন",
  "4. Youth Leadership & Human Capital": "৪. যুব নেতৃত্ব ও মানবসম্পদ",
  "Nurturing high-caliber domestic engineering talent.": "শীর্ষস্থানীয় দেশীয় প্রকৌশল প্রতিভা লালন।",
  "Nurturing top 1% engineering cohorts from BUET, DU, and premier polytechnic institutes into executive architects and product managers.": "বুয়েট, ঢাবি এবং শীর্ষস্থানীয় পলিটেকনিক প্রতিষ্ঠানের প্রকৌশলীদের নির্বাহী আর্কিটেক্ট ও প্রোডাক্ট ম্যানেজার হিসেবে গড়ে তোলা।",
  "Demographic Dividend": "জনমিতিক লভ্যাংশ",
  "Top 1% Talent • Leadership Track": "শীর্ষ ১% প্রতিভা • নেতৃত্ব ট্র্যাক",
  "Workforce": "কর্মীবাহিনী",
  "Retention Rate": "ধরে রাখার হার",
  "Explore Talent Portal": "ট্যালেন্ট পোর্টাল দেখুন",
  "5. Global Quality Benchmarks": "৫. বৈশ্বিক গুণগত মানদণ্ড",
  "Export-grade software pipelines and Tier-3 residency.": "রপ্তানি-মানের সফটওয়্যার পাইপলাইন ও টায়ার-৩ নির্ভরযোগ্যতা।",
  "Export-grade software pipelines, CMMI-aligned methodologies, and Tier-3 sovereign data center architectures ensuring resilient uptime and multi-tenant security.": "রপ্তানি-মানের সফটওয়্যার পাইপলাইন, CMMI-সংযুক্ত কর্মপদ্ধতি এবং টায়ার-৩ ডেটা সেন্টার আর্কিটেকচার।",
  "Enterprise Grade": "এন্টারপ্রাইজ গ্রেড",
  "Standard Met": "অর্জিত মান",
  "Uptime SLA": "আপটাইম এসএলএ",
  "Verify Certifications": "সার্টিফিকেশন দেখুন",
  "6. Cross-Border Scale & Logistics": "৬. ক্রস-বর্ডার স্কেল ও লজিস্টিকস",
  "Sovereign supply chain resilience and regional OTT media.": "সার্বভৌম সাপ্লাই চেইন ও আঞ্চলিক ওটিটি মিডিয়া।",
  "Consolidating 64-district freight fulfillment networks and sovereign CDN edge nodes, bridging domestic production with regional Asian trade corridors.": "৬৪ জেলার ফ্রেইট ডেলিভারি নেটওয়ার্ক ও সিডিএন এজ নোড সমন্বয় করে এশীয় বাণিজ্য করিডোরে বাংলাদেশকে যুক্ত করা।",
  "Nationwide Reach": "দেশব্যাপী উপস্থিতি",
  "64 Districts • Cross-Border Corridors": "৬৪ জেলা • আন্তর্জাতিক করিডোর",
  "Coverage": "কভারেজ",
  "Pan-Bangladesh": "সমগ্র বাংলাদেশ",
  "Architecture": "আর্কিটেকচার",
  "Zero-Buffer CDN": "জিরো-বাফার সিডিএন",
  "Explore Logistics Fleet": "লজিস্টিকস ফ্লিট দেখুন",
  "INSTITUTIONAL TRAJECTORY": "আমাদের ইতিহাস ও অগ্রগতি",
  "Milestones of a Decade in the Making": "এক দশকের অর্জনের মাইলফলক",
  "From a boutique cloud consultancy to an institutional holding structure driving sovereign digital and tangible supply chains.": "বুটিপ ক্লাউড কনসালটেন্সি থেকে একটি প্রাতিষ্ঠানিক হোল্ডিং কাঠামো হিসেবে সার্বভৌম ডিজিটাল রূপান্তরের ইতিহাস।",
  "MANAGING PARTNER KEYNOTE": "ম্যানেজিং পার্টনারের বক্তব্য",
  "Board Governance & Purpose": "বোর্ড গভর্ন্যান্স ও লক্ষ্য",
  "RJSC Board Ratified": "RJSC বোর্ড অনুমোদিত",
  "Executive Committee & Governing Board": "নির্বাহী কমিটি ও পরিচালনা পর্ষদ",
  "View Full Executive Board": "পরিচালনা পর্ষদ দেখুন",
  "Districts Covered": "জেলায় সেবা বিস্তার",
  "Pan-Bangladesh Presence": "দেশব্যাপী উপস্থিতি",
  "Farmers Onboarded": "যুক্ত কৃষক",
  "Regenerative Agrotech": "পুনরুৎপাদনমূলক এগ্রোটেক",
  "Digital Viewers": "ডিজিটাল দর্শক",
  "Akash OTT & TV": "আকাশ ওটিটি ও টিভি",
  "Subsidiary Ventures": "সাবসিডিয়ারি ভেঞ্চার",
  "$50M+ Valuation Base": "$৫০ মিলিয়ন+ মূল্যায়ন ভিত্তি",

  // Page: Ventures
  "Ventures Directory": "ভেঞ্চার ডিরেক্টরি",
  "— SOVEREIGN SUBSIDIARY PORTFOLIO —": "— সার্বভৌম সাবসিডিয়ারি পোর্টফোলিও —",
  "SOVEREIGN SUBSIDIARY PORTFOLIO": "সার্বভৌম সাবসিডিয়ারি পোর্টফোলিও",
  "Thirteen operating subsidiaries powering core national sectors": "জাতীয় গুরুত্বপূর্ণ খাতসমূহ পরিচালনাকারী ১৩টি সক্রিয় সাবসিডিয়ারি",
  "Across technology, cloud infrastructure, agricultural distribution, and digital broadcasting — explore the operating entities of YESS Bangladesh.": "প্রযুক্তি, ক্লাউড অবকাঠামো, কৃষি সরবরাহ এবং ডিজিটাল সম্প্রচার জুড়ে YESS বাংলাদেশের সক্রিয় প্রতিষ্ঠানসমূহ এক্সপ্লোর করুন।",
  "Explore the sovereign subsidiaries of YESS Bangladesh spanning enterprise cloud, media streaming, agritech IoT, and logistics.": "ক্লাউড, মিডিয়া স্ট্রিমিং, এগ্রিটেক ও লজিস্টিকস জুড়ে পরিচালিত YESS বাংলাদেশের সাবসিডিয়ারিসমূহ এক্সপ্লোর করুন।",
  "Operating Entities": "সক্রিয় সাবসিডিয়ারি",
  "Active cross-sector subsidiaries": "সক্রিয় বহুখাতীয় সাবসিডিয়ারিসমূহ",
  "Cumulative Enterprise Value": "একীভূত প্রাতিষ্ঠানিক মূল্যায়ন",
  "Sovereign valuation metric": "সার্বভৌম মূল্যায়ন মানদণ্ড",
  "Core Industry Verticals": "প্রধান শিল্প উল্লম্ব",
  "Cloud, Agribusiness, Media, Logistics": "ক্লাউড, কৃষিব্যবসা, মিডিয়া, লজিস্টিকস",
  "Sovereign Ownership": "সার্বভৌম মালিকানা",
  "Institutional national governance": "প্রাতিষ্ঠানিক জাতীয় গভর্ন্যান্স",
  "Explore Sovereign Subsidiaries": "সার্বভৌম সাবসিডিয়ারি দেখুন",
  "Search subsidiaries by vertical...": "ভেঞ্চার বা ইন্ডাস্ট্রি খুঁজুন...",
  "All Sectors": "সকল খাত",
  "Enterprise Cloud & Software": "এন্টারপ্রাইজ ক্লাউড ও সফটওয়্যার",
  "Media & Digital OTT": "মিডিয়া ও ডিজিটাল ওটিটি",
  "Agritech & Cold Chain": "এগ্রিটেক ও কোল্ড চেইন",
  "Civil Infrastructure & EPC": "অবকাঠামো ও ইপিসি",
  "Global Manpower & Trade": "বৈশ্বিক জনশক্তি ও বাণিজ্য",
  "Statutory Fiduciary & Legal": "আইনগত সুশাসন ও পরামর্শ",
  "View Venture Dossier": "বিস্তারিত দেখুন",
  "Live Website": "লাইভ ওয়েবসাইট",
  "Active Venture": "সক্রিয় ভেঞ্চার",
  "Strategic Entity": "কৌশলগত প্রতিষ্ঠান",

  // Page: Services
  "SERVICES & ENGAGEMENT MODELS": "সেবা ও এনগেজমেন্ট মডেল",
  "Full-Stack Engineering & Venture Services": "ফুল-স্ট্যাক ইঞ্জিনিয়ারিং ও ভেঞ্চার সেবাসমূহ",
  "Transparent pricing, written proposals in 1–3 days, and enterprise SLAs designed for mission-critical deployments.": "স্বচ্ছ মূল্য নির্ধারণ, ১–৩ দিনে লিখিত প্রস্তাবনা এবং মিশন-গুরুত্বপূর্ণ ডিপ্লয়মেন্টের জন্য এন্টারপ্রাইজ এসএলএ।",
  "Strategic Advisory": "কৌশলগত পরামর্শ",
  "Fixed-Fee Diagnostic": "নির্দিষ্ট ফি ডায়াগনস্টিক",
  "1–2 Week Discovery": "১–২ সপ্তাহের ডিসকভারি",
  "Rapid architecture audit, technical feasibility assessment, and cloud migration roadmaps.": "দ্রুত আর্কিটেকচার অডিট, কারিগরি সম্ভাব্যতা যাচাই ও ক্লাউড মাইগ্রেশন রোডম্যাপ।",
  "Dedicated Engineering Pod": "ডেডিকেটেড ইঞ্জিনিয়ারিং পড",
  "Monthly Retainer": "মাসিক রিটেইনার",
  "Bi-Weekly Agile Sprints": "দ্বি-সাপ্তাহিক এজাইল স্প্রিন্ট",
  "Full-stack squad (Lead Architect, 3 Senior Devs, QA Engineer) dedicated exclusively to your platform.": "আপনার প্ল্যাটফর্মের জন্য বিশেষভাবে নিবেদিত ফুল-স্ট্যাক টিম (লিড আর্কিটেক্ট, ৩ জন সিনিয়র ডেভেলপার, কিউএ)।",
  "Turnkey EPC Platform": "টার্নকি ইপিসি প্ল্যাটফর্ম",
  "Milestone-Based Disbursement": "মাইলফলক-ভিত্তিক পেমেন্ট",
  "End-to-end design, implementation, sovereign deployment, and post-launch maintenance.": "শুরু থেকে শেষ পর্যন্ত পূর্ণাঙ্গ ডিজাইন, বাস্তবায়ন, সার্বভৌম ডিপ্লয়মেন্ট এবং রক্ষণাবেক্ষণ।",

  // Page: Industries
  "INDUSTRIES & SECTOR FOOTPRINT": "শিল্পখাত ও প্রভাব",
  "Transforming Mission-Critical Sectors in Bangladesh": "বাংলাদেশের কৌশলগত শিল্পখাত রূপান্তর",
  "Deep domain engineering, regulatory compliance, and scalable technology infrastructure architected for the economic drivers of Bangladesh.": "বাংলাদেশের অর্থনৈতিক প্রবৃদ্ধির মূল চালিকাশক্তিগুলোর জন্য তৈরি গভীর ডোমেন ইঞ্জিনিয়ারিং ও প্রযুক্তি অবকাঠামো।",
  "Banking & Financial Services": "ব্যাংকিং ও আর্থিক সেবা",
  "Agriculture & Food Sovereignty": "কৃষি ও খাদ্য সার্বভৌমত্ব",
  "Media, Entertainment & OTT": "মিডিয়া, বিনোদন ও ওটিটি",
  "Transportation & Logistics": "পরিবহন ও লজিস্টিকস",
  "Public Sector & Governance": "সরকারি খাত ও সুশাসন",

  // Page: Insights
  "INSIGHTS & PUBLICATIONS": "ইনসাইট ও প্রকাশনা",
  "Institutional Research & Engineering Whitepapers": "প্রাতিষ্ঠানিক গবেষণা ও কারিগরি গবেষণাপত্র",
  "Perspectives on sovereign cloud, regenerative agritech, distributed systems, and venture building in high-growth frontier markets.": "সার্বভৌম ক্লাউড, পুনরুৎপাদনমূলক এগ্রিটেক এবং দ্রুত বিকাশমান ফ্রন্টিয়ার মার্কেটের দৃষ্টিভঙ্গি।",
  "Featured Whitepaper": "নির্বাচিত গবেষণাপত্র",
  "Latest Briefings": "সাম্প্রতিক বিশ্লেষণ",
  "Min Read": "মিনিট পাঠ",

  // Page: Careers
  "CAREERS & TALENT DENSITY": "ক্যারিয়ার ও সুযোগ",
  "Join Our Mission to Build Sovereign Technology": "সার্বভৌম প্রযুক্তি বিনির্মাণে আমাদের সাথে যুক্ত হোন",
  "We are recruiting top 1% engineering talent, agronomists, and operational leaders across Bangladesh to build world-class sovereign infrastructure.": "বিশ্বমানের সার্বভৌম প্রযুক্তি ও অবকাঠামো নির্মাণে আমরা সমগ্র বাংলাদেশ থেকে শীর্ষ ১% প্রকৌশলী ও প্রতিভাবানদের আমন্ত্রণ জানাচ্ছি।",
  "Open Positions": "উন্মুক্ত পদসমূহ",
  "Apply for this Role": "এই পদে আবেদন করুন",
  "Engineering Disciplines": "ইঞ্জিনিয়ারিং বিভাগসমূহ",
  "Compensation & Culture": "সুযোগ-সুবিধা ও সংস্কৃতি",
  "Fast-Track Review": "দ্রুত পর্যালোচনা",

  // Page: Contact
  "CORPORATE HEADQUARTERS & INTAKE": "কর্পোরেট হেডকোয়ার্টার ও যোগাযোগ",
  "— INSTITUTIONAL INQUIRIES & CORPORATE HEADQUARTERS —": "— প্রাতিষ্ঠানিক অনুসন্ধান ও কর্পোরেট সদর দপ্তর —",
  "INSTITUTIONAL INQUIRIES & CORPORATE HEADQUARTERS": "প্রাতিষ্ঠানিক অনুসন্ধান ও কর্পোরেট সদর দপ্তর",
  "Engage with executive leadership and practice directors": "নির্বাহী নেতৃত্ব এবং প্র্যাকটিস পরিচালকদের সাথে যোগাযোগ করুন",
  "Connect directly with managing partners, venture leads, and engineering directors at our Dhaka Corporate Headquarters.": "আমাদের ঢাকা কর্পোরেট হেডকোয়ার্টারে ব্যবস্থাপনা অংশীদার ও প্রযুক্তি পরিচালকদের সাথে সরাসরি যোগাযোগ করুন।",
  "Contact & Corporate Locator": "যোগাযোগ ও কর্পোরেট লোকেশন",
  "Connect directly with managing partners, venture leads, and engineering directors at our Dhaka Corporate Headquarters in Mirpur, Dhaka.": "মিরপুর, ঢাকায় অবস্থিত আমাদের কর্পোরেট হেডকোয়ার্টারে ব্যবস্থাপনা অংশীদার ও প্রযুক্তি পরিচালকদের সাথে সরাসরি যোগাযোগ করুন।",
  "1 Business Day": "১ কর্মদিবস",
  "Response SLA Contracted": "চুক্তিবদ্ধ রেসপন্স এসএলএ",
  "Corporate HQ": "কর্পোরেট হেডকোয়ার্টার",
  "Direct Partner Access": "সরাসরি অংশীদার এক্সেস",
  "Zero Recruiter Barrier": "মধ্যস্থতাকারী মুক্ত যোগাযোগ",
  "NDA Governance": "গোপনীয়তা চুক্তি (এনডিএ)",
  "Bilateral Protocol Enforced": "দ্বিপাক্ষিক নিরাপত্তা প্রোটোকল",
  "Send Us a Message": "আমাদের বার্তা পাঠান",
  "Full Name": "পূর্ণ নাম",
  "Corporate Email": "কর্পোরেট ইমেইল",
  "Corporate Email Address": "কর্পোরেট ইমেইল ঠিকানা",
  "Phone Number": "ফোন নম্বর",
  "Company / Organization": "প্রতিষ্ঠান / সংস্থা",
  "Practice Area": "সেবা ক্ষেত্র",
  "Project Overview & Requirements": "প্রকল্পের বিবরণ ও প্রয়োজনীয়তা",
  "Request Bilateral NDA Prior to Call": "কলের পূর্বে দ্বিপাক্ষিক গোপনীয়তা চুক্তি (NDA) অনুরোধ করুন",
  "Submit Inquiry": "অনুসন্ধান জমা দিন",
  "Submitting Inquiry...": "জমা দেওয়া হচ্ছে...",
  "Corporate Headquarters Specifications": "কর্পোরেট হেডকোয়ার্টার বিবরণ",
  "Metro Pillar - 312, Mirpur-11, Pallabi, Dhaka-1216": "মেট্রো পিলার - ৩১২, মিরপুর-১১, পল্লবী, ঢাকা-১২১৬",

  // Page: FAQ
  "CORPORATE FAQ & KNOWLEDGE BASE": "কর্পোরেট প্রশ্নোত্তর ও হেল্প সেন্টার",
  "Frequently Asked Questions": "প্রায়শই জিজ্ঞাসিত প্রশ্ন",
  "Everything you need to know about our engagement models, sovereign technology architectures, delivery timelines, pricing, and national operations across Bangladesh.": "আমাদের কাজের মডেল, সার্বভৌম প্রযুক্তি আর্কিটেকচার, ডেলিভারি সময়সীমা ও মূল্য সংক্রান্ত সকল তথ্য।",
  "100% IP": "১০০% আইপি",
  "Foreground IP fully assigned to client upon milestone settlement.": "মাইলফলক সম্পন্ন হলে ক্লায়েন্টকে সম্পূর্ণ সোর্স কোড ও আইপি হস্তান্তর করা হয়।",
  "24/7 SLA": "২৪/৭ এসএলএ",
  "Continuous SRE monitoring & guaranteed support response.": "সার্বক্ষণিক মনিটরিং ও নিশ্চিত সাপোর্ট রেসপন্স।",
  "Dhaka HQ": "ঢাকা হেডকোয়ার্টার",
  "Mirpur-11, Pallabi central corporate office (Metro Pillar -312).": "মিরপুর-১১, পল্লবী কেন্দ্রীয় কর্পোরেট অফিস (মেট্রো পিলার -৩১২)।",
  "NDA Guard": "এনডিএ সুরক্ষা",
  "Bilateral non-disclosure executed before technical deep-dive.": "প্রযুক্তিগত আলোচনার পূর্বে দ্বিপাক্ষিক গোপনীয়তা চুক্তি কার্যকর।",
  "Search FAQ...": "প্রশ্ন খুঁজুন...",
  "All Questions": "সকল প্রশ্ন",
  "General": "সাধারণ",
  "Ventures & IP": "ভেঞ্চার ও আইপি",
  "Engagement & Pricing": "এনগেজমেন্ট ও প্রাইসিং",
  "Delivery, SLA & Support": "ডেলিভারি, এসএলএ ও সাপোর্ট",
  "General & National Reach": "সাধারণ ও দেশব্যাপী উপস্থিতি",

  // Page: Application Status
  "APPLICATION STATUS TRACKER": "আবেদনের অবস্থা পর্যবেক্ষণ",
  "Track Your Review Status": "আপনার আবেদনের অগ্রগতি দেখুন",
  "Enter your reference ID and email to inspect your live hiring review status, interview schedule, and technical evaluation stage.": "আপনার রেফারেন্স আইডি ও ইমেইল দিয়ে আবেদনের লাইভ স্ট্যাটাস দেখুন।",
  "Application Reference ID": "আবেদন রেফারেন্স আইডি",
  "Registered Email Address": "নিবন্ধিত ইমেইল ঠিকানা",
  "Check Application Status": "আবেদনের অবস্থা যাচাই করুন",
  "Checking Status...": "যাচাই করা হচ্ছে...",
};

export function AutoTranslator() {
  const { language } = useLanguage();
  const pathname = usePathname();
  const originalMap = useRef<WeakMap<Node, string>>(new WeakMap());

  useEffect(() => {
    // Only run on public pages
    if (pathname?.startsWith("/admin")) return;

    const main = document.getElementById("main-content");
    if (!main) return;

    document.documentElement.lang = language;

    if (language === "bn") {
      // Translate all text nodes inside main
      const walker = document.createTreeWalker(main, NodeFilter.SHOW_TEXT, {
        acceptNode(node) {
          const parent = node.parentElement;
          if (!parent) return NodeFilter.FILTER_REJECT;
          const tag = parent.tagName.toUpperCase();
          if (tag === "SCRIPT" || tag === "STYLE" || tag === "CODE" || tag === "PRE") {
            return NodeFilter.FILTER_REJECT;
          }
          if (parent.closest("[data-no-translate]")) {
            return NodeFilter.FILTER_REJECT;
          }
          return NodeFilter.FILTER_ACCEPT;
        },
      });

      let currentNode = walker.nextNode();
      while (currentNode) {
        const text = currentNode.nodeValue;
        if (text && text.trim()) {
          const trimmed = text.trim();
          // Store original text if not already stored
          if (!originalMap.current.has(currentNode)) {
            originalMap.current.set(currentNode, text);
          }

          // Exact match
          if (TRANSLATION_MAP[trimmed]) {
            currentNode.nodeValue = text.replace(trimmed, TRANSLATION_MAP[trimmed]);
          } else {
            // Partial phrase matches for key labels
            let modified = text;
            for (const [enKey, bnVal] of Object.entries(TRANSLATION_MAP)) {
              if (enKey.length > 5 && modified.includes(enKey)) {
                modified = modified.replaceAll(enKey, bnVal);
              }
            }
            if (modified !== text) {
              currentNode.nodeValue = modified;
            }
          }
        }
        currentNode = walker.nextNode();
      }

      // Translate inputs and textareas placeholders
      const inputs = main.querySelectorAll<HTMLInputElement | HTMLTextAreaElement>("input, textarea");
      inputs.forEach((input) => {
        const placeholder = input.placeholder;
        if (placeholder && TRANSLATION_MAP[placeholder]) {
          if (!input.dataset.originalPlaceholder) {
            input.dataset.originalPlaceholder = placeholder;
          }
          input.placeholder = TRANSLATION_MAP[placeholder];
        }
      });
    } else {
      // Revert to English
      const walker = document.createTreeWalker(main, NodeFilter.SHOW_TEXT);
      let currentNode = walker.nextNode();
      while (currentNode) {
        if (originalMap.current.has(currentNode)) {
          currentNode.nodeValue = originalMap.current.get(currentNode) || currentNode.nodeValue;
        }
        currentNode = walker.nextNode();
      }

      const inputs = main.querySelectorAll<HTMLInputElement | HTMLTextAreaElement>("input, textarea");
      inputs.forEach((input) => {
        if (input.dataset.originalPlaceholder) {
          input.placeholder = input.dataset.originalPlaceholder;
        }
      });
    }
  }, [language, pathname]);

  return null;
}
