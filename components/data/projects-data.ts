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

// Pictures for the fixed stage in the iOS reading. Each belongs to a project row above.
export interface StageImage {
  key: string;
  projectId: string;
  src: string;
  width: number;
  height: number;
  alt: string;
  caption: string;
  field: 1 | 2 | 3 | 4;
}

export const iosStageImages: StageImage[] = [
  {
    key: "epost-1",
    projectId: "epost-design-system",
    src: "/screenshots/swisspost/460x998bb.webp",
    width: 460,
    height: 998,
    alt: "ePost app inbox showing insurance and tax letters as coloured cards",
    caption: "ePost inbox in the Swiss Post app, App Store screenshot. I built the ePost iOS design-system library.",
    field: 3,
  },
  {
    key: "epost-2",
    projectId: "epost-design-system",
    src: "/screenshots/swisspost/460x998bb-2.webp",
    width: 460,
    height: 998,
    alt: "Swiss Post app screenshot following a PostBus vehicle live on a map, with its next stops",
    caption: "Swiss Post app, App Store screenshot: PostBus vehicles followed live.",
    field: 2,
  },
  {
    key: "windscribe-1",
    projectId: "vpn-client",
    src: "/screenshots/windscribe/460x996bb.webp",
    width: 460,
    height: 996,
    alt: "Windscribe VPN App Store screenshot about unlocking streaming in 69+ countries",
    caption: "Windscribe VPN, App Store screenshot. I led a team of 2–3 on this app.",
    field: 4,
  },
  {
    key: "epost-3",
    projectId: "epost-design-system",
    src: "/screenshots/swisspost/460x998bb-3.webp",
    width: 460,
    height: 998,
    alt: "Swiss Post app screenshot creating a letter code, choosing A or B Mail and the letter size",
    caption: "Swiss Post app, App Store screenshot: sending a letter.",
    field: 2,
  },
  {
    key: "zillearn-1",
    projectId: "tvos-learning",
    src: "/screenshots/zillearn/Screenshot-1.png",
    width: 3110,
    height: 1438,
    alt: "ZILLEARN website showing its classroom feed and a phone to-do list",
    caption: "ZILLEARN's website. I built its tvOS course and video-playback experience.",
    field: 3,
  },
];
