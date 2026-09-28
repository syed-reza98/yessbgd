#!/usr/bin/env node

/**
 * Automated cPanel Cloud Hosting Packaging Script
 * Prepares an optimized Next.js standalone distribution ready for cPanel upload.
 *
 * Steps performed:
 * 1. Runs `next build` with standalone output
 * 2. Assembles self-contained `dist-cpanel` bundle
 * 3. Copies required `public/` and `.next/static/` assets
 * 4. Adds `.htaccess`, `server.js`, and `ecosystem.config.cjs`
 * 5. Compresses into `deploy-cpanel.zip` and `deploy-cpanel.tar.gz`
 */

import fs from "node:fs";
import path from "node:path";
import { execSync } from "node:child_process";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, "..");
const distDir = path.join(rootDir, "dist-cpanel");
const standaloneDir = path.join(rootDir, ".next", "standalone");

console.log("=================================================");
console.log("  YESS Bangla Next.js - cPanel Packaging Tool    ");
console.log("=================================================\n");

function runCommand(cmd, cwd = rootDir) {
  console.log(`> ${cmd}`);
  execSync(cmd, { stdio: "inherit", cwd });
}

function copyRecursive(src, dest) {
  if (!fs.existsSync(src)) return;
  const stat = fs.statSync(src);
  if (stat.isDirectory()) {
    fs.mkdirSync(dest, { recursive: true });
    for (const file of fs.readdirSync(src)) {
      copyRecursive(path.join(src, file), path.join(dest, file));
    }
  } else {
    fs.mkdirSync(path.dirname(dest), { recursive: true });
    fs.copyFileSync(src, dest);
  }
}

// 1. Check/Run Build
console.log("[1/5] Building Next.js application with standalone target...");
runCommand("npm run build");

if (!fs.existsSync(standaloneDir)) {
  console.error("❌ Error: .next/standalone was not generated! Verify next.config.ts has output: 'standalone'.");
  process.exit(1);
}

// 2. Prepare dist-cpanel directory
console.log("\n[2/5] Preparing clean distribution directory...");
if (fs.existsSync(distDir)) {
  fs.rmSync(distDir, { recursive: true, force: true });
}
fs.mkdirSync(distDir, { recursive: true });

// 3. Copy standalone files
console.log("[3/5] Copying standalone runtime & node_modules...");
copyRecursive(standaloneDir, distDir);

// 4. Copy static assets and configurations
console.log("[4/5] Copying static assets & cPanel server configuration...");
const publicDir = path.join(rootDir, "public");
if (fs.existsSync(publicDir)) {
  copyRecursive(publicDir, path.join(distDir, "public"));
}

const staticDir = path.join(rootDir, ".next", "static");
if (fs.existsSync(staticDir)) {
  copyRecursive(staticDir, path.join(distDir, ".next", "static"));
}

// Copy .htaccess
const htaccessPath = path.join(rootDir, ".htaccess");
if (fs.existsSync(htaccessPath)) {
  fs.copyFileSync(htaccessPath, path.join(distDir, ".htaccess"));
}

// Copy ecosystem.config.cjs
const ecosystemPath = path.join(rootDir, "ecosystem.config.cjs");
if (fs.existsSync(ecosystemPath)) {
  fs.copyFileSync(ecosystemPath, path.join(distDir, "ecosystem.config.cjs"));
}

// Copy .env.example as .env.example and .env.production.sample
const envExamplePath = path.join(rootDir, ".env.example");
if (fs.existsSync(envExamplePath)) {
  fs.copyFileSync(envExamplePath, path.join(distDir, ".env.example"));
  fs.copyFileSync(envExamplePath, path.join(distDir, ".env.production.sample"));
}

// Ensure dist-cpanel/server.js exists and is cPanel ready
const distServerJs = path.join(distDir, "server.js");
if (!fs.existsSync(distServerJs)) {
  const rootServerJs = path.join(rootDir, "server.js");
  if (fs.existsSync(rootServerJs)) {
    fs.copyFileSync(rootServerJs, distServerJs);
  }
}

// 5. Create deployment archives
console.log("\n[5/5] Creating deployment archives for cPanel upload...");
const zipFile = path.join(rootDir, "deploy-cpanel.zip");
const tarFile = path.join(rootDir, "deploy-cpanel.tar.gz");

if (fs.existsSync(zipFile)) fs.unlinkSync(zipFile);
if (fs.existsSync(tarFile)) fs.unlinkSync(tarFile);

try {
  runCommand(`python3 -c "import shutil; shutil.make_archive('deploy-cpanel', 'zip', 'dist-cpanel')"`, rootDir);
  console.log("✓ Created deploy-cpanel.zip");
} catch (err) {
  console.warn("Notice: zip creation encountered error:", err.message);
}

try {
  runCommand(`tar -czf deploy-cpanel.tar.gz -C dist-cpanel .`, rootDir);
  console.log("✓ Created deploy-cpanel.tar.gz");
} catch (err) {
  console.warn("Notice: tar packaging encountered error:", err.message);
}

// Calculate sizes
const getFileSize = (filePath) => {
  if (!fs.existsSync(filePath)) return "N/A";
  const bytes = fs.statSync(filePath).size;
  return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
};

console.log("\n=================================================");
console.log("  Packaging Complete!");
console.log("=================================================");
if (fs.existsSync(zipFile)) {
  console.log(`📦 ZIP Archive:    deploy-cpanel.zip (${getFileSize(zipFile)})`);
}
if (fs.existsSync(tarFile)) {
  console.log(`📦 TAR.GZ Archive: deploy-cpanel.tar.gz (${getFileSize(tarFile)})`);
}
console.log(`📁 Unpacked Dist:  dist-cpanel/`);
console.log("=================================================");
console.log("\nDeployment instructions available in CPANEL_DEPLOYMENT_GUIDE.md\n");
