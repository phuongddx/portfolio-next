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
      "Built a UIKit + SwiftUI design system library supporting 4 dynamic appearances with customizable brand colors, adopted by 3+ teams, reducing UI development time by 40% across the ePost iOS app; hosted SwiftUI components inside UIKit-owned navigation using UIHostingController",
      "Shipped feature screens following Coordinator + MVVM (input/output) architecture with RxSwift/RxCocoa bindings, ViewModel, Coordinator, and service layers matching the existing app structure",
      "Worked across Dev, Staging, and Production schemes with xcconfig-driven environment configuration, SPM dependencies, and Fastlane + Firebase App Distribution + TestFlight release workflows",
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
      "Built feature screens with ViewController, ViewModel, and service layers using Swift and UIKit, aligning with Coordinator + MVVM architecture and SOLID principles",
      "Bound user events and state with RxSwift/RxCocoa input/output transforms, and integrated a shared ApiService with authenticated requests and refresh-token handling",
      "Wrote unit tests using XCTest with mocks/stubs for network and service boundaries, achieving 90% coverage at the ViewModel layer; used RxTest for reactive test cases",
      "Integrated REST APIs, push notifications (APNs via OneSignal), and real-time connections using NWWebSocket",
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
      "Maintained and implemented improvements for existing features across iOS and tvOS targets, including onboarding, home, course detail, and profile flows",
      "Implemented app flows with deep links and environment-specific configuration (xcconfig) across dev/staging/production schemes",
      "Developed CI/CD pipelines with Fastlane and Bitrise for automated deployment to Firebase App Distribution and TestFlight, supporting the QA testing process",
      "Led efforts to refactor and update the project's architecture toward Coordinator + MVVM",
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
      "Led a team of 2-3 members, developing task plans and conducting code reviews in an existing production codebase with multiple schemes and SDK integrations",
      "Implemented OAuth 2.0 with PKCE flow for secure authentication, AES encryption for credential storage using Keychain Services, and JWT/crypto handling for encrypted APIs",
      "Built app session state management, refresh-token handling, and deep links / associated domains; applied zero-knowledge architecture principles to VPN tunnel key management",
      "Integrated Firebase Analytics, Crashlytics, and push notification extensions (Notification Service Extension) for rich push payloads",
      "Engaged in strategic discussions with CEO and CTO, contributing to brainstorming sessions for new features and maintenance",
      "Implemented CI/CD pipelines with Fastlane and Bitrise for automated deployment to QA environment",
    ],
  },
];
