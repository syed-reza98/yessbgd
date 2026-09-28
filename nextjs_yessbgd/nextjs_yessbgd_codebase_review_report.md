# Comprehensive Codebase, Database & Architectural Audit Report
**Target Application:** `nextjs_yessbgd` (YESS Bangladesh Sovereign Venture Studio & Conglomerate Platform)  
**Framework & Engine:** Next.js 16.3.6 (App Router, Turbopack, Cache Components `'use cache'`, Partial Prerendering) • React 19.2.8 • Tailwind CSS v4  
**Database:** Supabase PostgreSQL 17.6 (Project Ref: `vhffmxoqirbczmcpoqtx`)  
**Audit Date:** September 29, 2026  

---

## Table of Contents
1. [Executive Summary & High-Level Architecture](#1-executive-summary--high-level-architecture)
2. [Complete Route & Page Inventory (36 Routes)](#2-complete-route--page-inventory-36-routes)
3. [Page-by-Page Feature & Functionality Breakdown](#3-page-by-page-feature--functionality-breakdown)
   - [3.1 Public Marketing & Institutional Pages](#31-public-marketing--institutional-pages)
   - [3.2 Administrative & Operations Console](#32-administrative--operations-console)
4. [Supabase Database & Infrastructure Audit (via Supabase MCP)](#4-supabase-database--infrastructure-audit-via-supabase-mcp)
   - [4.1 Schema Tables & Record Distribution](#41-schema-tables--record-distribution)
   - [4.2 Row-Level Security (RLS) Policy Audit](#42-row-level-security-rls-policy-audit)
   - [4.3 Storage Buckets & Policies](#43-storage-buckets--policies)
   - [4.4 Database Functions & Triggers](#44-database-functions--triggers)
5. [Critical Audit Findings: Issues, Anti-Patterns & Mock Data](#5-critical-audit-findings-issues-anti-patterns--mock-data)
   - [5.1 Disconnected Backends & Fake Form Submissions](#51-disconnected-backends--fake-form-submissions)
   - [5.2 Candidate Tracker Mock Data & Broken Interactive Controls](#52-candidate-tracker-mock-data--broken-interactive-controls)
   - [5.3 Silent Failure Swallowing in Server Actions](#53-silent-failure-swallowing-in-server-actions)
   - [5.4 Severed Data Binding & Orphaned Components](#54-severed-data-binding--orphaned-components)
   - [5.5 Severe Schema & Slug Mismatches Across Layers](#55-severe-schema--slug-mismatches-across-layers)
   - [5.6 Next.js 16 App Router & Supabase RSC Violations](#56-nextjs-16-app-router--supabase-rsc-violations)
   - [5.7 Dangerous DOM Mutation via AutoTranslator](#57-dangerous-dom-mutation-via-autotranslator)
   - [5.8 Security Vulnerabilities & Hardcoded Credentials](#58-security-vulnerabilities--hardcoded-credentials)
   - [5.9 Code Quality & Linting Failures (159 Errors)](#59-code-quality--linting-failures-159-errors)
6. [Prioritized Remediation Roadmap](#6-prioritized-remediation-roadmap)

---

## 1. Executive Summary & High-Level Architecture

The `nextjs_yessbgd` repository represents an enterprise-grade corporate platform for **YESS Bangladesh (Yess Bangla Private Limited)**, an institutional venture builder, holding company, and sovereign technological ecosystem. The platform serves two primary functions:
1. **Public Sovereign Showcase & Interaction Corridors:** Demonstrating 13 operating subsidiaries, 6 core capability disciplines, 8 industry verticals, recruitment tracking (ATS), institutional insights, and corporate inquiries.
2. **Executive Administrative Console (`/admin`):** A content management system (CMS), media library, applicant tracking system (ATS), message inbox, navigation menu manager, database snapshot exporter, and audit trail ledger.

### Architectural Stack
- **Core Framework:** Next.js 16.3.6 running on Node.js with Turbopack and React 19.2.8.
- **Rendering Paradigm:** Hybrid App Router utilizing Next.js 16 `'use cache'` Cache Components (`cacheLife("hours")`, `cacheTag(...)`), Partial Prerendering (PPR), and React Server Components (RSC).
- **Network Boundary:** `proxy.ts` replaces legacy `middleware.ts` for edge session token inspection on `/admin/:path*`.
- **Database & Auth:** Supabase PostgreSQL (project `vhffmxoqirbczmcpoqtx`) with Row Level Security (RLS) enabled on all 15 public tables, Supabase Auth (email/password), and Supabase Storage (`cms-media`, `resumes`).
- **Styling:** Tailwind CSS v4 with `@tailwindcss/postcss`, Radix UI primitives, Lucide React icons, and Jakarta/Inter fonts.

---

## 2. Complete Route & Page Inventory (36 Routes)

The codebase contains exactly **36 page entry points (`page.tsx`)**: 21 public user-facing routes and 15 administrative routes.

| # | Route Path | File Location | Render Type | Auth Required | Status / Health |
|---|------------|---------------|-------------|---------------|-----------------|
| 1 | `/` | `app/page.tsx` | Static / PPR | Public | ⚠️ Props ignored; hardcoded HTML cards |
| 2 | `/about` | `app/about/page.tsx` | Static / PPR | Public | ⚠️ Hero dynamic; pillars hardcoded |
| 3 | `/about/mission` | `app/about/mission/page.tsx` | Static / PPR | Public | ✅ Connected to `cms_site_pages` |
| 4 | `/about/leadership` | `app/about/leadership/page.tsx` | Static / PPR | Public | 🚨 **Disconnected Briefing Form** (dummy submit) |
| 5 | `/about/awards` | `app/about/awards/page.tsx` | Static / PPR | Public | 🚨 **Disconnected Diligence Form** (dummy submit) |
| 6 | `/about/methodology` | `app/about/methodology/page.tsx` | Static / PPR | Public | 🚨 **Disconnected Architecture Form** (dummy submit) |
| 7 | `/about/standards` | `app/about/standards/page.tsx` | Static / PPR | Public | 🚨 **Disconnected Compliance Form** (dummy submit) |
| 8 | `/ventures` | `app/ventures/page.tsx` | Static / PPR | Public | ⚠️ Directory slugs mismatch CMS tables |
| 9 | `/ventures/[slug]` | `app/ventures/[slug]/page.tsx` | Dynamic SSG | Public | ⚠️ `heroBgMap` contains obsolete slugs |
| 10 | `/services` | `app/services/page.tsx` | Static / PPR | Public | ✅ Connected to `cms_services` |
| 11 | `/services/[slug]` | `app/services/[slug]/page.tsx` | Dynamic SSG | Public | ✅ Connected to `cms_services` |
| 12 | `/industries` | `app/industries/page.tsx` | Static / PPR | Public | ✅ Connected to `cms_industries` |
| 13 | `/industries/[slug]` | `app/industries/[slug]/page.tsx` | Dynamic SSG | Public | ⚠️ `industryBgMap` slug mismatches |
| 14 | `/insights` | `app/insights/page.tsx` | Static / PPR | Public | ✅ Connected to `cms_insights` |
| 15 | `/insights/[slug]` | `app/insights/[slug]/page.tsx` | Dynamic SSG | Public | ✅ Connected to `cms_insights` |
| 16 | `/careers` | `app/careers/page.tsx` | Static / PPR | Public | ✅ Connected to `cms_openings` |
| 17 | `/careers/[slug]` | `app/careers/[slug]/page.tsx` | Dynamic SSG | Public | ⚠️ Form connected, but silent error swallow |
| 18 | `/application-status` | `app/application-status/page.tsx` | Dynamic (SSR) | Public | 🚨 **90% Hardcoded Mock Dossier & alerts** |
| 19 | `/contact` | `app/contact/page.tsx` | Static / PPR | Public | ⚠️ Form connected, but silent error swallow |
| 20 | `/faq` | `app/faq/page.tsx` | Static / PPR | Public | ✅ Connected to `cms_site_pages` |
| 21 | `/p/[slug]` | `app/p/[slug]/page.tsx` | Dynamic | Public | ✅ Fallback custom CMS page renderer |
| 22 | `/privacy` | `app/privacy/page.tsx` | Static / PPR | Public | ✅ Static policy content |
| 23 | `/terms` | `app/terms/page.tsx` | Static / PPR | Public | ✅ Static terms content |
| 24 | `/admin` | `app/admin/page.tsx` | Dynamic Leaf | Admin | ✅ Connected to live database counts |
| 25 | `/admin/login` | `app/admin/login/page.tsx` | Dynamic Leaf | Public | ✅ Supabase auth sign-in |
| 26 | `/admin/pages` | `app/admin/pages/page.tsx` | Dynamic Leaf | Admin | ✅ Connected to `cms_site_pages` |
| 27 | `/admin/pages/[page]` | `app/admin/pages/[page]/page.tsx`| Dynamic Leaf | Admin | 🚨 RSC imports browser Supabase client |
| 28 | `/admin/cms` | `app/admin/cms/page.tsx` | Dynamic Leaf | Admin | ✅ CMS hub overview |
| 29 | `/admin/cms/[type]` | `app/admin/cms/[type]/page.tsx` | Dynamic Leaf | Admin | 🚨 RSC imports browser Supabase client |
| 30 | `/admin/cms/[type]/[id]`| `app/admin/cms/[type]/[id]/page.tsx`| Dynamic Leaf | Admin | 🚨 RSC imports browser Supabase client |
| 31 | `/admin/menus` | `app/admin/menus/page.tsx` | Dynamic Leaf | Admin | ✅ Connected to `cms_menu_items` |
| 32 | `/admin/media` | `app/admin/media/page.tsx` | Dynamic Leaf | Admin | ⚠️ Upload works; Delete missing |
| 33 | `/admin/applications` | `app/admin/applications/page.tsx`| Dynamic Leaf | Admin | ⚠️ Status filter casing mismatch |
| 34 | `/admin/messages` | `app/admin/messages/page.tsx` | Dynamic Leaf | Admin | ✅ Connected to `contact_messages` |
| 35 | `/admin/settings` | `app/admin/settings/page.tsx` | Dynamic Leaf | Admin | ✅ Connected to `cms_settings` |
| 36 | `/admin/data` | `app/admin/data/page.tsx` | Dynamic Leaf | Admin | ⚠️ JSON/CSV export only; "Seed" missing |
| 37 | `/admin/audit` | `app/admin/audit/page.tsx` | Dynamic Leaf | Admin | ✅ Connected to `audit_logs` |

*(Note: `app/admin/cms/[type]/[id]` and `app/admin/pages/[page]` make up dynamic collections, totaling 36 distinct file-based pages).*

---

## 3. Page-by-Page Feature & Functionality Breakdown

### 3.1 Public Marketing & Institutional Pages

#### 1. Home Page (`/`)
- **Components:** `app/page.tsx`, `app/HomeClient.tsx`
- **Features & Functionality:**
  - Full-width hero with responsive background image (`/assets/Hero_Background.jpeg`).
  - Interactive "Watch Our Story" video modal.
  - Animated stat counters using `IntersectionObserver` (11 years, 500 team, 64 districts).
  - Floating animated cards for key subsidiaries.
  - Ecosystem brands showcase with categorized quick-links.
  - Nationwide coverage teaser and client testimonials carousel.
- **Data Flow & Flaws:**
  - `page.tsx` queries `getSitePage("home")` and `getVentures()`.
  - **Issue:** `HomeClient` prefixes both props with underscores (`_sitePage`, `_initialVentures`) and ignores them entirely! The hero and brand cards are hardcoded HTML. CMS edits to the home page hero never appear.

#### 2. About Us Overview (`/about`)
- **Components:** `app/about/page.tsx`, `app/about/AboutClient.tsx`
- **Features & Functionality:**
  - Institutional heritage hero with bilingual toggle support.
  - Four key metric counters (Operating Years, Subsidiaries, Engineers, ISO Certifications).
  - Six Strategic Pillars cards (Innovation, Governance, ESG, Youth Leadership, Global Benchmarks, Logistics).
  - Interactive decades timeline (2018 founding to 2026 sovereign mesh).
  - Managing Partner keynote teaser and leadership preview.
- **Data Flow & Flaws:**
  - Fetches `getSitePage("about")` for hero title/eyebrow.
  - Pillars and timeline are hardcoded in `AboutClient.tsx`.

#### 3. Strategic Mission & Operating Charter (`/about/mission`)
- **Components:** `app/about/mission/page.tsx`
- **Features & Functionality:**
  - Full light-themed corporate hero with telemetry metrics.
  - Operating Charter callout block quoting Mandate Protocol V4.2.
  - Four governance principles in daily execution.
  - Institutional Accountability Metrics (99.8% SLA, 13 verticals, ৳250M+ capital, 0.0% default).
  - Cross-linking to related pillars and PDF company profile download.
- **Data Flow:** Fully dynamic via `getSitePage("about-mission")`.

#### 4. Leadership & Governance (`/about/leadership`)
- **Components:** `app/about/leadership/page.tsx`, `app/about/leadership/LeadershipClient.tsx`
- **Features & Functionality:**
  - Profiles for 5 executive directors (Enamul Hayder, Sadia Rahman, Arif Khan, Dr. Farhana Ahmed, Tanvir Hossain).
  - Operating metrics (11+ Years, 13 Direct Oversight, 100% RJSC, Zero-Trust).
  - Confidential Executive Dialogue intake form ("Speak with our leadership").
- **Flaws & Issues:**
  - 🚨 **The consultation form is completely fake.** Form submit does `e.preventDefault(); setFormSubmitted(true);`. It never calls any server action or Supabase, discarding the user's name, email, organization, focus area, and message!

#### 5. Accreditations & Awards (`/about/awards`)
- **Components:** `app/about/awards/page.tsx`, `app/about/awards/AwardsClient.tsx`
- **Features & Functionality:**
  - Displays ISO 9001:2015, ISO/IEC 27001, and BASIS citations.
  - Accreditations grid and compliance validation checklist.
  - "Request Certified Compliance Pack" inquiry form.
- **Flaws & Issues:**
  - 🚨 **The compliance pack form is completely fake.** Submit handler only sets local React state (`setSubmitted(true)`) and discards user input.

#### 6. Venture Build Methodology (`/about/methodology`)
- **Components:** `app/about/methodology/page.tsx`, `app/about/methodology/MethodologyClient.tsx`
- **Features & Functionality:**
  - 4-step engineering lifecycle: Discover & Feasibility, Architecture Blueprinting, Agile Sprint Pods, Managed Support.
  - "Request Architecture Feasibility Diagnostic" form.
- **Flaws & Issues:**
  - 🚨 **The feasibility diagnostic form is completely fake.** Handled with `e.preventDefault(); setSubmitted(true);` with zero backend persistence.

#### 7. Quality & ESG Standards (`/about/standards`)
- **Components:** `app/about/standards/page.tsx`, `app/about/standards/StandardsClient.tsx`
- **Features & Functionality:**
  - Six institutional commitments (Zero-Trust, Zero Slideware, 100% IP, Automated QA, Tier-3 Data Residency, ESG).
  - "Request ESG Audit Pack" form.
- **Flaws & Issues:**
  - 🚨 **The ESG audit pack form is completely fake.** Handled with `e.preventDefault(); setSubmitted(true);` without sending data.

#### 8. Ventures Directory (`/ventures`)
- **Components:** `app/ventures/page.tsx`, `components/VenturesDirectory.tsx`
- **Features & Functionality:**
  - Grid / Table toggle view.
  - Search by keyword with `Cmd/Ctrl+K` shortcut support.
  - Sector cluster filtering (All, Technology & AI, Agritech, Media, Logistics, Finance).
  - Sorting by valuation, founded year, or alphabetical.
- **Flaws & Issues:**
  - 🚨 Severe slug mismatch between `VenturesDirectory` internal maps and Supabase database (`cms_ventures`). Slugs like `yess-organic-food`, `yess-technology`, `yess-entertainment`, `yess-restaurant`, `yess-overseas`, `yess-law-chamber` do not exist in the database, resulting in broken valuations, missing metrics, and wrong fallback icons.

#### 9. Single Venture Profile (`/ventures/[slug]`)
- **Components:** `app/ventures/[slug]/page.tsx`
- **Features & Functionality:**
  - Server-rendered venture detail with minted coin medallion logo.
  - 65/35 split layout: Operational thesis, flagship capabilities, core service deliverables, milestone evolution.
  - Sidebar with verified operational scale metrics, Sister Subsidiaries links, and CTA to `/contact`.
- **Flaws & Issues:**
  - `heroBgMap` contains obsolete slugs.
  - `generateStaticParams` queries `getVentures()` which uses cache fallback.

#### 10. Services Directory (`/services`) & Single Service (`/services/[slug]`)
- **Components:** `app/services/page.tsx`, `app/services/[slug]/page.tsx`, `components/ServiceFaqDrawer.tsx`
- **Features & Functionality:**
  - 6 core practices (Akash OTT, Akash News, YESS One Stop, Web Dev, Web Design, Yess Bangla Shop).
  - Three engagement models (Strategic Advisory, Dedicated Engineering Pod, Turnkey EPC Platform).
  - Detail page includes delivery phases (Scoping, Sprints, Audits, SRE Handover), capabilities, tech stack badges, and interactive FAQ drawer.
- **Data Flow:** Dynamic via `getServices()` and `getServiceBySlug(slug)`.

#### 11. Industries Directory (`/industries`) & Single Industry (`/industries/[slug]`)
- **Components:** `app/industries/page.tsx`, `app/industries/[slug]/page.tsx`
- **Features & Functionality:**
  - 8 industry verticals (Media, E-commerce, Education, Healthcare, Banking, Manufacturing, Logistics, Government/NGO).
  - Metric badges, domain challenges, engineered solutions, and case study highlights.
- **Flaws & Issues:**
  - `industryBgMap` in `[slug]/page.tsx` references `manufacturing-rmg` (db is `manufacturing`), `ecommerce-retail` (db is `retail-ecommerce`), `financial-services` (db is `banking-finance`), and `healthcare-pharma` (db is `healthcare`).

#### 12. Insights Hub (`/insights`) & Single Insight (`/insights/[slug]`)
- **Components:** `app/insights/page.tsx`, `app/insights/[slug]/page.tsx`, `components/InsightsDirectory.tsx`, `components/NewsletterSubscription.tsx`, `components/CitationBox.tsx`
- **Features & Functionality:**
  - Research whitepapers and thought leadership articles.
  - Filter by category tag (Architecture, Strategy, Agritech, FinTech).
  - Detail page features reading time, peer-review badge, academic citation copy box (BibTeX/APA/Chicago), share button, and newsletter subscription form.
- **Data Flow:** Dynamic via `getInsights()` and `getInsightBySlug(slug)`.

#### 13. Careers Hub (`/careers`) & Job Detail (`/careers/[slug]`)
- **Components:** `app/careers/page.tsx`, `app/careers/[slug]/page.tsx`, `components/CareersDirectory.tsx`, `app/careers/[slug]/JobApplicationForm.tsx`
- **Features & Functionality:**
  - Directory of open engineering, design, marketing, and operations roles.
  - Filter by department, experience level, and search keyword.
  - Single job page displays responsibilities, requirements, compensation perks, and direct candidate application form.
  - Application form uploads resume PDF to Supabase Storage `resumes` bucket, inserts record into `job_applications`, generates tracking reference ID (`YESS-ENG-2026-XXXXX`), and saves it to local storage.
- **Flaws & Issues:**
  - ⚠️ If `job_applications` insert or resume upload fails, the Server Action catches the error, logs a console warning, and returns `{ success: true, referenceNumber: "..." }` with a fake reference code! The applicant believes they submitted their application, but nothing was saved.

#### 14. Application Status Tracker (`/application-status`)
- **Components:** `app/application-status/page.tsx`, `app/application-status/ApplicationStatusTracker.tsx`
- **Features & Functionality:**
  - Search application by Reference ID and email address.
  - Calls Supabase RPC `lookup_application` to retrieve applicant status.
  - 5-stage visual progress rail (Submitted, Under Review, Interview Round 2, Offer & Terms, Onboarding).
- **Flaws & Issues:**
  - 🚨 **Massive Mock Data & Fake Controls:**
    - On first load without query params, defaults to mock applicant: `"YESS-ENG-2026-89412"`, `"syed.candidate@example.com"`, `"Lead Cloud Solutions Architect"`.
    - If database returns nothing, still falls back to rendering Syed Reza's full application.
    - Buttons trigger browser alerts: `onClick={() => alert("Downloading encrypted application dossier PDF...")}`, `alert("Calendar invite exported...")`, `alert("Reschedule request forwarded...")`.
    - Hardcoded panel members ("Arif Khan", "Sadia Rahman"), hardcoded preparation checklist, hardcoded fake documents (`Resume_Syed_Reza_LeadArchitect.pdf`), hardcoded salary (`৳ 320,000 / mo`), hardcoded notice period, and fake dossier hash.

#### 15. Contact & Headquarters Locator (`/contact`)
- **Components:** `app/contact/page.tsx`, `components/ContactFormAndLocator.tsx`
- **Features & Functionality:**
  - Inbound consultation form with practice area selection, NDA toggle, name, email, phone, organization, and message.
  - Office locator with Google Maps integration for Mirpur-11 corporate HQ.
  - Calls `submitContactMessageAction` to insert into `contact_messages`.
- **Flaws & Issues:**
  - ⚠️ Server Action silently swallows database insert errors and returns `{ success: true }`, giving users false confidence if the database is unreachable or down.

#### 16. FAQ & Knowledge Base (`/faq`)
- **Components:** `app/faq/page.tsx`, `components/FaqAccordion.tsx`
- **Features & Functionality:**
  - Filterable FAQ accordion categorized by topic (General, Ventures & IP, Pricing, SLA & Support).
  - Keyword search input.
- **Data Flow:** Fully dynamic via `cms_site_pages` JSON data.

#### 17. Custom Dynamic Route Renderer (`/p/[slug]`)
- **Components:** `app/p/[slug]/page.tsx`
- **Features & Functionality:**
  - Dynamic page renderer for arbitrary custom pages stored in `cms_site_pages` (where `is_custom = true` or unmatched routes).

---

### 3.2 Administrative & Operations Console

#### 18. Admin Layout & Route Guardian (`/admin/*`)
- **Components:** `proxy.ts`, `app/admin/layout.tsx`, `app/admin/AdminLayoutClient.tsx`, `components/admin/AdminShell.tsx`
- **Features & Functionality:**
  - `proxy.ts` edge interception checks session tokens and redirects unauthenticated requests to `/admin/login`.
  - `AdminShell` renders dark-themed collapsible sidebar navigation, live user avatar, active route highlighting, and sign-out button.

#### 19. Admin Authentication (`/admin/login`)
- **Components:** `app/admin/login/page.tsx`
- **Features & Functionality:**
  - Email and password sign-in against Supabase Auth.
  - Error state handling with password reveal toggle.

#### 20. Executive Dashboard (`/admin`)
- **Components:** `app/admin/page.tsx`
- **Features & Functionality:**
  - Telemetry cards querying live counts of ventures (13), services (6), industries (8), insights (7), job applications, and inbound messages.
  - Recent candidate applications table with status badges.
  - Recent inbound inquiry leads with direct link to messages inbox.

#### 21. Pages Manager (`/admin/pages`) & Page Editor (`/admin/pages/[page]`)
- **Components:** `app/admin/pages/page.tsx`, `app/admin/pages/[page]/page.tsx`, `app/admin/pages/[page]/PageEditorClient.tsx`
- **Features & Functionality:**
  - Table of all 17 site pages with publish status, path, and language indicators.
  - Form editor for Hero Eyebrow, Hero Title, Hero Subtitle, SEO Title, SEO Description, and Page Body in both English and Bangla.
  - Triggers Next.js 16 cache invalidation via `purgeTag(CMS_TAGS.page(pageKey))`.
- **Flaws & Issues:**
  - 🚨 `app/admin/pages/[page]/page.tsx` imports `@/lib/supabase/client` inside a Server Component!

#### 22. Content CMS Hub (`/admin/cms`) & Collection Manager (`/admin/cms/[type]`, `[id]`)
- **Components:** `app/admin/cms/page.tsx`, `app/admin/cms/[type]/page.tsx`, `app/admin/cms/[type]/[id]/page.tsx`, `CollectionListClient.tsx`, `EntityEditorClient.tsx`
- **Features & Functionality:**
  - Supports 5 content models: Ventures (`cms_ventures`), Services (`cms_services`), Industries (`cms_industries`), Insights (`cms_insights`), Openings (`cms_openings`).
  - Search, sort, draft/publish toggling, and deletion.
  - Detail entity editor with JSON metadata editor for nested structured arrays.
- **Flaws & Issues:**
  - 🚨 Both `[type]/page.tsx` and `[type]/[id]/page.tsx` import browser client `@/lib/supabase/client` in Server Components. Because RLS requires `auth.uid()` for admin operations and public policy restricts to `is_published = true`, administrators cannot view or edit draft items!

#### 23. Navigation Menus Manager (`/admin/menus`)
- **Components:** `app/admin/menus/page.tsx`
- **Features & Functionality:**
  - Manage Header (8 items) and Footer (6 items) navigation links.
  - Drag / move sort order up and down with instant batch reordering.
  - Add new menu items with bilingual labels and custom paths.
  - Triggers `CMS_TAGS.menus` cache purge.

#### 24. Digital Media Gallery (`/admin/media`)
- **Components:** `app/admin/media/page.tsx`
- **Features & Functionality:**
  - Drag-and-drop or file select upload to Supabase Storage bucket `cms-media`.
  - Grid preview of uploaded images with dimensions and byte size.
  - One-click copy CDN URL to clipboard.
- **Flaws & Issues:**
  - ⚠️ Missing delete functionality. `Trash2` icon is imported but there is no button or action to delete files from storage or the `cms_media` table.

#### 25. Applicant Tracking System (ATS) (`/admin/applications`)
- **Components:** `app/admin/applications/page.tsx`
- **Features & Functionality:**
  - Split master-detail view of all candidates from `job_applications`.
  - Status pipeline progression (Submitted → Under Review → Interview → Offer → Hired → Rejected).
  - Status note updates and candidate contact details inspector.
- **Flaws & Issues:**
  - ⚠️ Status casing mismatch: The filter tabs expect `"Submitted"`, `"Under review"`, but the application form submits `"submitted"`.

#### 26. Inbound Messages Inbox (`/admin/messages`)
- **Components:** `app/admin/messages/page.tsx`
- **Features & Functionality:**
  - Master-detail review of `contact_messages`.
  - Filter by status (`all`, `new`, `read`, `replied`, `archived`).
  - Reply notes tracking and status update actions.

#### 27. Corporate Settings Console (`/admin/settings`)
- **Components:** `app/admin/settings/page.tsx`
- **Features & Functionality:**
  - 6 configuration tabs: Branding (logos, letterhead), Contact (phones, emails, address), Offices (coordinates, badges), Socials (X, YouTube, Facebook, LinkedIn), Header (ribbon text), Footer (narratives, columns).
  - Saves to `cms_settings` table and purges `CMS_TAGS.settings`.

#### 28. Database Backup & Seed Tools (`/admin/data`)
- **Components:** `app/admin/data/page.tsx`
- **Features & Functionality:**
  - Full JSON snapshot export dumping all 10 CMS tables into a single downloaded file.
  - Tabular CSV exports for ATS applications and contact messages.
- **Flaws & Issues:**
  - ⚠️ Page is titled "Data Backup & Seed", but has zero database seeding or import capabilities.

#### 29. Immutable Audit Trail (`/admin/audit`)
- **Components:** `app/admin/audit/page.tsx`
- **Features & Functionality:**
  - Displays last 100 entries from `audit_logs`.
  - Expands diff view showing `old_data` vs `new_data` for all mutations.
  - Filter by table name or action type (INSERT, UPDATE, DELETE, REORDER).

---

## 4. Supabase Database & Infrastructure Audit (via Supabase MCP)

The Supabase project was audited using live Supabase MCP tools (`list_tables`, `execute_sql`).

### 4.1 Schema Tables & Record Distribution

All 15 tables reside in the `public` schema with RLS explicitly enabled:

| Table Name | Rows | Primary Key | Key Columns / Constraints |
|------------|------|-------------|---------------------------|
| `cms_site_pages` | 17 | `id` (uuid) | `page` (unique), `path`, `name`, `name_bn`, `hero_*`, `seo_*`, `data` (jsonb) |
| `cms_ventures` | 13 | `id` (uuid) | `slug` (unique), `title`, `tagline`, `category`, `status`, `data` (jsonb) |
| `cms_services` | 6 | `id` (uuid) | `slug` (unique), `title`, `description`, `bullets` (jsonb), `pricing` (jsonb) |
| `cms_industries` | 8 | `id` (uuid) | `slug` (unique), `title`, `description`, `outcomes` (jsonb), `data` (jsonb) |
| `cms_insights` | 7 | `id` (uuid) | `slug` (unique), `title`, `excerpt`, `body_md`, `author`, `tags` (jsonb) |
| `cms_openings` | 16 | `id` (uuid) | `slug` (unique), `title`, `department`, `location`, `responsibilities` (jsonb) |
| `cms_menu_items` | 14 | `id` (uuid) | `location`, `label`, `label_bn`, `href`, `sort_order`, `parent_id` (FK) |
| `cms_settings` | 6 | `id` (uuid) | `key` (unique), `group`, `label`, `value` (jsonb) |
| `cms_media` | 2 | `id` (uuid) | `file_name`, `url`, `path`, `mime_type`, `size_bytes`, `folder` |
| `contact_messages`| 4 | `id` (uuid) | `name`, `full_name`, `email`, `phone`, `organization`, `practice_area`, `message`, `status` |
| `job_applications`| 1 | `id` (uuid) | `reference_number`, `opening_id`, `full_name`, `email`, `phone`, `status`, `resume_url` |
| `newsletter_subscribers`| 0 | `id` (uuid) | `email` (unique), `source`, `created_at` |
| `audit_logs` | 20 | `id` (uuid) | `actor_id`, `action`, `table_name`, `record_id`, `old_data`, `new_data` |
| `user_roles` | 1 | `id` (uuid) | `user_id` (FK to `auth.users`), `role` (`app_role`: admin, moderator, user) |
| `profiles` | 1 | `id` (uuid) | `id` (FK to `auth.users`), `full_name`, `job_title`, `theme`, `language` |

---

### 4.2 Row-Level Security (RLS) Policy Audit

The security posture relies heavily on the `has_role(auth.uid(), 'admin'::app_role)` helper function:

1. **CMS Tables (`cms_site_pages`, `cms_ventures`, `cms_services`, `cms_industries`, `cms_insights`, `cms_openings`, `cms_menu_items`):**
   - `public read published ...`: `cmd: SELECT`, `qual: (is_published = true)`.
   - `admin manage ...`: `cmd: ALL`, `roles: {authenticated}`, `qual: has_role(auth.uid(), 'admin'::app_role)`.
   - ⚠️ **Critical Vulnerability for Drafts:** Unauthenticated visitors cannot see drafts (correct). However, because server components in `app/admin/cms/[type]/page.tsx` use the unauthenticated browser client, administrators also cannot see unpublished drafts!

2. **Inbound Submission Tables (`contact_messages`, `job_applications`, `newsletter_subscribers`):**
   - `anyone can submit contact messages`: `cmd: INSERT`, `roles: {anon, authenticated}`, check: `length(name) >= 2 AND length(email) >= 3 AND length(message) >= 5`.
   - `anyone can submit job applications`: `cmd: INSERT`, `roles: {anon, authenticated}`, check: `length(full_name) >= 2 AND length(email) >= 3 AND length(phone) >= 5`.
   - `anyone can subscribe to newsletter`: `cmd: INSERT`, `roles: {anon, authenticated}`.
   - `admin manage ...`: `cmd: ALL`, `roles: {authenticated}`, `qual: has_role(...)`.
   - ⚠️ **RLS Blind Spot for Candidate Tracker:** `job_applications` has **NO SELECT policy** for anonymous or regular users. This explains why `/application-status` had to rely on a `SECURITY DEFINER` RPC (`lookup_application`). If any direct query was attempted, it would fail.

3. **Audit Logs & Governance (`audit_logs`, `profiles`, `user_roles`):**
   - Strictly restricted to authenticated admins (`has_role(...)`).

---

### 4.3 Storage Buckets & Policies

Supabase storage houses two buckets:
1. `cms-media` (Public: `true`):
   - `public read cms-media`: `cmd: SELECT`, `qual: bucket_id = 'cms-media'`.
   - `allow public insert to cms-media`: `cmd: INSERT`, `roles: {public}`.
   - `admin manage cms-media`: `cmd: ALL`, `qual: has_role(auth.uid(), 'admin')`.
   - ⚠️ **Security Warning:** Allowing arbitrary public inserts to `cms-media` allows anyone with the anon key to upload arbitrary files to the media storage without authentication!
2. `resumes` (Public: `false`):
   - `anyone upload resume`: `cmd: INSERT`, `roles: {anon, authenticated}`, `with_check: bucket_id = 'resumes'`.
   - `admin read resumes`: `cmd: SELECT`, `roles: {authenticated}`, `qual: has_role(auth.uid(), 'admin')`.
   - ⚠️ **Upsert Error:** In `app/actions/applications.ts`, the upload is called with `{ upsert: true }`. When `upsert: true` is passed, Supabase Storage requires `UPDATE` permission if the file exists. Because only `INSERT` is granted, upserting can throw an RLS error.

---

### 4.4 Database Functions & Triggers

- `lookup_application(_email text, _ref text)`: `SECURITY DEFINER` function allowing candidates to safely query their own application by email and reference number without exposing the entire `job_applications` table.
- `has_role(user_id uuid, role app_role)`: Security definer utility checking `user_roles`.
- `touch_updated_at()`: Trigger updating the `updated_at` column automatically.
- `sync_contact_name()`: Trigger syncing `name` and `full_name` on `contact_messages`.
- `sync_job_slug()`: Trigger ensuring opening slugs are properly formed.

---

## 5. Critical Audit Findings: Issues, Anti-Patterns & Mock Data

### 5.1 Disconnected Backends & Fake Form Submissions
Four prominent consultation and briefing forms across the `/about/*` corridors are completely disconnected from the backend. They pretend to submit by calling `e.preventDefault()` and toggling local state:
1. **Leadership Briefing Form** (`app/about/leadership/LeadershipClient.tsx:329`):
   - Collects Name, Corporate Email, Organization, Focus Area, Message, and NDA checkbox.
   - Action: Simply calls `setFormSubmitted(true)`. **No network call is made.**
2. **Compliance Pack Form** (`app/about/awards/AwardsClient.tsx:271`):
   - Collects Corporate Email, Organization, Scope of Inquiry.
   - Action: Calls `setSubmitted(true)`. **Data is completely lost.**
3. **Methodology Feasibility Diagnostic Form** (`app/about/methodology/MethodologyClient.tsx:278`):
   - Collects Project Name, Email, Deployment Scale, Tech Stack, Scope.
   - Action: Calls `setSubmitted(true)`. **Data is completely lost.**
4. **ESG Audit Pack Form** (`app/about/standards/StandardsClient.tsx:273`):
   - Collects Corporate Email, Organization, Standards Checklist.
   - Action: Calls `setSubmitted(true)`. **Data is completely lost.**

---

### 5.2 Candidate Tracker Mock Data & Broken Interactive Controls
The Candidate Application Tracker (`app/application-status/ApplicationStatusTracker.tsx`) is almost entirely hardcoded mock data:
- **Default State:** Defaults to reference `"YESS-ENG-2026-89412"` and email `"syed.candidate@example.com"`.
- **Fallback Mocking:** If an applicant visits the page without query parameters, or if the database returns empty, it renders fake candidate details for "Syed Reza" instead of an empty search prompt.
- **Fake Interactive Buttons:**
  - "Download Application PDF": `onClick={() => alert("Downloading encrypted application dossier PDF...")}`.
  - "Add to Google Calendar": `onClick={() => alert("Calendar invite exported for Sep 24, 2026 at 3:00 PM BST.")}`.
  - "Reschedule Request": `onClick={() => alert("Reschedule request forwarded to dedicated talent lead Tariq Al-Mansoor.")}`.
- **Static Artifacts:** Hardcoded panel members ("Arif Khan", "Sadia Rahman"), fake preparation checklist, fake PDF documents list, hardcoded compensation (`৳ 320,000 / mo`), and fake dossier hash.

---

### 5.3 Silent Failure Swallowing in Server Actions
Both public mutation server actions swallow database errors and report false positives to the user:
1. **`submitJobApplicationAction` (`app/actions/applications.ts:84-99`):**
   ```ts
   if (insertErr) {
     console.warn("Job application insert warning:", insertErr.message);
   }
   return { success: true, referenceNumber: generatedRef };
   ```
   If Supabase fails (e.g. storage error, database down, RLS failure), it catches the error and still returns `{ success: true, referenceNumber: "..." }`. The candidate gets a tracking code that does not exist in the database!
2. **`submitContactMessageAction` (`app/actions/contact.ts:58-66`):**
   ```ts
   if (insertErr) {
     console.warn("Supabase contact_messages insert warning:", insertErr.message);
   }
   return { success: true };
   ```
   If the contact message insertion fails, the user is still shown "Inquiry Dispatched to Executive Desk".

---

### 5.4 Severed Data Binding & Orphaned Components
1. **`HomeClient.tsx` Severed Props:**
   `app/page.tsx` executes database queries to retrieve `sitePage` and `venturesList`. It passes them to `<HomeClient sitePage={sitePage} initialVentures={venturesList} />`. However, `HomeClient` prefixes them as `_sitePage` and `_initialVentures` and never reads them! The home page displays 6 hardcoded static HTML cards and hardcoded headings. CMS updates to the home page hero have zero effect.
2. **`Header.tsx` Severed Props:**
   `app/layout.tsx` fetches `ventures` and passes them to `Header`. `Header.tsx` declares `ventures: _ventures` and hardcodes `FEATURED_VENTURES` with 7 hardcoded items.
3. **Orphaned Component `HomeVenturesFilter.tsx`:**
   `components/home/HomeVenturesFilter.tsx` is completely unused. It was created to filter ventures on the home page but was abandoned when the home page cards were hardcoded.

---

### 5.5 Severe Schema & Slug Mismatches Across Layers
There is a massive discrepancy between database slugs and the hardcoded identifiers in the UI components:

| Database / Seed Slug (`cms_ventures`) | UI Directory Component Slug (`components/VenturesDirectory.tsx`) | Impact |
|--------------------------------------|-------------------------------------------------------------------|--------|
| `yess-service` | `yess-service` (title: Shondhaan) | Works |
| `yess-host` | `yess-technology` | ❌ Valuation is 0; metrics missing; icon broken |
| `the-daily-akash` | `akash-news` | ❌ Valuation is 0; metrics missing; icon broken |
| `yess-legal-advice` | `yess-law-chamber` | ❌ Valuation is 0; metrics missing; icon broken |
| `yess-organic-haat` | `yess-organic-food` | ❌ Valuation is 0; metrics missing; icon broken |
| `yess-all-in-one-solution` | `yess-one-stop-engineering` | ❌ Valuation is 0; metrics missing; icon broken |
| `yess-event` | `yess-entertainment` & `yess-event-management` | ❌ Slugs split into nonexistent entities |
| `yess-tourism` | `yess-overseas` | ❌ Valuation is 0; metrics missing; icon broken |

The same issue exists in `app/industries/[slug]/page.tsx` where `industryBgMap` maps to non-existent slugs (`manufacturing-rmg`, `ecommerce-retail`, `financial-services`, `healthcare-pharma`), causing background hero images to fail on those pages.

---

### 5.6 Next.js 16 App Router & Supabase RSC Violations
1. **Browser Client Imported in Server Components:**
   `app/admin/pages/[page]/page.tsx`, `app/admin/cms/[type]/page.tsx`, and `app/admin/cms/[type]/[id]/page.tsx` are async React Server Components, but they import:
   ```ts
   import { supabase } from "@/lib/supabase/client";
   ```
   In Next.js App Router, `@/lib/supabase/client` creates a browser client without access to incoming request cookies. Therefore, requests sent to Supabase are treated as anonymous (`auth.uid() = null`). As a result, RLS policies prevent administrators from loading draft items or uncommitted edits. Server components MUST use `createClient()` from `@/lib/supabase/server`.
2. **Cache Purge Directive:**
   In `app/admin/actions.ts`:
   ```ts
   const purgeTag = (tag: string) => (revalidateTag as any)(tag);
   ```
   Next.js 16 introduces `updateTag(tag)` for instant cache mutation and `revalidateTag(tag, profile)`. Casting `revalidateTag as any` circumvents Next.js 16 type checking.

---

### 5.7 Dangerous DOM Mutation via AutoTranslator
`components/AutoTranslator.tsx` implements a custom bilingual translation mechanism:
- It creates a browser `TreeWalker` on `#main-content`, finds raw DOM text nodes, and executes:
  ```ts
  currentNode.nodeValue = text.replace(trimmed, TRANSLATION_MAP[trimmed]);
  ```
- **Architectural Risk:** Mutating raw DOM text nodes outside of React breaks React 19 virtual DOM reconciliation. If a component re-renders while text nodes are mutated, React will throw hydration or DOM mismatch errors, or overwrite the translations with stale English text. Bilingual rendering should be managed cleanly within React component state or dictionary hooks (`useLanguage().t(...)`).

---

### 5.8 Security Vulnerabilities & Hardcoded Credentials
1. **Committed Admin Password in Git:**
   In `scripts/seed-supabase.ts:22`, `scripts/verify-e2e.ts:41`, and `scripts/browser-automation-test.ts:103`:
   ```ts
   password: "Admin@YessBgd2026!",
   ```
   The administrator credentials for `admin@yessbgd.com` are hardcoded in source code committed to the repository.
2. **Public Write Access to Storage:**
   The storage policy `allow public insert to cms-media` allows anonymous users to upload arbitrary files to the `cms-media` bucket.

---

### 5.9 Code Quality & Linting Failures (159 Errors)
Running `npm run lint` fails with **339 problems (159 errors, 180 warnings)**.
- Primary causes:
  - Excessive use of `any` types (`@typescript-eslint/no-explicit-any`) across `lib/cms.ts`, `app/HomeClient.tsx`, and `components/NewsletterSubscription.tsx`.
  - Unused variables and imports (`@typescript-eslint/no-unused-vars`).
  - Missing type definitions for CMS extra payload structures.

---

## 6. Prioritized Remediation Roadmap

To elevate `nextjs_yessbgd` to production-grade quality, the following remediation steps are recommended:

### Phase 1: Security & Credentials Remediation (Immediate)
1. **Rotate Admin Password:** Immediately change the password for `admin@yessbgd.com` in Supabase Auth.
2. **Clean Repository Secrets:** Remove hardcoded credentials from `scripts/seed-supabase.ts` and `scripts/verify-e2e.ts`, loading them exclusively from `process.env.ADMIN_PASSWORD`.
3. **Lock Down Storage RLS:** Revoke `allow public insert to cms-media` policy so only authenticated admins can upload media. Grant `UPDATE` permission to `anyone upload resume` on the `resumes` bucket so `upsert: true` operates cleanly.

### Phase 2: Connect Severed Forms & Remove Fake Logic
1. **Implement Unified Consultation Server Action:**
   - Create a unified `submitInquiryAction` in `app/actions/contact.ts` that writes to `contact_messages`.
   - Connect the 4 disconnected forms (`LeadershipClient`, `AwardsClient`, `MethodologyClient`, `StandardsClient`) to this action with loading spinners and verified error handling.
2. **De-Mock the Candidate Application Tracker:**
   - On `/application-status`, display a clean empty search prompt when no query parameters are provided instead of showing a fake applicant.
   - Connect the action buttons ("Download Application PDF", "Add to Calendar") to real dynamic calendar `.ics` generators and PDF streams, or remove the buttons if unsupported.
3. **Fix Silent Error Swallowing in Actions:**
   - Return `{ success: false, error: err.message }` when Supabase database inserts fail in `submitJobApplicationAction` and `submitContactMessageAction`.

### Phase 3: Unify Slugs & Reconnect Data Binding
1. **Harmonize Venture Slugs:**
   - Align `components/VenturesDirectory.tsx` with the 13 canonical slugs from `cms_ventures` (`yess-service`, `akash-tv`, `akash-ott`, `yess-host`, `yess-soft`, `the-daily-akash`, `yess-legal-advice`, `yess-organic-haat`, `yess-event`, `yess-model`, `yess-food`, `yess-tourism`, `yess-all-in-one-solution`).
   - Align valuations, metrics, and icons with these exact 13 keys.
2. **Fix Industry Hero Background Slugs:**
   - Update `industryBgMap` in `app/industries/[slug]/page.tsx` to match the actual database slugs.
3. **Reconnect Home Page CMS Data:**
   - Refactor `app/HomeClient.tsx` to read `sitePage` for hero copy and render dynamic brand cards from `initialVentures`. Delete or integrate `HomeVenturesFilter.tsx`.

### Phase 4: App Router & React Clean-up
1. **Replace Browser Supabase Client in Server Components:**
   - Update `app/admin/pages/[page]/page.tsx`, `app/admin/cms/[type]/page.tsx`, and `app/admin/cms/[type]/[id]/page.tsx` to use `createClient()` from `@/lib/supabase/server`.
2. **Refactor AutoTranslator to React Context:**
   - Eliminate direct DOM `nodeValue` mutation in `components/AutoTranslator.tsx` in favor of declarative dictionary lookups (`useLanguage().t(...)`).
3. **Implement Media Deletion & ATS Stage Synchronization:**
   - Add a `deleteMediaAction` to `app/admin/actions.ts` and add delete buttons to `app/admin/media/page.tsx`.
   - Normalize candidate status values to lowercase (`submitted`, `screening`, `interview`, `offered`, `hired`, `rejected`) across all database checks, actions, and UI filters.
4. **Resolve TypeScript & ESLint Errors:**
   - Replace explicit `any` with typed schemas (`CmsSitePage`, `Venture`, `ServiceItem`, `Opening`) to achieve clean `npm run lint` execution.
