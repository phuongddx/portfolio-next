"use client";

import { m } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { StatBadge } from "@/components/ui/stat-badge";
import {
  LinkedInIcon,
  GitHubIcon,
  EmailIcon,
} from "@/components/ui/social-icons";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.3,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring" as const,
      stiffness: 300,
      damping: 20,
    },
  },
};

export function HeroSection() {
  return (
    <section
      id="hero"
      className="min-h-screen flex items-center px-4 pt-24 pb-16 bg-[#f8f9fa]"
    >
      <m.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="max-w-6xl mx-auto w-full"
      >
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 items-center">
          {/* Left Column (40% - 2 cols) */}
          <div className="lg:col-span-2 space-y-6">
            {/* Badge */}
            <m.div variants={itemVariants}>
              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-lime-400 text-gray-800">
                🟢 Available for Work
              </span>
            </m.div>

            {/* Name */}
            <m.h1
              variants={itemVariants}
              className="font-heading font-bold text-4xl md:text-5xl text-gray-800 leading-tight"
            >
              DOAN DUY PHUONG
            </m.h1>

            {/* Title */}
            <m.p
              variants={itemVariants}
              className="font-heading text-xl md:text-2xl text-green-500"
            >
              iOS Software Engineer
            </m.p>

            {/* Description */}
            <m.p
              variants={itemVariants}
              className="text-lg text-gray-600 leading-relaxed"
            >
              Passionate about building fast, reliable, and beautifully crafted
              mobile experiences. 5+ years specializing in iOS development with
              Swift, SwiftUI, and UIKit.
            </m.p>

            {/* CTAs */}
            <m.div variants={itemVariants} className="flex gap-4">
              <a href="#contact">
                <Button variant="primary" size="lg">
                  Get In Touch
                </Button>
              </a>
              <a href="#projects">
                <Button variant="secondary" size="lg">
                  View My Work
                </Button>
              </a>
            </m.div>

            {/* Stats Row */}
            <m.div variants={itemVariants} className="flex gap-6 pt-4">
              <StatBadge
                icon={<span>💼</span>}
                value="5+"
                label="Years XP"
              />
              <StatBadge
                icon={<span>🚀</span>}
                value="6+"
                label="Projects"
              />
            </m.div>

            {/* Social Links */}
            <m.div variants={itemVariants} className="flex gap-4 pt-2">
              <SocialLink
                href="https://linkedin.com/in/phuongddx/"
                icon={<LinkedInIcon />}
                label="LinkedIn"
              />
              <SocialLink
                href="https://github.com/phuongddx"
                icon={<GitHubIcon />}
                label="GitHub"
              />
              <SocialLink
                href="mailto:95doanphuong@gmail.com"
                icon={<EmailIcon />}
                label="Email"
              />
            </m.div>
          </div>

          {/* Right Column (60% - 3 cols) - Featured Project */}
          <m.div variants={itemVariants} className="lg:col-span-3">
            <Card className="p-8">
              <div className="flex items-start gap-4">
                <div className="w-16 h-16 bg-pink-200 rounded-xl flex items-center justify-center flex-shrink-0">
                  <span className="text-3xl">📱</span>
                </div>
                <div className="flex-1">
                  <span className="inline-block px-3 py-1 text-sm font-medium bg-lime-400 text-gray-800 rounded-full mb-2">
                    Featured Project
                  </span>
                  <h3 className="text-xl font-bold text-gray-800">
                    ePost Design System
                  </h3>
                  <p className="text-gray-600 mt-1">
                    Built a scalable design system library with 4 dynamic
                    appearances and customizable brand colors, adopted by 3+
                    teams.
                  </p>

                  {/* Tech Stack */}
                  <div className="flex flex-wrap gap-2 mt-4">
                    <span className="px-3 py-1 bg-gray-100 text-gray-700 text-sm font-medium rounded-lg">
                      SwiftUI
                    </span>
                    <span className="px-3 py-1 bg-gray-100 text-gray-700 text-sm font-medium rounded-lg">
                      UIKit
                    </span>
                    <span className="px-3 py-1 bg-gray-100 text-gray-700 text-sm font-medium rounded-lg">
                      Design Systems
                    </span>
                  </div>

                  {/* Progress */}
                  <div className="mt-6">
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-gray-500">Impact</span>
                      <span className="text-green-500 font-medium">
                        40% faster
                      </span>
                    </div>
                    <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-green-500 rounded-full"
                        style={{ width: "100%" }}
                      />
                    </div>
                  </div>

                  <a
                    href="https://apps.apple.com/us/app/swiss-post/id378676700"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block mt-6"
                  >
                    <Button variant="primary">View on App Store</Button>
                  </a>
                </div>
              </div>
            </Card>
          </m.div>
        </div>
      </m.div>
    </section>
  );
}

function SocialLink({
  href,
  icon,
  label,
}: {
  href: string;
  icon: React.ReactNode;
  label: string;
}) {
  return (
    <m.a
      href={href}
      target={href.startsWith("mailto") ? undefined : "_blank"}
      rel={href.startsWith("mailto") ? undefined : "noopener noreferrer"}
      whileHover={{ scale: 1.1, y: -4 }}
      whileTap={{ scale: 0.95 }}
      className="w-12 h-12 flex items-center justify-center bg-white border-2 border-gray-800 text-gray-800 hover:bg-green-500 hover:text-white hover:border-green-500 rounded-full transition-colors duration-200"
      aria-label={label}
    >
      {icon}
    </m.a>
  );
}
