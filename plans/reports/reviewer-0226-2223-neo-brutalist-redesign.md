# Code Review: Neo-Brutalist Redesign

**Reviewer:** code-reviewer
**Date:** 2026-02-26
**Scope:** UI components, layout, sections, CSS variables, theme config
**LOC:** ~1,500 lines across 20+ files

---

## Summary

Neo-brutalist redesign implementation is well-structured with clean separation of concerns. Dark mode and glassmorphism removed successfully. Code compiles with no TypeScript errors and passes ESLint. Minor issues found with unused legacy components and inconsistent border styling.

---

## Critical Issues

None found.

---

## High Priority

### [IMPORTANT] Unused legacy UI components exist
- **Evidence:** `/components/ui/project-card.tsx` and `/components/ui/side-project-card.tsx` export from index but are not imported anywhere. Sections use inline card implementations instead.
- **Files:**
  - `components/ui/project-card.tsx` (67 lines)
  - `components/ui/side-project-card.tsx` (117 lines)
  - `components/ui/index.ts` lines 6-7
- **Impact:** Dead code increases bundle size, maintenance burden
- **Recommendation:** Either remove unused files or refactor sections to use the exported components for DRY principle

### [IMPORTANT] Inconsistent border usage in project-card.tsx
- **Evidence:** Line 42: `border-t border-white/20` uses transparency not aligned with neo-brutalist solid borders
- **File:** `components/ui/project-card.tsx:42`
- **Impact:** Inconsistent visual style (mixing transparent borders with solid brutal borders elsewhere)
- **Recommendation:** Use solid border consistent with design: `border-t-2 border-gray-200`

### [IMPORTANT] Inconsistent border usage in side-project-card.tsx
- **Evidence:** Line 85: `border-t border-white/20` uses transparency
- **File:** `components/ui/side-project-card.tsx:85`
- **Impact:** Same as above - inconsistent with neo-brutalist solid borders
- **Recommendation:** Use `border-t-2 border-gray-200` for consistency

---

## Moderate Priority

### [MODERATE] Duplicate animation variant definitions across sections
- **Evidence:** `containerVariants` and `cardVariants` defined identically in:
  - `hero-section.tsx` lines 13-35
  - `experience-section.tsx` lines 20-41
  - `projects-section.tsx` lines 28-49
  - `side-projects-section.tsx` lines 8-29
  - `skills-section.tsx` lines 26-61
  - `contact-section.tsx` lines 40-62
- **Impact:** DRY violation, maintenance overhead
- **Recommendation:** Extract to shared animation constants file (e.g., `components/effects/animation-variants.ts`)

### [MODERATE] Duplicate pastel color arrays across multiple files
- **Evidence:** `const pastelColors = ["bg-pink-200", "bg-blue-200", ...]` repeated in:
  - `about-section.tsx:8`
  - `experience-section.tsx:10`
  - `projects-section.tsx:11`
  - `skills-section.tsx:9`
  - `contact-section.tsx:14`
- **Impact:** DRY violation, potential for inconsistency
- **Recommendation:** Extract to `components/constants/colors.ts` or define in Tailwind config

### [MODERATE] Duplicate navLinks array in navbar.tsx and mobile-menu.tsx
- **Evidence:** Same array defined in both files
  - `navbar.tsx:9-14`
  - `mobile-menu.tsx:7-12`
- **Impact:** DRY violation, potential for nav links to get out of sync
- **Recommendation:** Extract to shared navigation config file

### [MODERATE] Unused SunIcon and MoonIcon exports in social-icons.tsx
- **Evidence:** `social-icons.tsx` exports `SunIcon` (lines 39-55) and `MoonIcon` (lines 57-73)
- **Impact:** Dead code, no theme toggle component exists
- **Recommendation:** Remove if theme toggle was intentionally removed as part of dark mode removal

### [MODERATE] Button Contact in navbar lacks href attribute
- **Evidence:** `navbar.tsx:59-61` - Button with "Contact" text has no link wrapper
- **Impact:** Button does nothing on click
- **Recommendation:** Wrap in `<a href="#contact">` like other CTA buttons

---

## Low Priority

### [MODERATE] Hardcoded background colors instead of CSS variables
- **Evidence:** `hero-section.tsx:41` uses `bg-[#f8f9fa]` instead of `bg-background`
- **Files:** `hero-section.tsx:41`, `experience-section.tsx:45`, `projects-section.tsx:53`, `contact-section.tsx:66`
- **Impact:** Inconsistency with CSS variable approach in globals.css
- **Recommendation:** Replace `bg-[#f8f9fa]` with `bg-background` (defined as `#f8f9fa` in CSS vars)

### [MODERATE] Contact button wrapper uses button with onClick vs anchor
- **Evidence:** `mobile-menu.tsx:79-85` uses anchor with button-like styling, while desktop navbar at line 59 uses Button component without anchor
- **Impact:** Inconsistent approach between mobile and desktop
- **Recommendation:** Standardize - either both use Button wrapped in anchor, or both use styled anchor

### [LOW] ScrollReveal delay prop inconsistency
- **Evidence:** `contact-section.tsx:74` uses `delay={0.1}` while `contact-section.tsx:122` uses `delay={0.4}` with no documentation
- **Impact:** Hard to understand timing logic
- **Recommendation:** Document timing rationale or extract to named constants

---

## Accessibility Assessment

| Item | Status | Notes |
|------|--------|-------|
| Skip to content link | PASS | Present in layout.tsx:64-68 |
| ARIA labels (nav) | PASS | aria-label, aria-expanded on mobile toggle |
| Focus trap (mobile menu) | PASS | Implemented in mobile-menu.tsx:32-39 |
| Escape key handler | PASS | mobile-menu.tsx:22-29 |
| External link security | PASS | All use rel="noopener noreferrer" |
| Reduced motion | PASS | globals.css:38-50 respects prefers-reduced-motion |
| Focus visible styles | PASS | Button has focus-visible:ring styles |

---

## Verification Checklist

| Check | Status |
|-------|--------|
| TypeScript compiles | PASS |
| ESLint passes | PASS |
| No `dark:` classes | PASS |
| No glassmorphism | PASS |
| No glass-card/glass-navbar imports | PASS |
| CSS variables defined | PASS |
| Theme toggle removed | PASS |

---

## Positive Observations

1. Clean component architecture with clear separation of data/UI
2. Consistent naming conventions (kebab-case files, PascalCase components)
3. Good use of TypeScript interfaces for type safety
4. Proper accessibility implementation (focus trap, ARIA, keyboard nav)
5. Respects prefers-reduced-motion for accessibility
6. All components under 200 lines
7. Data separated into dedicated files for maintainability
8. Framer Motion animations consistently applied
9. Brutal shadow style well-defined in Tailwind config

---

## Metrics

- **Type Coverage:** 100% (strict mode)
- **Linting Issues:** 0
- **Files Reviewed:** 21
- **Unused Exports:** 4 (ProjectCard, SideProjectCard, SunIcon, MoonIcon)

---

## Recommended Actions

1. **Immediate:** Fix Contact button in navbar to link to #contact section
2. **Short-term:** Remove unused UI components (project-card.tsx, side-project-card.tsx) or refactor sections to use them
3. **Short-term:** Extract shared animation variants to constants file
4. **Short-term:** Extract shared pastel colors to constants
5. **Low priority:** Replace hardcoded `bg-[#f8f9fa]` with `bg-background` CSS variable
6. **Low priority:** Remove SunIcon/MoonIcon if theme toggle permanently removed

---

## Unresolved Questions

1. Should the unused `project-card.tsx` and `side-project-card.tsx` be kept for future use or removed?
2. Was the theme toggle removal intentional? If so, should SunIcon/MoonIcon be removed from social-icons.tsx?
3. Is there a design system documentation file that should be updated with the new neo-brutalist style guidelines?
