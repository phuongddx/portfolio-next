"use client";

import { GlassCard } from "./glass-card";
import { Badge } from "./badge";
import { Button } from "./button";
import type { Project } from "@/components/data/projects-data";

interface ProjectCardProps {
  project: Project;
}

export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <GlassCard className="flex flex-col h-full">
      {/* Category Badge */}
      <Badge variant="default" className="self-start mb-3">
        {project.category}
      </Badge>

      {/* Title & Description */}
      <h3 className="font-heading font-bold text-xl text-primary dark:text-white mb-2">
        {project.title}
      </h3>
      <p className="text-secondary dark:text-gray-400 mb-4 flex-grow">
        {project.description}
      </p>

      {/* Tech Tags */}
      <div className="flex flex-wrap gap-2 mb-4">
        {project.technologies.map((tech) => (
          <span
            key={tech}
            className="inline-block px-3 py-1 bg-primary/10 dark:bg-white/10 text-primary dark:text-white text-xs font-medium rounded-lg"
          >
            {tech}
          </span>
        ))}
      </div>

      {/* Stat */}
      {project.stat && (
        <div className="text-sm text-secondary dark:text-gray-400 pt-4 border-t border-white/20 dark:border-white/10">
          <span className="text-cta dark:text-blue-400 font-bold">
            {project.stat.value}
          </span>{" "}
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
            <Button variant="primary" size="default">
              App Store
            </Button>
          </a>
        </div>
      )}
    </GlassCard>
  );
}
