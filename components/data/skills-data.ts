export interface SkillCategory {
  id: string;
  title: string;
  skills: string[];
}

export const skillCategories: SkillCategory[] = [
  {
    id: "languages",
    title: "Languages",
    skills: ["Swift", "Ruby", "Bash", "TypeScript"],
  },
  {
    id: "frameworks",
    title: "Frameworks",
    skills: [
      "SwiftUI",
      "UIKit",
      "Combine",
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
      "Instruments",
      "Visual Code",
      "Cursor",
      "Claude Code",
      "XCTest",
      "Bitrise",
      "EAS Build",
    ],
  },
  {
    id: "services",
    title: "Services",
    skills: [
      "Firebase Suite",
      "OneSignal",
      "Branch",
    ],
  },
  {
    id: "architecture",
    title: "Architecture",
    skills: ["MVVM", "SOLID", "Agile", "CI/CD"],
  },
  {
    id: "ai-assisted",
    title: "AI-Assisted Dev",
    skills: ["Claude", "ChatGPT", "Grok"],
  },
  {
    id: "expertise",
    title: "Expertise",
    skills: ["Design Systems", "API Integration", "WebSocket", "Testing & QA", "Cross-platform"],
  },
];
