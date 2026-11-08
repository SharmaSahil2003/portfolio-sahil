import { defineConfig } from "@playwright/test";

const baseURL = "http://127.0.0.1:4178";

export default defineConfig({
  testDir: "./tests",
  fullyParallel: false,
  timeout: 45_000,
  expect: { timeout: 8_000 },
  reporter: "list",
  use: {
    baseURL,
    trace: "retain-on-failure",
    screenshot: "off",
    video: "off",
  },
  projects: [
    { name: "desktop-1440", use: { viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1 } },
    { name: "tablet-820", use: { viewport: { width: 820, height: 1180 }, deviceScaleFactor: 1 } },
    { name: "mobile-390", use: { viewport: { width: 390, height: 844 }, deviceScaleFactor: 1 } },
  ],
  webServer: {
    command: "npm run dev -- --host 127.0.0.1 --port 4178",
    url: `${baseURL}/robots.txt`,
    reuseExistingServer: false,
    timeout: 120_000,
    stdout: "pipe",
    stderr: "pipe",
  },
});
