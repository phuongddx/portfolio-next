import { cn } from "@/lib/utils";
import type { Mode } from "@/components/context/mode-context";
import { careerTimeline, type TimelineSegment } from "@/components/data/experience-data";

function monthIndex(ym: string) {
  const [y, m] = ym.split("-").map(Number);
  return y * 12 + (m - 1);
}

const START = monthIndex(careerTimeline[0].from);
const END = monthIndex(careerTimeline[careerTimeline.length - 1].to) + 1;
const SPAN = END - START;
const YEARS = [2020, 2022, 2024, 2026];

function pct(ym: string) {
  return ((monthIndex(ym) - START) / SPAN) * 100;
}

function segmentClass(seg: TimelineSegment, i: number, mode: Mode) {
  const lit = seg.track === mode;
  if (lit) return seg.track === "ai" ? "bg-accent text-accent-ink" : i % 2 ? "bg-soft text-paper" : "bg-ink text-paper";
  return i % 2 ? "bg-surface text-ink" : "bg-field-1 text-ink";
}

// The six years as one striped band: each bar is a role, sized by its months.
// The reading in use is drawn in ink; the other is drawn in ground tones.
export function CareerStripe({ mode }: { mode: Mode }) {
  const summary = careerTimeline
    .map((s) => `${s.label === "AI" ? "Axon Active, AI platform" : s.label} ${s.from.slice(0, 4)}–${s.to.slice(0, 4)}`)
    .join("; ");

  return (
    <div className="w-full">
      <div className="relative h-14 w-full overflow-hidden" role="img" aria-label={`Career timeline: ${summary}`}>
        {careerTimeline.map((seg, i) => {
          const left = pct(seg.from);
          const width = ((monthIndex(seg.to) + 1 - monthIndex(seg.from)) / SPAN) * 100;
          return (
            <div
              key={seg.id}
              className={cn(
                "absolute top-0 flex h-full items-end overflow-hidden whitespace-nowrap px-1 pb-1.5 text-small transition-colors duration-500 sm:px-1.5",
                segmentClass(seg, i, mode),
              )}
              style={{ left: `${left}%`, width: `${width}%` }}
            >
              <span className="overflow-hidden text-clip">{seg.label}</span>
            </div>
          );
        })}
      </div>
      <div className="relative mt-2 h-5 text-small text-soft" aria-hidden="true">
        {YEARS.map((y) => (
          <span key={y} className="absolute top-0 tabular-nums" style={{ left: `${Math.max(0, pct(`${y}-01`))}%` }}>
            {y}
          </span>
        ))}
      </div>
    </div>
  );
}
