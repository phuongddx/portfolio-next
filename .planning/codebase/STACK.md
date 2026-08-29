# Technology Stack

**Analysis Date:** 2026-08-29

## Languages

**Primary:**
- TypeScript 5.x — All source code (`src/app/`, `components/`)
- CSS — Global styles via Tailwind directives in `src/app/globals.css`

**Secondary:**
- JavaScript (ESM) — Build configuration (`next.config.mjs`, `postcss.config.mjs`, `tailwind.config.ts`)
- SVG (inline) — Custom icons in `components/ui/social-icons.tsx`

## Runtime

**Environment:**
- Node.js v22.23.2

**Package Manager:**
- npm
- Lockfile: `package-lock.json` present

## Frameworks

**Core:**
- Next.js 14.2.35 — Full React framework (App Router, SSG, Edge Runtime for OG image)
- React 18.x — UI library
- React DOM 18.x — DOM rendering

**Testing:**
- Not detected

**Build/Dev:**
- TypeScript 5.x — Type checking and compiler
- Tailwind CSS 3.4.1 — Utility-first CSS framework
- PostCSS 8.x — CSS processing pipeline
- ESLint 8.x — Linting (extends `next/core-web-vitals`, `next/typescript`)

## Key Dependencies

**Critical:**
- `framer-motion` 11.18.2 — Animation library; powers scroll reveals, page transitions, and the AI-mode terminal animation. Used in virtually every section component and `components/layout/page-transition.tsx`.
- `next-themes` 0.4.6 — Dark/light mode theming via `components/theme/theme-provider.tsx`
- `clsx` 2.1.1 — Conditional CSS class composition
- `tailwind-merge` 3.5.0 — Merge Tailwind classes without conflicts (used alongside `clsx` for class composition)

**Infrastructure:**
- `next/font/google` — Font optimization for Space Grotesk (heading) and DM Sans (body), loaded in `src/app/layout.tsx`
- `next/og` (built-in) — Edge Runtime OG image generation in `src/app/opengraph-image.tsx`

## Configuration

**Environment:**
- No `.env` files detected. No environment variables are required.
- Mode switching (iOS vs AI) uses `localStorage` and URL search params, not server-side config — see `components/context/mode-context.tsx`.

**Build:**
- `next.config.mjs` — React Strict Mode enabled, security headers (X-Frame-Options DENY, X-Content-Type-Options nosniff, Referrer-Policy strict-origin-when-cross-origin, Permissions-Policy restricting camera/microphone/geolocation)
- `tailwind.config.ts` — Content paths scan `src/` and `components/`; custom CSS variable-based color system, custom border-radius, box-shadow (including `brutal` variant), font families
- `postcss.config.mjs` — Tailwind CSS plugin only
- `tsconfig.json` — Strict mode, bundler module resolution, path alias `@/*` → `./*`, incremental builds enabled
- `.eslintrc.json` — Extends `next/core-web-vitals` and `next/typescript`

**Fonts:**
- Space Grotesk — Heading font (Google Fonts, optimized via `next/font/google`, CSS variable `--font-heading`)
- DM Sans — Body font (Google Fonts, optimized via `next/font/google`, CSS variable `--font-body`)
- Geist VF and Geist Mono VF — Local font files in `src/app/fonts/` (not currently imported in layout)

## Platform Requirements

**Development:**
- Node.js 18+ (v22.23.2 used)
- npm
- No database or external service dependencies

**Production:**
- Deployed on Vercel (site URL: `https://portfolio-phi-lac-67.vercel.app` per `src/app/layout.tsx` metadata)
- Fully static site (SSG) — no server-side data fetching, no API routes, no middleware
- OG image uses Edge Runtime (`src/app/opengraph-image.tsx`)

---

*Stack analysis: 2026-08-29*