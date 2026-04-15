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
  githubUrl: string;
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
    id: "ai-tools",
    title: "AI Tools",
    skills: [
      { name: "Claude Code", level: 95 },
      { name: "Cursor", level: 85 },
      { name: "Codex", level: 80 },
    ],
  },
  {
    id: "languages",
    title: "Languages",
    skills: [
      { name: "Swift", level: 95 },
      { name: "TypeScript", level: 75 },
      { name: "Ruby", level: 60 },
    ],
  },
  {
    id: "backend",
    title: "Backend",
    skills: [
      { name: "Node.js", level: 55 },
      { name: "Firebase", level: 80 },
      { name: "REST APIs", level: 85 },
    ],
  },
  {
    id: "frontend",
    title: "Frontend",
    skills: [
      { name: "SwiftUI", level: 95 },
      { name: "React Native", level: 75 },
      { name: "Next.js", level: 65 },
    ],
  },
  {
    id: "devops",
    title: "DevOps",
    skills: [
      { name: "CI/CD", level: 85 },
      { name: "Fastlane", level: 85 },
      { name: "EAS Build", level: 70 },
    ],
  },
  {
    id: "architecture",
    title: "Architecture",
    skills: [
      { name: "MVVM", level: 90 },
      { name: "Clean Architecture", level: 80 },
      { name: "SOLID", level: 85 },
    ],
  },
];

// ---------------------------------------------------------------------------
// Experiences (AI-impact focused)
// ---------------------------------------------------------------------------

export const aiExperiences: AIExperience[] = [
  {
    id: "axon-active",
    title: "Software Engineer",
    company: "Axon Active",
    period: "07/2024 — Present",
    location: "Ho Chi Minh",
    locationType: "Hybrid",
    aiImpact: "60% dev velocity increase with AI-assisted development",
    highlights: [
      "Built a design system library supporting 4 dynamic appearances with customizable brand colors",
      "Leveraged AI tools (Claude, ChatGPT, Grok) to accelerate research and implementation",
      "Architected a scalable component framework enabling theme switching and appearance customization",
      "Applied MVVM architecture for clean separation of concerns",
    ],
  },
  {
    id: "s3-corp",
    title: "Software Engineer (iOS)",
    company: "S3 Corp",
    period: "12/2023 — 06/2024",
    location: "Ho Chi Minh",
    locationType: "Remote",
    aiImpact: "90% test coverage using AI-assisted test generation",
    highlights: [
      "Followed MVVM architecture and SOLID principles for maintainable codebase",
      "Wrote unit tests with XCTest, achieving 90% coverage at ViewModel layer",
      "Integrated NWWebSocket for real-time push notification connections",
      "Delivered API integration for user data and notification features",
    ],
  },
  {
    id: "zillearn",
    title: "iOS Engineer",
    company: "ZILLEARN",
    period: "05/2022 — 12/2023",
    location: "Ho Chi Minh",
    locationType: "On-site",
    aiImpact: "AI-accelerated CI/CD pipeline development and feature delivery",
    highlights: [
      "Developed CI/CD pipelines for automated deployment, supporting QA testing",
      "Led efforts to refactor and update the project architecture",
      "Built tvOS UI/UX for course management and video playback with AVFoundation",
      "Maintained and improved existing features across iOS and tvOS targets",
    ],
  },
  {
    id: "windscribe",
    title: "Software Engineer & Team Lead",
    company: "Windscribe",
    period: "04/2020 — 03/2022",
    location: "Canada Client",
    locationType: "Remote",
    aiImpact: "Led remote team with AI-enhanced code review workflows",
    highlights: [
      "Led a team of 2-3 members, developing task plans and conducting code reviews",
      "Engaged in strategic discussions with CEO and CTO on feature planning",
      "Implemented CI/CD pipelines for automated QA deployment using Bitrise",
    ],
  },
];

// ---------------------------------------------------------------------------
// Projects
// ---------------------------------------------------------------------------

export const aiProjects: AIProject[] = [
  {
    id: "xcframework-cli",
    title: "XCFramework CLI",
    description:
      "Ruby CLI tool for automating XCFramework builds across iOS architectures. Streamlines multi-architecture compilation with YAML config.",
    githubUrl: "https://github.com/phuongddx/xcframework-cli",
    techStack: ["Ruby", "xcodebuild", "YAML"],
    highlights: [
      "Automated multi-architecture builds",
      "YAML-driven configuration",
      "Production tooling for CI/CD integration",
    ],
  },
  {
    id: "trending-movies",
    title: "Trending Movies",
    description:
      "iOS movie discovery app powered by TMDB API with hero carousel, search, and offline caching. Built with clean architecture.",
    githubUrl: "https://github.com/phuongddx/trending-movie-ios",
    techStack: ["SwiftUI", "MVVM", "Clean Architecture", "Moya"],
    highlights: [
      "Hero carousel with async image loading",
      "Offline cache with Core Data",
      "Custom design system",
    ],
  },
  {
    id: "stress-monitor",
    title: "StressMonitor",
    description:
      "iOS + watchOS stress monitoring app with HRV analysis, health data tracking, and widgets. 22K+ lines of pure Swift with zero external dependencies.",
    githubUrl: "https://github.com/NextGen-Limited/ios-stress-app",
    techStack: ["SwiftUI", "HealthKit", "SwiftData", "CloudKit", "WidgetKit"],
    highlights: [
      "22K LOC with zero external deps",
      "Custom HRV algorithm",
      "watchOS complications",
      "WidgetKit integration",
    ],
  },
  {
    id: "portfolio",
    title: "This Portfolio",
    description:
      "Next.js portfolio with AI mode toggle — the site you're looking at. Showcases both iOS and AI-driven development workflows.",
    githubUrl: "https://github.com/phuongddx/portfolio-next",
    techStack: ["Next.js 14", "TypeScript", "Tailwind CSS", "Framer Motion"],
    highlights: [
      "AI mode toggle with context switching",
      "Interactive terminal mockup",
      "Animated skill bars",
      "PDF export",
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
  title: "AI-Driven Full-Stack Developer",
  tagline: "I build production software with AI at the center of my workflow",
  badges: ["Claude Code", "Cursor", "Codex", "Swift", "TypeScript"],
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
