"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { cn } from "@/lib/utils";

export interface StageFrame {
  key: string;
  /** The project row that brings this frame forward on hover or focus. */
  projectId?: string;
  field: 1 | 2 | 3 | 4;
  caption: string;
  content: ReactNode;
}

interface StageState {
  pin: (projectId: string | null) => void;
}

const StageContext = createContext<StageState>({ pin: () => {} });

export function useStage() {
  return useContext(StageContext);
}

const HOLD_MS = 6000;

const FIELD_CLASS: Record<StageFrame["field"], string> = {
  1: "bg-field-1 text-ink",
  2: "bg-field-2 text-ink",
  3: "bg-field-3 text-ink",
  4: "bg-field-4 text-accent-ink",
};

interface SplitStageProps {
  frames: StageFrame[];
  label: string;
  children: ReactNode;
}

// Desktop: the reading column scrolls on the left while the stage stays put on the right.
// Phone: the stage comes first, then the column.
export function SplitStage({ frames, label, children }: SplitStageProps) {
  const [index, setIndex] = useState(0);
  const [pinned, setPinned] = useState<string | null>(null);

  const columnRef = useRef<HTMLDivElement>(null);
  const pinnedRef = useRef<string | null>(null);

  const findFrame = useCallback(
    (value: string) => {
      const byKey = frames.findIndex((f) => f.key === value);
      return byKey >= 0 ? byKey : frames.findIndex((f) => f.projectId === value);
    },
    [frames],
  );

  // Slow crossfade while the first screen is being looked at. Once the reader scrolls on,
  // the section in view chooses the frame and the cycle stops, so the stage stays on topic.
  useEffect(() => {
    if (pinned || frames.length < 2) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = window.setTimeout(() => {
      if (document.hidden || window.scrollY > window.innerHeight * 0.4) return;
      setIndex((i) => (i + 1) % frames.length);
    }, HOLD_MS);
    return () => window.clearTimeout(id);
  }, [index, pinned, frames.length]);

  // The part of the reading column in the middle of the screen chooses the frame.
  useEffect(() => {
    const root = columnRef.current;
    if (!root || !("IntersectionObserver" in window)) return;
    const io = new IntersectionObserver(
      (entries) => {
        if (pinnedRef.current) return;
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          const found = findFrame((entry.target as HTMLElement).dataset.stage ?? "");
          if (found >= 0) setIndex(found);
        }
      },
      { rootMargin: "-45% 0px -45% 0px" },
    );
    const watch = () => root.querySelectorAll("[data-stage]").forEach((el) => io.observe(el));
    watch();
    const mo = new MutationObserver(watch);
    mo.observe(root, { childList: true, subtree: true });
    return () => {
      io.disconnect();
      mo.disconnect();
    };
  }, [findFrame]);

  const pin = useCallback(
    (projectId: string | null) => {
      pinnedRef.current = projectId;
      setPinned(projectId);
      if (!projectId) return;
      const found = findFrame(projectId);
      if (found >= 0) setIndex(found);
    },
    [findFrame],
  );

  const value = useMemo(() => ({ pin }), [pin]);
  const active = frames[index];

  return (
    <StageContext.Provider value={value}>
      <div className="split">
        <div ref={columnRef} className="min-w-0">
          {children}
        </div>
        <figure className="stage m-0" aria-label={label}>
          {frames.map((frame, i) => (
            <div
              key={frame.key}
              className={cn("stage-frame", FIELD_CLASS[frame.field])}
              data-active={i === index}
              aria-hidden={i !== index}
            >
              <div className="flex min-h-0 w-full flex-1 items-center justify-center">{frame.content}</div>
            </div>
          ))}
          <figcaption
            className={cn(
              "absolute bottom-0 left-0 right-0 px-[clamp(24px,4vw,56px)] pb-6 text-small",
              active?.field === 4 ? "text-accent-ink" : "text-ink",
            )}
          >
            <span key={active?.key} className="crossfade-enter block max-w-[52ch]">
              {active?.caption}
            </span>
          </figcaption>
        </figure>
      </div>
    </StageContext.Provider>
  );
}
