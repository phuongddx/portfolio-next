# Coding Conventions

**Analysis Date:** 2026-09-03

> Authoritative style reference: `docs/code-standards.md` (project-written, current, and enforced in practice). This document restates those rules plus observed patterns from the actual source.

## Naming Patterns

**Files:**
- kebab-case everywhere (`glass-card.tsx`, `nav-links.ts`, `mode-router.tsx`)
- Suffix/prefix conventions (MANDATORY, from `docs/code-standards.md`):

| Type | Convention | Example |
|------|------------|---------|
| Data files | kebab-case + `-data` suffix | `skills-data.ts`, `ai-resume-data.ts` |
| Hooks | `use-` prefix | `use-typing-animation.ts` |
| Context | `-context` suffix | `mode-context.tsx` |
| UI primitives | plain kebab-case | `button.tsx`, `badge.tsx` |

**Components/Exports:**
- Named function exports in PascalCase: `export function Button(...)` in `components/ui/button.tsx`
- `export default` ONLY where Next.js App Router requires it: `src/app/layout.tsx` (`RootLayout`), `src/app/page.tsx` (`Home`), `src/app/opengraph-image.tsx` (`OgImage`). No other file in `components/` or `lib/` uses default exports.
- Props interface named `ComponentNameProps`, defined at top of file above the component: `interface ProjectCardProps { project: Project; }` (`components/ui/project-card.tsx`)

**Functions/Variables:**
- camelCase for functions and locals (`isValidMode`, `handleToggle`, `setModeState`)
- SCREAMING_SNAKE_CASE for module-level constants: `STORAGE_KEY`, `ALLOWED_MODES`, `TITLES` (`components/context/mode-context.tsx`), `SEGMENTS`, `COOLDOWN_MS` (`components/layout/mode-toggle.tsx`), `NAV_LINKS_BY_MODE` (`components/layout/nav-links.ts`)
- Framer Motion variant objects: camelCase (`fadeInUp`, `staggerContainer`, `springTransition`) in `components/effects/animation-variants.ts`

**Types:**
- Interfaces for object shapes (`SkillCategory`, `Project`, `Experience` — defined IN the data file that owns them, exported alongside the data)
- Type guards for external input: `function isValidMode(value: unknown): value is Mode` (`components/context/mode-context.tsx:22`)
- Union literal types for enums: `type Mode = "ios" | "ai"`; `locationType: "Remote" | "Hybrid" | "On-site"` (`components/data/experience-data.ts:8`)
- `as const` on animation `type` fields: `type: "spring" as const` (satisfies framer-motion typing without importing its types)
- Use `type` import keyword for type-only imports: `import type { Metadata } from "next"`, `import { useMode, type Mode } from ...`

## Code Style

**Formatting:**
- No Prettier config detected. Formatting is manual/IDE-default, consistently: double quotes, semicolons, 2-space indent, trailing commas in multiline.
- Format authority is ESLint (see below); match the style of neighboring files.

**Linting:**
- ESLint 8 via `next lint` (script: `npm run lint`)
- Config: `.eslintrc.json` → `extends: ["next/core-web-vitals", "next/typescript"]`
- Zero `eslint-disable`, zero `@ts-ignore`/`@ts-expect-error`, zero TODO/FIXME comments in `components/`, `src/`, `lib/` — keep it that way.

**TypeScript:**
- `strict: true`, `noEmit`, `isolatedModules`, `moduleResolution: "bundler"` (`tsconfig.json`)
- No `any` observed. External/untrusted values typed `unknown` then narrowed (`isValidMode(value: unknown)`).

**Component size guideline:** keep components under 200 lines (`docs/code-standards.md` performance rule #4). Current largest component: `components/sections/hero-section.tsx` (200 lines). Data files may exceed (largest: `components/data/ai-resume-data.ts`, 332 lines).

## Import Organization

**Order (observed in every file, e.g. `components/layout/navbar.tsx:1-10`):**
1. `"use client"` directive (always first line, when needed)
2. React / Next (`next`, `react`, `next/dynamic`)
3. External libraries (`framer-motion`)
4. Internal alias imports (`@/components/...`, `@/lib/utils`)
5. Relative imports within same directory (`./mobile-menu`, `./card`)
6. Types last when possible (`import type { Project } from ...`)

**Path Aliases:**
- `@/*` → `./*` (repo root) — defined in `tsconfig.json` `paths`. Example: `import { cn } from "@/lib/utils"`, `import { Button } from "@/components/ui/button"`.
- The `src/` App Router dir does NOT get `@/src/...` — imports reference `@/components/...` etc.

**Barrel file:** `components/ui/index.ts` re-exports all UI primitives. Prefer `import { Button, Badge } from "@/components/ui"` OR direct file imports (both patterns appear; direct imports are more common). Other directories (`sections/`, `layout/`) have NO barrel — import directly from file paths.

## Client vs Server Components

**Rules (`docs/code-standards.md` + observed):**
- `"use client"` when using: React hooks, framer-motion (`m`, `AnimatePresence`, `useInView`), browser APIs (`window`, `localStorage`, `document`), event handlers. 26 files are client components.
- Server component (no directive) for static content / no interactivity: `components/ui/badge.tsx`, `components/ui/social-icons.tsx`, `components/ui/stat-badge.tsx`, `components/ui/rating-badge.tsx`, `components/layout/footer.tsx`, all `components/data/*.ts`, `components/effects/animation-variants.ts`.
- Note: many UI primitives are `"use client"` only because they render `<m.div>` (`components/ui/button.tsx`, `components/ui/card.tsx`).

## Framer Motion (MANDATORY patterns)

**Setup:** all motion usage must be inside `MotionProvider` (`components/effects/motion-provider.tsx`) which wraps the app in `src/app/layout.tsx:101` using `LazyMotion features={domAnimation} strict` + `MotionConfig reducedMotion`.

**Rules:**
1. Always import `m`, never `motion` — `strict` LazyMotion throws on `motion`: `import { m } from "framer-motion"`
2. Reusable variants live in `components/effects/animation-variants.ts` (`fadeInUp`, `staggerContainer`, `staggerItem`, `cardHover`, `pageVariants`, `springTransition`, `durationSpring`). Section-local variants (`containerVariants`, `itemVariants`) may be defined at top of the section file (`components/sections/hero-section.tsx:14-36`).
3. Scroll-triggered reveals: wrap in `ScrollReveal` (`components/effects/scroll-reveal.tsx`) — `<ScrollReveal delay={0.2}>...</ScrollReveal>` — or use `whileInView` + `viewport={{ once: true }}` directly (`components/ui/card.tsx:27-28`).
4. Reduced motion is handled globally by `MotionProvider` + CSS media query in `src/app/globals.css:39-50`. Individual components don't need to re-check unless doing custom animation.
5. Mode transitions use `AnimatePresence mode="wait"` keyed by mode (`components/layout/mode-router.tsx:100-104`).

## Styling

- **Tailwind CSS 3.4** with config at `tailwind.config.ts`. Content globs cover `./src/**` AND `./components/**` (top-level `components/` is where most code lives).
- **Always use `cn()`** (`lib/utils.ts` — `clsx` + `tailwind-merge`) for conditional class merging:
  ```tsx
  className={cn("base-classes", condition && "conditional-class", className)}
  ```
- **Design tokens, not raw hex**: use semantic colors `text-primary`, `bg-background`, `text-cta`, `font-heading`, `shadow-card`, `shadow-brutal` (defined in `tailwind.config.ts` theme.extend mapping to CSS vars in `src/app/globals.css`). Neo-brutalist palette: green-500 primary, `border-2 border-gray-800`, `shadow-brutal`/`shadow-brutal-sm`.
- Variant maps as plain objects inside components: `const variants = { primary: "...", secondary: "..." }` then `variants[variant]` (`components/ui/button.tsx:30-40`, `components/ui/badge.tsx:15-21`).
- Multiple cn() string-literal arguments for line-grouping (see `components/layout/mobile-menu.tsx:46-51`).

## State Management

- **No global state library.** React Context for cross-cutting state only.
- **Mode state** (ios/ai portfolio mode) MUST go through `ModeContext` (`components/context/mode-context.tsx`) — never duplicate in local state. Access via `const { mode, setMode, mounted } = useMode()`. Hook throws invariant if used outside provider.
- `mounted` flag pattern for hydration-sensitive rendering: render default content until mounted to avoid SSR/client mismatch (`components/layout/mode-router.tsx:89-96`).
- Persistence: `localStorage` key `"portfolio-mode"` + URL param `?mode=` (URL takes precedence), both validated through the `isValidMode` allowlist guard.
- `useCallback` for handlers passed as props or stored in deps (`components/context/mode-context.tsx:64`, `components/layout/mode-toggle.tsx:19-28`). Refs for imperative values (`lastToggle`, animation frames).
- Heavy/below-fold mode content loaded via `next/dynamic` with `{ ssr: false, loading: () => <SectionSkeleton /> }` (`components/layout/mode-router.tsx:17-36`).

## Data Layer

- All content lives in typed data files under `components/data/`: `projects-data.ts`, `experience-data.ts`, `skills-data.ts`, `side-projects-data.ts`, `ai-resume-data.ts`.
- Pattern: export an `interface` + a `const` array with the plural name (`export const projects: Project[]`).
- **Rule** (stated in `components/data/ai-resume-data.ts:1-3`): components must NOT hardcode values — they import from the data file.
- iOS-mode and AI-mode data in separate files to keep base bundle small (performance rule #5 in `docs/code-standards.md`).
- Data files are pure (no imports of components) — server-safe and trivially testable.

## Error Handling

**Patterns:**
- Hook invariant throws: `if (!ctx) throw new Error("useMode must be used within ModeProvider")` (`components/context/mode-context.tsx:36`) — this is the ONLY throw in the codebase.
- Fail-safe validation of external input (localStorage/URL): silently ignore invalid values via type guard + allowlist rather than throwing (`components/context/mode-context.tsx:49-62`).
- No `try`/`catch` anywhere; no `console.*` calls in `components/`, `src/`, `lib/`. If adding logging, follow `docs/code-standards.md` guidance: `console.error("Context message:", error)` with graceful fallback.
- No Next.js `error.tsx` / `not-found.tsx` route boundaries exist in `src/app/`. No `loading.tsx` either (skeleton handled inside `mode-router.tsx`).
- External links always carry `target="_blank" rel="noopener noreferrer"` (`components/ui/project-card.tsx:53-57`).

## Logging

**Framework:** None (no logging library, no console statements in source).

**Patterns:** This is a static portfolio — code is written to not need runtime logging. Do not introduce logging without a reason; if needed, prefer `console.error` with a context prefix per `docs/code-standards.md`.

## Comments

**When to Comment:**
- JSX section markers inside large components: `{/* Category Badge */}`, `{/* Tech Tags */}`, `{/* Left Column (40% - 2 cols) */}` (`components/ui/project-card.tsx`, `components/sections/hero-section.tsx`)
- File-header comment for data-layer rules: `components/data/ai-resume-data.ts:1-3`
- Why-comments for non-obvious logic: `// URL param takes precedence, validated against allowlist`, `// Before client hydration, render iOS content to avoid layout shift`
- Comment-separated sections with divider lines in large data files: `// ------ Interfaces ------`

**JSDoc/TSDoc:**
- Only for public hooks: `components/hooks/use-typing-animation.ts:3-7` has a multi-line JSDoc block. Components and data files do not use JSDoc — types are self-documenting.

## Function Design

**Size:** Components 30–200 lines; one responsibility per component (section components compose UI primitives).
**Parameters:** Typed props objects with destructuring + defaults in the signature:
```tsx
export function ScrollReveal({ children, delay = 0, className = "" }: ScrollRevealProps)
```
(`components/effects/scroll-reveal.tsx:12-16`). Optional props get sensible defaults (`variant = "primary"`, `hover = true`).
**Return Values:** Hooks return state/values (`useTypingAnimation(...) => string`); pure utilities return computed values (`cn(...) => string`). Render functions are components, not helpers.

## Module Design

**Exports:** Named exports for everything (components, hooks, data, variants). Default exports only for App Router entry files.
**Barrel Files:** One barrel only — `components/ui/index.ts`. Sections/layout/effects are imported by direct path.
**Side effects:** Only context providers and layout mount effects. Data/variant modules are pure.
**Composability:** children-prop composition for layout components (`Card`, `ScrollReveal`, providers); composition of sections in `IOSContent`/`AIContent` groups (`components/layout/mode-router.tsx:53-76`).

## Accessibility Standards (enforced patterns)

1. `aria-label` on icon-only interactive elements (`components/layout/navbar.tsx:77`)
2. `focus-visible:ring-2` focus styles on all buttons/toggles (`components/ui/button.tsx:28`)
3. Skip-to-content link in root layout (`src/app/layout.tsx:104-109`)
4. Focus trap + Escape-to-close in `components/layout/mobile-menu.tsx:19-37`
5. `role="radiogroup"` / `role="radio"` + `aria-checked` for the mode toggle (`components/layout/mode-toggle.tsx:32-40`)
6. Reduced-motion support globally (`MotionProvider` + CSS)

## Commit Conventions

Conventional commits with scope, no AI references (observed in `git log`):
```
feat(ai-workflow): update to 6-step dev lifecycle
fix(navbar): prevent header cutoff by replacing translate centering with inset-x-0 mx-auto
docs: refresh project documentation
chore: add latest resume source file
```

---

*Convention analysis: 2026-09-03*
