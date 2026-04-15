import type { Mode } from "@/components/context/mode-context";

export const NAV_LINKS_BY_MODE: Record<Mode, { href: string; label: string }[]> = {
  ios: [
    { href: "#about", label: "About" },
    { href: "#experience", label: "Experience" },
    { href: "#projects", label: "Projects" },
    { href: "#skills", label: "Skills" },
  ],
  ai: [
    { href: "#ai-workflow", label: "Workflow" },
    { href: "#ai-skills", label: "Skills" },
    { href: "#ai-experience", label: "Experience" },
    { href: "#ai-projects", label: "Projects" },
  ],
};
