# Codebase Summary

## Project Overview

Portfolio website for DOAN DUY PHUONG - iOS Software Engineer with 5+ years experience. Built with Next.js 14 App Router, TypeScript, Tailwind CSS, and Framer Motion.

## Tech Stack

| Category | Technology |
|----------|------------|
| Framework | Next.js 14.2.35 (App Router) |
| Language | TypeScript 5 (strict mode) |
| Styling | Tailwind CSS 3.4.1 |
| Animations | Framer Motion 11.18.2 (LazyMotion) |
| Theme | next-themes 0.4.6 |
| Utilities | clsx, tailwind-merge |

## Directory Structure

```
portfolio-next/
├── src/
│   └── app/
│       ├── globals.css       # Global styles, CSS variables, scrollbar
│       ├── layout.tsx        # Root layout with providers
│       └── page.tsx          # Homepage composing sections
├── components/
│   ├── ui/                   # Reusable UI primitives
│   │   ├── badge.tsx         # Badge component (3 variants)
│   │   ├── button.tsx        # Button with spring animations
│   │   ├── glass-card.tsx    # Glassmorphism card
│   │   ├── device-mockup.tsx # Device frame wrapper
│   │   ├── project-card.tsx  # Project display card
│   │   ├── social-icons.tsx  # SVG icon components
│   │   └── index.ts          # Barrel exports
│   ├── sections/             # Page sections
│   │   ├── hero-section.tsx
│   │   ├── about-section.tsx
│   │   ├── experience-section.tsx
│   │   ├── skills-section.tsx
│   │   ├── projects-section.tsx
│   │   └── contact-section.tsx
│   ├── layout/               # Layout components
│   │   ├── glass-navbar.tsx  # Fixed glass navbar
│   │   ├── mobile-menu.tsx   # Mobile navigation
│   │   ├── footer.tsx        # Site footer
│   │   └── page-transition.tsx
│   ├── effects/              # Animation system
│   │   ├── motion-provider.tsx   # LazyMotion + reduced motion
│   │   ├── animation-variants.ts # Reusable animation presets
│   │   └── scroll-reveal.tsx     # In-view animation wrapper
│   ├── theme/                # Theme management
│   │   ├── theme-provider.tsx    # next-themes wrapper
│   │   └── theme-toggle.tsx      # Dark/light toggle
│   └── data/                 # Static content data
│       ├── skills-data.ts
│       ├── projects-data.ts
│       └── experience-data.ts
├── lib/
│   └── utils.ts              # cn() helper (clsx + tailwind-merge)
├── public/                   # Static assets
│   └── screenshots/          # Project screenshots
├── tailwind.config.ts        # Tailwind configuration
├── tsconfig.json             # TypeScript configuration
└── next.config.mjs           # Next.js configuration
```

## Key Components

### UI Primitives (`components/ui/`)

| Component | Purpose | Variants |
|-----------|---------|----------|
| `Button` | Interactive button with spring animations | primary, secondary |
| `Badge` | Status/category label | default, cta, outline |
| `GlassCard` | Glassmorphism container with hover effects | - |

### Sections (`components/sections/`)

| Section | Purpose |
|---------|---------|
| `HeroSection` | Name, title, CTAs, social links |
| `AboutSection` | Bio, stats, highlights |
| `ExperienceSection` | Work history timeline |
| `SkillsSection` | Skills by category grid |
| `ProjectsSection` | Project showcase cards |
| `ContactSection` | Contact form and info |

### Animation System (`components/effects/`)

| Component/Module | Purpose |
|------------------|---------|
| `MotionProvider` | LazyMotion wrapper with reduced motion support |
| `ScrollReveal` | Fade-in animation on scroll into view |
| `animation-variants.ts` | Reusable animation presets (fadeIn, stagger, cardHover) |

## Data Layer

Static content separated into data files:

- `skills-data.ts` - Skill categories with arrays of skills
- `projects-data.ts` - Project objects with title, description, tech, stats
- `experience-data.ts` - Work experience with achievements

## Design System

### Colors

| Token | Light | Dark |
|-------|-------|------|
| primary | #18181B | white |
| secondary | #3F3F46 | gray-300 |
| cta | #2563EB | blue-500 |
| background | #FAFAFA | gray-900 |
| text | #09090B | white |

### Typography

| Font | Usage | Google Font |
|------|-------|-------------|
| heading | Headlines, titles | Space Grotesk |
| body | Body text | DM Sans |

### Glassmorphism

```css
/* Applied via Tailwind classes */
bg-white/70 dark:bg-gray-900/80
backdrop-blur-xl backdrop-saturate-180
border border-white/20 dark:border-white/10
```

## Architecture Patterns

### Component Organization

- **Barrel exports** via `index.ts` for clean imports
- **Composition** over inheritance
- **Client components** marked with `"use client"` only where needed

### Animation Architecture

- **LazyMotion** with `domAnimation` for bundle size optimization
- **Reduced motion** respected via `useReducedMotion()` hook
- **Animation variants** centralized in `animation-variants.ts`

### State Management

- Local state via `useState` for UI interactions
- Theme state via `next-themes` context
- No global state library needed (static content)

## Performance Optimizations

1. **LazyMotion** - Reduces Framer Motion bundle size
2. **Static generation** - No server-side rendering needed
3. **Font optimization** - Next.js font loading with CSS variables
4. **Image optimization** - Next.js Image component ready

## Accessibility Features

- Skip to content link
- ARIA labels on interactive elements
- Keyboard navigation support
- Focus visible states
- Reduced motion preference support
- Color contrast compliance

## Security Headers

Configured in `next.config.mjs`:

- X-Frame-Options: DENY
- X-Content-Type-Options: nosniff
- Referrer-Policy: strict-origin-when-cross-origin
- Permissions-Policy: camera=(), microphone=(), geolocation=()
