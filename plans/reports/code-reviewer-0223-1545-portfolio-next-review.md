# Code Review Report: Portfolio Next.js Implementation

**Date:** 2026-02-23
**Reviewer:** code-reviewer agent
**Score:** 8.5/10

---

## Scope

- **Files:** 20 TypeScript/TSX files across components, layouts, sections, UI, effects
- **LOC:** ~1,200 (estimated)
- **Focus:** Full codebase review
- **Scout findings:** Static site (no complex data flow), edge cases minimal

---

## Overall Assessment

Well-structured Next.js 14 portfolio with clean component organization, proper Framer Motion implementation using LazyMotion, and solid accessibility foundations. TypeScript is configured strictly. Dark mode uses next-themes correctly. Security headers are present. A few optimizations and consistency improvements could elevate quality.

---

## Critical Issues

### None Identified

No security vulnerabilities, data loss risks, or breaking changes detected.

---

## High Priority

### 1. LazyMotion Strict Mode - Incomplete Usage

**File:** `/Users/ddphuong/Projects/next-labs/portfolio-next/components/effects/motion-provider.tsx`

The `MotionProvider` uses `strict` mode with `LazyMotion`, but some components import `motion` directly instead of `m`:

```tsx
// motion-provider.tsx - Line 8
<LazyMotion features={domAnimation} strict>
```

**Problem:** In `/Users/ddphuong/Projects/next-labs/portfolio-next/components/ui/button.tsx`:

```tsx
import { motion } from "framer-motion";  // Should use 'm' instead
```

**Impact:** `strict` mode requires all motion components to use `m` (lightweight). Using `motion` bypasses LazyMotion optimization, increasing bundle size.

**Fix:** Change to `import { m } from "framer-motion"` and use `<m.button>`.

---

### 2. Reduced Motion - Partial Implementation

**Files:**
- `/Users/ddphuong/Projects/next-labs/portfolio-next/src/app/globals.css` (Lines 32-44)
- Section components with hardcoded animations

**Problem:** CSS handles `prefers-reduced-motion` but Framer Motion animations have no equivalent check. Users with motion sensitivity still get spring animations.

**Impact:** Accessibility issue - violates WCAG 2.1 Guideline 2.3.

**Recommended Fix:** Add a `useReducedMotion` hook from Framer Motion:

```tsx
import { useReducedMotion } from "framer-motion";

// In component:
const prefersReducedMotion = useReducedMotion();
const animationProps = prefersReducedMotion ? {} : { whileHover: { scale: 1.05 } };
```

---

### 3. Button Component Lacks Accessibility Props

**File:** `/Users/ddphuong/Projects/next-labs/portfolio-next/components/ui/button.tsx`

**Problem:** No `aria-label`, `aria-disabled`, or focus-visible styles.

**Impact:** Keyboard users have no visual focus indication; screen readers lack context.

**Recommended Fix:**

```tsx
interface ButtonProps {
  // ... existing
  ariaLabel?: string;
  disabled?: boolean;
}

// Add focus-visible to className:
"focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cta"
```

---

## Medium Priority

### 4. Duplicated Animation Variants Across Sections

**Files:** Hero, Experience, Skills, Projects, Contact sections

**Problem:** Each section defines its own `containerVariants` and `cardVariants` with identical/similar values.

**Location Examples:**
- `hero-section.tsx` (Lines 12-34)
- `experience-section.tsx` (Lines 8-29)
- `skills-section.tsx` (Lines 8-43)

**Impact:** Violates DRY principle; harder to maintain consistent animations.

**Recommended Fix:** Use shared variants from `/Users/ddphuong/Projects/next-labs/portfolio-next/components/effects/animation-variants.ts` which already exports `staggerContainer`, `staggerItem`, etc.

---

### 5. External Link Security - Missing noopener

**File:** `/Users/ddphuong/Projects/next-labs/portfolio-next/components/sections/hero-section.tsx` (Line 131-132)

```tsx
rel={href.startsWith("mailto") ? undefined : "noopener noreferrer"}
```

**Problem:** Correctly handles external links, but pattern is repeated. Consider centralizing.

**Note:** This is done correctly in hero and contact sections. No action required, just observation for consistency.

---

### 6. Phone Number Exposed in Footer

**File:** `/Users/ddphuong/Projects/next-labs/portfolio3/portfolio-next/components/layout/footer.tsx` (Line 10)

```tsx
Ho Chi Minh, Vietnam | +84373.946.083
```

**Impact:** Potential spam/harvesting target. Consider obfuscation or contact form.

---

### 7. PageTransition Component Unused

**File:** `/Users/ddphuong/Projects/next-labs/portfolio-next/components/layout/page-transition.tsx`

**Problem:** Component exists but is not imported anywhere in the codebase.

**Impact:** Dead code; increases maintenance burden.

**Recommendation:** Either use it in layout.tsx or remove it.

---

### 8. DeviceMockup Uses Plain img Tag

**File:** `/Users/ddphuong/Projects/next-labs/portfolio-next/components/ui/device-mockup.tsx` (Lines 59-65)

```tsx
{/* eslint-disable-next-line @next/next/no-img-element */}
<img src={src} alt={...} loading="lazy" />
```

**Problem:** Uses native `img` instead of Next.js `Image` component, missing optimization benefits.

**Impact:** Larger payload, no automatic format conversion (WebP/AVIF).

**Justification:** Dynamic width/height for device mockups makes Next Image difficult. Acceptable trade-off with eslint disable.

---

## Low Priority

### 9. CSS Variable Consistency

**Files:**
- `globals.css` defines `--spring-stiffness`, `--spring-damping`
- `animation-variants.ts` hardcodes `stiffness: 300, damping: 20`

**Recommendation:** Either use CSS variables via JavaScript or remove unused CSS variables.

---

### 10. Missing OpenGraph Image

**File:** `/Users/ddphuong/Projects/next-labs/portfolio-next/src/app/layout.tsx`

**Problem:** Metadata defines `twitter: card: "summary_large_image"` but no image URL is provided.

**Impact:** Poor social media preview appearance.

---

### 11. No Error Boundaries

**Problem:** No error boundary components detected for graceful error handling.

**Impact:** Runtime errors cause white screen of death.

---

## Positive Observations

1. **Excellent LazyMotion Implementation** - Using `domAnimation` with `strict` mode for bundle optimization
2. **Clean TypeScript Configuration** - `strict: true`, proper path aliases
3. **Security Headers** - X-Frame-Options, X-Content-Type-Options, Referrer-Policy, Permissions-Policy
4. **Skip-to-Content Link** - Proper accessibility pattern
5. **Theme Toggle Mount Check** - Avoids hydration mismatch
6. **Mobile Menu Focus Trap** - Keyboard navigation support
7. **Escape Key Handler** - Closes mobile menu appropriately
8. **Consistent Animation Patterns** - Spring animations with sensible defaults
9. **cn() Utility** - Proper class merging with clsx + tailwind-merge
10. **Semantic HTML** - Proper use of `main`, `section`, `nav`, `footer`
11. **Build Size** - 142KB first load JS is reasonable for animated portfolio

---

## Recommended Actions

1. **[High]** Fix `motion` import in button.tsx to use `m`
2. **[High]** Add `useReducedMotion` hook to section animations
3. **[High]** Add focus-visible styles to interactive components
4. **[Medium]** Refactor duplicated animation variants to use shared exports
5. **[Medium]** Either use or remove `PageTransition` component
6. **[Low]** Add OpenGraph image to metadata
7. **[Low]** Consider adding error boundary for production resilience

---

## Metrics

| Metric | Value |
|--------|-------|
| TypeScript Strict Mode | Enabled |
| Build Status | Success |
| First Load JS | 142 KB |
| Linting | Passed |
| Test Coverage | Not configured |
| Motion Optimization | LazyMotion (partial) |

---

## Unresolved Questions

1. Should contact form be implemented instead of exposing email/phone directly?
2. Is `PageTransition` intended for future multi-page routes or should it be removed?
3. Would adding unit tests (Jest/Vitest) be valuable for this static portfolio?

---

## Final Score Breakdown

| Category | Score | Weight |
|----------|-------|--------|
| Component Structure | 9/10 | 20% |
| Framer Motion Usage | 8/10 | 15% |
| Accessibility | 7/10 | 20% |
| Performance | 9/10 | 15% |
| TypeScript Safety | 9/10 | 10% |
| Dark Mode | 9/10 | 10% |
| Security | 9/10 | 10% |

**Overall:** 8.5/10
