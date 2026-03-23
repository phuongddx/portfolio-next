import type { Metadata } from "next";
import { Space_Grotesk, DM_Sans } from "next/font/google";
import { MotionProvider } from "@/components/effects/motion-provider";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-heading",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-body",
});

const siteUrl = "https://portfolio-phi-lac-67.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "iOS Software Engineer | Doan Duy Phuong",
  description:
    "iOS Engineer with 5+ years shipping App Store products in Swift, SwiftUI & UIKit. Built a design system adopted by 3+ teams, cutting dev time by 40%. Open to full-time & remote roles.",
  keywords: [
    "iOS Developer",
    "iOS Engineer",
    "Swift Developer",
    "SwiftUI",
    "UIKit",
    "React Native",
    "Mobile Developer",
    "Software Engineer",
    "Ho Chi Minh City",
    "Remote iOS Developer",
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
    title: "iOS Software Engineer | Doan Duy Phuong",
    description:
      "iOS Engineer with 5+ years shipping App Store products. Built a design system adopted by 3+ teams, cutting dev time by 40%. Open to full-time & remote roles.",
    siteName: "Doan Duy Phuong — iOS Engineer",
    images: [{ url: "/opengraph-image.png", width: 1200, height: 630, alt: "Doan Duy Phuong — iOS Software Engineer" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "iOS Software Engineer | Doan Duy Phuong",
    description:
      "iOS Engineer with 5+ years shipping App Store products. Open to full-time & remote roles.",
    images: ["/opengraph-image.png"],
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
  jobTitle: "iOS Software Engineer",
  url: siteUrl,
  email: "95doanphuong@gmail.com",
  sameAs: [
    "https://linkedin.com/in/phuongddx/",
    "https://github.com/phuongddx",
  ],
  knowsAbout: ["iOS Development", "Swift", "SwiftUI", "UIKit", "React Native"],
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
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
      </head>
      <body
        className={`${spaceGrotesk.variable} ${dmSans.variable} antialiased`}
      >
        <MotionProvider>
          {/* Skip to content link for accessibility */}
          <a
            href="#main-content"
            className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:bg-cta focus:text-white focus:rounded-lg"
          >
            Skip to main content
          </a>
          <Navbar />
          <main id="main-content">{children}</main>
          <Footer />
        </MotionProvider>
      </body>
    </html>
  );
}
