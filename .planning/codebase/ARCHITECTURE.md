<!-- refreshed: 2026-09-03 -->
# Architecture

**Analysis Date:** 2026-09-03

## System Overview

```text
┌───────────────────────────────────────────────────────────────────────┐
│                        App Router (Next.js 14)                        │
│  `src/app/layout.tsx` (fonts, metadata, JSON-LD, provider shell)      │
│  `src/app/page.tsx` → renders <ModeRouter />                          │
│  `src/app/opengraph-image.tsx` (edge runtime OG image)                │
├───────────────────────────────────────────────────────────────────────┤
│                              Providers                                 │
│  MotionProvider (`components/effects/motion-provider.tsx`)             │
│    └── ModeProvider (`components/context/mode-context.tsx`)            │
│          ├── Navbar / MobileMenu / ModeToggle  (`components/layout/`)  │
│          └── <main>{children}</main> → Footer                          │
├───────────────────────────────────────────────────────────────────────┤
│                     ModeRouter (client switch)                         │
│            `components/layout/mode-router.tsx`                         │
│   mode === "ios"                    mode === "ai"                     │
│   ├─ HeroSection (static)           ├─ AIHeroSection (dynamic,ssr:off) │
│   ├─ AboutSection (static)          ├─ AIWorkflowSection (dynamic)     │
│   ├─ ExperienceSection (static)     ├─ AISkillsSection (dynamic)       │
│   ├─ SkillsSection (static)         ├─ AIExperienceSection (dynamic)   │
│   ├─ ProjectsSection (static)       └─ AIProjectsSection (dynamic)     │
│   ├─ SideProjectsSection (static)                                      │
│   └─ ContactSection (shared across both modes)                         │
├───────────────────────────────────────────────────────────────────────┤
│                        Static Data Layer                               │
│  `components/data/experience-data.ts` · `projects-data.ts`            │
│  `skills-data.ts` · `side-projects-data.ts` · `ai-resume-data.ts`     │
├───────────────────────────────────────────────────────────────────────┤
│                    UI Primitives / Effects / Hooks                     │
│  `components/ui/*` (barrel: `components/ui/index.ts`)                  │
│  `components/effects/*` (variants, ScrollReveal)                       │
│  `components/hooks/use-typing-animation.ts` · `lib/utils.ts` (cn)      │
└───────────────────────────────────────────────────────────────────────┘
         │
         ▼
┌───────────────────────────────────────────────────────────────────────┐
│  Browser state: localStorage key `portfolio-mode` + URL `?mode=`       │
│  Static assets: `public/` (resume PDF, screenshots, sitemap, robots)   │
└───────────────────────────────────────────────────────────────────────┘
```

## Component Responsibilities

| Component | Responsibility | File |
|-----------|----------------|------|
| RootLayout | Server component: Google fonts (`Space_Grotesk`, `DM_Sans`), full SEO metadata, JSON-LD Person schema, provider composition, skip-to-content link | `src/app/layout.tsx` |
| Home page | Single route entry; delegates everything to ModeRouter | `src/app/page.tsx` |
| OgImage | Edge-runtime generated OpenGraph image (1200x630) | `src/app/opengraph-image.tsx` |
| ModeProvider | Owns `mode: "ios" \| "ai"` state; hydrates from URL param (precedence) then localStorage; persists on change; updates `document.title` per mode | `components/context/mode-context.tsx` |
| useMode | Context consumer hook; throws if used outside ModeProvider | `components/context/mode-context.tsx` |
| ModeRouter | Client-side mode switch: renders iOS sections (static imports) vs AI sections (`next/dynamic` with `ssr: false` + skeleton); wraps switch in `AnimatePresence` fade; renders iOS content pre-hydration to avoid layout shift | `components/layout/mode-router.tsx` |
| Navbar | Fixed floating header; logo, mode-aware nav links, ModeToggle, MobileMenu trigger | `components/layout/navbar.tsx` |
| ModeToggle | Accessible segmented iOS/AI radio-group toggle with 500ms cooldown and sliding indicator (`layoutId`) | `components/layout/mode-toggle.tsx` |
| NAV_LINKS_BY_MODE | Per-mode anchor link config (id anchors `#about`, `#ai-workflow`, ...) | `components/layout/nav-links.ts` |
| MobileMenu | Slide-over menu, Escape-to-close, outside-click handling | `components/layout/mobile-menu.tsx` |
| Footer | Social links (inline SVGs) + footer nav | `components/layout/footer.tsx` |
| iOS sections | Hero, About, Experience, Skills, Projects, Side Projects — all import data from `components/data/*` | `components/sections/*-section.tsx` |
| AI sections | AI-flavored resume: terminal hero (typing animation), workflow steps, skill bars, AI-impact experience, GitHub-style projects — all import from `components/data/ai-resume-data.ts` | `components/sections/ai-*-section.tsx` |
| ContactSection | Shared contact CTA rendered in both modes (outside AnimatePresence) | `components/sections/contact-section.tsx` |
| MotionProvider | `LazyMotion` (domAnimation, strict) + `MotionConfig` respecting `prefers-reduced-motion`; requires all components use `m` not `motion` | `components/effects/motion-provider.tsx` |
| ScrollReveal | Generic in-view fade-up wrapper (`useInView`, once, 30% threshold) | `components/effects/scroll-reveal.tsx` |
| animation-variants | Shared motion presets: springs, fadeInUp, stagger container/item, cardHover, page variants | `components/effects/animation-variants.ts` |
| useTypingAnimation | rAF-driven type/pause/delete cycling hook used by AI hero terminal | `components/hooks/use-typing-animation.ts` |
| UI primitives | Card, Button, Badge, StatBadge, RatingBadge, ProjectCard, SideProjectCard, SocialLink, social icons; barrel-exported | `components/ui/` (`index.ts`) |
| cn helper | `clsx` + `tailwind-merge` class composition; the ONLY export of `lib/utils.ts` | `lib/utils.ts` |

## Pattern Overview

**Overall:** Single-page Next.js App Router application with client-side dual-mode composition (no routing beyond `/`). Presentation-oriented component architecture: App Router shell → React Context (mode) → mode-routed section composition → static typed data modules → UI primitives.

**Key Characteristics:**
- Server/client split is minimal: only `src/app/layout.tsx` and `src/app/page.tsx` are server components; virtually everything under `components/` is `"use client"`.
- Content is code: all résumé/project data lives in typed TypeScript modules under `components/data/`, imported directly — no CMS, no API, no database.
- Mode strategy (iOS = default/SSR, AI = dynamically imported with `ssr: false`) is the central architectural decision; every mode-aware piece (nav, sections, title) keys off `ModeContext`.
- Styling is Tailwind utility classes composed via `cn()`, backed by CSS variables in `src/app/globals.css` and a neo-brutalist token set in `tailwind.config.ts`.
- Animation is centralized: `LazyMotion strict` forces `m` component usage; shared variants in `components/effects/animation-variants.ts`; reduced-motion respected globally.

## Layers

**App Router layer:**
- Purpose: HTML shell, fonts, SEO metadata (OpenGraph, Twitter, JSON-LD), OG image generation
- Location: `src/app/`
- Contains: `layout.tsx`, `page.tsx`, `opengraph-image.tsx`, `globals.css`, local `fonts/` (Geist woff files, currently unused by layout)
- Depends on: providers and layout components in `components/`
- Used by: Next.js framework only

**Layout/navigation layer:**
- Purpose: persistent chrome (navbar, footer, mobile menu) + mode switching machinery
- Location: `components/layout/`
- Contains: navbar, footer, mobile-menu, mode-toggle, mode-router, nav-links
- Depends on: `components/context/mode-context.tsx`, `components/ui/*`, `lib/utils.ts`
- Used by: `src/app/layout.tsx` (Navbar, Footer), `src/app/page.tsx` (ModeRouter)

**Section layer:**
- Purpose: full-width page sections composing data + UI primitives + motion
- Location: `components/sections/`
- Contains: 7 iOS/shared sections + 5 AI sections, all named `<name>-section.tsx`
- Depends on: `components/data/*`, `components/ui/*`, `components/effects/*`, `components/hooks/*`
- Used by: `components/layout/mode-router.tsx` exclusively

**Data layer:**
- Purpose: typed static content (the site's "CMS"). Each file exports an `interface` + a const array/object
- Location: `components/data/`
- Contains: `experience-data.ts`, `projects-data.ts`, `skills-data.ts`, `side-projects-data.ts`, `ai-resume-data.ts` (single file for ALL AI-mode content)
- Depends on: nothing (leaf layer)
- Used by: sections layer
- Rule (documented in file header of `ai-resume-data.ts`): components must NOT hardcode content values; they import from this file

**UI primitive layer:**
- Purpose: dumb reusable presentational components
- Location: `components/ui/` with barrel re-exports in `components/ui/index.ts`
- Depends on: `lib/utils.ts` (cn), Tailwind tokens
- Used by: sections, layout

**Effects/hooks layer:**
- Purpose: motion infrastructure and reusable client hooks
- Location: `components/effects/`, `components/hooks/`
- Contains: `motion-provider.tsx`, `scroll-reveal.tsx`, `animation-variants.ts`, `use-typing-animation.ts`
- Used by: layout root (`motion-provider`), sections (`m`, variants, ScrollReveal)

**Utilities:**
- Location: `lib/utils.ts`
- Contains: only `cn()`

## Data Flow

### Primary Request Path (page load)

1. Next.js renders `RootLayout` server-side — fonts, metadata, JSON-LD (`src/app/layout.tsx:85`)
2. `Home` renders `<ModeRouter />` (`src/app/page.tsx:4`)
3. Pre-hydration (server HTML): ModeRouter returns `IOSContent` + `ContactSection` because `mounted === false` (`components/layout/mode-router.tsx:89-96`) — iOS mode is the SSR default so first paint never shifts
4. `ModeProvider` mounts; `useEffect` reads `?mode=` URL param (takes precedence) then `localStorage["portfolio-mode"]`, both validated against the `ALLOWED_MODES` allowlist (`components/context/mode-context.tsx:49-62`)
5. If mode is `ai`, AI sections load via `next/dynamic` with `ssr: false`, showing `SectionSkeleton` during chunk fetch (`components/layout/mode-router.tsx:17-36`)
6. Sections import their content directly from `components/data/*.ts` and render UI primitives animated with `m` + shared variants

### Mode Toggle Flow

1. User clicks a segment in `ModeToggle` (500ms cooldown guard, `components/layout/mode-toggle.tsx:18-29`)
2. `setMode(next)` validates against allowlist, sets state, writes `localStorage`, rewrites URL via `history.replaceState` (deletes `?mode` for the default `ios` mode), updates `document.title` from `TITLES` map (`components/context/mode-context.tsx:64-81`)
3. `ModeRouter` re-renders; `AnimatePresence mode="wait"` fades out old section tree, fades in new (`components/layout/mode-router.tsx:100-104`)
4. `Navbar`/`MobileMenu` swap link sets via `NAV_LINKS_BY_MODE[mode]` (`components/layout/nav-links.ts`)

**State Management:**
- Single React Context: `ModeContext` (`mode`, `setMode`, `mounted`)
- Persistence: `localStorage` key `portfolio-mode` + URL search param `mode`
- No global state library; per-component `useState`/refs everywhere else
- No server state / data fetching — all content is bundled

## Key Abstractions

**ModeContext + useMode hook:**
- Purpose: the app's only shared state — which résumé persona is displayed
- Examples: `components/context/mode-context.tsx`
- Pattern: createContext with null default + null-check throw in consumer; untrusted input (URL/localStorage) validated by `isValidMode` type guard before use

**Typed static data modules:**
- Purpose: content-as-code. File header comment in `ai-resume-data.ts` mandates: "Components must NOT hardcode values; they import from this file"
- Examples: `components/data/projects-data.ts` (`interface Project` + `export const projects: Project[]`), `components/data/ai-resume-data.ts` (9 interfaces, 6 exported consts)
- Pattern: one file per domain, interface + const array export, leaf layer with zero imports

**Section component:**
- Purpose: one `<section id="...">` anchor block per page region
- Examples: `components/sections/hero-section.tsx`, `components/sections/ai-hero-section.tsx`
- Pattern: `"use client"`; local `containerVariants`/`itemVariants` (or imports from `components/effects/animation-variants.ts`); `<m.div>` wrappers; data imported from `components/data/`; section `id` must match `NAV_LINKS_BY_MODE` anchors (`#about`, `#ai-workflow`, ...)

**UI barrel:**
- Purpose: single import surface for primitives — `import { Card, Button } from "@/components/ui"`
- Examples: `components/ui/index.ts`
- Pattern: explicit named re-exports per component; sections may also deep-import (`./social-link` is not in the barrel)

**Motion system:**
- Purpose: consistent animation with small bundle (`LazyMotion domAnimation strict`) and accessibility (`reducedMotion`)
- Examples: `components/effects/motion-provider.tsx`, `components/effects/animation-variants.ts`, `components/effects/scroll-reveal.tsx`
- Pattern: ALWAYS import `m` from `framer-motion` (never `motion` — `strict` mode will throw); reuse presets before defining new variants

## Entry Points

**Root layout:**
- Location: `src/app/layout.tsx`
- Triggers: every request (App Router shell)
- Responsibilities: font loading via `next/font/google` (CSS vars `--font-heading`, `--font-body`), full SEO `Metadata` export, Person JSON-LD, provider nesting (MotionProvider → ModeProvider), Navbar/Footer chrome, skip-link

**Home page:**
- Location: `src/app/page.tsx`
- Triggers: GET `/`
- Responsibilities: delegates to ModeRouter; contains no logic

**OG image route:**
- Location: `src/app/opengraph-image.tsx`
- Triggers: metadata consumers (social scrapers)
- Responsibilities: edge-runtime `ImageResponse` (1200x630)

**Mode toggle (user entry point):**
- Location: `components/layout/mode-toggle.tsx`
- Triggers: user click / `?mode=ai` URL / returning visitor localStorage
- Responsibilities: persona switch described in Mode Toggle Flow above

## Architectural Constraints

- **Rendering model:** Standard Next.js single-threaded event loop. No workers, no streaming beyond framework defaults. `reactStrictMode: true` (`next.config.mjs`)
- **SSR boundary:** ALL AI-mode sections are `ssr: false` dynamic imports — they can never use server-only features; iOS sections are SSR'd and must stay hydration-safe (no `localStorage`/`window` during render — ModeProvider guards with `mounted`)
- **Motion constraint:** `LazyMotion strict` means importing `motion` from `framer-motion` throws at runtime; always use `m` (`components/effects/motion-provider.tsx:13`)
- **Path alias:** `@/*` maps to the REPO ROOT (`tsconfig.json` paths), not `src/*` — imports are `@/components/...`, `@/lib/...`. New top-level source dirs are automatically aliasable; do NOT move `components/` under `src/` without updating every import
- **Global state:** Only `ModeContext`. Module-level singletons: data consts in `components/data/*` (immutable), variant consts (immutable)
- **Security headers:** `X-Frame-Options: DENY`, `X-Content-Type-Options: nosniff`, `Referrer-Policy: strict-origin-when-cross-origin`, `Permissions-Policy` lockdown applied to all routes in `next.config.mjs`
- **Single route:** No `app/api/`, no route handlers, no dynamic segments. New pages go in `src/app/<segment>/page.tsx`
- **Circular imports:** None observed. Layering is strictly one-directional: app → layout → sections → (data, ui, effects) → lib
- **Theme constraint:** Dark-mode scaffolding exists (`components/theme/theme-provider.tsx`, `next-themes` dependency, Sun/Moon icons in `components/ui/social-icons.tsx`) but ThemeProvider is NOT wired into `src/app/layout.tsx`; the palette in `globals.css` is light-only neo-brutalist. Do not assume dark mode works

## Anti-Patterns

### Hardcoded colors bypassing design tokens

**What happens:** Sections use literal colors like `bg-[#f8f9fa]` (`components/sections/hero-section.tsx:53`, `components/sections/ai-hero-section.tsx:48`) even though `--background: #f8f9fa` exists as `bg-background`
**Why it's wrong:** Token changes in `src/app/globals.css` will not propagate; drift between sections
**Do this instead:** Use the Tailwind token classes (`bg-background`, `text-foreground`, `border-border`, `shadow-brutal`) mapped in `tailwind.config.ts`

### Duplicate local variants instead of shared presets

**What happens:** `hero-section.tsx` and `ai-hero-section.tsx` each define identical local `containerVariants`/`itemVariants` instead of importing `staggerContainer`/`staggerItem` from `components/effects/animation-variants.ts`
**Why it's wrong:** Animation timing drifts between modes; the effects module exists precisely to prevent this
**Do this instead:** Import shared presets from `components/effects/animation-variants.ts`; add new presets there when a genuinely new motion is needed

### Unwired scaffolding left in tree

**What happens:** `components/theme/theme-provider.tsx` + `next-themes` dependency + `PageTransition` (`components/layout/page-transition.tsx`, dead because there is one route) exist but are referenced by nothing
**Why it's wrong:** Misleads future work into assuming dark mode/route transitions are active; inflates dependency surface
**Do this instead:** Either wire them intentionally (add `<ThemeProvider>` inside `src/app/layout.tsx`) or delete; do not build on top assuming they function

## Error Handling

**Strategy:** Minimal, client-side only. No error boundaries, no global error handlers, no logging.

**Patterns:**
- Context consumer guard: `useMode` throws `"useMode must be used within ModeProvider"` (`components/context/mode-context.tsx:36`)
- Input validation: `isValidMode` type guard rejects bad `?mode=` values and corrupted localStorage instead of crashing (`components/context/mode-context.tsx:22-24`)
- Action guards: `setMode` silently no-ops on invalid values; `ModeToggle` cooldown ref prevents rapid toggle spam
- Data completeness: optional fields (`stat?`, `aiImpact?`, `appStoreUrl?`) in data interfaces let sections render conditionally rather than crash

## Cross-Cutting Concerns

**Logging:** None (no console usage policy, no observability — appropriate for a static portfolio)

**Validation:** `isValidMode` allowlist for user-controllable mode input; TypeScript strict mode (`tsconfig.json` `"strict": true`) for everything else; ESLint via `eslint-config-next` (`.eslintrc.json`)

**Authentication:** None — public static site; no PII beyond contact email/social URLs already intended for publication

**Accessibility (built-in):** skip-to-content link (`src/app/layout.tsx:104-109`), `prefers-reduced-motion` honored both in MotionConfig and CSS (`src/app/globals.css:47-56`), `role="radiogroup"`/`aria-checked` on mode toggle, Escape/outside-click close on mobile menu, `focus-visible` rings

**SEO:** metadata export in `src/app/layout.tsx` (canonical, OpenGraph, Twitter cards), JSON-LD Person schema, `public/sitemap.xml` + `public/robots.txt`, edge OG image route

---

*Architecture analysis: 2026-09-03*
