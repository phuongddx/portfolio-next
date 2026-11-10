"use client";

import { Ledger, type LedgerRow } from "@/components/ui/ledger";
import { aiProjects } from "@/components/data/ai-resume-data";

const rows: LedgerRow[] = aiProjects.map((p) => ({
  id: p.id,
  name: p.title,
  kind: p.kind,
  where: p.appStoreUrl
    ? { label: "App Store", href: p.appStoreUrl }
    : p.githubUrl
      ? { label: "GitHub", href: p.githubUrl }
      : undefined,
  description: p.description,
  details: p.highlights,
  tech: p.techStack,
}));

export function AIProjectsSection() {
  return <Ledger id="ai-projects" heading="Projects" rows={rows} stageKey="review" />;
}
