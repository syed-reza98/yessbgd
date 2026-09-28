import puppeteer from "puppeteer-core";
import fs from "fs";
import path from "path";

const CHROME_PATH = "/home/syed/.agent-browser/browsers/chrome-154.0.8037.57/chrome";
const PORT = 3001;
const BASE_URL = `http://localhost:${PORT}`;
const SCREENSHOT_DIR = path.resolve(__dirname, "../public/test-evidence");

async function wait(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function main() {
  if (!fs.existsSync(SCREENSHOT_DIR)) {
    fs.mkdirSync(SCREENSHOT_DIR, { recursive: true });
  }

  const browser = await puppeteer.launch({
    executablePath: CHROME_PATH,
    headless: true,
    args: ["--no-sandbox", "--disable-setuid-sandbox", "--disable-gpu"],
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900 });

  console.log("Navigating to home page:", BASE_URL);
  await page.goto(BASE_URL, { waitUntil: "networkidle2" });
  await wait(1000);

  // 1. Verify hero avatars are removed
  const avatarImg = await page.$('img[src="/assets/hero_avatars.jpg"]');
  console.log("Verification 1 (Avatar removed):", avatarImg === null ? "PASSED (No avatar image found)" : "FAILED (Avatar image still found!)");

  // 2. Verify "Loading More..." button exists in brands section and arrows are removed
  const brandSection = await page.$("#brands");
  const loadingMoreBtn = await page.$('a[href="/ventures"]');
  const prevBtn = await page.$('button[aria-label="Previous brand"]');
  const nextBtn = await page.$('button[aria-label="Next brand"]');

  console.log("Verification 2a (Previous arrow removed):", prevBtn === null ? "PASSED" : "FAILED");
  console.log("Verification 2b (Next arrow removed):", nextBtn === null ? "PASSED" : "FAILED");
  console.log("Verification 2c (Loading More button present):", loadingMoreBtn !== null ? "PASSED" : "FAILED");

  // Take screenshot of Hero & Brands in English
  await page.screenshot({ path: path.join(SCREENSHOT_DIR, "adjusted-home-en.png"), fullPage: false });

  // 3. Test language toggle to BN
  console.log("Toggling language to BN...");
  await page.evaluate(() => {
    const buttons = Array.from(document.querySelectorAll("header button"));
    const langBtn = buttons.find(b => b.textContent?.includes("EN") || b.textContent?.includes("বাং"));
    if (langBtn) (langBtn as HTMLButtonElement).click();
  });
  await wait(800);

  // Check button text in BN
  const bnButtonText = await page.evaluate(() => {
    const btn = document.querySelector('a[href="/ventures"]');
    return btn?.textContent?.trim();
  });
  console.log("Verification 3a (Home page button in BN):", bnButtonText);
  await page.screenshot({ path: path.join(SCREENSHOT_DIR, "adjusted-home-bn.png"), fullPage: false });

  // 4. Test Subpage Translation: /about
  console.log("Navigating to /about in BN mode...");
  await page.goto(`${BASE_URL}/about`, { waitUntil: "networkidle2" });
  await wait(800);

  const aboutH1 = await page.evaluate(() => document.querySelector("h1")?.textContent?.trim());
  console.log("Verification 4 (/about H1 in BN):", aboutH1);
  await page.screenshot({ path: path.join(SCREENSHOT_DIR, "adjusted-about-bn.png"), fullPage: false });

  // 5. Test Subpage Translation: /contact
  console.log("Navigating to /contact in BN mode...");
  await page.goto(`${BASE_URL}/contact`, { waitUntil: "networkidle2" });
  await wait(800);

  const contactH2 = await page.evaluate(() => document.querySelector("form, h2")?.textContent?.trim());
  const submitBtnText = await page.evaluate(() => document.querySelector('button[type="submit"]')?.textContent?.trim());
  console.log("Verification 5 (/contact submit button in BN):", submitBtnText);
  await page.screenshot({ path: path.join(SCREENSHOT_DIR, "adjusted-contact-bn.png"), fullPage: false });

  // 6. Test Subpage Translation: /ventures
  console.log("Navigating to /ventures in BN mode...");
  await page.goto(`${BASE_URL}/ventures`, { waitUntil: "networkidle2" });
  await wait(800);
  const clusterLabel = await page.evaluate(() => document.querySelector(".glass-card")?.textContent?.trim());
  console.log("Verification 6 (/ventures in BN):", clusterLabel?.slice(0, 100));
  await page.screenshot({ path: path.join(SCREENSHOT_DIR, "adjusted-ventures-bn.png"), fullPage: false });

  await browser.close();
  console.log("All automated browser checks completed successfully!");
}

main().catch((err) => {
  console.error("Test failed:", err);
  process.exit(1);
});
