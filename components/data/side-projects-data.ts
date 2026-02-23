export interface SideProject {
  id: string;
  title: string;
  description: string;
  githubUrl: string;
  language: string;
  languageColor: string;
  stars: number;
  forks: number;
  topics: string[];
  status: "production" | "development" | "archived";
}

export const sideProjects: SideProject[] = [
  {
    id: "xcframework-cli",
    title: "XCFramework CLI",
    description:
      "Build XCFrameworks from Xcode projects or Swift Packages with YAML/JSON config support. Features iOS + Simulator support, resource bundles, and colored output.",
    githubUrl: "https://github.com/phuongddx/xcframework-cli",
    language: "Ruby",
    languageColor: "#CC342D",
    stars: 0,
    forks: 0,
    topics: ["ios", "xcframework", "cli", "swift-package", "xcode"],
    status: "production",
  },
  {
    id: "trending-movie-ios",
    title: "Trending Movies",
    description:
      "iOS app showcasing trending movies using TMDB API. Built with Clean Architecture + MVVM, featuring hero carousel, trailer playback, search, and watchlist management.",
    githubUrl: "https://github.com/phuongddx/trending-movie-ios",
    language: "Swift",
    languageColor: "#F05138",
    stars: 0,
    forks: 0,
    topics: ["swiftui", "mvvm", "clean-architecture", "tmdb", "movies"],
    status: "production",
  },
  {
    id: "ios-stress-app",
    title: "StressMonitor",
    description:
      "Privacy-first stress monitoring for iOS & watchOS using Heart Rate Variability (HRV). Features CloudKit sync, Apple Watch complications, widgets, and breathing exercises.",
    githubUrl: "https://github.com/NextGen-Limited/ios-stress-app",
    language: "Swift",
    languageColor: "#F05138",
    stars: 0,
    forks: 0,
    topics: ["swiftui", "healthkit", "watchos", "cloudkit", "hrv"],
    status: "production",
  },
];
