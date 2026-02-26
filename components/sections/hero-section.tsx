"use client";

import { m } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
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
      className="min-h-screen flex items-center justify-center px-4 pt-24 pb-16"
    >
      <m.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="max-w-4xl mx-auto text-center"
      >
        {/* Availability Badge */}
        <m.div variants={itemVariants} className="mb-6">
          <Badge variant="default">Available for Opportunities</Badge>
        </m.div>

        {/* Name */}
        <m.h1
          variants={itemVariants}
          className="font-heading font-bold text-5xl sm:text-6xl md:text-7xl lg:text-8xl text-primary dark:text-white mb-6"
        >
          DOAN DUY PHUONG
        </m.h1>

        {/* Title */}
        <m.p
          variants={itemVariants}
          className="font-heading text-2xl sm:text-3xl md:text-4xl text-secondary dark:text-gray-300 mb-8"
        >
          iOS Software Engineer
        </m.p>

        {/* Description */}
        <m.p
          variants={itemVariants}
          className="text-lg sm:text-xl text-secondary dark:text-gray-400 max-w-2xl mx-auto mb-12 leading-relaxed"
        >
          Passionate about building fast, reliable, and beautifully crafted
          mobile experiences. 5+ years specializing in iOS development with
          Swift, SwiftUI, and UIKit.
        </m.p>

        {/* CTAs */}
        <m.div
          variants={itemVariants}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12"
        >
          <a href="#contact">
            <Button variant="primary" size="large">
              Get In Touch
            </Button>
          </a>
          <a href="#projects">
            <Button variant="secondary" size="large">
              View My Work
            </Button>
          </a>
          <a href="/DoanPhuong.pdf" download="DoanPhuong.pdf">
            <Button variant="secondary" size="large">
              Download Resume
            </Button>
          </a>
        </m.div>

        {/* Social Links */}
        <m.div variants={itemVariants} className="flex gap-6 justify-center">
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
      className="w-12 h-12 flex items-center justify-center bg-primary/5 dark:bg-white/10 text-primary dark:text-white hover:bg-cta hover:text-white rounded-full transition-colors duration-200"
      aria-label={label}
    >
      {icon}
    </m.a>
  );
}
