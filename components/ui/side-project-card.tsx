"use client";

import { GlassCard } from "./glass-card";
import type { SideProject } from "@/components/data/side-projects-data";

interface SideProjectCardProps {
  project: SideProject;
}

// GitHub icons as SVG components
function GitHubIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
    </svg>
  );
}

function StarIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 16 16" fill="currentColor">
      <path d="M8 .25a.75.75 0 0 1 .673.418l1.882 3.815 4.21.612a.75.75 0 0 1 .416 1.279l-3.046 2.97.719 4.192a.75.75 0 0 1-1.088.791L8 12.347l-3.766 1.98a.75.75 0 0 1-1.088-.79l.72-4.194L.818 6.374a.75.75 0 0 1 .416-1.28l4.21-.611L7.327.668A.75.75 0 0 1 8 .25Z" />
    </svg>
  );
}

function ForkIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 16 16" fill="currentColor">
      <path d="M5 5.372v.878c0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75v-.878a2.25 2.25 0 1 1 1.5 0v.878a2.25 2.25 0 0 1-2.25 2.25h-1.5v2.128a2.251 2.251 0 1 1-1.5 0V8.5h-1.5A2.25 2.25 0 0 1 3.5 6.25v-.878a2.25 2.25 0 1 1 1.5 0ZM5 3.25a.75.75 0 1 0-1.5 0 .75.75 0 0 0 1.5 0Zm6.75-.75a.75.75 0 1 0 0 1.5.75.75 0 0 0 0-1.5ZM8 12.25a.75.75 0 1 0-1.5 0 .75.75 0 0 0 1.5 0Z" />
    </svg>
  );
}

const statusConfig = {
  production: { label: "Production Ready", color: "bg-green-500" },
  development: { label: "In Development", color: "bg-yellow-500" },
  archived: { label: "Archived", color: "bg-gray-500" },
};

export function SideProjectCard({ project }: SideProjectCardProps) {
  const status = statusConfig[project.status];

  return (
    <a
      href={project.githubUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="block h-full"
    >
      <GlassCard className="flex flex-col h-full cursor-pointer">
        {/* Header: GitHub Icon + Status */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2 text-secondary dark:text-gray-400">
            <GitHubIcon className="w-5 h-5" />
            <span className="font-mono text-sm">phuongddx/{project.title.toLowerCase().replace(/\s+/g, "-")}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className={`w-2 h-2 rounded-full ${status.color}`} />
            <span className="text-xs text-secondary dark:text-gray-500">{status.label}</span>
          </div>
        </div>

        {/* Title & Description */}
        <h3 className="font-heading font-bold text-xl text-primary dark:text-white mb-2">
          {project.title}
        </h3>
        <p className="text-secondary dark:text-gray-400 mb-4 flex-grow text-sm leading-relaxed">
          {project.description}
        </p>

        {/* Topics/Tags */}
        <div className="flex flex-wrap gap-2 mb-4">
          {project.topics.slice(0, 4).map((topic) => (
            <span
              key={topic}
              className="inline-block px-2.5 py-0.5 bg-primary/5 dark:bg-white/5 text-secondary dark:text-gray-400 text-xs font-medium rounded-full border border-primary/10 dark:border-white/10"
            >
              {topic}
            </span>
          ))}
        </div>

        {/* Footer: Language + Stats */}
        <div className="flex items-center justify-between pt-4 border-t border-white/20 dark:border-white/10">
          <div className="flex items-center gap-4">
            {/* Language */}
            <div className="flex items-center gap-1.5">
              <span
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: project.languageColor }}
              />
              <span className="text-xs text-secondary dark:text-gray-400">
                {project.language}
              </span>
            </div>
            {/* Stars */}
            <div className="flex items-center gap-1 text-secondary dark:text-gray-400">
              <StarIcon />
              <span className="text-xs">{project.stars}</span>
            </div>
            {/* Forks */}
            <div className="flex items-center gap-1 text-secondary dark:text-gray-400">
              <ForkIcon />
              <span className="text-xs">{project.forks}</span>
            </div>
          </div>
          {/* View on GitHub */}
          <span className="text-xs text-cta dark:text-blue-400 font-medium hover:underline">
            View on GitHub
          </span>
        </div>
      </GlassCard>
    </a>
  );
}
