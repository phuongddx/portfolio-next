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
