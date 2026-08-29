# Architecture

**Analysis Date:** 2026-08-29

## System Overview

```text
┌─────────────────────────────────────────────────────────────────┐
│                    Next.js App Router (SSR)                     │
│           `src/app/layout.tsx` · `src/app/page.tsx`            │
├───────────────┬─────────────────────┬───────────────────────────┤
│   Layout      │     Page            │    OG Image (Edge)        │
│ `layout.tsx`  │ `page.tsx` →        │ `opengraph-image.tsx`     │
│ fonts, SEO,   │ ModeRouter          │ ImageResponse             │
│ providers     │                      │                           │
└───────┬───────┴─────────┬───────────┴───────────────────────────┘
        │                 │
        ▼                 ▼
┌───────────────────────────────────────────────────────────────┐
│                     Component Tree                             │
├───────────────┬─────────────────────┬───────────────────────────┤
│  Providers    │   Layout Shell      │   Section Orchestrator    │
│ MotionProvider│ Navbar              │ ModeRouter                │
│ ModeProvider  │ Footer              │  ├─ IOSContent (static)   │
│               │ MobileMenu          │  └─ AIContent (dynamic)   │
│               │ ModeToggle          │ ContactSection (shared)   │
└───────┬───────┴─────────┬───────────┴──────────┬────────────────┘
        │                 │                     │
        ▼                 ▼                     ▼
┌──────────────────┐ ┌──────────────┐ ┌─────────────────────────┐
│ Context Layer     │ │ UI Primitives│ │ Data Layer               │
│ `context/`       │ │ `ui/`        │ │ `data/`                  │
│ ModeContext      │ │ Card, Button │ │ experience-data.ts       │
│                  │ │ Badge, etc.  │ │ skills-data.ts           │
│                  │ │              │ │ ai-resume-data.ts        │
│                  │ │              │ │ projects-data.ts         │
│                  │ │              │ │ side-projects-data.ts    │
└──────────────────┘ └──────────────┘ └─────────────────────────┘
```

## Component Responsibilities

| Component | Responsibility | File |
|-----------|----------------|------|
| RootLayout | HTML shell, Google Fonts (Space Grotesk + DM Sans), SEO metadata, JSON-LD, provider wrapping | `src/app/layout.tsx` |
| Home | Delegates entirely to ModeRouter | `src/app/page.tsx` |
| OgImage | Edge-generated Open Graph image via `next/og` ImageResponse | `src/app/opengraph-image.tsx` |
| MotionProvider | Wraps app in Framer Motion LazyMotion + respects `prefers-reduced-motion` | `components/effects/motion-provider.tsx` |
| ModeProvider | Provides `ios` / `ai` mode via React Context; hydrates from `localStorage` + URL param `?mode=` | `components/context/mode-context.tsx` |
| Navbar | Fixed floating nav bar with mode-aware links, logo, CTA buttons, mobile menu trigger | `components/layout/navbar.tsx` |
| ModeToggle | iOS/AI segmented radio toggle with animated indicator | `components/layout/mode-toggle.tsx` |
| ModeRouter | Conditionally renders IOSContent or AIContent sections based on mode; AnimatePresence crossfade | `components/layout/mode-router.tsx` |
| Footer | Site footer with contact links and social icons | `components/layout/footer.tsx` |
| MobileMenu | Full-screen mobile navigation overlay | `components/layout/mobile-menu.tsx` |
| ScrollReveal | Reusable scroll-triggered fade-up animation wrapper | `components/effects/scroll-reveal.tsx` |
| HeroSection | iOS-mode hero with stats, social links, intro text | `components/sections/hero-section.tsx` |
| AIHeroSection | AI-mode hero with terminal typing animation | `components/sections/ai-hero-section.tsx` |
| AboutSection | About me content section (iOS mode) | `components/sections/about-section.tsx` |
| ExperienceSection | Work experience timeline (iOS mode) | `components/sections/experience-section.tsx` |
| SkillsSection | Skill category grid (iOS mode) | `components/sections/skills-section.tsx` |
| ProjectsSection | Featured projects cards (iOS mode) | `components/sections/projects-section.tsx` |
| SideProjectsSection | Side/open-source projects (iOS mode) | `components/sections/side-projects-section.tsx` |
| ContactSection | Contact form / CTA section (shared across both modes) | `components/sections/contact-section.tsx` |
| AIWorkflowSection | AI workflow visualization (AI mode) | `components/sections/ai-workflow-section.tsx` |
| AISkillsSection | AI-focused skills display (AI mode) | `components/sections/ai-skills-section.tsx` |
| AIExperienceSection | AI-impact experience view (AI mode) | `components/sections/ai-experience-section.tsx` |
| AIProjectsSection | AI projects showcase (AI mode) | `components/sections/ai-projects-section.tsx` |

## Pattern Overview

**Overall:** Single-page portfolio with dual-mode content switching (iOS resume vs AI resume), built as a flat component tree over static data files.

**Key Characteristics:**
- **Single-page app with anchor navigation** — all sections render on one route (`/`); navigation uses `#section-id` anchors with `scroll-behavior: smooth`
- **Dual-mode content switching** — a client-side Context (`ModeProvider`) toggles between two full sets of sections (iOS mode and AI mode), persisted to `localStorage` and reflected in the URL query param `?mode=ai`
- **Static data layer** — all resume content (experiences, skills, projects) lives in `components/data/*.ts` as typed constant exports; components import from these files and never hardcode values
- **Progressive enhancement** — AI-mode sections use `next/dynamic` with `ssr: false` so the iOS content renders during SSR; the ModeRouter shows iOS content before client hydration to prevent layout shift
- **No API routes, no server actions, no database** — the entire site is statically generated at build time with no dynamic server-side data fetching

## Layers

**App Router Layer:**
- Purpose: Next.js page routing, layout, SEO metadata, font loading
- Location: `src/app/`
- Contains: `layout.tsx` (root layout), `page.tsx` (home page), `opengraph-image.tsx` (OG image), `globals.css`, font files
- Depends on: `components/layout/`, `components/effects/`, `components/context/`
- Used by: Next.js framework (entry point)

**Layout Shell Layer:**
- Purpose: Page chrome — navigation, footer, mode switching, page transitions
- Location: `components/layout/`
- Contains: `navbar.tsx`, `footer.tsx`, `mobile-menu.tsx`, `mode-toggle.tsx`, `mode-router.tsx`, `page-transition.tsx`, `nav-links.ts`
- Depends on: `components/context/`, `components/ui/`, `components/effects/`, `lib/utils.ts`
- Used by: `src/app/layout.tsx`, `src/app/page.tsx`

**Section Layer:**
- Purpose: Page content sections — each renders a distinct portfolio section (hero, about, experience, skills, projects, contact)
- Location: `components/sections/`
- Contains: 12 section components (6 iOS-mode, 5 AI-mode, 1 shared contact)
- Depends on: `components/data/`, `components/ui/`, `components/effects/`
- Used by: `components/layout/mode-router.tsx`

**UI Primitives Layer:**
- Purpose: Reusable presentational components — cards, buttons, badges, social icons
- Location: `components/ui/`
- Contains: `card.tsx`, `button.tsx`, `badge.tsx`, `stat-badge.tsx`, `rating-badge.tsx`, `project-card.tsx`, `side-project-card.tsx`, `social-icons.tsx`, `social-link.tsx`, `index.ts` (barrel export)
- Depends on: `lib/utils.ts`, external icon approach
- Used by: Sections and layout components

**Data Layer:**
- Purpose: Typed static data — experiences, skills, projects, AI resume content
- Location: `components/data/`
- Contains: `experience-data.ts`, `skills-data.ts`, `projects-data.ts`, `side-projects-data.ts`, `ai-resume-data.ts`
- Depends on: Nothing (pure TypeScript constants and interfaces)
- Used by: Section components

**Context Layer:**
- Purpose: React Context providers for cross-cutting client state
- Location: `components/context/`
- Contains: `mode-context.tsx` (Mode = `"ios"` | `"ai"`)
- Depends on: React
- Used by: `ModeProvider` in layout, `useMode()` hook in navbar/mode-toggle/mode-router

**Effects Layer:**
- Purpose: Animation infrastructure — motion provider, scroll reveal, animation variant definitions
- Location: `components/effects/`
- Contains: `motion-provider.tsx`, `scroll-reveal.tsx`, `animation-variants.ts`
- Depends on: `framer-motion`
- Used by: Layout and section components

**Utilities Layer:**
- Purpose: Shared utility functions
- Location: `lib/`
- Contains: `utils.ts` (`cn` — clsx + tailwind-merge)
- Depends on: `clsx`, `tailwind-merge`
- Used by: Any component needing conditional class merging

## Data Flow

### Primary Request Path

1. **Next.js SSR** — `src/app/layout.tsx` renders the HTML shell with Google Fonts, SEO metadata, JSON-LD structured data, and wraps children in `MotionProvider` > `ModeProvider` > `Navbar` + `<main>` + `Footer`
2. **Page render** — `src/app/page.tsx` returns `<ModeRouter />`
3. **Mode resolution** — `ModeRouter` (`components/layout/mode-router.tsx`) reads `useMode()`; before hydration (SSR), it renders `IOSContent` + `ContactSection` to avoid layout shift; after hydration, it renders the active mode's sections with `AnimatePresence` crossfade
4. **Section rendering** — Each section component imports data from `components/data/*.ts` and renders UI with `components/ui/*` primitives, animated via `components/effects/scroll-reveal.tsx`

### Mode Toggle Flow

1. User clicks `ModeToggle` (`components/layout/mode-toggle.tsx`)
2. `setMode()` called on `ModeContext` with 500ms debounce
3. `ModeProvider` (`components/context/mode-context.tsx`) updates state, persists to `localStorage`, updates URL query param via `history.replaceState`, updates `document.title`
4. `ModeRouter` re-renders with new mode; `AnimatePresence` crossfades between IOSContent and AIContent
5. `Navbar` re-renders with mode-appropriate nav links from `nav-links.ts`

**State Management:**
- Client state is minimal: only the mode toggle (`ios`/`ai`) stored in React Context + `localStorage`
- No global state management library (no Redux, Zustand, etc.)
- All portfolio content is static data imported at build time
- No server-side state, no API calls, no database

## Key Abstractions

**Mode (`"ios"` | `"ai"`):**
- Purpose: Dual-persona portfolio — traditional iOS engineer resume vs AI-focused developer resume
- Examples: `components/context/mode-context.tsx`, `components/layout/mode-router.tsx`, `components/layout/nav-links.ts`
- Pattern: React Context + localStorage persistence + URL query param sync

**Section Component:**
- Purpose: Self-contained page section with its own data imports and scroll-reveal animation
- Examples: `components/sections/hero-section.tsx`, `components/sections/ai-hero-section.tsx`
- Pattern: Named export function component, marked `"use client"`, imports data from `components/data/`, wraps content in `ScrollReveal`

**UI Primitive:**
- Purpose: Reusable presentational component with no data dependencies
- Examples: `components/ui/button.tsx`, `components/ui/card.tsx`, `components/ui/badge.tsx`
- Pattern: Named export, accepts className via `cn()` for composition, barrel-exported from `components/ui/index.ts`

## Entry Points

**Next.js Application:**
- Location: `src/app/layout.tsx` (root layout), `src/app/page.tsx` (home page)
- Triggers: HTTP request to `/`
- Responsibilities: SSR HTML shell, font loading, SEO, JSON-LD, provider hierarchy

**OpenGraph Image Generation:**
- Location: `src/app/opengraph-image.tsx`
- Triggers: Social media crawler requesting `/opengraph-image` (auto-routed by Next.js file convention)
- Responsibilities: Edge Runtime, returns PNG ImageResponse with name, role, stats

**Static Assets:**
- Location: `public/`
- Contains: `DoanPhuong.pdf` (resume), `sitemap.xml`, `robots.txt`, `screenshots/`, `favicon.ico`
- Served directly by Next.js

## Architectural Constraints

- **Threading:** Single-threaded React event loop; no Web Workers or server-side threading
- **Global state:** One module-level Context (`ModeContext` in `components/context/mode-context.tsx`); no other shared mutable state
- **Circular imports:** None detected — dependency graph is acyclic: `app` → `layout` → `sections` → `data` + `ui`; `effects` and `context` are leaf dependencies
- **Static site:** No API routes, no middleware, no server actions — the entire site is a single statically-generated page
- **Single route:** All content lives on `/`; no client-side routing (no `next/link` for page navigation, only anchor links)

## Anti-Patterns

### Duplicated section pairs

**What happens:** Each portfolio section has two variants — an iOS-mode version and an AI-mode version — as separate files (`hero-section.tsx` vs `ai-hero-section.tsx`, `experience-section.tsx` vs `ai-experience-section.tsx`).
**Why it's wrong:** Shared layout, animation, and styling patterns are duplicated across pairs rather than extracted into shared wrappers. Adding a new section requires creating two files.
**Do this instead:** Extract a shared `SectionWrapper` component for consistent layout/animation, and use data-driven rendering where the section component accepts data props from either `experience-data.ts` or `ai-resume-data.ts`.

### Data co-located with components

**What happens:** Data files live inside `components/data/` rather than in a separate `data/` or `content/` directory at the project root.
**Why it's wrong:** Data is not a component. Placing it inside `components/` breaks the separation of concerns and makes it harder to reuse data outside the component tree (e.g., for RSS feeds, sitemap generation, or API routes).
**Do this instead:** Move `components/data/` to a top-level `data/` directory. Update import paths from `@/components/data/` to `@/data/`.

## Error Handling

**Strategy:** No runtime error handling is implemented — the site is static with no API calls or user inputs that could fail.

**Patterns:**
- `ModeContext` throws if `useMode()` is called outside `ModeProvider`: `if (!ctx) throw new Error("useMode must be used within ModeProvider")`
- AI-mode dynamic imports use `loading: () => <SectionSkeleton />` for graceful loading state
- `mode-context.tsx` validates mode values against `ALLOWED_MODES` allowlist before setting state

## Cross-Cutting Concerns

**Logging:** None — no logging framework or console logging in production code

**Validation:** Mode values validated against `ALLOWED_MODES` literal array in `components/context/mode-context.tsx`; no form validation (contact section is CTA-only, not a form)

**Authentication:** None — no user authentication; the portfolio is fully public

**Accessibility:** Skip-to-content link in `src/app/layout.tsx`; `role="radiogroup"` + `aria-checked` on mode toggle; `prefers-reduced-motion` respected via `MotionProvider`; `focus-visible` ring styles on interactive elements

**SEO:** Full Open Graph + Twitter Card metadata in `src/app/layout.tsx`; JSON-LD Person schema; dynamic OG image via Edge Runtime; `sitemap.xml` and `robots.txt` in `public/`; security headers in `next.config.mjs`

---

*Architecture analysis: 2026-08-29*
