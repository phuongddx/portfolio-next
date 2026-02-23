"use client";

import { m } from "framer-motion";
import { ScrollReveal } from "@/components/effects/scroll-reveal";
import { GlassCard } from "@/components/ui/glass-card";
import { experiences } from "@/components/data/experience-data";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const cardVariants = {
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

export function ExperienceSection() {
  return (
    <section
      id="experience"
      className="py-20 px-4 bg-background dark:bg-gray-950"
    >
      <div className="max-w-6xl mx-auto">
        <ScrollReveal>
          <h2 className="font-heading font-bold text-4xl md:text-5xl text-primary dark:text-white mb-12 text-center">
            Work Experience
          </h2>
        </ScrollReveal>

        <m.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="space-y-8"
        >
          {experiences.map((exp) => (
            <m.div key={exp.id} variants={cardVariants}>
              <ExperienceCard experience={exp} />
            </m.div>
          ))}
        </m.div>
      </div>
    </section>
  );
}

interface ExperienceCardProps {
  experience: (typeof experiences)[0];
}

function ExperienceCard({ experience }: ExperienceCardProps) {
  return (
    <GlassCard hover={false} className="p-6 md:p-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4 mb-4">
        <div>
          <h3 className="font-heading font-bold text-2xl text-primary dark:text-white mb-2">
            {experience.title}
          </h3>
          <p className="font-heading text-lg text-cta dark:text-blue-400">
            {experience.company}
          </p>
        </div>
        <div className="text-secondary dark:text-gray-400 text-right">
          <p>
            {experience.startDate} – {experience.endDate}
          </p>
          <p className="text-sm">
            {experience.location} - {experience.locationType}
          </p>
        </div>
      </div>

      {/* Achievements */}
      <ul className="space-y-3 text-secondary dark:text-gray-300">
        {experience.achievements.map((achievement, index) => (
          <li key={index} className="flex gap-3">
            <span className="text-cta dark:text-blue-400 mt-1 flex-shrink-0">
              ▸
            </span>
            <span>{achievement}</span>
          </li>
        ))}
      </ul>
    </GlassCard>
  );
}
