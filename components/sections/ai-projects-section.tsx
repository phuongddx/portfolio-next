"use client";

import { Card } from "@/components/ui/card";
import { ScrollReveal } from "@/components/effects/scroll-reveal";
import { aiProjects } from "@/components/data/ai-resume-data";

/** GitHub mark SVG icon (24x24) */
function GitHubIcon() {
  return (
    <svg
      className="w-5 h-5"
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
    </svg>
  );
}

/** Single project card */
function ProjectCard({
  project,
  index,
}: {
  project: (typeof aiProjects)[0];
  index: number;
}) {
  return (
    <ScrollReveal delay={index * 0.1}>
      <Card hover={false} className="flex flex-col h-full">
        {/* Title row with GitHub link */}
        <div className="flex items-start justify-between mb-3">
          <h3 className="font-heading font-bold text-xl text-gray-800">
            {project.title}
          </h3>
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${project.title} on GitHub`}
            className="text-gray-800 hover:text-green-500 transition-colors mt-1 shrink-0 ml-3"
          >
            <GitHubIcon />
          </a>
        </div>

        {/* Description */}
        <p className="text-gray-600 mb-4 leading-relaxed">{project.description}</p>

        {/* Tech stack badges */}
        <div className="flex flex-wrap gap-2 mb-4">
          {project.techStack.map((tech) => (
            <span
              key={tech}
              className="bg-gray-100 text-gray-700 text-sm rounded-lg px-3 py-1 font-medium"
            >
              {tech}
            </span>
          ))}
        </div>

        {/* Highlight bullets */}
        <ul className="space-y-1.5 mb-6 flex-grow">
          {project.highlights.map((highlight) => (
            <li
              key={highlight}
              className="flex items-start gap-2 text-sm text-gray-700"
            >
              <span className="text-green-500 mt-0.5 shrink-0" aria-hidden="true">
                &#x2713;
              </span>
              {highlight}
            </li>
          ))}
        </ul>

        {/* View on GitHub button */}
        <a
          href={project.githubUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center gap-2 w-full bg-white text-gray-800 border-2 border-gray-800 rounded-xl px-6 py-3 font-medium text-sm hover:bg-gray-50 transition-colors cursor-pointer"
        >
          <GitHubIcon />
          View on GitHub
        </a>
      </Card>
    </ScrollReveal>
  );
}

/** AI Resume — Projects section with 2x2 card grid */
export function AIProjectsSection() {
  return (
    <section id="ai-projects" className="py-20 px-4 bg-white">
      <div className="max-w-6xl mx-auto">
        <ScrollReveal>
          <h2 className="font-heading font-bold text-4xl md:text-5xl text-gray-800 mb-12 text-center">
            Projects
          </h2>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {aiProjects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
