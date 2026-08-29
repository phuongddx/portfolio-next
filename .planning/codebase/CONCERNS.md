# Codebase Concerns

**Analysis Date:** 2026-08-29

## Tech Debt

### Dead code: unused UI components and exports
- Issue: `RatingBadge`, `ProjectCard`, and `SideProjectCard` are exported from `components/ui/index.ts` but never imported through that barrel file. Each section defines its own local `ProjectCard` and `SideProjectCard` with different props. `SunIcon` and `MoonIcon` remain exported from `social-icons.tsx` and re-exported in `index.ts` despite the theme toggle and dark mode being removed.
- Files: `components/ui/rating-badge.tsx`, `components/ui/project-card.tsx`, `components/ui/side-project-card.tsx`, `components/ui/social-icons.tsx`, `components/ui/index.ts`
- Impact: Confusing module surface; dead code increases bundle analysis noise and misleads developers about what is available.
- Fix approach: Remove `RatingBadge`, `ProjectCard`, `SideProjectCard` from `components/ui/` and their barrel exports. Remove `SunIcon`, `MoonIcon` from `social-icons.tsx` and `index.ts`. If `ThemeProvider` in `components/theme/theme-provider.tsx` is also unused (it is — removed from layout), delete the entire `components/theme/` directory.

### Dead code: unused `PageTransition` component
- Issue: `PageTransition` in `components/layout/page-transition.tsx` is never imported or used anywhere in the codebase. It duplicates animation variants already defined in `components/effects/animation-variants.ts`.
- Files: `components/layout/page-transition.tsx`, `components/effects/animation-variants.ts`
- Impact: Dead code; the shared `animation-variants.ts` is also largely unused — only `pageVariants` and `pageTransition` exist there but are consumed only by the unused `PageTransition`.
- Fix approach: Delete `page-transition.tsx`. Audit `animation-variants.ts` — if no other file imports from it, delete it too.

### Duplicated animation variant definitions across sections
- Issue: `containerVariants`, `itemVariants`, and `cardVariants` are copy-pasted into 7+ section files (`hero-section.tsx`, `ai-hero-section.tsx`, `about-section.tsx`, `contact-section.tsx`, `experience-section.tsx`, `projects-section.tsx`, `side-projects-section.tsx`, `skills-section.tsx`). A shared `animation-variants.ts` exists but is not used by any of these sections.
- Files: All files in `components/sections/`, `components/effects/animation-variants.ts`
- Impact: Any animation tweak requires editing 7+ files. The shared variants file and the per-file variants have already diverged slightly (e.g., `cardVariants` in `about-section.tsx` and `contact-section.tsx` include `scale: 0.95` while others do not).
- Fix approach: Extend `components/effects/animation-variants.ts` with all used variants, import them in each section. Delete the local copies.

### Duplicated `pastelColors` array across sections
- Issue: The same `pastelColors` array (with minor variations) is defined locally in 5 section files: `about-section.tsx`, `contact-section.tsx`, `experience-section.tsx`, `projects-section.tsx`, `skills-section.tsx`.
- Files: `components/sections/about-section.tsx`, `components/sections/contact-section.tsx`, `components/sections/experience-section.tsx`, `components/sections/projects-section.tsx`, `components/sections/skills-section.tsx`
- Impact: Changing the color rotation requires editing 5 files. Inconsistencies already exist (3 vs 4 entries).
- Fix approach: Extract to a shared constant in `components/effects/animation-variants.ts` or a new `components/constants.ts`.

### Duplicated social links across hero and AI hero sections
- Issue: The same social links (LinkedIn, GitHub, Email) with identical URLs and icons are hardcoded in both `components/sections/hero-section.tsx` and `components/sections/ai-hero-section.tsx`. Contact info is also duplicated in `components/sections/contact-section.tsx` and `components/layout/footer.tsx`.
- Files: `components/sections/hero-section.tsx`, `components/sections/ai-hero-section.tsx`, `components/sections/contact-section.tsx`, `components/layout/footer.tsx`, `src/app/layout.tsx`
- Impact: Changing a URL (e.g., LinkedIn handle) requires editing 5+ files. Already leads to inconsistencies — `footer.tsx` has `linkedin.com/in/phuongddx` (no trailing slash) while others use `linkedin.com/in/phuongddx/` (with trailing slash).
- Fix approach: Create a shared `site-config.ts` (or similar) at the project root or in `components/data/` that exports all personal links, contact info, and site metadata as a single source of truth. Import from it everywhere.

### Hardcoded personal data throughout components
- Issue: Name ("DOAN DUY PHUONG", "Doan Phuong"), email, LinkedIn URL, GitHub URL, and site URL are hardcoded in at least 8 component files and `layout.tsx`. None of these values come from the data layer — they violate the pattern established in `components/data/ai-resume-data.ts` where data is centralized.
- Files: `components/sections/hero-section.tsx`, `components/sections/ai-hero-section.tsx`, `components/sections/contact-section.tsx`, `components/layout/footer.tsx`, `components/layout/navbar.tsx`, `src/app/layout.tsx`, `components/data/ai-resume-data.ts`
- Impact: Updating any personal detail is error-prone and requires grep-and-replace across the codebase.
- Fix approach: Create `components/data/site-config.ts` with all personal/site info. Import in all consumers.

### Hardcoded section content in hero sections
- Issue: `hero-section.tsx` contains the entire featured project card inline (ePost Design System) with hardcoded title, description, tech stack, progress bar, and App Store link. `ai-hero-section.tsx` similarly has the AI workflow card hardcoded inline despite some data coming from `aiHeroData`. This breaks the pattern where all content data lives in `components/data/`.
- Files: `components/sections/hero-section.tsx` (lines 131–195), `components/sections/ai-hero-section.tsx` (lines 132–162)
- Impact: Content changes require editing component files rather than data files.
- Fix approach: Move featured project data to `components/data/projects-data.ts` (or a `featured-project` export) and the AI workflow card content to `components/data/ai-resume-data.ts`.

### Data placement: data files inside `components/data/`
- Issue: Data files (`experience-data.ts`, `skills-data.ts`, `projects-data.ts`, `side-projects-data.ts`, `ai-resume-data.ts`) live inside `components/data/`. Data is not a component — this breaks separation of concerns and makes data reuse outside the component tree (RSS feeds, sitemap generation, API routes) awkward.
- Files: `components/data/*`
- Impact: Architectural inconsistency. Import paths suggest component coupling where none should exist.
- Fix approach: Move `components/data/` to a top-level `data/` directory. Update all imports from `@/components/data/*` to `@/data/*`.

### Legacy CSS variables and shadow tokens from dark mode era
- Issue: `globals.css` defines `--text` as a legacy alias for `--foreground` and `--secondary` for `--muted`. Dark mode was removed but these aliases and all the CSS variable tokens remain. The `tailwind.config.ts` still maps to these variables. The `--spring-stiffness` and `--spring-damping` CSS variables are defined but never referenced in any Tailwind class.
- Files: `src/app/globals.css` (lines 22–24, 27–28), `tailwind.config.ts`
- Impact: Confusing token layer. Unused CSS variables add cognitive overhead.
- Fix approach: Remove `--text`, `--secondary` aliases and `--spring-stiffness`/`--spring-damping`. If no other files reference them directly, inline the real variables.

### Inconsistent design token usage: hardcoded Tailwind colors vs CSS variables
- Issue: CSS variables are defined in `:root` (`--background`, `--foreground`, etc.) and mapped in `tailwind.config.ts` (e.g., `bg-background`, `text-foreground`). However, most sections bypass these tokens entirely, using hardcoded Tailwind colors (`text-gray-800`, `bg-gray-100`, `bg-green-500`, `bg-[#f8f9fa]`) directly. The `bg-[#f8f9fa]` hardcoded background appears in 5 section files instead of using `bg-background`.
- Files: All files in `components/sections/`, `components/layout/navbar.tsx`, `components/layout/footer.tsx`, `components/layout/mobile-menu.tsx`, `components/layout/mode-toggle.tsx`, `components/ui/badge.tsx`, `components/ui/button.tsx`
- Impact: Design token system is effectively dead code. Changing the color palette requires editing dozens of files instead of updating CSS variables.
- Fix approach: Systematically replace hardcoded color classes with design token classes. Use `bg-background` instead of `bg-[#f8f9fa]`, `text-foreground` instead of `text-gray-800`, etc.

### Outdated documentation
- Issue: `docs/system-architecture.md` shows an architecture diagram with `ThemeProvider` wrapping `MotionProvider` wrapping content, and references `GlassNavbar` and `ThemeToggle` — none of which exist in the current codebase. `docs/deployment-guide.md` references theme toggle configuration. `docs/project-roadmap.md` lists dark mode as "Done".
- Files: `docs/system-architecture.md`, `docs/deployment-guide.md`, `docs/project-roadmap.md`
- Impact: Documentation actively misleads developers about the current architecture.
- Fix approach: Update all docs to reflect the current provider tree (`MotionProvider > ModeProvider > Navbar + main + Footer`) and remove dark mode references.

### Stale files in repository root not in `.gitignore`
- Issue: `repomix-output.xml` (2.3 MB), `introduce-myself.html` (24 KB), `header-ui.png` (44 KB), `.ai-devkit.json`, and `engineer.yaml` sit in the repository root. Only `introduce-myself.html` is tracked by git. None are gitignored. `repomix-output.xml` is a generated artifact that should never be committed.
- Files: `repomix-output.xml`, `introduce-myself.html`, `header-ui.png`, `.ai-devkit.json`, `engineer.yaml`, `.gitignore`
- Impact: `repomix-output.xml` is 2.3 MB of auto-generated content that bloats the working tree. `introduce-myself.html` is already tracked but appears to be a one-off artifact.
- Fix approach: Add `repomix-output.xml`, `introduce-myself.html`, `header-ui.png`, `.ai-devkit.json`, `engineer.yaml` to `.gitignore`. If `introduce-myself.html` is tracked, `git rm` it.

## Known Bugs

### Hydration mismatch risk from localStorage-dependent mode context
- Issue: `ModeProvider` in `components/context/mode-context.tsx` initializes state to `"ios"` on the server but may read `"ai"` from localStorage on the client. The `ModeRouter` handles this with the `mounted` guard (rendering iOS content until hydration), but this means AI-mode users see a flash of iOS content on every page load before the client hydrates and switches.
- Files: `components/context/mode-context.tsx`, `components/layout/mode-router.tsx`
- Symptoms: Brief flash of iOS content for AI-mode users on every navigation or hard refresh.
- Workaround: The `mounted` guard in `mode-router.tsx` (line 73) prevents a hydration error but does not prevent the visual flash.
- Fix approach: Use a blocking script in `<head>` (via `layout.tsx`) that reads localStorage before React hydrates and sets a `data-mode` attribute on `<html>`. The server-rendered HTML can then respect this attribute. Alternatively, accept the flash as a known trade-off of the dual-mode approach.

## Security Considerations

### Email exposed in structured data (JSON-LD)
- Issue: `src/app/layout.tsx` includes `"email": "95doanphuong@gmail.com"` in the Person JSON-LD schema. This is publicly visible in page source and indexable by search engines, making it a target for scraping.
- Files: `src/app/layout.tsx` (line 72)
- Risk: Email harvesting bots will extract this address.
- Current mitigation: None.
- Recommendations: Remove the email field from JSON-LD, or replace it with a contact form URL. Use a contact form endpoint instead of a direct mailto link if spam becomes an issue.

### Missing Content-Security-Policy header
- Issue: `next.config.mjs` sets `X-Frame-Options`, `X-Content-Type-Options`, `Referrer-Policy`, and `Permissions-Policy` but does not set `Content-Security-Policy` (CSP).
- Files: `next.config.mjs`
- Risk: Without CSP, the page is more vulnerable to XSS attacks if any user-controlled content is ever introduced (e.g., a blog section, dynamic project descriptions).
- Current mitigation: No user-controlled content exists currently; the site is fully static.
- Recommendations: Add a basic CSP header that restricts script sources to `'self'` and the Vercel domain, and image sources to `'self'` and known CDNs. Start with `Content-Security-Policy-Report-Only` to test without breaking anything.

### No rate limiting or bot protection on contact mailto
- Issue: The contact section (`components/sections/contact-section.tsx`) uses a plain `mailto:` link. While not a server-side vulnerability, the email address is prominently displayed and clickable.
- Files: `components/sections/contact-section.tsx` (lines 21–22, 124)
- Risk: Spam if the address is scraped.
- Current mitigation: None.
- Recommendations: Consider obfuscating the email in the HTML source (e.g., JavaScript-assembled mailto link) or replacing with a contact form backed by a serverless function.

### Incomplete `.gitignore` for sensitive file patterns
- Issue: `.gitignore` covers `.env*.local` and `.pem` but does not cover common secret patterns like `*.env` (without suffix), `credentials.*`, `*secret*`, `serviceAccountKey.json`, or `.ai-devkit.json` (which may contain API configuration).
- Files: `.gitignore`
- Risk: If a developer creates a `.env` file (not `.env.local`), it would be tracked by git.
- Current mitigation: Only `.env*.local` is ignored.
- Recommendations: Add `*.env`, `credentials.*`, `*secret*`, `serviceAccountKey*.json` to `.gitignore`.

## Performance Bottlenecks

### All AI sections loaded via `dynamic()` with `ssr: false`
- Issue: In `components/layout/mode-router.tsx`, all 5 AI sections (`AIHeroSection`, `AIWorkflowSection`, `AISkillsSection`, `AIExperienceSection`, `AIProjectsSection`) are dynamically imported with `ssr: false`. This means switching to AI mode triggers 5 separate JavaScript chunk downloads.
- Files: `components/layout/mode-router.tsx` (lines 15–37)
- Cause: Each `dynamic()` call creates a separate chunk. The `ssr: false` flag prevents server rendering but also prevents the chunks from being included in the initial HTML payload.
- Improvement path: Consider using `next/dynamic` without `ssr: false` if the AI sections have no browser-only dependencies (they don't appear to — `useTypingAnimation` uses `requestAnimationFrame` but that degrades gracefully). Alternatively, use route-based splitting (separate `/ai` page) instead of client-side mode toggling, which would allow full SSR of AI content.

### Terminal typing animation in `ai-workflow-section.tsx` uses `setTimeout` + `requestAnimationFrame` per line
- Issue: The terminal animation spawns one `setTimeout` and multiple `requestAnimationFrame` callbacks per terminal line. With ~20 terminal lines, this creates up to 40+ concurrent animation callbacks.
- Files: `components/sections/ai-workflow-section.tsx` (lines 36–65)
- Cause: Each line's `setTimeout` fires after a delay, then chains `requestAnimationFrame` for character-by-character typing.
- Improvement path: This is acceptable for the current line count. If terminal lines grow, switch to a single `requestAnimationFrame` loop that tracks elapsed time and determines which lines should be visible, similar to how `use-typing-animation.ts` works.

### `useTypingAnimation` hook updates state on every animation frame
- Issue: `components/hooks/use-typing-animation.ts` calls `setDisplay()` (a state setter) inside a `requestAnimationFrame` loop, triggering a React re-render on every frame (every 50ms) while typing is active.
- Files: `components/hooks/use-typing-animation.ts` (lines 30–48)
- Cause: Each character update sets React state, causing the parent component to re-render.
- Improvement path: Use a ref for the display text and update the DOM directly via a ref to the text element, bypassing React's render cycle for the animation. Set React state only when paused (typing complete, before deletion).

### Unused `next-themes` dependency
- Issue: `next-themes` is listed as a dependency in `package.json` but the `ThemeProvider` wrapper in `components/theme/theme-provider.tsx` is no longer used in `layout.tsx` (removed during dark mode removal).
- Files: `package.json` (line 8), `components/theme/theme-provider.tsx`
- Impact: Adds ~8 KB to the deployed bundle (the library and its CSS injection code are tree-shaken only if no import reaches it, but the barrel re-export in `theme-provider.tsx` may prevent full elimination).
- Fix approach: Delete `components/theme/` directory and run `npm uninstall next-themes`.

## Fragile Areas

### Mode-specific section composition in `ModeRouter`
- Issue: `components/layout/mode-router.tsx` manually lists which sections to render for each mode. Adding a new section requires editing this file, and there is no type-safe contract ensuring the section components export the expected named export.
- Files: `components/layout/mode-router.tsx`
- Why fragile: The `dynamic()` imports use `.then((m) => m.NamedExport)` — a rename in any AI section file would cause a runtime crash with no compile-time warning.
- Safe modification: When adding new AI sections, follow the existing dynamic import pattern. Consider adding a comment listing all expected named exports.
- Test coverage: No tests exist for `ModeRouter`.

### `about-section.tsx` contains hardcoded bio text
- Issue: The about section has three paragraphs of bio text hardcoded directly in JSX rather than in a data file.
- Files: `components/sections/about-section.tsx` (lines 58–75)
- Why fragile: Text updates require editing a component file. The bio text mixes with layout and animation code.
- Safe modification: Extract bio text to a data file before editing.

### Static sitemap with hardcoded single URL and stale date
- Issue: `public/sitemap.xml` contains a single URL entry with `lastmod` set to `2026-03-23` — over 5 months stale. It references the deployment URL directly rather than using Next.js's built-in `sitemap.ts` convention.
- Files: `public/sitemap.xml`, `public/robots.txt`
- Why fragile: Adding new pages (e.g., a blog) would require manually updating the sitemap. The stale `lastmod` may harm SEO.
- Safe modification: Replace with a `src/app/sitemap.ts` file using Next.js metadata API that dynamically generates the sitemap.

### OPF image only reflects iOS mode
- Issue: `src/app/opengraph-image.tsx` generates an OG image with the title "iOS Software Engineer" and iOS-mode stats. When shared from AI mode, the OG image still shows iOS branding.
- Files: `src/app/opengraph-image.tsx`
- Why fragile: Any AI-mode share on social media shows incorrect branding.
- Safe modification: Generate two OG images (one per mode) and use `generateMetadata` in `page.tsx` to select the correct one based on the mode query parameter. Or create a generic OG image that works for both modes.

## Scaling Limits

### Single-page app with no routing beyond mode toggle
- Current capacity: One route (`/`) with client-side mode switching via query parameter.
- Limit: Cannot add blog posts, project detail pages, or other content without introducing Next.js file-based routing. The current mode-toggle approach with `AnimatePresence` wrapping the entire page content does not compose with page-level routing.
- Scaling path: If new pages are needed, use Next.js App Router directories (e.g., `/blog/[slug]/page.tsx`) and move mode-specific content to layout-level providers rather than client-side conditional rendering.

### No CMS or content layer
- Current capacity: All content is hardcoded in TypeScript data files.
- Limit: Adding or editing content requires a code change, build, and deploy cycle.
- Scaling path: Introduce a content layer (MDX files in a `content/` directory, or a headless CMS like Notion/Sanity) with build-time content fetching.

## Dependencies at Risk

### Next.js 14 pinned to patch version
- Risk: `package.json` pins `next` at `14.2.35` and `eslint-config-next` at `14.2.35`. Next.js 15 introduced breaking changes (React 19 support, new caching defaults). Upgrading will require testing all client components, especially `framer-motion` animations and the `dynamic()` imports with `ssr: false`.
- Impact: Security patches for Next.js 14 will eventually stop. React 18 enters maintenance.
- Migration plan: Upgrade to Next.js 15 incrementally — first upgrade `next` and `react` to latest 15.x, then test each section for animation and rendering regressions. The `opengraph-image.tsx` Edge Runtime usage is compatible with both versions.

### Framer Motion `m` component API may change
- Risk: The codebase uses `m.div` (the `motion` mini-component from `framer-motion` with `LazyMotion`). If Framer Motion deprecates the `m` namespace in favor of the full `motion` API, all section files would need updating.
- Impact: ~30+ files import `m` from `framer-motion`.
- Migration plan: If `m` is deprecated, a codemod can replace `m.div` → `motion.div` and remove the `LazyMotion` wrapper, at the cost of a larger initial JS bundle.

## Missing Critical Features

### No contact form
- Problem: Contact section only provides a `mailto:` link. No server-side contact form exists.
- Blocks: Collecting messages from visitors who do not have email clients configured (mobile users, corporate devices).

### No analytics
- Problem: No analytics integration (GA, Plausible, Vercel Analytics). No way to measure traffic, mode switching behavior, or conversion.
- Blocks: Data-driven decisions about content and UX improvements.

### No 404 page
- Problem: No `src/app/not-found.tsx` exists. Visitors hitting invalid URLs see Next.js's default 404 page, which breaks the site's visual design.
- Blocks: Consistent branding on error pages.

### No loading state for initial page load
- Problem: The AI mode's `SectionSkeleton` only shows during dynamic import loading (mode switch). The initial page load has no loading UI — users see blank content until JavaScript hydrates.
- Blocks: Perceived performance on slow connections.

## Test Coverage Gaps

### Zero test files across the entire codebase
- What's not tested: Everything. No `*.test.ts`, `*.test.tsx`, `*.spec.ts`, or `*.spec.tsx` files exist. No test configuration file (`jest.config.*`, `vitest.config.*`) exists. The `package.json` has no test script.
- Files: Entire `components/` and `src/` directories
- Risk: Any refactoring (e.g., extracting shared variants, centralizing data) could introduce regressions with no safety net. The mode toggle, typing animation, and terminal animation are the most complex interactive behaviors and the most likely to break.
- Priority: **High** — even a smoke test that renders the home page and asserts no console errors would catch component import failures after refactors.

---

*Concerns audit: 2026-08-29*