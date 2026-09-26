import { createClient } from "@supabase/supabase-js";
import { ventures } from "../data/ventures";
import { services } from "../data/services";
import { industries } from "../data/industries";
import { insights } from "../data/insights";
import { openings } from "../data/openings";
import ventureProfiles from "../data/ventureProfiles.json";
import companyContact from "../data/company-contact.json";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://vhffmxoqirbczmcpoqtx.supabase.co";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZoZmZteG9xaXJiY3ptY3BvcXR4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTA0NDc0OTcsImV4cCI6MjEwNjAyMzQ5N30.KA71VaM-70gcegKJB0BXjh9S-qKeRW9eQ9hq-axbf8A";

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function main() {
  console.log("🚀 Starting Supabase Seeding on:", supabaseUrl);

  // Authenticate as Admin
  console.log("🔐 Authenticating as admin@yessbgd.com...");
  const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
    email: "admin@yessbgd.com",
    password: "Admin@YessBgd2026!",
  });

  if (authError || !authData.session) {
    console.error("❌ Failed to authenticate as admin:", authError?.message);
    process.exit(1);
  }
  console.log("✅ Authenticated successfully as Admin:", authData.user.email);

  // 1. Seed Site Pages
  console.log("📄 Seeding 12 Core Site Pages...");
  const sitePages = [
    {
      page: "home",
      path: "/",
      name: "Home",
      name_bn: "হোম",
      hero_eyebrow: "— SOVEREIGN DIGITAL PLATFORMS & VENTURE STUDIO —",
      hero_eyebrow_bn: "— সার্বভৌম ডিজিটাল প্ল্যাটফর্ম ও ভেঞ্চার স্টুডিও —",
      hero_title: "Building sovereign digital infrastructure for Bangladesh",
      hero_title_bn: "বাংলাদেশের জন্য সার্বভৌম ডিজিটাল অবকাঠামো নির্মাণ",
      hero_subtitle: "From nationwide OTT streaming and automated newsrooms to enterprise ERPs and cold-chain agritech — YESS Bangladesh operates 13 strategic subsidiaries driving digital transformation.",
      hero_subtitle_bn: "দেশব্যাপী ওটিটি স্ট্রিমিং ও আধুনিক নিউজরুম থেকে শুরু করে এন্টারপ্রাইজ ইআরপি ও এগ্রিটেক — ইয়েস বাংলাদেশ পরিচালনা করছে ১৩টি স্বনির্ভর সাবসিডিয়ারি।",
      hero_image: "/assets/heroes/yess_bangla_hero_bg.png",
      seo_title: "YESS Bangladesh | Sovereign Venture Builder & Holding Company",
      seo_title_bn: "ইয়েস বাংলাদেশ | সভরেন ভেঞ্চার বিল্ডার",
      seo_description: "Explore the 13 sovereign subsidiaries of YESS Bangladesh spanning cloud software, media streaming, agritech, and logistics.",
      seo_description_bn: "ইয়েস বাংলাদেশের ১৩টি কৌশলগত সাবসিডিয়ারি এক্সপ্লোর করুন।",
      sort_order: 1,
      is_published: true,
    },
    {
      page: "about",
      path: "/about",
      name: "About Us",
      name_bn: "আমাদের সম্পর্কে",
      hero_eyebrow: "— STRATEGIC MANDATE & GOVERNANCE —",
      hero_eyebrow_bn: "— কৌশলগত লক্ষ্য ও সুশাসন —",
      hero_title: "Eight years of sovereign technology delivery across Bangladesh",
      hero_title_bn: "বাংলাদেশে আট বছরের সার্বভৌম প্রযুক্তি সেবা ও উদ্ভাবন",
      hero_subtitle: "Founded with a mission to deliver resilient, localized, enterprise-grade technology and operational systems. 500+ engineers, agronomists, and consultants across Motijheel and Gulshan.",
      hero_subtitle_bn: "মতিঝিল ও গুলশান কেন্দ্রিক ৫০০+ ইঞ্জিনিয়ার, এগ্রোনমিস্ট এবং পরামর্শক দল।",
      hero_image: "/assets/about-team-bd.jpg",
      seo_title: "About Us | YESS Bangladesh",
      seo_description: "Learn about the mission, governance, and operating history of YESS Bangladesh.",
      sort_order: 2,
      is_published: true,
    },
    {
      page: "ventures",
      path: "/ventures",
      name: "Ventures Directory",
      name_bn: "ভেঞ্চার ডিরেক্টরি",
      hero_eyebrow: "— SOVEREIGN SUBSIDIARY PORTFOLIO —",
      hero_eyebrow_bn: "— সহযোগী প্রতিষ্ঠান পোর্টফোলিও —",
      hero_title: "Thirteen operating subsidiaries powering core national sectors",
      hero_title_bn: "জাতীয় গুরুত্বপূর্ণ খাতসমূহ পরিচালনা করছে ১৩টি প্রতিষ্ঠান",
      hero_subtitle: "Across technology, cloud infrastructure, agricultural distribution, and digital broadcasting — explore the operating entities of YESS Bangladesh.",
      hero_subtitle_bn: "প্রযুক্তি, ক্লাউড, কৃষি সরবরাহ ও ডিজিটাল সম্প্রচার খাত।",
      hero_image: "/assets/ventures-dhaka-bd.jpg",
      seo_title: "Ventures Directory | YESS Bangladesh",
      seo_description: "Discover all 13 subsidiaries operating under YESS Bangladesh.",
      sort_order: 3,
      is_published: true,
    },
    {
      page: "services",
      path: "/services",
      name: "Services & Solutions",
      name_bn: "সার্ভিস ও সমাধান",
      hero_eyebrow: "— ENTERPRISE SERVICES & STRATEGIC CAPABILITIES —",
      hero_eyebrow_bn: "— এন্টারপ্রাইজ সার্ভিস ও সক্ষমতা —",
      hero_title: "Six core disciplines delivered with engineering conviction",
      hero_title_bn: "প্রকৌশলগত উৎকর্ষের সাথে ৬টি কোর সার্ভিস ডেলিভারি",
      hero_subtitle: "From turnkey streaming platforms and enterprise ERP to sovereign cloud architecture and legal advisory — built for reliability at national scale.",
      hero_subtitle_bn: "টার্নকি স্ট্রিমিং ও ইআরপি থেকে সার্বভৌম ক্লাউড স্থাপত্য।",
      hero_image: "/assets/services-tech-bd.jpg",
      seo_title: "Services & Solutions | YESS Bangladesh",
      seo_description: "Enterprise capabilities and engagement models offered by YESS Bangladesh.",
      sort_order: 4,
      is_published: true,
    },
    {
      page: "industries",
      path: "/industries",
      name: "Industry Verticals",
      name_bn: "ইন্ডাস্ট্রি খাত",
      hero_eyebrow: "— SECTOR TRANSFORMATION PRACTICES —",
      hero_eyebrow_bn: "— খাতভিত্তিক রূপান্তর —",
      hero_title: "Proven transformation across eight critical economic sectors",
      hero_title_bn: "দেশের ৮টি গুরুত্বপূর্ণ অর্থনৈতিক খাতে সফল রূপান্তর",
      hero_subtitle: "Custom architectural blueprints for Manufacturing RMG, Financial Services, Media & Broadcasting, Agritech, Healthcare, and Public Sector.",
      hero_subtitle_bn: "আরএমজি, ফিনটেক, মিডিয়া ও কৃষি খাতে প্রযুক্তি সলিউশন।",
      seo_title: "Industries | YESS Bangladesh",
      seo_description: "Sector-specific technology practices delivered by YESS Bangladesh.",
      sort_order: 5,
      is_published: true,
    },
    {
      page: "insights",
      path: "/insights",
      name: "Insights & Research",
      name_bn: "ইনসাইট ও রিসার্চ",
      hero_eyebrow: "— INSTITUTIONAL RESEARCH & THOUGHT LEADERSHIP —",
      hero_eyebrow_bn: "— গবেষণা ও পলিসি পেপার —",
      hero_title: "Engineering whitepapers, policy briefs, and architectural blueprints",
      hero_title_bn: "ইঞ্জিনিয়ারিং হোয়াইটপেপার ও স্থাপত্য ব্লুপ্রিন্ট",
      hero_subtitle: "Peer-reviewed analysis from the architects, engineers, and researchers building sovereign systems at YESS Bangladesh.",
      hero_subtitle_bn: "ইয়েস বাংলাদেশের প্রকৌশলীদের গবেষণাধর্মী বিশ্লেষণ।",
      seo_title: "Insights & Research | YESS Bangladesh",
      seo_description: "Authoritative whitepapers and architectural dispatches.",
      sort_order: 6,
      is_published: true,
    },
    {
      page: "careers",
      path: "/careers",
      name: "Careers Hub",
      name_bn: "ক্যারিয়ার হাব",
      hero_eyebrow: "— TALENT TELEMETRY & SOVEREIGN RECRUITMENT —",
      hero_eyebrow_bn: "— মেধা অন্বেষণ ও ক্যারিয়ার —",
      hero_title: "Build the systems that shape the digital future of Bangladesh",
      hero_title_bn: "বাংলাদেশের ডিজিটাল ভবিষ্যৎ বিনির্মাণে যোগ দিন",
      hero_subtitle: "Join 500+ builders, engineers, and researchers across Motijheel HQ and Gulshan Innovation Labs with competitive BDT salaries and SPV venture equity.",
      hero_subtitle_bn: "আকর্ষণীয় বেতন ও ইকুইটি সুবিধাসহ যোগ দিন আমাদের টিমে।",
      seo_title: "Careers | YESS Bangladesh",
      seo_description: "Explore open engineering, design, and operational roles at YESS Bangladesh.",
      sort_order: 7,
      is_published: true,
    },
    {
      page: "contact",
      path: "/contact",
      name: "Contact & Offices",
      name_bn: "যোগাযোগ ও অফিস",
      hero_eyebrow: "— INSTITUTIONAL INQUIRIES & DUAL-OFFICE LOCATOR —",
      hero_eyebrow_bn: "— প্রাতিষ্ঠানিক যোগাযোগ —",
      hero_title: "Engage with executive leadership and practice directors",
      hero_title_bn: "নেতৃত্ব ও প্রকল্প পরিচালকদের সাথে যোগাযোগ করুন",
      hero_subtitle: "Motijheel Corporate Headquarters and Gulshan-2 Innovation Labs with guaranteed 24-hour response SLAs.",
      hero_subtitle_bn: "মতিঝিল কর্পোরেট হেডকোয়ার্টার এবং গুলশান ইনোভেশন ল্যাব।",
      hero_image: "/assets/contact-welcome-bd.jpg",
      seo_title: "Contact Us | YESS Bangladesh",
      seo_description: "Direct executive inquiry portal and GPS dual-office locator.",
      sort_order: 8,
      is_published: true,
    },
    {
      page: "application-status",
      path: "/application-status",
      name: "Application Tracker",
      name_bn: "আবেদন ট্র্যাকার",
      hero_eyebrow: "— CANDIDATE APPLICATION STATUS VAULT —",
      hero_eyebrow_bn: "— প্রার্থী ট্র্যাকিং ভল্ট —",
      hero_title: "Encrypted candidate evaluation pipeline",
      hero_title_bn: "এনক্রিপ্ট করা আবেদন মূল্যায়ন ট্র্যাক করুন",
      hero_subtitle: "Track your 5-stage recruitment journey in real time with your application reference ID and registered email.",
      hero_subtitle_bn: "আপনার রেফারেন্স নম্বর ও ইমেইল দিয়ে প্রগ্রেস ট্র্যাক করুন।",
      seo_title: "Application Status Tracker | YESS Bangladesh",
      seo_description: "Real-time candidate telemetry and recruitment stage tracker.",
      sort_order: 9,
      is_published: true,
    },
    {
      page: "faq",
      path: "/faq",
      name: "Knowledge Base & FAQ",
      name_bn: "সাধারণ জিজ্ঞাসা",
      hero_eyebrow: "— FREQUENTLY ADDRESSED INQUIRIES —",
      hero_eyebrow_bn: "— সাধারণ জিজ্ঞাসা ও উত্তর —",
      hero_title: "Transparent answers to institutional, partnership, and technical inquiries",
      hero_title_bn: "প্রাতিষ্ঠানিক ও প্রযুক্তিগত তথ্যের স্বচ্ছ বিবরণ",
      hero_subtitle: "Governance, engagement models, intellectual property assignments, and service guarantees.",
      hero_subtitle_bn: "সুশাসন, প্রজেক্ট মডেল ও মেধাস্বত্ব সুরক্ষার বিস্তারিত।",
      seo_title: "FAQ | YESS Bangladesh",
      seo_description: "Answers to common questions about YESS Bangladesh.",
      sort_order: 10,
      is_published: true,
    },
    {
      page: "terms",
      path: "/terms",
      name: "Terms of Service",
      name_bn: "শর্তাবলি",
      hero_eyebrow: "— STATUTORY GOVERNANCE & TERMS OF ENGAGEMENT —",
      hero_eyebrow_bn: "— ব্যবহারের শর্তাবলি —",
      hero_title: "Institutional Terms of Service",
      hero_title_bn: "প্রাতিষ্ঠানিক সেবা ব্যবহারের শর্তাবলি",
      hero_subtitle: "100% Foreground IP assignment guarantee, RJSC statutory registration C-184920.",
      hero_subtitle_bn: "মেধাস্বত্ব ও আইনি সুরক্ষা নিশ্চয়তা।",
      seo_title: "Terms of Service | YESS Bangladesh",
      seo_description: "Institutional terms of service and statutory covenants.",
      sort_order: 11,
      is_published: true,
    },
    {
      page: "privacy",
      path: "/privacy",
      name: "Privacy Policy",
      name_bn: "প্রাইভেসি নীতি",
      hero_eyebrow: "— DATA SOVEREIGNTY & PRIVACY POLICY —",
      hero_eyebrow_bn: "— গোপনীয়তা নীতি —",
      hero_title: "National Data Protection & Privacy Policy",
      hero_title_bn: "তথ্য সুরক্ষা ও গোপনীয়তা নীতিমালা",
      hero_subtitle: "Aligned with domestic Data Protection Act and international GDPR standards with zero foreign data egress.",
      hero_subtitle_bn: "আন্তর্জাতিক ও জাতীয় মান অনুযায়ী তথ্য সুরক্ষা।",
      seo_title: "Privacy Policy | YESS Bangladesh",
      seo_description: "Data protection standards and privacy practices of YESS Bangladesh.",
      sort_order: 12,
      is_published: true,
    },
  ];

  for (const page of sitePages) {
    const { error } = await supabase.from("cms_site_pages").upsert(page as any, { onConflict: "page" });
    if (error) console.error(`Error seeding page ${page.page}:`, error.message);
  }
  console.log("✅ Site pages seeded!");

  // 2. Seed 13 Ventures
  console.log("🏢 Seeding 13 Operating Ventures...");
  const bpVentures = (ventureProfiles as any).ventures || {};

  for (let i = 0; i < ventures.length; i++) {
    const v = ventures[i];
    const bp = bpVentures[v.slug] || {};

    const ventureRow = {
      slug: v.slug,
      title: v.title,
      tagline: v.tagline,
      description: v.desc,
      category: v.category,
      status: v.status || "active",
      icon: "Code2",
      image_path: v.image,
      sort_order: i + 1,
      is_published: true,
      data: {
        longDesc: v.longDesc,
        highlights: v.highlights,
        services: v.services,
        audience: v.audience,
        features: v.features,
        founded: v.founded,
        reach: v.reach,
        domain: v.domain,
        color: v.color,
        logoUrl: v.logoUrl,
        caseStudy: v.caseStudy,
        testimonial: v.testimonial,
        milestones: v.milestones,
        packages: v.packages,
        faqs: v.faqs,
        gallery: v.gallery || [],
        bilingual: bp,
      },
    };

    const { error } = await supabase.from("cms_ventures").upsert(ventureRow, { onConflict: "slug" });
    if (error) console.error(`Error seeding venture ${v.slug}:`, error.message);
  }
  console.log("✅ 13 Ventures seeded!");

  // 3. Seed 6 Services
  console.log("🛠️ Seeding 6 Core Services...");
  for (let i = 0; i < services.length; i++) {
    const s = services[i];
    const serviceRow = {
      slug: s.slug,
      title: s.title,
      description: s.desc,
      icon: "Tv",
      bullets: s.bullets,
      pricing: s.pricing,
      sort_order: i + 1,
      is_published: true,
      data: {
        intro: s.intro,
        cta: s.cta,
        capabilities: s.capabilities,
        deliverables: s.deliverables,
        techStack: s.techStack,
        process: s.process,
        faqs: s.faqs,
      },
    };

    const { error } = await supabase.from("cms_services").upsert(serviceRow, { onConflict: "slug" });
    if (error) console.error(`Error seeding service ${s.slug}:`, error.message);
  }
  console.log("✅ 6 Services seeded!");

  // 4. Seed 8 Industries
  console.log("🏭 Seeding 8 Industry Practices...");
  for (let i = 0; i < industries.length; i++) {
    const ind = industries[i];
    const indRow = {
      slug: ind.slug,
      title: ind.title,
      description: ind.desc,
      icon: "Tv",
      outcomes: ind.outcomes,
      sort_order: i + 1,
      is_published: true,
      data: {
        intro: ind.intro,
        challenges: ind.challenges,
        solutions: ind.solutions,
        keyMetrics: ind.keyMetrics,
        caseHighlights: ind.caseHighlights,
        compliance: ind.compliance,
        faqs: ind.faqs,
      },
    };

    const { error } = await supabase.from("cms_industries").upsert(indRow, { onConflict: "slug" });
    if (error) console.error(`Error seeding industry ${ind.slug}:`, error.message);
  }
  console.log("✅ 8 Industries seeded!");

  // 5. Seed Insights
  console.log("📑 Seeding Insights & Whitepapers...");
  for (let i = 0; i < insights.length; i++) {
    const ins = insights[i];
    const bodyMd = ins.content
      .map((c) => (c.heading ? `### ${c.heading}\n\n${c.body}` : c.body))
      .join("\n\n");

    const insightRow = {
      slug: ins.slug,
      title: ins.title,
      excerpt: ins.excerpt,
      body_md: bodyMd,
      category: ins.tag,
      author: `${ins.author.name} (${ins.author.role})`,
      cover_image: "/assets/heroes/yess_bangla_hero_bg.png",
      tags: [ins.tag, "Sovereign Mesh", "Bangladesh"],
      sort_order: i + 1,
      is_published: true,
      data: {
        date: ins.date,
        readTime: ins.readTime,
        content: ins.content,
      },
    };

    const { error } = await supabase.from("cms_insights").upsert(insightRow, { onConflict: "slug" });
    if (error) console.error(`Error seeding insight ${ins.slug}:`, error.message);
  }
  console.log("✅ Insights seeded!");

  // 6. Seed 12 Job Openings
  console.log("💼 Seeding 12 Job Openings...");
  for (let i = 0; i < openings.length; i++) {
    const o = openings[i];
    const jobRow = {
      slug: o.slug,
      title: o.title,
      department: o.dept,
      location: o.location,
      job_type: o.type,
      level: o.level,
      salary_range: "৳ 1,50,000 – ৳ 3,50,000 / month + Equity",
      summary: o.summary,
      responsibilities: o.responsibilities,
      requirements: o.requirements,
      sort_order: i + 1,
      is_published: true,
    };

    const { error } = await supabase.from("cms_openings").upsert(jobRow, { onConflict: "slug" });
    if (error) console.error(`Error seeding opening ${o.slug}:`, error.message);
  }
  console.log("✅ 12 Job Openings seeded!");

  // 7. Seed Corporate Settings
  console.log("⚙️ Seeding Corporate Settings...");
  const settings = [
    {
      key: "branding",
      label: "Branding & Logos",
      group: "branding",
      value: {
        companyName: "YESS Bangladesh",
        companyNameBn: "ইয়েস বাংলাদেশ",
        legalName: "Yess Bangla Private Limited",
        registrationNo: "C-184920",
        logoUrl: "/assets/logos/yess-bangla-logo.png",
        letterheadUrl: "/assets/logos/yess-bangla-letterhead.jpeg",
        faviconUrl: "/favicon.png",
      },
    },
    {
      key: "contact",
      label: "Corporate Contact Desks",
      group: "contact",
      value: {
        phone: "+880 1805-464343",
        email: "yessbangla.bd@gmail.com",
        investEmail: "invest@yessbgd.com",
        careersEmail: "careers@yessbgd.com",
        whatsapp: "+880 1805-464343",
        address: "Block-A, Road-3, House-127 (Green View), 1st Floor, Mirpur-12, Dhaka-1216",
        addressBn: "ব্লক-এ, রোড-৩, হাউজ-১২৭ (গ্রিন ভিউ), ১ম তলা, মিরপুর-১২, ঢাকা-১২১৬",
      },
    },
    {
      key: "offices",
      label: "Dual Office Network",
      group: "locations",
      value: {
        motijheel: {
          name: "Corporate Headquarters",
          nameBn: "কর্পোরেট হেডকোয়ার্টার",
          address: "Jiban Bima Bhaban, Level 14, 10 Dilkusha C/A, Motijheel, Dhaka-1000",
          lat: 23.7289,
          lng: 90.4184,
          hours: "BST 09:00 - 18:00 (Sun - Thu)",
          badge: "Statutory & Board",
        },
        gulshan: {
          name: "Innovation & Delivery Labs",
          nameBn: "ইনোভেশন ও ডেলিভারি ল্যাব",
          address: "Road 134, Gulshan-2, Dhaka-1212",
          lat: 23.7925,
          lng: 90.4078,
          hours: "24/7 Operations",
          badge: "NOC / SRE Hub",
        },
      },
    },
    {
      key: "socials",
      label: "Social Media Channels",
      group: "social",
      value: {
        linkedin: "https://linkedin.com/company/yessbangla",
        twitter: "https://x.com/yessbangla",
        facebook: "https://facebook.com/yessbangla",
        youtube: "https://youtube.com/@yessbangla",
      },
    },
  ];

  for (const s of settings) {
    const { error } = await supabase.from("cms_settings").upsert(s as any, { onConflict: "key" });
    if (error) console.error(`Error seeding setting ${s.key}:`, error.message);
  }
  console.log("✅ Corporate settings seeded!");

  // 8. Seed Navigation Menus
  console.log("🧭 Seeding Navigation Menu Items...");
  const menuItems = [
    { label: "Home", label_bn: "হোম", href: "/", location: "header", sort_order: 1 },
    { label: "About", label_bn: "আমাদের সম্পর্কে", href: "/about", location: "header", sort_order: 2 },
    { label: "Ventures", label_bn: "ভেঞ্চার", href: "/ventures", location: "header", badge: "13 Active", sort_order: 3 },
    { label: "Services", label_bn: "সার্ভিস", href: "/services", location: "header", sort_order: 4 },
    { label: "Industries", label_bn: "ইন্ডাস্ট্রি", href: "/industries", location: "header", sort_order: 5 },
    { label: "Insights", label_bn: "ইনসাইট", href: "/insights", location: "header", badge: "Research", sort_order: 6 },
    { label: "Careers", label_bn: "ক্যারিয়ার", href: "/careers", location: "header", badge: "Hiring", sort_order: 7 },
    { label: "Contact", label_bn: "যোগাযোগ", href: "/contact", location: "header", sort_order: 8 },
  ];

  for (const m of menuItems) {
    const { error } = await supabase.from("cms_menu_items").insert(m as any);
    if (error && !error.message.includes("duplicate")) console.error(`Error seeding menu ${m.label}:`, error.message);
  }
  console.log("✅ Navigation menus seeded!");

  console.log("🎉 ALL MOCK DATA SEEDED INTO SUPABASE DATABASE SUCCESSFULLY!");
}

main().catch((err) => {
  console.error("FATAL Seeder Error:", err);
  process.exit(1);
});
