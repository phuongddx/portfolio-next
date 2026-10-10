# Architecture

A static, single-page Next.js 14 App Router portfolio with two resume modes (iOS / AI) switched client-side by `ModeProvider` and rendered by `ModeRouter`. No backend.

## Layout model

| Path | What lives there | Details |
| --- | --- | --- |
| `src/app/` | Root layout, single route `/`, OG image | `AGENTS.md` → Architecture |
| `components/` | UI primitives, page sections, data, context, effects | `docs/code-standards.md` |
| `components/data/` | Typed static content feeding sections | `docs/codebase-summary.md` |
| `lib/` | Shared helpers (`cn()`) | — |
| `public/` | CV PDF, screenshots, sitemap, robots | — |
| `docs/` | Human-facing product, design, deploy docs | `docs/project-overview-pdr.md`, `docs/design-guidelines.md`, `docs/deployment-guide.md`, `docs/system-architecture.md` |
| `docs/engineering/` | Stable engineering knowledge specs are drafted against | `conventions.md`, `infrastructure.md`, `tech-stack.md` |
| `docs/features/` | Per-feature specs and reviews | `.agents/templates/` |
| `.agents/` | Agent skills, policies, hooks, spec/review templates | `.agents/templates/spec.md`, `.agents/templates/review.md` |
| `plans/` | Historical feature plans and role reports | `plans/reports/` |

## Pointers

- Agent onboarding: `AGENTS.md`
- Note: `docs/system-architecture.md` mentions a next-themes `ThemeProvider` and a parent `portfolio3/`. Current source does not wire `components/theme/theme-provider.tsx`; trust `src/app/layout.tsx`.
