# Phase 4: Sections - Hero, About, Experience, Skills, Projects, Contact

**Priority**: P1 | **Effort**: 2h | **Status**: Complete

## Overview

Redesign all page sections with neo-brutalist style. Hero gets two-column layout, cards use white + borders, stats use pastel icons.

## Dependencies

- Phase 1 (Foundation) must be complete
- Phase 2 (Core Components) must be complete
- Phase 3 (Layout) must be complete

## Files to Modify

| File | Action | Description |
|------|--------|-------------|
| `components/sections/hero-section.tsx` | Modify | Two-column layout |
| `components/sections/about-section.tsx` | Modify | Stats row |
| `components/sections/experience-section.tsx` | Modify | Card grid |
| `components/sections/skills-section.tsx` | Modify | Pastel icons |
| `components/sections/projects-section.tsx` | Modify | 2x2 grid + badges |
| `components/sections/side-projects-section.tsx` | Modify | Bordered cards |
| `components/sections/contact-section.tsx` | Modify | Bold CTA |

## Implementation Steps

### 1. Hero Section - Two-Column Layout

**File**: `components/sections/hero-section.tsx`

```tsx
"use client";

import { m } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { StatBadge } from "@/components/ui/stat-badge";

export function HeroSection() {
  return (
    <section className="min-h-screen flex items-center pt-24 pb-16 bg-[#f8f9fa]">
      <div className="max-w-6xl mx-auto px-4 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 items-center">

          {/* Left Column (40%) */}
          <div className="lg:col-span-2 space-y-6">
            {/* Badge */}
            <Badge variant="lime">
              🟢 Available for Work
            </Badge>

            {/* Headline */}
            <h1 className="text-4xl md:text-5xl font-bold text-gray-800 leading-tight">
              Full-Stack Developer
              <br />
              <span className="text-green-500">Building Modern Web Experiences</span>
            </h1>

            {/* Subheadline */}
            <p className="text-lg text-gray-600">
              I craft beautiful, performant applications with React, Next.js, and modern technologies.
            </p>

            {/* CTAs */}
            <div className="flex gap-4">
              <Button variant="primary">
                View Projects
              </Button>
              <Button variant="secondary">
                Contact Me
              </Button>
            </div>

            {/* Stats Row */}
            <div className="flex gap-6 pt-4">
              <StatBadge
                icon={<span>💼</span>}
                value="5+"
                label="Years XP"
              />
              <StatBadge
                icon={<span>🚀</span>}
                value="20+"
                label="Projects"
              />
              <StatBadge
                icon={<span>👥</span>}
                value="15+"
                label="Clients"
              />
            </div>
          </div>

          {/* Right Column (60%) - Featured Project */}
          <div className="lg:col-span-3">
            <Card className="p-8">
              <div className="flex items-start gap-4">
                <div className="w-16 h-16 bg-pink-200 rounded-xl flex items-center justify-center">
                  <span className="text-2xl">💻</span>
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-gray-800">
                    Featured Project
                  </h3>
                  <p className="text-gray-600 mt-1">
                    E-commerce Platform with AI Recommendations
                  </p>

                  {/* Stats */}
                  <div className="flex gap-4 mt-4 text-sm text-gray-500">
                    <span>Next.js</span>
                    <span>•</span>
                    <span>TypeScript</span>
                    <span>•</span>
                    <span>PostgreSQL</span>
                  </div>

                  {/* Progress */}
                  <div className="mt-6">
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-gray-500">Completion</span>
                      <span className="text-green-500 font-medium">100%</span>
                    </div>
                    <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div className="h-full bg-green-500 rounded-full" style={{ width: "100%" }} />
                    </div>
                  </div>

                  <Button variant="primary" className="mt-6 w-full">
                    View Project
                  </Button>
                </div>
              </div>
            </Card>
          </div>

        </div>
      </div>
    </section>
  );
}
```

### 2. About Section - Stats Row

**File**: `components/sections/about-section.tsx`

Key changes:
- Use Card instead of GlassCard
- Stats row with pastel icon backgrounds
- Remove dark: classes

```tsx
// Stats with pastel backgrounds
<div className="flex gap-6">
  {stats.map((stat, i) => (
    <div key={i} className="flex items-center gap-3">
      <div className={cn(
        "w-12 h-12 rounded-lg flex items-center justify-center",
        ["bg-pink-200", "bg-blue-200", "bg-purple-200"][i % 3]
      )}>
        {stat.icon}
      </div>
      <div>
        <div className="text-2xl font-bold text-gray-800">{stat.value}</div>
        <div className="text-sm text-gray-500">{stat.label}</div>
      </div>
    </div>
  ))}
</div>
```

### 3. Experience Section - Card Grid

**File**: `components/sections/experience-section.tsx`

Key changes:
- Use Card component
- Add rating badges for years
- Pastel icon backgrounds per company

### 4. Skills Section - Pastel Icons

**File**: `components/sections/skills-section.tsx`

Key changes:
- Each skill category gets pastel background
- Rotate: pink, blue, purple, green

```tsx
const accentColors = [
  "bg-pink-200",
  "bg-blue-200",
  "bg-purple-200",
  "bg-green-200",
];
```

### 5. Projects Section - 2x2 Grid with Badges

**File**: `components/sections/projects-section.tsx`

Key changes:
- Use 2x2 grid layout
- Add RatingBadge for featured projects
- Pastel icon backgrounds

```tsx
<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
  {projects.map((project, i) => (
    <Card key={i}>
      <div className="flex items-start gap-4">
        <div className={cn(
          "w-14 h-14 rounded-xl flex items-center justify-center",
          accentColors[i % 4]
        )}>
          {project.icon}
        </div>
        <div className="flex-1">
          <div className="flex justify-between items-start">
            <h3>{project.title}</h3>
            <RatingBadge rating="4.9" />
          </div>
          {/* ... */}
        </div>
      </div>
    </Card>
  ))}
</div>
```

### 6. Side Projects Section

**File**: `components/sections/side-projects-section.tsx`

Key changes:
- Compact bordered cards
- GitHub-style layout

### 7. Contact Section - Bold CTA

**File**: `components/sections/contact-section.tsx`

Key changes:
- Large green CTA button
- Clean card layout
- Remove glass effects

```tsx
<section className="py-20 bg-[#f8f9fa]">
  <div className="max-w-4xl mx-auto px-4 text-center">
    <h2 className="text-3xl font-bold text-gray-800 mb-4">
      Let's Work Together
    </h2>
    <p className="text-gray-600 mb-8">
      I'm currently available for freelance projects.
    </p>
    <Button variant="primary" size="lg">
      Get In Touch
    </Button>
  </div>
</section>
```

## Todo Checklist

- [x] Hero: Two-column layout with featured card
- [x] Hero: Stats row with pastel icons
- [x] About: Update card styles
- [x] Experience: Card grid with badges
- [x] Skills: Pastel icon backgrounds
- [x] Projects: 2x2 grid with rating badges
- [x] Side Projects: Compact bordered cards
- [x] Contact: Bold CTA section
- [x] Remove all `dark:` classes from all sections
- [x] Update all GlassCard imports to Card

## Success Criteria

- [x] Hero has 40/60 two-column layout
- [x] Featured project card visible on hero
- [x] Stats use pastel icon backgrounds
- [x] All cards white with dark borders
- [x] Rating badges are circular green
- [x] No glassmorphism effects remaining

## Next Steps

- Proceed to Phase 5 (Polish)
