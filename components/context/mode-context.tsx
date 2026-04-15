"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

export type Mode = "ios" | "ai";

const ALLOWED_MODES: readonly Mode[] = ["ios", "ai"];
const STORAGE_KEY = "portfolio-mode";

const TITLES: Record<Mode, string> = {
  ios: "iOS Software Engineer | Doan Duy Phuong",
  ai: "AI-Driven Developer | Doan Duy Phuong",
};

function isValidMode(value: unknown): value is Mode {
  return typeof value === "string" && (ALLOWED_MODES as readonly string[]).includes(value);
}

interface ModeState {
  mode: Mode;
  setMode: (mode: Mode) => void;
  mounted: boolean;
}

const ModeContext = createContext<ModeState | null>(null);

export function useMode(): ModeState {
  const ctx = useContext(ModeContext);
  if (!ctx) throw new Error("useMode must be used within ModeProvider");
  return ctx;
}

interface ModeProviderProps {
  children: ReactNode;
}

export function ModeProvider({ children }: ModeProviderProps) {
  const [mode, setModeState] = useState<Mode>("ios");
  const [mounted, setMounted] = useState(false);

  // Hydrate from localStorage + URL param after mount
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const urlMode = params.get("mode");
    const stored = localStorage.getItem(STORAGE_KEY);

    // URL param takes precedence, validated against allowlist
    if (urlMode && isValidMode(urlMode)) {
      setModeState(urlMode);
    } else if (stored && isValidMode(stored)) {
      setModeState(stored);
    }

    setMounted(true);
  }, []);

  const setMode = useCallback((next: Mode) => {
    if (!isValidMode(next)) return;

    setModeState(next);
    localStorage.setItem(STORAGE_KEY, next);

    // Update URL without reload
    const url = new URL(window.location.href);
    if (next === "ios") {
      url.searchParams.delete("mode");
    } else {
      url.searchParams.set("mode", next);
    }
    window.history.replaceState({}, "", url.toString());

    // Update document title
    document.title = TITLES[next];
  }, []);

  return (
    <ModeContext.Provider value={{ mode, setMode, mounted }}>
      {children}
    </ModeContext.Provider>
  );
}
