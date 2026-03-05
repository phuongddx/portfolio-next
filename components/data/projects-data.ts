export interface Project {
  id: string;
  title: string;
  category: string;
  description: string;
  technologies: string[];
  stat?: {
    value: string;
    label: string;
  };
  screenshots: string[];
  appStoreUrl?: string;
}

export const projects: Project[] = [
  {
    id: "hva-financial",
    title: "HVA Financial App",
    category: "Fintech",
    description:
      "Large-scale fintech app across iOS, Android, and Web with 24+ modules including investment, savings, insurance, metal trading, and crypto wallet.",
    technologies: ["React Native", "TypeScript", "Firebase", "OneSignal"],
    stat: { value: "90%+", label: "code quality compliance" },
    screenshots: [],
    appStoreUrl: "https://apps.apple.com/us/app/hva-%C4%91%E1%BA%A7u-t%C6%B0-%C4%91a-l%E1%BB%9Bp-t%C3%A0i-s%E1%BA%A3n/id6748415445",
  },
  {
    id: "epost-design-system",
    title: "ePost Design System",
    category: "Design System",
    description:
      "Built a scalable design system library with 4 dynamic appearances and customizable brand colors, adopted by 3+ teams.",
    technologies: ["SwiftUI", "UIKit", "Design Systems"],
    stat: { value: "40%", label: "reduction in UI development time" },
    screenshots: [
      "/screenshots/swisspost/460x998bb.webp",
      "/screenshots/swisspost/460x998bb-2.webp",
      "/screenshots/swisspost/460x998bb-3.webp",
    ],
    appStoreUrl: "https://apps.apple.com/us/app/swiss-post/id378676700",
  },
  {
    id: "smart-home",
    title: "Darkin Smart Home",
    category: "IoT",
    description:
      "iOS app for controlling Darkin Air conditioners using NWWebSocket for real-time communication.",
    technologies: ["Swift", "NWWebSocket", "MVVM", "XCTest"],
    stat: { value: "90%", label: "test coverage at ViewModel layer" },
    screenshots: [],
    appStoreUrl: undefined,
  },
  {
    id: "tvos-learning",
    title: "tvOS Learning Platform",
    category: "Education",
    description:
      "Developed UI/UX for tvOS enabling users to manage courses and learn from their Apple TV with video/audio playback using AVFoundation.",
    technologies: ["tvOS", "AVFoundation", "SwiftUI"],
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
      "Led iOS development for VPN client with automated CI/CD deployment to QA environment using Bitrise.",
    technologies: ["Swift", "Bitrise", "CI/CD"],
    screenshots: ["/screenshots/windscribe/460x996bb.webp"],
    appStoreUrl: "https://apps.apple.com/us/app/vpn-windscribe-fast-secure/id1129435228",
  },
];
