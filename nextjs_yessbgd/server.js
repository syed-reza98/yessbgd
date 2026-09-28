/**
 * Root Server Entry Point for cPanel / Cloud Hosting
 * Compatible with:
 * - cPanel "Setup Node.js App" (Phusion Passenger / CloudLinux)
 * - PM2 / Systemd process managers
 * - Direct Node execution (`node server.js`)
 */

const { createServer } = require("http");
const { parse } = require("url");
const path = require("path");
const fs = require("fs");

process.env.NODE_ENV = "production";

// Parse port: Handles numeric ports and cPanel/Passenger socket paths
const rawPort = process.env.PORT;
const port = rawPort && !isNaN(Number(rawPort)) ? parseInt(rawPort, 10) : (rawPort || 3000);
const hostname = process.env.HOSTNAME || "0.0.0.0";

// Check if running in a standalone deployment directory
const isStandaloneDeploy =
  fs.existsSync(path.join(__dirname, ".next", "required-server-files.json")) &&
  fs.existsSync(path.join(__dirname, ".next", "server"));

// Check if running from repository root where .next/standalone/server.js was compiled
const nestedStandalone = path.join(__dirname, ".next", "standalone", "server.js");

if (fs.existsSync(nestedStandalone) && !isStandaloneDeploy) {
  // Delegate execution to the optimized standalone server
  console.log(`[cPanel] Booting Next.js standalone runtime...`);
  require(nestedStandalone);
} else {
  // Standard Next.js server runtime
  const next = require("next");
  const app = next({
    dev: false,
    hostname: typeof port === "number" ? hostname : undefined,
    port: typeof port === "number" ? port : undefined,
    dir: __dirname,
  });
  const handle = app.getRequestHandler();

  app
    .prepare()
    .then(() => {
      const server = createServer(async (req, res) => {
        try {
          const parsedUrl = parse(req.url, true);
          await handle(req, res, parsedUrl);
        } catch (err) {
          console.error("[cPanel] Request handling error:", req.url, err);
          res.statusCode = 500;
          res.end("Internal Server Error");
        }
      });

      server.once("error", (err) => {
        console.error("[cPanel] Fatal server error:", err);
        process.exit(1);
      });

      server.listen(port, () => {
        console.log(
          `[cPanel] Server online on ${
            typeof port === "number" ? `http://${hostname}:${port}` : `socket ${port}`
          }`
        );
      });
    })
    .catch((err) => {
      console.error("[cPanel] Startup failed:", err);
      process.exit(1);
    });
}
