# Phase 3: Layout - Navbar & Footer

**Priority**: P1 | **Effort**: 1h | **Status**: Complete

## Overview

Redesign navbar to use contained rounded style with white background. Remove theme toggle and update footer.

## Dependencies

- Phase 1 (Foundation) must be complete
- Phase 2 (Core Components) recommended

## Files to Modify

| File | Action | Description |
|------|--------|-------------|
| `components/layout/glass-navbar.tsx` | Modify | New style, remove theme toggle |
| `components/layout/footer.tsx` | Modify | Update style |
| `components/theme/theme-toggle.tsx` | Delete | No longer needed |
| `src/app/layout.tsx` | Modify | Remove ThemeProvider import |

## Implementation Steps

### 1. Redesign Navbar

**File**: `components/layout/glass-navbar.tsx` → rename to `navbar.tsx`

```tsx
"use client";

import { useState } from "react";
import { m, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { MobileMenu } from "./mobile-menu";

const navLinks = [
  { href: "#about", label: "About" },
  { href: "#experience", label: "Experience" },
  { href: "#projects", label: "Projects" },
  { href: "#skills", label: "Skills" },
];

export function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <>
      <m.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[95%] max-w-5xl"
      >
        <nav
          className={cn(
            "bg-white border-2 border-gray-800 rounded-[20px]",
            "px-6 py-3 shadow-navbar",
            "flex items-center justify-between"
          )}
        >
          {/* Logo */}
          <a href="#" className="flex items-center gap-2">
            <div className="w-10 h-10 bg-green-500 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">DP</span>
            </div>
            <span className="font-bold text-gray-800 hidden sm:block">Doan Phuong</span>
          </a>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-gray-600 hover:text-gray-900 transition-colors"
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* CTA Button */}
          <div className="hidden md:block">
            <Button variant="primary" size="sm">
              Contact
            </Button>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden p-2"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
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
```

### 2. Update Mobile Menu

**File**: `components/layout/mobile-menu.tsx`

```tsx
"use client";

import { m } from "framer-motion";
import { Button } from "@/components/ui/button";

interface MobileMenuProps {
  onClose: () => void;
}

const navLinks = [
  { href: "#about", label: "About" },
  { href: "#experience", label: "Experience" },
  { href: "#projects", label: "Projects" },
  { href: "#skills", label: "Skills" },
];

export function MobileMenu({ onClose }: MobileMenuProps) {
  return (
    <m.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="fixed inset-x-4 top-20 z-40 md:hidden"
    >
      <div className="bg-white border-2 border-gray-800 rounded-xl p-4 shadow-lg">
        {navLinks.map((link) => (
          <a
            key={link.href}
            href={link.href}
            onClick={onClose}
            className="block py-3 text-gray-800 hover:text-green-500 transition-colors"
          >
            {link.label}
          </a>
        ))}
        <div className="pt-4 mt-4 border-t border-gray-200">
          <Button variant="primary" className="w-full">
            Contact
          </Button>
        </div>
      </div>
    </m.div>
  );
}
```

### 3. Update Footer

**File**: `components/layout/footer.tsx`

```tsx
import { SocialIcons } from "@/components/ui/social-icons";

export function Footer() {
  return (
    <footer className="bg-white border-t-2 border-gray-800 py-8">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-green-500 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">DP</span>
            </div>
            <span className="text-gray-600">© 2026 Doan Phuong</span>
          </div>

          <SocialIcons />

          <div className="flex gap-6 text-sm text-gray-500">
            <a href="#" className="hover:text-gray-800">Privacy</a>
            <a href="#" className="hover:text-gray-800">Terms</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
```

### 4. Update layout.tsx

Remove ThemeProvider:

```tsx
// Remove import
// import { ThemeProvider } from "@/components/theme/theme-provider";

// In return, remove wrapper:
// <ThemeProvider>...</ThemeProvider>
```

### 5. Delete Theme Files

```bash
rm components/theme/theme-toggle.tsx
# Keep theme-provider.tsx but simplify if needed
```

## Todo Checklist

- [x] Rename `glass-navbar.tsx` to `navbar.tsx`
- [x] Update navbar with white bg + border + rounded
- [x] Update mobile menu style
- [x] Update footer style
- [x] Remove theme toggle from navbar
- [x] Remove ThemeProvider from layout
- [x] Update all imports

## Success Criteria

- [x] Navbar is white with dark border
- [x] Navbar is contained in rounded wrapper
- [x] No theme toggle visible
- [x] Footer uses new style
- [x] Mobile menu works correctly

## Next Steps

- Proceed to Phase 4 (Sections)
