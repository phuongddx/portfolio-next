"use client";

import { m } from "framer-motion";
import { ScrollReveal } from "@/components/effects/scroll-reveal";
import { ProjectCard } from "@/components/ui/project-card";
import { projects } from "@/components/data/projects-data";

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
    <section
      id="projects"
      className="py-20 px-4 bg-background dark:bg-gray-950"
    >
      <div className="max-w-6xl mx-auto">
        <ScrollReveal>
          <h2 className="font-heading font-bold text-4xl md:text-5xl text-primary dark:text-white mb-12 text-center">
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
          {projects.map((project) => (
            <m.div key={project.id} variants={cardVariants}>
              <ProjectCard project={project} />
            </m.div>
          ))}
        </m.div>
      </div>
    </section>
  );
}
