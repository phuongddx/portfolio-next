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
    id: "hva-app",
    title: "Mobile Engineer (React Native)",
    company: "HVA App",
    startDate: "07/2025",
    endDate: "Present",
    location: "Ho Chi Minh",
    locationType: "Remote",
    achievements: [
      "Designed and developed a large-scale fintech app across iOS, Android, and Web, serving thousands of active users",
      "Built and maintained 24+ feature modules including investment, savings, insurance, metal trading, and crypto wallet integration",
      "Implemented secure multi-tier authentication (Biometrics, KYC, PIN) and integrated Firebase, OneSignal, Branch, and payment gateways",
      "Established CI/CD pipelines with EAS Build, automated testing, and OTA updates, achieving 90%+ code quality compliance",
    ],
  },
  {
    id: "axon-active",
    title: "Software Engineer (iOS)",
    company: "Axon Active",
    startDate: "07/2024",
    endDate: "Present",
    location: "Ho Chi Minh",
    locationType: "Hybrid",
    achievements: [
      "Built a design system library supporting 4 dynamic appearances with customizable brand colors, adopted by 3+ teams, reducing UI development time by 40% across ePost iOS app",
      "Architected a scalable component framework enabling theme switching and appearance customization, eliminating code duplication for 15+ core UI components",
      "Migrated core production features to a new design system, improving UI consistency and reducing visual bugs by 60% based on QA reports",
      "Leveraged AI-assisted development (Claude, ChatGPT, Grok) to accelerate research and implementation, increasing development velocity by 60%",
    ],
  },
  {
    id: "s3-corp",
    title: "Software Engineer (iOS)",
    company: "S3 Corp",
    startDate: "12/2023",
    endDate: "06/2024",
    location: "Ho Chi Minh",
    locationType: "Remote",
    achievements: [
      "Collaborated with a dynamic design team to create app user experience in adherence to Apple's user interface guidelines",
      "Utilized the latest Swift version and Xcode to develop features, aligning with MVVM architecture and SOLID principles",
      "Strictly followed Agile methodologies to drive the product, wrote unit tests using XCTest, achieving 90% coverage at the ViewModel layer",
      "Facilitated API integration for user data and push notifications using NWWebSocket for real-time connections",
    ],
  },
  {
    id: "zillearn",
    title: "iOS Engineer",
    company: "ZILLEARN",
    startDate: "05/2022",
    endDate: "12/2023",
    location: "Ho Chi Minh",
    locationType: "On-site",
    achievements: [
      "Maintained and implemented improvements for existing features",
      "Developed CI/CD pipelines for automated deployment, supporting QA testing process",
      "Led efforts to refactor and update the project's architecture",
      "Developed UI/UX for tvOS enabling users to manage courses and learn from their Apple TV using AVFoundation",
    ],
  },
  {
    id: "windscribe",
    title: "Software Engineer (iOS) - Team Leader",
    company: "WINDSCRIBE",
    startDate: "04/2020",
    endDate: "03/2022",
    location: "Canada Client",
    locationType: "Remote",
    achievements: [
      "Led a team of 2-3 members, developing task plans and conducting code reviews",
      "Engaged in strategic discussions with CEO and CTO, contributing to brainstorming sessions for new features and maintenance",
      "Implemented CI/CD pipelines for automated deployment to QA environment using Bitrise",
    ],
  },
];
