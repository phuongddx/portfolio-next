# Conventions

Full rules: `docs/code-standards.md`. This is the short version specs are checked against.

## Code style
- TypeScript `strict: true` (`tsconfig.json`); import via `@/*` alias (maps to repo root).
- ESLint: `next/core-web-vitals` + `next/typescript` (`.eslintrc.json`). Run `npm run lint`.
- Formatter: Not configured (no Prettier / `.editorconfig`).
- Mode state only via `useMode()` from `components/context/mode-context.tsx`.
- Framer Motion under strict `LazyMotion` (`components/effects/motion-provider.tsx`): use `m.*`, not `motion.*`.
- `"use client"` only where hooks, motion, browser APIs, or handlers require it.
- Class merging with `cn()` (`lib/utils.ts`); styling via tokens in `tailwind.config.ts`.
- New AI-mode sections load via `next/dynamic` with `ssr: false` in `components/layout/mode-router.tsx`.

## Naming
- Files kebab-case; suffixes `-data.ts` (content), `use-*.ts` (hooks), `-context.tsx`, `-section.tsx`; AI variants prefixed `ai-`.
- Named PascalCase exports; default exports only in `src/app/`.
- UI primitives re-exported from `components/ui/index.ts`.

## Commits & PRs
- Conventional commits: `type(scope): subject`, lowercase imperative. Observed types: `feat`, `docs`, `fix`, `chore`, `refactor`; scopes e.g. `ui`, `data`, `navbar`, `seo`, `hero`.
- PR template: Not configured. Commit hooks / commitlint: Not configured.
- Plans: `plans/MMDD-HHMM-<slug>/`; reports: `plans/reports/<role>-MMDD-HHMM-<topic>.md`.
