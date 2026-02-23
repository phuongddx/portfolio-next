export interface SkillCategory {
  id: string;
  title: string;
  skills: string[];
}

export const skillCategories: SkillCategory[] = [
  {
    id: "languages",
    title: "Languages",
    skills: ["Swift", "Ruby", "Bash", "TypeScript", "JavaScript"],
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
      "React Native",
      "Firebase",
    ],
  },
  {
    id: "tools",
    title: "Tools",
    skills: [
      "Xcode",
      "Instruments",
      "Visual Code",
      "Claude Code",
      "XCTest",
      "Bitrise",
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
    skills: ["Design Systems", "API Integration", "Testing & QA", "Cross-platform"],
  },
];
