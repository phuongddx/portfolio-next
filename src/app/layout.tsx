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

export const metadata: Metadata = {
  title: "DOAN DUY PHUONG | iOS Software Engineer",
  description:
    "iOS Software Engineer with 5+ years of experience building high-quality mobile applications. Specializing in Swift, SwiftUI, and UIKit.",
  keywords: [
    "iOS Developer",
    "Swift",
    "SwiftUI",
    "Software Engineer",
    "Mobile Developer",
    "Portfolio",
  ],
  authors: [{ name: "DOAN DUY PHUONG" }],
  creator: "DOAN DUY PHUONG",
  openGraph: {
    type: "website",
    locale: "en_US",
    title: "DOAN DUY PHUONG | iOS Software Engineer",
    description:
      "iOS Software Engineer with 5+ years of experience building high-quality mobile applications.",
    siteName: "DDP Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "DOAN DUY PHUONG | iOS Software Engineer",
    description:
      "iOS Software Engineer with 5+ years of experience building high-quality mobile applications.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
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
