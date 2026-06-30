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
      "Led iOS development for VPN client with OAuth 2.0/PKCE authentication, AES encryption for credential storage, and zero-knowledge tunnel key management. Automated CI/CD deployment via Bitrise.",
    technologies: ["Swift", "OAuth 2.0", "PKCE", "AES", "Keychain", "Bitrise"],
    screenshots: ["/screenshots/windscribe/460x996bb.webp"],
    appStoreUrl: "https://apps.apple.com/us/app/vpn-windscribe-fast-secure/id1129435228",
  },
];
