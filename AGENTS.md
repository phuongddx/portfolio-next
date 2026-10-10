# Repository Guidelines

## Project Overview
Single-page Next.js 14 (App Router) portfolio for Doan Duy Phuong, with two resume modes: **iOS** and **AI-Driven Developer**. All content is static: no backend, no API routes, no external fetches.

## Architecture & Data Flow
- `src/app/layout.tsx` nests `MotionProvider` → `ModeProvider` → Navbar / `<main>` / Footer. `src/app/page.tsx` renders `<ModeRouter/>`.
- `components/context/mode-context.tsx` holds `Mode = "ios" | "ai"`. The `?mode=` URL param wins over `localStorage["portfolio-mode"]`.
- `components/layout/mode-router.tsx` picks the sections for the active mode. iOS sections are imported statically. `ai-*` sections use `next/dynamic` with `ssr: false`. `ContactSection` is shared.
- Typed content lives in `components/data/*-data.ts` and is consumed by `components/sections/*`.

## Key Directories
- `src/app/`: layout, page, `opengraph-image.tsx`
- `components/`: `ui/` (primitives, barrel `index.ts`), `sections/`, `data/`, `layout/`, `context/`, `effects/`, `hooks/`
- `lib/utils.ts`: the `cn()` helper (clsx + tailwind-merge)
- `public/`: `DoanPhuong.pdf` (CV download), `screenshots/`, `sitemap.xml`, `robots.txt`
- `docs/`: human docs. `plans/`: feature plans and `plans/reports/`

## Development Commands
- `npm install` (npm only; `package-lock.json`)
- `npm run dev`, `npm run build`, `npm run start`, `npm run lint`
- Typecheck: `npx tsc --noEmit` (no script for it)

## Code Conventions & Common Patterns
- kebab-case filenames and named PascalCase exports. Default exports only in `src/app`.
- Import via the `@/*` alias (it maps to the repo root, not `src/`).
- Read mode via `useMode()`, never local state.
- With strict `LazyMotion`, use `m.*`, not `motion.*`. Wrap sections in `ScrollReveal`.
- Add `"use client"` only for hooks, motion, browser APIs or handlers.
- Merge classes with `cn()`. Use Tailwind tokens from `tailwind.config.ts` (CSS-variable colours, `brutal` shadows).
- See `docs/code-standards.md`.

## Important Files
`components/layout/mode-router.tsx`, `components/context/mode-context.tsx`, `components/data/ai-resume-data.ts`, `tailwind.config.ts`, `next.config.mjs` (security headers)

## Runtime/Tooling Preferences
Node 18.17+ (per `docs/deployment-guide.md`; no `.nvmrc` or `engines`). No Prettier. ESLint extends `next/core-web-vitals` and `next/typescript`.

## Testing & QA
No test framework and no CI: not configured. Verify with `npm run lint`, `npx tsc --noEmit` and `npm run build`, plus a manual check of both modes (`/?mode=ios`, `/?mode=ai`).

## Commit & Pull Request Guidelines
Conventional commits `type(scope): subject`, lowercase imperative (e.g. `feat(data): ...`, `fix(navbar): ...`). No PR template or commit hooks.
