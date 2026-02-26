"use client";

import { Card } from "./card";
import { Badge } from "./badge";
import { Button } from "./button";
import type { Project } from "@/components/data/projects-data";

interface ProjectCardProps {
  project: Project;
}

export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <Card className="flex flex-col h-full">
      {/* Category Badge */}
      <Badge variant="lime" className="self-start mb-3">
        {project.category}
      </Badge>

      {/* Title & Description */}
      <h3 className="font-heading font-bold text-xl text-primary mb-2">
        {project.title}
      </h3>
      <p className="text-secondary mb-4 flex-grow">
        {project.description}
      </p>

      {/* Tech Tags */}
      <div className="flex flex-wrap gap-2 mb-4">
        {project.technologies.map((tech) => (
          <span
            key={tech}
            className="inline-block px-3 py-1 bg-primary/10 text-primary text-xs font-medium rounded-lg"
          >
            {tech}
          </span>
        ))}
      </div>

      {/* Stat */}
      {project.stat && (
        <div className="text-sm text-secondary pt-4 border-t border-white/20">
          <span className="text-cta font-bold">
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
            <Button variant="primary" size="md">
              App Store
            </Button>
          </a>
        </div>
      )}
    </Card>
  );
}
