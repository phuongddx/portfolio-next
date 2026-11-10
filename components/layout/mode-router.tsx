"use client";

import { m, AnimatePresence } from "framer-motion";
import dynamic from "next/dynamic";
import { useMode } from "@/components/context/mode-context";
import { SplitStage } from "@/components/layout/split-stage";
import { iosFrames, aiFrames } from "@/components/sections/stage-frames";

// iOS sections — static imports (always available)
import { HeroSection } from "@/components/sections/hero-section";
import { AboutSection } from "@/components/sections/about-section";
import { ProjectsSection } from "@/components/sections/projects-section";
import { ExperienceSection } from "@/components/sections/experience-section";
import { SkillsSection } from "@/components/sections/skills-section";
import { SideProjectsSection } from "@/components/sections/side-projects-section";
import { CityBand } from "@/components/sections/city-band";
import { ContactSection } from "@/components/sections/contact-section";

// AI sections — dynamic imports with ssr: false
const AIHeroSection = dynamic(
  () => import("@/components/sections/ai-hero-section").then((mod) => mod.AIHeroSection),
  { ssr: false, loading: () => <SectionSkeleton tall /> },
);
const AIProjectsSection = dynamic(
  () => import("@/components/sections/ai-projects-section").then((mod) => mod.AIProjectsSection),
  { ssr: false, loading: () => <SectionSkeleton /> },
);
const AIWorkflowSection = dynamic(
  () => import("@/components/sections/ai-workflow-section").then((mod) => mod.AIWorkflowSection),
  { ssr: false, loading: () => <SectionSkeleton tall /> },
);
const AIExperienceSection = dynamic(
  () => import("@/components/sections/ai-experience-section").then((mod) => mod.AIExperienceSection),
  { ssr: false, loading: () => <SectionSkeleton /> },
);
const AISkillsSection = dynamic(
  () => import("@/components/sections/ai-skills-section").then((mod) => mod.AISkillsSection),
  { ssr: false, loading: () => <SectionSkeleton /> },
);

// Holds the space while a section's code loads, so the page does not jump.
function SectionSkeleton({ tall = false }: { tall?: boolean }) {
  return <div aria-hidden="true" className={tall ? "min-h-[calc(100svh-88px)]" : "min-h-[60svh]"} />;
}

function IOSContent() {
  return (
    <>
      <SplitStage frames={iosFrames} label="Screens from apps I built">
        <HeroSection />
        <AboutSection />
        <ProjectsSection />
      </SplitStage>
      <CityBand />
      <ExperienceSection />
      <SkillsSection />
      <SideProjectsSection />
    </>
  );
}

function AIContent() {
  return (
    <>
      <SplitStage frames={aiFrames} label="Artifacts from the resume-content run on this site">
        <AIHeroSection />
        <AboutSection />
        <AIProjectsSection />
      </SplitStage>
      <AIWorkflowSection />
      <CityBand />
      <AIExperienceSection />
      <AISkillsSection />
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
      <AnimatePresence mode="wait" initial={false}>
        <m.div key={mode} {...fadeTransition}>
          {mode === "ios" ? <IOSContent /> : <AIContent />}
        </m.div>
      </AnimatePresence>
      {/* Contact section is shared across both modes */}
      <ContactSection />
    </>
  );
}
