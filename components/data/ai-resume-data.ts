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
  type: "command" | "output" | "success" | "cursor";
}

export interface WorkflowStep {
  num: number;
  label: string;
  desc: string;
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
// Terminal animation lines
// ---------------------------------------------------------------------------

export const terminalLines: TerminalLine[] = [
  // Phase 1: Requirements
  { text: '$ claude "Analyze requirements for auth system"', delay: 0, type: "command" },
  { text: "\u2713 Identified 5 functional requirements", delay: 600, type: "success" },
  { text: "\u2713 Defined acceptance criteria and edge cases", delay: 1000, type: "success" },
  // Phase 2: Design
  { text: '$ claude "Design auth architecture with JWT"', delay: 1500, type: "command" },
  { text: "\u2713 Architected middleware pipeline with RS256", delay: 2100, type: "success" },
  { text: "\u2713 Created data flow diagram", delay: 2500, type: "success" },
  // Phase 3: Planning
  { text: '$ claude "Break down auth implementation tasks"', delay: 3000, type: "command" },
  { text: "\u2713 Generated 8 actionable tasks with dependencies", delay: 3600, type: "success" },
  // Phase 4: Implementation
  { text: '$ claude "Implement JWT auth middleware"', delay: 4100, type: "command" },
  { text: "\u2713 Created auth-middleware.ts", delay: 4600, type: "success" },
  { text: "\u2713 Added token validation and refresh logic", delay: 5000, type: "success" },
  // Phase 5: Testing
  { text: '$ claude "Generate tests for auth middleware"', delay: 5500, type: "command" },
  { text: "\u2713 Unit tests generated (12 test cases)", delay: 6000, type: "success" },
  { text: "\u2713 All tests passing", delay: 6400, type: "success" },
  // Phase 6: Code Review
  { text: '$ claude "Review for security vulnerabilities"', delay: 6900, type: "command" },
  { text: "\u2713 No OWASP Top 10 issues found", delay: 7400, type: "success" },
  { text: "\u2713 Ready to commit", delay: 7800, type: "success" },
  { text: "\u2588", delay: 8200, type: "cursor" },
];

// ---------------------------------------------------------------------------
// Hero data
// ---------------------------------------------------------------------------

export const aiHeroData: AIHeroData = {
  title: "Software Engineer — LLM, Retrieval & Agent Systems",
  tagline:
    "6+ years shipping production apps, now building the code-intelligence, tool-admission, and vendor-gateway services of an internal AI platform.",
  badges: ["MCP", "Python", "Java / Quarkus", "Vertex AI", "Swift"],
  typingPhrases: ["Prompt \u2192 Verify \u2192 Ship \u2192 Repeat"],
};

// ---------------------------------------------------------------------------
// Workflow steps
// ---------------------------------------------------------------------------

export const workflowSteps: WorkflowStep[] = [
  { num: 1, label: "Requirements", desc: "Define what you're building and why" },
  { num: 2, label: "Design", desc: "Architect solutions with diagrams and decisions" },
  { num: 3, label: "Planning", desc: "Break work into actionable tasks" },
  { num: 4, label: "Implementation", desc: "Execute tasks step-by-step with AI guidance" },
  { num: 5, label: "Testing", desc: "Generate tests and validate your code" },
  { num: 6, label: "Code Review", desc: "Review changes before committing" },
];
