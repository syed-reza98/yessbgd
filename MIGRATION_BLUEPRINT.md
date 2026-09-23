# Comprehensive Architectural Review & Next.js 16 Migration Blueprint for YESS Bangla (`yessbgd`)

---

## 1. Executive Summary & Project Context

The **YESS Bangla** portal is an enterprise portfolio and corporate operations system. Currently built on **TanStack Start (Vite + Nitro) + React 19 + Supabase (PostgreSQL & Storage) + Tailwind CSS v4**, the application features:
- **Public Brand & Venture Showcase**: Interactive multi-pillar portfolio (Ventures, Services, Industries, Insights/Blog, Careers, About, Contact, Dynamic Pages).
- **Interactive Capabilities**: Liquid Glass interactive canvas shader, automated Venture Brief export engine (PDF generation with custom canvas watermarking, docx generators with letterhead layouts, visual QA diff harness).
- **Multi-lingual / i18n**: English and Bangla (`en`, `bn`) with persistent language selection.
- **Operations & CMS Hub**: Role-based Admin Dashboard with 3 personas (`admin`, `moderator`, `user`), nested visual tree menu builder, site pages/sections editor, lead capture & job application tracking pipelines, audit logging, JSON/CSV database backup/restore, and a media library.

### Target Migration State
- **Framework**: **Next.js 16** with the **App Router** (`app/` directory).
- **Authentication**: **Auth.js (NextAuth v5)** with Credentials/Database adapter, JWT session strategy, and role-based permissions (`admin`, `moderator`, `user`).
- **Database & ORM**: Migration from Supabase Postgres to **MySQL** using **Drizzle ORM** (`drizzle-orm`, `mysql2`).
- **Storage / Media**: Local filesystem or S3-compatible driver with a unified media endpoint suitable for **cPanel hosting**.
- **Deployment**: **cPanel Node.js Application** (using Phusion Passenger or PM2 / Reverse Proxy via Apache/LiteSpeed) running Next.js standalone server mode (`output: 'standalone'`).
- **Design & UI**: 100% fidelity retention of CSS, Tailwind tokens, animations, Framer Motion transitions, Radix UI components, and asset handling.

---

## 2. Complete Inventory of Routes & Pages

Below is the complete mapping of all 44 TanStack Start routes to their Next.js 16 App Router equivalents:

### 2.1 Public Client-Facing Routes
| # | Original TanStack Route | Next.js 16 App Router Path | Route Type | Description & Purpose |
|---|-------------------------|----------------------------|------------|------------------------|
| 1 | `routes/index.tsx` | `app/page.tsx` | Static / ISR | Homepage: Hero with Liquid Glass, Metrics count-up, Venture portfolio grid, Services teaser, Testimonials, CTA lead capture. |
| 2 | `routes/about.tsx` | `app/about/page.tsx` | Static / ISR | Main Corporate About: Mission, Vision, Values, Leadership overview, Timeline. |
| 3 | `routes/about.$pillar.tsx` | `app/about/[pillar]/page.tsx` | Dynamic SSG | Deep dive into individual corporate pillars (e.g. innovation, governance, sustainability). |
| 4 | `routes/about.leadership.tsx`| `app/about/leadership/page.tsx`| Static / ISR | Board of Directors, Executive Leadership, and Advisory team. |
| 5 | `routes/about.methodology.tsx`| `app/about/methodology/page.tsx`| Static / ISR | Venture building & investment incubation methodology. |
| 6 | `routes/about.standards.tsx` | `app/about/standards/page.tsx` | Static / ISR | Quality benchmarks, ESG policies, and operational standards. |
| 7 | `routes/about.awards.tsx` | `app/about/awards/page.tsx` | Static / ISR | Recognitions, honors, and milestones. |
| 8 | `routes/ventures.index.tsx` | `app/ventures/page.tsx` | Static / ISR | Filterable catalog of all ventures across Media, Technology, Agriculture, Consumer Goods. |
| 9 | `routes/ventures.$slug.tsx` | `app/ventures/[slug]/page.tsx` | Dynamic ISR | Venture Detail: Case studies, metrics, packages, FAQs, Brief PDF/DOCX generator, lead form. |
| 10 | `routes/services.tsx` | `app/services/page.tsx` | Static / ISR | Enterprise Services directory with pricing tiers and service matrices. |
| 11 | `routes/services.$slug.tsx` | `app/services/[slug]/page.tsx` | Dynamic ISR | Service offering detail: deliverables, feature breakdowns, and SLA tiers. |
| 12 | `routes/industries.tsx` | `app/industries/page.tsx` | Static / ISR | Industries served (Fintech, Agritech, Healthcare, Logistics, Media). |
| 13 | `routes/industries.$slug.tsx`| `app/industries/[slug]/page.tsx`| Dynamic ISR | Industry vertical deep dive and measurable client outcomes. |
| 14 | `routes/insights.tsx` | `app/insights/page.tsx` | Static / ISR | Insights, thought leadership, industry whitepapers, research articles. |
| 15 | `routes/insights.$slug.tsx` | `app/insights/[slug]/page.tsx` | Dynamic ISR | Full article view with markdown formatting, author bio, and related tags. |
| 16 | `routes/careers.tsx` | `app/careers/page.tsx` | Client / Dynamic | Careers hub: job search, category/location facets, multi-step job application & CV upload flow. |
| 17 | `routes/careers.$slug.tsx` | `app/careers/[slug]/page.tsx` | Dynamic ISR | Single Job posting detail with structured requirements, responsibilities, and apply modal. |
| 18 | `routes/application-status.tsx`| `app/application-status/page.tsx`| Client Dynamic | Public applicant tracker using Reference ID (UUID prefix) + Email. |
| 19 | `routes/contact.tsx` | `app/contact/page.tsx` | Static / Client | Contact directory, dynamic office map embed, department emails, general enquiry form. |
| 20 | `routes/faq.tsx` | `app/faq/page.tsx` | Static / ISR | Categorized searchable FAQs with accordion disclosure components. |
| 21 | `routes/privacy.tsx` | `app/privacy/page.tsx` | Static / ISR | Privacy policy & data protection terms. |
| 22 | `routes/terms.tsx` | `app/terms/page.tsx` | Static / ISR | Terms of service and legal agreement. |
| 23 | `routes/projects.tsx` | `app/projects/page.tsx` | Static / Redirect | Legacy route redirecting to `/ventures`. |
| 24 | `routes/p.$slug.tsx` | `app/p/[slug]/page.tsx` | Dynamic ISR | CMS Custom Pages engine: dynamically rendered custom marketing landing pages. |

### 2.2 Administrative & Back-Office Routes (`/admin`)
| # | Original TanStack Route | Next.js 16 App Router Path | Protected Role | Description & Purpose |
|---|-------------------------|----------------------------|----------------|------------------------|
| 25 | `routes/admin.login.tsx` | `app/admin/login/page.tsx` | Public / Guest | Admin sign-in with 5-attempt brute-force rate limiter, forgot-password & reset-password flows. |
| 26 | `routes/admin.index.tsx` | `app/admin/page.tsx` | `user`, `moderator`, `admin` | Admin Dashboard Overview: KPIs, recent messages, application submissions, quick links. |
| 27 | `routes/admin.applications.tsx`| `app/admin/applications/page.tsx`| `moderator`, `admin` | Job applicant pipeline manager: status updates, resume review, notes, filtering. |
| 28 | `routes/admin.messages.tsx` | `app/admin/messages/page.tsx` | `moderator`, `admin` | Contact form & lead enquiries CRM: status workflow, replies, contact notes. |
| 29 | `routes/admin.pages.index.tsx`| `app/admin/pages/page.tsx` | `user`, `admin` | Site Pages Manager: overview of all site and custom pages with publish toggles. |
| 30 | `routes/admin.pages.$page.tsx`| `app/admin/pages/[page]/page.tsx`| `user`, `admin` | Visual Page Block Editor: hero copy (EN/BN), SEO meta, cover images, custom content blocks. |
| 31 | `routes/admin.cms.index.tsx` | `app/admin/cms/page.tsx` | `user`, `admin` | CMS Entities Hub: links to Ventures, Services, Industries, and Insights lists. |
| 32 | `routes/admin.cms.$type.index.tsx`| `app/admin/cms/[type]/page.tsx`| `user`, `admin` | Generic CMS Table Viewer: dynamic data table for ventures, services, industries, or insights. |
| 33 | `routes/admin.cms.$type.$id.tsx`| `app/admin/cms/[type]/[id]/page.tsx`| `user`, `admin` | Generic CMS Record Editor: form fields configured dynamically by `cmsSchema.ts`. |
| 34 | `routes/admin.menus.tsx` | `app/admin/menus/page.tsx` | `admin` | Visual Tree Menu Editor: Header & Footer navigation, drag-sort, multi-level hierarchy, live preview. |
| 35 | `routes/admin.media.tsx` | `app/admin/media/page.tsx` | `user`, `admin` | Media Library: uploads, folder tagging, site asset synchronization, URL copying. |
| 36 | `routes/admin.settings.tsx` | `app/admin/settings/page.tsx` | `admin` | System Settings: company info, Google Map embed, header/footer logo tuning, live footer customizer. |
| 37 | `routes/admin.profile.tsx` | `app/admin/profile/page.tsx` | `user`, `moderator`, `admin` | User profile, notification preferences, language/theme preferences, password changes. |
| 38 | `routes/admin.audit.tsx` | `app/admin/audit/page.tsx` | `admin` | System Audit Trail: tracks entity mutations with user ID, timestamps, old/new diffs. |
| 39 | `routes/admin.data.tsx` | `app/admin/data/page.tsx` | `admin` | Database Backup & Restore: export/import full site dataset in JSON/CSV format. |

---

## 3. High-Level System Architecture

```mermaid
flowchart TD
    subgraph Client["Client Browser"]
        UI["Tailwind CSS v4 + Radix UI + Framer Motion"]
        LGT["Liquid Glass Engine (HTML5 Canvas)"]
        PDF["jsPDF + Mammoth + docx Export"]
        I18N["i18next (EN / BN Multilingual)"]
    end

    subgraph cPanel["cPanel Hosting Environment"]
        subgraph WebServer["Apache / LiteSpeed Reverse Proxy"]
            SSL["SSL Termination (:443)"]
            STATIC["Direct Static Serving (/public, /_next/static)"]
        end

        subgraph NextServer["Next.js 16 Standalone Server (:3000)"]
            AppRouter["App Router (SSR / RSC / Server Actions)"]
            AuthJS["Auth.js v5 (JWT & Role-based Middleware)"]
            APIRoutes["Route Handlers (/api/...)"]
            MediaStorage["Local Disk / Public Storage (/uploads)"]
        end

        subgraph Database["MySQL 8.0+ / MariaDB"]
            Drizzle["Drizzle ORM Engine"]
            Tables["InnoDB Tables (CMS, Users, Applications, Messages, Audit)"]
        end
    end

    UI --> SSL
    SSL --> STATIC
    SSL --> AppRouter
    AppRouter --> AuthJS
    AppRouter --> Drizzle
    APIRoutes --> Drizzle
    APIRoutes --> MediaStorage
    Drizzle --> Tables
```

### Key Architectural Shifts:
1. **From Supabase Client SDK to Next.js Server Actions & Drizzle**:
   Public content is loaded via React Server Components (RSC) directly from MySQL using Drizzle ORM, yielding zero client-side waterfall delays and instantaneous SEO-indexed HTML.
2. **From Supabase Auth & RLS to Auth.js v5 + Middleware**:
   Authentication is handled securely using HTTP-only cookies, session tokens verified in Next.js `proxy.ts`/`middleware.ts`, and strict Server Action authorization checks based on `role` (`admin`, `moderator`, `user`).
3. **From Supabase Storage to Local Disk Storage on cPanel**:
   Supabase storage buckets (`resumes`, `media`) are replaced by an internal storage handler storing uploads to `/public/uploads/` with a dedicated upload/serve API handler.

---

## 4. Database Schema: Supabase PostgreSQL to MySQL (Drizzle ORM)

```typescript
import {
  mysqlTable,
  varchar,
  text,
  int,
  boolean,
  datetime,
  json,
  mysqlEnum,
  index,
} from "drizzle-orm/mysql-core";
import { sql } from "drizzle-orm";

/* -------------------------------- Enums -------------------------------- */
export const appRoleEnum = mysqlEnum("app_role", ["admin", "moderator", "user"]);

export const applicationStatusEnum = mysqlEnum("application_status", [
  "New",
  "Reviewed",
  "Rejected",
  "Submitted",
  "Under review",
  "Interview",
  "Offer",
  "Hired",
  "On hold",
]);

/* --------------------------- Users & Profiles -------------------------- */
export const users = mysqlTable("users", {
  id: varchar("id", { length: 36 }).primaryKey().$defaultFn(() => crypto.randomUUID()),
  email: varchar("email", { length: 255 }).notNull().unique(),
  passwordHash: varchar("password_hash", { length: 255 }).notNull(),
  createdAt: datetime("created_at").notNull().default(sql`CURRENT_TIMESTAMP`),
  updatedAt: datetime("updated_at").notNull().default(sql`CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP`),
});

export const userRoles = mysqlTable("user_roles", {
  id: varchar("id", { length: 36 }).primaryKey().$defaultFn(() => crypto.randomUUID()),
  userId: varchar("user_id", { length: 36 }).notNull().references(() => users.id, { onDelete: "cascade" }),
  role: appRoleEnum.notNull().default("user"),
  createdAt: datetime("created_at").notNull().default(sql`CURRENT_TIMESTAMP`),
}, (table) => [
  index("user_roles_user_id_idx").on(table.userId),
]);

export const profiles = mysqlTable("profiles", {
  id: varchar("id", { length: 36 }).primaryKey().references(() => users.id, { onDelete: "cascade" }),
  fullName: varchar("full_name", { length: 150 }),
  phone: varchar("phone", { length: 50 }),
  jobTitle: varchar("job_title", { length: 100 }),
  avatarUrl: text("avatar_url"),
  language: varchar("language", { length: 10 }).notNull().default("en"),
  theme: varchar("theme", { length: 20 }).notNull().default("system"),
  itemsPerPage: int("items_per_page").notNull().default(20),
  notifyNewApplication: boolean("notify_new_application").notNull().default(true),
  notifyNewMessage: boolean("notify_new_message").notNull().default(true),
  createdAt: datetime("created_at").notNull().default(sql`CURRENT_TIMESTAMP`),
  updatedAt: datetime("updated_at").notNull().default(sql`CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP`),
});

/* ----------------------------- CMS Core Tables ----------------------------- */
export const cmsVentures = mysqlTable("cms_ventures", {
  id: varchar("id", { length: 36 }).primaryKey().$defaultFn(() => crypto.randomUUID()),
  slug: varchar("slug", { length: 100 }).notNull().unique(),
  title: varchar("title", { length: 200 }).notNull(),
  tagline: text("tagline"),
  description: text("description"),
  category: varchar("category", { length: 100 }),
  status: varchar("status", { length: 50 }).default("active"),
  icon: varchar("icon", { length: 100 }),
  imagePath: text("image_path"),
  sortOrder: int("sort_order").default(0),
  data: json("data").$type<Record<string, unknown>>(),
  isPublished: boolean("is_published").default(true),
  createdAt: datetime("created_at").default(sql`CURRENT_TIMESTAMP`),
  updatedAt: datetime("updated_at").default(sql`CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP`),
}, (table) => [
  index("cms_ventures_sort_idx").on(table.sortOrder),
]);

export const cmsServices = mysqlTable("cms_services", {
  id: varchar("id", { length: 36 }).primaryKey().$defaultFn(() => crypto.randomUUID()),
  slug: varchar("slug", { length: 100 }).notNull().unique(),
  title: varchar("title", { length: 200 }).notNull(),
  description: text("description"),
  icon: varchar("icon", { length: 100 }),
  bullets: json("bullets").$type<string[]>(),
  pricing: json("pricing").$type<Record<string, unknown>>(),
  sortOrder: int("sort_order").default(0),
  data: json("data").$type<Record<string, unknown>>(),
  isPublished: boolean("is_published").default(true),
  createdAt: datetime("created_at").default(sql`CURRENT_TIMESTAMP`),
  updatedAt: datetime("updated_at").default(sql`CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP`),
});

export const cmsIndustries = mysqlTable("cms_industries", {
  id: varchar("id", { length: 36 }).primaryKey().$defaultFn(() => crypto.randomUUID()),
  slug: varchar("slug", { length: 100 }).notNull().unique(),
  title: varchar("title", { length: 200 }).notNull(),
  description: text("description"),
  icon: varchar("icon", { length: 100 }),
  outcomes: json("outcomes").$type<string[]>(),
  sortOrder: int("sort_order").default(0),
  data: json("data").$type<Record<string, unknown>>(),
  isPublished: boolean("is_published").default(true),
  createdAt: datetime("created_at").default(sql`CURRENT_TIMESTAMP`),
  updatedAt: datetime("updated_at").default(sql`CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP`),
});

export const cmsInsights = mysqlTable("cms_insights", {
  id: varchar("id", { length: 36 }).primaryKey().$defaultFn(() => crypto.randomUUID()),
  slug: varchar("slug", { length: 150 }).notNull().unique(),
  title: varchar("title", { length: 255 }).notNull(),
  excerpt: text("excerpt"),
  bodyMd: text("body_md"),
  category: varchar("category", { length: 100 }),
  author: varchar("author", { length: 100 }),
  coverImage: text("cover_image"),
  tags: json("tags").$type<string[]>(),
  publishedAt: datetime("published_at"),
  sortOrder: int("sort_order").default(0),
  data: json("data").$type<Record<string, unknown>>(),
  isPublished: boolean("is_published").default(true),
  createdAt: datetime("created_at").default(sql`CURRENT_TIMESTAMP`),
  updatedAt: datetime("updated_at").default(sql`CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP`),
});

/* --------------------------- Pages & Menu Items ---------------------------- */
export const cmsSitePages = mysqlTable("cms_site_pages", {
  id: varchar("id", { length: 36 }).primaryKey().$defaultFn(() => crypto.randomUUID()),
  page: varchar("page", { length: 100 }).notNull().unique(),
  path: varchar("path", { length: 255 }).notNull(),
  name: varchar("name", { length: 150 }).notNull(),
  nameBn: varchar("name_bn", { length: 150 }),
  heroEyebrow: varchar("hero_eyebrow", { length: 255 }),
  heroEyebrowBn: varchar("hero_eyebrow_bn", { length: 255 }),
  heroTitle: varchar("hero_title", { length: 255 }),
  heroTitleBn: varchar("hero_title_bn", { length: 255 }),
  heroSubtitle: text("hero_subtitle"),
  heroSubtitleBn: text("hero_subtitle_bn"),
  heroImage: text("hero_image"),
  body: text("body"),
  bodyBn: text("body_bn"),
  seoTitle: varchar("seo_title", { length: 255 }),
  seoTitleBn: varchar("seo_title_bn", { length: 255 }),
  seoDescription: text("seo_description"),
  seoDescriptionBn: text("seo_description_bn"),
  ogImage: text("og_image"),
  isCustom: boolean("is_custom").notNull().default(false),
  isPublished: boolean("is_published").notNull().default(true),
  sortOrder: int("sort_order").default(0),
  data: json("data").$type<Record<string, unknown>>(),
  createdAt: datetime("created_at").default(sql`CURRENT_TIMESTAMP`),
  updatedAt: datetime("updated_at").default(sql`CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP`),
});

export const cmsPages = mysqlTable("cms_pages", {
  id: varchar("id", { length: 36 }).primaryKey().$defaultFn(() => crypto.randomUUID()),
  page: varchar("page", { length: 100 }).notNull(),
  sectionKey: varchar("section_key", { length: 100 }).notNull(),
  title: varchar("title", { length: 255 }),
  titleBn: varchar("title_bn", { length: 255 }),
  subtitle: text("subtitle"),
  subtitleBn: text("subtitle_bn"),
  body: text("body"),
  bodyBn: text("body_bn"),
  ctaLabel: varchar("cta_label", { length: 100 }),
  ctaHref: varchar("cta_href", { length: 255 }),
  imageUrl: text("image_url"),
  sortOrder: int("sort_order").default(0),
  isPublished: boolean("is_published").default(true),
  data: json("data").$type<Record<string, unknown>>(),
  createdAt: datetime("created_at").default(sql`CURRENT_TIMESTAMP`),
  updatedAt: datetime("updated_at").default(sql`CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP`),
}, (table) => [
  index("cms_pages_page_section_idx").on(table.page, table.sectionKey),
]);

export const cmsMenuItems = mysqlTable("cms_menu_items", {
  id: varchar("id", { length: 36 }).primaryKey().$defaultFn(() => crypto.randomUUID()),
  location: varchar("location", { length: 50 }).notNull().default("header"),
  parentId: varchar("parent_id", { length: 36 }),
  depth: int("depth").notNull().default(0),
  label: varchar("label", { length: 150 }).notNull(),
  labelBn: varchar("label_bn", { length: 150 }),
  href: varchar("href", { length: 255 }).notNull(),
  groupLabel: varchar("group_label", { length: 100 }),
  sortOrder: int("sort_order").default(0),
  isExternal: boolean("is_external").default(false),
  isPublished: boolean("is_published").default(true),
  icon: varchar("icon", { length: 100 }),
  description: text("description"),
  descriptionBn: text("description_bn"),
  accent: varchar("accent", { length: 50 }),
  itemStyle: varchar("item_style", { length: 50 }),
  badge: varchar("badge", { length: 50 }),
  badgeBn: varchar("badge_bn", { length: 50 }),
  visibleTo: varchar("visible_to", { length: 50 }).notNull().default("all"),
  createdAt: datetime("created_at").default(sql`CURRENT_TIMESTAMP`),
  updatedAt: datetime("updated_at").default(sql`CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP`),
}, (table) => [
  index("cms_menu_items_location_sort_idx").on(table.location, table.sortOrder),
]);

export const cmsSettings = mysqlTable("cms_settings", {
  id: varchar("id", { length: 36 }).primaryKey().$defaultFn(() => crypto.randomUUID()),
  key: varchar("key", { length: 100 }).notNull().unique(),
  label: varchar("label", { length: 150 }),
  group: varchar("group", { length: 100 }),
  value: json("value").$type<Record<string, unknown>>(),
  sortOrder: int("sort_order").default(0),
  createdAt: datetime("created_at").default(sql`CURRENT_TIMESTAMP`),
  updatedAt: datetime("updated_at").default(sql`CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP`),
});

export const cmsMedia = mysqlTable("cms_media", {
  id: varchar("id", { length: 36 }).primaryKey().$defaultFn(() => crypto.randomUUID()),
  fileName: varchar("file_name", { length: 255 }).notNull(),
  url: text("url").notNull(),
  path: text("path"),
  mimeType: varchar("mime_type", { length: 100 }),
  sizeBytes: int("size_bytes"),
  altText: text("alt_text"),
  folder: varchar("folder", { length: 100 }).default("general"),
  createdAt: datetime("created_at").default(sql`CURRENT_TIMESTAMP`),
  updatedAt: datetime("updated_at").default(sql`CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP`),
});

/* -------------------------- Operations & Audit -------------------------- */
export const contactMessages = mysqlTable("contact_messages", {
  id: varchar("id", { length: 36 }).primaryKey().$defaultFn(() => crypto.randomUUID()),
  name: varchar("name", { length: 150 }).notNull(),
  email: varchar("email", { length: 255 }).notNull(),
  phone: varchar("phone", { length: 50 }),
  subject: varchar("subject", { length: 255 }),
  message: text("message").notNull(),
  status: varchar("status", { length: 50 }).notNull().default("new"),
  statusNote: text("status_note"),
  statusUpdatedAt: datetime("status_updated_at"),
  createdAt: datetime("created_at").notNull().default(sql`CURRENT_TIMESTAMP`),
}, (table) => [
  index("contact_messages_created_idx").on(table.createdAt),
]);

export const jobApplications = mysqlTable("job_applications", {
  id: varchar("id", { length: 36 }).primaryKey().$defaultFn(() => crypto.randomUUID()),
  jobSlug: varchar("job_slug", { length: 100 }).notNull(),
  jobTitle: varchar("job_title", { length: 200 }).notNull(),
  fullName: varchar("full_name", { length: 150 }).notNull(),
  email: varchar("email", { length: 255 }).notNull(),
  phone: varchar("phone", { length: 50 }).notNull(),
  applicantLocation: varchar("applicant_location", { length: 150 }),
  linkedin: varchar("linkedin", { length: 255 }),
  coverLetter: text("cover_letter").notNull(),
  resumeName: varchar("resume_name", { length: 255 }).notNull(),
  resumePath: text("resume_path").notNull(),
  resumeSize: int("resume_size").notNull(),
  resumeType: varchar("resume_type", { length: 100 }).notNull(),
  status: applicationStatusEnum.notNull().default("Submitted"),
  statusNote: text("status_note"),
  statusUpdatedAt: datetime("status_updated_at").notNull().default(sql`CURRENT_TIMESTAMP`),
  createdAt: datetime("created_at").notNull().default(sql`CURRENT_TIMESTAMP`),
}, (table) => [
  index("job_applications_email_idx").on(table.email),
  index("job_applications_created_idx").on(table.createdAt),
]);

export const auditLogs = mysqlTable("audit_logs", {
  id: varchar("id", { length: 36 }).primaryKey().$defaultFn(() => crypto.randomUUID()),
  tableName: varchar("table_name", { length: 100 }).notNull(),
  action: varchar("action", { length: 50 }).notNull(),
  recordId: varchar("record_id", { length: 36 }),
  actorId: varchar("actor_id", { length: 36 }),
  oldData: json("old_data").$type<Record<string, unknown>>(),
  newData: json("new_data").$type<Record<string, unknown>>(),
  createdAt: datetime("created_at").notNull().default(sql`CURRENT_TIMESTAMP`),
}, (table) => [
  index("audit_logs_table_record_idx").on(table.tableName, table.recordId),
]);
```

---

## 5. Comprehensive Feature & Functionality Breakdown

### 5.1 Frontend Features & Interactive Capabilities
1. **Dynamic Content Fallback Mesh**:
   - The app merges dynamic CMS rows from MySQL over default TypeScript seed files (`data/ventures.ts`, `data/services.ts`, `data/industries.ts`, `data/insights.ts`). If the database has zero rows or a specific venture is unpublished, the bundled static data immediately takes over without causing 404s.
2. **Liquid Glass Background Engine**:
   - High-performance HTML5 Canvas rendering soft vertical refractions, floating frosted shimmer particles, and interactive touch/click ripples.
   - Automatically throttles to low-end devices (`detectLowEnd()`), respects `prefers-reduced-motion`, and syncs with light/dark themes.
3. **Enterprise Venture Brief Document Generator**:
   - **Interactive PDF Builder** (`lib/ventureBrief.ts` using `jspdf`): Renders complete enterprise profiles including branding letterheads, metrics cards, case studies, packages, and custom watermark opacity layers.
   - **DOCX Exporter** (`lib/ventureBriefDocx.ts` and `lib/profileCustomDocx.ts` using `docx`): Downloads fully styled Microsoft Word documents with structured tables, executive summaries, and letterheads.
   - **Visual QA Diff Tool** (`lib/briefVisualDiff.ts` using `pdfjs-dist` + `pixelmatch` + `pngjs`): In-browser regression testing harness comparing PDF outputs across raster and vector engines.
4. **Bilingual Engine (EN / BN)**:
   - Dynamic UI copy translation through `react-i18next` covering all static elements and dynamic bilingual database fields (`title_bn`, `hero_title_bn`, `description_bn`, etc.).
   - Client language detection saved in `localStorage['yb-lang']` with immediate HTML document attribute updates (`document.documentElement.lang`).
5. **Real-time Application Tracker**:
   - Allows applicants to look up job application progress by typing their 8-character reference token and email.
   - Visual 5-step milestone pipeline: `Submitted` → `Under review` → `Interview` → `Offer` → `Hired` (or status badges for `On hold` / `Rejected`).
6. **Lead Capture & Contact System**:
   - Multi-field lead capture with Zod schema validation, honeypot spam protection, and real-time state feedback.

### 5.2 Backend Features & Administration Workflows
1. **Auth.js v5 Authentication & RBAC**:
   - Secure username/password authentication against the `users` and `user_roles` MySQL tables using `bcryptjs`.
   - Role-based permissions matrix:
     - `admin`: Full unrestricted access (CMS, Media, Settings, Audit logs, Database Backup/Restore, Menus, Users).
     - `moderator`: Operations Desk (Job Applications pipeline & Contact Messages).
     - `user`: Content Editor (CMS entries, Site Pages, Media Library).
2. **Brute-Force Login Shield**:
   - Limits login attempts to 5 failures per 15-minute window; enforces a 5-minute lockout period.
3. **Visual Hierarchical Menu Builder**:
   - Manages Header and Footer navigation with infinite nesting (`parent_id`), drag-and-drop sort order, custom badge highlights (e.g. "New", "HOT"), and role-based visibility (`all`, `guest`, `authenticated`, `admin`).
4. **Site Pages & Custom Page Builder**:
   - Inline CMS editor for any existing static page (`/`, `/about`, `/services`, etc.) enabling marketing teams to alter headlines, eyebrow text, and SEO metadata on the fly.
   - Dynamic Custom Landing Pages: Allows publishing new pages under `/p/[slug]` without needing redeployments.
5. **Auditing & Data Backup/Restore**:
   - Automatic record mutation logging into `audit_logs` capturing user ID, table name, action (`INSERT`, `UPDATE`, `DELETE`), and previous/new JSON payloads.
   - One-click JSON and CSV database export & chunked import/restore for disaster recovery.

---

## 6. Next.js 16 Implementation & cPanel Deployment Architecture

### 6.1 Project Directory Structure (Next.js 16 App Router)

```
yessbgd-next/
├── public/                     # Static assets (images, favicon, letterheads)
│   └── uploads/                # User uploaded resumes and media (cPanel local disk)
├── src/
│   ├── app/                    # Next.js 16 App Router
│   │   ├── (public)/           # Public layout group with Header, Footer, Liquid Glass
│   │   │   ├── page.tsx        # Homepage
│   │   │   ├── about/
│   │   │   ├── ventures/
│   │   │   ├── services/
│   │   │   ├── industries/
│   │   │   ├── insights/
│   │   │   ├── careers/
│   │   │   ├── application-status/
│   │   │   ├── contact/
│   │   │   └── p/[slug]/
│   │   ├── admin/              # Admin dashboard layout group
│   │   │   ├── login/
│   │   │   ├── applications/
│   │   │   ├── messages/
│   │   │   ├── cms/
│   │   │   ├── pages/
│   │   │   ├── menus/
│   │   │   ├── media/
│   │   │   ├── settings/
│   │   │   ├── data/
│   │   │   └── audit/
│   │   ├── api/
│   │   │   ├── auth/[...nextauth]/route.ts
│   │   │   ├── upload/route.ts
│   │   │   └── application-lookup/route.ts
│   │   ├── layout.tsx          # Root Layout (Fonts, ThemeProvider, i18nProvider)
│   │   └── globals.css         # Migrated Tailwind CSS v4 definitions
│   ├── components/             # Reusable UI & Admin components
│   │   ├── ui/                 # Radix UI primitives
│   │   ├── admin/              # Admin panels, editors, preview cards
│   │   └── [Public Components] # Header, Footer, WaterBackground, LeadCaptureForm
│   ├── db/
│   │   ├── index.ts            # Drizzle client instance (mysql2 pool)
│   │   └── schema.ts           # Drizzle MySQL schema definition
│   ├── lib/
│   │   ├── auth.ts             # Auth.js configuration & helper functions
│   │   ├── dynamicContent.ts   # Server-side DB queries with static fallback
│   │   ├── ventureBrief.ts     # In-browser PDF builder
│   │   └── mediaStorage.ts     # Filesystem upload/delete helper for cPanel
│   └── data/                   # Bundled static fallback datasets
├── drizzle.config.ts           # Drizzle migration config
├── next.config.ts              # Next.js 16 config with standalone output
├── package.json
└── tsconfig.json
```

### 6.2 Next.js 16 Configuration for Standalone Build (`next.config.ts`)
```typescript
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone", // Bundles server.js + minimal node_modules for cPanel deployment
  reactStrictMode: true,
  images: {
    unoptimized: true, // Prevents sharp/libvips binary dependency issues on standard cPanel
  },
  experimental: {
    serverActions: {
      bodySizeLimit: "10mb", // Accommodates PDF/DOCX resume attachments
    },
  },
};

export default nextConfig;
```

### 6.3 Deploying Next.js 16 on cPanel
cPanel supports Node.js applications via the **Setup Node.js App** module (powered by CloudLinux Passenger).

1. **cPanel Node.js Application Setup**:
   - Go to cPanel → **Setup Node.js App** → **Create Application**.
   - **Node.js version**: Choose 20.x or 22.x LTS.
   - **Application mode**: `Production`.
   - **Application root**: `yessbgd_app`.
   - **Application startup file**: `server.js`.
2. **Build and Deployment Process**:
   ```bash
   # On build machine or CI:
   npm run build
   # Next.js generates the standalone bundle at: .next/standalone/
   
   # Copy required deployment files to cPanel:
   cp -r .next/standalone/* /home/user/yessbgd_app/
   cp -r .next/static /home/user/yessbgd_app/.next/static
   cp -r public /home/user/yessbgd_app/public
   ```
3. **Database Configuration in cPanel**:
   - Create a MySQL database and user in cPanel → **MySQL Databases**.
   - Grant full privileges to the database user.
   - Configure `.env` in the application root:
     ```env
     DATABASE_URL="mysql://cpanel_user:cpanel_password@localhost:3306/cpanel_yessbgd"
     AUTH_SECRET="generated-secure-random-token"
     NEXTAUTH_URL="https://yessbangla.com"
     UPLOAD_DIR="/home/user/yessbgd_app/public/uploads"
     ```
   - Run Drizzle migrations:
     ```bash
     npx drizzle-kit migrate
     ```
4. **Apache / LiteSpeed Integration**:
   - Passenger automatically routes incoming port 80/443 traffic to your Node.js application instance via the `.htaccess` file generated by cPanel.
