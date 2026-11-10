"use client";

import { AnimatePresence } from "framer-motion";
import { useState } from "react";
import { useMode } from "@/components/context/mode-context";
import { ModeToggle } from "./mode-toggle";
import { NAV_LINKS_BY_MODE } from "./nav-links";
import { MobileMenu } from "./mobile-menu";

// A plain bar: name, four links, the reading switch, the CV.
export function Navbar() {
  const [open, setOpen] = useState(false);
  const { mode } = useMode();
  const links = NAV_LINKS_BY_MODE[mode];

  return (
    <header className="sticky top-0 z-50 bg-ground">
      <nav
        aria-label="Main"
        className="flex h-16 items-center justify-between gap-6 px-[calc(var(--gutter)+var(--pad))]"
      >
        <a href="#main-content" className="whitespace-nowrap text-body font-semibold no-underline">
          Doan Duy Phuong
        </a>

        <ul className="hidden items-center gap-7 text-body min-[1000px]:flex">
          {links.map((l) => (
            <li key={l.href}>
              <a className="text-link no-underline hover:underline" href={l.href}>
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-5">
          <ModeToggle />
          <a
            className="text-link hidden whitespace-nowrap text-body min-[1000px]:inline"
            href="/DoanPhuong.pdf"
            download="DoanPhuong.pdf"
          >
            Download CV
          </a>
          <button
            type="button"
            onClick={() => setOpen((o) => !o)}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="mobile-menu"
            className="flex h-11 w-11 cursor-pointer items-center justify-center bg-surface transition-transform active:scale-95 min-[1000px]:hidden"
          >
            <svg aria-hidden="true" width="22" height="22" viewBox="0 0 22 22" fill="none">
              {open ? (
                <path d="M5 5l12 12M17 5 5 17" stroke="currentColor" strokeWidth="2" />
              ) : (
                <path d="M3 6h16M3 11h16M3 16h16" stroke="currentColor" strokeWidth="2" />
              )}
            </svg>
          </button>
        </div>
      </nav>

      <AnimatePresence>{open && <MobileMenu onClose={() => setOpen(false)} />}</AnimatePresence>
    </header>
  );
}
