import type { Metadata } from "next";
import { STIX_Two_Text } from "next/font/google";
import { MotionProvider } from "@/components/effects/motion-provider";
import { ModeProvider } from "@/components/context/mode-context";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { RevealObserver } from "@/components/effects/reveal-observer";
import "./globals.css";

const stix = STIX_Two_Text({
  subsets: ["latin"],
  weight: ["400", "600"],
  style: ["normal", "italic"],
  variable: "--font-text",
  display: "swap",
});

const siteUrl = "https://www.phuongddx.cc";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Software Engineer (iOS → AI Platform) | Doan Duy Phuong",
  description:
    "Software engineer with 6+ years shipping production apps, including 2 years as a team lead, now building LLM, retrieval, and agent systems on an internal AI platform.",
  keywords: [
    "Software Engineer",
    "AI Platform Engineer",
    "LLM",
    "Retrieval",
    "AI Agents",
    "MCP",
    "Model Context Protocol",
    "iOS Engineer",
    "Swift",
    "SwiftUI",
    "Python",
    "FastAPI",
    "Ho Chi Minh City",
  ],
  authors: [{ name: "Doan Duy Phuong" }],
  creator: "Doan Duy Phuong",
  alternates: {
    canonical: siteUrl,
  },
  openGraph: {
    type: "website",
    url: siteUrl,
    locale: "en_US",
    title: "Software Engineer (iOS → AI Platform) | Doan Duy Phuong",
    description:
      "Software engineer with 6+ years shipping production apps, including 2 years as a team lead, now building LLM, retrieval, and agent systems.",
    siteName: "Doan Duy Phuong — Software Engineer",
  },
  twitter: {
    card: "summary_large_image",
    title: "Software Engineer (iOS → AI Platform) | Doan Duy Phuong",
    description:
      "Software engineer with 6+ years shipping production apps, now building LLM, retrieval, and agent systems.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Doan Duy Phuong",
  jobTitle: "Software Engineer",
  url: siteUrl,
  email: "95doanphuong@gmail.com",
  sameAs: [
    "https://linkedin.com/in/phuongddx/",
    "https://github.com/phuongddx",
  ],
  knowsAbout: [
    "LLM Systems",
    "Retrieval",
    "AI Agents",
    "Model Context Protocol",
    "iOS Development",
    "Swift",
    "SwiftUI",
    "Python",
    "Java",
  ],
  address: {
    "@type": "PostalAddress",
    addressLocality: "Ho Chi Minh City",
    addressCountry: "VN",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={stix.variable} suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
      </head>
      <body className="antialiased">
        <MotionProvider>
          <ModeProvider>
            <a
              href="#main-content"
              className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:bg-accent focus:px-4 focus:py-2 focus:text-accent-ink"
            >
              Skip to main content
            </a>
            <Navbar />
            <main id="main-content">{children}</main>
            <Footer />
            <RevealObserver />
          </ModeProvider>
        </MotionProvider>
      </body>
    </html>
  );
}
