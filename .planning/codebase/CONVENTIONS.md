# Coding Conventions

**Analysis Date:** 2026-08-29

## Naming Patterns

**Files:**
- kebab-case for all files: `hero-section.tsx`, `animation-variants.ts`, `use-typing-animation.ts`
- Data files use `-data` suffix: `experience-data.ts`, `projects-data.ts`, `ai-resume-data.ts`
- Hooks use `use-` prefix: `use-typing-animation.ts`
- Context files use `-context` suffix: `mode-context.tsx`

**Functions/Components:**
- PascalCase for React component exports: `HeroSection`, `Button`, `ModeProvider`, `ScrollReveal`
- camelCase for utility functions: `cn()` in `lib/utils.ts`
- camelCase for hooks: `useTypingAnimation`, `useMode`
- camelCase for animation variant objects: `fadeInUp`, `staggerContainer`, `springTransition`

**Variables:**
- camelCase for local variables and state: `const [mode, setModeState] = useState(Mode>("ios")`
- UPPER_SNAKE_CASE for constants: `ALLOWED_MODES`, `STORAGE_KEY`, `TITLES`
- camelCase for exported data arrays: `experiences`, `projects`, `aiSkillCategories`, `terminalLines`

**Types:**
- PascalCase for interfaces/types: `Experience`, `Project`, `ButtonProps`, `ModeState`
- Union literals with lowercase: `"ios" | "ai"`, `"primary" | "secondary" | "outline"`
- Type-only imports with `type` keyword: `import type { Metadata } from "next"`, `import type { Project } from "@/components/data/projects-data"`

## Code Style

**Formatting:**
- No Prettier configuration present — formatting follows ESLint + Next.js defaults
- Single quotes not used; double quotes are the standard
- Semicolons present
- 2-space indentation

**Linting:**
- ESLint with `eslint-config-next` v14.2.35
- Config file: `.eslintrc.json`
- Extends: `next/core-web-vitals`, `next/typescript`
- Run command: `npm run lint` (alias for `next lint`)
- TypeScript strict mode enabled in `tsconfig.json`

## Import Organization

**Order:**
1. React / Next.js imports (including `type` imports from `next`)
2. External library imports (framer-motion, clsx, next-themes)
3. Internal imports using `@/` path alias
4. Type-only imports (typically inline or at end of import block)

**Path Aliases:**
- `@/*` maps to project root (`./*`)
- Always use `@/` for cross-directory imports: `import { cn } from "@/lib/utils"`
- Relative imports (`./`) used only for same-directory siblings: `import { Card } from "./card"`

**Example from `components/sections/hero-section.tsx`:**
```typescript
// 1. External library
import { m } from "framer-motion";
// 2. Internal components (alias)
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { StatBadge } from "@/components/ui/stat-badge";
import { LinkedInIcon, GitHubIcon, EmailIcon } from "@/components/ui/social-icons";
import { SocialLink } from "@/components/ui/social-link";
```

**Example from `components/layout/mode-router.tsx`:**
```typescript
// 1. External
import { m, AnimatePresence } from "framer-motion";
import dynamic from "next/dynamic";
// 2. Internal
import { useMode } from "@/components/context/mode-context";
import { HeroSection } from "@/components/sections/hero-section";
```

## Error Handling

**Patterns:**
- Context consumers throw descriptive errors when used outside provider:
```typescript
// components/context/mode-context.tsx
export function useMode(): ModeState {
  const ctx = useContext(ModeContext);
  if (!ctx) throw new Error("useMode must be used within ModeProvider");
  return ctx;
}
```
- Runtime type guards for external data validation:
```typescript
// components/context/mode-context.tsx
function isValidMode(value: unknown): value is Mode {
  return typeof value === "string" && (ALLOWED_MODES as readonly string[]).includes(value);
}
```
- `console.error` with context message in catch blocks (per `docs/code-standards.md`)
- No global error boundary component exists; relies on Next.js default error handling

## Logging

**Framework:** `console` (no logging library)

**Patterns:**
- `console.error("Context message:", error)` in catch blocks
- No structured logging, no logging abstraction
- No debug logging in production code

## Comments

**When to Comment:**
- Section dividers in data files using `// ---` separator lines:
```typescript
// ---------------------------------------------------------------------------
// Interfaces
// ---------------------------------------------------------------------------
```
- Inline comments for non-obvious logic: `// URL param takes precedence, validated against allowlist`
- Block comments for hooks explaining behavior/purpose
- JSX comments using `{/* ... */}` for section labels: `{/* Left Column (40% - 2 cols) */}`

**JSDoc/TSDoc:**
- Used sparingly, only for hooks with non-trivial contracts:
```typescript
/**
 * Typing animation hook that cycles through phrases character by character.
 * Uses requestAnimationFrame for smooth updates.
 */
export function useTypingAnimation(
  phrases: string[],
  charsPerTick = 2,
  pauseMs = 1500
): string {
```
- Not used for simple components or utility functions

## Function Design

**Size:**
- Target under 200 lines per component (per `docs/code-standards.md`)
- Section components are the largest, up to ~200 lines
- UI primitives are small, typically 20-60 lines

**Parameters:**
- Destructured props with typed interface at top of file:
```typescript
interface ButtonProps {
  children: ReactNode;
  className?: string;
  variant?: "primary" | "secondary" | "outline";
  size?: "sm" | "md" | "lg";
}

export function Button({ children, className = "", variant = "primary", size = "md" }: ButtonProps) {
```
- Default values provided inline in destructuring
- Optional props always have defaults (`className = ""`, `hover = true`)

**Return Values:**
- Components always return JSX
- Hooks return single typed value or tuple
- Data files export typed arrays/objects
- No function overloading observed

## Module Design

**Exports:**
- Named exports only — no default exports except Next.js page/layout files (`src/app/page.tsx`, `src/app/layout.tsx`, `src/app/opengraph-image.tsx`)
- Every component, hook, and utility is a named export

**Barrel Files:**
- `components/ui/index.ts` re-exports all UI primitives
- Consumers import from barrel: `import { Card, Button, Badge } from "@/components/ui"`
- No barrel files for `sections/`, `data/`, or other subdirectories — import directly:
```typescript
import { HeroSection } from "@/components/sections/hero-section";
import { experiences } from "@/components/data/experience-data";
```

**"use client" Directive:**
- Use at top of file when component needs: React hooks, framer-motion, browser APIs, event handlers
- Server components are the default — omit directive for static/SEO content
- Edge-runtime server components use `export const runtime = "edge"` (see `src/app/opengraph-image.tsx`)

## Component Patterns

**Props Interface Pattern:**
- Always define a `ComponentNameProps` interface above the component
- Use `ReactNode` for children, `string` for className
- Variant props use string literal unions

**cn() Utility:**
- Use `cn()` from `@/lib/utils` (wraps `clsx` + `tailwind-merge`) for all conditional className merging
- Never use string concatenation or template literals for classes
```typescript
// Correct
className={cn("base-classes", condition && "conditional-class", className)}

// Wrong
className={`base-classes ${condition ? "conditional-class" : ""} ${className}`}
```

**Framer Motion Convention:**
- Always import `m` from `framer-motion`, never `motion` (LazyMotion strict mode)
- Wrap app in `MotionProvider` (handles reduced motion globally)
- Centralize reusable variants in `components/effects/animation-variants.ts`
- Use `ScrollReveal` wrapper for viewport-triggered animations
- Spring defaults: `stiffness: 300, damping: 20` (also in CSS vars `--spring-stiffness`, `--spring-damping`)

**Dynamic Imports:**
- Use `next/dynamic` with `ssr: false` for heavy/client-only sections (AI mode sections)
- Provide a `SectionSkeleton` loading component
- Static imports for always-loaded sections (iOS mode)

**Data Layer Pattern:**
- Static data lives in `components/data/*.ts` files
- Co-locate interface definitions above data exports in same file
- Components import data, never hardcode values
- Separate data files per mode: `experience-data.ts` (iOS) vs `ai-resume-data.ts` (AI)

---

*Convention analysis: 2026-08-29*
