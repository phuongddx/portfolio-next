"use client";

import { m } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { StatBadge } from "@/components/ui/stat-badge";
import { SocialLink } from "@/components/ui/social-link";
import {
  LinkedInIcon,
  GitHubIcon,
  EmailIcon,
} from "@/components/ui/social-icons";
import { useTypingAnimation } from "@/components/hooks/use-typing-animation";
import { aiHeroData } from "@/components/data/ai-resume-data";

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

const BADGE_COLORS: Array<"lime" | "green" | "pink" | "blue" | "purple"> = [
  "green", "blue", "purple", "lime", "pink",
];

export function AIHeroSection() {
  const typed = useTypingAnimation(aiHeroData.typingPhrases);

  return (
    <section
      id="ai-hero"
      className="min-h-screen flex items-center px-4 pt-24 pb-16 bg-[#f8f9fa]"
    >
      <m.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="max-w-6xl mx-auto w-full"
      >
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 items-center">
          {/* Left Column — 40% */}
          <div className="lg:col-span-2 space-y-6">
            <m.div variants={itemVariants} className="flex flex-wrap gap-2">
              {aiHeroData.badges.map((label, i) => (
                <Badge key={label} variant={BADGE_COLORS[i % BADGE_COLORS.length]}>
                  {label}
                </Badge>
              ))}
            </m.div>

            <m.h1
              variants={itemVariants}
              className="font-heading font-bold text-4xl md:text-5xl text-gray-800 leading-tight"
            >
              AI-DRIVEN FULL-STACK DEVELOPER
            </m.h1>

            {/* Typing animation */}
            <m.div
              variants={itemVariants}
              className="font-heading text-xl md:text-2xl text-green-500 h-8 flex items-center"
            >
              <span>{typed}</span>
              <span className="inline-block w-[2px] h-6 bg-green-500 ml-1 animate-pulse" />
            </m.div>

            <m.p
              variants={itemVariants}
              className="text-lg text-gray-600 leading-relaxed"
            >
              {aiHeroData.tagline}
            </m.p>

            {/* CTAs */}
            <m.div variants={itemVariants} className="flex gap-4">
              <a href="#contact">
                <Button variant="primary" size="lg">Get In Touch</Button>
              </a>
              <Button variant="secondary" size="lg" onClick={() => window.print()}>
                Download Resume
              </Button>
            </m.div>

            {/* Stats */}
            <m.div variants={itemVariants} className="flex gap-6 pt-4">
              <StatBadge icon={<span>💼</span>} value="5+" label="Years XP" />
              <StatBadge icon={<span>⚡</span>} value="60%" label="Dev Velocity" />
            </m.div>

            {/* Social Links */}
            <m.div variants={itemVariants} className="flex gap-4 pt-2">
              <SocialLink href="https://linkedin.com/in/phuongddx/" icon={<LinkedInIcon />} label="LinkedIn" />
              <SocialLink href="https://github.com/phuongddx" icon={<GitHubIcon />} label="GitHub" />
              <SocialLink href="mailto:95doanphuong@gmail.com" icon={<EmailIcon />} label="Email" />
            </m.div>
          </div>

          {/* Right Column — 60% */}
          <m.div variants={itemVariants} className="lg:col-span-3">
            <Card className="p-8">
              <AIWorkflowCard />
            </Card>
          </m.div>
        </div>
      </m.div>
    </section>
  );
}

/** Featured card showing AI workflow summary. */
function AIWorkflowCard() {
  return (
    <div className="flex items-start gap-4">
      <div className="w-16 h-16 bg-green-200 rounded-xl flex items-center justify-center flex-shrink-0">
        <span className="text-3xl">🤖</span>
      </div>
      <div className="flex-1">
        <Badge variant="green">AI Workflow</Badge>
        <h3 className="text-xl font-bold text-gray-800 mt-2">
          Prompt-Driven Development
        </h3>
        <p className="text-gray-600 mt-1">
          I leverage AI tools to decompose problems, generate production code,
          verify quality, and iterate — shipping faster without sacrificing
          reliability.
        </p>
        <div className="flex flex-wrap gap-2 mt-4">
          {["Claude Code", "TypeScript", "Next.js", "Swift"].map((tech) => (
            <span key={tech} className="px-3 py-1 bg-gray-100 text-gray-700 text-sm font-medium rounded-lg">
              {tech}
            </span>
          ))}
        </div>
        <div className="mt-6">
          <div className="flex justify-between text-sm mb-2">
            <span className="text-gray-500">AI-Assisted Output</span>
            <span className="text-green-500 font-medium">60% faster</span>
          </div>
          <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
            <div className="h-full bg-green-500 rounded-full" style={{ width: "60%" }} />
          </div>
        </div>
        <a href="#ai-workflow" className="inline-block mt-6">
          <Button variant="primary">See My Workflow</Button>
        </a>
      </div>
    </div>
  );
}
