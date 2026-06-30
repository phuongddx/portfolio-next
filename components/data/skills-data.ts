export interface SkillCategory {
  id: string;
  title: string;
  skills: string[];
}

export const skillCategories: SkillCategory[] = [
  {
    id: "languages",
    title: "Languages",
    skills: ["Swift", "Ruby", "Bash", "TypeScript", "SQLCipher"],
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
      "Core Data",
      "SwiftData",
      "Moya",
      "Realm Database",
      "React Native",
    ],
  },
  {
    id: "tools",
    title: "Tools",
    skills: [
      "Xcode",
      "Swift Package Manager (SPM)",
      "Git LFS",
      "Fastlane",
      "Firebase App Distribution",
      "TestFlight",
      "Instruments",
      "Visual Code",
      "Cursor",
      "Claude Code",
      "Bitrise",
      "EAS Build",
    ],
  },
  {
    id: "services",
    title: "Services",
    skills: [
      "Firebase Suite",
      "Firebase Analytics",
      "Crashlytics",
      "OneSignal",
      "Branch",
      "AppsFlyer",
      "Meta / Facebook SDK",
    ],
  },
  {
    id: "architecture",
    title: "Architecture",
    skills: [
      "Coordinator Pattern",
      "MVVM (Input/Output)",
      "SOLID",
      "Clean Architecture",
      "Agile",
      "CI/CD",
      "Keychain Services",
      "App Groups",
      "Multi-scheme (Dev/Staging/Prod)",
    ],
  },
  {
    id: "ai-assisted",
    title: "AI-Assisted Dev",
    skills: ["Claude", "ChatGPT", "Grok"],
  },
  {
    id: "expertise",
    title: "Expertise",
    skills: [
      "Design Systems",
      "API Integration",
      "REST APIs",
      "Token Refresh / Session State",
      "Deep Links",
      "WebSocket",
      "Push Notifications (APNs)",
      "Notification Service Extension",
      "Testing & QA",
      "Test Doubles / Mocks",
      "Cross-platform",
      "SwiftUI in UIKit Navigation",
      "OAuth 2.0",
      "PKCE",
      "AES Encryption",
      "Zero-Knowledge",
    ],
  },
];
