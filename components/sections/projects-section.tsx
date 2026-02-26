"use client";

import { m } from "framer-motion";
import { ScrollReveal } from "@/components/effects/scroll-reveal";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { projects } from "@/components/data/projects-data";

// Pastel colors for project icons (rotating)
const pastelColors = [
  "bg-pink-200",
  "bg-blue-200",
  "bg-purple-200",
  "bg-green-200",
];

// Project icons based on category
const categoryIcons: Record<string, string> = {
  "Design System": "🎨",
  Fintech: "💰",
  IoT: "🏠",
  Education: "📺",
  Security: "🔒",
  Architecture: "🏗️",
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

export function ProjectsSection() {
  return (
    <section id="projects" className="py-20 px-4 bg-[#f8f9fa]">
      <div className="max-w-6xl mx-auto">
        <ScrollReveal>
          <h2 className="font-heading font-bold text-4xl md:text-5xl text-gray-800 mb-12 text-center">
            Featured Projects
          </h2>
        </ScrollReveal>

        <m.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {projects.map((project, index) => (
            <m.div key={project.id} variants={cardVariants}>
              <ProjectCard project={project} colorIndex={index} />
            </m.div>
          ))}
        </m.div>
      </div>
    </section>
  );
}

interface ProjectCardProps {
  project: (typeof projects)[0];
  colorIndex: number;
}

function ProjectCard({ project, colorIndex }: ProjectCardProps) {
  const iconBgColor = pastelColors[colorIndex % pastelColors.length];
  const categoryIcon = categoryIcons[project.category] || "📱";

  return (
    <Card hover={false} className="flex flex-col h-full">
      {/* Header with icon and badge */}
      <div className="flex items-start justify-between mb-4">
        <div
          className={`w-12 h-12 rounded-xl ${iconBgColor} flex items-center justify-center text-2xl`}
        >
          {categoryIcon}
        </div>
        <Badge variant="lime">{project.category}</Badge>
      </div>

      {/* Title & Description */}
      <h3 className="font-heading font-bold text-xl text-gray-800 mb-2">
        {project.title}
      </h3>
      <p className="text-gray-600 mb-4 flex-grow">{project.description}</p>

      {/* Tech Tags */}
      <div className="flex flex-wrap gap-2 mb-4">
        {project.technologies.map((tech) => (
          <span
            key={tech}
            className="inline-block px-3 py-1 bg-gray-100 text-gray-700 text-xs font-medium rounded-lg"
          >
            {tech}
          </span>
        ))}
      </div>

      {/* Stat */}
      {project.stat && (
        <div className="text-sm text-gray-500 pt-4 border-t border-gray-200">
          <span className="text-green-500 font-bold">{project.stat.value}</span>{" "}
          {project.stat.label}
        </div>
      )}

      {/* Action Buttons */}
      {project.appStoreUrl && (
        <div className="flex gap-2 mt-4">
          <a
            href={project.appStoreUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button variant="primary" size="sm">
              App Store
            </Button>
          </a>
        </div>
      )}
    </Card>
  );
}
