"use client";

import { m } from "framer-motion";
import { ScrollReveal } from "@/components/effects/scroll-reveal";
import { GlassCard } from "@/components/ui/glass-card";
import { skillCategories } from "@/components/data/skills-data";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 20, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: "spring" as const,
      stiffness: 300,
      damping: 20,
    },
  },
};

const tagVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      type: "spring" as const,
      stiffness: 400,
      damping: 25,
    },
  },
};

export function SkillsSection() {
  return (
    <section
      id="skills"
      className="py-20 px-4 bg-white dark:bg-gray-900"
    >
      <div className="max-w-6xl mx-auto">
        <ScrollReveal>
          <h2 className="font-heading font-bold text-4xl md:text-5xl text-primary dark:text-white mb-12 text-center">
            Skills & Technologies
          </h2>
        </ScrollReveal>

        <m.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {skillCategories.map((category) => (
            <m.div key={category.id} variants={cardVariants}>
              <SkillCard category={category} />
            </m.div>
          ))}
        </m.div>
      </div>
    </section>
  );
}

interface SkillCardProps {
  category: (typeof skillCategories)[0];
}

function SkillCard({ category }: SkillCardProps) {
  return (
    <GlassCard hover={false}>
      <h3 className="font-heading font-bold text-xl text-primary dark:text-white mb-4">
        {category.title}
      </h3>
      <m.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="flex flex-wrap gap-2"
      >
        {category.skills.map((skill) => (
          <m.span
            key={skill}
            variants={tagVariants}
            className="inline-block px-3 py-1 bg-cta/10 dark:bg-blue-500/20 text-cta dark:text-blue-400 text-sm font-medium rounded-lg"
          >
            {skill}
          </m.span>
        ))}
      </m.div>
    </GlassCard>
  );
}
