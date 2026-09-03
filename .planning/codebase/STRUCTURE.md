# Codebase Structure

**Analysis Date:** 2026-09-03

## Directory Layout

```
portfolio-next/
├── src/
│   └── app/                        # Next.js App Router (ONLY source dir under src/)
│       ├── fonts/                  # GeistVF.woff, GeistMonoVF.woff (unused by layout)
│       ├── globals.css             # CSS variables (neo-brutalist palette), base styles, scrollbar
│       ├── layout.tsx              # Root layout: fonts, SEO metadata, JSON-LD, providers
│       ├── opengraph-image.tsx     # Edge-runtime OG image (1200x630)
│       └── page.tsx                # Home route → <ModeRouter />
├── components/                     # ALL React components (root level, NOT under src/)
│   ├── context/                    # React Context providers
│   │   └── mode-context.tsx        # ModeProvider + useMode hook (ios | ai)
│   ├── data/                       # Static typed content modules (the "CMS")
│   │   ├── ai-resume-data.ts       # ALL AI-mode content (9 interfaces, 6 consts)
│   │   ├── experience-data.ts      # iOS work history
│   │   ├── projects-data.ts        # iOS portfolio projects
│   │   ├── side-projects-data.ts   # GitHub side projects
│   │   └── skills-data.ts          # iOS skill categories
│   ├── effects/                    # Motion infrastructure
│   │   ├── animation-variants.ts   # Shared motion presets (fadeInUp, stagger, springs)
│   │   ├── motion-provider.tsx     # LazyMotion strict + reduced-motion MotionConfig
│   │   └── scroll-reveal.tsx       # In-view fade-up wrapper
│   ├── hooks/
│   │   └── use-typing-animation.ts # rAF typing cycle hook (AI hero terminal)
│   ├── layout/                     # Page chrome + mode routing
│   │   ├── footer.tsx              # Social links + footer
│   │   ├── mobile-menu.tsx         # Slide-over menu (Esc/outside-click close)
│   │   ├── mode-router.tsx         # iOS/AI section switcher (dynamic imports)
│   │   ├── mode-toggle.tsx         # Segmented iOS/AI radio toggle
│   │   ├── nav-links.ts            # NAV_LINKS_BY_MODE anchor config
│   │   ├── navbar.tsx              # Fixed floating header
│   │   └── page-transition.tsx     # Dead code (single route, not wired)
│   ├── sections/                   # Full-width page sections
│   │   ├── about-section.tsx       # ┐
│   │   ├── hero-section.tsx        # │ iOS mode (static imports, SSR'd)
│   │   ├── experience-section.tsx  # │
│   │   ├── skills-section.tsx      # │
│   │   ├── projects-section.tsx    # │
│   │   ├── side-projects-section.tsx # ┘
│   │   ├── ai-hero-section.tsx     # ┐
│   │   ├── ai-workflow-section.tsx # │ AI mode (dynamic, ssr: false)
│   │   ├── ai-skills-section.tsx   # │
│   │   ├── ai-experience-section.tsx # │
│   │   ├── ai-projects-section.tsx # ┘
│   │   └── contact-section.tsx     # Shared across both modes
│   ├── theme/
│   │   └── theme-provider.tsx      # next-themes wrapper (NOT wired into layout)
│   └── ui/                         # Presentational primitives
│       ├── index.ts                # Barrel: Card, Button, Badge, StatBadge, ...
│       ├── badge.tsx, button.tsx, card.tsx
│       ├── project-card.tsx, side-project-card.tsx
│       ├── rating-badge.tsx, stat-badge.tsx
│       ├── social-icons.tsx, social-link.tsx
├── lib/
│   └── utils.ts                    # cn() = clsx + tailwind-merge (only utility)
├── public/                         # Served statically
│   ├── DoanPhuong.pdf              # Downloadable resume (contact section links it)
│   ├── screenshots/{swisspost,windscribe,zillearn}/  # Project screenshots
│   ├── robots.txt, sitemap.xml
├── docs/                           # Human documentation
│   ├── system-architecture.md      # Canonical architecture writeup
│   ├── codebase-summary.md, code-standards.md, design-guidelines.md
│   ├── project-roadmap.md, project-overview-pdr.md, deployment-guide.md
│   └── ai/                         # AI workflow doc scaffolding (planning/design/...)
├── plans/                          # AI-agent plan artifacts (per-workflow dirs + reports/)
├── resources/                      # Raw source assets (app-store-screenshot/, url.md)
├── .planning/                      # GSD planning state (codebase maps live here)
├── .claude/                        # Claude settings, commands, skills, session state
├── tailwind.config.ts              # Design tokens → CSS variable mapping
├── next.config.mjs                 # Security headers, reactStrictMode
├── tsconfig.json                   # strict, @/* → repo root
├── postcss.config.mjs, .eslintrc.json
└── package.json                    # next 14.2.35, react 18, framer-motion 11, tailwind 3.4
```

## Directory Purposes

**`src/app/`:**
- Purpose: Next.js App Router routes and global styles — the ONLY directory Next requires in a specific place
- Contains: root layout, single page, OG image route, `globals.css`, unused Geist woff fonts
- Key files: `src/app/layout.tsx`, `src/app/page.tsx`

**`components/`:**
- Purpose: every React component in the app, grouped by role (context, data, effects, hooks, layout, sections, theme, ui)
- Contains: `.tsx` components and `.ts` modules (data, nav-links, animation-variants)
- Key files: `components/layout/mode-router.tsx`, `components/context/mode-context.tsx`
- NOTE: lives at repo root because `tsconfig.json` maps `@/*` → `./*` (NOT `./src/*`)

**`components/data/`:**
- Purpose: content-as-code data layer; each file exports `interface X` + `export const xs: X[]`
- Contains: 5 data modules; `ai-resume-data.ts` holds ALL AI-mode content in one file
- Key files: `components/data/ai-resume-data.ts` (332 lines, largest data file)

**`components/sections/`:**
- Purpose: one full-width section per page region; the only consumers of `components/data/`
- Contains: 13 section components; iOS sections SSR'd, AI sections `ssr: false` dynamic
- Key files: `components/layout/mode-router.tsx` imports ALL of them — new sections must be registered there

**`components/ui/`:**
- Purpose: dumb presentational primitives, reused across sections
- Contains: 10 component files + `index.ts` barrel
- Key files: `components/ui/index.ts`

**`lib/`:**
- Purpose: framework-agnostic utilities
- Contains: `utils.ts` with the single `cn()` helper

**`public/`:**
- Purpose: static assets served at site root; screenshot paths in `components/data/projects-data.ts` reference `/screenshots/...`

**`docs/`:**
- Purpose: human-maintained documentation; `docs/system-architecture.md` is the canonical architecture reference; `docs/deployment-guide.md` covers Vercel deployment

**`plans/`:**
- Purpose: historical AI-workflow plan artifacts (e.g., `0226-2143-portfolio-neo-brutalist-redesign/`, `0414-2246-ai-resume-toggle-page/`) with phase files and `plans/reports/` agent reports
- Generated: partially (agent reports); committed: yes

**`resources/`:**
- Purpose: raw/source assets (original screenshots with spaces in filenames) — referenced only by copy-paste into `public/`, not by code

## Key File Locations

**Entry Points:**
- `src/app/layout.tsx`: root layout — fonts, metadata, JSON-LD, provider tree, Navbar/Footer
- `src/app/page.tsx`: home route, renders ModeRouter
- `src/app/opengraph-image.tsx`: edge OG image generation

**Configuration:**
- `next.config.mjs`: security headers (X-Frame-Options DENY etc.), reactStrictMode
- `tailwind.config.ts`: design tokens (colors → CSS vars, fonts, shadows incl. `brutal`, radii)
- `tsconfig.json`: strict mode, `@/*` path alias to repo root
- `src/app/globals.css`: CSS variable palette, reduced-motion rules, scrollbar, scroll-margin

**Core Logic:**
- `components/context/mode-context.tsx`: mode state machine + persistence + title sync
- `components/layout/mode-router.tsx`: dual-persona section composition
- `components/data/*.ts`: all site content
- `lib/utils.ts`: `cn()`

**Testing:**
- None — no test files, no test framework, no test script in `package.json`

**Deployment:**
- Vercel (canonical URL `https://portfolio-phi-lac-67.vercel.app` set in `src/app/layout.tsx:19`); guide at `docs/deployment-guide.md`

## Naming Conventions

**Files:**
- Components: kebab-case, role-suffixed — `<name>-section.tsx` (sections), `<name>-card.tsx` / `<name>-badge.tsx` (ui), `<name>-menu.tsx` (layout)
- AI-mode components prefixed `ai-`: `ai-hero-section.tsx`, `ai-resume-data.ts`
- Data modules suffixed `-data.ts`: `projects-data.ts`
- Hooks prefixed `use-`: `use-typing-animation.ts`
- Providers suffixed `-provider.tsx`: `mode-provider` (actual: `mode-context.tsx`), `motion-provider.tsx`, `theme-provider.tsx` — context files may use either; prefer `-context.tsx` for context+hook files
- Plain `.ts` for non-JSX modules (data, variants, nav-links, utils); `.tsx` only when JSX present

**Directories:**
- Plural lowercase role names: `sections/`, `ui/`, `layout/`, `data/`, `effects/`, `hooks/`, `context/`, `theme/`

**Exports:**
- Named exports only; components exported as `export function HeroSection()` (PascalCase matching filename)
- Data: `export interface Project` (singular) + `export const projects: Project[]` (plural camelCase)

**Section anchors:**
- Section `id` attribute matches nav hrefs: iOS uses bare ids (`#about`), AI mode uses `ai-` prefixed ids (`#ai-workflow`) — defined in `components/layout/nav-links.ts`

## Where to Add New Code

**New page section (iOS mode):**
1. Create `components/sections/<name>-section.tsx` — `"use client"`, `<section id="<name>">`, import data + `m` + UI primitives
2. Add data: new array in existing `components/data/<domain>-data.ts` or new `<name>-data.ts` (interface + const export)
3. Register in `IOSContent` in `components/layout/mode-router.tsx`
4. Add link to `NAV_LINKS_BY_MODE.ios` in `components/layout/nav-links.ts`

**New page section (AI mode):**
1. Create `components/sections/ai-<name>-section.tsx`
2. Add ALL content to `components/data/ai-resume-data.ts` (never hardcode in the component)
3. Register via `next/dynamic` import with `{ ssr: false, loading: () => <SectionSkeleton /> }` in `mode-router.tsx`
4. Add link to `NAV_LINKS_BY_MODE.ai` with `ai-`-prefixed anchor

**New UI primitive:**
1. Create `components/ui/<name>.tsx` (dumb, `cn()` for classes, Tailwind tokens only)
2. Add re-export to `components/ui/index.ts`
3. Optional: shared motion presets go in `components/effects/animation-variants.ts`

**New content/data:**
- iOS content: `components/data/<domain>-data.ts`
- AI content: append to `components/data/ai-resume-data.ts`
- New screenshot: put file in `public/screenshots/<project>/`, reference as `/screenshots/...` in the data file

**New route (page):**
- `src/app/<segment>/page.tsx`; shared chrome comes free from root layout

**New hook:**
- `components/hooks/use-<name>.ts`

**Tests (none exist today):**
- If introducing: add a runner (vitest/jest) to `package.json` and co-locate as `components/__tests__/` or `tests/` — no established pattern to follow yet

## Special Directories

**`.planning/`:**
- Purpose: GSD workflow state (roadmap, phases, codebase maps in `.planning/codebase/`)
- Generated: by GSD commands; Committed: yes

**`.claude/`:**
- Purpose: Claude Code settings (`settings.local.json`), commands, skills, agent memory, session state
- Generated: partially; Committed: mixed (local settings typically not)

**`.next/`:**
- Purpose: Next.js build output
- Generated: yes; Committed: no (gitignored)

**`plans/`:**
- Purpose: AI-workflow plan documents and agent reports (historical record of the neo-brutalist redesign and AI-resume-toggle feature)
- Generated: by planning agents; Committed: yes

**`resources/`:**
- Purpose: raw asset sources (screenshots with original names); NOT referenced by code — `public/screenshots/` holds the runtime copies
- Committed: yes

**`repomix-output.xml` (repo root, ~2.4MB):**
- Purpose: generated codebase snapshot for LLM consumption; not referenced by code

---

*Structure analysis: 2026-09-03*
