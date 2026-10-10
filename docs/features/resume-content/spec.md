# Spec: resume-content — AI-Native SDLC workflow section

Status: draft <!-- draft | approved | shipped | superseded -->
Date: 2026-10-10

Scope note: the first resume-content round (CV sync, `f19d974..f7d4237`) ran
from `plan.md` without a spec. This spec covers the second round only: the
AI-mode workflow section.

## Problem

AI mode's workflow section (`#ai-workflow`) shows an invented demo: a
"Claude Code Session" building a JWT auth system, and six generic steps
("Requirements", "Design", …). It is not work the owner did, and nothing in
it can be checked. Recruiters and hiring managers reading AI mode get no
evidence of how the owner actually builds software with AI agents.
`review.md` already lists this as an open nit.

## Context read

- `AGENTS.md`, `ARCHITECTURE.md`, `docs/engineering/conventions.md`,
  `docs/engineering/tech-stack.md`, `docs/engineering/infrastructure.md`
- `docs/features/resume-content/plan.md`, `review.md`
- `components/data/ai-resume-data.ts` (`terminalLines`, `workflowSteps`,
  `aiHeroData.typingPhrases`)
- `components/sections/ai-workflow-section.tsx`,
  `components/sections/ai-hero-section.tsx`,
  `components/layout/mode-router.tsx`, `components/layout/nav-links.ts`
- `git log f19d974..f7d4237` (7 commits, 22 files)
- `gh repo view phuongddx/portfolio-next`: public

Gaps:
- Init structure (`AGENTS.md`, `ARCHITECTURE.md`, `.agents/`,
  `docs/engineering/conventions.md`, `docs/engineering/tech-stack.md`,
  `docs/features/.gitkeep`) is uncommitted. This feature commits it so the
  Context card's evidence link resolves.
- `.agents/policies/` is empty.
- The workflow section heading and subtitle are hardcoded in the component,
  against the "components must not hardcode values" rule in
  `ai-resume-data.ts`.

## References

- GitHub Spec Kit quickstart (https://github.github.io/spec-kit/quickstart.html):
  stage names and per-stage artifacts. Informed the stage and artifact columns.
- Thoughtworks Radar, spec-driven development
  (https://www.thoughtworks.com/radar/techniques/spec-driven-development):
  specs are hard to review. Informed putting review gates on the cards.
- Fueler, honest AI-assisted portfolios
  (https://www.fueler.io/blog/how-to-show-ai-assisted-work-in-your-portfolio-honestly)
  and samuelfaj, what to prove
  (https://www.samuelfaj.com/en/blog/ai-software-engineer-portfolio-what-to-prove/):
  show the decision trail and what review caught. Informed the gate column
  and the "What review caught" strip.
- METR 2025 study
  (https://metr.org/blog/2025-07-10-early-2025-ai-experienced-os-dev-study/):
  perceived AI speedups are unreliable. Informed the no-speedup-claims rule.

## Goals

1. Replace the invented demo with the owner's real AI-native SDLC, shown as
   six stages, each with its artifact, its approval gate, and an evidence link
   into the public repo.
2. Use the resume-content run (`f19d974..f7d4237`) as the case study: the
   terminal replays it, and a strip lists the 4 Important issues review caught.
3. A reader can scan the stages and their gates in under 30 seconds.
4. Every number and claim traces to git or `docs/features/resume-content/`.

## Non-goals

- No product or tool names in the section (tool-agnostic).
- No new section, route, nav link, or `mode-router.tsx` change.
- No changes to other AI sections, iOS mode, SEO, or the PDF.
- No accessibility rework of the terminal's typing animation (existing
  behavior, out of scope).
- The other open nits in `review.md` stay open.

## Constraints

- All copy lives in `components/data/ai-resume-data.ts`; components import
  it and hardcode none (`ai-resume-data.ts` header,
  `docs/engineering/conventions.md`).
- Motion uses `m.*` under strict `LazyMotion`; sections wrap in
  `ScrollReveal` (`docs/engineering/conventions.md`).
- TypeScript strict; `npx tsc --noEmit`, `npm run lint`, `npm run build`
  must pass (`AGENTS.md`, Testing & QA).
- No speedup, percentage, or "x faster" claims in the workflow data.
- External links open in a new tab with `rel="noopener noreferrer"`.
- No horizontal page scroll at 390px width.
- Evidence links point at `https://github.com/phuongddx/portfolio-next`:
  file links via `/tree/main/…` or `/blob/main/…`; commit and range links
  via real SHAs.

## Design

### Content

Heading: "My AI-Native SDLC".
Subtitle: "How this site's last update shipped: 6 planned tasks, 7 commits,
4 Important issues caught in review."
Terminal title: "resume-content · session replay".
Strip heading: "What review caught".

Six stage cards, in order:

| # | Stage | Artifact | Gate | Evidence |
| --- | --- | --- | --- | --- |
| 1 | Context | `AGENTS.md`, `ARCHITECTURE.md`, `docs/engineering/` | Read-only, no gate | `/tree/main/docs/engineering` |
| 2 | Intent & Spec | `spec.md` | Owner corrects the understanding and approves the spec | `/blob/main/docs/features/resume-content/spec.md` |
| 3 | Plan | `plan.md`: bite-sized tasks with exact checks | Owner approves and picks the execution mode | `/blob/main/docs/features/resume-content/plan.md` |
| 4 | Build | One commit per task, each by a fresh agent | Lint, type check, build must pass | `/compare/f19d974...7a41c1c` |
| 5 | Review | `review.md`: per-task review, then whole-change review on a stronger model | Reviewer verdict, then one fix wave | `/blob/main/docs/features/resume-content/review.md` |
| 6 | Ship | Pushed commit range | Owner makes the integration call | `/compare/f19d974...f7d4237` |

Terminal replay: generic commands (`context`, `spec`, `plan`, `build`,
`review --whole-change`, `fix`, `ship`), each followed by its real result,
including one red failure line for the 4 Important findings. Every line is
48 characters or fewer.

"What review caught": the 4 Important findings from `review.md`, each linking
to fix commit `4881249`:

1. 5 of 7 AI skill bars rendered grey (colour map keyed by renamed titles)
2. Link-preview image route crashed (pre-existing; unsupported CSS value)
3. Skill-category icons missing after an id rename
4. Featured Project card claimed figures not in the CV

Hero: `aiHeroData.typingPhrases` becomes
`["Context → Spec → Plan → Build → Review → Ship"]`. The "See My Workflow"
button and the `#ai-workflow` nav link stay.

### Data (`components/data/ai-resume-data.ts`)

```ts
const REPO_URL = "https://github.com/phuongddx/portfolio-next";

export interface TerminalLine {
  text: string;
  delay: number;
  type: "command" | "output" | "success" | "error" | "cursor";
}

export interface WorkflowStep {
  num: number;
  label: string;
  desc: string;
  artifact: string;
  gate: string;
  evidence: { label: string; href: string };
}

export interface ReviewCatch {
  title: string;
  detail: string;
  href: string;
}

export interface WorkflowSectionCopy {
  heading: string;
  subtitle: string;
  terminalTitle: string;
  catchesHeading: string;
}

export const workflowSectionCopy: WorkflowSectionCopy;
export const workflowSteps: WorkflowStep[];   // 6 entries
export const reviewCatches: ReviewCatch[];    // 4 entries
export const terminalLines: TerminalLine[];   // rewritten replay
```

### Component (`components/sections/ai-workflow-section.tsx`)

- Same section id (`ai-workflow`) and typing animation.
- Heading, subtitle, and terminal title come from `workflowSectionCopy`.
- `lineColor` gains `case "error": return "text-red-400";` (exhaustive switch).
- Step cards add the artifact (small monospace), the gate, and the evidence
  link.
- Grid: `grid-cols-1 sm:grid-cols-2 md:grid-cols-3`.
- New "What review caught" strip below the grid, wrapped in `ScrollReveal`:
  title, detail, and a "fix" link per row.

### Order of work

1. Commit the init structure as its own docs commit.
2. Data changes.
3. Component changes.
4. Verification. The link check runs after the owner's push to `origin/main`.

## Error handling

Static content; no runtime failure paths. SHA-pinned links never break;
`main` links break only if a file moves. A missing `lineColor` case fails
`tsc` (exhaustive switch).

## Testing

No test framework (`AGENTS.md`). Verification:

1. Content checks: grep finds none of "auth system", "JWT",
   "Claude Code Session", "Prompt → Verify" in `components/`; no `%` or
   "faster" in `workflowSteps`, `reviewCatches`, or `terminalLines`.
2. Link check: every `href` in `workflowSteps` and `reviewCatches` returns
   200 via `curl -sIL`, run after the push.
3. Gates: `npx tsc --noEmit`, `npm run lint`, `npm run build` pass.
4. Browser: `/?mode=ai` at 390px and 1280px — the replay completes with the
   red failure line, cards stack one per row on phones, the strip renders,
   and there is no horizontal page scroll. `/?mode=ios` is unchanged.
