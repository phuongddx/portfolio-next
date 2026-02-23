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
    id: "sp-group",
    title: "Software Engineer (iOS)",
    company: "SP Group",
    startDate: "04/2021",
    endDate: "06/2024",
    location: "Singapore",
    locationType: "Remote",
    achievements: [
      "Collaborated with design team to create app experiences adhering to Apple's user interface guidelines",
      "Utilized latest Swift and Xcode to develop features, aligning with MVVM architecture and SOLID principles",
      "Strictly followed Agile methodologies, wrote unit tests using XCTest, achieving 90% coverage at the ViewModel layer",
      "Enhanced app features based on analysis of App Store feedback and analytics data",
    ],
  },
  {
    id: "windscribe",
    title: "Software Engineer (iOS) - Team Leader",
    company: "WINDSCRIBE",
    startDate: "08/2019",
    endDate: "03/2021",
    location: "Canada Client",
    locationType: "Remote",
    achievements: [
      "Led a team of 2-3 members, developing task plans and conducting code reviews",
      "Engaged in strategic discussions with CEO and CTO, contributing to brainstorming sessions for new features",
      "Implemented CI/CD pipelines for automated deployment to QA environment using Bitrise",
    ],
  },
  {
    id: "zillearn",
    title: "iOS Engineer",
    company: "ZILLEARN",
    startDate: "05/2017",
    endDate: "07/2019",
    location: "Ho Chi Minh",
    locationType: "On-site",
    achievements: [
      "Maintained and implemented improvements for existing features",
      "Developed CI/CD pipelines for automated deployment, supporting QA testing process",
      "Implemented course video/audio download and playback using Apple Framework AVFoundation",
    ],
  },
];
