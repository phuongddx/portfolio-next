# Codebase Concerns

**Analysis Date:** 2026-09-03

## Tech Debt

**Dual-mode content duplication (iOS vs AI portfolio):**
- Issue: Every resume/CV concept exists twice — parallel section components (`hero-section.tsx` / `ai-hero-section.tsx`, `experience-section.tsx` / `ai-experience-section.tsx`, `skills-section.tsx` / `ai-skills-section.tsx`, `projects-section.tsx` / `ai-projects-section.tsx`) AND parallel data files (`components/data/experience-data.ts` vs `aiExperiences` in `components/data/ai-resume-data.ts`, `skills-data.ts` vs `aiSkillCategories`). A single career update (e.g. adding/removing a job) must be made in 2 data files + up to 4 section components, and both representations drift in wording.
- Files: `components/data/experience-data.ts`, `components/data/ai-resume-data.ts`, `components/data/skills-data.ts`, `components/data/projects-data.ts`, `components/sections/*`
- Impact: Already demonstrated — the current working tree has an uncommitted HVA App update touching `experience-data.ts`, `ai-resume-data.ts`, `ai-hero-section.tsx`, and `experience-section.tsx` simultaneously. Wording between the two modes has drifted (e.g. iOS mode Axon title "Software Engineer (iOS)" vs AI mode "Software Engineer").
- Fix approach: Extract a single canonical experience/skills/projects source of truth; derive per-mode views (different highlight projections) from it. Keep section components parameterized instead of cloned.

**Duplicated motion-variant constants:**
- Issue: `containerVariants` / `cardVariants` / `itemVariants` spring blocks are copy-pasted locally in ~8 section files, while a central presets module exists but is never imported.
- Files: `components/effects/animation-variants.ts` (unused), duplicates in `components/sections/hero-section.tsx`, `components/sections/ai-hero-section.tsx`, `components/sections/contact-section.tsx`, `components/sections/skills-section.tsx`, `components/sections/experience-section.tsx`, `components/sections/projects-section.tsx`, `components/sections/side-projects-section.tsx`, `components/ui/card.tsx`
- Impact: Tuning motion (stiffness/damping/stagger) requires editing many files; presets module is dead weight.
- Fix approach: Import presets from `components/effects/animation-variants.ts` (or delete that file and accept local variants — pick one).

**Dead code / dead dependencies:**
- Issue: Multiple components and one dependency are never imported.
- Files:
  - `components/theme/theme-provider.tsx` — wraps `next-themes`; never imported. `next-themes` dependency in `package.json` is unused.
  - `components/ui/project-card.tsx` — never imported; both projects sections define their own local `ProjectCard`.
  - `components/ui/rating-badge.tsx` — never rendered anywhere.
  - `components/ui/index.ts` — barrel file never imported by anything.
  - `components/effects/animation-variants.ts` — never imported.
  - `components/layout/page-transition.tsx` — never imported.
  - `SunIcon` / `MoonIcon` exports in `components/ui/social-icons.tsx` — never used.
  - `components/icons/` — empty directory.
  - `screenshots` field in `components/data/projects-data.ts` — defined (and the referenced webp/png files ship in `public/screenshots/`) but never rendered; no `<img>` or `next/image` exists anywhere in the app.
- Impact: Misleads contributors about the real component surface; bundle-irrelevant but maintenance-relevant.
- Fix approach: Delete the listed files/exports, remove `next-themes` from `package.json`, and either render screenshots or drop the field + assets.

**Vestigial design-token system:**
- Issue: `tailwind.config.ts` defines a token palette (`primary`, `secondary`, `muted`, `accent-*`, `cta: #2563EB`) backed by CSS variables in `src/app/globals.css`. Live neo-brutalist sections hardcode `text-gray-800` / `bg-green-500` / `border-gray-800` instead. Only the dead `components/ui/project-card.tsx`, `components/ui/side-project-card.tsx`, and the skip link (`focus:bg-cta`) still use tokens — producing visual inconsistencies (e.g. `border-t border-white/20` divider invisible on white cards, blue `text-cta` in an otherwise green palette).
- Files: `tailwind.config.ts`, `src/app/globals.css`, `components/ui/side-project-card.tsx`, `components/ui/project-card.tsx`
- Impact: Two styling systems coexist; token renames do nothing for most of the UI; `side-project-card.tsx` visually diverges from the rest of the cards.
- Fix approach: Either migrate live components onto tokens or strip tokens down to what's used; restyle `side-project-card.tsx` to the neo-brutalist classes used by sibling cards.

**Hardcoded production URL in three places:**
- Issue: `https://portfolio-phi-lac-67.vercel.app` is duplicated in `src/app/layout.tsx` (`siteUrl`), `public/robots.txt`, and `public/sitemap.xml`. `sitemap.xml` `lastmod` (2026-03-23) is manually maintained and stale.
- Files: `src/app/layout.tsx:19`, `public/robots.txt`, `public/sitemap.xml`
- Impact: Switching to a custom domain requires three coordinated edits; sitemap freshness decays silently.
- Fix approach: Drive robots/sitemap from a single constant (or generate `app/sitemap.ts` / `app/robots.ts` from Next metadata) reading `NEXT_PUBLIC_SITE_URL`.

**Stale/misleading documentation:**
- Issue: `README.md` claims "Dark/Light Theme: System preference detection with manual toggle" and "Glassmorphism Design" — no theme toggle exists (ThemeProvider is dead code) and the design is neo-brutalist. `docs/ai/*/README.md` are empty template placeholders.
- Files: `README.md`, `docs/ai/design/README.md`, `docs/ai/implementation/README.md`, `docs/ai/planning/README.md`, `docs/ai/requirements/README.md`, `docs/ai/testing/README.md`
- Impact: Future agents/developers build on wrong assumptions (e.g. "just wire up the theme toggle").
- Fix approach: Rewrite README feature list to match reality (neo-brutalist, dual-mode toggle, print-to-PDF); delete or fill `docs/ai/` templates.

**Repository hygiene / uncommitted drift:**
- Issue: Working tree carries substantial uncommitted drift: re-added HVA App entries in both experience data files + sections, replaced `public/DoanPhuong.pdf` (600KB, uncommitted), deleted-but-still-tracked `resources/resume-latest.pdf` and `resources/resume.pdf`, and deleted `.planning/codebase/*.md` docs. Untracked clutter at root: `repomix-output.xml` (2.4MB), `header-ui.png`, `introduce-myself.html` (this one IS tracked), `.ai-devkit.json`, `engineer.yaml`, `.omx/`, `.claude/`. None of the clutter is in `.gitignore`.
- Files: repo root, `resources/`, `public/DoanPhuong.pdf`, `.gitignore`
- Impact: History/checkout confusion; risk of accidentally committing a 2.4MB repomix dump; resume PDF binary churn bloats repo history with each update.
- Fix approach: Commit or explicitly revert the data-file drift; add `repomix-output.xml`, `*.png` scratch files, and tool dirs to `.gitignore`; move `introduce-myself.html` under `docs/` or `plans/`; consider Git LFS or a release-asset link for the resume PDF.

**Tailwind content globs point at non-existent paths:**
- Issue: `tailwind.config.ts` scans `./src/pages/**` and `./src/components/**` (neither exists; real components live at root `./components`).
- Files: `tailwind.config.ts`
- Impact: Harmless today but misleading; class purge silently misses future files placed in unscanned locations.
- Fix approach: Remove the dead globs.

**Dependency currency:**
- Issue: `next` 14.2.35 (latest 16.3.4), `react`/`react-dom` 18.3.1 (latest 19.2.8), `framer-motion` 11.18.2 (latest 13.2.0), `tailwindcss` 3.4.19 (latest 4.3.3), `eslint` 8 (latest 10). All are pinned/caret within the same major.
- Files: `package.json`
- Impact: Two majors behind on Next/React; `next lint` is deprecated in Next 15+ so the upgrade forces config changes. No known exploit-driven urgency for this static site, but security patches eventually stop backporting to 14.x.
- Fix approach: Plan a combined Next 15/16 + React 19 + framer-motion 12/13 upgrade as its own phase; Tailwind 4 is a separate breaking migration (CSS-first config).

## Known Bugs

**Broken Twitter card image (404):**
- Symptoms: `twitter:image` resolves to `https://portfolio-phi-lac-67.vercel.app/opengraph-image.png`, which does not exist — no such file in `public/` and the file-convention route serves `/opengraph-image` (no `.png`). Verified in build output: `.next/server/app/index.html` contains the bad `twitter:image` URL while `og:image` correctly points at the file-convention route `/opengraph-image?a1c6cfd2556e4e07`.
- Files: `src/app/layout.tsx:58` (`twitter.images: ["/opengraph-image.png"]`), `src/app/opengraph-image.tsx`
- Trigger: Any tweet/link-unfurl of the site.
- Workaround: Remove the explicit `twitter.images` (the `opengraph-image.tsx` file convention already feeds both OG and Twitter cards) or point it at `/opengraph-image`.

**Navbar logo anchor broken in AI mode:**
- Symptoms: Logo link is `href="#hero"` (`components/layout/navbar.tsx:34`), but in AI mode the hero section renders with `id="ai-hero"` (`components/sections/ai-hero-section.tsx:50`) — no `#hero` element exists, so the logo click does nothing.
- Files: `components/layout/navbar.tsx`, `components/sections/ai-hero-section.tsx`, `components/layout/nav-links.ts`
- Trigger: Toggle to AI mode, click the "DP" logo.
- Workaround: Make the logo href mode-aware via `NAV_LINKS_BY_MODE`-style mapping or give both heroes a shared anchor id.

**Page title not updated when landing with `?mode=ai`:**
- Symptoms: `document.title` is only changed inside `setMode` (`components/context/mode-context.tsx:80`). The mount effect calls `setModeState(urlMode)` directly, so loading the page with `?mode=ai` keeps the server title "iOS Software Engineer | Doan Duy Phuong" while showing AI content.
- Files: `components/context/mode-context.tsx:49-62`
- Trigger: Visit `/ ?mode=ai` (or arrive via a shared AI-mode link); check the tab title.
- Workaround: In the mount effect, also set `document.title = TITLES[resolvedMode]`.

**Fabricated repo slugs on side-project cards:**
- Symptoms: `components/ui/side-project-card.tsx` derives the displayed repo path from the project title (`phuongddx/{title.toLowerCase().replace(/\s+/g,"-")}`). For 2 of 3 projects this is wrong: "StressMonitor" → `phuongddx/stressmonitor` (real repo: `NextGen-Limited/ios-stress-app`), "Trending Movies" → `phuongddx/trending-movies` (real: `phuongddx/trending-movie-ios`). The anchor `href` is correct; only the visible monospace text lies.
- Files: `components/ui/side-project-card.tsx`, `components/data/side-projects-data.ts`
- Trigger: Visual inspection of Side Projects cards.
- Workaround: Store the full repo slug in `side-projects-data.ts` instead of computing it.

**Print/PDF export loses AI experience content:**
- Symptoms: Print CSS hides every `button` (`src/app/globals.css:95`). AI experience card headers are `<button>` elements and default to `expanded=false`, so printing in AI mode produces experience entries with no title/company/period and no highlights.
- Files: `src/app/globals.css:92-97`, `components/sections/ai-experience-section.tsx:35-45`
- Trigger: Toggle AI mode → browser Print / Save as PDF.
- Workaround: In print CSS, target the toggle controls (e.g. a `data-print-expand` or `.no-print` class) instead of all buttons, and force-expand collapsed content for print (or set headers to non-button elements with an absolutely-positioned toggle).

**Post-hydration remount flash:**
- Symptoms: `ModeRouter` returns a bare fragment (`IOSContent` + `ContactSection`) while `!mounted`, then switches to the `AnimatePresence`-wrapped tree after mount (`components/layout/mode-router.tsx:89-108`). The tree shape change remounts all sections and `ContactSection` for every visitor — entrance animations replay and a flicker is visible; users with AI mode stored in localStorage additionally see the full iOS page flash first (AI sections are `ssr: false`).
- Files: `components/layout/mode-router.tsx`, `components/context/mode-context.tsx`
- Trigger: Every page load; worst for returning AI-mode users on slow connections.
- Workaround: Keep a stable wrapper structure across the mount boundary (e.g. always render `AnimatePresence`/`m.div` with a stable key, or suppress via CSS opacity until mounted), and consider reading the mode cookie server-side to avoid the iOS-first flash entirely.

**Fragile print CSS selectors:**
- Symptoms: `[style*="visibility"]` forces any element with inline visibility visible in print, and `[class*="border-2"]` rewrites every bordered element's border — both are string-matching heuristics that break when unrelated components use those attributes (previously flagged in the 2026-04-15 code review as L3, still present).
- Files: `src/app/globals.css:111-125`
- Trigger: Adding any component with inline `visibility` or `border-2` breaks its print rendering silently.
- Workaround: Use explicit marker classes (`print-hide`, `print-line`) on the elements that opt in.

## Security Considerations

**Missing CSP and HSTS headers:**
- Risk: No `Content-Security-Policy` (no protection against injected inline scripts beyond luck) and no `Strict-Transport-Security`. Present headers (X-Frame-Options DENY, nosniff, Referrer-Policy, Permissions-Policy) are configured in `next.config.mjs:4-28`.
- Files: `next.config.mjs`
- Current mitigation: Fully static content, no user input, no third-party scripts. JSON-LD injected via `dangerouslySetInnerHTML` is hardcoded (`src/app/layout.tsx:93-96`) — no XSS vector today.
- Recommendations: Add a nonce-less CSP (`default-src 'self'` + `style-src 'self' 'unsafe-inline'` for Framer Motion inline styles) and HSTS once a custom domain is used. Low priority for a static portfolio.

**Mode URL parameter — validated:**
- Risk: `?mode=` is read from the URL and written to state/localStorage.
- Files: `components/context/mode-context.tsx:22-24,49-59`
- Current mitigation: Allowlist validation (`isValidMode`) rejects anything not `ios`/`ai`. No DOM sink. No issue.

**Personal data exposure (accepted tradeoff):**
- Risk: Email `95doanphuong@gmail.com` appears in plaintext in JSON-LD, contact section, and both hero sections — trivially scrapable.
- Files: `src/app/layout.tsx:72`, `components/sections/contact-section.tsx:21-22`, `components/sections/hero-section.tsx:127`, `components/sections/ai-hero-section.tsx:113`
- Current mitigation: None (intentional for a job-seeking portfolio).
- Recommendations: Accept as-is; consider an obfuscated contact form only if spam becomes a problem.

**No secrets in repo:**
- No `.env` files present; `.gitignore` covers `.env*.local`. Untracked tool configs (`.ai-devkit.json`, `engineer.yaml`, `.omx/`, `.claude/`) are agent-tooling metadata, not credentials — but audit before ever committing them.

## Performance Bottlenecks

**Typing animation runs an unthrottled rAF loop:**
- Problem: `useTypingAnimation` (`components/hooks/use-typing-animation.ts`) schedules `requestAnimationFrame` forever at ~50ms intervals even when the display string is unchanged (during the 1.5s pause it keeps calling `setDisplay` with the same value; React bails out but the loop still runs).
- Files: `components/hooks/use-typing-animation.ts`
- Cause: Single rAF loop design with pause handled via state flag rather than suspending the loop.
- Improvement path: Pause the loop while waiting (restart rAF from the `setTimeout` callback). Negligible impact today (one consumer, AI hero only) — low priority.

**Imperative DOM manipulation in terminal animation:**
- Problem: `AIWorkflowSection` types terminal lines by mutating `el.textContent` / `el.style.visibility` directly inside timers + rAF (`components/sections/ai-workflow-section.tsx:27-75`), fighting React's rendering model.
- Files: `components/sections/ai-workflow-section.tsx`
- Cause: Performance-optimized choice (avoids re-render per character; ~18 lines of DOM). Cleanup is now correct (frame IDs tracked in a ref — this fixed review finding C1).
- Improvement path: Acceptable as-is; if touched again, prefer driving line state through a small state machine so React stays the source of truth.

**Large PDF binary served from public/:**
- Problem: `public/DoanPhuong.pdf` is ~600KB, replaced wholesale on each resume update (binary churn in git history each time).
- Files: `public/DoanPhuong.pdf`
- Improvement path: Host externally (release asset / cloud storage) or use Git LFS if update frequency grows.

**No image optimization in play:**
- Problem: Neither `next/image` nor `<img>` is used anywhere — fine today since no raster images render — but the shipped screenshot assets (`public/screenshots/**`, `resources/app-store-screenshot/**`) are dead weight if never displayed.
- Files: `public/screenshots/`, `resources/app-store-screenshot/`, `components/data/projects-data.ts` (`screenshots` field unused)
- Improvement path: Remove unused assets or, if screenshots return, adopt `next/image` for them.

## Fragile Areas

**Mode persistence (localStorage + URL + document.title sync):**
- Files: `components/context/mode-context.tsx`, `components/layout/mode-router.tsx`
- Why fragile: Three sources of truth (localStorage, `?mode=` param, default) resolve in one mount effect; title strings are duplicated between `TITLES` in mode-context and `metadata` in `src/app/layout.tsx`; `replaceState` mutates the URL without notifying Next's router.
- Safe modification: Keep resolution precedence (URL > storage > default) intact; if adding a third mode, update `ALLOWED_MODES`, `TITLES`, `NAV_LINKS_BY_MODE`, and `ModeRouter` branches together.
- Test coverage: None (see gaps below).

**AI content is client-only (`ssr: false`):**
- Files: `components/layout/mode-router.tsx:17-36`
- Why fragile: All five AI sections load via `next/dynamic` with `ssr: false` — crawlers and no-JS visitors see iOS content only; `?mode=ai` links don't server-render AI content. Accepted decision (documented in `plans/reports/journal-0415-ai-resume-toggle.md`), but it caps the AI resume's SEO/sharing value.
- Safe modification: If SEO for AI mode becomes a requirement, switch to server-read cookie + SSR-able sections rather than patching `ssr: false` piecemeal.

**Icon/color lookup maps keyed by display strings:**
- Files: `components/sections/experience-section.tsx:17-24` (`companyIcons` has a stale `"SP Group"` key while data uses "S3 Corp" — falls back to 💼), `components/sections/skills-section.tsx:17-24` (`categoryIcons` missing the `services` category — falls back to 📌), `components/sections/ai-skills-section.tsx:8-15` (`categoryColors` missing "Security" — bars render gray), `components/sections/projects-section.tsx` (`categoryIcons` keyed by category strings)
- Why fragile: Renaming a company/category/title in data silently changes icons/colors via `??` fallbacks with no type-level check.
- Safe modification: Key these maps by the stable `id` field (data already has `id`s) or co-locate color/icon on the data records.

**Emoji-as-icon without `aria-hidden`:**
- Files: `components/sections/experience-section.tsx`, `components/sections/skills-section.tsx`, `components/sections/projects-section.tsx`, `components/ui/stat-badge.tsx` (emoji icons passed as `icon` nodes)
- Why fragile: Screen readers announce emoji names ("money bag", "rocket"); AI sections do this correctly with `aria-hidden` wrappers but iOS-mode sections don't.
- Safe modification: Wrap emoji in `<span aria-hidden="true">` when touching these files. Related: animated `SkillBar` meters (`components/sections/ai-skills-section.tsx:62-81`) expose the percentage as text but lack `role="meter"`/`aria-valuenow`.

**`mode-toggle` silent cooldown:**
- Files: `components/layout/mode-toggle.tsx:13,19-28`
- Why fragile: Rapid toggles within 500ms are swallowed without feedback (guard against `AnimatePresence` animation thrash). Users double-clicking see nothing happen.
- Safe modification: Keep the cooldown; consider a subtle disabled state during the window.

## Scaling Limits

**Static single-page portfolio:**
- Current capacity: One route (`/`), ~3.8k LOC of components, all content hardcoded in `components/data/*.ts`. No server data, no database, no auth.
- Limit: Adding a blog, project detail pages, or a contact form breaks assumptions (metadata is page-level static; `sitemap.xml` is hand-written with one URL; no error boundary, no custom `not-found.tsx`, no `loading.tsx`).
- Scaling path: Add routes under `src/app/`, generate sitemap via `app/sitemap.ts`, and introduce an error boundary in the root layout before the site grows beyond one page.

## Dependencies at Risk

**`next` 14.2.x:**
- Risk: Oldest supported line; `next lint` removed in 15+, App Router behaviors (metadata merge, dynamic imports) shifting under upgrades.
- Impact: Blocks React 19, blocks newer `framer-motion`; security patches for 14.x will end.
- Migration plan: Staged upgrade — Next 15 (fix lint config, async headers/request APIs) → React 19 → Next 16. Run `next dev` + build after each step; this repo is small enough for a half-day migration.

**`framer-motion` 11 (now "motion" upstream):**
- Risk: v12+ renamed the package to `motion`; `LazyMotion`/`m` API stable but import paths change.
- Impact: Upgrade touches every `"use client"` component header import.
- Migration plan: Mechanical codemod (`framer-motion` → `motion/react`) during the Next 15+ upgrade phase; do it together, not separately.

**`eslint` 8 + `eslint-config-next` 14:**
- Risk: ESLint 8 is EOL; flat-config ecosystem (ESLint 9/10) required by newer `eslint-config-next`.
- Impact: `npm run lint` breaks on the Next upgrade unless config is migrated to flat config.
- Migration plan: Follow `eslint-config-next` version matching the Next major.

## Missing Critical Features

**Zero automated tests:**
- Problem: No test framework, no test script in `package.json`, no test files anywhere. Static checks pass (`tsc --noEmit` clean, `next lint` clean as of 2026-09-03) but nothing guards behavior.
- Blocks: Safe refactoring of the mode system, data deduplication, or framework upgrades.

**No CI pipeline:**
- Problem: No `.github/workflows/` — typecheck/lint/build run only locally and voluntarily.
- Blocks: Upgrade safety; regression detection on push.

**No analytics or uptime monitoring:**
- Problem: Nothing measures visitors or alert on deploy failure (Vercel deploys unmonitored).
- Blocks: Knowing whether the CRO/SEO work (structured data, OG images) has effect.

**No error boundary / custom error or loading UI:**
- Problem: Root layout has no React error boundary; `not-found` is Next's default. A crash in any client section white-screens the page.
- Blocks: Graceful degradation if a dynamic AI section fails to load.

## Test Coverage Gaps

**Everything — zero tests exist:**
- What's not tested: Highest-risk logic by change frequency: mode resolution/persistence (`components/context/mode-context.tsx`), `ModeRouter` mount/transition behavior (`components/layout/mode-router.tsx`), `useTypingAnimation` timing/cleanup (`components/hooks/use-typing-animation.ts`), terminal animation cleanup (`components/sections/ai-workflow-section.tsx`), and data integrity (e.g. `NAV_LINKS_BY_MODE` hrefs matching rendered section ids — the `#hero`/`#ai-hero` bug above is exactly the class of error a link-target test would catch).
- Files: all of `components/**`, `src/app/**`
- Risk: The known bugs in this document (broken logo anchor, stale title, broken twitter image) shipped unnoticed; refactors will ship more.
- Priority: High — add Vitest + React Testing Library with tests for mode-context and nav-link/section-id consistency first; a lightweight Playwright smoke test (load, toggle mode, print CSS) second; wire both plus `tsc --noEmit` and `next build` into a GitHub Actions workflow.

---

*Concerns audit: 2026-09-03*
