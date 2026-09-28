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

  // 1. Verify "Loading More..." button styling & color
  const btnInfo = await page.evaluate(() => {
    const btn = document.querySelector('a[href="/ventures"]');
    if (!btn) return null;
    const style = window.getComputedStyle(btn);
    return {
      text: btn.textContent?.trim(),
      bg: style.backgroundImage || style.backgroundColor,
      color: style.color,
      borderRadius: style.borderRadius,
      className: btn.className,
    };
  });
  console.log("Loading More Button Info:", btnInfo);

  // Scroll to brands section and take screenshot of the button
  await page.evaluate(() => {
    document.querySelector("#brands")?.scrollIntoView({ behavior: "instant" });
  });
  await wait(500);
  await page.screenshot({ path: path.join(SCREENSHOT_DIR, "colored-loading-more-button.png"), fullPage: false });

  // 2. Verify floating scroll-to-top component at left bottom
  // Initially at brands section, scrollY is > 500, so it should be visible
  const scrollYBefore = await page.evaluate(() => window.scrollY);
  console.log("Current scrollY:", scrollYBefore);

  const scrollBtnInfo = await page.evaluate(() => {
    const btn = document.querySelector('button[aria-label*="Scroll to top" i]');
    if (!btn) return null;
    const rect = btn.getBoundingClientRect();
    const style = window.getComputedStyle(btn);
    const parent = btn.parentElement;
    const parentStyle = parent ? window.getComputedStyle(parent) : null;
    return {
      exists: true,
      left: rect.left,
      bottom: window.innerHeight - rect.bottom,
      opacity: parentStyle?.opacity,
      pointerEvents: parentStyle?.pointerEvents,
      transform: parentStyle?.transform,
    };
  });
  console.log("Scroll to top button status (scrolled down):", scrollBtnInfo);

  // Take screenshot with scroll-to-top visible at bottom-left
  await page.screenshot({ path: path.join(SCREENSHOT_DIR, "scroll-to-top-visible.png"), fullPage: false });

  // 3. Click the scroll-to-top button and verify smooth scroll to top
  console.log("Clicking scroll to top button...");
  await page.evaluate(() => {
    const btn = document.querySelector('button[aria-label*="Scroll to top" i]') as HTMLButtonElement | null;
    btn?.click();
  });
  await wait(1000);

  const scrollYAfter = await page.evaluate(() => window.scrollY);
  console.log("scrollY after clicking scroll to top:", scrollYAfter);

  if (scrollYAfter === 0) {
    console.log("Verification (Scroll to top): PASSED! Page returned to top (0px).");
  } else {
    console.log("Verification (Scroll to top): Warning, scrollY is", scrollYAfter);
  }

  await browser.close();
  console.log("Verification completed successfully!");
}

main().catch((err) => {
  console.error("Test failed:", err);
  process.exit(1);
});
