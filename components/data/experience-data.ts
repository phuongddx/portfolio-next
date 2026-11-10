export interface Experience {
  id: string;
  title: string;
  company: string;
  startDate: string;
  endDate: string;
  location: string;
  locationType: "Remote" | "Hybrid" | "On-site";
  achievements: string[];
}

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

// The career stripe in the hero card. Months are inclusive; "asOf" closes the open-ended role.
export interface TimelineSegment {
  id: string;
  label: string;
  from: string; // YYYY-MM
  to: string; // YYYY-MM
  track: "ios" | "ai";
}

export const careerTimelineAsOf = "2026-11";

export const careerTimeline: TimelineSegment[] = [
  { id: "windscribe", label: "Windscribe", from: "2020-04", to: "2022-03", track: "ios" },
  { id: "zillearn", label: "ZILLEARN", from: "2022-05", to: "2023-12", track: "ios" },
  { id: "s3-corp", label: "S3", from: "2023-12", to: "2024-06", track: "ios" },
  { id: "axon-ios", label: "Axon Active", from: "2024-07", to: "2026-05", track: "ios" },
  { id: "axon-ai", label: "AI", from: "2026-06", to: careerTimelineAsOf, track: "ai" },
];

export const iosHeroData = {
  title: "iOS engineer",
  tagline:
    "Six years shipping production iOS apps from Ho Chi Minh City: a design system adopted by 3+ teams, a VPN app I led, and a tvOS learning platform.",
};

export const aboutParagraphs = {
  career:
    "I'm a software engineer with 6+ years shipping production apps, including 2 years as a team lead.",
  ios: "Most of that time was native iOS: Swift, SwiftUI, UIKit, RxSwift, and Coordinator + MVVM.",
  platform:
    "Since June 2026 I've been a core engineer on Axon Active's internal AI agent platform, owning the code-intelligence, tool-admission, and vendor-gateway services used by ~100 people across engineering, marketing, product, and leadership.",
  side: "Outside work I maintain jarvis, a local-first code-intelligence MCP server on PyPI and the official MCP Registry, and ship Stress AI Coach, an iOS + watchOS app on the App Store.",
};
