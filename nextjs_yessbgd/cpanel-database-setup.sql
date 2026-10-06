-- ========================================================
-- YESS BANGLADESH: cPanel PostgreSQL Complete Setup
-- Database: yessban1_yessbd
-- Generated At: 2026-10-06T14:26:38.856Z
-- ========================================================

DROP TABLE IF EXISTS "audit_logs" CASCADE;
DROP TABLE IF EXISTS "cms_industries" CASCADE;
DROP TABLE IF EXISTS "cms_insights" CASCADE;
DROP TABLE IF EXISTS "cms_media" CASCADE;
DROP TABLE IF EXISTS "cms_menu_items" CASCADE;
DROP TABLE IF EXISTS "cms_openings" CASCADE;
DROP TABLE IF EXISTS "cms_services" CASCADE;
DROP TABLE IF EXISTS "cms_settings" CASCADE;
DROP TABLE IF EXISTS "cms_site_pages" CASCADE;
DROP TABLE IF EXISTS "cms_ventures" CASCADE;
DROP TABLE IF EXISTS "contact_messages" CASCADE;
DROP TABLE IF EXISTS "job_applications" CASCADE;
DROP TABLE IF EXISTS "newsletter_subscribers" CASCADE;
DROP TABLE IF EXISTS "user_roles" CASCADE;
DROP TABLE IF EXISTS "profiles" CASCADE;
DROP TABLE IF EXISTS "users" CASCADE;
DROP TYPE IF EXISTS "public"."app_role" CASCADE;
CREATE TYPE "public"."app_role" AS ENUM('admin', 'moderator', 'user');
CREATE TABLE IF NOT EXISTS "audit_logs" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"actor_id" uuid,
	"action" text NOT NULL,
	"table_name" text NOT NULL,
	"record_id" text,
	"old_data" jsonb,
	"new_data" jsonb,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);

CREATE TABLE IF NOT EXISTS "cms_industries" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"slug" text NOT NULL,
	"title" text NOT NULL,
	"description" text,
	"icon" text,
	"outcomes" jsonb DEFAULT '[]'::jsonb,
	"sort_order" integer DEFAULT 0,
	"is_published" boolean DEFAULT true,
	"data" jsonb DEFAULT '{}'::jsonb,
	"created_at" timestamp with time zone DEFAULT now(),
	"updated_at" timestamp with time zone DEFAULT now(),
	CONSTRAINT "cms_industries_slug_unique" UNIQUE("slug")
);

CREATE TABLE IF NOT EXISTS "cms_insights" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"slug" text NOT NULL,
	"title" text NOT NULL,
	"excerpt" text,
	"body_md" text,
	"category" text,
	"author" text,
	"cover_image" text,
	"tags" jsonb DEFAULT '[]'::jsonb,
	"published_at" timestamp with time zone DEFAULT now(),
	"sort_order" integer DEFAULT 0,
	"is_published" boolean DEFAULT true,
	"data" jsonb DEFAULT '{}'::jsonb,
	"created_at" timestamp with time zone DEFAULT now(),
	"updated_at" timestamp with time zone DEFAULT now(),
	CONSTRAINT "cms_insights_slug_unique" UNIQUE("slug")
);

CREATE TABLE IF NOT EXISTS "cms_media" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"file_name" text NOT NULL,
	"url" text NOT NULL,
	"path" text,
	"mime_type" text,
	"size_bytes" bigint,
	"alt_text" text,
	"folder" text DEFAULT 'general',
	"created_at" timestamp with time zone DEFAULT now(),
	"updated_at" timestamp with time zone DEFAULT now()
);

CREATE TABLE IF NOT EXISTS "cms_menu_items" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"location" text DEFAULT 'header' NOT NULL,
	"parent_id" uuid,
	"depth" integer DEFAULT 0 NOT NULL,
	"label" text NOT NULL,
	"label_bn" text,
	"href" text NOT NULL,
	"group_label" text,
	"badge" text,
	"badge_bn" text,
	"icon" text,
	"sort_order" integer DEFAULT 0,
	"is_external" boolean DEFAULT false,
	"is_published" boolean DEFAULT true,
	"created_at" timestamp with time zone DEFAULT now(),
	"updated_at" timestamp with time zone DEFAULT now()
);

CREATE TABLE IF NOT EXISTS "cms_openings" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"slug" text NOT NULL,
	"title" text NOT NULL,
	"department" text NOT NULL,
	"location" text NOT NULL,
	"job_type" text DEFAULT 'Full-time',
	"level" text DEFAULT 'Mid',
	"salary_range" text,
	"summary" text,
	"responsibilities" jsonb DEFAULT '[]'::jsonb,
	"requirements" jsonb DEFAULT '[]'::jsonb,
	"is_published" boolean DEFAULT true,
	"sort_order" integer DEFAULT 0,
	"created_at" timestamp with time zone DEFAULT now(),
	"updated_at" timestamp with time zone DEFAULT now(),
	CONSTRAINT "cms_openings_slug_unique" UNIQUE("slug")
);

CREATE TABLE IF NOT EXISTS "cms_services" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"slug" text NOT NULL,
	"title" text NOT NULL,
	"description" text,
	"icon" text,
	"bullets" jsonb DEFAULT '[]'::jsonb,
	"pricing" jsonb DEFAULT '{}'::jsonb,
	"sort_order" integer DEFAULT 0,
	"is_published" boolean DEFAULT true,
	"data" jsonb DEFAULT '{}'::jsonb,
	"created_at" timestamp with time zone DEFAULT now(),
	"updated_at" timestamp with time zone DEFAULT now(),
	CONSTRAINT "cms_services_slug_unique" UNIQUE("slug")
);

CREATE TABLE IF NOT EXISTS "cms_settings" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"key" text NOT NULL,
	"label" text,
	"group" text DEFAULT 'general',
	"value" jsonb DEFAULT '{}'::jsonb,
	"sort_order" integer DEFAULT 0,
	"created_at" timestamp with time zone DEFAULT now(),
	"updated_at" timestamp with time zone DEFAULT now(),
	CONSTRAINT "cms_settings_key_unique" UNIQUE("key")
);

CREATE TABLE IF NOT EXISTS "cms_site_pages" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"page" text NOT NULL,
	"path" text NOT NULL,
	"name" text NOT NULL,
	"name_bn" text,
	"hero_eyebrow" text,
	"hero_eyebrow_bn" text,
	"hero_title" text,
	"hero_title_bn" text,
	"hero_subtitle" text,
	"hero_subtitle_bn" text,
	"hero_image" text,
	"body" text,
	"body_bn" text,
	"seo_title" text,
	"seo_title_bn" text,
	"seo_description" text,
	"seo_description_bn" text,
	"og_image" text,
	"is_custom" boolean DEFAULT false,
	"is_published" boolean DEFAULT true,
	"sort_order" integer DEFAULT 0,
	"data" jsonb DEFAULT '{}'::jsonb,
	"created_at" timestamp with time zone DEFAULT now(),
	"updated_at" timestamp with time zone DEFAULT now(),
	CONSTRAINT "cms_site_pages_page_unique" UNIQUE("page")
);

CREATE TABLE IF NOT EXISTS "cms_ventures" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"slug" text NOT NULL,
	"title" text NOT NULL,
	"tagline" text,
	"description" text,
	"category" text,
	"status" text DEFAULT 'active',
	"icon" text,
	"image_path" text,
	"sort_order" integer DEFAULT 0,
	"is_published" boolean DEFAULT true,
	"data" jsonb DEFAULT '{}'::jsonb,
	"created_at" timestamp with time zone DEFAULT now(),
	"updated_at" timestamp with time zone DEFAULT now(),
	CONSTRAINT "cms_ventures_slug_unique" UNIQUE("slug")
);

CREATE TABLE IF NOT EXISTS "contact_messages" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" text,
	"email" text NOT NULL,
	"phone" text,
	"subject" text,
	"message" text NOT NULL,
	"practice_area" text,
	"status" text DEFAULT 'new' NOT NULL,
	"status_note" text,
	"status_updated_at" timestamp with time zone,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"full_name" text,
	"organization" text,
	"request_nda" boolean DEFAULT false,
	"is_read" boolean DEFAULT false,
	"is_archived" boolean DEFAULT false
);

CREATE TABLE IF NOT EXISTS "job_applications" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"job_slug" text,
	"job_title" text,
	"full_name" text NOT NULL,
	"email" text NOT NULL,
	"phone" text NOT NULL,
	"linkedin" text,
	"applicant_location" text,
	"cover_letter" text,
	"resume_path" text,
	"resume_name" text,
	"resume_size" integer,
	"resume_type" text,
	"status" text DEFAULT 'Submitted' NOT NULL,
	"status_note" text,
	"status_updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"reference_number" text,
	"opening_id" text,
	"opening_title" text,
	"portfolio_url" text,
	"cover_note" text,
	"resume_url" text,
	"feedback" text,
	"scheduled_at" timestamp with time zone
);

CREATE TABLE IF NOT EXISTS "newsletter_subscribers" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"email" text NOT NULL,
	"source" text DEFAULT 'footer',
	"created_at" timestamp with time zone DEFAULT now(),
	CONSTRAINT "newsletter_subscribers_email_unique" UNIQUE("email")
);

CREATE TABLE IF NOT EXISTS "profiles" (
	"id" uuid PRIMARY KEY NOT NULL,
	"full_name" text,
	"job_title" text,
	"phone" text,
	"avatar_url" text,
	"language" text DEFAULT 'en',
	"theme" text DEFAULT 'dark',
	"notify_new_application" boolean DEFAULT true,
	"notify_new_message" boolean DEFAULT true,
	"items_per_page" integer DEFAULT 20,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);

CREATE TABLE IF NOT EXISTS "user_roles" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" uuid NOT NULL,
	"role" "app_role" NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);

CREATE TABLE IF NOT EXISTS "users" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"email" text NOT NULL,
	"password" text NOT NULL,
	"name" text,
	"role" "app_role" DEFAULT 'admin' NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "users_email_unique" UNIQUE("email")
);

ALTER TABLE "profiles" DROP CONSTRAINT IF EXISTS "profiles_id_users_id_fk";
ALTER TABLE "profiles" ADD CONSTRAINT "profiles_id_users_id_fk" FOREIGN KEY ("id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
ALTER TABLE "user_roles" DROP CONSTRAINT IF EXISTS "user_roles_user_id_users_id_fk";
ALTER TABLE "user_roles" ADD CONSTRAINT "user_roles_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;

-- ── 1. Default Admin Credentials ─────────────────────────

INSERT INTO users (id, email, password, name, role, created_at, updated_at)
VALUES (
  '321ad97d-ba98-4c96-a6b4-bc6f106c06e8',
  'admin@yessbgd.com',
  '$2b$10$X79vtTQcmYaCdcD1Ycp.Y.I7doq0PBEba0qMxWQ3gVqorGaIUUGfi',
  'Executive Administrator',
  'admin',
  NOW(),
  NOW()
)
ON CONFLICT (email) DO UPDATE 
SET password = EXCLUDED.password, updated_at = NOW();

INSERT INTO profiles (id, full_name, job_title, language, theme, created_at, updated_at)
VALUES (
  '321ad97d-ba98-4c96-a6b4-bc6f106c06e8',
  'Executive Administrator',
  'Managing Director',
  'en',
  'dark',
  NOW(),
  NOW()
)
ON CONFLICT (id) DO NOTHING;

INSERT INTO user_roles (id, user_id, role, created_at)
SELECT gen_random_uuid(), '321ad97d-ba98-4c96-a6b4-bc6f106c06e8', 'admin', NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM user_roles WHERE user_id = '321ad97d-ba98-4c96-a6b4-bc6f106c06e8' AND role = 'admin'
);


-- ── 2. Core Site Pages ──────────────────────────────────

INSERT INTO cms_site_pages (page, path, name, name_bn, hero_eyebrow, hero_eyebrow_bn, hero_title, hero_title_bn, hero_subtitle, hero_subtitle_bn, hero_image, seo_title, seo_title_bn, seo_description, seo_description_bn, sort_order, is_published)
VALUES (
  'home',
  '/',
  'Home',
  'হোম',
  '— SOVEREIGN DIGITAL PLATFORMS & VENTURE STUDIO —',
  '— সার্বভৌম ডিজিটাল প্ল্যাটফর্ম ও ভেঞ্চার স্টুডিও —',
  'Building sovereign digital infrastructure for Bangladesh',
  'বাংলাদেশের জন্য সার্বভৌম ডিজিটাল অবকাঠামো নির্মাণ',
  'From nationwide OTT streaming and automated newsrooms to enterprise ERPs and cold-chain agritech — YESS Bangladesh operates 13 strategic subsidiaries driving digital transformation.',
  'দেশব্যাপী ওটিটি স্ট্রিমিং ও আধুনিক নিউজরুম থেকে শুরু করে এন্টারপ্রাইজ ইআরপি ও এগ্রিটেক — ইয়েস বাংলাদেশ পরিচালনা করছে ১৩টি স্বনির্ভর সাবসিডিয়ারি।',
  '/assets/heroes/yess_bangla_hero_bg.png',
  'YESS Bangladesh | Sovereign Venture Builder & Holding Company',
  'ইয়েস বাংলাদেশ | সভরেন ভেঞ্চার বিল্ডার',
  'Explore the 13 sovereign subsidiaries of YESS Bangladesh spanning cloud software, media streaming, agritech, and logistics.',
  'ইয়েস বাংলাদেশের ১৩টি কৌশলগত সাবসিডিয়ারি এক্সপ্লোর করুন।',
  1,
  true
)
ON CONFLICT (page) DO UPDATE SET
  hero_title = EXCLUDED.hero_title,
  hero_subtitle = EXCLUDED.hero_subtitle,
  updated_at = NOW();

INSERT INTO cms_site_pages (page, path, name, name_bn, hero_eyebrow, hero_eyebrow_bn, hero_title, hero_title_bn, hero_subtitle, hero_subtitle_bn, hero_image, seo_title, seo_title_bn, seo_description, seo_description_bn, sort_order, is_published)
VALUES (
  'about',
  '/about',
  'About Us',
  'আমাদের সম্পর্কে',
  '— STRATEGIC MANDATE & GOVERNANCE —',
  '— কৌশলগত লক্ষ্য ও সুশাসন —',
  'Eight years of sovereign technology delivery across Bangladesh',
  'বাংলাদেশে আট বছরের সার্বভৌম প্রযুক্তি সেবা ও উদ্ভাবন',
  'Founded with a mission to deliver resilient, localized, enterprise-grade technology and operational systems. 500+ engineers, agronomists, and consultants across Bangladesh.',
  'সারাদেশ জুড়ে ৫০০+ ইঞ্জিনিয়ার, এগ্রোনমিস্ট এবং পরামর্শক দল।',
  '/assets/about-team-bd.jpg',
  'About Us | YESS Bangladesh',
  NULL,
  'Learn about the mission, governance, and operating history of YESS Bangladesh.',
  NULL,
  2,
  true
)
ON CONFLICT (page) DO UPDATE SET
  hero_title = EXCLUDED.hero_title,
  hero_subtitle = EXCLUDED.hero_subtitle,
  updated_at = NOW();

INSERT INTO cms_site_pages (page, path, name, name_bn, hero_eyebrow, hero_eyebrow_bn, hero_title, hero_title_bn, hero_subtitle, hero_subtitle_bn, hero_image, seo_title, seo_title_bn, seo_description, seo_description_bn, sort_order, is_published)
VALUES (
  'ventures',
  '/ventures',
  'Ventures Directory',
  'ভেঞ্চার ডিরেক্টরি',
  '— SOVEREIGN SUBSIDIARY PORTFOLIO —',
  '— সহযোগী প্রতিষ্ঠান পোর্টফোলিও —',
  'Thirteen operating subsidiaries powering core national sectors',
  'জাতীয় গুরুত্বপূর্ণ খাতসমূহ পরিচালনা করছে ১৩টি প্রতিষ্ঠান',
  'Across technology, cloud infrastructure, agricultural distribution, and digital broadcasting — explore the operating entities of YESS Bangladesh.',
  'প্রযুক্তি, ক্লাউড, কৃষি সরবরাহ ও ডিজিটাল সম্প্রচার খাত।',
  '/assets/ventures-dhaka-bd.jpg',
  'Ventures Directory | YESS Bangladesh',
  NULL,
  'Discover all 13 subsidiaries operating under YESS Bangladesh.',
  NULL,
  3,
  true
)
ON CONFLICT (page) DO UPDATE SET
  hero_title = EXCLUDED.hero_title,
  hero_subtitle = EXCLUDED.hero_subtitle,
  updated_at = NOW();

INSERT INTO cms_site_pages (page, path, name, name_bn, hero_eyebrow, hero_eyebrow_bn, hero_title, hero_title_bn, hero_subtitle, hero_subtitle_bn, hero_image, seo_title, seo_title_bn, seo_description, seo_description_bn, sort_order, is_published)
VALUES (
  'services',
  '/services',
  'Services & Solutions',
  'সার্ভিস ও সমাধান',
  '— ENTERPRISE SERVICES & STRATEGIC CAPABILITIES —',
  '— এন্টারপ্রাইজ সার্ভিস ও সক্ষমতা —',
  'Six core disciplines delivered with engineering conviction',
  'প্রকৌশলগত উৎকর্ষের সাথে ৬টি কোর সার্ভিস ডেলিভারি',
  'From turnkey streaming platforms and enterprise ERP to sovereign cloud architecture and legal advisory — built for reliability at national scale.',
  'টার্নকি স্ট্রিমিং ও ইআরপি থেকে সার্বভৌম ক্লাউড স্থাপত্য।',
  '/assets/services-tech-bd.jpg',
  'Services & Solutions | YESS Bangladesh',
  NULL,
  'Enterprise capabilities and engagement models offered by YESS Bangladesh.',
  NULL,
  4,
  true
)
ON CONFLICT (page) DO UPDATE SET
  hero_title = EXCLUDED.hero_title,
  hero_subtitle = EXCLUDED.hero_subtitle,
  updated_at = NOW();

INSERT INTO cms_site_pages (page, path, name, name_bn, hero_eyebrow, hero_eyebrow_bn, hero_title, hero_title_bn, hero_subtitle, hero_subtitle_bn, hero_image, seo_title, seo_title_bn, seo_description, seo_description_bn, sort_order, is_published)
VALUES (
  'industries',
  '/industries',
  'Industries Served',
  'শিল্প ও খাতসমূহ',
  '— NATIONWIDE IMPACT SECTORS —',
  '— জাতীয় অগ্রাধিকার খাত —',
  'Transforming key sectors across the economy of Bangladesh',
  'অর্থনীতির ключевые খাতসমূহের প্রযুক্তিগত রূপান্তর',
  'Targeted sector strategies across media broadcasting, retail commerce, agricultural supply chains, RMG manufacturing, and government modernization.',
  'সম্প্রচার, বাণিজ্য, কৃষি সরবরাহ ও আরএমজি খাতে রূপান্তর।',
  '/assets/industries-hero-bd.jpg',
  'Industries Served | YESS Bangladesh',
  NULL,
  'Key economic sectors transformed by YESS Bangladesh.',
  NULL,
  5,
  true
)
ON CONFLICT (page) DO UPDATE SET
  hero_title = EXCLUDED.hero_title,
  hero_subtitle = EXCLUDED.hero_subtitle,
  updated_at = NOW();

INSERT INTO cms_site_pages (page, path, name, name_bn, hero_eyebrow, hero_eyebrow_bn, hero_title, hero_title_bn, hero_subtitle, hero_subtitle_bn, hero_image, seo_title, seo_title_bn, seo_description, seo_description_bn, sort_order, is_published)
VALUES (
  'insights',
  '/insights',
  'Insights & Research',
  'গবেষণা ও ইনসাইটস',
  '— INTELLECTUAL CAPITAL & RESEARCH —',
  '— বুদ্ধিবৃত্তিক গবেষণা ও বিশ্লেষণ —',
  'Perspectives on technology sovereignty, media, and enterprise',
  'প্রযুক্তি সার্বভৌমত্ব, মিডিয়া ও এন্টারপ্রাইজ বিশ্লেষণ',
  'Thought leadership, white papers, and engineering dispatches from our architects and venture leaders in Dhaka.',
  'আমাদের আর্কিটেক্ট ও ভেঞ্চার লিডারদের বিশ্লেষণ ও গবেষণাপত্র।',
  '/assets/insights-dhaka-bd.jpg',
  'Insights & Research | YESS Bangladesh',
  NULL,
  'Research papers and technical perspectives from YESS Bangladesh.',
  NULL,
  6,
  true
)
ON CONFLICT (page) DO UPDATE SET
  hero_title = EXCLUDED.hero_title,
  hero_subtitle = EXCLUDED.hero_subtitle,
  updated_at = NOW();

INSERT INTO cms_site_pages (page, path, name, name_bn, hero_eyebrow, hero_eyebrow_bn, hero_title, hero_title_bn, hero_subtitle, hero_subtitle_bn, hero_image, seo_title, seo_title_bn, seo_description, seo_description_bn, sort_order, is_published)
VALUES (
  'careers',
  '/careers',
  'Careers & Talent',
  'ক্যারিয়ার ও সুযোগ',
  '— JOIN THE SOVEREIGN MISSION —',
  '— আমাদের সাথে যুক্ত হোন —',
  'Build the technology shaping modern Bangladesh',
  'আধুনিক বাংলাদেশের প্রযুক্তি অবকাঠামো নির্মাণে অংশ নিন',
  'We look for engineers, system architects, agronomists, and media innovators who want to build platforms that matter at national scale.',
  'ইঞ্জিনিয়ার, সিস্টেম আর্কিটেক্ট ও ইনোভেটরদের খুঁজছি আমরা।',
  '/assets/careers-team-bd.jpg',
  'Careers & Opportunities | YESS Bangladesh',
  NULL,
  'Explore career opportunities across the 13 operating entities of YESS Bangladesh.',
  NULL,
  7,
  true
)
ON CONFLICT (page) DO UPDATE SET
  hero_title = EXCLUDED.hero_title,
  hero_subtitle = EXCLUDED.hero_subtitle,
  updated_at = NOW();

INSERT INTO cms_site_pages (page, path, name, name_bn, hero_eyebrow, hero_eyebrow_bn, hero_title, hero_title_bn, hero_subtitle, hero_subtitle_bn, hero_image, seo_title, seo_title_bn, seo_description, seo_description_bn, sort_order, is_published)
VALUES (
  'contact',
  '/contact',
  'Contact & Partnership',
  'যোগাযোগ ও অংশীদারিত্ব',
  '— ENGAGE OUR EXECUTIVE TEAM —',
  '— আমাদের টিমের সাথে যোগাযোগ করুন —',
  'Begin a sovereign partnership or technology engagement',
  'প্রযুক্তি অংশীদারিত্ব বা পরামর্শের জন্য যোগাযোগ করুন',
  'Reach out to discuss venture co-building, enterprise software deployment, agricultural procurement, or institutional partnerships.',
  'ভেঞ্চার কো-বিল্ডিং, এন্টারপ্রাইজ সফটওয়্যার বা প্রাতিষ্ঠানিক অংশীদারিত্ব।',
  '/assets/contact-bd.jpg',
  'Contact Us | YESS Bangladesh',
  NULL,
  'Connect with YESS Bangladesh leadership and operational offices.',
  NULL,
  8,
  true
)
ON CONFLICT (page) DO UPDATE SET
  hero_title = EXCLUDED.hero_title,
  hero_subtitle = EXCLUDED.hero_subtitle,
  updated_at = NOW();

-- ── 3. Operating Ventures (13 Subsidiaries) ─────────────

INSERT INTO cms_ventures (slug, title, tagline, description, category, status, image_path, sort_order, is_published, data)
VALUES (
  'yess-soft',
  'Yess Soft',
  'Engineering software that scales with your ambition.',
  'Custom software, web & mobile applications, ERP, CRM and enterprise systems built for modern businesses across Bangladesh and beyond.',
  'Software & IT Solutions',
  'active',
  '/assets/ventures/yess-soft.jpg',
  1,
  true,
  '{"longDesc":"Yess Soft is the engineering core of the YESS Bangla group — a product studio that ships secure, observable, cloud-native software for ambitious teams. From single-screen MVPs to multi-tenant ERP platforms, every release is built with TypeScript, automated tests, and a relentless focus on time-to-value.","highlights":["Web & mobile application development","ERP, CRM & inventory management systems","UI/UX design and product strategy","Cloud-native, secure and scalable architectures"],"services":["Web Development","Mobile Apps","ERP Systems","Cloud Solutions","UI/UX Design"],"audience":"Startups, SMEs, enterprises and government agencies seeking digital transformation.","features":[{"title":"Senior-only delivery pods","desc":"Every project is led by a tech lead, designer and PM — no hand-offs."},{"title":"Production-ready in 90 days","desc":"Discovery, design and a working v1 inside a single quarter."},{"title":"Long-term partnership","desc":"Quarterly roadmap reviews, dedicated success manager and 24/5 support."}],"founded":"2018","reach":"Clients across BD, UAE & UK","domain":"yessbangla.top"}'::jsonb
)
ON CONFLICT (slug) DO UPDATE SET
  title = EXCLUDED.title,
  tagline = EXCLUDED.tagline,
  description = EXCLUDED.description,
  data = EXCLUDED.data,
  updated_at = NOW();

INSERT INTO cms_ventures (slug, title, tagline, description, category, status, image_path, sort_order, is_published, data)
VALUES (
  'akash-tv',
  'Akash TV',
  'Stories that connect a nation.',
  'A modern satellite broadcast channel delivering news, entertainment, drama, talk shows and cultural programs across the country.',
  'Satellite Television',
  'upcoming',
  '/assets/ventures/akash-tv.jpg',
  2,
  true,
  '{"longDesc":"Akash TV is a 24/7 general-entertainment satellite channel reaching households across Bangladesh and the diaspora. From breaking news to flagship dramas and live cultural events, our newsroom and production studios are built to international broadcast standards.","highlights":["24/7 satellite broadcasting","News, drama, talk shows and cultural programs","In-house production studio","Nationwide reach and growing global audience"],"services":["News & Current Affairs","Drama & Entertainment","Live Programs","Brand Sponsorships"],"audience":"Viewers, advertisers and content creators looking for a premium broadcast platform.","features":[{"title":"HD newsroom","desc":"Three studios, automated graphics, dual control rooms and live OB capability."},{"title":"Original drama slate","desc":"12+ flagship serials a year, produced in-house with award-winning directors."},{"title":"Brand-safe inventory","desc":"Curated programming blocks and custom integrations for premium advertisers."}],"founded":"2019","reach":"Nationwide + diaspora"}'::jsonb
)
ON CONFLICT (slug) DO UPDATE SET
  title = EXCLUDED.title,
  tagline = EXCLUDED.tagline,
  description = EXCLUDED.description,
  data = EXCLUDED.data,
  updated_at = NOW();

INSERT INTO cms_ventures (slug, title, tagline, description, category, status, image_path, sort_order, is_published, data)
VALUES (
  'akash-ott',
  'Akash OTT',
  'Your favourite shows, anytime — on any screen.',
  'An on-demand streaming platform with films, web originals, live TV and exclusive premieres tailored for Bangla-speaking audiences worldwide.',
  'Streaming Platform',
  'active',
  '/assets/ventures/akash-ott.jpg',
  3,
  true,
  '{"longDesc":"Akash OTT is the digital home for Bangla storytelling — feature films, web series, live TV simulcasts and exclusive premieres, available on mobile, web and smart TV with personalised recommendations and offline downloads.","highlights":["On-demand films, series and originals","Live TV streaming across devices","Personalised recommendations","Multi-device support — mobile, web, smart TV"],"services":["Subscription Streaming","Original Content","Live TV","Brand Partnerships"],"audience":"Households, content fans and brands seeking digital reach.","features":[{"title":"Adaptive streaming","desc":"DRM-protected delivery from 144p to 4K with sub-2s start times."},{"title":"Originals studio","desc":"A pipeline of platform-exclusive series and films across genres."},{"title":"Smart discovery","desc":"ML-driven recommendations, watch-party mode and continue-watching across devices."}],"founded":"2022","reach":"Available in 40+ countries","domain":"akash.tv"}'::jsonb
)
ON CONFLICT (slug) DO UPDATE SET
  title = EXCLUDED.title,
  tagline = EXCLUDED.tagline,
  description = EXCLUDED.description,
  data = EXCLUDED.data,
  updated_at = NOW();

INSERT INTO cms_ventures (slug, title, tagline, description, category, status, image_path, sort_order, is_published, data)
VALUES (
  'the-daily-akash',
  'The Daily Akash',
  'Trusted journalism for a modern Bangladesh.',
  'A digital-first newspaper delivering breaking news, in-depth analysis, business, sports and lifestyle stories that matter — every day.',
  'Digital Newspaper',
  'active',
  '/assets/ventures/the-daily-akash.jpg',
  4,
  true,
  '{"longDesc":"The Daily Akash is an independent, digital-first newsroom. Our reporters cover politics, business, sports, technology and culture with an editorial code that puts accuracy and accountability ahead of speed.","highlights":["Breaking news and investigative reporting","Business, politics, sports and lifestyle coverage","Multimedia storytelling — video, audio, long-reads","Mobile-first digital experience"],"services":["News Reporting","Editorial & Opinion","Display & Native Ads","Sponsored Content"],"audience":"Readers, advertisers and PR partners who value credible journalism.","features":[{"title":"Independent newsroom","desc":"Editorial firewall, source protection and a published corrections policy."},{"title":"Long-form & investigations","desc":"A dedicated desk for multi-week investigations and data journalism."},{"title":"Native ad studio","desc":"Brand storytelling that respects readers — clearly labelled, beautifully crafted."}],"founded":"2020","reach":"Millions of monthly readers","domain":"akash.news"}'::jsonb
)
ON CONFLICT (slug) DO UPDATE SET
  title = EXCLUDED.title,
  tagline = EXCLUDED.tagline,
  description = EXCLUDED.description,
  data = EXCLUDED.data,
  updated_at = NOW();

INSERT INTO cms_ventures (slug, title, tagline, description, category, status, image_path, sort_order, is_published, data)
VALUES (
  'yess-legal-advice',
  'Yess Legal Advice',
  'Trusted counsel for every stage of business.',
  'Corporate legal advisory — company formation, contracts, compliance, intellectual property and dispute support for businesses and individuals.',
  'Legal Advisory',
  'active',
  '/assets/ventures/yess-legal-advice.jpg',
  5,
  true,
  '{"longDesc":"Yess Legal Advice is the group''s counsel desk — a panel of barristers, advocates and company secretaries who handle everything from RJSC incorporation and trade licences to contract drafting, IP filings and regulatory compliance, so founders can build with confidence.","highlights":["Company formation, RJSC & trade licence support","Contract drafting, review and negotiation","Trademark, copyright and IP protection","Regulatory compliance and dispute resolution"],"services":["Company Formation","Contracts & Agreements","IP & Trademark","Compliance & Disputes"],"audience":"Startups, SMEs, enterprises and individuals seeking dependable legal counsel.","features":[{"title":"Fixed-fee packages","desc":"Transparent pricing for formation, contracts and filings — quoted before work begins."},{"title":"Senior advocates only","desc":"Every matter is led by a bar enrolled advocate — no juniors learning on your file."},{"title":"Business-first counsel","desc":"Advice written for operators, not academics — risk flagged, options ranked, next steps clear."}],"founded":"2024","reach":"Clients across BD & the diaspora"}'::jsonb
)
ON CONFLICT (slug) DO UPDATE SET
  title = EXCLUDED.title,
  tagline = EXCLUDED.tagline,
  description = EXCLUDED.description,
  data = EXCLUDED.data,
  updated_at = NOW();

INSERT INTO cms_ventures (slug, title, tagline, description, category, status, image_path, sort_order, is_published, data)
VALUES (
  'yess-organic-haat',
  'Yess Organic Haat',
  'Pure. Local. Delivered to your door.',
  'Farm-to-table organic food and lifestyle products sourced directly from verified local producers and delivered fresh.',
  'Organic Marketplace',
  'active',
  '/assets/ventures/yess-organic-haat.jpg',
  6,
  true,
  '{"longDesc":"Yess Organic Haat is a farm-to-fork marketplace that connects verified Bangladeshi farmers directly to urban households. Cold-chain logistics, lab-tested produce and a transparent grading system mean what you order is what arrives — fresh, traceable and fair to the grower.","highlights":["Verified organic produce and groceries","Direct sourcing from local farmers","Cold-chain logistics and quality control","Subscription and one-time delivery"],"services":["Fresh Produce","Pantry & Groceries","Wellness Products","Corporate Supply"],"audience":"Health-conscious households, restaurants and corporate offices.","features":[{"title":"Lab-tested produce","desc":"Random batch testing for pesticides and heavy metals at an accredited lab."},{"title":"Fair-trade pricing","desc":"Farmers receive a published floor price plus a quality bonus on every harvest."},{"title":"Cold-chain delivery","desc":"Temperature-controlled vans and same-day fulfilment across major cities."}],"founded":"2021","reach":"200+ partner farms","domain":"organichaat.top"}'::jsonb
)
ON CONFLICT (slug) DO UPDATE SET
  title = EXCLUDED.title,
  tagline = EXCLUDED.tagline,
  description = EXCLUDED.description,
  data = EXCLUDED.data,
  updated_at = NOW();

INSERT INTO cms_ventures (slug, title, tagline, description, category, status, image_path, sort_order, is_published, data)
VALUES (
  'shondhaan',
  'Shondhaan',
  'Trusted experts, just a tap away.',
  'On-demand professional services — from home maintenance and cleaning to expert consultations — delivered by vetted professionals.',
  'Home & Professional Services',
  'active',
  '/assets/ventures/yess-service.jpg',
  7,
  true,
  '{"longDesc":"Shondhaan brings the country''s best home and professional service providers onto a single, dependable booking platform. Every technician is background-checked, trained and rated by customers — with a written service guarantee on every job.","highlights":["Home repair, cleaning and maintenance","Vetted, background-checked professionals","Transparent pricing and instant booking","Service guarantee on every job"],"services":["Home Repair","Deep Cleaning","AC & Appliance Service","Professional Consultation"],"audience":"Homeowners, tenants and businesses needing reliable on-demand services.","features":[{"title":"Vetted professionals","desc":"ID checks, skill assessments and ongoing training on safety and etiquette."},{"title":"Upfront pricing","desc":"See the price before you book — no surprises, no haggling, no hidden fees."},{"title":"Service guarantee","desc":"If you''re not satisfied, we send a second professional or refund — your call."}],"founded":"2022","reach":"Dhaka, Chittagong, Sylhet","domain":"shondhaan.com"}'::jsonb
)
ON CONFLICT (slug) DO UPDATE SET
  title = EXCLUDED.title,
  tagline = EXCLUDED.tagline,
  description = EXCLUDED.description,
  data = EXCLUDED.data,
  updated_at = NOW();

INSERT INTO cms_ventures (slug, title, tagline, description, category, status, image_path, sort_order, is_published, data)
VALUES (
  'yess-host',
  'Yess Host',
  'Fast, secure hosting built for growth.',
  'Reliable web hosting, domains, cloud servers and managed infrastructure for businesses of all sizes — backed by 24/7 expert support.',
  'Hosting & Cloud Infrastructure',
  'active',
  '/assets/ventures/yess-host.jpg',
  8,
  true,
  '{"longDesc":"Yess Host is enterprise-grade infrastructure for everyone — from a first portfolio site to a multi-region SaaS. NVMe storage, isolated containers, automated backups and a tier-3 support desk that actually answers.","highlights":["Shared, VPS and cloud hosting","Domain registration and SSL","Managed servers with 99.9% uptime","24/7 technical support"],"services":["Web Hosting","Cloud VPS","Domains & SSL","Managed Servers"],"audience":"Developers, agencies and businesses building online.","features":[{"title":"NVMe everywhere","desc":"Every plan runs on NVMe storage with HTTP/3 and global caching out of the box."},{"title":"One-click stacks","desc":"WordPress, Laravel, Next.js, Node, n8n and 30+ apps in under a minute."},{"title":"Real humans, 24/7","desc":"Median first-response under 4 minutes — by chat, ticket or phone."}],"founded":"2019","reach":"Multi-region, BD-first"}'::jsonb
)
ON CONFLICT (slug) DO UPDATE SET
  title = EXCLUDED.title,
  tagline = EXCLUDED.tagline,
  description = EXCLUDED.description,
  data = EXCLUDED.data,
  updated_at = NOW();

INSERT INTO cms_ventures (slug, title, tagline, description, category, status, image_path, sort_order, is_published, data)
VALUES (
  'yess-event',
  'Yess Event',
  'Unforgettable experiences, expertly delivered.',
  'End-to-end event planning, production and management for corporate, cultural, brand activations and private occasions.',
  'Event Management',
  'active',
  '/assets/ventures/yess-event.jpg',
  9,
  true,
  '{"longDesc":"Yess Event designs and produces moments people remember — corporate conferences, brand launches, music festivals and private celebrations. Strategy, creative, production and logistics under one roof.","highlights":["Corporate conferences and product launches","Concerts, festivals and brand activations","Weddings and private celebrations","Full production — stage, sound, lighting, AV"],"services":["Corporate Events","Brand Activation","Concerts & Festivals","Wedding Planning"],"audience":"Brands, corporates and individuals planning memorable occasions.","features":[{"title":"Creative-led production","desc":"Concept, script, set design and AV — engineered around the audience moment."},{"title":"Owned equipment","desc":"Stage, sound, lighting, LED walls and broadcast kit — owned, not rented."},{"title":"Single accountable lead","desc":"One producer owns budget, timeline and quality from kick-off to wrap."}],"founded":"2017","reach":"300+ events delivered"}'::jsonb
)
ON CONFLICT (slug) DO UPDATE SET
  title = EXCLUDED.title,
  tagline = EXCLUDED.tagline,
  description = EXCLUDED.description,
  data = EXCLUDED.data,
  updated_at = NOW();

INSERT INTO cms_ventures (slug, title, tagline, description, category, status, image_path, sort_order, is_published, data)
VALUES (
  'yess-model',
  'Yess Model',
  'Where talent meets opportunity.',
  'A modeling and talent agency discovering and nurturing fresh faces — connecting models, actors and creators with leading brands.',
  'Modeling & Talent Agency',
  'upcoming',
  '/assets/ventures/yess-model.jpg',
  10,
  true,
  '{"longDesc":"Yess Model is a full-service talent agency representing models, actors, presenters and creators. From scouting and grooming to bookings, contracts and aftercare — we build careers, not just shoots.","highlights":["Talent scouting and grooming","Brand campaigns and runway shows","Portfolio shoots and training","Casting for film, TV and digital media"],"services":["Talent Management","Brand Campaigns","Casting","Grooming & Training"],"audience":"Aspiring models, brands and production houses.","features":[{"title":"Scout & develop","desc":"Open calls, training in posing, grooming, on-camera presence and brand etiquette."},{"title":"Brand-grade portfolios","desc":"Studio-quality test shoots and digitals refreshed every season."},{"title":"Transparent contracts","desc":"Clear day rates, usage windows and a duty-of-care policy on every booking."}],"founded":"2020","reach":"Roster of 200+ artists"}'::jsonb
)
ON CONFLICT (slug) DO UPDATE SET
  title = EXCLUDED.title,
  tagline = EXCLUDED.tagline,
  description = EXCLUDED.description,
  data = EXCLUDED.data,
  updated_at = NOW();

INSERT INTO cms_ventures (slug, title, tagline, description, category, status, image_path, sort_order, is_published, data)
VALUES (
  'yess-food',
  'Yess Food',
  'Authentic flavours, world-class quality.',
  'Quality-driven food experiences — from cloud kitchens and signature dining concepts to packaged food brands.',
  'Food & Beverage',
  'upcoming',
  '/assets/ventures/yess-food.jpg',
  11,
  true,
  '{"longDesc":"Yess Food is a multi-format F&B operator — cloud kitchens, signature dine-in concepts, catering and packaged food brands — all built on hygiene-first kitchens and a chef-led recipe lab.","highlights":["Cloud kitchens and dine-in concepts","Packaged food and beverages","Hygiene-first kitchens","Catering for events and corporates"],"services":["Restaurants","Cloud Kitchen","Catering","Packaged Foods"],"audience":"Food lovers, families, offices and event hosts.","features":[{"title":"Chef-led R&D","desc":"Every menu starts in our recipe lab with chefs, nutritionists and supply experts."},{"title":"HACCP-grade kitchens","desc":"Daily hygiene audits, cold-chain integrity and full ingredient traceability."},{"title":"Operator-friendly","desc":"Cloud kitchen partnerships open new revenue without rebuilding your team."}],"founded":"2021","reach":"Multiple kitchens across Dhaka"}'::jsonb
)
ON CONFLICT (slug) DO UPDATE SET
  title = EXCLUDED.title,
  tagline = EXCLUDED.tagline,
  description = EXCLUDED.description,
  data = EXCLUDED.data,
  updated_at = NOW();

INSERT INTO cms_ventures (slug, title, tagline, description, category, status, image_path, sort_order, is_published, data)
VALUES (
  'yess-tourism',
  'Yess Tourism',
  'Curated journeys, beautifully delivered.',
  'Bespoke holiday packages, business travel, hajj & umrah, visa support and inbound experiences — designed for comfort, value and unforgettable moments.',
  'Travel & Tourism',
  'upcoming',
  '/assets/ventures/yess-tourism.jpg',
  12,
  true,
  '{"longDesc":"Yess Tourism is the group''s full-service travel house — domestic getaways, international holidays, corporate travel, hajj & umrah, student travel and inbound Bangladesh experiences. IATA-aligned booking, in-house visa specialists and 24/7 on-trip concierge mean every itinerary is planned, priced and protected end-to-end.","highlights":["Tailored international & domestic holiday packages","Hajj, umrah and faith-based pilgrimages","Corporate travel desk with negotiated fares","Visa, insurance and 24/7 on-trip concierge"],"services":["Holiday Packages","Air Ticketing","Hajj & Umrah","Visa & Documentation","Corporate Travel","Inbound Bangladesh Tours"],"audience":"Families, honeymooners, corporate teams, pilgrims and inbound travellers seeking trusted end-to-end trip planning.","features":[{"title":"Itinerary architects","desc":"Senior travel designers craft each trip — flights, stays, transfers, experiences — to your budget and pace."},{"title":"Best-fare guarantee","desc":"Real-time GDS pricing with airline contracts and group fares; we''ll match any verified lower quote."},{"title":"24/7 on-trip support","desc":"A dedicated concierge on WhatsApp during travel — re-bookings, upgrades and emergencies handled in minutes."},{"title":"Trusted partners only","desc":"Hand-picked hotels, vetted ground operators and licensed Hajj agents — every supplier is audited annually."}],"founded":"2022","reach":"60+ destinations across Asia, Middle East & Europe"}'::jsonb
)
ON CONFLICT (slug) DO UPDATE SET
  title = EXCLUDED.title,
  tagline = EXCLUDED.tagline,
  description = EXCLUDED.description,
  data = EXCLUDED.data,
  updated_at = NOW();

INSERT INTO cms_ventures (slug, title, tagline, description, category, status, image_path, sort_order, is_published, data)
VALUES (
  'yess-all-in-one-solution',
  'Yess All in One Solution',
  'Every YESS service. One unified experience.',
  'A unified platform bringing together every YESS service — software, media, lifestyle and professional services — for seamless business and personal needs.',
  'Integrated Business Solutions',
  'upcoming',
  '/assets/ventures/yess-all-in-one-solution.jpg',
  13,
  true,
  '{"longDesc":"Yess All-in-One is the master account that unlocks every YESS venture — software builds, media buys, organic supply, hosting, events and more — through a single login, a single invoice and a single concierge team.","highlights":["Single sign-on across all YESS ventures","Unified billing and customer support","Tailored bundles for businesses","One trusted partner for every need"],"services":["Bundled Services","Enterprise Accounts","Concierge Support","Custom Solutions"],"audience":"Businesses and power-users who want everything under one trusted roof.","features":[{"title":"One account, all ventures","desc":"Single sign-on, unified profile and shared payment methods across YESS."},{"title":"Concierge desk","desc":"A dedicated relationship manager handles requests across every venture for you."},{"title":"Bundle savings","desc":"Tailored packages combine services for measurable cost and time savings."}],"founded":"2023","reach":"Enterprise & power users"}'::jsonb
)
ON CONFLICT (slug) DO UPDATE SET
  title = EXCLUDED.title,
  tagline = EXCLUDED.tagline,
  description = EXCLUDED.description,
  data = EXCLUDED.data,
  updated_at = NOW();

-- ── 4. Core Enterprise Services ──────────────────────────

INSERT INTO cms_services (slug, title, description, bullets, pricing, sort_order, is_published, data)
VALUES (
  'akash-ott',
  'Akash OTT',
  'Bangladesh''s new digital streaming platform launched by YESS Bangla Communications under Akash TV.',
  '["Multi-device streaming (web, iOS, Android, TV)","Subscription & ad-supported monetisation","Content management & DRM"]'::jsonb,
  '{"from":"৳ 8,00,000","model":"Fixed-price project","timeline":"12–20 weeks"}'::jsonb,
  1,
  true,
  '{"intro":"End-to-end OTT platform engineering — from ingest and DRM to multi-device playback, monetisation and analytics. Built for Bangladeshi audiences with global delivery infrastructure.","cta":{"label":"Get a streaming quote","sub":"Free 30-min strategy call"},"capabilities":[{"title":"Adaptive streaming","desc":"HLS / DASH packaging with multi-bitrate transcoding and CDN-backed delivery for low latency at national scale."},{"title":"DRM & content protection","desc":"Widevine, FairPlay and PlayReady integration with concurrent-stream limits and watermarking."},{"title":"SVOD + AVOD monetisation","desc":"Subscription tiers, in-app purchases, server-side ad insertion and yield management."},{"title":"CMS & scheduling","desc":"Editorial workflows, EPG, content tagging, recommendation rules and rights management."}],"deliverables":["Web, iOS, Android and Smart-TV apps","Admin CMS with role-based access","Subscription, billing and entitlement engine","Real-time analytics dashboards","DevOps runbooks and 24/5 support plan"],"techStack":["TypeScript","Node.js","AWS MediaConvert","CloudFront","Widevine DRM","PostgreSQL","Redis"],"process":[{"step":"01","title":"Discovery","desc":"Audience, content rights, device strategy and monetisation modelled with finance and content teams."},{"step":"02","title":"Architecture","desc":"Streaming stack, DRM, billing and analytics architecture documented and signed off."},{"step":"03","title":"Build","desc":"Two-week sprints across web, mobile and CMS with weekly demos."},{"step":"04","title":"Launch & operate","desc":"Soft-launch, load testing, observability and 24/5 support in place."}],"faqs":[{"q":"How long does an OTT launch take?","a":"Typical timeline is 12–20 weeks from kick-off to public launch, depending on device coverage and monetisation complexity."},{"q":"Can you integrate local payments?","a":"Yes — bKash, Nagad, Rocket and card processing are supported alongside global gateways for diaspora audiences."},{"q":"Do you offer 24/7 support after launch?","a":"We provide 24/5 SLA-backed support by default, with optional 24/7 coverage on managed retainers."}]}'::jsonb
)
ON CONFLICT (slug) DO UPDATE SET
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  data = EXCLUDED.data,
  updated_at = NOW();

INSERT INTO cms_services (slug, title, description, bullets, pricing, sort_order, is_published, data)
VALUES (
  'akash-news',
  'Akash News',
  'A modern Bangladeshi digital news platform delivering real-time stories with a robust editorial CMS.',
  '["Editorial workflow & approvals","Real-time publishing","SEO & social distribution"]'::jsonb,
  '{"from":"৳ 3,50,000","model":"Fixed-price + retainer","timeline":"8–12 weeks"}'::jsonb,
  2,
  true,
  '{"intro":"Newsroom-grade publishing platform built for speed, SEO and editorial control — the same stack powering Akash News and several national dailies.","cta":{"label":"Request newsroom demo","sub":"Live walkthrough in 24 hours"},"capabilities":[{"title":"Editorial workspace","desc":"Story-level approvals, version history, embargoes and inline collaboration."},{"title":"Real-time publishing","desc":"Sub-second cache invalidation, live blogs and breaking-news push notifications."},{"title":"SEO automation","desc":"Schema.org markup, sitemap pings, AMP pages and editorial SEO checks before publish."},{"title":"Multimedia delivery","desc":"Adaptive image pipelines, video embeds, podcast hosting and social-card generation."}],"deliverables":["Public news website with regional editions","Editorial CMS with role-based workflows","Mobile reader app (iOS + Android)","Newsletter and push-notification engine","SEO + analytics integration"],"techStack":["Next.js","PostgreSQL","Redis","Cloudflare","Algolia","Elastic"],"process":[{"step":"01","title":"Editorial audit","desc":"Workflows, beats and publication cadence mapped with newsroom leadership."},{"step":"02","title":"Information architecture","desc":"Sections, taxonomies and SEO structure designed for crawl efficiency."},{"step":"03","title":"Build & migrate","desc":"Headless CMS, archive migration and editor training delivered in parallel."},{"step":"04","title":"Go-live & optimise","desc":"Performance tuning, Core Web Vitals and editorial KPIs tracked weekly."}],"faqs":[{"q":"Can you migrate our existing archive?","a":"Yes — we routinely migrate 100k+ legacy stories with redirects and SEO continuity."},{"q":"Do you support regional editions?","a":"The CMS ships with multi-edition support out of the box, including separate editorial teams."},{"q":"How do you handle traffic spikes?","a":"We cache aggressively at the edge and have autoscaling origins; load tested to 100k+ concurrent readers."}]}'::jsonb
)
ON CONFLICT (slug) DO UPDATE SET
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  data = EXCLUDED.data,
  updated_at = NOW();

INSERT INTO cms_services (slug, title, description, bullets, pricing, sort_order, is_published, data)
VALUES (
  'yess-one-stop',
  'YESS One Stop Solution',
  'Centralised technology services, IT support and home services like cleaning and maintenance — under one trusted roof.',
  '["Managed IT services","On-site technicians","Vendor consolidation"]'::jsonb,
  '{"from":"৳ 35,000 / mo","model":"Monthly retainer","timeline":"Live in 7 days"}'::jsonb,
  3,
  true,
  '{"intro":"A single accountable partner for every operational service your business needs — IT, networking, on-site maintenance and back-office support.","cta":{"label":"Start managed IT","sub":"Free IT health check"},"capabilities":[{"title":"Managed IT","desc":"Helpdesk, endpoint management, identity and access, backups and disaster recovery."},{"title":"On-site technicians","desc":"Field engineers across Dhaka and major districts with SLA-backed response times."},{"title":"Vendor consolidation","desc":"We negotiate, manage and report on third-party vendors so you have one bill."},{"title":"Office services","desc":"Cleaning, maintenance and supply management bundled with technology operations."}],"deliverables":["Service catalogue with SLAs","Quarterly business reviews","Asset register and licence tracking","Monthly health and uptime reports","Single point of contact"],"techStack":["Microsoft 365","Google Workspace","Intune","Jamf","Jira Service Management"],"process":[{"step":"01","title":"Audit","desc":"Free IT and operations audit covering infrastructure, security and vendors."},{"step":"02","title":"Transition","desc":"Knowledge transfer, runbook creation and tool onboarding within 7 days."},{"step":"03","title":"Operate","desc":"Helpdesk, on-site visits and proactive maintenance per the agreed SLA."},{"step":"04","title":"Improve","desc":"Quarterly reviews surface savings, risks and modernisation opportunities."}],"faqs":[{"q":"How fast can you take over operations?","a":"Most clients are live within 7 days of contract sign-off."},{"q":"Do you support offices outside Dhaka?","a":"Yes — we have engineer coverage across all major divisional cities."},{"q":"Can you co-exist with our internal IT team?","a":"Absolutely — we frequently augment in-house teams with overflow and night-shift coverage."}]}'::jsonb
)
ON CONFLICT (slug) DO UPDATE SET
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  data = EXCLUDED.data,
  updated_at = NOW();

INSERT INTO cms_services (slug, title, description, bullets, pricing, sort_order, is_published, data)
VALUES (
  'web-development',
  'Web Development',
  'Frontend (HTML, CSS, JavaScript) and backend (PHP, Laravel, Node) engineering with responsive design.',
  '["Custom web applications","API & system integrations","Performance & accessibility audits"]'::jsonb,
  '{"from":"৳ 1,20,000","model":"Fixed-price or T&M","timeline":"4–10 weeks"}'::jsonb,
  4,
  true,
  '{"intro":"Production-grade web applications and integrations engineered by senior developers — typed end-to-end, observable and built to scale.","cta":{"label":"Get a development quote","sub":"Written proposal in 1–3 days"},"capabilities":[{"title":"Custom applications","desc":"Internal tools, customer portals and SaaS products with role-based access and audit logs."},{"title":"API & integrations","desc":"REST and GraphQL APIs, ERP/CRM integrations and ETL pipelines."},{"title":"Performance audits","desc":"Core Web Vitals, accessibility (WCAG 2.2 AA) and security audits with prioritised remediation."},{"title":"Cloud delivery","desc":"Container-based deployment, CI/CD pipelines and infrastructure-as-code."}],"deliverables":["Architecture and ADRs","Source code with tests and CI","Staging + production environments","Monitoring, alerting and runbooks","Handover documentation and training"],"techStack":["TypeScript","React","Node.js","Laravel","PostgreSQL","Docker","AWS"],"process":[{"step":"01","title":"Discovery","desc":"Goals, constraints and success metrics captured in a written proposal."},{"step":"02","title":"Design","desc":"Architecture, data model and UX flows reviewed with stakeholders."},{"step":"03","title":"Build","desc":"Two-week sprints with weekly demos and a public progress board."},{"step":"04","title":"Operate","desc":"Warranty period, monitoring and an optional improvement retainer."}],"faqs":[{"q":"Do you offer fixed-price engagements?","a":"Yes — for well-defined scope. For evolving products we recommend Time & Materials."},{"q":"Who owns the source code?","a":"You do, fully. We deliver to your repository with documentation and training."},{"q":"Can you work with our existing team?","a":"Yes — we frequently embed alongside in-house engineers and follow your conventions."}]}'::jsonb
)
ON CONFLICT (slug) DO UPDATE SET
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  data = EXCLUDED.data,
  updated_at = NOW();

INSERT INTO cms_services (slug, title, description, bullets, pricing, sort_order, is_published, data)
VALUES (
  'web-design',
  'Web Design',
  'Visually appealing, functional websites combining layout, colour, typography and user experience.',
  '["Brand-aligned UI design","UX research & prototyping","Design systems"]'::jsonb,
  '{"from":"৳ 75,000","model":"Design sprint","timeline":"2–4 weeks"}'::jsonb,
  5,
  true,
  '{"intro":"Design sprints that turn brand strategy into shippable interfaces — research, prototypes and a reusable design system in 2–4 weeks.","cta":{"label":"Book a design sprint","sub":"Kick-off within a week"},"capabilities":[{"title":"UX research","desc":"User interviews, journey mapping and usability testing with measurable insight."},{"title":"Interface design","desc":"High-fidelity Figma designs, motion specs and interactive prototypes."},{"title":"Design systems","desc":"Tokens, components and documentation that scale across products and teams."},{"title":"Accessibility","desc":"WCAG 2.2 AA built in from day one, validated with assistive tech."}],"deliverables":["Research synthesis report","Interactive Figma prototype","Production-ready design system","Engineering handover with specs","Brand and motion guidelines"],"techStack":["Figma","FigJam","Maze","Lottie","Storybook"],"process":[{"step":"01","title":"Understand","desc":"Stakeholder workshop, audit and competitive landscape."},{"step":"02","title":"Explore","desc":"Concept directions and rapid iteration with the client team."},{"step":"03","title":"Refine","desc":"High-fidelity design, prototype and usability testing."},{"step":"04","title":"Hand off","desc":"Engineering specs, tokens and a working design system."}],"faqs":[{"q":"Do you redesign existing products?","a":"Yes — we run heuristic audits and usability tests before proposing a redesign scope."},{"q":"Can we work directly with the designer?","a":"Yes — every engagement has a named lead designer with weekly working sessions."},{"q":"Will the design work for low-end devices?","a":"Yes — we design for the median Bangladeshi device and connection profile."}]}'::jsonb
)
ON CONFLICT (slug) DO UPDATE SET
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  data = EXCLUDED.data,
  updated_at = NOW();

INSERT INTO cms_services (slug, title, description, bullets, pricing, sort_order, is_published, data)
VALUES (
  'yess-bangla-shop',
  'Yess Bangla Shop',
  'End-to-end e-commerce — websites, mobile apps, secure payments and doorstep delivery for retailers across Bangladesh.',
  '["Storefront + mobile apps","Local payment gateways","Inventory & logistics"]'::jsonb,
  '{"from":"৳ 2,50,000","model":"Fixed-price + GMV %","timeline":"6–12 weeks"}'::jsonb,
  6,
  true,
  '{"intro":"A complete commerce stack — storefront, mobile apps, local payments, inventory and last-mile delivery — built for retailers serving all 64 districts.","cta":{"label":"Launch your store","sub":"Free e-commerce audit"},"capabilities":[{"title":"Storefront & apps","desc":"Responsive web storefront plus native iOS and Android apps with shared catalogue."},{"title":"Local payments","desc":"bKash, Nagad, Rocket, cards and cash-on-delivery with reconciliation tooling."},{"title":"Inventory & OMS","desc":"Real-time stock, multi-warehouse, returns and replenishment workflows."},{"title":"Last-mile delivery","desc":"Hybrid model with in-house riders and 3PL integrations across districts."}],"deliverables":["Storefront, admin and mobile apps","Payment, OMS and 3PL integrations","Marketing automation and CRM","Operational dashboards","Launch + 90-day growth plan"],"techStack":["Next.js","React Native","Node.js","PostgreSQL","Redis","Cloudflare"],"process":[{"step":"01","title":"Audit","desc":"Free audit of catalogue, fulfilment and unit economics."},{"step":"02","title":"Design","desc":"Customer journeys, payments and logistics blueprint signed off."},{"step":"03","title":"Build","desc":"Storefront, apps and back-office delivered in parallel sprints."},{"step":"04","title":"Grow","desc":"Performance marketing, CRO and merchandising for 90 days post-launch."}],"faqs":[{"q":"Can you work with an existing Shopify or WooCommerce store?","a":"Yes — we either extend your current platform or migrate to a custom stack, depending on scale."},{"q":"Do you support cash on delivery?","a":"Yes — with reconciliation, fraud rules and partial-payment handling."},{"q":"Can you handle deliveries outside Dhaka?","a":"Yes — through our 3PL partners we cover all 64 districts with tracked delivery."}]}'::jsonb
)
ON CONFLICT (slug) DO UPDATE SET
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  data = EXCLUDED.data,
  updated_at = NOW();

-- ── 5. Industries Served ────────────────────────────────

INSERT INTO cms_industries (slug, title, description, outcomes, sort_order, is_published, data)
VALUES (
  'media-broadcasting',
  'Media & Broadcasting',
  'OTT platforms, digital news and content distribution at national scale.',
  '["Akash OTT launch","Editorial CMS","Live streaming infra"]'::jsonb,
  1,
  true,
  '{"intro":"From OTT launches to newsroom modernisation, we help broadcasters and publishers reach Bangladeshi audiences at scale with reliable, monetisable platforms.","solutions":[{"title":"Streaming platforms","desc":"End-to-end OTT — encoding, DRM, multi-device playback and analytics."},{"title":"Newsroom CMS","desc":"Real-time editorial workspaces with workflow, SEO and multimedia."},{"title":"Monetisation","desc":"SVOD, AVOD, paywalls and ad-server integration with yield reporting."}]}'::jsonb
)
ON CONFLICT (slug) DO UPDATE SET
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  data = EXCLUDED.data,
  updated_at = NOW();

INSERT INTO cms_industries (slug, title, description, outcomes, sort_order, is_published, data)
VALUES (
  'retail-ecommerce',
  'Retail & E-commerce',
  'Storefronts, marketplaces, payments and last-mile delivery integrations.',
  '["Multi-vendor stores","bKash / Nagad / cards","Nationwide delivery"]'::jsonb,
  2,
  true,
  '{"intro":"Commerce platforms that scale from a single brand to a multi-vendor marketplace, integrated with local payments and nationwide logistics.","solutions":[{"title":"Storefront + apps","desc":"Web storefront and native apps with shared catalogue and one-tap checkout."},{"title":"Local payments","desc":"bKash, Nagad, Rocket, cards and COD with automated reconciliation."},{"title":"OMS & logistics","desc":"Multi-warehouse inventory, returns and 3PL integrations across districts."}]}'::jsonb
)
ON CONFLICT (slug) DO UPDATE SET
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  data = EXCLUDED.data,
  updated_at = NOW();

INSERT INTO cms_industries (slug, title, description, outcomes, sort_order, is_published, data)
VALUES (
  'education',
  'Education',
  'Learning management, school ERPs and digital classroom solutions.',
  '["LMS platforms","Student portals","Online assessment"]'::jsonb,
  3,
  true,
  '{"intro":"Digital learning platforms for schools, universities and training providers — from LMS to administrative ERP.","solutions":[{"title":"Learning management","desc":"Course delivery, assessments, progress tracking and certificates."},{"title":"School ERP","desc":"Admissions, attendance, fees, exams and HR in a single system."},{"title":"Parent engagement","desc":"Mobile apps with attendance, grades and announcements in real time."}]}'::jsonb
)
ON CONFLICT (slug) DO UPDATE SET
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  data = EXCLUDED.data,
  updated_at = NOW();

INSERT INTO cms_industries (slug, title, description, outcomes, sort_order, is_published, data)
VALUES (
  'healthcare',
  'Healthcare',
  'Clinic management, telemedicine and patient engagement platforms.',
  '["Clinic ERP","Telemedicine apps","Patient portals"]'::jsonb,
  4,
  true,
  '{"intro":"Patient-centred platforms for clinics, hospitals and telemedicine providers — secure, auditable and built for clinical workflows.","solutions":[{"title":"Clinic ERP","desc":"Appointments, EMR, billing and pharmacy in one system."},{"title":"Telemedicine","desc":"Video consultation, e-prescriptions and follow-up reminders."},{"title":"Patient portal","desc":"Records, lab results, prescriptions and appointment management."}]}'::jsonb
)
ON CONFLICT (slug) DO UPDATE SET
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  data = EXCLUDED.data,
  updated_at = NOW();

INSERT INTO cms_industries (slug, title, description, outcomes, sort_order, is_published, data)
VALUES (
  'banking-finance',
  'Banking & Finance',
  'Secure portals, dashboards and fintech integrations.',
  '["Customer portals","Internal dashboards","API integrations"]'::jsonb,
  5,
  true,
  '{"intro":"Digital experiences for banks, NBFIs and fintechs — designed for trust, regulatory rigour and measurable activation.","solutions":[{"title":"Customer portals","desc":"Onboarding, account servicing and product discovery with secure auth."},{"title":"Internal dashboards","desc":"Risk, ops and exec dashboards drawn from core systems via APIs."},{"title":"Fintech APIs","desc":"Open banking, payments and partner integrations with audit trails."}]}'::jsonb
)
ON CONFLICT (slug) DO UPDATE SET
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  data = EXCLUDED.data,
  updated_at = NOW();

INSERT INTO cms_industries (slug, title, description, outcomes, sort_order, is_published, data)
VALUES (
  'manufacturing',
  'Manufacturing',
  'ERP, inventory and operations digitisation for factories.',
  '["Production tracking","Inventory control","Quality reporting"]'::jsonb,
  6,
  true,
  '{"intro":"Operations digitisation for factories — production tracking, quality, inventory and maintenance under one roof.","solutions":[{"title":"Production tracking","desc":"Shop-floor terminals, OEE and shift reporting."},{"title":"Inventory & procurement","desc":"Raw material, WIP and finished goods with reorder automation."},{"title":"Quality & maintenance","desc":"QC checklists, NCR workflows and preventive maintenance schedules."}]}'::jsonb
)
ON CONFLICT (slug) DO UPDATE SET
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  data = EXCLUDED.data,
  updated_at = NOW();

INSERT INTO cms_industries (slug, title, description, outcomes, sort_order, is_published, data)
VALUES (
  'logistics-supply-chain',
  'Logistics & Supply Chain',
  'Tracking, dispatch and fleet management systems.',
  '["Live tracking","Dispatch ops","Driver apps"]'::jsonb,
  7,
  true,
  '{"intro":"Visibility and control across the supply chain — from dispatch and driver apps to live tracking for end customers.","solutions":[{"title":"Dispatch & routing","desc":"Optimised routes, capacity allocation and exception handling."},{"title":"Driver apps","desc":"Pickup, delivery, proof of delivery and earnings transparency."},{"title":"Customer tracking","desc":"Live ETA, push notifications and one-click rescheduling."}]}'::jsonb
)
ON CONFLICT (slug) DO UPDATE SET
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  data = EXCLUDED.data,
  updated_at = NOW();

INSERT INTO cms_industries (slug, title, description, outcomes, sort_order, is_published, data)
VALUES (
  'government-ngo',
  'Government & NGOs',
  'Public-sector portals, citizen services and reporting tools.',
  '["Citizen portals","Reporting dashboards","Survey tools"]'::jsonb,
  8,
  true,
  '{"intro":"Public-sector and NGO platforms designed for accessibility, accountability and reach across all 64 districts.","solutions":[{"title":"Citizen portals","desc":"Online services, applications and document delivery with NID-based auth."},{"title":"Field data collection","desc":"Offline-first survey apps with geo-tagged evidence."},{"title":"Reporting dashboards","desc":"Automated MIS reporting for donors, ministries and the public."}]}'::jsonb
)
ON CONFLICT (slug) DO UPDATE SET
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  data = EXCLUDED.data,
  updated_at = NOW();

-- ── 6. Thought Leadership & Insights ────────────────────

INSERT INTO cms_insights (slug, title, excerpt, body_md, category, author, cover_image, tags, published_at, sort_order, is_published, data)
VALUES (
  'sovereign-cloud-mesh',
  'Sovereign Cloud Mesh Architecture: Resilient Multi-Region Infrastructure for Bangladesh',
  'A comprehensive architectural blueprint for decoupling national digital infrastructure from single-point cloud hyperscaler risks, achieving zero data egress leaks and 99.99% high availability across domestic data centers.',
  'Modern sovereign digital platforms require strict geographical residency guarantees alongside active-active reliability. Relying solely on foreign hyperscalers creates both regulatory non-compliance under Bangladesh''s emerging data protection mandates and operational vulnerability during undersea submarine cable maintenance cycles.

### 1. The Decoupling Mandate: Redundancy Beyond Single Hyperscalers

Our Sovereign Cloud Mesh bridges domestic Tier-3 data center facilities (including Kaliakoir Hi-Tech Park and Motijheel IXPs) with distributed edge nodes. By deploying zero-trust eBPF-driven networking overlays, services achieve seamless packet routing without exposing raw network topographies to public internet transit.

### 2. Zero Data Egress and National Data Sovereignty

All citizen telemetry, transactional banking records, and agricultural supply chain ledgers are encrypted using customer-managed cryptographic keys stored on domestic hardware security modules (HSMs). Cross-border egress is strictly governed by automated policy agents that flag non-sovereign routing attempts.

### 3. 99.99% High Availability Across Domestic Peering IXPs

By peering directly at BDIX (Bangladesh Internet Exchange) nodes across Dhaka, Chattogram, and Sylhet, packet latency dropped from 72ms (round-trip via Singapore) to under 8ms domestically. This order-of-magnitude reduction enables real-time micro-finance transactions and low-latency video streaming even under intermittent international transit disruptions.

### 4. Autonomous Disaster Recovery & Failover Protocol

Automated Raft consensus clusters handle partition splits cleanly. When international or regional uplinks degrade, edge nodes transition into autonomous sovereign mode, storing cryptographic audit logs locally until quorum connectivity is re-established.',
  'Engineering Whitepaper',
  'Arif Khan (Head of Engineering & Chief Architect)',
  NULL,
  '["Engineering Whitepaper"]'::jsonb,
  '2025-09-17T18:00:00.000Z',
  1,
  true,
  '{"readTime":"8 min read","content":[{"body":"Modern sovereign digital platforms require strict geographical residency guarantees alongside active-active reliability. Relying solely on foreign hyperscalers creates both regulatory non-compliance under Bangladesh''s emerging data protection mandates and operational vulnerability during undersea submarine cable maintenance cycles."},{"heading":"1. The Decoupling Mandate: Redundancy Beyond Single Hyperscalers","body":"Our Sovereign Cloud Mesh bridges domestic Tier-3 data center facilities (including Kaliakoir Hi-Tech Park and Motijheel IXPs) with distributed edge nodes. By deploying zero-trust eBPF-driven networking overlays, services achieve seamless packet routing without exposing raw network topographies to public internet transit."},{"heading":"2. Zero Data Egress and National Data Sovereignty","body":"All citizen telemetry, transactional banking records, and agricultural supply chain ledgers are encrypted using customer-managed cryptographic keys stored on domestic hardware security modules (HSMs). Cross-border egress is strictly governed by automated policy agents that flag non-sovereign routing attempts."},{"heading":"3. 99.99% High Availability Across Domestic Peering IXPs","body":"By peering directly at BDIX (Bangladesh Internet Exchange) nodes across Dhaka, Chattogram, and Sylhet, packet latency dropped from 72ms (round-trip via Singapore) to under 8ms domestically. This order-of-magnitude reduction enables real-time micro-finance transactions and low-latency video streaming even under intermittent international transit disruptions."},{"heading":"4. Autonomous Disaster Recovery & Failover Protocol","body":"Automated Raft consensus clusters handle partition splits cleanly. When international or regional uplinks degrade, edge nodes transition into autonomous sovereign mode, storing cryptographic audit logs locally until quorum connectivity is re-established."}]}'::jsonb
)
ON CONFLICT (slug) DO UPDATE SET
  title = EXCLUDED.title,
  excerpt = EXCLUDED.excerpt,
  body_md = EXCLUDED.body_md,
  category = EXCLUDED.category,
  author = EXCLUDED.author,
  data = EXCLUDED.data,
  updated_at = NOW();

INSERT INTO cms_insights (slug, title, excerpt, body_md, category, author, cover_image, tags, published_at, sort_order, is_published, data)
VALUES (
  'digital-transformation-roadmap-smes-bangladesh',
  'Digital transformation roadmap for SMEs in Bangladesh',
  'A practical, budget-aware framework Bangladeshi small and mid-sized businesses can use to digitise operations — without overspending or over-engineering.',
  'Most SMEs in Bangladesh do not need a multi-year, six-figure transformation programme. They need a clear sequence: stabilise the basics, automate the repetitive, and only then invest in advanced analytics or AI.

### Phase 1 — Stabilise the basics

Get a single source of truth for sales, inventory and customers. A modest cloud accounting tool plus a structured CRM resolves 70% of operational chaos.

### Phase 2 — Automate the repetitive

Identify the five most repeated tasks each week. Automate those first — invoicing, stock alerts, customer follow-ups. ROI here is measurable in weeks.

### Phase 3 — Connect & report

Once data flows cleanly, add lightweight dashboards. Leadership decisions stop relying on memory and start relying on numbers.

### Phase 4 — Scale selectively

Only after the first three phases should you invest in advanced systems — ERP, e-commerce, AI. Skipping ahead is the most common reason transformations fail.',
  'Strategy',
  'Md. Rakibul Islam (Principal Consultant)',
  NULL,
  '["Strategy"]'::jsonb,
  '2026-04-27T18:00:00.000Z',
  2,
  true,
  '{"readTime":"8 min read","content":[{"body":"Most SMEs in Bangladesh do not need a multi-year, six-figure transformation programme. They need a clear sequence: stabilise the basics, automate the repetitive, and only then invest in advanced analytics or AI."},{"heading":"Phase 1 — Stabilise the basics","body":"Get a single source of truth for sales, inventory and customers. A modest cloud accounting tool plus a structured CRM resolves 70% of operational chaos."},{"heading":"Phase 2 — Automate the repetitive","body":"Identify the five most repeated tasks each week. Automate those first — invoicing, stock alerts, customer follow-ups. ROI here is measurable in weeks."},{"heading":"Phase 3 — Connect & report","body":"Once data flows cleanly, add lightweight dashboards. Leadership decisions stop relying on memory and start relying on numbers."},{"heading":"Phase 4 — Scale selectively","body":"Only after the first three phases should you invest in advanced systems — ERP, e-commerce, AI. Skipping ahead is the most common reason transformations fail."}]}'::jsonb
)
ON CONFLICT (slug) DO UPDATE SET
  title = EXCLUDED.title,
  excerpt = EXCLUDED.excerpt,
  body_md = EXCLUDED.body_md,
  category = EXCLUDED.category,
  author = EXCLUDED.author,
  data = EXCLUDED.data,
  updated_at = NOW();

INSERT INTO cms_insights (slug, title, excerpt, body_md, category, author, cover_image, tags, published_at, sort_order, is_published, data)
VALUES (
  'building-ott-platforms-emerging-markets',
  'Building OTT platforms for emerging markets',
  'Lessons from launching Akash OTT — infrastructure, content, and the user experience that matters in bandwidth-constrained markets.',
  'Building an OTT platform in Bangladesh is not the same as building one in San Francisco. Bandwidth, devices, payments and content rights all behave differently.

### Optimise for low-bandwidth

Adaptive bitrate is mandatory. Default to lower starting bitrates and let users opt up — not down.

### Local payments win

bKash, Nagad, Rocket and operator billing convert 5–10× better than international cards for the mass market.

### Content > tech

Subscribers stay for stories, not for buffering speed. Invest at least 60% of your budget in content and licensing.',
  'Technology',
  'Sumaiya Rahman (Head of Engineering)',
  NULL,
  '["Technology"]'::jsonb,
  '2026-04-13T18:00:00.000Z',
  3,
  true,
  '{"readTime":"7 min read","content":[{"body":"Building an OTT platform in Bangladesh is not the same as building one in San Francisco. Bandwidth, devices, payments and content rights all behave differently."},{"heading":"Optimise for low-bandwidth","body":"Adaptive bitrate is mandatory. Default to lower starting bitrates and let users opt up — not down."},{"heading":"Local payments win","body":"bKash, Nagad, Rocket and operator billing convert 5–10× better than international cards for the mass market."},{"heading":"Content > tech","body":"Subscribers stay for stories, not for buffering speed. Invest at least 60% of your budget in content and licensing."}]}'::jsonb
)
ON CONFLICT (slug) DO UPDATE SET
  title = EXCLUDED.title,
  excerpt = EXCLUDED.excerpt,
  body_md = EXCLUDED.body_md,
  category = EXCLUDED.category,
  author = EXCLUDED.author,
  data = EXCLUDED.data,
  updated_at = NOW();

INSERT INTO cms_insights (slug, title, excerpt, body_md, category, author, cover_image, tags, published_at, sort_order, is_published, data)
VALUES (
  'scaling-last-mile-delivery-bangladesh',
  'Scaling last-mile delivery across all 64 districts',
  'How a hybrid logistics model unlocked nationwide e-commerce reach for our retail clients.',
  'Last-mile is where most Bangladeshi e-commerce dreams die. The fix is rarely a single national fleet — it''s a hybrid model.

### Tier 1 — Own fleet in metros

Dhaka, Chattogram and Sylhet justify owned bikes and dispatch hubs. Quality control and brand experience are too important to outsource.

### Tier 2 — Partner couriers

For the next 20 cities, partner with established couriers under SLAs. Pay slightly more for reliability.

### Tier 3 — Hub & spoke

Remaining districts use hub-and-spoke with local agents. Slower, but cheap, scalable and reliable enough for non-perishable goods.',
  'E-commerce',
  'Tanvir Ahmed (Operations Lead)',
  NULL,
  '["E-commerce"]'::jsonb,
  '2026-03-29T18:00:00.000Z',
  4,
  true,
  '{"readTime":"6 min read","content":[{"body":"Last-mile is where most Bangladeshi e-commerce dreams die. The fix is rarely a single national fleet — it''s a hybrid model."},{"heading":"Tier 1 — Own fleet in metros","body":"Dhaka, Chattogram and Sylhet justify owned bikes and dispatch hubs. Quality control and brand experience are too important to outsource."},{"heading":"Tier 2 — Partner couriers","body":"For the next 20 cities, partner with established couriers under SLAs. Pay slightly more for reliability."},{"heading":"Tier 3 — Hub & spoke","body":"Remaining districts use hub-and-spoke with local agents. Slower, but cheap, scalable and reliable enough for non-perishable goods."}]}'::jsonb
)
ON CONFLICT (slug) DO UPDATE SET
  title = EXCLUDED.title,
  excerpt = EXCLUDED.excerpt,
  body_md = EXCLUDED.body_md,
  category = EXCLUDED.category,
  author = EXCLUDED.author,
  data = EXCLUDED.data,
  updated_at = NOW();

INSERT INTO cms_insights (slug, title, excerpt, body_md, category, author, cover_image, tags, published_at, sort_order, is_published, data)
VALUES (
  'customer-centricity-beats-strategy',
  'Why customer-centricity beats every other strategy',
  'Our managing director on the operating principles behind a decade of repeat clients.',
  'Strategy decks come and go. The companies that survive a decade do one thing relentlessly: stay obsessed with the customer.

### Listen more than you talk

Every quarterly review starts with a customer call, not a slide. Anything else risks optimising for the wrong thing.

### Make it easy to complain

Friction in feedback hides the real problems. Make complaining easy and you''ll learn faster than any survey.',
  'Leadership',
  'Managing Director (YESS Bangla)',
  NULL,
  '["Leadership"]'::jsonb,
  '2026-03-11T18:00:00.000Z',
  5,
  true,
  '{"readTime":"5 min read","content":[{"body":"Strategy decks come and go. The companies that survive a decade do one thing relentlessly: stay obsessed with the customer."},{"heading":"Listen more than you talk","body":"Every quarterly review starts with a customer call, not a slide. Anything else risks optimising for the wrong thing."},{"heading":"Make it easy to complain","body":"Friction in feedback hides the real problems. Make complaining easy and you''ll learn faster than any survey."}]}'::jsonb
)
ON CONFLICT (slug) DO UPDATE SET
  title = EXCLUDED.title,
  excerpt = EXCLUDED.excerpt,
  body_md = EXCLUDED.body_md,
  category = EXCLUDED.category,
  author = EXCLUDED.author,
  data = EXCLUDED.data,
  updated_at = NOW();

INSERT INTO cms_insights (slug, title, excerpt, body_md, category, author, cover_image, tags, published_at, sort_order, is_published, data)
VALUES (
  'build-buy-integrate-enterprise-software',
  'When to build, buy or integrate enterprise software',
  'A decision framework for CTOs evaluating the make-vs-buy question in regulated industries.',
  'Build when it''s a competitive differentiator. Buy when it''s a commodity. Integrate when both are partly true.

### Build

If the software directly drives revenue or differentiation, build it. You''ll spend more upfront and own the roadmap.

### Buy

Accounting, HR, generic CRM — buy. Don''t reinvent commodity wheels.

### Integrate

When 70% is commodity and 30% is unique, buy the platform and integrate custom modules. Most enterprise stacks live here.',
  'IT Services',
  'Sumaiya Rahman (Head of Engineering)',
  NULL,
  '["IT Services"]'::jsonb,
  '2026-02-21T18:00:00.000Z',
  6,
  true,
  '{"readTime":"9 min read","content":[{"body":"Build when it''s a competitive differentiator. Buy when it''s a commodity. Integrate when both are partly true."},{"heading":"Build","body":"If the software directly drives revenue or differentiation, build it. You''ll spend more upfront and own the roadmap."},{"heading":"Buy","body":"Accounting, HR, generic CRM — buy. Don''t reinvent commodity wheels."},{"heading":"Integrate","body":"When 70% is commodity and 30% is unique, buy the platform and integrate custom modules. Most enterprise stacks live here."}]}'::jsonb
)
ON CONFLICT (slug) DO UPDATE SET
  title = EXCLUDED.title,
  excerpt = EXCLUDED.excerpt,
  body_md = EXCLUDED.body_md,
  category = EXCLUDED.category,
  author = EXCLUDED.author,
  data = EXCLUDED.data,
  updated_at = NOW();

INSERT INTO cms_insights (slug, title, excerpt, body_md, category, author, cover_image, tags, published_at, sort_order, is_published, data)
VALUES (
  'designing-trust-financial-products',
  'Designing trust into financial products',
  'Visual and interaction patterns that drive higher conversion in fintech apps.',
  'Trust in fintech is built in microseconds. Users decide whether to enter their card details based on how the page feels — not what it says.

### Show the security cues

Lock icons, bank logos, security badges — show them where users are about to act, not buried in the footer.

### Slow down the irreversible

Add a confirmation step before destructive actions. The 200ms friction prevents costly mistakes and builds confidence.',
  'Design',
  'Yess Studio Team (Design Practice)',
  NULL,
  '["Design"]'::jsonb,
  '2026-02-04T18:00:00.000Z',
  7,
  true,
  '{"readTime":"6 min read","content":[{"body":"Trust in fintech is built in microseconds. Users decide whether to enter their card details based on how the page feels — not what it says."},{"heading":"Show the security cues","body":"Lock icons, bank logos, security badges — show them where users are about to act, not buried in the footer."},{"heading":"Slow down the irreversible","body":"Add a confirmation step before destructive actions. The 200ms friction prevents costly mistakes and builds confidence."}]}'::jsonb
)
ON CONFLICT (slug) DO UPDATE SET
  title = EXCLUDED.title,
  excerpt = EXCLUDED.excerpt,
  body_md = EXCLUDED.body_md,
  category = EXCLUDED.category,
  author = EXCLUDED.author,
  data = EXCLUDED.data,
  updated_at = NOW();

-- ── 7. Careers & Job Openings ───────────────────────────

INSERT INTO cms_openings (slug, title, department, location, job_type, level, salary_range, summary, responsibilities, requirements, is_published, sort_order)
VALUES (
  'senior-full-stack-engineer',
  'Senior Full-Stack Engineer',
  'Engineering',
  'Dhaka / Remote',
  'Full-time',
  'Senior',
  NULL,
  'Build production-grade web platforms across our OTT, e-commerce and consulting products.',
  '["Design and ship features across React, Node and PHP/Laravel stacks.","Own services end-to-end: schema, API, UI, deploy, monitor.","Mentor engineers through code reviews and architecture sessions."]'::jsonb,
  '["5+ years of full-stack experience with TypeScript and a server framework.","Comfort with relational databases, queues and CI/CD.","Strong written and verbal communication in English."]'::jsonb,
  true,
  1
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
  updated_at = NOW();

INSERT INTO cms_openings (slug, title, department, location, job_type, level, salary_range, summary, responsibilities, requirements, is_published, sort_order)
VALUES (
  'product-designer',
  'Product Designer (UI/UX)',
  'Design',
  'Dhaka',
  'Full-time',
  'Mid',
  NULL,
  'Shape the look, feel and interaction model of our consumer and enterprise products.',
  '["Lead design for major product surfaces from research to handoff.","Maintain and evolve our design system in Figma.","Partner closely with engineers and PMs throughout delivery."]'::jsonb,
  '["Portfolio of shipped product work across web and mobile.","Fluency in Figma, prototyping and design-system thinking.","Bias for clarity, accessibility and motion."]'::jsonb,
  true,
  2
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
  updated_at = NOW();

INSERT INTO cms_openings (slug, title, department, location, job_type, level, salary_range, summary, responsibilities, requirements, is_published, sort_order)
VALUES (
  'business-analyst',
  'Business Analyst',
  'Consulting',
  'Dhaka',
  'Full-time',
  'Mid',
  NULL,
  'Translate client problems into structured analysis, recommendations and roadmaps.',
  '["Run discovery workshops and interviews with client stakeholders.","Build models, dashboards and decks that drive decisions.","Support delivery teams with clear requirements and acceptance criteria."]'::jsonb,
  '["3+ years in consulting, strategy or product analysis.","Strong Excel/Sheets, SQL basics and slide-craft.","Comfort presenting to senior stakeholders."]'::jsonb,
  true,
  3
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
  updated_at = NOW();

INSERT INTO cms_openings (slug, title, department, location, job_type, level, salary_range, summary, responsibilities, requirements, is_published, sort_order)
VALUES (
  'digital-marketing-specialist',
  'Digital Marketing Specialist',
  'Marketing',
  'Dhaka / Hybrid',
  'Full-time',
  'Mid',
  NULL,
  'Plan and execute multi-channel campaigns that grow our brand and ventures.',
  '["Run paid campaigns across Meta, Google and emerging channels.","Own SEO, content calendar and email lifecycle programs.","Report on funnel performance with clear next actions."]'::jsonb,
  '["3+ years in performance or growth marketing.","Hands-on with GA4, ad managers and a CMS.","Strong analytical and copywriting skills."]'::jsonb,
  true,
  4
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
  updated_at = NOW();

INSERT INTO cms_openings (slug, title, department, location, job_type, level, salary_range, summary, responsibilities, requirements, is_published, sort_order)
VALUES (
  'customer-success-executive',
  'Customer Success Executive',
  'Operations',
  'Dhaka',
  'Full-time',
  'Entry',
  NULL,
  'Be the trusted partner clients rely on through onboarding, adoption and renewal.',
  '["Own a portfolio of accounts and their success plans.","Coordinate with delivery, support and product on client outcomes.","Identify expansion opportunities and reduce churn risk."]'::jsonb,
  '["2+ years in customer success, account management or operations.","Excellent communication and follow-through.","Comfort with CRM tools and basic reporting."]'::jsonb,
  true,
  5
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
  updated_at = NOW();

INSERT INTO cms_openings (slug, title, department, location, job_type, level, salary_range, summary, responsibilities, requirements, is_published, sort_order)
VALUES (
  'mobile-engineer-react-native',
  'Mobile Engineer (React Native)',
  'Engineering',
  'Dhaka / Remote',
  'Full-time',
  'Mid',
  NULL,
  'Ship delightful, performant mobile apps for our consumer ventures across iOS and Android.',
  '["Build and maintain cross-platform apps in React Native and TypeScript.","Optimize startup time, memory and frame rate on mid-range devices.","Own release pipelines, crash reporting and OTA updates."]'::jsonb,
  '["3+ years shipping production React Native apps to App Store and Play Store.","Solid grasp of native modules, navigation and offline patterns.","Care for accessibility, localization and edge-case UX."]'::jsonb,
  true,
  6
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
  updated_at = NOW();

INSERT INTO cms_openings (slug, title, department, location, job_type, level, salary_range, summary, responsibilities, requirements, is_published, sort_order)
VALUES (
  'data-analyst',
  'Data Analyst',
  'Data',
  'Dhaka / Hybrid',
  'Full-time',
  'Mid',
  NULL,
  'Turn raw product, marketing and operations data into decisions leadership can act on.',
  '["Build trusted dashboards and self-serve metrics across teams.","Run deep-dive analyses on funnels, retention and unit economics.","Partner with engineering on event tracking and data quality."]'::jsonb,
  '["2+ years in analytics with strong SQL and a BI tool (Looker, Metabase, Power BI).","Working knowledge of Python or R for ad-hoc analysis.","Clear storytelling — charts and narratives non-analysts understand."]'::jsonb,
  true,
  7
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
  updated_at = NOW();

INSERT INTO cms_openings (slug, title, department, location, job_type, level, salary_range, summary, responsibilities, requirements, is_published, sort_order)
VALUES (
  'content-strategist',
  'Content Strategist',
  'Marketing',
  'Dhaka / Remote',
  'Full-time',
  'Mid',
  NULL,
  'Own the editorial voice across our brand, ventures and thought-leadership channels.',
  '["Plan and produce long-form articles, case studies and launch narratives.","Brief designers and video producers on supporting assets.","Optimize content for SEO, distribution and lead capture."]'::jsonb,
  '["3+ years in B2B or tech content with published, link-shareable work.","Editorial eye for structure, tone and source quality.","Comfort with CMS workflows and basic on-page SEO."]'::jsonb,
  true,
  8
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
  updated_at = NOW();

INSERT INTO cms_openings (slug, title, department, location, job_type, level, salary_range, summary, responsibilities, requirements, is_published, sort_order)
VALUES (
  'finance-operations-associate',
  'Finance & Operations Associate',
  'Finance',
  'Dhaka',
  'Full-time',
  'Entry',
  NULL,
  'Keep the engine running — billing, vendor payments, reporting and compliance across entities.',
  '["Own monthly close, reconciliations and management reporting.","Coordinate with auditors, banks and tax advisors.","Improve internal controls and finance tooling as we scale."]'::jsonb,
  '["2+ years in finance ops, accounting or audit (CA part-qualified a plus).","Strong Excel/Sheets and a modern accounting platform.","High accuracy, discretion and ownership."]'::jsonb,
  true,
  9
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
  updated_at = NOW();

INSERT INTO cms_openings (slug, title, department, location, job_type, level, salary_range, summary, responsibilities, requirements, is_published, sort_order)
VALUES (
  'enterprise-sales-manager',
  'Enterprise Sales Manager',
  'Sales',
  'Dhaka',
  'Full-time',
  'Senior',
  NULL,
  'Lead consultative B2B sales for our consulting, software and platform engagements.',
  '["Build a qualified pipeline of mid-market and enterprise accounts.","Run discovery, scoping and proposal cycles end-to-end.","Partner with delivery on smooth handover and account growth."]'::jsonb,
  '["5+ years in B2B sales with a track record of six-figure deals.","Confident speaking with founders, CXOs and procurement.","Disciplined CRM hygiene and forecasting."]'::jsonb,
  true,
  10
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
  updated_at = NOW();

INSERT INTO cms_openings (slug, title, department, location, job_type, level, salary_range, summary, responsibilities, requirements, is_published, sort_order)
VALUES (
  'qa-automation-engineer',
  'QA Automation Engineer',
  'Engineering',
  'Dhaka / Remote',
  'Full-time',
  'Mid',
  NULL,
  'Raise the quality bar across our products with smart manual testing and robust automation.',
  '["Design test plans for new features and regression suites.","Build and maintain end-to-end automation (Playwright or Cypress).","Triage production issues with clear, reproducible reports."]'::jsonb,
  '["3+ years in QA with both manual and automation experience.","Solid understanding of REST APIs, browser dev tools and Git.","Bonus: performance testing or mobile QA exposure."]'::jsonb,
  true,
  11
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
  updated_at = NOW();

INSERT INTO cms_openings (slug, title, department, location, job_type, level, salary_range, summary, responsibilities, requirements, is_published, sort_order)
VALUES (
  'graphic-motion-designer',
  'Graphic & Motion Designer',
  'Design',
  'Dhaka',
  'Full-time',
  'Mid',
  NULL,
  'Craft on-brand visuals and short-form motion for campaigns, social and product launches.',
  '["Design key visuals, social creatives and pitch decks.","Produce short motion pieces in After Effects or equivalent.","Steward brand consistency across teams and partners."]'::jsonb,
  '["Portfolio with both static and motion work.","Fluency in Figma plus Adobe CC (Illustrator, Photoshop, After Effects).","Strong typography, layout and timing instincts."]'::jsonb,
  true,
  12
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
  updated_at = NOW();

INSERT INTO cms_openings (slug, title, department, location, job_type, level, salary_range, summary, responsibilities, requirements, is_published, sort_order)
VALUES (
  'hr-people-operations-lead',
  'HR & People Operations Lead',
  'People',
  'Dhaka',
  'Full-time',
  'Lead',
  NULL,
  'Build the systems, rituals and culture that help a high-performing team do their best work.',
  '["Own end-to-end recruiting, onboarding and performance cycles.","Partner with leaders on org design, comp bands and progression.","Champion learning, well-being and an inclusive workplace."]'::jsonb,
  '["5+ years in HR or people ops, ideally in tech or services.","Working knowledge of Bangladesh labour law and HRIS tools.","Empathetic communicator with strong judgment."]'::jsonb,
  true,
  13
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
  updated_at = NOW();

INSERT INTO cms_openings (slug, title, department, location, job_type, level, salary_range, summary, responsibilities, requirements, is_published, sort_order)
VALUES (
  'devops-cloud-engineer',
  'DevOps / Cloud Engineer',
  'Engineering',
  'Dhaka / Remote',
  'Full-time',
  'Senior',
  NULL,
  'Own the platform our engineers ship on — reliable, secure and cost-aware by default.',
  '["Manage CI/CD, infrastructure-as-code and environment parity.","Run observability: logs, metrics, alerts and incident response.","Harden security posture across cloud accounts and secrets."]'::jsonb,
  '["4+ years with AWS, GCP or Azure in production.","Hands-on with Docker, Terraform and a major CI system.","On-call mindset with a bias for automation."]'::jsonb,
  true,
  14
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
  updated_at = NOW();

INSERT INTO cms_openings (slug, title, department, location, job_type, level, salary_range, summary, responsibilities, requirements, is_published, sort_order)
VALUES (
  'engineering-internship',
  'Engineering Internship (6 months)',
  'Engineering',
  'Dhaka',
  'Internship',
  'Internship',
  NULL,
  'A paid, structured internship for final-year students or recent grads ready to ship real product work.',
  '["Pair with senior engineers on live features and bug fixes.","Write tests, docs and small services from day one.","Present learnings in weekly engineering reviews."]'::jsonb,
  '["Strong fundamentals in JavaScript/TypeScript or Python.","Familiarity with Git and at least one web framework.","Curiosity, ownership and openness to feedback."]'::jsonb,
  true,
  15
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
  updated_at = NOW();

INSERT INTO cms_openings (slug, title, department, location, job_type, level, salary_range, summary, responsibilities, requirements, is_published, sort_order)
VALUES (
  'brand-promoter',
  'Brand Promoter',
  'Marketing',
  'Dhaka / Field',
  'Part-time',
  'Entry',
  NULL,
  'Be the friendly face of YESS Bangla at activations, campuses and partner events — drive awareness, sign-ups and conversations.',
  '["Represent the brand at on-ground activations, campuses and pop-ups.","Engage prospects, demo our products and capture qualified leads.","Report daily activity, learnings and field feedback to the marketing team."]'::jsonb,
  '["Confident, friendly communicator in Bangla and English.","Comfortable on your feet for full-day events; flexible weekends.","Bonus: prior promotion, sales-floor or campus ambassador experience."]'::jsonb,
  true,
  16
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
  updated_at = NOW();

-- ── 8. Navigation Menus ──────────────────────────────────

INSERT INTO cms_menu_items (id, location, label, label_bn, href, badge, sort_order, is_published)
SELECT gen_random_uuid(), 'header', 'Home', 'হোম', '/', NULL, 1, true
WHERE NOT EXISTS (
  SELECT 1 FROM cms_menu_items WHERE location = 'header' AND href = '/'
);

INSERT INTO cms_menu_items (id, location, label, label_bn, href, badge, sort_order, is_published)
SELECT gen_random_uuid(), 'header', 'About', 'আমাদের সম্পর্কে', '/about', NULL, 2, true
WHERE NOT EXISTS (
  SELECT 1 FROM cms_menu_items WHERE location = 'header' AND href = '/about'
);

INSERT INTO cms_menu_items (id, location, label, label_bn, href, badge, sort_order, is_published)
SELECT gen_random_uuid(), 'header', 'Ventures', 'ভেঞ্চার', '/ventures', '13 Active', 3, true
WHERE NOT EXISTS (
  SELECT 1 FROM cms_menu_items WHERE location = 'header' AND href = '/ventures'
);

INSERT INTO cms_menu_items (id, location, label, label_bn, href, badge, sort_order, is_published)
SELECT gen_random_uuid(), 'header', 'Services', 'সার্ভিস', '/services', NULL, 4, true
WHERE NOT EXISTS (
  SELECT 1 FROM cms_menu_items WHERE location = 'header' AND href = '/services'
);

INSERT INTO cms_menu_items (id, location, label, label_bn, href, badge, sort_order, is_published)
SELECT gen_random_uuid(), 'header', 'Industries', 'ইন্ডাস্ট্রি', '/industries', NULL, 5, true
WHERE NOT EXISTS (
  SELECT 1 FROM cms_menu_items WHERE location = 'header' AND href = '/industries'
);

INSERT INTO cms_menu_items (id, location, label, label_bn, href, badge, sort_order, is_published)
SELECT gen_random_uuid(), 'header', 'Insights', 'ইনসাইট', '/insights', 'Research', 6, true
WHERE NOT EXISTS (
  SELECT 1 FROM cms_menu_items WHERE location = 'header' AND href = '/insights'
);

INSERT INTO cms_menu_items (id, location, label, label_bn, href, badge, sort_order, is_published)
SELECT gen_random_uuid(), 'header', 'Careers', 'ক্যারিয়ার', '/careers', 'Hiring', 7, true
WHERE NOT EXISTS (
  SELECT 1 FROM cms_menu_items WHERE location = 'header' AND href = '/careers'
);

INSERT INTO cms_menu_items (id, location, label, label_bn, href, badge, sort_order, is_published)
SELECT gen_random_uuid(), 'header', 'Contact', 'যোগাযোগ', '/contact', NULL, 8, true
WHERE NOT EXISTS (
  SELECT 1 FROM cms_menu_items WHERE location = 'header' AND href = '/contact'
);

-- ── 9. Corporate Settings ────────────────────────────────

INSERT INTO cms_settings (key, label, "group", value, sort_order)
VALUES ('branding', 'Corporate Identity', 'general', '{"companyName":"YESS Bangladesh","companyNameBn":"ইয়েস বাংলাদেশ","legalName":"YESS Strategic Holdings Ltd.","registrationNo":"C-184920","tagline":"Sovereign Digital Platforms & Venture Studio"}'::jsonb, 1)
ON CONFLICT (key) DO UPDATE SET value = EXCLUDED.value, updated_at = NOW();

INSERT INTO cms_settings (key, label, "group", value, sort_order)
VALUES ('contact', 'Executive Contact', 'contact', '{"_comment":"Single source of truth for Yess Bangla contact details. Mirrors src/lib/companyContact.ts. Keep both files in sync; the Python letterhead/profile generators read this JSON.","legalName":"Yess Bangla Private Limited","shortName":"YESS Bangla","phone":"+880 1805-464343","email":"yessbangla.bd@gmail.com","web":"www.yessbd.com","webUrl":"https://www.yessbd.com","office":"Section-11, Block-A, Main Road-3, Plot-10, Mirpur, Pallabi, Dhaka-1216 (Metro Rail Pillar -312)","corporateOffice":"Section-11, Block-A, Main Road-3, Plot-10, Mirpur, Pallabi, Dhaka-1216 (Metro Rail Pillar -312)","combinedAddress":"Section-11, Block-A, Main Road-3, Plot-10, Mirpur, Pallabi, Dhaka-1216 (Metro Rail Pillar -312)","whatsapp":"+880 1805-464343"}'::jsonb, 1)
ON CONFLICT (key) DO UPDATE SET value = EXCLUDED.value, updated_at = NOW();

INSERT INTO cms_settings (key, label, "group", value, sort_order)
VALUES ('socials', 'Official Social Accounts', 'socials', '{"twitter":"https://x.com/yessbangla","youtube":"https://youtube.com/@yessbangla","facebook":"https://facebook.com/yessbangla","linkedin":"https://linkedin.com/company/yessbangla"}'::jsonb, 1)
ON CONFLICT (key) DO UPDATE SET value = EXCLUDED.value, updated_at = NOW();