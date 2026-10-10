# Review: resume-content

Reviewer: AI reviewers (per-task: Sonnet; whole-branch: Opus; fix re-review: Sonnet) — merge approval belongs to the owner
Date: 2026-10-10
Plan under review: `plan.md` in this directory
Range: `f19d974..4881249` (6 commits on `main`)

## Passes

- **Bugs** — logic errors, broken edge cases, subtle regressions.
- **Security** — injection risks, auth gaps, secrets/PII exposure.
- **Compliance** — the diff matches the plan and repo conventions.

## Severity rule

**Important** = would break behavior, leak data, or breach policy.
Style and naming are nits.

## Findings

Per-task reviews (Tasks 1–5): all spec-compliant, task quality approved; no Critical/Important findings.

Whole-branch review (`f19d974..7a41c1c`) — verdict **"With fixes"**:

| # | Severity | Pass | Location | Note | Status |
| --- | --- | --- | --- | --- | --- |
| 1 | Important | Compliance | `components/sections/hero-section.tsx` Featured Project card | "4 dynamic appearances" (not in CV) and "40% faster" (misstates CV ~40% less UI dev time); plan missed this hardcoded card | Fixed in `4881249` |
| 2 | Important | Bugs | `components/sections/ai-skills-section.tsx` `categoryColors` | Keyed by title; Task 5 title renames turned 5/7 AI skill bars grey | Fixed in `4881249` (keyed by id) |
| 3 | Important | Bugs | `src/app/opengraph-image.tsx:44`, `src/app/layout.tsx` images | OG route crashed on `width: "fit-content"` (pre-existing since `39c1b8f`; prod serves cached 0-byte PNG); `twitter:image` pointed at nonexistent `/opengraph-image.png` | Fixed in `4881249` (route now 200, 36 KB PNG) |
| 4 | Important | Bugs | `components/sections/skills-section.tsx` `categoryIcons` | Keyed `ai-assisted` after id rename to `ai-platform`; `services` had no icon | Fixed in `4881249` |
| 5 | Nit | Compliance | `components/sections/about-section.tsx:18` | "40%" vs CV "~40%" | Fixed in `4881249` |
| 6 | Nit | Compliance | `components/sections/ai-projects-section.tsx` | Stale "GitHub" comments after optional-link change | Fixed in `4881249` |

Fix-wave re-review: 6/6 addressed, no new breakage.

Open nits (not fixed; owner call): `AIProject` link rule not type-enforced; "Since 2026-06" ISO wording (verbatim CV); 7th AI skill card orphaned in 2-col grid; some iOS skill tags not literally in the CV; "See My Workflow" CTA targets the generic workflow demo; jarvis side-project label vs CV redirect URL; `typingPhrases`/`workflowSteps`/`terminalLines` remain a generic demo (plan out of scope). 7 total.

Owner sign-off still required: AI-mode skill-bar percentages (self-assessed, shown publicly).

Post-deploy: purge Vercel's cached empty `/opengraph-image`; resubmit sitemap for `https://www.phuongddx.cc` in Search Console.

Docs promotion: accepted by owner — production domain fact added to `docs/engineering/infrastructure.md`.

## Verdict

Reviewer verdict: request changes → changes applied → re-review "all findings addressed, no new Critical/Important breakage". Merge approval is the owner's.
