# Phase 2: Core Components - Card, Button, Badge

**Priority**: P1 | **Effort**: 1.5h | **Status**: Complete

## Overview

Redesign core UI components to use neo-brutalist style: white backgrounds, bold borders, green accents.

## Dependencies

- Phase 1 (Foundation) must be complete

## Files to Modify

| File | Action | Description |
|------|--------|-------------|
| `components/ui/glass-card.tsx` | Rename → `card.tsx` | Remove glass, add border |
| `components/ui/button.tsx` | Modify | New variants |
| `components/ui/badge.tsx` | Modify | Circular, colored |
| `components/ui/stat-badge.tsx` | Create | Inline stats display |
| `components/ui/index.ts` | Modify | Update exports |

## Implementation Steps

### 1. Rename glass-card.tsx → card.tsx

**New file**: `components/ui/card.tsx`

```tsx
"use client";

import { m } from "framer-motion";
import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface CardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
}

export function Card({
  children,
  className = "",
  hover = true,
}: CardProps) {
  return (
    <m.div
      className={cn(
        "bg-white border-2 border-gray-800 rounded-xl p-6",
        "shadow-card",
        hover && "hover:shadow-hover transition-shadow duration-200",
        className
      )}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      {children}
    </m.div>
  );
}
```

### 2. Update button.tsx

**File**: `components/ui/button.tsx`

```tsx
"use client";

import { m } from "framer-motion";
import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface ButtonProps {
  children: ReactNode;
  className?: string;
  variant?: "primary" | "secondary" | "outline";
  size?: "sm" | "md" | "lg";
  onClick?: () => void;
}

export function Button({
  children,
  className = "",
  variant = "primary",
  size = "md",
  onClick,
}: ButtonProps) {
  const baseStyles = "font-medium rounded-xl transition-all duration-200";

  const variants = {
    primary: "bg-green-500 text-white hover:bg-green-600",
    secondary: "bg-white text-gray-800 border-2 border-gray-800 hover:bg-gray-50",
    outline: "bg-transparent text-gray-800 border-2 border-gray-800 hover:bg-white",
  };

  const sizes = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-3 text-base",
    lg: "px-8 py-4 text-lg",
  };

  return (
    <m.button
      className={cn(baseStyles, variants[variant], sizes[size], className)}
      onClick={onClick}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      {children}
    </m.button>
  );
}
```

### 3. Update badge.tsx

**File**: `components/ui/badge.tsx`

```tsx
import { cn } from "@/lib/utils";

interface BadgeProps {
  children: ReactNode;
  className?: string;
  variant?: "lime" | "green" | "pink" | "blue" | "purple";
}

export function Badge({
  children,
  className = "",
  variant = "lime",
}: BadgeProps) {
  const variants = {
    lime: "bg-lime-400 text-gray-800",
    green: "bg-green-500 text-white",
    pink: "bg-pink-200 text-gray-800",
    blue: "bg-blue-200 text-gray-800",
    purple: "bg-purple-200 text-gray-800",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center px-3 py-1 rounded-full text-sm font-medium",
        variants[variant],
        className
      )}
    >
      {children}
    </span>
  );
}
```

### 4. Create stat-badge.tsx

**File**: `components/ui/stat-badge.tsx`

```tsx
import { cn } from "@/lib/utils";

interface StatBadgeProps {
  icon: ReactNode;
  value: string;
  label: string;
  className?: string;
}

export function StatBadge({
  icon,
  value,
  label,
  className = "",
}: StatBadgeProps) {
  return (
    <div className={cn("flex items-center gap-3", className)}>
      <div className="w-12 h-12 rounded-lg bg-gray-100 flex items-center justify-center text-gray-600">
        {icon}
      </div>
      <div>
        <div className="text-xl font-bold text-gray-800">{value}</div>
        <div className="text-sm text-gray-500">{label}</div>
      </div>
    </div>
  );
}
```

### 5. Create rating-badge.tsx

**File**: `components/ui/rating-badge.tsx`

```tsx
import { cn } from "@/lib/utils";

interface RatingBadgeProps {
  rating: number | string;
  className?: string;
}

export function RatingBadge({
  rating,
  className = "",
}: RatingBadgeProps) {
  return (
    <div
      className={cn(
        "w-10 h-10 rounded-full bg-green-500 text-white",
        "flex items-center justify-center font-bold text-sm",
        className
      )}
    >
      {rating}
    </div>
  );
}
```

### 6. Update index.ts exports

```tsx
// components/ui/index.ts
export { Card } from "./card";
export { Button } from "./button";
export { Badge } from "./badge";
export { StatBadge } from "./stat-badge";
export { RatingBadge } from "./rating-badge";
export { ProjectCard } from "./project-card";
export { SideProjectCard } from "./side-project-card";
export { SocialIcons } from "./social-icons";
```

## Todo Checklist

- [x] Rename `glass-card.tsx` to `card.tsx`
- [x] Update Card component with border style
- [x] Update Button with green primary variant
- [x] Update Badge with colored variants
- [x] Create StatBadge component
- [x] Create RatingBadge component
- [x] Update barrel exports
- [x] Update all imports from `glass-card` to `card`

## Success Criteria

- [x] Card has white bg + 2px border
- [x] Primary button is green
- [x] Secondary button is white with border
- [x] Badges use colored backgrounds
- [x] RatingBadge is circular green

## Next Steps

- Proceed to Phase 3 (Layout)
