"use client";

import { m } from "framer-motion";
import { ScrollReveal } from "@/components/effects/scroll-reveal";
import { aiSkillCategories } from "@/components/data/ai-resume-data";

// Category colors — used as skill bar fill color
const categoryColors: Record<string, string> = {
  "AI Tools": "#8b5cf6",
  Languages: "#3b82f6",
  Backend: "#f97316",
  Frontend: "#22c55e",
  DevOps: "#ec4899",
  Architecture: "#eab308",
};

export function AISkillsSection() {
  return (
    <section id="ai-skills" className="py-20 px-4 bg-white">
      <div className="max-w-6xl mx-auto">
        <ScrollReveal>
          <h2 className="font-heading font-bold text-4xl md:text-5xl text-gray-800 mb-12 text-center">
            Skills &amp; Technologies
          </h2>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {aiSkillCategories.map((category, catIdx) => (
            <ScrollReveal key={category.id} delay={catIdx * 0.1}>
              <div className="border-2 border-gray-800 rounded-xl p-6 shadow-card">
                <h3 className="font-bold text-lg text-gray-800 mb-5">
                  {category.title}
                </h3>

                <div>
                  {category.skills.map((skill, index) => (
                    <SkillBar
                      key={skill.name}
                      name={skill.name}
                      level={skill.level}
                      index={index}
                      color={categoryColors[category.title] ?? "#6b7280"}
                    />
                  ))}
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}

interface SkillBarProps {
  name: string;
  level: number;
  index: number;
  color: string;
}

function SkillBar({ name, level, index, color }: SkillBarProps) {
  return (
    <div className="mb-3 last:mb-0">
      <div className="flex justify-between text-sm mb-1">
        <span className="text-gray-700 font-medium">{name}</span>
        <span className="text-gray-500">{level}%</span>
      </div>
      <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
        <m.div
          className="h-full rounded-full"
          initial={{ width: 0 }}
          whileInView={{ width: `${level}%` }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: "easeOut", delay: index * 0.1 }}
          data-skill-level={level}
          style={{ backgroundColor: color }}
        />
      </div>
    </div>
  );
}
