import puppeteer from "puppeteer-core";
import fs from "fs";
import path from "path";
import { spawn, ChildProcess } from "child_process";

const CHROME_PATH = "/home/syed/.agent-browser/browsers/chrome-154.0.8037.57/chrome";
const PORT = 3000;
const BASE_URL = `http://localhost:${PORT}`;
const SCREENSHOT_DIR = path.resolve(__dirname, "../public/test-evidence");

async function wait(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function isServerUp(): Promise<boolean> {
  try {
    const res = await fetch(`${BASE_URL}/`);
    return res.status === 200;
  } catch {
    return false;
  }
}

async function main() {
  if (!fs.existsSync(SCREENSHOT_DIR)) {
    fs.mkdirSync(SCREENSHOT_DIR, { recursive: true });
  }

  let serverProcess: ChildProcess | null = null;
  const alreadyUp = await isServerUp();

  if (!alreadyUp) {
    console.log("Starting Next.js production server on port", PORT);
    serverProcess = spawn("npx", ["next", "start", "-p", String(PORT)], {
      cwd: path.resolve(__dirname, ".."),
      stdio: "pipe",
    });

    let attempts = 0;
    while (attempts < 20) {
      await wait(1000);
      if (await isServerUp()) {
        console.log("Server is up and responding!");
        break;
      }
      attempts++;
    }
  } else {
    console.log("Server already running on port", PORT);
  }

  console.log("Launching Puppeteer...");
  const browser = await puppeteer.launch({
    executablePath: CHROME_PATH,
    headless: true,
    args: [
      "--no-sandbox",
      "--disable-setuid-sandbox",
      "--disable-dev-shm-usage",
      "--disable-gpu",
      "--window-size=1200,900",
    ],
  });

  try {
    const page = await browser.newPage();

    // 1. Desktop Full Page
    console.log("Navigating to desktop homepage...");
    await page.setViewport({ width: 1200, height: 900 });
    await page.goto(`${BASE_URL}/`, { waitUntil: "networkidle2" });
    await wait(1000); // let floating card animations & counters settle

    const desktopPath = path.join(SCREENSHOT_DIR, "desktop-home-redesign.png");
    await page.screenshot({ path: desktopPath, fullPage: true });
    console.log("✅ Desktop fullpage screenshot saved to:", desktopPath);

    // 2. Mobile Full Page
    console.log("Navigating to mobile homepage...");
    await page.setViewport({ width: 400, height: 850, isMobile: true });
    await page.reload({ waitUntil: "networkidle2" });
    await wait(1000);

    const mobilePath = path.join(SCREENSHOT_DIR, "mobile-home-redesign.png");
    await page.screenshot({ path: mobilePath, fullPage: true });
    console.log("✅ Mobile fullpage screenshot saved to:", mobilePath);
  } finally {
    await browser.close();
    if (serverProcess) {
      serverProcess.kill();
      console.log("Next.js server process terminated.");
    }
  }
}

main().catch((err) => {
  console.error("Error running screenshot verification:", err);
  process.exit(1);
});
