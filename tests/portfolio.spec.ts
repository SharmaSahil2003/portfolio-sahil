import { expect, test } from "@playwright/test";
import { mkdir } from "node:fs/promises";
import { join } from "node:path";

const routes = [
  { path: "/", slug: "home", heading: "Reliable software." },
  { path: "/about", slug: "about", heading: "Engineering with context" },
  { path: "/skills", slug: "skills", heading: "Tools of the trade" },
  { path: "/experience", slug: "experience", heading: "Work in production" },
  { path: "/projects", slug: "projects", heading: "Selected work" },
  { path: "/education", slug: "education", heading: "Education & recognition" },
  { path: "/contact", slug: "contact", heading: "Contact" },
] as const;

for (const route of routes) {
  test(`${route.path} renders without browser errors and stays within the viewport`, async ({
    page,
  }, testInfo) => {
    const consoleErrors: string[] = [];
    const pageErrors: string[] = [];
    const failedRequests: string[] = [];
    page.on("console", (message) => {
      if (message.type() === "error") consoleErrors.push(message.text());
    });
    page.on("pageerror", (error) => pageErrors.push(error.message));
    page.on("requestfailed", (request) =>
      failedRequests.push(`${request.method()} ${request.url()}`),
    );

    const response = await page.goto(route.path, { waitUntil: "domcontentloaded" });
    expect(response?.status(), `${route.path} HTTP response`).toBe(200);
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
    await expect(page.getByRole("heading", { level: 1 })).toContainText(route.heading);
    await expect(page.locator(".atlas-header")).toBeVisible();
    await expect(page.locator(".atlas-footer")).toBeVisible();
    await expect(page.locator(".runtime-trace")).toBeVisible();

    const dimensions = await page.evaluate(() => ({
      viewport: document.documentElement.clientWidth,
      document: document.documentElement.scrollWidth,
      body: document.body.scrollWidth,
    }));
    expect(
      dimensions.document,
      `${route.path} document overflow: ${JSON.stringify(dimensions)}`,
    ).toBeLessThanOrEqual(dimensions.viewport);
    expect(
      dimensions.body,
      `${route.path} body overflow: ${JSON.stringify(dimensions)}`,
    ).toBeLessThanOrEqual(dimensions.viewport);

    await page.evaluate(() => document.fonts.ready);
    // Scroll through once so every while-in-view element is revealed before full-page capture.
    await page.evaluate(async () => {
      for (let y = 0; y < document.documentElement.scrollHeight; y += window.innerHeight * 0.45) {
        window.scrollTo(0, y);
        await new Promise((resolve) => window.setTimeout(resolve, 90));
      }
      const hiddenReveals = Array.from(
        document.querySelectorAll<HTMLElement>("[style*='opacity']"),
      ).filter((element) => getComputedStyle(element).opacity === "0");
      for (const element of hiddenReveals) {
        element.scrollIntoView({ block: "center", behavior: "instant" });
        await new Promise((resolve) => window.setTimeout(resolve, 120));
      }
      window.scrollTo(0, 0);
    });
    await page.waitForTimeout(850);
    const viewport = testInfo.project.use.viewport as { width: number; height: number };
    const projectName = testInfo.project.name;
    const directory = join(process.cwd(), "screenshots", "after", projectName);
    await mkdir(directory, { recursive: true });
    await page.screenshot({
      path: join(directory, `${route.slug}.png`),
      fullPage: true,
      animations: "disabled",
    });
    await page.screenshot({
      path: join(directory, `${route.slug}-viewport-${viewport.width}x${viewport.height}.png`),
      animations: "disabled",
    });

    expect(consoleErrors, `${route.path} console errors`).toEqual([]);
    expect(pageErrors, `${route.path} page errors`).toEqual([]);
    expect(failedRequests, `${route.path} failed requests`).toEqual([]);
  });
}

test("chapter navigation, resume download, and project destinations remain available", async ({
  page,
}) => {
  test.skip(
    (page.viewportSize()?.width ?? 1200) <= 1023,
    "desktop navigation and download behavior",
  );
  await page.goto("/");
  const desktopNav = page.locator(".atlas-desktop-nav");
  for (const item of routes) {
    await expect(desktopNav.locator(`a[href="${item.path}"]`)).toHaveCount(1);
  }
  const aboutLink = desktopNav.locator('a[href="/about"]');
  await aboutLink.click();
  await expect(page).toHaveURL(/\/about$/);

  await page.goto("/");
  const download = page.waitForEvent("download");
  const resumeLink = page.getByRole("link", { name: "Download résumé" });
  await resumeLink.click();
  expect((await download).suggestedFilename()).toBe("Sahil_Sharma_Resume.pdf");

  await page.goto("/projects");
  const links = page.locator(".project-links a");
  await expect(links).toHaveCount(8);
  await expect(page.locator('a[href="https://react-flix-lime.vercel.app/"]')).toHaveAttribute(
    "target",
    "_blank",
  );
  await expect(
    page.locator('a[href="https://disney-hotstar-replica.vercel.app/"]'),
  ).toHaveAttribute("target", "_blank");
});

test("mobile navigation closes with Escape and follows selected routes", async ({ page }) => {
  test.skip((page.viewportSize()?.width ?? 1200) > 1023, "mobile navigation behavior");
  await page.goto("/");
  await page.waitForTimeout(250);
  const toggle = page.getByRole("button", { name: "Open navigation" });
  await toggle.click();
  await expect(page.locator(".atlas-mobile-nav")).toBeVisible();
  await page.keyboard.press("Escape");
  await expect(page.locator(".atlas-mobile-nav")).toHaveCount(0);
  await page.getByRole("button", { name: "Open navigation" }).click();
  await page
    .locator(".atlas-mobile-nav")
    .getByRole("link", { name: /Projects/ })
    .click();
  await expect(page).toHaveURL(/\/projects$/);
});

test("contact form validates required fields and reaches success state without sending email", async ({
  page,
}) => {
  await page.route("https://api.emailjs.com/**", (route) =>
    route.fulfill({ status: 200, contentType: "application/json", body: '{"ok":true}' }),
  );
  await page.goto("/contact");
  await page.waitForTimeout(250);
  const form = page.getByRole("form", { name: "Contact form" });
  const submit = form.getByRole("button", { name: /Send message/ });
  await submit.click();
  await expect(form.locator("#from_name")).toHaveJSProperty("validity.valueMissing", true);
  await expect(form.locator("#reply_to")).toHaveJSProperty("validity.valueMissing", true);
  await expect(form.locator("#message")).toHaveJSProperty("validity.valueMissing", true);

  await form.locator("#from_name").fill("Playwright Check");
  await form.locator("#reply_to").fill("test@example.com");
  await form.locator("#message").fill("Automated contact form verification.");
  await expect(form.locator("#from_name")).toHaveValue("Playwright Check");
  await expect(form.locator("#reply_to")).toHaveValue("test@example.com");
  await expect(form.locator("#message")).toHaveValue("Automated contact form verification.");
  await submit.click();
  await expect(
    page.getByText("Thanks for reaching out — I’ve received your message."),
  ).toBeVisible();
  await expect(
    page
      .getByRole("navigation", { name: "Professional links" })
      .getByRole("link", { name: "GitHub" }),
  ).toHaveAttribute("href", "https://github.com/SharmaSahil2003");
});

test("reduced-motion preference keeps page content and trace fallback available", async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/projects");
  await expect(page.getByRole("heading", { level: 1, name: "Selected work" })).toBeVisible();
  await expect(page.locator(".runtime-trace .trace-fallback")).toBeVisible();
  await expect(page.locator(".project-entry")).toHaveCount(7);
});
