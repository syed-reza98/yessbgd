# Yess Bangladesh - Next.js Enterprise Portal & Dynamic CMS

A Next.js 16 (App Router) enterprise web application with dynamic Supabase-driven CMS, RBAC administration dashboard, job application pipeline, and public interactive portals.

---

## 🔐 Administrative Access & Credentials

The Admin Dashboard provides full content management across all ventures, initiatives, leadership, impact metrics, team members, contact submissions, and job applications.

- **Admin URL:** [`/admin`](http://localhost:3000/admin) (or [`/admin/login`](http://localhost:3000/admin/login))
- **Email:** `admin@yessbgd.com`
- **Password:** `Admin@YessBgd2026!`
- **Role:** `admin` (Provisioned in `public.user_roles` with Supabase PostgreSQL RLS enforcement)

> **Security Note:** In production, change this password immediately via Supabase Auth or the Admin User Settings panel. Login credentials are strictly removed from client-side public views and are protected by multi-layer authentication guards.

---

## 🏗️ Architecture & Security Model

The application enforces a **4-Layer Defense-in-Depth** model for all administrative routes (`/admin/*`):

1. **Network Edge Layer (`middleware.ts` / `proxy.ts`)**:
   - Re-exports standard Next.js edge proxy handler (`lib/supabase/proxy.ts`).
   - Intercepts requests to `/admin/*` (except `/admin/login`).
   - Automatically refreshes Supabase auth cookies and redirects unauthenticated requests immediately to `/admin/login` before page rendering begins.

2. **Server Component Guard (`app/admin/layout.tsx`)**:
   - Executes server-side `createClient()` with read-only cookies.
   - Calls `supabase.auth.getUser()` to cryptographically validate the JWT against Supabase Auth servers.
   - Queries `public.user_roles` for `role === 'admin'`. Unauthenticated or non-admin users are instantly redirected via Next.js `redirect('/admin/login')`.

3. **Client Session Sync (`app/admin/AdminLayoutClient.tsx`)**:
   - Subscribes to Supabase `onAuthStateChange`.
   - Listens for session terminations, token expirations, or signed-out states and kicks the browser back to `/admin/login`.

4. **Database-Level Row Level Security (RLS)**:
   - All 14 Supabase CMS tables have PostgreSQL RLS enabled.
   - Enforced by security-definer helper `has_role(auth.uid(), 'admin'::app_role)` with `(select auth.uid())` subquery optimization.
   - Public users can only read published content (`is_published = true`) or insert public submissions (e.g., job applications, contact messages). Full mutations (`INSERT`, `UPDATE`, `DELETE`) require the `admin` role.

---

## 🎨 Layout Isolation (`components/PublicChrome.tsx`)

To ensure the Admin Dashboard has an isolated visual workspace:
- **`components/PublicChrome.tsx`** wraps the root application layout.
- When `pathname.startsWith('/admin')`, the public navigation bar (`Header`), mobile tab bar (`MobileTabBar`), and public `Footer` are conditionally stripped from the DOM.
- The Admin Dashboard renders within [`components/admin/AdminShell.tsx`](components/admin/AdminShell.tsx) with its dedicated sidebar, top navigation, search, and system status widgets.

---

## 🗄️ Supabase Database Schema

The database runs on Supabase PostgreSQL with 14 relational tables:

| Table | Description | Access Policy |
| :--- | :--- | :--- |
| `cms_pages` | Static & dynamic page content blocks | Public Read / Admin Manage |
| `cms_menu_items` | Hierarchical navigation menus | Public Read / Admin Manage |
| `cms_ventures` | Strategic business ventures & subsidiaries | Public Read / Admin Manage |
| `cms_initiatives` | Social impact programs & initiatives | Public Read / Admin Manage |
| `cms_impact_metrics` | Live counter statistics & metrics | Public Read / Admin Manage |
| `cms_leaders` | Executive team & board leadership | Public Read / Admin Manage |
| `cms_team_members` | Organization staff & department directory | Public Read / Admin Manage |
| `cms_stories` | News articles, updates & blog posts | Public Read / Admin Manage |
| `cms_faq_items` | Searchable FAQs & categories | Public Read / Admin Manage |
| `cms_offices` | Office locations & geo-coordinates | Public Read / Admin Manage |
| `cms_partners` | Partners & institutional collaborators | Public Read / Admin Manage |
| `cms_job_openings` | Career opportunities & role specifications | Public Read / Admin Manage |
| `job_applications` | Resumes, CV links & candidate submissions | Public Insert & Lookup / Admin Full |
| `contact_messages` | Inbound inquiries & contact form leads | Public Insert / Admin Full |
| `user_roles` | RBAC role registry (`admin`, `moderator`, `user`) | Admin Manage Only |

---

## 🚀 Getting Started

### 1. Environment Setup

Ensure your `.env.local` contains the Supabase project configuration:

```env
NEXT_PUBLIC_SUPABASE_URL=https://vhffmxoqirbczmcpoqtx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOi...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOi...
```

### 2. Install & Run

```bash
npm install
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) for the public landing portal, or [http://localhost:3000/admin](http://localhost:3000/admin) for the Admin Dashboard.

### 3. Verification & Testing

To run the automated end-to-end database, authentication, and API verification script:

```bash
npx tsx scripts/verify-e2e.ts
```

To run a production build audit:

```bash
npm run build
```
