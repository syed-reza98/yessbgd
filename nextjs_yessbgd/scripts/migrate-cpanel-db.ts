import fs from "fs";
import path from "path";
import bcrypt from "bcryptjs";
import postgres from "postgres";

import { ventures } from "../data/ventures";
import { services } from "../data/services";
import { industries } from "../data/industries";
import { insights } from "../data/insights";
import { openings } from "../data/openings";
import companyContact from "../data/company-contact.json";

const DEFAULT_ADMIN_EMAIL = "admin@yessbgd.com";
const DEFAULT_ADMIN_PASS = "Admin@YessBgd2026!";
const ADMIN_HASH = bcrypt.hashSync(DEFAULT_ADMIN_PASS, 10);

function escapeSql(val: any): string {
  if (val === null || val === undefined) return "NULL";
  if (typeof val === "boolean") return val ? "true" : "false";
  if (typeof val === "number") return String(val);
  if (typeof val === "object") {
    return `'${JSON.stringify(val).replace(/'/g, "''")}'::jsonb`;
  }
  return `'${String(val).replace(/'/g, "''")}'`;
}

async function main() {
  console.log("🚀 Generating cPanel PostgreSQL Migration & Seed SQL...");

  const migrationDdlPath = path.join(__dirname, "../drizzle/0000_lyrical_tyrannus.sql");
  let ddl = "";
  if (fs.existsSync(migrationDdlPath)) {
    ddl = fs
      .readFileSync(migrationDdlPath, "utf8")
      .replace(/--> statement-breakpoint\s*/g, "\n")
      .replace(/;+/g, ";");

    // Make CREATE TABLE idempotent
    ddl = ddl.replace(/CREATE TABLE /g, "CREATE TABLE IF NOT EXISTS ");

    // Clean plain SQL for complete reset and initialization
    const dropTables = [
      "audit_logs",
      "cms_industries",
      "cms_insights",
      "cms_media",
      "cms_menu_items",
      "cms_openings",
      "cms_services",
      "cms_settings",
      "cms_site_pages",
      "cms_ventures",
      "contact_messages",
      "job_applications",
      "newsletter_subscribers",
      "user_roles",
      "profiles",
      "users",
    ].map((t) => `DROP TABLE IF EXISTS "${t}" CASCADE;`).join("\n");

    ddl = ddl.replace(
      /CREATE TYPE "public"\."app_role" AS ENUM\('admin', 'moderator', 'user'\);/,
      `${dropTables}\nDROP TYPE IF EXISTS "public"."app_role" CASCADE;\nCREATE TYPE "public"."app_role" AS ENUM('admin', 'moderator', 'user');`
    );

    // Make ALTER TABLE ADD CONSTRAINT idempotent with DROP CONSTRAINT IF EXISTS
    ddl = ddl.replace(
      /ALTER TABLE "profiles" ADD CONSTRAINT "profiles_id_users_id_fk"/g,
      `ALTER TABLE "profiles" DROP CONSTRAINT IF EXISTS "profiles_id_users_id_fk";\nALTER TABLE "profiles" ADD CONSTRAINT "profiles_id_users_id_fk"`
    );
    ddl = ddl.replace(
      /ALTER TABLE "user_roles" ADD CONSTRAINT "user_roles_user_id_users_id_fk"/g,
      `ALTER TABLE "user_roles" DROP CONSTRAINT IF EXISTS "user_roles_user_id_users_id_fk";\nALTER TABLE "user_roles" ADD CONSTRAINT "user_roles_user_id_users_id_fk"`
    );
  }

  const sqlStatements: string[] = [];

  sqlStatements.push(`-- ========================================================`);
  sqlStatements.push(`-- YESS BANGLADESH: cPanel PostgreSQL Complete Setup`);
  sqlStatements.push(`-- Database: yessban1_yessbd`);
  sqlStatements.push(`-- Generated At: ${new Date().toISOString()}`);
  sqlStatements.push(`-- ========================================================\n`);

  // Schema creation
  sqlStatements.push(ddl);

  // Admin user insertion
  const adminId = "321ad97d-ba98-4c96-a6b4-bc6f106c06e8";
  sqlStatements.push(`\n-- ── 1. Default Admin Credentials ─────────────────────────`);
  sqlStatements.push(`
INSERT INTO users (id, email, password, name, role, created_at, updated_at)
VALUES (
  '${adminId}',
  '${DEFAULT_ADMIN_EMAIL}',
  '${ADMIN_HASH}',
  'Executive Administrator',
  'admin',
  NOW(),
  NOW()
)
ON CONFLICT (email) DO UPDATE 
SET password = EXCLUDED.password, updated_at = NOW();

INSERT INTO profiles (id, full_name, job_title, language, theme, created_at, updated_at)
VALUES (
  '${adminId}',
  'Executive Administrator',
  'Managing Director',
  'en',
  'dark',
  NOW(),
  NOW()
)
ON CONFLICT (id) DO NOTHING;

INSERT INTO user_roles (id, user_id, role, created_at)
SELECT gen_random_uuid(), '${adminId}', 'admin', NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM user_roles WHERE user_id = '${adminId}' AND role = 'admin'
);
`);

  // Core Site Pages
  sqlStatements.push(`\n-- ── 2. Core Site Pages ──────────────────────────────────`);
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
      hero_subtitle: "Founded with a mission to deliver resilient, localized, enterprise-grade technology and operational systems. 500+ engineers, agronomists, and consultants across Bangladesh.",
      hero_subtitle_bn: "সারাদেশ জুড়ে ৫০০+ ইঞ্জিনিয়ার, এগ্রোনমিস্ট এবং পরামর্শক দল।",
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
      name: "Industries Served",
      name_bn: "শিল্প ও খাতসমূহ",
      hero_eyebrow: "— NATIONWIDE IMPACT SECTORS —",
      hero_eyebrow_bn: "— জাতীয় অগ্রাধিকার খাত —",
      hero_title: "Transforming key sectors across the economy of Bangladesh",
      hero_title_bn: "অর্থনীতির ключевые খাতসমূহের প্রযুক্তিগত রূপান্তর",
      hero_subtitle: "Targeted sector strategies across media broadcasting, retail commerce, agricultural supply chains, RMG manufacturing, and government modernization.",
      hero_subtitle_bn: "সম্প্রচার, বাণিজ্য, কৃষি সরবরাহ ও আরএমজি খাতে রূপান্তর।",
      hero_image: "/assets/industries-hero-bd.jpg",
      seo_title: "Industries Served | YESS Bangladesh",
      seo_description: "Key economic sectors transformed by YESS Bangladesh.",
      sort_order: 5,
      is_published: true,
    },
    {
      page: "insights",
      path: "/insights",
      name: "Insights & Research",
      name_bn: "গবেষণা ও ইনসাইটস",
      hero_eyebrow: "— INTELLECTUAL CAPITAL & RESEARCH —",
      hero_eyebrow_bn: "— বুদ্ধিবৃত্তিক গবেষণা ও বিশ্লেষণ —",
      hero_title: "Perspectives on technology sovereignty, media, and enterprise",
      hero_title_bn: "প্রযুক্তি সার্বভৌমত্ব, মিডিয়া ও এন্টারপ্রাইজ বিশ্লেষণ",
      hero_subtitle: "Thought leadership, white papers, and engineering dispatches from our architects and venture leaders in Dhaka.",
      hero_subtitle_bn: "আমাদের আর্কিটেক্ট ও ভেঞ্চার লিডারদের বিশ্লেষণ ও গবেষণাপত্র।",
      hero_image: "/assets/insights-dhaka-bd.jpg",
      seo_title: "Insights & Research | YESS Bangladesh",
      seo_description: "Research papers and technical perspectives from YESS Bangladesh.",
      sort_order: 6,
      is_published: true,
    },
    {
      page: "careers",
      path: "/careers",
      name: "Careers & Talent",
      name_bn: "ক্যারিয়ার ও সুযোগ",
      hero_eyebrow: "— JOIN THE SOVEREIGN MISSION —",
      hero_eyebrow_bn: "— আমাদের সাথে যুক্ত হোন —",
      hero_title: "Build the technology shaping modern Bangladesh",
      hero_title_bn: "আধুনিক বাংলাদেশের প্রযুক্তি অবকাঠামো নির্মাণে অংশ নিন",
      hero_subtitle: "We look for engineers, system architects, agronomists, and media innovators who want to build platforms that matter at national scale.",
      hero_subtitle_bn: "ইঞ্জিনিয়ার, সিস্টেম আর্কিটেক্ট ও ইনোভেটরদের খুঁজছি আমরা।",
      hero_image: "/assets/careers-team-bd.jpg",
      seo_title: "Careers & Opportunities | YESS Bangladesh",
      seo_description: "Explore career opportunities across the 13 operating entities of YESS Bangladesh.",
      sort_order: 7,
      is_published: true,
    },
    {
      page: "contact",
      path: "/contact",
      name: "Contact & Partnership",
      name_bn: "যোগাযোগ ও অংশীদারিত্ব",
      hero_eyebrow: "— ENGAGE OUR EXECUTIVE TEAM —",
      hero_eyebrow_bn: "— আমাদের টিমের সাথে যোগাযোগ করুন —",
      hero_title: "Begin a sovereign partnership or technology engagement",
      hero_title_bn: "প্রযুক্তি অংশীদারিত্ব বা পরামর্শের জন্য যোগাযোগ করুন",
      hero_subtitle: "Reach out to discuss venture co-building, enterprise software deployment, agricultural procurement, or institutional partnerships.",
      hero_subtitle_bn: "ভেঞ্চার কো-বিল্ডিং, এন্টারপ্রাইজ সফটওয়্যার বা প্রাতিষ্ঠানিক অংশীদারিত্ব।",
      hero_image: "/assets/contact-bd.jpg",
      seo_title: "Contact Us | YESS Bangladesh",
      seo_description: "Connect with YESS Bangladesh leadership and operational offices.",
      sort_order: 8,
      is_published: true,
    },
  ];

  for (const page of sitePages) {
    sqlStatements.push(`
INSERT INTO cms_site_pages (page, path, name, name_bn, hero_eyebrow, hero_eyebrow_bn, hero_title, hero_title_bn, hero_subtitle, hero_subtitle_bn, hero_image, seo_title, seo_title_bn, seo_description, seo_description_bn, sort_order, is_published)
VALUES (
  ${escapeSql(page.page)},
  ${escapeSql(page.path)},
  ${escapeSql(page.name)},
  ${escapeSql(page.name_bn)},
  ${escapeSql(page.hero_eyebrow)},
  ${escapeSql(page.hero_eyebrow_bn)},
  ${escapeSql(page.hero_title)},
  ${escapeSql(page.hero_title_bn)},
  ${escapeSql(page.hero_subtitle)},
  ${escapeSql(page.hero_subtitle_bn)},
  ${escapeSql(page.hero_image)},
  ${escapeSql(page.seo_title)},
  ${escapeSql(page.seo_title_bn || null)},
  ${escapeSql(page.seo_description)},
  ${escapeSql(page.seo_description_bn || null)},
  ${page.sort_order},
  true
)
ON CONFLICT (page) DO UPDATE SET
  hero_title = EXCLUDED.hero_title,
  hero_subtitle = EXCLUDED.hero_subtitle,
  updated_at = NOW();`);
  }

  // 3. Ventures
  sqlStatements.push(`\n-- ── 3. Operating Ventures (13 Subsidiaries) ─────────────`);
  for (let i = 0; i < ventures.length; i++) {
    const v = ventures[i];
    const { icon, ...cleanVenture } = v;
    sqlStatements.push(`
INSERT INTO cms_ventures (slug, title, tagline, description, category, status, image_path, sort_order, is_published, data)
VALUES (
  ${escapeSql(v.slug)},
  ${escapeSql(v.title)},
  ${escapeSql(v.tagline)},
  ${escapeSql(v.desc)},
  ${escapeSql(v.category)},
  ${escapeSql(v.status || "active")},
  ${escapeSql(v.image)},
  ${i + 1},
  true,
  ${escapeSql({
    longDesc: v.longDesc,
    highlights: v.highlights,
    services: v.services,
    audience: v.audience,
    features: v.features,
    founded: v.founded,
    reach: v.reach,
    domain: v.domain,
  })}
)
ON CONFLICT (slug) DO UPDATE SET
  title = EXCLUDED.title,
  tagline = EXCLUDED.tagline,
  description = EXCLUDED.description,
  data = EXCLUDED.data,
  updated_at = NOW();`);
  }

  // 4. Services
  sqlStatements.push(`\n-- ── 4. Core Enterprise Services ──────────────────────────`);
  for (let i = 0; i < services.length; i++) {
    const s = services[i];
    sqlStatements.push(`
INSERT INTO cms_services (slug, title, description, bullets, pricing, sort_order, is_published, data)
VALUES (
  ${escapeSql(s.slug)},
  ${escapeSql(s.title)},
  ${escapeSql(s.desc)},
  ${escapeSql(s.bullets)},
  ${escapeSql(s.pricing)},
  ${i + 1},
  true,
  ${escapeSql({
    intro: s.intro,
    cta: s.cta,
    capabilities: s.capabilities,
    deliverables: s.deliverables,
    techStack: s.techStack,
    process: s.process,
    faqs: s.faqs,
  })}
)
ON CONFLICT (slug) DO UPDATE SET
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  data = EXCLUDED.data,
  updated_at = NOW();`);
  }

  // 5. Industries
  sqlStatements.push(`\n-- ── 5. Industries Served ────────────────────────────────`);
  for (let i = 0; i < industries.length; i++) {
    const ind = industries[i];
    sqlStatements.push(`
INSERT INTO cms_industries (slug, title, description, outcomes, sort_order, is_published, data)
VALUES (
  ${escapeSql(ind.slug)},
  ${escapeSql(ind.title)},
  ${escapeSql(ind.desc)},
  ${escapeSql(ind.outcomes)},
  ${i + 1},
  true,
  ${escapeSql({
    intro: ind.intro,
    solutions: ind.solutions,
    caseStudy: ind.caseStudy,
    metrics: ind.metrics,
    cta: ind.cta,
  })}
)
ON CONFLICT (slug) DO UPDATE SET
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  data = EXCLUDED.data,
  updated_at = NOW();`);
  }

  // 6. Insights
  sqlStatements.push(`\n-- ── 6. Thought Leadership & Insights ────────────────────`);
  for (let i = 0; i < insights.length; i++) {
    const ins = insights[i];
    const category = (ins as any).category || ins.tag || "Technology";
    const authorStr = typeof ins.author === "string" ? ins.author : ins.author ? `${ins.author.name} (${ins.author.role})` : "YESS Engineering";
    const bodyMd = (ins as any).bodyMd || (ins.content ? ins.content.map((c: any) => (c.heading ? `### ${c.heading}\n\n${c.body}` : c.body)).join("\n\n") : "");
    const coverImg = (ins as any).coverImage || (ins as any).cover_image || null;
    const tags = (ins as any).tags || (ins.tag ? [ins.tag] : []);

    sqlStatements.push(`
INSERT INTO cms_insights (slug, title, excerpt, body_md, category, author, cover_image, tags, published_at, sort_order, is_published, data)
VALUES (
  ${escapeSql(ins.slug)},
  ${escapeSql(ins.title)},
  ${escapeSql(ins.excerpt)},
  ${escapeSql(bodyMd)},
  ${escapeSql(category)},
  ${escapeSql(authorStr)},
  ${escapeSql(coverImg)},
  ${escapeSql(tags)},
  ${escapeSql(ins.date ? new Date(ins.date).toISOString() : new Date().toISOString())},
  ${i + 1},
  true,
  ${escapeSql({ readTime: ins.readTime, content: ins.content })}
)
ON CONFLICT (slug) DO UPDATE SET
  title = EXCLUDED.title,
  excerpt = EXCLUDED.excerpt,
  body_md = EXCLUDED.body_md,
  category = EXCLUDED.category,
  author = EXCLUDED.author,
  data = EXCLUDED.data,
  updated_at = NOW();`);
  }

  // 7. Job Openings
  sqlStatements.push(`\n-- ── 7. Careers & Job Openings ───────────────────────────`);
  for (let i = 0; i < openings.length; i++) {
    const o = openings[i];
    const dept = (o as any).dept || (o as any).department || "Engineering";
    const jobType = (o as any).type || (o as any).jobType || "Full-time";
    const level = o.level || "Mid";
    const loc = o.location || "Dhaka / Remote";
    const salary = (o as any).salaryRange || (o as any).salary_range || null;

    sqlStatements.push(`
INSERT INTO cms_openings (slug, title, department, location, job_type, level, salary_range, summary, responsibilities, requirements, is_published, sort_order)
VALUES (
  ${escapeSql(o.slug)},
  ${escapeSql(o.title)},
  ${escapeSql(dept)},
  ${escapeSql(loc)},
  ${escapeSql(jobType)},
  ${escapeSql(level)},
  ${escapeSql(salary)},
  ${escapeSql(o.summary)},
  ${escapeSql(o.responsibilities)},
  ${escapeSql(o.requirements)},
  true,
  ${i + 1}
)
ON CONFLICT (slug) DO UPDATE SET
  title = EXCLUDED.title,
  department = EXCLUDED.department,
  location = EXCLUDED.location,
  job_type = EXCLUDED.job_type,
  level = EXCLUDED.level,
  salary_range = EXCLUDED.salary_range,
  summary = EXCLUDED.summary,
  responsibilities = EXCLUDED.responsibilities,
  requirements = EXCLUDED.requirements,
  updated_at = NOW();`);
  }

  // 8. Navigation Menus
  sqlStatements.push(`\n-- ── 8. Navigation Menus ──────────────────────────────────`);
  const headerMenus = [
    { label: "Home", label_bn: "হোম", href: "/", sort_order: 1 },
    { label: "About", label_bn: "আমাদের সম্পর্কে", href: "/about", sort_order: 2 },
    { label: "Ventures", label_bn: "ভেঞ্চার", href: "/ventures", badge: "13 Active", sort_order: 3 },
    { label: "Services", label_bn: "সার্ভিস", href: "/services", sort_order: 4 },
    { label: "Industries", label_bn: "ইন্ডাস্ট্রি", href: "/industries", sort_order: 5 },
    { label: "Insights", label_bn: "ইনসাইট", href: "/insights", badge: "Research", sort_order: 6 },
    { label: "Careers", label_bn: "ক্যারিয়ার", href: "/careers", badge: "Hiring", sort_order: 7 },
    { label: "Contact", label_bn: "যোগাযোগ", href: "/contact", sort_order: 8 },
  ];
  for (const m of headerMenus) {
    sqlStatements.push(`
INSERT INTO cms_menu_items (id, location, label, label_bn, href, badge, sort_order, is_published)
SELECT gen_random_uuid(), 'header', ${escapeSql(m.label)}, ${escapeSql(m.label_bn)}, ${escapeSql(m.href)}, ${escapeSql(m.badge || null)}, ${m.sort_order}, true
WHERE NOT EXISTS (
  SELECT 1 FROM cms_menu_items WHERE location = 'header' AND href = ${escapeSql(m.href)}
);`);
  }

  // 9. Company Settings
  sqlStatements.push(`\n-- ── 9. Corporate Settings ────────────────────────────────`);
  const contactPhone = typeof (companyContact as any).phone === "object"
    ? ((companyContact as any).phone.display || (companyContact as any).phone.tel || "+880 1805-464343")
    : ((companyContact as any).phone || "+880 1805-464343");
  const settingsEntries = [
    { key: "branding", label: "Corporate Identity", group: "general", value: { companyName: "YESS Bangladesh", companyNameBn: "ইয়েস বাংলাদেশ", legalName: "YESS Strategic Holdings Ltd.", registrationNo: "C-184920", tagline: "Sovereign Digital Platforms & Venture Studio" } },
    { key: "contact", label: "Executive Contact", group: "contact", value: { ...companyContact, phone: contactPhone, whatsapp: "+880 1805-464343" } },
    { key: "socials", label: "Official Social Accounts", group: "socials", value: (companyContact as any).socials || {
      twitter: "https://x.com/yessbangla",
      youtube: "https://youtube.com/@yessbangla",
      facebook: "https://facebook.com/yessbangla",
      linkedin: "https://linkedin.com/company/yessbangla",
    } },
  ];
  for (const s of settingsEntries) {
    sqlStatements.push(`
INSERT INTO cms_settings (key, label, "group", value, sort_order)
VALUES (${escapeSql(s.key)}, ${escapeSql(s.label)}, ${escapeSql(s.group)}, ${escapeSql(s.value)}, 1)
ON CONFLICT (key) DO UPDATE SET value = EXCLUDED.value, updated_at = NOW();`);
  }

  const finalSql = sqlStatements.join("\n");
  const outputPath = path.join(__dirname, "../cpanel-database-setup.sql");
  fs.writeFileSync(outputPath, finalSql, "utf8");
  console.log("✅ Successfully generated standalone setup file:", outputPath);

  // If local DATABASE_URL is available and reachable, run it directly
  if (process.env.DATABASE_URL) {
    console.log("📡 Attempting live database connection on DATABASE_URL...");
    try {
      const sqlClient = postgres(process.env.DATABASE_URL, { max: 1, timeout: 5 });
      await sqlClient.unsafe(finalSql);
      console.log("🎉 Database migration and seeding executed successfully on remote/local host!");
      await sqlClient.end();
    } catch (dbErr: any) {
      console.log("ℹ️ Live DB execution skipped or failed (expected if local DB is offline or cPanel DB port 5432 is restricted to localhost):", dbErr.message);
    }
  }
}

main().catch(console.error);
