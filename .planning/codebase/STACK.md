# Technology Stack

**Analysis Date:** 2026-09-03

## Languages

**Primary:**
- TypeScript 5.9.3 — all application code (`.ts`/`.tsx`), strict mode enabled in `tsconfig.json`
- CSS — Tailwind-based styling via `src/app/globals.css` with CSS custom properties for the neo-brutalist palette

**Secondary:**
- JavaScript (config only) — `next.config.mjs`, `postcss.config.mjs` (`allowJs: true` in `tsconfig.json`)
- MDX — declared in Tailwind content globs (`tailwind.config.ts`) but no `.mdx` files currently exist

## Runtime

**Environment:**
- Node.js ≥ 18.17 required (per `docs/deployment-guide.md`); local dev machine runs Node v24
- Edge runtime used for one route: OG image generation (`src/app/opengraph-image.tsx` declares `export const runtime = "edge"`)
- Everything else runs on the standard Next.js Node.js server runtime

**Package Manager:**
- npm (no `packageManager` field pinned)
- Lockfile: `package-lock.json` present (lockfileVersion 3)

## Frameworks

**Core:**
- Next.js 14.2.35 — App Router (single route `/` in `src/app/page.tsx`), pinned exact version (no caret)
- React 18.3.1 / react-dom 18.3.1 — client components with `"use client"` directives; static imports for iOS-mode sections, `next/dynamic` with `ssr: false` for AI-mode sections (`components/layout/mode-router.tsx`)

**Testing:**
- None. No test runner, no test files, no test script in `package.json`

**Build/Dev:**
- Next.js built-in compiler (`next dev`, `next build`, `next start`)
- PostCSS 8 with `tailwindcss` plugin (`postcss.config.mjs`)
- ESLint 8 + `eslint-config-next` 14.2.35 (`next lint`), extends `next/core-web-vitals` and `next/typescript` (`.eslintrc.json`)
- Turbopack not used; webpack-based default

## Key Dependencies

**Critical (all 6 runtime deps):**

| Package | Version | Purpose | Used in |
|---------|---------|---------|---------|
| `next` | 14.2.35 | App Router framework, routing, metadata, OG image | `src/app/*` |
| `react` / `react-dom` | ^18 | UI rendering | all components |
| `framer-motion` | ^11.18.2 | All animations — page transitions, scroll reveal, section motion (`m`/`AnimatePresence`) | `components/effects/*`, `components/layout/mode-router.tsx`, sections |
| `next-themes` | ^0.4.6 | Dark/light theme provider — **currently unused**: `components/theme/theme-provider.tsx` wraps it but is never mounted in `src/app/layout.tsx` | (dead code) |
| `clsx` + `tailwind-merge` | ^2.1.1 / ^3.5.0 | `cn()` class-merge utility | `lib/utils.ts` |

**Infrastructure:**
- None beyond Next.js itself — no state management lib, no forms lib, no HTTP client, no icon library (all icons are hand-written inline SVGs in `components/ui/social-icons.tsx` and `components/icons/` — note `components/icons/` is an empty directory)

**Dev-only:**
- `typescript` ^5, `@types/node` ^20, `@types/react` ^18, `@types/react-dom` ^18
- `tailwindcss` ^3.4.1, `postcss` ^8, `eslint` ^8, `eslint-config-next` 14.2.35

## Configuration

**Environment:**
- No `.env` files exist; **zero environment variables required** (confirmed in `docs/deployment-guide.md`)
- No `process.env` references anywhere in source

**Build:**
- `next.config.mjs`: `reactStrictMode: true` + custom security headers applied to all routes (`X-Frame-Options: DENY`, `X-Content-Type-Options: nosniff`, `Referrer-Policy`, `Permissions-Policy`)
- `tsconfig.json`: strict, `moduleResolution: "bundler"`, `isolatedModules`, path alias `@/*` → repo root `./*` (⚠️ maps to project root, NOT `./src/*` — imports like `@/components/...` and `@/lib/...` resolve to top-level `components/` and `lib/`, while app code lives in `src/app/`)
- `tailwind.config.ts`: content globs cover both `src/**` and root `components/**`; design tokens are CSS-variable-driven colors (`--primary`, `--accent-*`, etc. defined in `src/app/globals.css`), fixed `cta: "#2563EB"`, custom font families via `next/font` CSS variables (`--font-heading` = Space Grotesk, `--font-body` = DM Sans), brutalist box-shadow scale
- `.eslintrc.json`: `next/core-web-vitals` + `next/typescript`

**Fonts:**
- Google Fonts loaded at build time via `next/font/google` (Space Grotesk, DM Sans) in `src/app/layout.tsx` — no runtime font requests, self-hosted by Next.js

**Scripts (package.json):**
```bash
npm run dev     # next dev (port 3000)
npm run build   # next build
npm run start   # next start
npm run lint    # next lint
```

## Platform Requirements

**Development:**
- Node.js ≥ 18.17, npm
- `npm install` then `npm run dev` — no other setup steps

**Production:**
- Deployed to Vercel (canonical URL `https://portfolio-phi-lac-67.vercel.app` hardcoded in `src/app/layout.tsx`, `public/robots.txt`, `public/sitemap.xml`)
- Git remote: `github.com/phuongddx/portfolio-next`
- No `vercel.json`, no CI pipeline (`.github/` absent) — deployment is implicit via Vercel git integration

---

*Stack analysis: 2026-09-03*
