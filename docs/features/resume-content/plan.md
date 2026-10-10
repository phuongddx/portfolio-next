# Resume Content Sync Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use text2prod:subagent-driven-development (recommended) or text2prod:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Make every fact on the portfolio match the new CV (`Phuong_Doan_CV.md`) and serve the new CV PDF as the download.

**Architecture:** Content lives in typed data files under `components/data/` plus a few hardcoded strings in sections, `src/app/layout.tsx` (SEO/JSON-LD), and `src/app/opengraph-image.tsx`. Both modes follow the CV: AI mode becomes the full CV, iOS mode keeps the iOS slice reworded to CV facts, and shared identity (SEO, OG image, footer, About) moves to the CV summary. iOS stays the default mode. No new components, routes, or dependencies.

**Tech Stack:** Next.js 14.2 App Router, TypeScript strict, Tailwind 3.4, framer-motion 11 (`m.*` under strict `LazyMotion`). npm.

**Spec:** No `spec.md`. Source of truth is `/Users/ddphuong/Projects/ai-engineer/my-cv/rendercv_output/Phuong_Doan_CV.md` (content) and `/Users/ddphuong/Projects/ai-engineer/my-cv/rendercv_output/Phuong_Doan_CV.pdf` (download). Decisions confirmed by the owner on 2026-10-10:
1. Both modes follow the CV; iOS remains the default mode.
2. Remove the "HVA App" role (present only as uncommitted edits; not in the CV).

## Global Constraints

- Every factual claim on the site must be traceable to the CV. Drop claims the CV does not make (e.g. "used by millions", "60% dev velocity", "visual bugs by 60%", "AI-assisted test generation", React Native work).
- Years of experience: `6+` everywhere (was `5+`).
- Identity title: `Software Engineer (iOS → AI Platform)` for SEO/JSON-LD; iOS-mode hero keeps `iOS Software Engineer`.
- Location string: `Ho Chi Minh City, Vietnam` / `Ho Chi Minh City`.
- Canonical site URL: `https://www.phuongddx.cc` (`phuongddx.cc` 307-redirects there and serves this app). Replaces `https://portfolio-phi-lac-67.vercel.app`.
- Resume download path stays `/DoanPhuong.pdf` (4 links already point there: `navbar.tsx`, `hero-section.tsx`, `ai-hero-section.tsx`, `contact-section.tsx`).
- Do not link `github.com/phuongddx/stress-app-be` (private repo, 404 for visitors) or `scip-swift` (no public repo found). Use the App Store URL for Stress AI Coach.
- No test framework exists and none is added. Each task's "failing test" is a shell content check run before and after the edit; gates are `npx tsc --noEmit` and `npm run lint`, with `npm run build` at the end.
- Conventions (`docs/engineering/conventions.md`): kebab-case files, named exports, `@/*` imports, conventional commits `type(scope): subject`.
- The working tree already holds unrelated uncommitted changes. Stage **only** the files listed in each task. Do not stage `resources/resume*.pdf` deletions or untracked tooling dirs.
- Skill-bar `level` numbers in Task 5 are self-assessments shown publicly as percentages; the owner must confirm them in review.

---

### Task 1: Replace the resume PDF

**Files:**
- Modify: `public/DoanPhuong.pdf` (binary)

**Interfaces:**
- Consumes: nothing
- Produces: `/DoanPhuong.pdf` served with the new CV (76,699 bytes)

- [ ] **Step 1: Content check fails**

Run: `cmp public/DoanPhuong.pdf /Users/ddphuong/Projects/ai-engineer/my-cv/rendercv_output/Phuong_Doan_CV.pdf`
Expected: `public/DoanPhuong.pdf ... differ: ...` (exit 1)

- [ ] **Step 2: Copy the new PDF over the old one**

```bash
cp /Users/ddphuong/Projects/ai-engineer/my-cv/rendercv_output/Phuong_Doan_CV.pdf public/DoanPhuong.pdf
```

- [ ] **Step 3: Content check passes**

Run: `cmp public/DoanPhuong.pdf /Users/ddphuong/Projects/ai-engineer/my-cv/rendercv_output/Phuong_Doan_CV.pdf && wc -c < public/DoanPhuong.pdf`
Expected: no `differ` output; size `76699`

- [ ] **Step 4: Commit**

```bash
git add public/DoanPhuong.pdf
git commit -m "chore: replace resume pdf with rendercv version"
```

---

### Task 2: Shared identity — SEO, JSON-LD, OG image, robots, sitemap, footer

**Files:**
- Modify: `src/app/layout.tsx:19-85` (`siteUrl`, `metadata`, `personJsonLd`)
- Modify: `src/app/opengraph-image.tsx:4`, role text (~line 76), stats array (~lines 81-85)
- Modify: `public/robots.txt`, `public/sitemap.xml`
- Modify: `components/layout/footer.tsx` (~line 64 and ~line 116)

**Interfaces:**
- Consumes: nothing
- Produces: canonical URL `https://www.phuongddx.cc`; no code symbols change

- [ ] **Step 1: Content check fails**

Run:
```bash
grep -rnE "vercel\.app|5\+|iOS Software Engineer|Ho Chi Minh, Vietnam" src/app/layout.tsx src/app/opengraph-image.tsx public/robots.txt public/sitemap.xml components/layout/footer.tsx
```
Expected: multiple matches (at least `layout.tsx`, `opengraph-image.tsx`, `robots.txt`, `sitemap.xml`, `footer.tsx`)

- [ ] **Step 2: Rewrite `siteUrl`, `metadata`, and `personJsonLd` in `src/app/layout.tsx`**

Replace everything from `const siteUrl = "https://portfolio-phi-lac-67.vercel.app";` through the closing `};` of `personJsonLd` with:

```tsx
const siteUrl = "https://www.phuongddx.cc";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Software Engineer (iOS → AI Platform) | Doan Duy Phuong",
  description:
    "Software engineer with 6+ years shipping production apps, including 2 years as a team lead, now building LLM, retrieval, and agent systems on an internal AI platform.",
  keywords: [
    "Software Engineer",
    "AI Platform Engineer",
    "LLM",
    "Retrieval",
    "AI Agents",
    "MCP",
    "Model Context Protocol",
    "iOS Engineer",
    "Swift",
    "SwiftUI",
    "Python",
    "FastAPI",
    "Ho Chi Minh City",
  ],
  authors: [{ name: "Doan Duy Phuong" }],
  creator: "Doan Duy Phuong",
  alternates: {
    canonical: siteUrl,
  },
  openGraph: {
    type: "website",
    url: siteUrl,
    locale: "en_US",
    title: "Software Engineer (iOS → AI Platform) | Doan Duy Phuong",
    description:
      "Software engineer with 6+ years shipping production apps, including 2 years as a team lead, now building LLM, retrieval, and agent systems.",
    siteName: "Doan Duy Phuong — Software Engineer",
    images: [{ url: "/opengraph-image.png", width: 1200, height: 630, alt: "Doan Duy Phuong — Software Engineer (iOS → AI Platform)" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Software Engineer (iOS → AI Platform) | Doan Duy Phuong",
    description:
      "Software engineer with 6+ years shipping production apps, now building LLM, retrieval, and agent systems.",
    images: ["/opengraph-image.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Doan Duy Phuong",
  jobTitle: "Software Engineer",
  url: siteUrl,
  email: "95doanphuong@gmail.com",
  sameAs: [
    "https://linkedin.com/in/phuongddx/",
    "https://github.com/phuongddx",
  ],
  knowsAbout: [
    "LLM Systems",
    "Retrieval",
    "AI Agents",
    "Model Context Protocol",
    "iOS Development",
    "Swift",
    "SwiftUI",
    "Python",
    "Java",
  ],
  address: {
    "@type": "PostalAddress",
    addressLocality: "Ho Chi Minh City",
    addressCountry: "VN",
  },
};
```

(The `images: ["/opengraph-image.png"]` path is unchanged on purpose; see Out of scope.)

- [ ] **Step 3: Update `src/app/opengraph-image.tsx`**

Line 4:
```tsx
export const alt = "Doan Duy Phuong — Software Engineer (iOS → AI Platform)";
```

Role text — replace the text node `iOS Software Engineer` inside the role `<div>` with:
```tsx
          Software Engineer · iOS &amp; AI Platform
```
(Plain `·` and `&amp;` only; avoid `→` because the default OG font may not have the glyph.)

Stats array — replace:
```tsx
            { value: "5+", label: "Years Experience" },
            { value: "4+", label: "Apps Shipped" },
            { value: "40%", label: "Faster Dev Time" },
```
with:
```tsx
            { value: "6+", label: "Years Experience" },
            { value: "~100", label: "AI Platform Users" },
            { value: "2 yrs", label: "As Team Lead" },
```

- [ ] **Step 4: Update `public/robots.txt` and `public/sitemap.xml`**

`public/robots.txt`:
```text
# https://www.robotstxt.org/robotstxt.html
User-agent: *
Allow: /

Sitemap: https://www.phuongddx.cc/sitemap.xml
```

`public/sitemap.xml`:
```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://www.phuongddx.cc/</loc>
    <lastmod>2026-10-10</lastmod>
    <changefreq>monthly</changefreq>
    <priority>1.0</priority>
  </url>
</urlset>
```

- [ ] **Step 5: Update `components/layout/footer.tsx`**

Replace `                  iOS Software Engineer` with `                  Software Engineer`.
Replace `              Ho Chi Minh, Vietnam` with `              Ho Chi Minh City, Vietnam`.

- [ ] **Step 6: Content check passes + gates**

Run:
```bash
grep -rnE "vercel\.app|5\+|iOS Software Engineer|Ho Chi Minh, Vietnam" src/app/layout.tsx src/app/opengraph-image.tsx public/robots.txt public/sitemap.xml components/layout/footer.tsx; echo "matches: $?"
npx tsc --noEmit && npm run lint
```
Expected: `matches: 1` (grep found nothing); tsc silent; lint `✔ No ESLint warnings or errors`

- [ ] **Step 7: Commit**

```bash
git add src/app/layout.tsx src/app/opengraph-image.tsx public/robots.txt public/sitemap.xml components/layout/footer.tsx
git commit -m "feat(seo): align identity and canonical domain with new cv"
```

---

### Task 3: iOS mode — hero, about, experience

**Files:**
- Modify: `components/sections/hero-section.tsx` (~lines 80-84 description, ~lines 103-107 stat)
- Modify: `components/sections/about-section.tsx` (~line 12 stat, ~lines 58-75 paragraphs)
- Modify: `components/data/experience-data.ts` (replace `experiences` array)
- Modify: `components/sections/experience-section.tsx:13-19` (`companyIcons`)

**Interfaces:**
- Consumes: nothing
- Produces: `experiences: Experience[]` (interface unchanged) with ids `axon-active`, `s3-corp`, `zillearn`, `windscribe`; company keys `"Axon Active"`, `"S3 Corp"`, `"ZILLEARN"`, `"Windscribe"`

- [ ] **Step 1: Content check fails**

Run:
```bash
grep -nE "HVA App|5\+|millions|60%|React Native|WINDSCRIBE|SP Group" components/sections/hero-section.tsx components/sections/about-section.tsx components/data/experience-data.ts components/sections/experience-section.tsx
```
Expected: multiple matches

- [ ] **Step 2: Hero description and stat (`hero-section.tsx`)**

Replace the description text:
```tsx
              I build iOS apps used by millions — from design systems that cut
              dev time by 40% to App Store products across fintech, security,
              and IoT. 5+ years with Swift, SwiftUI, and UIKit.
```
with:
```tsx
              6+ years shipping production iOS apps — a design system adopted
              by 3+ teams that cut UI development time ~40%, a VPN app I led as
              team lead, and a tvOS learning platform. Now also building LLM
              and agent systems.
```

In the Stats Row, change the first `StatBadge` `value="5+"` to `value="6+"`. Leave `4+ Apps Shipped` (ePost, ZILLEARN, Windscribe, Stress AI Coach).

- [ ] **Step 3: About stat and paragraphs (`about-section.tsx`)**

In `stats`, change `value: "5+",` to `value: "6+",`. Keep the `40%` and `90%` entries (both in the CV).

Replace the three `<p>` blocks inside `<div className="space-y-6">` with:
```tsx
              <p className="text-lg text-gray-600 leading-relaxed">
                I&apos;m a software engineer with 6+ years shipping production
                apps, including 2 years as a team lead. Most of that time was
                native iOS: Swift, SwiftUI, UIKit, RxSwift, and Coordinator +
                MVVM.
              </p>
              <p className="text-lg text-gray-600 leading-relaxed">
                Since June 2026 I&apos;ve been a core engineer on Axon
                Active&apos;s internal AI agent platform, owning the
                code-intelligence, tool-admission, and vendor-gateway services
                used by ~100 people across engineering, marketing, product, and
                leadership.
              </p>
              <p className="text-lg text-gray-600 leading-relaxed">
                Outside work I maintain jarvis, a local-first code-intelligence
                MCP server on PyPI and the official MCP Registry, and ship
                Stress AI Coach, an iOS + watchOS app on the App Store.
              </p>
```

- [ ] **Step 4: Replace the `experiences` array (`experience-data.ts`)**

Keep the `Experience` interface. Replace `export const experiences: Experience[] = [ ... ];` with:
```ts
export const experiences: Experience[] = [
  {
    id: "axon-active",
    title: "Software Engineer (iOS → AI Platform)",
    company: "Axon Active",
    startDate: "07/2024",
    endDate: "Present",
    location: "Ho Chi Minh City",
    locationType: "Hybrid",
    achievements: [
      "Built a UIKit + SwiftUI design-system library adopted by 3+ teams, cutting UI development time ~40% on the ePost iOS app",
      "Since 2026-06, core engineer on the company's internal AI agent platform: agents, tools, knowledge, and code search delivered to ~100 users' IDEs via MCP",
      "Built the code-intelligence service (SCIP + Zoekt, hybrid search, call/type hierarchy, blast radius) indexing 11 pilot repos on free OSS, avoiding a ~$2.2k/month vendor tool",
    ],
  },
  {
    id: "s3-corp",
    title: "Software Engineer (iOS)",
    company: "S3 Corp",
    startDate: "12/2023",
    endDate: "06/2024",
    location: "Ho Chi Minh City",
    locationType: "Remote",
    achievements: [
      "Delivered feature screens on Coordinator + MVVM with RxSwift, integrating REST, APNs push, and real-time WebSocket connections",
      "Reached 90% unit-test coverage at the ViewModel layer with XCTest and RxTest",
    ],
  },
  {
    id: "zillearn",
    title: "iOS Engineer",
    company: "ZILLEARN",
    startDate: "05/2022",
    endDate: "12/2023",
    location: "Ho Chi Minh City",
    locationType: "On-site",
    achievements: [
      "Led the refactor to Coordinator + MVVM across iOS and tvOS, and built the tvOS course and video-playback experience with AVFoundation",
      "Set up CI/CD with Fastlane and Bitrise for automated Firebase App Distribution and TestFlight releases",
    ],
  },
  {
    id: "windscribe",
    title: "Software Engineer (iOS), Team Lead",
    company: "Windscribe",
    startDate: "04/2020",
    endDate: "03/2022",
    location: "Canada",
    locationType: "Remote",
    achievements: [
      "Led a team of 2–3 on the production VPN app, owning planning, code review, and feature strategy with the CEO and CTO",
      "Implemented OAuth 2.0 with PKCE, AES credential encryption via Keychain, and zero-knowledge VPN tunnel key management",
      "Built session-state and refresh-token handling, deep links, and a Notification Service Extension for rich push",
    ],
  },
];
```

- [ ] **Step 5: Replace `companyIcons` (`experience-section.tsx`)**

```tsx
const companyIcons: Record<string, string> = {
  "Axon Active": "🏢",
  "S3 Corp": "💻",
  "ZILLEARN": "📚",
  "Windscribe": "🔒",
};
```

- [ ] **Step 6: Content check passes + gates**

Run:
```bash
grep -nE "HVA App|5\+|millions|60%|React Native|WINDSCRIBE|SP Group" components/sections/hero-section.tsx components/sections/about-section.tsx components/data/experience-data.ts components/sections/experience-section.tsx; echo "matches: $?"
npx tsc --noEmit && npm run lint
```
Expected: `matches: 1`; tsc silent; lint clean

- [ ] **Step 7: Commit**

```bash
git add components/sections/hero-section.tsx components/sections/about-section.tsx components/data/experience-data.ts components/sections/experience-section.tsx
git commit -m "feat(data): align ios-mode hero, about, and experience with new cv"
```

---

### Task 4: iOS mode — projects, side projects, skills

**Files:**
- Modify: `components/data/projects-data.ts` (replace `projects` array)
- Modify: `components/sections/projects-section.tsx:19-26` (`categoryIcons`)
- Modify: `components/data/side-projects-data.ts` (replace `sideProjects` array)
- Modify: `components/data/skills-data.ts` (replace `skillCategories` array)

**Interfaces:**
- Consumes: nothing
- Produces: `projects: Project[]`, `sideProjects: SideProject[]`, `skillCategories: SkillCategory[]` (interfaces unchanged); new project category `"Health"`

- [ ] **Step 1: Content check fails**

Run:
```bash
grep -nE "Darkin|xcframework-cli|trending-movie|ios-stress-app|React Native|EAS Build|Grok|4 dynamic" components/data/projects-data.ts components/data/side-projects-data.ts components/data/skills-data.ts; grep -c '"Health"' components/sections/projects-section.tsx
```
Expected: multiple matches from the first grep; `0` from the second

- [ ] **Step 2: Replace the `projects` array (`projects-data.ts`)**

Keep the `Project` interface. Replace the array with:
```ts
export const projects: Project[] = [
  {
    id: "epost-design-system",
    title: "ePost Design System",
    category: "Design System",
    description:
      "UIKit + SwiftUI design-system library for the ePost iOS app, adopted by 3+ teams.",
    technologies: ["SwiftUI", "UIKit", "Design Systems"],
    stat: { value: "~40%", label: "reduction in UI development time" },
    screenshots: [
      "/screenshots/swisspost/460x998bb.webp",
      "/screenshots/swisspost/460x998bb-2.webp",
      "/screenshots/swisspost/460x998bb-3.webp",
    ],
    appStoreUrl: "https://apps.apple.com/us/app/swiss-post/id378676700",
  },
  {
    id: "stress-ai-coach",
    title: "Stress AI Coach",
    category: "Health",
    description:
      "iOS + watchOS app with privacy-first stress scoring from HealthKit and a streaming AI coach. Raw health data never leaves the device; only derived scores reach the model.",
    technologies: ["Swift", "watchOS", "HealthKit", "StoreKit", "SSE"],
    screenshots: [],
    appStoreUrl: "https://apps.apple.com/us/app/stress-ai-coach/id6778478266",
  },
  {
    id: "tvos-learning",
    title: "tvOS Learning Platform",
    category: "Education",
    description:
      "tvOS course and video-playback experience built with AVFoundation for ZILLEARN, an AI-powered learning platform for schools and enterprises.",
    technologies: ["tvOS", "AVFoundation", "Coordinator + MVVM"],
    screenshots: [
      "/screenshots/zillearn/Screenshot-1.png",
      "/screenshots/zillearn/Screenshot-2.png",
      "/screenshots/zillearn/Screenshot-3.png",
    ],
    appStoreUrl: "https://apps.apple.com/us/app/zillearn-bite-sized-learning/id1493909762",
  },
  {
    id: "vpn-client",
    title: "Windscribe VPN",
    category: "Security",
    description:
      "Led a team of 2–3 on the production VPN app: OAuth 2.0 with PKCE, AES credential encryption via Keychain, and zero-knowledge VPN tunnel key management.",
    technologies: ["Swift", "OAuth 2.0", "PKCE", "Keychain", "Network Extension"],
    screenshots: ["/screenshots/windscribe/460x996bb.webp"],
    appStoreUrl: "https://apps.apple.com/us/app/vpn-windscribe-fast-secure/id1129435228",
  },
];
```

- [ ] **Step 3: Add the Health icon (`projects-section.tsx`)**

```tsx
const categoryIcons: Record<string, string> = {
  "Design System": "🎨",
  Health: "🧘",
  Education: "📺",
  Security: "🔒",
};
```

- [ ] **Step 4: Replace the `sideProjects` array (`side-projects-data.ts`)**

Keep the `SideProject` interface. Star/fork counts are a snapshot from the GitHub API on 2026-10-10.
```ts
export const sideProjects: SideProject[] = [
  {
    id: "jarvis",
    title: "jarvis",
    description:
      "Local-first code-intelligence MCP server. Hybrid retrieval fuses dense vectors, Zoekt lexical search, and SCIP symbols via reciprocal rank fusion. On PyPI (jarvis-mcp) and the official MCP Registry.",
    githubUrl: "https://github.com/jarvis-intelligence/jarvis",
    language: "Python",
    languageColor: "#3572A5",
    stars: 4,
    forks: 0,
    topics: ["mcp", "code-intelligence", "scip", "tree-sitter", "lancedb"],
    status: "production",
  },
  {
    id: "llm-gateway",
    title: "LLM Gateway",
    description:
      "OpenAI-compatible gateway routing to 500+ models behind one key, capturing TTFT, latency, and token usage per request, with an agent-run trace viewer and per-model circuit breakers.",
    githubUrl: "https://github.com/phuongddx/llm-gateway",
    language: "Python",
    languageColor: "#3572A5",
    stars: 0,
    forks: 0,
    topics: ["llm", "gateway", "observability", "fastapi", "sse"],
    status: "production",
  },
  {
    id: "spm-cache",
    title: "spm-cache",
    description:
      "Swift Package Manager xcframework cache proxy, shipped with a Homebrew tap and a GitHub Action.",
    githubUrl: "https://github.com/phuongddx/spm-cache",
    language: "Ruby",
    languageColor: "#CC342D",
    stars: 1,
    forks: 0,
    topics: ["swift-package-manager", "xcframework", "cache", "homebrew", "github-actions"],
    status: "production",
  },
];
```

- [ ] **Step 5: Replace the `skillCategories` array (`skills-data.ts`)**

Keep the `SkillCategory` interface. Drops React Native / EAS Build (HVA-only) and Claude/ChatGPT/Grok; adds CV tech.
```ts
export const skillCategories: SkillCategory[] = [
  {
    id: "languages",
    title: "Languages",
    skills: ["Swift", "Python", "Java", "TypeScript", "Ruby", "Bash"],
  },
  {
    id: "frameworks",
    title: "Frameworks",
    skills: [
      "UIKit",
      "SwiftUI",
      "Combine",
      "RxSwift",
      "RxCocoa",
      "AVFoundation",
      "HealthKit",
      "StoreKit",
      "Network Extension",
      "Core Data",
      "SwiftData",
    ],
  },
  {
    id: "tools",
    title: "Tools",
    skills: [
      "Xcode",
      "Swift Package Manager (SPM)",
      "Fastlane",
      "Bitrise",
      "Firebase App Distribution",
      "TestFlight",
      "Instruments",
      "XCTest",
      "RxTest",
    ],
  },
  {
    id: "services",
    title: "Services",
    skills: ["Firebase Suite", "Firebase Analytics", "Crashlytics", "OneSignal", "APNs"],
  },
  {
    id: "architecture",
    title: "Architecture",
    skills: [
      "Coordinator Pattern",
      "MVVM (Input/Output)",
      "SOLID",
      "Clean Architecture",
      "CI/CD",
      "Multi-scheme (Dev/Staging/Prod)",
    ],
  },
  {
    id: "ai-platform",
    title: "AI Platform",
    skills: ["MCP", "Python / FastAPI", "Java 21 / Quarkus", "Google ADK", "Vertex AI", "pgvector"],
  },
  {
    id: "expertise",
    title: "Expertise",
    skills: [
      "Design Systems",
      "REST APIs",
      "WebSocket",
      "Token Refresh / Session State",
      "Deep Links",
      "Push Notifications (APNs)",
      "Notification Service Extension",
      "OAuth 2.0 / PKCE",
      "AES Encryption / Keychain",
      "Zero-Knowledge",
    ],
  },
];
```

- [ ] **Step 6: Content check passes + gates**

Run:
```bash
grep -nE "Darkin|xcframework-cli|trending-movie|ios-stress-app|React Native|EAS Build|Grok|4 dynamic" components/data/projects-data.ts components/data/side-projects-data.ts components/data/skills-data.ts; echo "matches: $?"; grep -c 'Health:' components/sections/projects-section.tsx
npx tsc --noEmit && npm run lint
```
Expected: `matches: 1`; `1`; tsc silent; lint clean

- [ ] **Step 7: Commit**

```bash
git add components/data/projects-data.ts components/sections/projects-section.tsx components/data/side-projects-data.ts components/data/skills-data.ts
git commit -m "feat(data): align ios-mode projects, side projects, and skills with new cv"
```

---

### Task 5: AI mode — full CV (hero, skills, experience, projects)

**Files:**
- Modify: `components/data/ai-resume-data.ts` (`AIProject` interface; `aiSkillCategories`, `aiExperiences`, `aiProjects`, `aiHeroData`). `terminalLines` and `workflowSteps` stay unchanged.
- Modify: `components/sections/ai-hero-section.tsx` (h1, stats; also carries the pre-existing uncommitted download-link change)
- Modify: `components/sections/ai-projects-section.tsx` (optional GitHub / App Store link)

**Interfaces:**
- Consumes: nothing
- Produces:
  ```ts
  export interface AIProject {
    id: string;
    title: string;
    description: string;
    githubUrl?: string;   // was required
    appStoreUrl?: string; // new
    techStack: string[];
    highlights: string[];
    stats?: { label: string; value: string }[];
  }
  ```
  Every `aiProjects` entry has at least one of `githubUrl` / `appStoreUrl`.

- [ ] **Step 1: Content check fails**

Run:
```bash
grep -nE "HVA App|Grok|60%|AI-assisted test|This Portfolio|AI-DRIVEN FULL-STACK|5\+|appStoreUrl" components/data/ai-resume-data.ts components/sections/ai-hero-section.tsx components/sections/ai-projects-section.tsx
```
Expected: matches for the stale strings; no `appStoreUrl` yet

- [ ] **Step 2: Update the `AIProject` interface (`ai-resume-data.ts`)**

Replace `  githubUrl: string;` inside `AIProject` with:
```ts
  githubUrl?: string;
  appStoreUrl?: string;
```

- [ ] **Step 3: Replace `aiSkillCategories`**

Levels for skills that existed before keep their old values (Swift 95, SwiftUI 95, Fastlane 85, OAuth 2.0 / PKCE 80, Keychain Services 80); the rest are self-assessed — owner confirms in review.
```ts
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
```

- [ ] **Step 4: Replace `aiExperiences`**

`aiImpact` is set only where the CV states an AI outcome.
```ts
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
```

- [ ] **Step 5: Replace `aiProjects`**

```ts
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
```

- [ ] **Step 6: Replace `aiHeroData`**

```ts
export const aiHeroData: AIHeroData = {
  title: "Software Engineer — LLM, Retrieval & Agent Systems",
  tagline:
    "6+ years shipping production apps, now building the code-intelligence, tool-admission, and vendor-gateway services of an internal AI platform.",
  badges: ["MCP", "Python", "Java / Quarkus", "Vertex AI", "Swift"],
  typingPhrases: ["Prompt → Verify → Ship → Repeat"],
};
```

- [ ] **Step 7: Render the hero title from data and update stats (`ai-hero-section.tsx`)**

Replace the h1:
```tsx
            <m.h1
              variants={itemVariants}
              className="font-heading font-bold text-4xl md:text-5xl text-gray-800 leading-tight"
            >
              AI-DRIVEN FULL-STACK DEVELOPER
            </m.h1>
```
with:
```tsx
            <m.h1
              variants={itemVariants}
              className="font-heading font-bold text-4xl md:text-5xl text-gray-800 leading-tight uppercase"
            >
              {aiHeroData.title}
            </m.h1>
```

Replace the two stat badges:
```tsx
              <StatBadge icon={<span>💼</span>} value="5+" label="Years XP" />
              <StatBadge icon={<span>⚡</span>} value="60%" label="Dev Velocity" />
```
with:
```tsx
              <StatBadge icon={<span>💼</span>} value="6+" label="Years XP" />
              <StatBadge icon={<span>🤖</span>} value="~100" label="Platform Users" />
```

- [ ] **Step 8: Make project links optional (`ai-projects-section.tsx`)**

Inside the project card component, before `return (`, add:
```tsx
  const href = project.githubUrl ?? project.appStoreUrl;
  const linkLabel = project.githubUrl ? "View on GitHub" : "View on App Store";
```

Wrap the title-row GitHub icon link so it renders only for GitHub projects — replace:
```tsx
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${project.title} on GitHub`}
            className="text-gray-800 hover:text-green-500 transition-colors mt-1 shrink-0 ml-3"
          >
            <GitHubIcon />
          </a>
```
with:
```tsx
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${project.title} on GitHub`}
              className="text-gray-800 hover:text-green-500 transition-colors mt-1 shrink-0 ml-3"
            >
              <GitHubIcon />
            </a>
          )}
```

Replace the bottom button:
```tsx
        <a
          href={project.githubUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center gap-2 w-full bg-white text-gray-800 border-2 border-gray-800 rounded-xl px-6 py-3 font-medium text-sm hover:bg-gray-50 transition-colors cursor-pointer"
        >
          <GitHubIcon />
          View on GitHub
        </a>
```
with:
```tsx
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center gap-2 w-full bg-white text-gray-800 border-2 border-gray-800 rounded-xl px-6 py-3 font-medium text-sm hover:bg-gray-50 transition-colors cursor-pointer"
        >
          {project.githubUrl && <GitHubIcon />}
          {linkLabel}
        </a>
```

- [ ] **Step 9: Content check passes + gates**

Run:
```bash
grep -nE "HVA App|Grok|60%|AI-assisted test|This Portfolio|AI-DRIVEN FULL-STACK|5\+" components/data/ai-resume-data.ts components/sections/ai-hero-section.tsx components/sections/ai-projects-section.tsx; echo "matches: $?"
grep -c "appStoreUrl" components/data/ai-resume-data.ts components/sections/ai-projects-section.tsx
npx tsc --noEmit && npm run lint
```
Expected: `matches: 1`; `ai-resume-data.ts:2` and `ai-projects-section.tsx:1`; tsc silent; lint clean

- [ ] **Step 10: Commit**

```bash
git add components/data/ai-resume-data.ts components/sections/ai-hero-section.tsx components/sections/ai-projects-section.tsx
git commit -m "feat(ai-workflow): rebuild ai-mode resume from new cv"
```

---

### Task 6: Whole-site verification

**Files:** none modified (fix-forward in the owning task's files if a check fails, then amend that task's commit only if it is not pushed; otherwise add a `fix(...)` commit).

**Interfaces:**
- Consumes: all prior tasks
- Produces: verified build

- [ ] **Step 1: Repo-wide stale-claim sweep**

Run:
```bash
grep -rnE "HVA App|vercel\.app|5\+ years|5\+\"|used by millions|Grok|Darkin|React Native" src components public --include='*.ts' --include='*.tsx' --include='*.txt' --include='*.xml'; echo "matches: $?"
```
Expected: `matches: 1`

- [ ] **Step 2: Production build**

Run: `npm run build`
Expected: `✓ Compiled successfully`, static pages generated, no type or lint errors

- [ ] **Step 3: Serve and check the PDF**

Run `npm run start` in the background, then:
```bash
curl -sI http://localhost:3000/DoanPhuong.pdf | grep -iE "^HTTP|content-length"
```
Expected: `HTTP/1.1 200 OK` and `Content-Length: 76699`

- [ ] **Step 4: Visual check of both modes**

With the server running, open `http://localhost:3000/?mode=ios` and `http://localhost:3000/?mode=ai` in a browser (Playwright MCP if available). Confirm:
- iOS: hero `iOS Software Engineer`, `6+ Years XP`; About shows the three new paragraphs; Experience lists Axon Active, S3 Corp, ZILLEARN, Windscribe (no HVA App); Projects shows Stress AI Coach with 🧘 and an App Store link; Side Projects shows jarvis, LLM Gateway, spm-cache.
- AI: h1 `SOFTWARE ENGINEER — LLM, RETRIEVAL & AGENT SYSTEMS`; stats `6+` / `~100`; Axon Active card shows the ⚡ `Internal AI agent platform serving ~100 users` badge and 6 bullets; Stress AI Coach card shows `View on App Store` with no GitHub icon; the other three show `View on GitHub`.
- Footer reads `Software Engineer` and `Ho Chi Minh City, Vietnam`.
- `http://localhost:3000/opengraph-image` renders `Software Engineer · iOS & AI Platform` and stats `6+`, `~100`, `2 yrs`.

Stop the server afterwards.

---

## Out of scope (record, do not fix here)

- `terminalLines` and `workflowSteps` in `ai-resume-data.ts`: a generic workflow demo, not CV facts.
- `twitter.images` / `openGraph.images` point at `/opengraph-image.png`, which does not exist (`.planning/codebase/CONCERNS.md`).
- `docs/system-architecture.md` describes an unused ThemeProvider and a `portfolio3/` parent.
- Pre-existing uncommitted deletions of `resources/resume.pdf` and `resources/resume-latest.pdf` — owner decides separately.
- `introduce-myself.html` copy (5+ years, iOS-only framing) is a separate artifact.
