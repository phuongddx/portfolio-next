export interface SkillCategory {
  id: string;
  title: string;
  skills: string[];
}

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
