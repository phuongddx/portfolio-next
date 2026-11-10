"use client";

import Image from "next/image";
import { ScrollReveal } from "@/components/effects/scroll-reveal";
import { useStage } from "@/components/layout/split-stage";

export interface LedgerRow {
  id: string;
  name: string;
  kind: string;
  where?: { label: string; href: string };
  description: string;
  details?: string[];
  tech?: string[];
  image?: { src: string; width: number; height: number; alt: string };
}

interface LedgerProps {
  id: string;
  heading: string;
  rows: LedgerRow[];
  /** Stage frame for the heading; each row then brings its own project's frame. */
  stageKey?: string;
}

// One row per project. Hovering or focusing a row brings its picture onto the stage.
export function Ledger({ id, heading, rows, stageKey }: LedgerProps) {
  const { pin } = useStage();

  return (
    <section id={id} aria-labelledby={`${id}-title`} className="px-[var(--pad)] pt-section">
      <ScrollReveal>
        <h2 id={`${id}-title`} className="text-head" data-stage={stageKey}>
          {heading}
        </h2>
      </ScrollReveal>
      <ul className="ledger mt-10 space-y-12" onMouseLeave={() => pin(null)}>
        {rows.map((row, i) => (
          <ScrollReveal
            as="li"
            key={row.id}
            delay={0.06 * i}
            className="ledger-row"
          >
            <div
              data-stage={row.id}
              onMouseEnter={() => pin(row.id)}
              onFocus={() => pin(row.id)}
              onBlur={() => pin(null)}
            >
              {row.image && (
                <div className="mb-5 aspect-[16/10] overflow-hidden bg-surface min-[901px]:hidden">
                  <Image
                    src={row.image.src}
                    width={row.image.width}
                    height={row.image.height}
                    alt={row.image.alt}
                    className={`h-full w-full ${row.image.width > row.image.height ? "object-contain" : "object-cover object-top"}`}
                    sizes="100vw"
                  />
                </div>
              )}
              <div className="grid grid-cols-[minmax(0,1fr)_auto] items-baseline gap-x-6 sm:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)_auto]">
                <h3 className="text-body font-semibold">{row.name}</h3>
                <p className="col-start-1 row-start-2 text-small text-soft sm:col-start-2 sm:row-start-1">{row.kind}</p>
                {row.where && (
                  <a
                    className="text-link col-start-2 row-start-1 text-small sm:col-start-3"
                    href={row.where.href}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {row.where.label}
                    <span className="sr-only"> (opens in new tab)</span>
                  </a>
                )}
              </div>
              <p className="mt-3 max-w-measure">{row.description}</p>
              {row.details && (
                <ul className="mt-3 max-w-measure space-y-2">
                  {row.details.map((d) => (
                    <li key={d}>{d}</li>
                  ))}
                </ul>
              )}
              {row.tech && <p className="mt-3 text-small text-soft">{row.tech.join(", ")}</p>}
            </div>
          </ScrollReveal>
        ))}
      </ul>
    </section>
  );
}
