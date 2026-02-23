# Code Standards

## TypeScript Configuration

### Strict Mode (MANDATORY)

TypeScript strict mode is enabled in `tsconfig.json`:

```json
{
  "compilerOptions": {
    "strict": true,
    "noEmit": true,
    "esModuleInterop": true,
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve"
  }
}
```

### Path Aliases

```typescript
// tsconfig.json
"paths": {
  "@/*": ["./*"]
}

// Usage
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
```

## Component Organization Patterns

### Directory Structure

```
components/
├── ui/           # Reusable UI primitives
├── sections/     # Page-level sections
├── layout/       # Layout components (navbar, footer)
├── effects/      # Animation & motion components
├── theme/        # Theme-related components
└── data/         # Static data exports
```

### Component Template

```tsx
"use client"; // Only when client-side features needed

import { m } from "framer-motion";
import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface ComponentNameProps {
  children: ReactNode;
  className?: string;
  variant?: "primary" | "secondary";
}

export function ComponentName({
  children,
  className = "",
  variant = "primary",
}: ComponentNameProps) {
  return (
    <m.div
      className={cn("base-classes", className)}
      // Animation props
    >
      {children}
    </m.div>
  );
}
```

### Barrel Exports

Use `index.ts` for clean imports:

```typescript
// components/ui/index.ts
export { GlassCard } from "./glass-card";
export { Button } from "./button";
export { Badge } from "./badge";

// Usage elsewhere
import { GlassCard, Button, Badge } from "@/components/ui";
```

### Component Rules

1. **Single responsibility** - Each component does one thing
2. **Props interface** - Always define typed props at top of file
3. **Default values** - Provide sensible defaults for optional props
4. **Composition** - Use children for flexible composition
5. **cn() utility** - Always use for conditional class merging

## Framer Motion - LazyMotion Usage

### MotionProvider Setup (REQUIRED)

All animations must be wrapped in `MotionProvider` which uses `LazyMotion`:

```tsx
// components/effects/motion-provider.tsx
"use client";

import { LazyMotion, domAnimation, MotionConfig } from "framer-motion";
import { useReducedMotion } from "framer-motion";
import { ReactNode } from "react";

export function MotionProvider({ children }: { children: ReactNode }) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <LazyMotion features={domAnimation} strict>
      <MotionConfig reducedMotion={prefersReducedMotion ? "always" : "never"}>
        {children}
      </MotionConfig>
    </LazyMotion>
  );
}
```

### Animation Patterns

#### Use `m` instead of `motion`

When using LazyMotion with `strict` mode, always import `m`:

```tsx
// Correct
import { m } from "framer-motion";

// Wrong (will break with strict LazyMotion)
import { motion } from "framer-motion";
```

#### Centralized Animation Variants

Define reusable variants in `animation-variants.ts`:

```typescript
// components/effects/animation-variants.ts
export const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
};

export const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

export const springTransition = {
  type: "spring" as const,
  stiffness: 300,
  damping: 20,
};
```

#### Scroll-Triggered Animations

Use `ScrollReveal` for viewport-triggered animations:

```tsx
import { ScrollReveal } from "@/components/effects/scroll-reveal";

<ScrollReveal delay={0.2}>
  <YourComponent />
</ScrollReveal>
```

#### Reduced Motion Support

Always respect user preferences:

```tsx
// MotionProvider handles this globally
// Individual components can also check:
import { useReducedMotion } from "framer-motion";

const prefersReducedMotion = useReducedMotion();
```

## Styling Standards

### Tailwind CSS Patterns

```tsx
// Use cn() for conditional classes
<div className={cn(
  "base-class another-class",
  condition && "conditional-class",
  className
)} />
```

### Design Tokens

Use semantic color tokens, not raw values:

```tsx
// Correct
className="text-primary dark:text-white bg-background"

// Wrong
className="text-[#18181B] dark:text-white bg-[#FAFAFA]"
```

### Glassmorphism Pattern

```tsx
className={cn(
  "rounded-2xl p-6",
  "bg-white/70 dark:bg-gray-900/80",
  "backdrop-blur-xl backdrop-saturate-180",
  "border border-white/20 dark:border-white/10",
  "shadow-xl shadow-black/5 dark:shadow-black/20"
)}
```

## Client vs Server Components

### Use `"use client"` When:

- Using React hooks (useState, useEffect, useRef)
- Using Framer Motion components
- Using browser APIs (window, localStorage)
- Handling user events (onClick, onChange)

### Server Components (Default):

- Static content display
- Data fetching
- SEO-critical content

## File Naming

| Type | Convention | Example |
|------|------------|---------|
| Components | kebab-case | `glass-card.tsx` |
| Utilities | kebab-case | `animation-variants.ts` |
| Data files | kebab-case with `-data` suffix | `skills-data.ts` |
| Hooks | kebab-case with `use-` prefix | `use-scroll-lock.ts` |

## Import Order

```tsx
// 1. React/Next
import { ReactNode, useState } from "react";
import type { Metadata } from "next";

// 2. External libraries
import { m, useInView } from "framer-motion";

// 3. Internal components (alias imports)
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

// 4. Types
import type { Project } from "@/components/data/projects-data";
```

## Accessibility Standards

1. **ARIA labels** on interactive elements without visible text
2. **Focus states** visible for keyboard navigation
3. **Semantic HTML** - use proper heading hierarchy
4. **Skip links** for main content
5. **Reduced motion** - respect `prefers-reduced-motion`

## Error Handling

```tsx
// Graceful fallbacks
try {
  // Operation that might fail
} catch (error) {
  console.error("Context message:", error);
  // Fallback UI or behavior
}
```

## Performance Guidelines

1. **LazyMotion** - Required for all Framer Motion usage
2. **Dynamic imports** - For heavy components below fold
3. **Image optimization** - Use Next.js Image component
4. **Bundle size** - Keep components under 200 lines
