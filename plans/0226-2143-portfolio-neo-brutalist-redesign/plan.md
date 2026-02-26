---
title: "Portfolio Neo-Brutalist Redesign"
description: "Full UI redesign from glassmorphism to neo-brutalist lite style"
status: complete
priority: P1
effort: 6h
branch: main
tags: [frontend, redesign, ui]
created: 2026-02-26
completed: 2026-02-26
---

# Portfolio Neo-Brutalist Redesign

## Overview

Complete UI transformation from glassmorphic elegance to bold, playful neo-brutalist style.

**Key Changes:**
- Light-only theme (dark mode removed)
- Bold 2px borders with dark color (#1f2937)
- Vibrant green primary (#22c55e) + pastel accents
- Rounded corners (12-20px radius)
- White cards with minimal shadows
- Two-column hero with featured project

## Design Decisions

| Decision | Choice | Rationale |
|----------|--------|-----------|
| Dark Mode | Remove | Neo-brutalist is light-centric |
| Primary Color | Green (#22c55e) | Playful, high contrast |
| Border Style | 2px solid #1f2937 | Bold definition |
| Card Style | White bg, no blur | Clean, performant |
| Animations | Keep Framer Motion | Maintain polish |

## Color System

```css
--background: #f8f9fa;
--foreground: #1f2937;
--muted: #6b7280;
--primary: #22c55e;
--border: #1f2937;
--card: #ffffff;
--accent-pink: #fecaca;
--accent-blue: #93c5fd;
--accent-purple: #ddd6fe;
--accent-green: #bbf7d0;
--accent-lime: #a3e635;
```

## Phases

| # | Phase | Focus | Effort | Status |
|---|-------|-------|--------|--------|
| 1 | [Foundation](./phase-01-foundation.md) | CSS variables, remove dark mode | 1h | Complete |
| 2 | [Core Components](./phase-02-core-components.md) | Card, Button, Badge | 1.5h | Complete |
| 3 | [Layout](./phase-03-layout.md) | Navbar, Footer | 1h | Complete |
| 4 | [Sections](./phase-04-sections.md) | Hero, About, Experience, Skills, Projects, Contact | 2h | Complete |
| 5 | [Polish](./phase-05-polish.md) | Responsive, A11y, Performance | 0.5h | Complete |

## Dependencies

- Phase 1 must complete before Phase 2-4
- Phase 2-4 can run in parallel after Phase 1
- Phase 5 runs last

## Files to Modify

| Action | File | Phase |
|--------|------|-------|
| Modify | `src/app/globals.css` | 1 |
| Modify | `tailwind.config.ts` | 1 |
| Rename | `components/ui/glass-card.tsx` → `card.tsx` | 2 |
| Modify | `components/ui/button.tsx` | 2 |
| Modify | `components/ui/badge.tsx` | 2 |
| Create | `components/ui/stat-badge.tsx` | 2 |
| Modify | `components/layout/glass-navbar.tsx` | 3 |
| Delete | `components/theme/theme-toggle.tsx` | 3 |
| Modify | `components/layout/footer.tsx` | 3 |
| Modify | `components/sections/hero-section.tsx` | 4 |
| Modify | `components/sections/about-section.tsx` | 4 |
| Modify | `components/sections/experience-section.tsx` | 4 |
| Modify | `components/sections/skills-section.tsx` | 4 |
| Modify | `components/sections/projects-section.tsx` | 4 |
| Modify | `components/sections/side-projects-section.tsx` | 4 |
| Modify | `components/sections/contact-section.tsx` | 4 |
| Modify | `src/app/layout.tsx` | 3 |

## Success Criteria

- [x] No glassmorphism effects remaining
- [x] All cards use white bg + dark border
- [x] Primary buttons are green (#22c55e)
- [x] Hero has two-column layout
- [x] Stats displayed with icons
- [x] Dark mode removed
- [x] All animations functional
- [x] Responsive on all breakpoints
- [x] Accessible (keyboard, screen reader)

## Validation Log

### Session 1 — 2026-02-26
**Trigger:** Initial plan validation before implementation
**Questions asked:** 3

#### Questions & Answers

1. **[Scope]** The hero features a 'Featured Project' card. Should this be hardcoded or dynamically selected from your projects data?
   - Options: Hardcoded selection | Dynamic (first project) | Dynamic (most recent)
   - **Answer:** Hardcoded selection (Recommended)
   - **Rationale:** Full control over featured content, easier to highlight best work

2. **[Data]** The stat values (5+ Years XP, 20+ Projects, 15+ Clients) in hero - are these accurate or placeholders?
   - Options: Accurate, use as-is | Placeholders, update me | Make configurable
   - **Answer:** Accurate, use as-is
   - **Rationale:** Values are verified, no data updates needed

3. **[Architecture]** Should we keep the existing Side Projects section or merge it into Projects?
   - Options: Keep separate | Merge into Projects | Remove section
   - **Answer:** Keep separate (Recommended)
   - **Rationale:** Maintains distinction between main portfolio and experimental/hobby projects

#### Confirmed Decisions
- Featured project: Hardcoded - manually specify which project to feature
- Hero stats: 5+ Years XP, 20+ Projects, 15+ Clients (accurate)
- Side Projects section: Keep as separate section with GitHub-style cards

#### Action Items
- None - all decisions align with existing plan

#### Impact on Phases
- No phase changes required - plan validated as-is

### Session 2 — 2026-02-26 (Re-validation)
**Trigger:** User requested additional validation before implementation
**Questions asked:** 3

#### Questions & Answers

1. **[Data]** The hero features a 'Featured Project' card. Should this be hardcoded or dynamically selected from your projects data?
   - Options: Hardcoded selection | Dynamic (first project) | Dynamic (most recent)
   - **Answer:** Hardcoded selection (Recommended)
   - **Rationale:** Full control over featured content, easier to highlight best work

2. **[Data]** The stat values (5+ Years XP, 20+ Projects, 15+ Clients) in hero - are these accurate or placeholders?
   - Options: Accurate, use as-is | Placeholders, update me | Make configurable
   - **Answer:** Accurate, use as-is
   - **Rationale:** Values are verified, no data updates needed

3. **[Architecture]** Should we keep the existing Side Projects section or merge it into Projects?
   - Options: Keep separate | Merge into Projects | Remove section
   - **Answer:** Keep separate (Recommended)
   - **Rationale:** Maintains distinction between main portfolio and experimental/hobby projects

#### Confirmed Decisions
- Featured project: Hardcoded - manually specify which project to feature
- Hero stats: 5+ Years XP, 20+ Projects, 15+ Clients (accurate)
- Side Projects section: Keep as separate section with GitHub-style cards

#### Action Items
- None - all decisions confirmed, plan ready for implementation

#### Impact on Phases
- No phase changes required - re-validation confirms existing plan
