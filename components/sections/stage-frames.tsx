import Image from "next/image";
import type { CSSProperties } from "react";
import type { StageFrame } from "@/components/layout/split-stage";
import { iosStageImages } from "@/components/data/projects-data";
import {
  aiStageFrames,
  buildCommits,
  jarvisSnippet,
  reviewCatches,
  terminalLines,
} from "@/components/data/ai-resume-data";

export const iosFrames: StageFrame[] = iosStageImages.map((img, i) => ({
  key: img.key,
  projectId: img.projectId,
  field: img.field,
  caption: img.caption,
  content: (
    <Image
      src={img.src}
      width={img.width}
      height={img.height}
      alt={img.alt}
      priority={i === 0}
      sizes="(max-width: 900px) 90vw, 45vw"
      className="h-auto max-h-full w-auto max-w-full object-contain"
    />
  ),
}));

function Panel({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div data-ui="" className="overflow-hidden">
      <div className="bg-[var(--ui-raised)] px-5 py-3 text-[14px] text-[var(--ui-soft)]">{title}</div>
      <div className="px-5 py-5">{children}</div>
    </div>
  );
}

const LINE_COLOUR: Record<string, string> = {
  command: "text-[var(--ui-ink)]",
  success: "text-[var(--ui-ok)]",
  error: "text-[var(--ui-bad)]",
  output: "text-[var(--ui-soft)]",
  cursor: "text-[var(--ui-ink)]",
};

// Terminal-style marks in plain ASCII: "ok" for a passed step, "!!" for findings.
function asciiMarks(text: string) {
  return text.replace(/^\u2713 /, "ok ").replace(/^\u2717 /, "!! ").replace(/\u2588/, "_");
}

const replay = (
  <Panel title="resume-content · session replay">
    <pre>
      <code>
        {terminalLines.map((line, i) => (
          <span
            key={i}
            className={`replay-line block ${LINE_COLOUR[line.type]}`}
            style={{ "--i": i } as CSSProperties}
          >
            {asciiMarks(line.text)}
          </span>
        ))}
      </code>
    </pre>
  </Panel>
);

const commits = (
  <Panel title="git log --oneline f19d974..f7d4237">
    <pre>
      <code>
        {[...buildCommits].reverse().map((c, i) => (
          <span key={c.hash} className="replay-line block" style={{ "--i": i } as CSSProperties}>
            <span className="text-[var(--ui-ok)]">{c.hash}</span> {c.subject}
          </span>
        ))}
      </code>
    </pre>
  </Panel>
);

const review = (
  <Panel title="review.md · whole-change review">
    <ul className="space-y-4">
      {reviewCatches.map((c, i) => (
        <li key={c.title} className="replay-line" style={{ "--i": i * 2 } as CSSProperties}>
          <p className="text-[var(--ui-ink)]">{c.title}</p>
          <p className="text-[14px] text-[var(--ui-soft)]">{c.detail}</p>
        </li>
      ))}
    </ul>
    <p className="mt-5 text-[14px] text-[var(--ui-ok)]">All four fixed in 4881249, then re-reviewed.</p>
  </Panel>
);

const jarvis = (
  <Panel title={jarvisSnippet.title}>
    <pre>
      <code>
        <span className="text-[var(--ui-soft)]">$ </span>
        {jarvisSnippet.command}
      </code>
    </pre>
    <ul className="mt-5 space-y-2">
      {jarvisSnippet.notes.map((n, i) => (
        <li key={n} className="replay-line text-[var(--ui-ink)]" style={{ "--i": i * 2 + 2 } as CSSProperties}>
          {n}
        </li>
      ))}
    </ul>
  </Panel>
);

const AI_CONTENT: Record<string, React.ReactNode> = { replay, commits, review, jarvis };
const AI_FIELD: Record<string, StageFrame["field"]> = { replay: 2, commits: 3, review: 2, jarvis: 3 };

export const aiFrames: StageFrame[] = aiStageFrames.map((f) => ({
  key: f.key,
  projectId: f.projectId,
  field: AI_FIELD[f.key] ?? 2,
  caption: f.caption,
  content: AI_CONTENT[f.key],
}));
