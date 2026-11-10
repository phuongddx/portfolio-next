"use client";

import { useMode } from "@/components/context/mode-context";
import { ModeToggle } from "@/components/layout/mode-toggle";
import { CareerStripe } from "@/components/ui/career-stripe";
import { CONTACT } from "@/components/data/contact-data";

interface HeroCardProps {
  role: string;
  line: string;
  /** The stage frame shown while the card is in view. */
  stageKey: string;
}

// The printed card beside the stage: the career stripe, who and what, one action.
export function HeroCard({ role, line, stageKey }: HeroCardProps) {
  const { mode } = useMode();

  return (
    <section
      aria-labelledby="hero-title"
      data-stage={stageKey}
      className="relative z-10 flex min-h-[calc(100svh-88px)] flex-col bg-paper px-[var(--pad)] pb-[var(--pad)] pt-[var(--pad)] max-[900px]:-mt-6 max-[900px]:min-h-0"
    >
      <div className="flex flex-1 flex-col justify-center py-14 max-[900px]:pb-10 max-[900px]:pt-2">
        <h1
          id="hero-title"
          data-reveal=""
          style={{ "--d": 80 } as React.CSSProperties}
          className="text-display"
        >
          Doan Duy Phuong,
          <br />
          {role}
        </h1>
        <p
          data-reveal=""
          style={{ "--d": 160 } as React.CSSProperties}
          className="mt-8 max-w-[36ch] text-body"
        >
          {line}
        </p>

        <div data-reveal="" style={{ "--d": 240 } as React.CSSProperties} className="mt-8">
          <a className="btn" href={CONTACT.mailto}>
            Email me
          </a>
        </div>

        <div
          data-reveal=""
          style={{ "--d": 320 } as React.CSSProperties}
          className="mt-10 flex flex-wrap items-center gap-x-4 gap-y-3"
        >
          <span className="text-small text-soft" id="read-as">
            Read as
          </span>
          <ModeToggle variant="full" />
        </div>

      </div>

      <ul className="mb-8 flex flex-wrap gap-x-7 gap-y-2 text-body">
        <li>
          <a className="text-link" href="/DoanPhuong.pdf" download="DoanPhuong.pdf">
            Download CV
          </a>
        </li>
        <li>
          <a className="text-link" href={CONTACT.linkedin.href} target="_blank" rel="noopener noreferrer">
            LinkedIn
          </a>
        </li>
        <li>
          <a className="text-link" href={CONTACT.github.href} target="_blank" rel="noopener noreferrer">
            GitHub
          </a>
        </li>
      </ul>
      <div data-reveal="" style={{ "--d": 400 } as React.CSSProperties}>
        <CareerStripe mode={mode} />
      </div>
    </section>
  );
}
