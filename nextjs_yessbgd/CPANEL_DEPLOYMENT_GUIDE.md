# Deploying YESS Bangla Next.js to cPanel Cloud Hosting

This comprehensive guide details how to deploy this Next.js 16 application to any cPanel hosting environment (Shared Cloud, Reseller, CloudLinux, or cPanel VPS).

---

## Architecture Overview

This project is configured with Next.js **Standalone Output** (`output: "standalone"`).
- **Lightweight Package**: Compiles only the necessary runtime code and dependencies, bypassing the heavy ~800MB development `node_modules` (no TypeScript, Puppeteer, or PostCSS compilers needed on the server).
- **Zero Server Build Crashes**: Eliminates the common cPanel `Out of Memory / Killed` errors that occur when running `next build` on limited RAM hosting accounts.
- **Embedded Static Assets**: Bundles `public/` and `_next/static/` into the distribution so images, fonts, and CSS chunks never return 404.
- **Universal Server Runner**: Includes a cPanel-compatible `server.js` that automatically detects dynamic Passenger ports, sockets, and PM2 environments.

---

## Method 1: The Automated Package Method (Recommended)

This is the fastest, cleanest, and most reliable deployment method.

### Step 1: Package the Project Locally

Run the automated cPanel packager on your local machine:

```bash
npm run package:cpanel
```

This script:
1. Runs an optimized production build.
2. Creates a clean `dist-cpanel/` folder with `server.js`, standalone runtime, static assets, and `.htaccess`.
3. Creates a ready-to-upload archive: **`deploy-cpanel.zip`** (and `deploy-cpanel.tar.gz`).

---

### Step 2: Upload to cPanel

1. Log into your **cPanel** dashboard.
2. Open **File Manager**.
3. Create a folder in your home root (outside `public_html` for maximum security), for example:
   ```
   /home/username/yessbgd
   ```
   *(Note: Keeping application source outside `public_html` prevents sensitive files like `.env` from being accessed via web browser).*
4. Open the `/home/username/yessbgd` folder and click **Upload**.
5. Upload **`deploy-cpanel.zip`**.
6. Right-click `deploy-cpanel.zip` and select **Extract** -> **Extract Files**.
7. Delete the `.zip` file after extraction.

---

### Step 3: Configure "Setup Node.js App" in cPanel

1. In cPanel, navigate to the **Software** section and click **Setup Node.js App** (or *Node.js Selector*).
2. Click **Create Application**.
3. Fill in the configuration fields:
   - **Node.js version**: Select **20.x** (or 18.x / 22.x).
   - **Application mode**: Select **Production**.
   - **Application root**: Enter `yessbgd` (the directory name where you extracted files).
   - **Application URL**: Select your domain or subdomain (e.g., `yessbangla.com` or `www.yessbangla.com`).
   - **Application startup file**: Enter `server.js`.
4. Click **Create**.

---

### Step 4: Configure Environment Variables

Under the **Environment variables** section of your Node.js application in cPanel:

Click **Add Variable** for each required key:

| Variable Name | Value / Description |
| :--- | :--- |
| `NODE_ENV` | `production` |
| `NEXT_PUBLIC_SUPABASE_URL` | Your Supabase project URL (e.g. `https://vhffmxoqirbczmcpoqtx.supabase.co`) |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Your Supabase anonymous key |
| `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` | Your Supabase publishable key |
| `NEXT_PUBLIC_SITE_URL` | Your production website URL (e.g. `https://yessbangla.com`) |

*(Alternatively, you can create a `.env.production` file directly inside `/home/username/yessbgd` containing these variables).*

---

### Step 5: Start the Application

1. At the top of the cPanel Node.js App manager, click **Restart** (or **Start App**).
2. Visit your domain in the browser. Your Next.js application is now live!

---

## Method 2: Terminal / SSH + PM2 (For Cloud VPS & SSH Users)

If your cPanel account has Terminal access or SSH enabled, PM2 offers maximum resilience and background auto-restart:

1. Connect to your server via SSH:
   ```bash
   ssh username@your-server-ip
   ```
2. Navigate to your application directory:
   ```bash
   cd ~/yessbgd
   ```
3. Install PM2 globally (if not already installed):
   ```bash
   npm install -g pm2
   ```
4. Start the application using the included PM2 configuration:
   ```bash
   pm2 start ecosystem.config.cjs
   ```
5. Save the PM2 process list so it restarts automatically on server reboots:
   ```bash
   pm2 save
   ```
6. Check live status and logs:
   ```bash
   pm2 status
   pm2 logs yess-nextjs
   ```

---

## Method 3: Apache Reverse Proxy Setup (If Not Using Passenger)

If your cPanel host does not have CloudLinux Passenger ("Setup Node.js App"), you can run the app with PM2 on port `3000` and use Apache as a reverse proxy via `.htaccess`.

1. In your domain's `public_html` folder, edit or create `.htaccess`:
   ```apache
   <IfModule mod_rewrite.c>
       RewriteEngine On
       RewriteBase /

       # 1. Force HTTPS
       RewriteCond %{HTTPS} off
       RewriteRule ^(.*)$ https://%{HTTP_HOST}%{REQUEST_URI} [L,R=301]

       # 2. Serve static files directly if present in public_html
       RewriteCond %{REQUEST_FILENAME} -f [OR]
       RewriteCond %{REQUEST_FILENAME} -d
       RewriteRule ^ - [L]

       # 3. Reverse proxy all other requests to Next.js on port 3000
       RewriteRule ^(.*)$ http://127.0.0.1:3000/$1 [P,L]
   </IfModule>

   <IfModule mod_proxy.c>
       ProxyPreserveHost On
       ProxyPassReverse / http://127.0.0.1:3000/
       RequestHeader set X-Forwarded-Proto "https" env=HTTPS
   </IfModule>
   ```

---

## Troubleshooting FAQ

### 1. "503 Service Unavailable" or Passenger error
- **Cause**: Node.js version mismatch or application crashed on boot.
- **Solution**:
  - In cPanel "Setup Node.js App", check that the Node.js version is **20.x** or higher.
  - Review the error log located at `/home/username/yessbgd/stderr.log` or inside the cPanel File Manager.
  - Check that all Supabase environment variables are properly set.

### 2. Images or fonts return 404
- **Cause**: Static assets were omitted from the standalone distribution.
- **Solution**:
  - Always use `npm run package:cpanel`. The packager automatically copies both `public/` and `.next/static/` into the standalone bundle.

### 3. "Cannot find module 'next'" or node_modules errors
- **Cause**: Application directory was uploaded without the standalone dependencies.
- **Solution**:
  - The `dist-cpanel/` bundle already includes the pre-packaged standalone `node_modules`. Ensure you extracted the full contents of `deploy-cpanel.zip`.

### 4. Updating the Website
Whenever you push changes or update your website:
1. Run `npm run package:cpanel` locally.
2. Upload and extract `deploy-cpanel.zip` to `/home/username/yessbgd` (overwrite existing files).
3. In cPanel -> **Setup Node.js App**, click **Restart**.
