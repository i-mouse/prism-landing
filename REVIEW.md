# Prism Landing — Pre-Launch Review

## Verdict
Hold for fixes. Severe memory leak in typing animation and missing responsive/accessible markup must be resolved before launch.

## Blockers (must fix before public launch)
1. **Memory Leak in Typing Animation**
   - **Where:** `src/components/live-audit-demo.tsx:147`
   - **Why:** The `useEffect` returns a cleanup function from inside `setTimeout` which is ignored by the browser. Unmounting the component while typing leaves orphaned `setInterval` loops running forever, causing major memory leaks.
   - **Fix:** Move the `interval` variable to a higher scope (e.g. a ref or outer variable) and clear it in the main `useEffect` cleanup block.

2. **Missing `useReducedMotion`**
   - **Where:** `src/components/live-audit-demo.tsx`, `src/components/scattered-rects.tsx`
   - **Why:** Framer motion animations are running unconditionally. Users with vestibular motion sensitivities will see looping/moving elements, violating WCAG guidelines.
   - **Fix:** Wrap animation properties in Framer's `useReducedMotion()` checks to disable motion when `prefers-reduced-motion` is enabled.

3. **Color Contrast Failure**
   - **Where:** `src/components/sections/how-it-works-section.tsx:71`
   - **Why:** Text color `text-zinc-400` on a `bg-white` mock paper yields a contrast ratio of ~2.5:1, failing the WCAG AA minimum of 4.5:1 for small text.
   - **Fix:** Change to `text-zinc-500` or darker for the paper text.

4. **Missing SEO Metadata & Assets**
   - **Where:** `src/app/layout.tsx`, `public/`
   - **Why:** Next.js `metadata` export is missing `openGraph`, `twitter` cards, and `canonical`. No `og.png`, `robots.txt`, or `sitemap.xml` exist in the tree.
   - **Fix:** Add full metadata to `layout.tsx` and static SEO assets to the `public/` directory.

## Non-blockers (should fix soon)
1. **Non-Performant Animations (Layout Thrashing)**
   - **Where:** `src/components/scattered-rects.tsx:27-30`
   - **Why:** Animating `top`, `bottom`, `left`, `right` triggers CPU layout recalculations on every frame, leading to jank.
   - **Fix:** Animate `x` and `y` via CSS transforms instead of positional properties.

2. **Hardcoded Colors Instead of CSS Variables**
   - **Where:** `src/components/layout/navbar.tsx:14-16`, `src/components/sections/footer-section.tsx:22-24`, `src/components/sections/live-audit-upload.tsx:7`, `src/components/sections/stats-section.tsx:10`
   - **Why:** Hex codes (e.g. `#ec4899`, `#09090b`) and `rgba()` calls bypass the Tailwind v4 `@theme` system, breaking dark-mode parity and consistency.
   - **Fix:** Replace raw values with Tailwind classes or `var(--color-...)`.

3. **Skipped Heading Level**
   - **Where:** `src/components/sections/wedge-section.tsx:9`
   - **Why:** The section uses `<h3>` directly after the hero `<h1>`, skipping `<h2>`. This harms screen reader navigation structure.
   - **Fix:** Change `<h3>` to `<h2>`.

4. **Hardcoded Strings Scattered in Components**
   - **Where:** `src/components/live-audit-demo.tsx:85`, `src/components/sections/how-it-works-section.tsx:71`, `src/components/sections/scope-limitations-section.tsx:18`
   - **Why:** Defeats the purpose of the `content.ts` centralization, making copy edits error-prone.
   - **Fix:** Move these hardcoded strings into `content.ts` and reference them via props.

5. **Verdict Color Indicated by Color Alone**
   - **Where:** `src/components/sections/how-it-works-section.tsx:86`
   - **Why:** The timeline dots rely solely on color (`bg-supported`, etc.) to convey meaning, failing WCAG AA guidelines for users with color vision deficiencies.
   - **Fix:** Add a visually hidden label or icon inside the dot.

## Nice-to-haves (backlog)
1. **Unnecessary "use client" Directive**
   - **Where:** `src/components/sections/footer-section.tsx:1`
   - **Why:** The component only renders static elements and imports a client component (`ScatteredRects`). This is legal for a Server Component.
   - **Fix:** Remove `"use client"`.

2. **Type Assertion Masking**
   - **Where:** `src/components/sections/how-it-works-section.tsx:89`, `src/components/live-audit-demo.tsx:119`
   - **Why:** `as any` bypasses TypeScript's strictness for the `color` prop of `VerdictPill`.
   - **Fix:** Fix the underlying type in `content.ts` so it strictly matches `'supported' | 'partial' | 'refused' | 'other'`.

3. **RequestAnimationFrame vs setInterval**
   - **Where:** `src/components/live-audit-demo.tsx:15`
   - **Why:** `setInterval` drops frames and does not sync with the display's refresh rate.
   - **Fix:** Refactor the carousel loop to use `requestAnimationFrame` or Framer Motion's `useAnimationFrame`.

## What's good
- **Semantic HTML Foundation:** Great use of `<main>`, `<nav>`, `<section>`, and `<footer>` structuring throughout the app.
- **Component Reuse:** The `VerdictPill` correctly centralizes the complex status styling and is reused flawlessly rather than duplicating inline classes.
- **Tailwind v4 Adoption:** Clean, modern use of the inline `@theme` config in `globals.css` with zero bloat from legacy `tailwind.config.js`.
- **TypeScript Strictness:** Strict mode is on and mostly respected, keeping the codebase type-safe.

## Metrics
- Total files: 34
- Total lines of code (excluding node_modules): 1332
- Build output First Load JS (home route): Not reported (Next.js 15 / Turbopack hides route sizes by default)
- Number of "use client" components: 7
- Number of hardcoded color values found: 14
