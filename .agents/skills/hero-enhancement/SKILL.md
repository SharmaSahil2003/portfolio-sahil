---
name: hero-enhancement
description: Refine and elevate the landing/home page (hero and first viewport) of an already-redesigned portfolio. Fixes layering, hierarchy, spacing and CTA weight, upgrades the 3D/motion centerpiece, and validates with Playwright at desktop, tablet and mobile. Use only for the home route; do not touch other pages.
---

# Hero / Home Page Enhancement

Scope: the home route only. Other pages are already done; do not restyle them. Reuse the existing design tokens (dark ink background, warm gold accent, teal mono labels, grotesk display type, mono UI text). Extend them, do not replace them.

## Non-negotiables

- Preserve all content, copy, links, nav, social icons, resume download, stats and the photo.
- No regressions on other routes. Shared components (nav, footer) change only if the home page requires it.
- Never claim something was tested unless the command was run and its output seen.

## Phase 1: Audit the current hero

1. Read the home route, hero components, 3D/canvas code, styles and tokens.
2. Capture baseline screenshots into `screenshots/home-before/` at 1440x900, 1920x1080, 1024x768, 820x1180 and 390x844, plus a scrolled-in-view capture.
3. Write `docs/home-audit.md` listing concrete problems. Check at least these known candidates:
   - 3D wireframe sphere sits behind and overlaps the body paragraph and photo frame, hurting legibility; it is also very low contrast, so it reads as noise rather than a centerpiece.
   - The vertical divider line runs through the paragraph, the CTA area and the stats row.
   - Headline tracking is so tight that words nearly touch ("Complex work."); gold line vs white line needs a more deliberate rhythm.
   - Body paragraph is long, grey on near-black, and heavy for a hero; the typewriter line ("Effective Problem Solver") duplicates the eyebrow and adds little.
   - CTAs ("Selected projects", "Contact") are underlined text links with no primary/secondary hierarchy.
   - Photo frame: gold bar and cut-corner frame are misaligned and the caption floats loosely; the photo feels pasted next to the sphere, not integrated.
   - Large dead space below the stats row at 1440x900; the first viewport is not composed as a single frame.
   - Stats row uses small mono labels that are hard to read and has no motion.
   - Particle/network background is too faint to register.

## Phase 2: Direction (write `docs/home-direction.md` before coding)

Decide, in writing:

- One focal point. The sphere/3D object and the photo must not compete; either the 3D object frames or interacts with the portrait, or it moves to a clearly separate layer that never sits under text.
- A layering model: background field, 3D layer, content, UI overlay, each with explicit z-order, and a protective scrim or mask wherever text overlaps anything.
- Typographic rhythm: headline tracking/leading fix, a scale step for eyebrow, body and stats, and a shorter hero paragraph (keep the original copy available, e.g. expandable or moved to About, only if the user approves trimming; otherwise keep it and improve contrast, measure and size).
- CTA system: one primary button (clear fill/border, arrow motion), one secondary; consistent focus and hover states.
- Motion choreography for first load (eyebrow, headline lines, portrait, stats counting up, CTA), under 1.5s total, using shared easing tokens.
- A signature 3D/interaction upgrade (examples: pointer-reactive sphere whose nodes light up toward the cursor, scroll-linked rotation, nodes that map to skills, parallax between portrait and object). It must be tied to the "complex work, reliable software" idea.
- Fallbacks: static render when WebGL fails or on low power, reduced-motion variant.

## Phase 3: Implementation rules

- Fix overlaps first, then hierarchy, then motion, then polish.
- Text over any animated layer must meet WCAG AA contrast (4.5:1 body, 3:1 large). Verify by sampling, not by eye alone.
- First viewport should fill the screen at 1440x900 and 1920x1080 with no large dead band; stats anchor to the bottom of the viewport or are deliberately integrated.
- 3D: lazy-load, pause offscreen (IntersectionObserver), cap devicePixelRatio at 2, dispose geometries/materials on unmount, target steady 60fps on a mid laptop.
- Typewriter or any cycling text must not cause layout shift and must have an accessible static alternative.
- Mobile: stack in a deliberate order (eyebrow, headline, portrait, CTAs, paragraph, stats); no horizontal scroll; 3D simplified or reduced; tap targets at least 44px.
- Respect `prefers-reduced-motion`: no autoplay rotation, no counters animating, no parallax.

## Phase 4: Playwright validation

1. Set up Playwright if missing (`@playwright/test`, chromium, config with webServer and desktop/tablet/mobile projects).
2. Write `tests/home.spec.ts` covering:
   - Home loads with zero console errors and zero failed requests.
   - Nav links, social links, resume download and both CTAs exist and navigate correctly.
   - No horizontal overflow at 1920, 1440, 1024, 820, 390.
   - Headline, paragraph, CTAs and stats are visible within the first viewport at 1440x900.
   - Canvas/3D element present, or fallback present when WebGL is disabled.
   - Reduced-motion context renders all content statically.
   - Bounding-box check: body paragraph does not intersect the 3D canvas's dense region/portrait frame.
3. Save screenshots to `screenshots/home-after/` for every viewport, review them yourself, list defects, fix, repeat at least two full review loops.
4. Run the production build and confirm the home route still renders.

## Definition of done

- [ ] Every audit issue is either fixed or explicitly justified in `docs/home-audit.md`.
- [ ] One clear focal point; 3D layer never reduces text legibility; contrast verified.
- [ ] Headline spacing, CTA hierarchy and stats presentation visibly improved versus `home-before`.
- [ ] No dead band in the first viewport at 1440x900 or 1920x1080; mobile layout composed, not just stacked.
- [ ] Load choreography and one signature interaction implemented, with fallback and reduced-motion support.
- [ ] Playwright suite passes at all viewports; screenshots reviewed.
- [ ] Other routes unchanged (spot-check screenshots).
- [ ] Final report lists exact commands run, results, and known limitations.
