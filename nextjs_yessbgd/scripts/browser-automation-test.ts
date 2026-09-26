import puppeteer from "puppeteer-core";
import fs from "fs";
import path from "path";

const CHROME_PATH = "/home/syed/.agent-browser/browsers/chrome-154.0.8037.57/chrome";
const BASE_URL = "http://localhost:3000";
const SCREENSHOT_DIR = path.resolve(__dirname, "../public/test-evidence");

async function runBrowserAutomation() {
  console.log("=================================================");
  console.log("🚀 STARTING E2E BROWSER AUTOMATION SUITE");
  console.log("=================================================");

  if (!fs.existsSync(SCREENSHOT_DIR)) {
    fs.mkdirSync(SCREENSHOT_DIR, { recursive: true });
  }

  const browser = await puppeteer.launch({
    executablePath: CHROME_PATH,
    headless: true,
    args: [
      "--no-sandbox",
      "--disable-setuid-sandbox",
      "--disable-dev-shm-usage",
      "--disable-gpu",
      "--window-size=1440,900",
    ],
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900 });

  const testResults: { step: string; status: "PASS" | "FAIL"; details: string }[] = [];

  function record(step: string, passed: boolean, details: string) {
    testResults.push({ step, status: passed ? "PASS" : "FAIL", details });
    console.log(`[${passed ? "✅ PASS" : "❌ FAIL"}] ${step}: ${details}`);
    if (!passed) {
      throw new Error(`Assertion failed at step: ${step} - ${details}`);
    }
  }

  try {
    // -------------------------------------------------------------
    // TEST 1: Public Homepage Layout (Header & Footer Present)
    // -------------------------------------------------------------
    console.log("\n--- TEST 1: Public Homepage Layout ---");
    await page.goto(`${BASE_URL}/`, { waitUntil: "networkidle2" });
    await page.screenshot({ path: path.join(SCREENSHOT_DIR, "01-public-homepage.png"), fullPage: false });

    const publicHeader = await page.$("[data-public-header='true']");
    const publicFooter = await page.$("[data-public-footer='true']");
    record(
      "1. Public Homepage Chrome",
      publicHeader !== null && publicFooter !== null,
      `Public Header found: ${publicHeader !== null}, Public Footer found: ${publicFooter !== null}`
    );

    // -------------------------------------------------------------
    // TEST 2: Route Protection - Unauthenticated /admin Redirect
    // -------------------------------------------------------------
    console.log("\n--- TEST 2: Route Protection (Unauthenticated Guard) ---");
    await page.goto(`${BASE_URL}/admin`, { waitUntil: "networkidle2" });
    const currentUrl = page.url();
    record(
      "2. Route Guard Redirect",
      currentUrl.includes("/admin/login"),
      `Navigating to /admin redirected to: ${currentUrl}`
    );

    // -------------------------------------------------------------
    // TEST 3: Login Page Cleanliness & Layout Isolation
    // -------------------------------------------------------------
    console.log("\n--- TEST 3: Login Page Cleanliness & Isolation ---");
    await page.screenshot({ path: path.join(SCREENSHOT_DIR, "02-admin-login-page.png") });

    // Verify no pre-filled credentials in DOM or input values
    const emailInputValue = await page.$eval('input[type="email"]', (el) => (el as HTMLInputElement).value);
    const passwordInputValue = await page.$eval('input[type="password"]', (el) => (el as HTMLInputElement).value);
    const pageHtml = await page.content();
    const hasVisibleCredsCard = pageHtml.includes("Default Provisioned Credentials");

    record(
      "3a. No Credentials Leaked / Pre-filled",
      emailInputValue === "" && passwordInputValue === "" && !hasVisibleCredsCard,
      `Email val: "${emailInputValue}", Pass val: "${passwordInputValue}", Creds card present: ${hasVisibleCredsCard}`
    );

    // Verify public header & footer are NOT present on login page
    const loginHeader = await page.$("[data-public-header='true']");
    const loginFooter = await page.$("[data-public-footer='true']");
    record(
      "3b. Login Page Isolation (No Public Chrome)",
      loginHeader === null && loginFooter === null,
      `Public Header on login: ${loginHeader !== null}, Public Footer on login: ${loginFooter !== null}`
    );

    // -------------------------------------------------------------
    // TEST 4: Interactive Admin Login Flow
    // -------------------------------------------------------------
    console.log("\n--- TEST 4: Interactive Admin Authentication Flow ---");
    await page.type('input[type="email"]', "admin@yessbgd.com", { delay: 20 });
    await page.type('input[type="password"]', "Admin@YessBgd2026!", { delay: 20 });

    const submitBtn = await page.$('button[type="submit"]');
    if (!submitBtn) throw new Error("Login submit button not found");

    // Click submit and wait for navigation
    await Promise.all([
      page.waitForNavigation({ waitUntil: "networkidle2", timeout: 15000 }),
      submitBtn.click(),
    ]);

    await page.waitForSelector("aside", { timeout: 10000 });
    const postLoginUrl = page.url();
    await page.screenshot({ path: path.join(SCREENSHOT_DIR, "03-admin-dashboard.png") });

    record(
      "4. Admin Dashboard Access Post-Login",
      postLoginUrl.endsWith("/admin") || postLoginUrl.includes("/admin"),
      `Authenticated URL: ${postLoginUrl}`
    );

    // -------------------------------------------------------------
    // TEST 5: Admin Dashboard Layout Isolation (No Public Header/Footer)
    // -------------------------------------------------------------
    console.log("\n--- TEST 5: Admin Dashboard Layout Isolation ---");
    const adminPublicHeader = await page.$("[data-public-header='true']");
    const adminPublicFooter = await page.$("[data-public-footer='true']");
    const adminSidebar = await page.$("aside");
    const adminHtml = await page.content();
    const hasAdminBrand = adminHtml.includes("Executive Admin Console") || adminHtml.includes("YESS Console");

    record(
      "5. Admin Dashboard Isolation (No Public Chrome, AdminShell Active)",
      adminPublicHeader === null && adminPublicFooter === null && adminSidebar !== null && hasAdminBrand,
      `Public Header: ${adminPublicHeader !== null}, Public Footer: ${adminPublicFooter !== null}, Sidebar: ${adminSidebar !== null}`
    );

    // -------------------------------------------------------------
    // TEST 6: Admin Sub-Pages Navigation & Data Rendering
    // -------------------------------------------------------------
    console.log("\n--- TEST 6: Admin Sub-Pages Navigation & Data Rendering ---");

    const subPages = [
      { path: "/admin/pages", name: "Page Manager", marker: "Site Pages" },
      { path: "/admin/cms/ventures", name: "Ventures CMS", marker: "Ventures" },
      { path: "/admin/applications", name: "Job Applications", marker: "Applications" },
      { path: "/admin/messages", name: "Contact Messages", marker: "Messages" },
      { path: "/admin/settings", name: "Site Settings", marker: "Settings" },
    ];

    for (const sp of subPages) {
      await page.goto(`${BASE_URL}${sp.path}`, { waitUntil: "networkidle2" });
      const spPublicHeader = await page.$("[data-public-header='true']");
      const spPublicFooter = await page.$("[data-public-footer='true']");
      const content = await page.content();
      const hasMarker = content.toLowerCase().includes(sp.marker.toLowerCase());

      record(
        `6. Sub-Page: ${sp.name}`,
        spPublicHeader === null && spPublicFooter === null && hasMarker,
        `No Public Chrome: ${spPublicHeader === null && spPublicFooter === null}, Marker "${sp.marker}": ${hasMarker}`
      );
    }

    console.log("\n=================================================");
    console.log("🎉 ALL BROWSER AUTOMATION TESTS PASSED (6/6)");
    console.log("=================================================");
  } catch (error) {
    console.error("\n❌ Browser automation error:", error);
    process.exit(1);
  } finally {
    await browser.close();
  }
}

runBrowserAutomation();
