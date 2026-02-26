"use client";

import { m } from "framer-motion";
import { ScrollReveal } from "@/components/effects/scroll-reveal";
import { Card } from "@/components/ui/card";
import { skillCategories } from "@/components/data/skills-data";

// Pastel colors for category icons (rotating: pink, blue, purple, green)
const pastelColors = [
  "bg-pink-200",
  "bg-blue-200",
  "bg-purple-200",
  "bg-green-200",
];

// Category icons
const categoryIcons: Record<string, string> = {
  languages: "💻",
  frameworks: "🔧",
  tools: "🛠️",
  architecture: "🏗️",
  "ai-assisted": "🤖",
  expertise: "⭐",
};

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
    <section id="skills" className="py-20 px-4 bg-white">
      <div className="max-w-6xl mx-auto">
        <ScrollReveal>
          <h2 className="font-heading font-bold text-4xl md:text-5xl text-gray-800 mb-12 text-center">
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
          {skillCategories.map((category, index) => (
            <m.div key={category.id} variants={cardVariants}>
              <SkillCard category={category} colorIndex={index} />
            </m.div>
          ))}
        </m.div>
      </div>
    </section>
  );
}

interface SkillCardProps {
  category: (typeof skillCategories)[0];
  colorIndex: number;
}

function SkillCard({ category, colorIndex }: SkillCardProps) {
  const iconBgColor = pastelColors[colorIndex % pastelColors.length];
  const categoryIcon = categoryIcons[category.id] || "📌";

  return (
    <Card hover={false}>
      <div className="flex items-center gap-3 mb-4">
        <div
          className={`w-10 h-10 rounded-lg ${iconBgColor} flex items-center justify-center text-xl`}
        >
          {categoryIcon}
        </div>
        <h3 className="font-heading font-bold text-xl text-gray-800">
          {category.title}
        </h3>
      </div>
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
            className="inline-block px-3 py-1 bg-gray-100 text-gray-700 text-sm font-medium rounded-lg"
          >
            {skill}
          </m.span>
        ))}
      </m.div>
    </Card>
  );
}
