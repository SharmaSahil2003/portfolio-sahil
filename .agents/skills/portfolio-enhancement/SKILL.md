---
name: portfolio-enhancement
description: Substantially redesign an existing portfolio website (new visual direction, layouts, typography, 3D and motion) while preserving all content, routes, links and functionality, validated with Playwright screenshots at desktop, tablet and mobile.
---

# Portfolio Enhancement

## Non-negotiables

- Preserve all content, links, routes, forms and functionality.
- Do not treat existing layouts as constraints. Colors, gradients, shadows and rounded cards alone do NOT count as a redesign.
- Never claim something was tested unless the command was actually run and its output seen.

## Phase 1: Audit (before any edits)

1. Read the whole repo: package.json, framework/config, routes/pages, components, styles, assets, data/content files.
2. Write `docs/audit.md`: route list, section inventory per page, content/links/forms that must survive, tech stack, existing bugs.
3. Run the app and capture baseline screenshots (desktop 1440x900, tablet 820x1180, mobile 390x844) into `screenshots/before/`.

## Phase 2: Design direction

Write `docs/design-direction.md` BEFORE coding:

- A one-sentence concept that is specific to this person (not "modern and clean").
- Typography: display + body pairing, scale, weights, how type is used as a visual element. No default system/Inter-only look.
- Color system as CSS tokens (light/dark if applicable), spacing and grid rules.
- A new composition for EVERY section (hero, about, projects, skills, experience, contact, footer, any others). State what is replaced from the old layout.
- At least one original signature visual element (e.g. generative/canvas/SVG artwork, custom cursor, marquee, scroll-driven narrative), not stock decoration.
- 3D plan: one meaningful 3D experience (three.js / react-three-fiber / CSS 3D) tied to the concept, with a static fallback.
- Motion plan: page load, scroll reveals, hover/focus states, transitions; consistent easing and duration tokens.

## Phase 3: Implementation

- Build tokens/base styles first, then sections one at a time, then pages.
- 3D/heavy effects: lazy-load, pause when offscreen, cap pixel ratio, fall back on low-power devices and WebGL failure.
- Respect `prefers-reduced-motion` (disable or simplify all motion and 3D autoplay).
- Accessibility: semantic landmarks, visible focus, contrast >= WCAG AA, keyboard navigation, alt text, no content hidden behind animation.
- Performance: optimized images, font-display swap, no layout shift from animations, code-split 3D.

## Phase 4: Playwright validation

1. If not configured: `npm i -D @playwright/test && npx playwright install --with-deps chromium`, add `playwright.config.ts` with a webServer that starts the dev/preview server and projects for desktop, tablet, mobile.
2. Tests (in `tests/`):
   - Every route loads with no console errors and no failed requests.
   - All preserved nav links, external links, CTAs and forms work.
   - No horizontal overflow at each viewport.
   - Screenshots of every route at every viewport into `screenshots/after/`.
   - Reduced-motion run renders full content.
3. Open the screenshots and critique them. List concrete problems (overlap, clipping, weak hierarchy, empty areas, unreadable text, broken 3D), fix, re-run. Repeat.

## Definition of done

- [ ] Every page and section has a visibly new composition versus `screenshots/before/` (side-by-side check done honestly).
- [ ] New typography, color system and at least one original visual element in place.
- [ ] Working 3D experience with fallback, and meaningful motion with reduced-motion support.
- [ ] All original content, links, routes and functionality verified preserved.
- [ ] Playwright suite passes on desktop, tablet and mobile; screenshots reviewed; no known visual bugs.
- [ ] Production build succeeds; Lighthouse/perf sanity check run if available.
- [ ] Final report lists exactly which commands were run and results, plus known limitations.
