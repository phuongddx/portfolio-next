"use client";

import { useCallback, useRef, type KeyboardEvent } from "react";
import { cn } from "@/lib/utils";
import { useMode, type Mode } from "@/components/context/mode-context";

const SEGMENTS: { value: Mode; label: string; short: string }[] = [
  { value: "ios", label: "iOS engineer", short: "iOS" },
  { value: "ai", label: "AI platform", short: "AI" },
];

const COOLDOWN_MS = 400;

interface ModeToggleProps {
  /** "compact" shows iOS / AI in the bar; "full" shows the long labels in the hero card. */
  variant?: "compact" | "full";
  className?: string;
}

export function ModeToggle({ variant = "compact", className }: ModeToggleProps) {
  const { mode, setMode } = useMode();
  const lastToggle = useRef(0);
  const refs = useRef<(HTMLButtonElement | null)[]>([]);

  const choose = useCallback(
    (next: Mode) => {
      if (next === mode) return;
      const now = Date.now();
      if (now - lastToggle.current < COOLDOWN_MS) return;
      lastToggle.current = now;
      setMode(next);
    },
    [mode, setMode],
  );

  const onKeyDown = (e: KeyboardEvent<HTMLButtonElement>, i: number) => {
    if (!["ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown"].includes(e.key)) return;
    e.preventDefault();
    const next = (i + 1) % SEGMENTS.length;
    refs.current[next]?.focus();
    choose(SEGMENTS[next].value);
  };

  return (
    <div
      role="radiogroup"
      aria-label="Read this resume as"
      className={cn("inline-flex bg-surface p-1", className)}
    >
      {SEGMENTS.map((seg, i) => {
        const on = mode === seg.value;
        return (
          <button
            key={seg.value}
            ref={(el) => {
              refs.current[i] = el;
            }}
            type="button"
            role="radio"
            aria-checked={on}
            tabIndex={on ? 0 : -1}
            onClick={() => choose(seg.value)}
            onKeyDown={(e) => onKeyDown(e, i)}
            className={cn(
              "cursor-pointer transition-[background-color,color,transform] duration-200 active:scale-[0.97]",
              variant === "full" ? "min-h-[48px] px-5 text-body" : "min-h-[40px] px-3 text-small",
              on ? "bg-ink text-paper" : "text-ink hover:bg-paper",
            )}
          >
            {variant === "full" ? seg.label : seg.short}
          </button>
        );
      })}
    </div>
  );
}
