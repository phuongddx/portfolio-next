"use client";

import { m, AnimatePresence } from "framer-motion";
import dynamic from "next/dynamic";
import { useMode } from "@/components/context/mode-context";

// iOS sections — static imports (always available)
import { HeroSection } from "@/components/sections/hero-section";
import { AboutSection } from "@/components/sections/about-section";
import { ExperienceSection } from "@/components/sections/experience-section";
import { SkillsSection } from "@/components/sections/skills-section";
import { ProjectsSection } from "@/components/sections/projects-section";
import { SideProjectsSection } from "@/components/sections/side-projects-section";
import { ContactSection } from "@/components/sections/contact-section";

// AI sections — dynamic imports with ssr: false (built in later phases)
const AIHeroSection = dynamic(
  () => import("@/components/sections/ai-hero-section").then((m) => m.AIHeroSection),
  { ssr: false, loading: () => <SectionSkeleton /> },
);
const AIWorkflowSection = dynamic(
  () => import("@/components/sections/ai-workflow-section").then((m) => m.AIWorkflowSection),
  { ssr: false, loading: () => <SectionSkeleton /> },
);
const AISkillsSection = dynamic(
  () => import("@/components/sections/ai-skills-section").then((m) => m.AISkillsSection),
  { ssr: false, loading: () => <SectionSkeleton /> },
);
const AIExperienceSection = dynamic(
  () => import("@/components/sections/ai-experience-section").then((m) => m.AIExperienceSection),
  { ssr: false, loading: () => <SectionSkeleton /> },
);
const AIProjectsSection = dynamic(
  () => import("@/components/sections/ai-projects-section").then((m) => m.AIProjectsSection),
  { ssr: false, loading: () => <SectionSkeleton /> },
);

function SectionSkeleton() {
  return (
    <div className="w-full max-w-6xl mx-auto px-4 py-20">
      <div className="animate-pulse space-y-6">
        <div className="h-8 bg-gray-200 rounded-lg w-1/3 mx-auto" />
        <div className="h-4 bg-gray-100 rounded w-2/3 mx-auto" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
          <div className="h-40 bg-gray-100 rounded-xl" />
          <div className="h-40 bg-gray-100 rounded-xl" />
        </div>
      </div>
    </div>
  );
}

function IOSContent() {
  return (
    <>
      <HeroSection />
      <AboutSection />
      <ExperienceSection />
      <SkillsSection />
      <ProjectsSection />
      <SideProjectsSection />
    </>
  );
}

function AIContent() {
  return (
    <>
      <AIHeroSection />
      <AIWorkflowSection />
      <AISkillsSection />
      <AIExperienceSection />
      <AIProjectsSection />
    </>
  );
}

const fadeTransition = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
  transition: { duration: 0.3 },
};

export function ModeRouter() {
  const { mode, mounted } = useMode();

  // Before client hydration, render iOS content to avoid layout shift
  if (!mounted) {
    return (
      <>
        <IOSContent />
        <ContactSection />
      </>
    );
  }

  return (
    <>
      <AnimatePresence mode="wait">
        <m.div key={mode} {...fadeTransition}>
          {mode === "ios" ? <IOSContent /> : <AIContent />}
        </m.div>
      </AnimatePresence>
      {/* Contact section is shared across both modes */}
      <ContactSection />
    </>
  );
}
