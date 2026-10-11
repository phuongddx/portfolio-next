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

Open nits (not fixed; owner call): `AIProject` link rule not type-enforced; "Since 2026-06" ISO wording (verbatim CV); 7th AI skill card orphaned in 2-col grid; some iOS skill tags not literally in the CV; jarvis side-project label vs CV redirect URL. 5 open. (Resolved in round 2: "See My Workflow" CTA targeting the generic demo; `typingPhrases`/`workflowSteps`/`terminalLines` generic demo.)

Owner sign-off still required: AI-mode skill-bar percentages (self-assessed, shown publicly).

Post-deploy: purge Vercel's cached empty `/opengraph-image`; resubmit sitemap for `https://www.phuongddx.cc` in Search Console.

Docs promotion: accepted by owner — production domain fact added to `docs/engineering/infrastructure.md`.

## Verdict

Reviewer verdict: request changes → changes applied → re-review "all findings addressed, no new Critical/Important breakage". Merge approval is the owner's.

---

# Round 2: AI-Native SDLC workflow section

Reviewer: AI reviewers (per-task: Sonnet; whole-change: Opus; fix re-review: Sonnet). Merge approval belongs to the owner.
Date: 2026-10-10
Spec: `spec.md` (approved `a557861`). Plan: `plan.md`, Round 2, Tasks 7–10.
Range: `f7d4237..54bf1ef` (7 commits on `main`)

## Findings

Per-task reviews (Tasks 7–9): all spec-compliant, task quality approved. Task 9's one Important finding was plan-mandated (literal `↗`/`✗` glyphs in JSX vs the `\u`-escape constraint). The controller ruled the code stands: the constraint covers data-file strings and rendering is identical. Task 10 was verification only, with no diff, and passed sweep, data check, build, browser at 390px/1280px, and 6 pre-push links.

Whole-change review (`f7d4237..7352324`), verdict **"With fixes"**:

| # | Severity | Pass | Location | Note | Status |
| --- | --- | --- | --- | --- | --- |
| 1 | Important | Compliance | `ai-resume-data.ts` subtitle | "this site's last update" goes stale once round 2 ships | Fixed in `54bf1ef` (names the resume-content run) |
| 2 | Important | Compliance | `ai-resume-data.ts` terminal + step 2 | Replay's `$ spec` line implied round 1 had a spec stage; it did not | Fixed in `54bf1ef` (`$ intent` / "owner confirmed"; evidence relabelled "this section's spec") |
| 3 | Important | Compliance | this file, `spec.md` | No round-2 close-out; review.md still called the section a generic demo | Fixed by this close-out |
| 4 | Minor | Compliance | terminal "build ·", step 6, step 4 | "build" after the fix wave and "fresh agent per task" not recorded in the repo | Recorded below (true) |
| 5 | Minor | Compliance | catch 4 detail | Mis-described the finding | Fixed in `54bf1ef` |
| 6 | Minor | Bugs | workflow links | `text-green-600` fails AA contrast | Fixed in `54bf1ef` (`text-green-700`) |
| 7 | Minor | Bugs | evidence link | `break-all` mid-word breaks | Fixed in `54bf1ef` |
| 8 | Minor | Bugs | terminal replay | Plays on mount, not on scroll into view (pre-existing) | Deferred: animation is out of spec scope |
| 9 | Minor | Compliance | `docs/engineering/conventions.md`, `AGENTS.md` | New `docs/features/` layout not mentioned | Promoted: owner accepted; line added to `docs/engineering/conventions.md` |

Also folded into `54bf1ef`: "Gate:"/"fix" labels moved to data; `↗` is `aria-hidden`; links carry sr-only context (`for {title} (opens in new tab)`).

Fix-wave re-review: 6/6 addressed, no new breakage.

Traceability record (finding 4): round 1 ran one fresh implementer agent per task; final gates on `4881249` included `npm run build` (5/5 pages) before push.

Open (deferred, owner call): replay starts on mount (finding 8); 4 "fix" links all point at the one fix commit `4881249` (accurate); catch rows centre the link against two-line text at `sm`.

Post-push: confirm `spec.md` link returns 200 and `origin/main` lists `docs/engineering/{conventions,infrastructure,tech-stack}.md` (plan Task 10 Step 5).

## Verdict

Reviewer verdict: with fixes → fix wave applied → re-review "all findings addressed, no new Critical/Important breakage". Merge approval is the owner's.
