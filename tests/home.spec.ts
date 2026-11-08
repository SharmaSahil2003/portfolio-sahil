import { expect, test } from "@playwright/test";
import { mkdir } from "node:fs/promises";
import { join } from "node:path";

const sizes = [
  [1920, 1080],
  [1440, 900],
  [1024, 768],
  [820, 1180],
  [390, 844],
] as const;

test("home renders cleanly and fits each target viewport", async ({ page }, testInfo) => {
  test.skip(testInfo.project.name !== "desktop-1440", "one test captures all requested viewports");
  const consoleErrors: string[] = [];
  const pageErrors: string[] = [];
  const failedRequests: string[] = [];
  const output = join(process.cwd(), "screenshots/home-after");
  await mkdir(output, { recursive: true });

  for (const [width, height] of sizes) {
    const viewportPage = await page.context().newPage();
    viewportPage.on("console", (message) => {
      if (message.type() === "error") consoleErrors.push(message.text());
    });
    viewportPage.on("pageerror", (error) => pageErrors.push(error.message));
    viewportPage.on("requestfailed", (request) => failedRequests.push(request.url()));
    await viewportPage.setViewportSize({ width, height });
    const response = await viewportPage.goto("/", { waitUntil: "networkidle" });
    expect(response?.status()).toBe(200);
    await expect(
      viewportPage.getByRole("heading", { level: 1, name: "Complex work. Reliable software." }),
    ).toBeVisible();
    await expect(viewportPage.locator(".home-summary")).toBeVisible();
    await expect(viewportPage.locator(".hero-cta--primary")).toBeVisible();
    await expect(viewportPage.locator(".hero-cta--secondary")).toBeVisible();
    await expect(viewportPage.locator(".home-facts")).toBeVisible();
    const particles = viewportPage.locator(".home-page > canvas");
    await expect(particles).toBeVisible();
    const particleOpacity = Number(
      await particles.evaluate((canvas) => getComputedStyle(canvas).opacity),
    );
    expect(particleOpacity, `${width}px particle field remains visible`).toBeGreaterThanOrEqual(
      width <= 680 ? 0.45 : 0.6,
    );
    await expect(
      viewportPage
        .locator(".runtime-trace--hero .trace-fallback, .runtime-trace--hero canvas")
        .first(),
    ).toBeVisible();
    await viewportPage.evaluate(() => document.fonts.ready);
    await viewportPage.waitForTimeout(1700);

    if (width === 1440 || width === 1920) {
      for (const selector of [
        ".home-title",
        ".home-summary",
        ".hero-cta--primary",
        ".hero-cta--secondary",
        ".home-facts",
      ]) {
        const box = await viewportPage.locator(selector).boundingBox();
        expect(box, `${width}px ${selector} has a first-viewport box`).not.toBeNull();
        expect(
          box!.y + box!.height,
          `${width}px ${selector} stays within the first viewport`,
        ).toBeLessThanOrEqual(height);
      }
    }

    const dimensions = await viewportPage.evaluate(() => ({
      viewport: document.documentElement.clientWidth,
      document: document.documentElement.scrollWidth,
      body: document.body.scrollWidth,
    }));
    expect(dimensions.document, `${width}px document overflow`).toBeLessThanOrEqual(width);
    expect(dimensions.body, `${width}px body overflow`).toBeLessThanOrEqual(width);

    const summaryBox = await viewportPage.locator(".home-summary").boundingBox();
    const traceBox = await viewportPage.locator(".runtime-trace--hero").boundingBox();
    const portraitBox = await viewportPage.locator(".portrait-frame").boundingBox();
    expect(summaryBox).not.toBeNull();
    expect(traceBox).not.toBeNull();
    expect(portraitBox).not.toBeNull();
    expect(
      summaryBox!.x + summaryBox!.width <= traceBox!.x ||
        traceBox!.x + traceBox!.width <= summaryBox!.x ||
        summaryBox!.y + summaryBox!.height <= traceBox!.y ||
        traceBox!.y + traceBox!.height <= summaryBox!.y,
      `${width}px summary intersects the 3D stage`,
    ).toBe(true);
    expect(
      summaryBox!.x + summaryBox!.width <= portraitBox!.x ||
        portraitBox!.x + portraitBox!.width <= summaryBox!.x ||
        summaryBox!.y + summaryBox!.height <= portraitBox!.y ||
        portraitBox!.y + portraitBox!.height <= summaryBox!.y,
      `${width}px summary intersects the portrait`,
    ).toBe(true);

    await viewportPage.screenshot({
      path: join(output, `home-${width}x${height}.png`),
      animations: "disabled",
    });
    await viewportPage.close();
  }

  const desktopPage = await page.context().newPage();
  await desktopPage.setViewportSize({ width: 1440, height: 900 });
  await desktopPage.goto("/", { waitUntil: "networkidle" });
  await desktopPage.waitForTimeout(1650);
  for (const selector of [
    ".home-title",
    ".home-summary",
    ".hero-cta--primary",
    ".hero-cta--secondary",
    ".home-facts",
  ]) {
    const box = await desktopPage.locator(selector).boundingBox();
    expect(box, `${selector} has a visible first-viewport box`).not.toBeNull();
    expect(box!.y).toBeGreaterThanOrEqual(0);
    expect(box!.y + box!.height).toBeLessThanOrEqual(900);
  }
  await desktopPage.evaluate(() => window.scrollTo(0, 380));
  await desktopPage.waitForTimeout(100);
  await desktopPage.screenshot({
    path: join(output, "home-1440x900-scrolled.png"),
    animations: "disabled",
  });

  expect(consoleErrors).toEqual([]);
  expect(pageErrors).toEqual([]);
  expect(failedRequests).toEqual([]);
  await desktopPage.close();
});

test("home keeps navigation, social destinations, résumé and hero actions", async ({ page }) => {
  await page.goto("/");
  const expectedRoutes = [
    "/",
    "/about",
    "/skills",
    "/experience",
    "/projects",
    "/education",
    "/contact",
  ];
  for (const route of expectedRoutes) {
    await expect(page.locator(`.atlas-header a[href="${route}"]`).first()).toHaveCount(1);
  }

  await expect(page.locator(".home-actions a[href='/projects']")).toHaveText(/Selected projects/);
  await expect(page.locator(".home-actions a[href^='mailto:']")).toHaveText(/Contact/);
  await expect(page.locator("a[aria-label='GitHub']").first()).toHaveAttribute(
    "href",
    "https://github.com/SharmaSahil2003",
  );
  await expect(page.locator("a[aria-label='LinkedIn']").first()).toHaveAttribute(
    "href",
    "https://www.linkedin.com/in/sahil-sharma-58948222a/",
  );
  await expect(page.locator("a[aria-label='LeetCode']").first()).toHaveAttribute(
    "href",
    "https://leetcode.com/sharmazon2003/",
  );
  await expect(page.locator("a[aria-label='Email Sahil']").first()).toHaveAttribute(
    "href",
    "mailto:sahilshatrughan2003@gmail.com",
  );
  await expect(page.locator("a[aria-label='Download résumé']").first()).toHaveAttribute(
    "download",
    "Sahil_Sharma_Resume.pdf",
  );

  await page.locator(".home-actions a[href='/projects']").click();
  await expect(page).toHaveURL(/\/projects$/);
});

test("home particle field moves when motion is allowed", async ({ page }) => {
  await page.goto("/");
  const particles = page.locator(".home-page > canvas");
  await expect(particles).toBeVisible();
  const before = await particles.evaluate((canvas) => (canvas as HTMLCanvasElement).toDataURL());
  await page.waitForTimeout(500);
  const after = await particles.evaluate((canvas) => (canvas as HTMLCanvasElement).toDataURL());
  expect(after).not.toBe(before);
});

test("WebGL failure and reduced motion keep a static hero sphere and all content", async ({
  browser,
}) => {
  const context = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  await context.addInitScript(() => {
    const nativeGetContext = HTMLCanvasElement.prototype.getContext;
    Object.defineProperty(HTMLCanvasElement.prototype, "getContext", {
      configurable: true,
      value: function (this: HTMLCanvasElement, type: string, ...args: unknown[]) {
        if (type.startsWith("webgl")) throw new Error("WebGL disabled for fallback test");
        return Reflect.apply(nativeGetContext, this, [type, ...args]);
      },
    });
  });
  const page = await context.newPage();
  await page.goto("/");
  await expect(page.locator(".runtime-trace--hero[data-webgl-fallback]")).toBeVisible();
  await expect(page.locator(".trace-fallback--hero")).toBeVisible();
  await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
  await context.close();

  const reducedContext = await browser.newContext({
    viewport: { width: 1440, height: 900 },
    reducedMotion: "reduce",
  });
  const reducedPage = await reducedContext.newPage();
  await reducedPage.goto("/");
  await expect(reducedPage.locator(".runtime-trace--hero[data-webgl-fallback]")).toBeVisible();
  await expect(reducedPage.locator(".trace-fallback--hero")).toBeVisible();
  await expect(reducedPage.locator(".home-summary")).toBeVisible();
  await expect(reducedPage.locator(".home-facts .home-fact strong").first()).toContainText("1500+");
  await reducedContext.close();
});
