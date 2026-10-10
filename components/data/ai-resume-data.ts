// AI Resume Mode — data layer
// All data consumed by AI resume components lives here.
// Components must NOT hardcode values; they import from this file.

// ---------------------------------------------------------------------------
// Interfaces
// ---------------------------------------------------------------------------

export interface AISkill {
  name: string;
  level: number; // 0-100
  color?: string;
}

export interface AISkillCategory {
  id: string;
  title: string;
  skills: AISkill[];
}

export interface AIExperience {
  id: string;
  title: string;
  company: string;
  period: string;
  location: string;
  locationType: string;
  highlights: string[];
  aiImpact?: string;
}

export interface AIProject {
  id: string;
  title: string;
  description: string;
  githubUrl?: string;
  appStoreUrl?: string;
  techStack: string[];
  highlights: string[];
  stats?: { label: string; value: string }[];
}

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
  gateLabel: string;
  fixLabel: string;
  newTabLabel: string;
}

export interface AIHeroData {
  title: string;
  tagline: string;
  badges: string[];
  typingPhrases: string[];
}

// ---------------------------------------------------------------------------
// Skill categories
// ---------------------------------------------------------------------------

export const aiSkillCategories: AISkillCategory[] = [
  {
    id: "ai-platform",
    title: "AI & Retrieval",
    skills: [
      { name: "MCP", level: 90 },
      { name: "Hybrid Search (SCIP + Zoekt)", level: 85 },
      { name: "Google ADK", level: 75 },
      { name: "Vertex AI", level: 75 },
    ],
  },
  {
    id: "languages",
    title: "Languages",
    skills: [
      { name: "Swift", level: 95 },
      { name: "Python", level: 85 },
      { name: "Java 21", level: 75 },
      { name: "TypeScript", level: 75 },
    ],
  },
  {
    id: "backend",
    title: "Backend",
    skills: [
      { name: "FastAPI", level: 80 },
      { name: "Quarkus", level: 75 },
      { name: "Postgres / pgvector", level: 70 },
      { name: "Deno / Hono", level: 65 },
    ],
  },
  {
    id: "cloud",
    title: "Cloud & Delivery",
    skills: [
      { name: "GKE", level: 70 },
      { name: "Cloud Build", level: 70 },
      { name: "Fastlane", level: 85 },
      { name: "Bitrise", level: 80 },
    ],
  },
  {
    id: "mobile",
    title: "Mobile",
    skills: [
      { name: "SwiftUI", level: 95 },
      { name: "UIKit", level: 95 },
      { name: "RxSwift", level: 85 },
      { name: "HealthKit / StoreKit", level: 75 },
    ],
  },
  {
    id: "security",
    title: "Security",
    skills: [
      { name: "OAuth 2.0 / PKCE", level: 80 },
      { name: "Keychain Services", level: 80 },
      { name: "KMS Envelope Encryption", level: 70 },
      { name: "SSRF Allowlists", level: 70 },
    ],
  },
  {
    id: "quality",
    title: "Quality",
    skills: [
      { name: "XCTest / RxTest", level: 85 },
      { name: "ArchUnit", level: 70 },
      { name: "Mutation Testing", level: 70 },
    ],
  },
];

// ---------------------------------------------------------------------------
// Experiences (AI-impact focused)
// ---------------------------------------------------------------------------

export const aiExperiences: AIExperience[] = [
  {
    id: "axon-active",
    title: "Software Engineer (iOS → AI Platform)",
    company: "Axon Active",
    period: "07/2024 — Present",
    location: "Ho Chi Minh City",
    locationType: "Hybrid",
    aiImpact: "Internal AI agent platform serving ~100 users",
    highlights: [
      "Since 2026-06, core engineer on the company's internal AI agent platform: agents, tools, knowledge, and code search delivered to ~100 users' IDEs via MCP",
      "Built the code-intelligence service (SCIP + Zoekt, hybrid search, call/type hierarchy, blast radius) indexing 11 pilot repos (~30k symbols in the largest) on free OSS, avoiding a ~$2.2k/month vendor tool",
      "Designed the tool admission gate every agent tool call passes through: fail-open catalog/governance, fail-closed enforcement, full audit trail; verified with ArchUnit contracts and mutation testing",
      "Shipped per-user OAuth gateways for Jira/Confluence and Bitbucket (OAuth 2.0 3LO, KMS envelope encryption, SSRF allowlists), unblocking agents on company data",
      "Replaced the MCP server's fixed tool list with discover / executeRead / executeWrite meta-tools and hardened session expiry, so IDE agents reach the full catalog reliably",
      "Earlier: built a UIKit + SwiftUI design-system library adopted by 3+ teams, cutting UI development time ~40% on the ePost iOS app",
    ],
  },
  {
    id: "s3-corp",
    title: "Software Engineer (iOS)",
    company: "S3 Corp",
    period: "12/2023 — 06/2024",
    location: "Ho Chi Minh City",
    locationType: "Remote",
    highlights: [
      "Delivered feature screens on Coordinator + MVVM with RxSwift, integrating REST, APNs push, and real-time WebSocket connections",
      "Reached 90% unit-test coverage at the ViewModel layer with XCTest and RxTest",
    ],
  },
  {
    id: "zillearn",
    title: "iOS Engineer",
    company: "ZILLEARN",
    period: "05/2022 — 12/2023",
    location: "Ho Chi Minh City",
    locationType: "On-site",
    highlights: [
      "Led the refactor to Coordinator + MVVM across iOS and tvOS, and built the tvOS course and video-playback experience with AVFoundation",
      "Set up CI/CD with Fastlane and Bitrise for automated Firebase App Distribution and TestFlight releases",
    ],
  },
  {
    id: "windscribe",
    title: "Software Engineer (iOS), Team Lead",
    company: "Windscribe",
    period: "04/2020 — 03/2022",
    location: "Canada",
    locationType: "Remote",
    highlights: [
      "Led a team of 2–3 on the production VPN app, owning planning, code review, and feature strategy with the CEO and CTO",
      "Implemented OAuth 2.0 with PKCE, AES credential encryption via Keychain, and zero-knowledge VPN tunnel key management",
      "Built session-state and refresh-token handling, deep links, and a Notification Service Extension for rich push",
    ],
  },
];

// ---------------------------------------------------------------------------
// Projects
// ---------------------------------------------------------------------------

export const aiProjects: AIProject[] = [
  {
    id: "jarvis",
    title: "jarvis",
    description:
      "Local-first code-intelligence MCP server, published on PyPI (jarvis-mcp) and the official MCP Registry.",
    githubUrl: "https://github.com/jarvis-intelligence/jarvis",
    techStack: ["Python", "LanceDB", "tree-sitter", "SCIP", "Zoekt"],
    highlights: [
      "Hybrid retrieval fusing dense vectors, Zoekt lexical search, and SCIP symbols via reciprocal rank fusion, so NL questions and exact-symbol lookups share one index",
      "AST-aware chunking with tree-sitter, model-pinned embeddings, and atomic index publishing (zero-downtime reindex)",
      "Shipped as compiled wheels with one-command plugins for Claude Code, Cursor, and Codex",
    ],
  },
  {
    id: "stress-ai-coach",
    title: "Stress AI Coach",
    description:
      "iOS + watchOS app with a streaming AI coach, live on the App Store.",
    appStoreUrl: "https://apps.apple.com/us/app/stress-ai-coach/id6778478266",
    techStack: ["Swift", "HealthKit", "StoreKit", "Deno/Hono", "SSE", "OpenRouter", "Postgres"],
    highlights: [
      "Privacy-first stress scoring from HealthKit; raw health data never leaves the device, only derived scores reach the model",
      "Self-owned backend: SSE proxy over a 4-model fallback chain, crash-safe credit metering, Firebase auth",
      "Offline StoreKit receipt verification, Postgres on Dokploy",
    ],
  },
  {
    id: "llm-gateway",
    title: "LLM Gateway & Agent Observability",
    description:
      "OpenAI-compatible gateway and agent-run control plane for picking models on cost and speed.",
    githubUrl: "https://github.com/phuongddx/llm-gateway",
    techStack: ["FastAPI", "React", "TypeScript", "SSE"],
    highlights: [
      "Routes to 500+ models behind one key, capturing TTFT, latency, and token usage per request",
      "DAG trace viewer and run comparison for agent runs",
      "Per-model circuit-breaker states to surface degrading providers early",
    ],
  },
  {
    id: "open-source",
    title: "Open-source Contributions",
    description:
      "Upstream work on code intelligence, LLM routing, and Swift build tooling.",
    githubUrl: "https://github.com/phuongddx",
    techStack: ["Swift", "SourceKit-LSP", "SCIP", "SSE", "SPM"],
    highlights: [
      "scip-swift: extended SCIP indexing to Swift via SourceKit-LSP; contributed a typeHierarchy fix upstream to scip-code/scip",
      "OmniRoute: 2 merged PRs adding SSE streaming for GLM-5.3 effort tiers",
      "spm-cache: SPM xcframework cache proxy with Homebrew tap and GitHub Action",
    ],
  },
];

// ---------------------------------------------------------------------------
// Terminal animation lines — replay of the resume-content run (f19d974..f7d4237)
// ---------------------------------------------------------------------------

export const terminalLines: TerminalLine[] = [
  { text: "$ context", delay: 0, type: "command" },
  { text: "\u2713 AGENTS.md \u00b7 ARCHITECTURE.md \u00b7 docs/engineering", delay: 500, type: "success" },
  { text: "$ intent resume-content", delay: 1000, type: "command" },
  { text: "\u2713 owner confirmed: both modes, iOS default", delay: 1500, type: "success" },
  { text: "$ plan resume-content", delay: 2000, type: "command" },
  { text: "\u2713 6 tasks, each with an exact check", delay: 2500, type: "success" },
  { text: "$ build --task 1..5", delay: 3000, type: "command" },
  { text: "\u2713 5 commits \u00b7 lint + types per task", delay: 3500, type: "success" },
  { text: "$ review --whole-change", delay: 4000, type: "command" },
  { text: "\u2717 4 Important findings", delay: 4600, type: "error" },
  { text: "  skill bars grey \u00b7 link-preview crash", delay: 5000, type: "output" },
  { text: "  missing icons \u00b7 card copy vs CV", delay: 5400, type: "output" },
  { text: "$ fix", delay: 5900, type: "command" },
  { text: "\u2713 1 fix wave \u00b7 re-review: all addressed", delay: 6400, type: "success" },
  { text: "$ ship", delay: 6900, type: "command" },
  { text: "\u2713 build \u00b7 pushed f19d974..f7d4237", delay: 7400, type: "success" },
  { text: "\u2588", delay: 7900, type: "cursor" },
];

// ---------------------------------------------------------------------------
// Hero data
// ---------------------------------------------------------------------------

export const aiHeroData: AIHeroData = {
  title: "Software Engineer — LLM, Retrieval & Agent Systems",
  tagline:
    "6+ years shipping production apps, now building the code-intelligence, tool-admission, and vendor-gateway services of an internal AI platform.",
  badges: ["MCP", "Python", "Java / Quarkus", "Vertex AI", "Swift"],
  typingPhrases: ["Context \u2192 Spec \u2192 Plan \u2192 Build \u2192 Review \u2192 Ship"],
};

// ---------------------------------------------------------------------------
// Workflow section — AI-Native SDLC case study (resume-content run)
// ---------------------------------------------------------------------------

const REPO_URL = "https://github.com/phuongddx/portfolio-next";

export const workflowSectionCopy: WorkflowSectionCopy = {
  heading: "My AI-Native SDLC",
  subtitle:
    "How the resume-content update shipped: 6 planned tasks, 7 commits, 4 Important issues caught in review.",
  terminalTitle: "resume-content \u00b7 session replay",
  catchesHeading: "What review caught",
  gateLabel: "Gate:",
  fixLabel: "fix",
  newTabLabel: "(opens in new tab)",
};

// ---------------------------------------------------------------------------
// Workflow steps
// ---------------------------------------------------------------------------

export const workflowSteps: WorkflowStep[] = [
  {
    num: 1,
    label: "Context",
    desc: "Agents map the repo before touching it, so every change starts from written conventions.",
    artifact: "AGENTS.md \u00b7 ARCHITECTURE.md \u00b7 docs/engineering/",
    gate: "Read-only \u2014 no gate",
    evidence: { label: "docs/engineering", href: `${REPO_URL}/tree/main/docs/engineering` },
  },
  {
    num: 2,
    label: "Intent & Spec",
    desc: "I state the outcome; the agent writes its understanding back, I correct it, and the design becomes a spec.",
    artifact: "spec.md",
    gate: "I correct the understanding and approve the spec",
    evidence: { label: "spec.md \u2014 this section's spec", href: `${REPO_URL}/blob/main/docs/features/resume-content/spec.md` },
  },
  {
    num: 3,
    label: "Plan",
    desc: "The spec becomes bite-sized tasks, each with exact files, values, and a check to run.",
    artifact: "plan.md \u2014 bite-sized tasks with exact checks",
    gate: "I approve and pick the execution mode",
    evidence: { label: "plan.md", href: `${REPO_URL}/blob/main/docs/features/resume-content/plan.md` },
  },
  {
    num: 4,
    label: "Build",
    desc: "A fresh agent implements each task and commits it; nothing carries over between tasks.",
    artifact: "One commit per task, each by a fresh agent",
    gate: "Lint, type check, and build must pass",
    evidence: { label: "5 build commits", href: `${REPO_URL}/compare/f19d974...7a41c1c` },
  },
  {
    num: 5,
    label: "Review",
    desc: "Each task gets a spec-and-quality review; then a stronger model reviews the whole change.",
    artifact: "review.md \u2014 per-task review, then whole-change review on a stronger model",
    gate: "Reviewer verdict, then one fix wave",
    evidence: { label: "review.md", href: `${REPO_URL}/blob/main/docs/features/resume-content/review.md` },
  },
  {
    num: 6,
    label: "Ship",
    desc: "Gates re-run on the final tree, and I decide how it integrates.",
    artifact: "Pushed commit range",
    gate: "I make the integration call",
    evidence: { label: "f19d974\u2026f7d4237", href: `${REPO_URL}/compare/f19d974...f7d4237` },
  },
];

// ---------------------------------------------------------------------------
// Review catches — the 4 Important findings in review.md, all fixed in 4881249
// ---------------------------------------------------------------------------

export const reviewCatches: ReviewCatch[] = [
  {
    title: "5 of 7 AI skill bars rendered grey",
    detail: "The colour map was keyed by category titles that the update renamed.",
    href: `${REPO_URL}/commit/4881249`,
  },
  {
    title: "Link-preview image route crashed",
    detail: "Pre-existing: the image renderer rejects an unsupported CSS value.",
    href: `${REPO_URL}/commit/4881249`,
  },
  {
    title: "Skill-category icons went missing",
    detail: "The icon map still used an id the update had renamed.",
    href: `${REPO_URL}/commit/4881249`,
  },
  {
    title: "Featured Project card overstated the CV",
    detail: "It invented one figure and misquoted another.",
    href: `${REPO_URL}/commit/4881249`,
  },
];
