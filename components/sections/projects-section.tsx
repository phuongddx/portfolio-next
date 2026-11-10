"use client";

import { Ledger, type LedgerRow } from "@/components/ui/ledger";
import { projects, iosStageImages } from "@/components/data/projects-data";

const rows: LedgerRow[] = projects.map((p) => {
  const image = iosStageImages.find((img) => img.projectId === p.id);
  return {
    id: p.id,
    name: p.title,
    kind: p.category,
    where: p.appStoreUrl ? { label: "App Store", href: p.appStoreUrl } : undefined,
    description: p.stat ? `${p.description} ${p.stat.value} ${p.stat.label}.` : p.description,
    tech: p.technologies,
    image: image && { src: image.src, width: image.width, height: image.height, alt: image.alt },
  };
});

export function ProjectsSection() {
  return <Ledger id="projects" heading="Projects" rows={rows} stageKey="epost-2" />;
}
