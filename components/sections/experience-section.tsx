"use client";

import { m } from "framer-motion";
import { ScrollReveal } from "@/components/effects/scroll-reveal";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { experiences } from "@/components/data/experience-data";

// Pastel colors for company icons
const pastelColors = ["bg-pink-200", "bg-blue-200", "bg-purple-200", "bg-green-200"];

// Company icons
const companyIcons: Record<string, string> = {
  "Axon Active": "🏢",
  "SP Group": "🇸🇬",
  "WINDSCRIBE": "🔒",
  "ZILLEARN": "📚",
};

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
    <section id="experience" className="py-20 px-4 bg-[#f8f9fa]">
      <div className="max-w-6xl mx-auto">
        <ScrollReveal>
          <h2 className="font-heading font-bold text-4xl md:text-5xl text-gray-800 mb-12 text-center">
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
          {experiences.map((exp, index) => (
            <m.div key={exp.id} variants={cardVariants}>
              <ExperienceCard experience={exp} colorIndex={index} />
            </m.div>
          ))}
        </m.div>
      </div>
    </section>
  );
}

interface ExperienceCardProps {
  experience: (typeof experiences)[0];
  colorIndex: number;
}

function ExperienceCard({ experience, colorIndex }: ExperienceCardProps) {
  const iconBgColor = pastelColors[colorIndex % pastelColors.length];
  const companyIcon = companyIcons[experience.company] || "💼";

  return (
    <Card hover={false} className="p-6 md:p-8">
      <div className="flex items-start gap-4">
        {/* Company Icon */}
        <div
          className={`w-14 h-14 rounded-xl ${iconBgColor} flex items-center justify-center text-2xl flex-shrink-0`}
        >
          {companyIcon}
        </div>

        <div className="flex-1">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-2 mb-4">
            <div>
              <h3 className="font-heading font-bold text-xl text-gray-800">
                {experience.title}
              </h3>
              <p className="font-heading text-green-500">{experience.company}</p>
            </div>
            <div className="flex items-center gap-2 flex-shrink-0">
              <Badge variant="lime">{experience.locationType}</Badge>
              <span className="text-sm text-gray-500">
                {experience.startDate} – {experience.endDate}
              </span>
            </div>
          </div>

          {/* Location */}
          <p className="text-sm text-gray-500 mb-4">{experience.location}</p>

          {/* Achievements */}
          <ul className="space-y-3 text-gray-600">
            {experience.achievements.map((achievement, index) => (
              <li key={index} className="flex gap-3">
                <span className="text-green-500 mt-1 flex-shrink-0">▸</span>
                <span>{achievement}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Card>
  );
}
