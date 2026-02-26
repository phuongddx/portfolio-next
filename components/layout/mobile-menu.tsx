"use client";

import { m } from "framer-motion";
import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

const navLinks = [
  { href: "#about", label: "About" },
  { href: "#experience", label: "Experience" },
  { href: "#projects", label: "Projects" },
  { href: "#skills", label: "Skills" },
];

interface MobileMenuProps {
  onClose: () => void;
}

export function MobileMenu({ onClose }: MobileMenuProps) {
  const menuRef = useRef<HTMLDivElement>(null);

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
      ref={menuRef}
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.2 }}
      className={cn(
        "fixed top-24 left-1/2 -translate-x-1/2 z-40 md:hidden",
        "w-[95%] max-w-5xl",
        "bg-white border-2 border-gray-800 rounded-[20px]",
        "shadow-brutal overflow-hidden"
      )}
    >
      <ul className="flex flex-col gap-2 p-6">
        {navLinks.map((link, index) => (
          <m.li
            key={link.href}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.05 }}
          >
            <a
              href={link.href}
              onClick={onClose}
              className="block text-gray-800 hover:text-green-600 font-medium py-3 px-4 rounded-xl hover:bg-gray-50 transition-colors border-2 border-transparent hover:border-gray-200"
            >
              {link.label}
            </a>
          </m.li>
        ))}
        <m.li
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: navLinks.length * 0.05 }}
          className="mt-4"
        >
          <a
            href="#contact"
            onClick={onClose}
            className="block w-full text-center font-medium rounded-xl px-6 py-3 text-base bg-green-500 text-white hover:bg-green-600 transition-colors"
          >
            Contact
          </a>
        </m.li>
      </ul>
    </m.div>
  );
}
