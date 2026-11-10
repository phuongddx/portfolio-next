"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { ScrollReveal } from "@/components/effects/scroll-reveal";
import {
  buildCommits,
  reviewCatches,
  workflowSectionCopy,
  workflowSteps,
} from "@/components/data/ai-resume-data";

// The fragment shows what the stage left behind: plain output, the build commits, or the review catches.
function StageOutput({ output }: { output: string }) {
  if (output === "catches") {
    return (
      <ul className="space-y-3">
        {reviewCatches.map((c) => (
          <li key={c.title}>
            <p>{c.title}</p>
            <p className="text-[14px] text-[var(--ui-soft)]">{c.detail}</p>
          </li>
        ))}
      </ul>
    );
  }
  const text =
    output === "commits"
      ? buildCommits
          .filter((c) => c.build)
          .map((c) => `${c.hash} ${c.subject}`)
          .join("\n")
      : output;
  return (
    <pre>
      <code>{text}</code>
    </pre>
  );
}

export function AIWorkflowSection() {
  const [at, setAt] = useState(0);
  const step = workflowSteps[at];
  const last = workflowSteps.length - 1;

  return (
    <section
      id="ai-workflow"
      aria-labelledby="ai-workflow-title"
      className="mx-[var(--gutter)] mt-section"
    >
      <div className="px-[var(--pad)] pb-12">
        <ScrollReveal>
          <h2 id="ai-workflow-title" className="text-head">
            {workflowSectionCopy.heading}
          </h2>
        </ScrollReveal>
        <ScrollReveal as="p" delay={0.08} className="mt-5 max-w-measure">
          {workflowSectionCopy.subtitle}
        </ScrollReveal>
      </div>

      <ScrollReveal delay={0.12} className="grid min-[901px]:min-h-[64svh] min-[901px]:grid-cols-2">
        <div className="flex flex-col bg-field-3 px-[var(--pad)] py-[var(--pad)] max-[900px]:order-2">
          <div key={step.label} className="crossfade-enter">
            <h3 className="text-display" aria-live="polite">
              {step.clause}
            </h3>
            <p className="mt-6 max-w-measure">{step.desc}</p>
            <p className="mt-4 max-w-measure">
              <span className="font-semibold">Gate:</span> {step.gate}
            </p>
          </div>
        </div>

        <div className="flex items-center justify-center bg-field-4 px-[var(--pad)] py-[var(--pad)] max-[900px]:order-1 max-[900px]:min-h-[46svh]">
          <div data-ui="" key={step.label} className="crossfade-enter overflow-hidden">
            <div className="bg-[var(--ui-raised)] px-5 py-3 text-[14px] text-[var(--ui-soft)]">{step.artifact}</div>
            <div className="px-5 py-5">
              <StageOutput output={step.output} />
            </div>
            <div className="px-5 pb-5">
              <a
                href={step.evidence.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[14px] text-[var(--ui-ok)] underline underline-offset-4"
              >
                {step.evidence.label}
                <span className="sr-only"> {workflowSectionCopy.newTabLabel}</span>
              </a>
            </div>
          </div>
        </div>
      </ScrollReveal>

      <div className="bg-paper px-[var(--pad)] pb-8 pt-6">
        <div className="range-wrap">
          <div className="range-track" />
          <div className="range-fill" style={{ width: `${(at / last) * 100}%` }} />
          <input
            type="range"
            min={0}
            max={last}
            step={1}
            value={at}
            onChange={(e) => setAt(Number(e.target.value))}
            aria-label="Stage of the build"
            aria-valuetext={step.label}
            className="stage-range"
          />
        </div>
        <ul className="mt-3 grid grid-cols-2 gap-x-6 gap-y-1 text-body sm:grid-cols-3 min-[901px]:grid-cols-6">
          {workflowSteps.map((s, i) => (
            <li key={s.label}>
              <button
                type="button"
                onClick={() => setAt(i)}
                aria-pressed={i === at}
                className={cn(
                  "min-h-[44px] cursor-pointer text-left transition-colors duration-150",
                  i === at ? "text-ink" : "text-soft hover:text-ink",
                )}
              >
                {s.label}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
