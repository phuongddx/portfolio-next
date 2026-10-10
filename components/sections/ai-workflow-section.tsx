"use client";

import { useEffect, useRef } from "react";
import { m } from "framer-motion";
import { ScrollReveal } from "@/components/effects/scroll-reveal";
import {
  reviewCatches,
  terminalLines,
  workflowSectionCopy,
  workflowSteps,
} from "@/components/data/ai-resume-data";
import type { TerminalLine } from "@/components/data/ai-resume-data";

/** Map line type to Tailwind text color class. */
function lineColor(type: TerminalLine["type"]): string {
  switch (type) {
    case "command":
      return "text-white";
    case "output":
      return "text-gray-400";
    case "success":
      return "text-green-400";
    case "error":
      return "text-red-400";
    case "cursor":
      return "text-green-400";
  }
}

export function AIWorkflowSection() {
  const lineRefs = useRef<(HTMLDivElement | null)[]>([]);
  const frameIds = useRef<number[]>([]);

  useEffect(() => {
    // Reset refs on mount
    lineRefs.current = lineRefs.current.slice(0, terminalLines.length);

    const timers: ReturnType<typeof setTimeout>[] = [];

    terminalLines.forEach((line, idx) => {
      // Show line container after delay
      const showTimer = setTimeout(() => {
        const el = lineRefs.current[idx];
        if (!el) return;
        el.style.visibility = "visible";

        // Type text character by character using textContent
        const text = line.text;
        let charPos = 0;

        const typeFrame = () => {
          charPos += 2; // 2 chars per frame for visible speed
          if (charPos > text.length) charPos = text.length;
          el.textContent = text.slice(0, charPos);

          if (charPos < text.length) {
            const fid = requestAnimationFrame(typeFrame);
            frameIds.current.push(fid);
          } else if (line.type === "cursor") {
            el.classList.add("animate-blink-cursor");
          }
        };

        if (text.length === 0) return;
        const fid = requestAnimationFrame(typeFrame);
        frameIds.current.push(fid);
      }, line.delay);

      timers.push(showTimer);
    });

    return () => {
      timers.forEach(clearTimeout);
      frameIds.current.forEach(cancelAnimationFrame);
      frameIds.current = [];
    };
  }, []);

  return (
    <section id="ai-workflow" className="px-4 py-20 bg-[#f8f9fa]">
      <div className="max-w-6xl mx-auto">
        {/* Section heading */}
        <ScrollReveal>
          <h2 className="text-3xl md:text-4xl font-bold font-heading text-gray-800 text-center mb-4">
            {workflowSectionCopy.heading}
          </h2>
          <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
            {workflowSectionCopy.subtitle}
          </p>
        </ScrollReveal>

        {/* Terminal window — replay of the case-study run */}
        <ScrollReveal delay={0.2}>
          <div className="overflow-x-auto">
            <div className="bg-[#1e1e1e] font-mono p-6 rounded-xl border-2 border-gray-700 shadow-card min-w-[320px]">
              {/* macOS title bar */}
              <div className="flex items-center gap-2 mb-4 pb-3 border-b border-gray-700">
                <span className="w-3 h-3 rounded-full" style={{ background: "#ff5f56" }} />
                <span className="w-3 h-3 rounded-full" style={{ background: "#ffbd2e" }} />
                <span className="w-3 h-3 rounded-full" style={{ background: "#27c93f" }} />
                <span className="ml-3 text-gray-500 text-sm">{workflowSectionCopy.terminalTitle}</span>
              </div>

              {/* Terminal lines — one <div> per line, text revealed via rAF */}
              <div className="space-y-1 text-sm md:text-base whitespace-pre-wrap">
                {terminalLines.map((line, idx) => (
                  <div
                    key={idx}
                    ref={(el) => { lineRefs.current[idx] = el; }}
                    className={`${lineColor(line.type)} ${line.type === "cursor" ? "inline-block" : ""}`}
                    style={{ visibility: "hidden", minHeight: line.type === "cursor" ? "1em" : undefined }}
                  />
                ))}
              </div>
            </div>
          </div>
        </ScrollReveal>

        {/* Stage cards — artifact, gate, and evidence link per stage */}
        <ScrollReveal delay={0.4}>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-12">
            {workflowSteps.map((step) => (
              <m.div
                key={step.num}
                className="flex flex-col bg-white border-2 border-gray-800 rounded-xl p-5 shadow-card"
                whileHover={{ y: -4, transition: { duration: 0.2 } }}
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 bg-green-500 text-white rounded-full flex items-center justify-center font-bold text-lg flex-shrink-0">
                    {step.num}
                  </div>
                  <h3 className="font-heading font-bold text-gray-800 text-lg">
                    {step.label}
                  </h3>
                </div>
                <p className="text-gray-600 text-sm">{step.desc}</p>
                <p className="mt-3 font-mono text-xs text-gray-700 bg-gray-100 rounded-md px-2 py-1 break-words">
                  {step.artifact}
                </p>
                <p className="mt-2 text-sm text-gray-800">
                  <span className="font-semibold">{workflowSectionCopy.gateLabel}</span> {step.gate}
                </p>
                <a
                  href={step.evidence.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-auto pt-3 text-sm font-semibold text-green-700 hover:underline break-words"
                >
                  {step.evidence.label}
                  <span aria-hidden="true"> {"↗"}</span>
                  <span className="sr-only"> {workflowSectionCopy.newTabLabel}</span>
                </a>
              </m.div>
            ))}
          </div>
        </ScrollReveal>

        {/* What review caught — findings from the whole-change review */}
        <ScrollReveal delay={0.2}>
          <div className="mt-12 bg-white border-2 border-gray-800 rounded-xl p-6 shadow-card">
            <h3 className="font-heading font-bold text-gray-800 text-xl mb-4">
              {workflowSectionCopy.catchesHeading}
            </h3>
            <ul className="divide-y divide-gray-200">
              {reviewCatches.map((item) => (
                <li
                  key={item.title}
                  className="py-3 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 sm:gap-4"
                >
                  <div>
                    <p className="font-semibold text-gray-800">
                      <span className="text-red-500" aria-hidden="true">{"✗"} </span>
                      {item.title}
                    </p>
                    <p className="text-sm text-gray-500">{item.detail}</p>
                  </div>
                  <a
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-shrink-0 text-sm font-semibold text-green-700 hover:underline"
                  >
                    {workflowSectionCopy.fixLabel}
                    <span aria-hidden="true"> {"↗"}</span>
                    <span className="sr-only"> for {item.title} {workflowSectionCopy.newTabLabel}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
