"use client";

import { useState } from "react";
import { m, AnimatePresence } from "framer-motion";
import { ScrollReveal } from "@/components/effects/scroll-reveal";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { aiExperiences } from "@/components/data/ai-resume-data";
import type { AIExperience } from "@/components/data/ai-resume-data";

export function AIExperienceSection() {
  return (
    <section id="ai-experience" className="py-20 px-4 bg-[#f8f9fa]">
      <div className="max-w-6xl mx-auto">
        <ScrollReveal>
          <h2 className="font-heading font-bold text-4xl md:text-5xl text-gray-800 mb-12 text-center">
            Experience
          </h2>
        </ScrollReveal>

        <div className="space-y-6">
          {aiExperiences.map((exp, index) => (
            <ScrollReveal key={exp.id} delay={index * 0.1}>
              <ExperienceCard experience={exp} />
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}

interface ExperienceCardProps {
  experience: AIExperience;
}

function ExperienceCard({ experience }: ExperienceCardProps) {
  const [expanded, setExpanded] = useState(false);

  return (
    <Card hover={false} className="p-0 overflow-hidden">
      {/* Clickable header */}
      <button
        type="button"
        onClick={() => setExpanded((prev) => !prev)}
        className="w-full text-left p-6 md:p-8 focus:outline-none focus-visible:ring-2 focus-visible:ring-green-500 focus-visible:ring-offset-2 rounded-xl cursor-pointer"
      >
        <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-3">
          {/* Left: title, company, period */}
          <div className="flex-1 min-w-0">
            <h3 className="font-heading font-bold text-xl text-gray-800">
              {experience.title}{" "}
              <span className="text-green-500">@ {experience.company}</span>
            </h3>
            <p className="text-sm text-gray-500 mt-1">
              {experience.period} &middot;{" "}
              <LocationBadge type={experience.locationType} />
            </p>
          </div>

          {/* Right: AI impact badge + chevron */}
          <div className="flex items-center gap-3 flex-shrink-0">
            {experience.aiImpact && (
              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800 border border-green-300">
                <span className="mr-1">&#9889;</span>
                {experience.aiImpact}
              </span>
            )}
            <span
              className={cn(
                "text-gray-500 transition-transform duration-200 text-lg select-none",
                expanded && "rotate-180"
              )}
              aria-hidden="true"
            >
              &#9660;
            </span>
          </div>
        </div>
      </button>

      {/* Expandable highlights */}
      <AnimatePresence initial={false}>
        {expanded && (
          <m.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <ul className="px-6 md:px-8 pb-6 md:pb-8 space-y-3">
              {experience.highlights.map((highlight, i) => (
                <m.li
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05, duration: 0.25 }}
                  className="flex gap-3 text-gray-600"
                >
                  <span className="text-green-500 mt-0.5 flex-shrink-0">
                    &#9656;
                  </span>
                  <span>{highlight}</span>
                </m.li>
              ))}
            </ul>
          </m.div>
        )}
      </AnimatePresence>
    </Card>
  );
}

// Small inline badge for location type (Remote / Hybrid / On-site)
function LocationBadge({ type }: { type: string }) {
  const variantMap: Record<string, "lime" | "blue" | "purple"> = {
    Remote: "blue",
    Hybrid: "purple",
    "On-site": "lime",
  };

  return <Badge variant={variantMap[type] ?? "lime"}>{type}</Badge>;
}
