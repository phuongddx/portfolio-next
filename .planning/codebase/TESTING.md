# Testing Patterns

**Analysis Date:** 2026-09-03

## Test Framework

**Runner:**
- **NONE INSTALLED.** No test framework exists in this codebase.
  - No `vitest`/`jest`/`playwright`/`cypress` in `package.json` dependencies or devDependencies
  - No `jest.config.*`, `vitest.config.*`, `playwright.config.*` files
  - Zero `*.test.*` or `*.spec.*` files in the repo (verified via find across the full tree)
  - No CI pipeline (no `.github/` directory)

**Assertion Library:**
- Not applicable

**Run Commands:**
```bash
npm run lint        # ESLint — the ONLY automated quality gate
npm run build       # `next build` — runs full TypeScript type-check + production build (de facto type gate)
npm run dev         # dev server for manual verification
npm run start       # production server for manual verification
```

## Test File Organization

**Location:**
- Not applicable — no tests exist. If/when tests are added, mirror the source tree per GSD/user-level conventions (`tests/` mirroring `components/`), or co-locate; there is no precedent in-repo to follow.

**Naming:**
- Not applicable

**Structure:**
- Not applicable

## Current Verification Strategy (what replaces tests)

This project is a static portfolio site. Quality is currently ensured by:

1. **`npm run lint`** — ESLint with `next/core-web-vitals` + `next/typescript` presets (`.eslintrc.json`). Catches React anti-patterns, hook rule violations, and TS issues.
2. **`npm run build`** — Next.js production build performs full strict TypeScript compilation (`strict: true` in `tsconfig.json`). A failing build is the type-safety gate.
3. **Manual browser verification** — `npm run dev` + visual check. The project has iOS-Simulator/Argent tooling available in the environment, but no scripted UI checks.
4. **Documentation review commands** — `.claude/commands/code-review.md` defines a pre-push holistic review process (design alignment, contract integrity, missing-test identification). This is a manual/agent workflow, not automation.

**Recommended framework if adding tests (no in-repo precedent):**
- **Vitest + @testing-library/react** for unit/component tests (aligns with the Vitest-based toolchain documented in the user-level `~/.config/opencode/AGENTS.md` environment conventions: `npm run test` → `vitest run`, single file via `npx vitest run tests/domains/<path>`).
- **Playwright** for E2E of the two portfolio modes (iOS/AI toggle flows).

## Intended Testing Strategy (documented, unimplemented)

The project documents a testing *intention* that has never been executed:

- `docs/ai/testing/README.md` — template for a testing strategy: "Unit test coverage target (default: 100% of new/changed code)", integration tests for critical paths, E2E for key user journeys, coverage commands `npm run test -- --coverage`.
- `.claude/commands/writing-test.md` — workflow: unit tests aiming for 100% coverage (happy path, edge cases, error handling), integration tests for cross-component flows, update `docs/ai/testing/feature-{name}.md`.
- Neither document is backed by any actual test file, runner script, or CI job. Treat these as the *specification* to implement if a testing phase is planned.

## Testability Assessment (where tests would land first)

The codebase has good seams for unit testing because logic is isolated from rendering:

**Highly testable (pure, no React):**
- `lib/utils.ts` — `cn()` class merge ordering (tailwind-merge conflict resolution)
- `components/effects/animation-variants.ts` — pure variant objects
- All data files (`components/data/*.ts`) — shape/type conformance, e.g. every `Experience.locationType ∈ {"Remote","Hybrid","On-site"}`, unique `id`s, `AISkill.level ∈ [0,100]`
- `components/layout/nav-links.ts` — `NAV_LINKS_BY_MODE` has an entry for every `Mode`

**Testable with render harness:**
- `components/context/mode-context.tsx` — the richest logic in the repo: `isValidMode` guard, URL-param-over-localStorage precedence, persistence write, `document.title` update. Mock `window.localStorage`/`URLSearchParams`/`window.history.replaceState`.
- `components/hooks/use-typing-animation.ts` — requestAnimationFrame loop; mock `requestAnimationFrame`/timers (jsdom or happy-dom), assert type/pause/delete cycle and cleanup on unmount.
- `components/layout/mode-toggle.tsx` — 500ms cooldown debouncing (`COOLDOWN_MS`) via `Date.now` mock.

**E2E candidates:**
- Mode toggle flow: default ios → toggle AI → content swaps via `AnimatePresence` → `?mode=ai` in URL → reload persists from localStorage
- `?mode=<invalid>` URL falls back to stored/ios mode
- Navbar anchor navigation per mode (`NAV_LINKS_BY_MODE`)

## Mocking

**Framework:** None (no test tooling installed).

**Patterns (guidance for future tests):**
```typescript
// Web APIs used by mode-context.tsx that would need mocking:
localStorage.getItem("portfolio-mode")
localStorage.setItem(...)
new URLSearchParams(window.location.search)   // mock via jsdom URL
window.history.replaceState({}, "", url)
document.title = TITLES[next]

// Animation/timing used by hooks:
requestAnimationFrame / cancelAnimationFrame  // vitest fake timers + raf mock
```

**What to Mock:**
- Browser APIs (`localStorage`, `history`, `document.title`, `matchMedia` for `useReducedMotion`)
- Timers/animation frames in hook tests
- `IntersectionObserver`/`useInView` if testing `components/effects/scroll-reveal.tsx`

**What NOT to Mock:**
- `lib/utils.ts` `cn()` — test the real implementation
- Data files — they are pure constants; assert against them directly

## Fixtures and Factories

**Test Data:**
- Not applicable (no tests). Note: the app's own data files (`components/data/projects-data.ts` etc.) double as realistic fixtures — import them in tests rather than duplicating content.

**Location:**
- Not applicable

## Coverage

**Requirements:** None enforced — no coverage tooling installed. The documented-but-unimplemented target in `docs/ai/testing/README.md` is 100% of new/changed code.

**View Coverage:**
```bash
# Not available. After adding Vitest:
npm run test -- --coverage
```

## Test Types

**Unit Tests:**
- None exist

**Integration Tests:**
- None exist

**E2E Tests:**
- None exist

## Common Patterns

**Async Testing:**
```typescript
// Not applicable — no tests exist. For future hook tests use Vitest fake timers:
// vi.useFakeTimers(); renderHook(() => useTypingAnimation(["a","b"])); vi.advanceTimersByTime(...)
```

**Error Testing:**
```typescript
// Not applicable. The only throw is the context invariant in
// components/context/mode-context.tsx:36 — assert it via:
// expect(() => renderHook(() => useMode())).toThrow("useMode must be used within ModeProvider")
```

## Quality Gate Summary

| Gate | Command | Status |
|------|---------|--------|
| Lint | `npm run lint` | Active (only automated gate) |
| Types | `npm run build` (strict TS) | Active (build-time) |
| Unit tests | — | **Missing** |
| Integration tests | — | **Missing** |
| E2E tests | — | **Missing** |
| CI pipeline | — | **Missing** (no `.github/`) |
| Pre-push review | `.claude/commands/code-review.md` | Manual/agent workflow |

**Risk note for planners:** any behavior change to `components/context/mode-context.tsx`, `components/layout/mode-router.tsx`, or `components/hooks/use-typing-animation.ts` is currently verified only by manual browser testing. These files contain the repo's only non-trivial runtime logic.

---

*Testing analysis: 2026-09-03*
