"use client";

import { m, AnimatePresence } from "framer-motion";
import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

interface NavLink {
  href: string;
  label: string;
}

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  links: NavLink[];
}

export function MobileMenu({ isOpen, onClose, links }: MobileMenuProps) {
  const menuRef = useRef<HTMLDivElement>(null);

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  // Focus trap
  useEffect(() => {
    if (isOpen && menuRef.current) {
      const focusable = menuRef.current.querySelectorAll("a, button");
      if (focusable.length > 0) {
        (focusable[0] as HTMLElement).focus();
      }
    }
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <m.div
          ref={menuRef}
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.2 }}
          className={cn(
            "fixed top-20 left-4 right-4 z-40 md:hidden",
            "bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl",
            "rounded-2xl border border-white/20 dark:border-white/10 shadow-lg",
            "overflow-hidden"
          )}
        >
          <ul className="flex flex-col gap-4 p-6">
            {links.map((link, index) => (
              <m.li
                key={link.href}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <a
                  href={link.href}
                  onClick={onClose}
                  className="block text-secondary dark:text-gray-300 hover:text-cta transition-colors font-medium py-2"
                >
                  {link.label}
                </a>
              </m.li>
            ))}
          </ul>
        </m.div>
      )}
    </AnimatePresence>
  );
}
