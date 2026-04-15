"use client";

import { m } from "framer-motion";
import { useCallback, useRef } from "react";
import { cn } from "@/lib/utils";
import { useMode, type Mode } from "@/components/context/mode-context";

const SEGMENTS: { value: Mode; label: string }[] = [
  { value: "ios", label: "iOS" },
  { value: "ai", label: "AI" },
];

const COOLDOWN_MS = 500;

export function ModeToggle() {
  const { mode, setMode } = useMode();
  const lastToggle = useRef(0);

  const handleToggle = useCallback(
    (next: Mode) => {
      if (next === mode) return;
      const now = Date.now();
      if (now - lastToggle.current < COOLDOWN_MS) return;
      lastToggle.current = now;
      setMode(next);
    },
    [mode, setMode],
  );

  return (
    <div
      role="radiogroup"
      aria-label="Portfolio mode"
      className="relative flex items-center bg-gray-100 rounded-full p-1 border-2 border-gray-200"
    >
      {SEGMENTS.map((seg) => (
        <button
          key={seg.value}
          role="radio"
          aria-checked={mode === seg.value}
          onClick={() => handleToggle(seg.value)}
          className={cn(
            "relative z-10 px-3 py-1 text-sm font-medium rounded-full transition-colors duration-200 cursor-pointer",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-500 focus-visible:ring-offset-1",
            mode === seg.value ? "text-white" : "text-gray-500 hover:text-gray-700",
          )}
        >
          {/* Active indicator slides between segments */}
          {mode === seg.value && (
            <m.div
              layoutId="mode-toggle-indicator"
              className="absolute inset-0 bg-green-500 rounded-full"
              transition={{ type: "spring", stiffness: 500, damping: 35 }}
            />
          )}
          <span className="relative z-10">{seg.label}</span>
        </button>
      ))}
    </div>
  );
}
