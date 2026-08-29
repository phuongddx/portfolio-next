# Testing Patterns

**Analysis Date:** 2026-08-29

## Test Framework

**Runner:**
- None configured

No test runner, assertion library, or testing framework is installed or configured in this project. There are no test files (`*.test.*`, `*.spec.*`) anywhere in the repository.

**Not present:**
- No `jest.config.*` or `vitest.config.*`
- No `@testing-library/react`, `@testing-library/jest-dom`, or `jest` in `package.json` dependencies
- No `__tests__/` directories
- No test scripts in `package.json` (only `dev`, `build`, `start`, `lint`)
- No coverage tooling

## Test File Organization

**Location:**
- Not applicable — no tests exist

**Naming:**
- Not applicable

## Test Structure

**Suite Organization:**
- Not applicable

## Mocking

**Framework:** None

**Patterns:**
- Not applicable

## Fixtures and Factories

**Test Data:**
- Not applicable

## Coverage

**Requirements:** None enforced

**View Coverage:**
- No coverage command available

## Test Types

**Unit Tests:**
- Not present

**Integration Tests:**
- Not present

**E2E Tests:**
- Not present

## Common Patterns

**Async Testing:**
- Not applicable

**Error Testing:**
- Not applicable

## Manual Verification

Since no automated tests exist, the project relies on:

1. **`npm run build`** — TypeScript compilation catches type errors via `strict: true` in `tsconfig.json`
2. **`npm run lint`** — ESLint with `next/core-web-vitals` and `next/typescript` catches lint errors and accessibility issues
3. **Visual inspection** — `npm run dev` for manual browser testing

## Recommendations for Adding Tests

**Suggested setup:**
- Add Vitest (aligns with Vite ecosystem, fast, TypeScript-native)
- Add `@testing-library/react` for component testing
- Add `jsdom` environment for DOM testing

**What to test first (high-value targets):**
- `components/context/mode-context.tsx` — mode switching, localStorage hydration, URL param precedence, validation guard
- `components/hooks/use-typing-animation.ts` — animation cycling, cleanup on unmount
- `lib/utils.ts` — `cn()` class merging (trivial but validates setup)
- `components/ui/button.tsx` — variant/size prop rendering, disabled state, aria-label passthrough

**Test file location convention to adopt:**
- Co-locate tests beside source files: `components/ui/button.test.tsx`
- Or use `__tests__/` directories per section

---

*Testing analysis: 2026-08-29*
