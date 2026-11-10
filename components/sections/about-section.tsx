"use client";

import { useMode } from "@/components/context/mode-context";
import { ScrollReveal } from "@/components/effects/scroll-reveal";
import { aboutParagraphs as PARAGRAPHS } from "@/components/data/experience-data";

export function AboutSection() {
  const { mode } = useMode();
  const order =
    mode === "ai"
      ? [PARAGRAPHS.platform, PARAGRAPHS.side, `${PARAGRAPHS.career} ${PARAGRAPHS.ios}`]
      : [PARAGRAPHS.career, PARAGRAPHS.ios, PARAGRAPHS.platform, PARAGRAPHS.side];

  return (
    <section
      id="about"
      aria-labelledby="about-title"
      data-stage={mode === "ai" ? "commits" : "windscribe-1"}
      className="px-[var(--pad)] pt-section"
    >
      <ScrollReveal>
        <h2 id="about-title" className="text-head">
          About
        </h2>
      </ScrollReveal>
      <div className="mt-8 max-w-measure space-y-5">
        {order.map((text, i) => (
          <ScrollReveal key={text} as="p" delay={0.08 * (i + 1)} className={i === 0 ? "font-semibold" : undefined}>
            {text}
          </ScrollReveal>
        ))}
      </div>
    </section>
  );
}
