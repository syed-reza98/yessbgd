# Deploying YESS Bangla Next.js to cPanel Cloud Hosting (PostgreSQL + Auth.js + Local Uploads)

This comprehensive guide details how to deploy this Next.js 16 application to your cPanel hosting environment using **Option B: Full Migration to cPanel (cPanel Node.js + cPanel PostgreSQL + Local Uploads)**.

---

## Architecture Overview

- **Database**: cPanel PostgreSQL (`yessban1_yessbd`) managed with **Drizzle ORM** (zero external cloud dependencies).
- **Authentication**: **Auth.js (NextAuth v5)** with local database users table & bcrypt hashed credentials.
- **File Storage**: Local filesystem:
  - Public CMS Media: `public/uploads/media/`
  - Protected Job Resumes: `storage/resumes/` (served via authenticated streaming route `/api/admin/resumes/[id]`).
- **Next.js Standalone Runtime**: Lightweight distribution (`output: "standalone"`) bypassing heavy server build dependencies on cPanel.

---

## Step-by-Step Deployment Guide

### Step 1: Package the Project Locally

Run the automated packager on your local machine:

```bash
npm run package:cpanel
```

This script:
1. Runs `npm run build` with standalone bundling.
2. Assembles `dist-cpanel/` with `server.js`, standalone runtime, static assets, upload folders, and `cpanel-database-setup.sql`.
3. Creates **`deploy-cpanel.zip`** ready for upload.

---

### Step 2: Import the Database into cPanel PostgreSQL

Your cPanel PostgreSQL database is already created:
- **Database**: `yessban1_yessbd`
- **Username**: `yessban1`

#### Option A: Via phpPgAdmin (Recommended UI Method)
1. In cPanel, navigate to the **Databases** section and open **phpPgAdmin**.
2. Select database **`yessban1_yessbd`** on the left menu.
3. Click the **SQL** tab at the top.
4. Open the generated file [`cpanel-database-setup.sql`](file:///home/syed/Workspace/yessbgd/nextjs_yessbgd/cpanel-database-setup.sql) in any text editor, copy its entire contents, paste it into the SQL query box, and click **Execute**.
   *(Alternatively, use the **Import** / **Upload** button to upload `cpanel-database-setup.sql`).*
5. All 16 tables, indexes, seed CMS records, and the initial Admin account are now created!

#### Option B: Via cPanel Terminal / SSH
If you have SSH or cPanel Terminal enabled:
```bash
psql -U yessban1 -d yessban1_yessbd -f cpanel-database-setup.sql
```

---

### Step 3: Upload the Application to cPanel

1. Log into your **cPanel** dashboard.
2. Open **File Manager**.
3. Create a folder in your home root (outside `public_html` for maximum security):
   ```
   /home/yessban1/yessbgd
   ```
4. Open `/home/yessban1/yessbgd` and click **Upload**.
5. Upload **`deploy-cpanel.zip`**.
6. Right-click `deploy-cpanel.zip` and select **Extract** -> **Extract Files**.
7. Delete the `.zip` file after extraction.

---

### Step 4: Configure "Setup Node.js App" in cPanel

1. In cPanel, navigate to the **Software** section and click **Setup Node.js App** (or *Node.js Selector*).
2. Click **Create Application**.
3. Configure the fields:
   - **Node.js version**: Select **20.x** (or 22.x).
   - **Application mode**: Select **Production**.
   - **Application root**: Enter `yessbgd` (the directory name where you extracted files).
   - **Application URL**: Select your domain or subdomain (e.g. `yessbangla.com` or `www.yessbangla.com`).
   - **Application startup file**: Enter `server.js`.
4. Click **Create**.

---

### Step 5: Configure Environment Variables

Under the **Environment variables** section of your Node.js application in cPanel, add the following variables:

| Variable Name | Value | Description |
| :--- | :--- | :--- |
| `NODE_ENV` | `production` | Production mode |
| `DATABASE_URL` | `postgres://yessban1:24QZdDkg4%219S%40v@127.0.0.1:5432/yessban1_yessbd` | Connection string to your local cPanel PostgreSQL |
| `AUTH_SECRET` | *(Random 32-character hex or string)* | Secret for signing Auth.js session cookies |
| `NEXTAUTH_URL` | `https://yourdomain.com` | Your canonical production domain |
| `NEXT_PUBLIC_SITE_URL` | `https://yourdomain.com` | Your public domain |

> [!NOTE]
> In the `DATABASE_URL`, special characters in passwords must be URL-encoded (`!` = `%21`, `@` = `%40`). The string above already has `24QZdDkg4!9S@v` properly encoded!

---

### Step 6: Verify Permissions for Upload Directories

Ensure that the Node.js application user has write permissions to the storage directories:
- `/home/yessban1/yessbgd/public/uploads/media/` (Permissions `755`)
- `/home/yessban1/yessbgd/storage/resumes/` (Permissions `750` or `755`)

---

### Step 7: Start / Restart the Application

1. At the top of the cPanel Node.js App manager, click **Restart** (or **Start App**).
2. Visit your domain in the browser.

---

## Admin Panel Access

- **Admin Login URL**: `https://yourdomain.com/admin/login`
- **Default Superadmin Username**: `admin@yessbgd.com`
- **Default Password**: `Admin@YessBgd2026!`

*(You can change the email and password at any time in the Admin panel under **Settings** or directly in the `users` table).*

---

## Method: Terminal / SSH + PM2 (Alternative)

If using PM2 on a VPS or SSH:

```bash
cd ~/yessbgd
pm2 start ecosystem.config.cjs
pm2 save
```

Logs can be viewed anytime with:
```bash
pm2 logs yess-nextjs
```
