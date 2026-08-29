# Codebase Structure

**Analysis Date:** 2026-08-29

## Directory Layout

```
portfolio-next/
├── src/
│   └── app/                  # Next.js App Router pages and layout
│       ├── layout.tsx        # Root layout (fonts, SEO, providers)
│       ├── page.tsx          # Home page (delegates to ModeRouter)
│       ├── opengraph-image.tsx # Edge-generated OG image
│       ├── globals.css       # Global styles, CSS variables, Tailwind layers
│       └── fonts/            # Self-hosted font files (Geist)
├── components/               # All React components
│   ├── context/              # React Context providers
│   ├── data/                 # Static portfolio data (experiences, skills, projects)
│   ├── effects/              # Animation infrastructure
│   ├── hooks/                # Custom React hooks
│   ├── icons/                # Icon components (currently empty)
│   ├── layout/               # Page chrome (navbar, footer, mode switching)
│   ├── sections/             # Page content sections (hero, about, experience, etc.)
│   ├── theme/                # Theme provider
│   └── ui/                   # Reusable UI primitives
├── lib/                      # Utility functions
│   └── utils.ts              # cn() helper (clsx + tailwind-merge)
├── public/                   # Static assets served directly
│   ├── DoanPhuong.pdf        # Resume PDF
│   ├── sitemap.xml           # Sitemap for search engines
│   ├── robots.txt            # Crawler directives
│   └── screenshots/          # App screenshots
├── docs/                     # Project documentation (human-maintained)
│   ├── codebase-summary.md
│   ├── deployment-guide.md
│   ├── design-guidelines.md
│   ├── code-standards.md
│   ├── system-architecture.md
│   ├── project-overview-pdr.md
│   ├── project-roadmap.md
│   └── ai/
├── resources/                # Reference materials
│   ├── app-store-screenshot/
│   └── url.md
├── plans/                    # Historical implementation plans
│   ├── reports/
│   └── [plan-directories]/
├── .planning/                # GSD planning artifacts
│   └── codebase/             # Codebase analysis documents
├── tailwind.config.ts        # Tailwind CSS configuration
├── next.config.mjs           # Next.js configuration (security headers)
├── tsconfig.json             # TypeScript configuration (strict mode, @/* path alias)
├── postcss.config.mjs        # PostCSS configuration (Tailwind plugin)
├── .eslintrc.json            # ESLint configuration (next preset)
├── package.json              # Dependencies and scripts
└── package-lock.json         # Lockfile
```

## Directory Purposes

**`src/app/`:**
- Purpose: Next.js App Router entry points — root layout, home page, OG image generation
- Contains: Layout component, page component, OG image (Edge Runtime), global CSS, font files
- Key files: `src/app/layout.tsx`, `src/app/page.tsx`, `src/app/opengraph-image.tsx`, `src/app/globals.css`

**`components/sections/`:**
- Purpose: Page content sections — the main visible content of the portfolio
- Contains: 12 section components split between iOS mode (6), AI mode (5), and shared (1 contact)
- Key files: `components/sections/hero-section.tsx`, `components/sections/ai-hero-section.tsx`, `components/sections/contact-section.tsx`

**`components/data/`:**
- Purpose: Static typed data for all portfolio content — experiences, skills, projects, AI resume data
- Contains: TypeScript interfaces + const arrays/objects exported as named exports
- Key files: `components/data/experience-data.ts`, `components/data/ai-resume-data.ts`, `components/data/skills-data.ts`, `components/data/projects-data.ts`, `components/data/side-projects-data.ts`

**`components/ui/`:**
- Purpose: Reusable presentational primitives — buttons, cards, badges, social icons
- Contains: Small, composable components with `className` prop pattern via `cn()`
- Key files: `components/ui/index.ts` (barrel export), `components/ui/button.tsx`, `components/ui/card.tsx`, `components/ui/project-card.tsx`

**`components/layout/`:**
- Purpose: Page shell components — navigation, footer, mode routing/toggling
- Contains: Navbar, footer, mobile menu, mode toggle, mode router, nav link data, page transition
- Key files: `components/layout/mode-router.tsx`, `components/layout/navbar.tsx`, `components/layout/mode-toggle.tsx`, `components/layout/nav-links.ts`

**`components/context/`:**
- Purpose: React Context provider for mode state (ios/ai)
- Contains: `mode-context.tsx` — defines `Mode` type, `ModeProvider`, `useMode` hook
- Key files: `components/context/mode-context.tsx`

**`components/effects/`:**
- Purpose: Animation infrastructure for Framer Motion
- Contains: Motion provider (lazy load + reduced motion), scroll-reveal wrapper, animation variant definitions
- Key files: `components/effects/motion-provider.tsx`, `components/effects/scroll-reveal.tsx`, `components/effects/animation-variants.ts`

**`components/hooks/`:**
- Purpose: Custom React hooks
- Contains: `use-typing-animation.ts` — terminal typing effect for AI hero section
- Key files: `components/hooks/use-typing-animation.ts`

**`components/theme/`:**
- Purpose: Theme configuration provider
- Contains: `theme-provider.tsx` — wraps `next-themes` ThemeProvider
- Key files: `components/theme/theme-provider.tsx`

**`components/icons/`:**
- Purpose: Icon components (reserved directory, currently empty — icons live in `components/ui/social-icons.tsx`)

**`lib/`:**
- Purpose: Shared utility functions
- Contains: `utils.ts` — the `cn()` helper combining `clsx` and `tailwind-merge`
- Key files: `lib/utils.ts`

**`public/`:**
- Purpose: Static assets served at the site root
- Contains: Resume PDF, sitemap, robots.txt, app screenshots
- Key files: `public/DoanPhuong.pdf`, `public/sitemap.xml`, `public/robots.txt`

**`docs/`:**
- Purpose: Human-maintained project documentation
- Contains: Architecture, design guidelines, code standards, deployment guide, roadmap
- Key files: `docs/system-architecture.md`, `docs/design-guidelines.md`, `docs/code-standards.md`

## Key File Locations

**Entry Points:**
- `src/app/layout.tsx`: Root layout — HTML shell, fonts, metadata, providers, navbar/footer
- `src/app/page.tsx`: Home page — renders `<ModeRouter />`
- `src/app/opengraph-image.tsx`: Edge Runtime OG image generation

**Configuration:**
- `next.config.mjs`: Next.js config with security headers (X-Frame-Options, X-Content-Type-Options, Referrer-Policy, Permissions-Policy)
- `tailwind.config.ts`: Tailwind theme — custom colors (CSS var-driven), fonts, border-radius, box-shadows (including brutal)
- `tsconfig.json`: TypeScript strict mode, `@/*` path alias, bundler module resolution
- `postcss.config.mjs`: PostCSS with Tailwind plugin
- `.eslintrc.json`: ESLint with `eslint-config-next` preset

**Core Logic:**
- `components/context/mode-context.tsx`: Mode state management — the only client-side state in the app
- `components/layout/mode-router.tsx`: Section orchestration — conditionally renders iOS or AI sections
- `components/data/ai-resume-data.ts`: Largest data file — all AI-mode resume content with typed interfaces
- `components/data/experience-data.ts`: iOS-mode work experience data

**Testing:**
- Not applicable — no test files or test configuration detected

## Naming Conventions

**Files:**
- Components: kebab-case — `hero-section.tsx`, `mode-toggle.tsx`, `scroll-reveal.tsx`
- Data files: kebab-case with `-data` suffix — `experience-data.ts`, `skills-data.ts`, `ai-resume-data.ts`
- Utilities: kebab-case — `utils.ts`, `nav-links.ts`
- Config: kebab-case with framework suffix — `tailwind.config.ts`, `postcss.config.mjs`
- Directories: kebab-case — `components/`, `sections/`, `effects/`

**Directories:**
- Component subdirectories group by concern: `sections/`, `ui/`, `layout/`, `context/`, `effects/`, `hooks/`, `data/`
- No feature-based grouping — all sections share one directory regardless of mode

**Components:**
- Named exports (not default): `export function HeroSection`, `export function ModeRouter`
- UI primitives barrel-exported from `components/ui/index.ts`
- Client components marked with `"use client"` directive at file top
- AI-mode section components: prefixed with `ai-` — `ai-hero-section.tsx`, `ai-experience-section.tsx`

**Types/Interfaces:**
- PascalCase: `Experience`, `SkillCategory`, `AIProject`, `TerminalLine`, `WorkflowStep`
- Co-located with data files that define them
- Exported alongside data constants from the same file

**CSS:**
- Tailwind utility classes used inline in JSX
- CSS custom properties defined in `src/app/globals.css` under `:root`
- Custom animations defined in `@layer utilities` in globals.css

**Variables:**
- camelCase for functions, hooks, state: `useMode`, `isMounted`, `handleToggle`
- UPPER_SNAKE_CASE for constants: `ALLOWED_MODES`, `STORAGE_KEY`, `NAV_LINKS_BY_MODE`
- kebab-case for CSS custom properties: `--primary`, `--accent-pink`, `--font-heading`

## Where to Add New Code

**New portfolio section (iOS mode):**
- Component: `components/sections/<section-name>-section.tsx`
- Data: Add to existing `components/data/<relevant>-data.ts` or create new `components/data/<section-name>-data.ts`
- Register in `components/layout/mode-router.tsx` inside the `IOSContent` function
- Add nav link to `components/layout/nav-links.ts` under the `ios` key
- Add section id anchor with `scroll-margin-top: 100px` (inherited from globals.css `section` rule)

**New portfolio section (AI mode):**
- Component: `components/sections/ai-<section-name>-section.tsx` (prefixed with `ai-`)
- Data: Add to `components/data/ai-resume-data.ts` or create new data file
- Register in `components/layout/mode-router.tsx` with `next/dynamic` import + `ssr: false` + `SectionSkeleton` loading state
- Add nav link to `components/layout/nav-links.ts` under the `ai` key

**New UI primitive (card, button, badge):**
- Component: `components/ui/<component-name>.tsx`
- Export: Add named export to `components/ui/index.ts` barrel file
- Use `cn()` from `@/lib/utils` for className merging
- Accept `className?: string` prop for composition

**New animation effect:**
- Animation variants: `components/effects/animation-variants.ts`
- Scroll-triggered wrapper: Use existing `ScrollReveal` from `components/effects/scroll-reveal.tsx`
- New provider/wrapper: `components/effects/<name>.tsx`

**New custom hook:**
- Location: `components/hooks/use-<name>.ts`
- Must be marked `"use client"` if it uses React hooks

**New utility function:**
- Location: `lib/utils.ts` (if small and general) or `lib/<name>.ts` (if substantial)

**New static asset:**
- Images, PDFs, fonts: `public/<path>`
- Served at site root: `public/sitemap.xml` → `https://domain/sitemap.xml`

**New page/route (if ever needed):**
- Location: `src/app/<route>/page.tsx`
- Layout: `src/app/<route>/layout.tsx` (optional)
- Note: Current architecture is single-page; adding routes is a structural change

## Special Directories

**`components/icons/`:**
- Purpose: Reserved for icon components
- Generated: No
- Committed: Yes
- Note: Currently empty; icons are defined inline in `components/ui/social-icons.tsx`

**`src/app/fonts/`:**
- Purpose: Self-hosted Geist font files (woff)
- Generated: No
- Committed: Yes
- Note: Fonts are also loaded via `next/font/google` (Space Grotesk, DM Sans) in layout.tsx — these woff files may be a legacy fallback

**`public/screenshots/`:**
- Purpose: App Store screenshots for portfolio display
- Generated: No
- Committed: Yes

**`docs/`:**
- Purpose: Human-maintained project documentation
- Generated: No
- Committed: Yes

**`plans/`:**
- Purpose: Historical implementation plans from previous GSD sessions
- Generated: No
- Committed: Yes

---

*Structure analysis: 2026-08-29*