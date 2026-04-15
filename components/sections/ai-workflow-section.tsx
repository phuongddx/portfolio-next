"use client";

import { useEffect, useRef } from "react";
import { m } from "framer-motion";
import { ScrollReveal } from "@/components/effects/scroll-reveal";
import { terminalLines } from "@/components/data/ai-resume-data";
import { workflowSteps } from "@/components/data/ai-resume-data";
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
    case "cursor":
      return "text-green-400";
  }
}

/** Workflow steps displayed below the terminal. */

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
            My AI Development Workflow
          </h2>
          <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
            See how I use AI tools to ship production-ready code faster.
          </p>
        </ScrollReveal>

        {/* Terminal window */}
        <ScrollReveal delay={0.2}>
          <div className="overflow-x-auto">
            <div className="bg-[#1e1e1e] font-mono p-6 rounded-xl border-2 border-gray-700 shadow-card min-w-[320px]">
              {/* macOS title bar */}
              <div className="flex items-center gap-2 mb-4 pb-3 border-b border-gray-700">
                <span className="w-3 h-3 rounded-full" style={{ background: "#ff5f56" }} />
                <span className="w-3 h-3 rounded-full" style={{ background: "#ffbd2e" }} />
                <span className="w-3 h-3 rounded-full" style={{ background: "#27c93f" }} />
                <span className="ml-3 text-gray-500 text-sm">Claude Code Session</span>
              </div>

              {/* Terminal lines — one <div> per line, text revealed via rAF */}
              <div className="space-y-1 text-sm md:text-base">
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

        {/* Workflow steps */}
        <ScrollReveal delay={0.4}>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6 mt-12">
            {workflowSteps.map((step) => (
              <m.div
                key={step.num}
                className="bg-white border-2 border-gray-800 rounded-xl p-5 text-center shadow-card"
                whileHover={{ y: -4, transition: { duration: 0.2 } }}
              >
                <div className="w-10 h-10 bg-green-500 text-white rounded-full flex items-center justify-center font-bold text-lg mx-auto mb-3">
                  {step.num}
                </div>
                <h3 className="font-heading font-bold text-gray-800 text-lg">
                  {step.label}
                </h3>
                <p className="text-gray-500 text-sm mt-1">{step.desc}</p>
              </m.div>
            ))}
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
