import { useEffect, useRef, useState } from "react";

/**
 * Typing animation hook that cycles through phrases character by character.
 * Uses requestAnimationFrame for smooth updates. Types forward, pauses,
 * then deletes before moving to the next phrase.
 */
export function useTypingAnimation(
  phrases: string[],
  charsPerTick = 2,
  pauseMs = 1500
): string {
  const [display, setDisplay] = useState("");
  const frameRef = useRef<number>(0);
  const pauseTimerRef = useRef<ReturnType<typeof setTimeout>>();
  const stateRef = useRef({ phraseIdx: 0, charIdx: 0, deleting: false });

  useEffect(() => {
    let lastTime = 0;
    const interval = 50; // ms between frames

    const tick = (time: number) => {
      if (time - lastTime < interval) {
        frameRef.current = requestAnimationFrame(tick);
        return;
      }
      lastTime = time;

      const s = stateRef.current;
      const phrase = phrases[s.phraseIdx];

      if (!s.deleting) {
        s.charIdx = Math.min(s.charIdx + charsPerTick, phrase.length);
        setDisplay(phrase.slice(0, s.charIdx));
        if (s.charIdx >= phrase.length) {
          pauseTimerRef.current = setTimeout(() => {
            s.deleting = true;
          }, pauseMs);
        }
      } else {
        s.charIdx = Math.max(s.charIdx - 1, 0);
        setDisplay(phrase.slice(0, s.charIdx));
        if (s.charIdx <= 0) {
          s.deleting = false;
          s.phraseIdx = (s.phraseIdx + 1) % phrases.length;
        }
      }

      frameRef.current = requestAnimationFrame(tick);
    };

    frameRef.current = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(frameRef.current);
      clearTimeout(pauseTimerRef.current);
    };
  }, [phrases, charsPerTick, pauseMs]);

  return display;
}
