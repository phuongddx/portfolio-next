"use client";

import { m } from "framer-motion";
import { useEffect, useRef } from "react";
import { useMode } from "@/components/context/mode-context";
import { NAV_LINKS_BY_MODE } from "./nav-links";

interface MobileMenuProps {
  onClose: () => void;
}

export function MobileMenu({ onClose }: MobileMenuProps) {
  const menuRef = useRef<HTMLDivElement>(null);
  const { mode } = useMode();
  const navLinks = NAV_LINKS_BY_MODE[mode];

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  // Focus trap
  useEffect(() => {
    if (menuRef.current) {
      const focusable = menuRef.current.querySelectorAll("a, button");
      if (focusable.length > 0) {
        (focusable[0] as HTMLElement).focus();
      }
    }
  }, []);

  return (
    <m.div
      id="mobile-menu"
      ref={menuRef}
      initial={{ opacity: 0, y: -12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -12 }}
      transition={{ duration: 0.2 }}
      className="absolute left-0 right-0 top-16 z-40 bg-paper px-[calc(var(--gutter)+var(--pad))] py-6 min-[1000px]:hidden"
    >
      <ul className="flex flex-col">
        {navLinks.map((link) => (
          <li key={link.href}>
            <a href={link.href} onClick={onClose} className="block py-3 text-head no-underline">
              {link.label}
            </a>
          </li>
        ))}
        <li>
          <a href="#contact" onClick={onClose} className="block py-3 text-head no-underline">
            Contact
          </a>
        </li>
        <li className="mt-4">
          <a className="text-link" href="/DoanPhuong.pdf" download="DoanPhuong.pdf" onClick={onClose}>
            Download CV
          </a>
        </li>
      </ul>
    </m.div>
  );
}
