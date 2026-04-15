"use client";

import { m, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { MobileMenu } from "./mobile-menu";
import { ModeToggle } from "./mode-toggle";
import { useMode } from "@/components/context/mode-context";
import { NAV_LINKS_BY_MODE } from "./nav-links";

export function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { mode } = useMode();

  const navLinks = NAV_LINKS_BY_MODE[mode];

  return (
    <>
      <m.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className="fixed top-4 inset-x-0 mx-auto z-50 w-[95%] max-w-5xl"
      >
        <nav
          className={cn(
            "bg-white border-2 border-gray-800 rounded-[20px]",
            "px-6 py-3 shadow-navbar",
            "flex items-center justify-between"
          )}
        >
          {/* Logo */}
          <a href="#hero" className="flex items-center gap-2 group">
            <div className="w-10 h-10 bg-green-500 rounded-lg flex items-center justify-center border-2 border-gray-800 shadow-brutal-sm group-hover:shadow-brutal group-hover:translate-x-0.5 group-hover:translate-y-0.5 transition-all">
              <span className="text-white font-bold text-lg">DP</span>
            </div>
            <span className="font-bold text-gray-800 hidden sm:block font-heading">
              Doan Phuong
            </span>
          </a>

          {/* Desktop Nav + Toggle */}
          <div className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-gray-600 hover:text-gray-900 font-medium transition-colors relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-green-500 after:transition-all hover:after:w-full"
              >
                {link.label}
              </a>
            ))}
            <ModeToggle />
          </div>

          {/* CTAs */}
          <div className="hidden md:flex items-center gap-3">
            <a href="/DoanPhuong.pdf" download="DoanPhuong.pdf">
              <Button variant="secondary" size="sm">
                Resume
              </Button>
            </a>
            <a href="#contact">
              <Button variant="primary" size="sm">
                Contact
              </Button>
            </a>
          </div>

          {/* Mobile Toggle */}
          <div className="flex md:hidden items-center gap-2">
            <ModeToggle />
            <button
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors border-2 border-gray-800"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle menu"
              aria-expanded={isMobileMenuOpen}
            >
              <svg
                className="w-6 h-6 text-gray-800"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d={isMobileMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
                />
              </svg>
            </button>
          </div>
        </nav>
      </m.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <MobileMenu onClose={() => setIsMobileMenuOpen(false)} />
        )}
      </AnimatePresence>
    </>
  );
}
