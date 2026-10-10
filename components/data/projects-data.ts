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
      "UIKit + SwiftUI design-system library for the ePost iOS app, adopted by 3+ teams.",
    technologies: ["SwiftUI", "UIKit", "Design Systems"],
    stat: { value: "~40%", label: "reduction in UI development time" },
    screenshots: [
      "/screenshots/swisspost/460x998bb.webp",
      "/screenshots/swisspost/460x998bb-2.webp",
      "/screenshots/swisspost/460x998bb-3.webp",
    ],
    appStoreUrl: "https://apps.apple.com/us/app/swiss-post/id378676700",
  },
  {
    id: "stress-ai-coach",
    title: "Stress AI Coach",
    category: "Health",
    description:
      "iOS + watchOS app with privacy-first stress scoring from HealthKit and a streaming AI coach. Raw health data never leaves the device; only derived scores reach the model.",
    technologies: ["Swift", "watchOS", "HealthKit", "StoreKit", "SSE"],
    screenshots: [],
    appStoreUrl: "https://apps.apple.com/us/app/stress-ai-coach/id6778478266",
  },
  {
    id: "tvos-learning",
    title: "tvOS Learning Platform",
    category: "Education",
    description:
      "tvOS course and video-playback experience built with AVFoundation for ZILLEARN, an AI-powered learning platform for schools and enterprises.",
    technologies: ["tvOS", "AVFoundation", "Coordinator + MVVM"],
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
      "Led a team of 2–3 on the production VPN app: OAuth 2.0 with PKCE, AES credential encryption via Keychain, and zero-knowledge VPN tunnel key management.",
    technologies: ["Swift", "OAuth 2.0", "PKCE", "Keychain", "Network Extension"],
    screenshots: ["/screenshots/windscribe/460x996bb.webp"],
    appStoreUrl: "https://apps.apple.com/us/app/vpn-windscribe-fast-secure/id1129435228",
  },
];
