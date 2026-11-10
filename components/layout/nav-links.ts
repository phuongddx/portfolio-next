import type { Mode } from "@/components/context/mode-context";

export const NAV_LINKS_BY_MODE: Record<Mode, { href: string; label: string }[]> = {
  ios: [
    { href: "#about", label: "About" },
    { href: "#projects", label: "Projects" },
    { href: "#experience", label: "Experience" },
    { href: "#skills", label: "Skills" },
  ],
  ai: [
    { href: "#ai-projects", label: "Projects" },
    { href: "#ai-workflow", label: "How I ship" },
    { href: "#ai-experience", label: "Experience" },
    { href: "#ai-skills", label: "Skills" },
  ],
};
