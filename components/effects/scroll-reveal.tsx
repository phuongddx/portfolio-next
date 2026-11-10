import type { CSSProperties, ElementType, ReactNode } from "react";

interface ScrollRevealProps {
  children: ReactNode;
  /** Delay in seconds, used to stagger the parts of a section. */
  delay?: number;
  className?: string;
  as?: ElementType;
}

// Marks a block for RevealObserver. Content stays visible without script and under reduced motion.
export function ScrollReveal({ children, delay = 0, className, as: Tag = "div" }: ScrollRevealProps) {
  return (
    <Tag data-reveal="" className={className} style={{ "--d": Math.round(delay * 1000) } as CSSProperties}>
      {children}
    </Tag>
  );
}
