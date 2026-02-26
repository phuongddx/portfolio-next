# Codebase Summary

## Project Overview

Portfolio website for DOAN DUY PHUONG - iOS Software Engineer with 5+ years experience. Built with Next.js 14 App Router, TypeScript, Tailwind CSS, and Framer Motion. Features a neo-brutalist design with bold colors and flat styling.

## Tech Stack

| Category | Technology |
|----------|------------|
| Framework | Next.js 14.2.35 (App Router) |
| Language | TypeScript 5 (strict mode) |
| Styling | Tailwind CSS 3.4.1 |
| Animations | Framer Motion 11.18.2 (LazyMotion) |
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
│   │   ├── badge.tsx         # Badge component (5 variants)
│   │   ├── button.tsx        # Button with spring animations
│   │   ├── card.tsx          # Neo-brutalist card
│   │   ├── device-mockup.tsx # Device frame wrapper
│   │   ├── project-card.tsx  # Project display card
│   │   ├── side-project-card.tsx # GitHub-style side project card
│   │   ├── stat-badge.tsx    # Stat with icon display
│   │   ├── rating-badge.tsx  # Circular rating display
│   │   ├── social-icons.tsx  # SVG icon components
│   │   └── index.ts          # Barrel exports
│   ├── sections/             # Page sections
│   │   ├── hero-section.tsx
│   │   ├── about-section.tsx
│   │   ├── experience-section.tsx
│   │   ├── skills-section.tsx
│   │   ├── projects-section.tsx
│   │   ├── side-projects-section.tsx
│   │   └── contact-section.tsx
│   ├── layout/               # Layout components
│   │   ├── navbar.tsx        # Fixed navbar
│   │   ├── mobile-menu.tsx   # Mobile navigation
│   │   ├── footer.tsx        # Site footer
│   │   └── page-transition.tsx
│   ├── effects/              # Animation system
│   │   ├── motion-provider.tsx   # LazyMotion + reduced motion
│   │   ├── animation-variants.ts # Reusable animation presets
│   │   └── scroll-reveal.tsx     # In-view animation wrapper
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
| `Button` | Interactive button with spring animations | primary, secondary, outline |
| `Badge` | Status/category label | lime, green, pink, blue, purple |
| `Card` | Neo-brutalist container with hover effects | - |
| `StatBadge` | Stat display with icon | - |
| `RatingBadge` | Circular rating display | - |
| `ProjectCard` | Project showcase card | - |
| `SideProjectCard` | GitHub-style project card | - |

### Sections (`components/sections/`)

| Section | Purpose |
|---------|---------|
| `HeroSection` | Name, title, CTAs, social links |
| `AboutSection` | Bio, stats, highlights |
| `ExperienceSection` | Work history timeline |
| `SkillsSection` | Skills by category grid |
| `ProjectsSection` | Project showcase cards |
| `SideProjectsSection` | GitHub-style side projects |
| `ContactSection` | Contact form and info |

### Animation System (`components/effects/`)

| Component/Module | Purpose |
|------------------|---------|
| `MotionProvider` | LazyMotion wrapper with reduced motion support |
| `ScrollReveal` | Fade-in animation on scroll into view |
| `animation-variants.ts` | Reusable animation presets (fadeIn, stagger) |

## Data Layer

Static content separated into data files:

- `skills-data.ts` - Skill categories with arrays of skills
- `projects-data.ts` - Project objects with title, description, tech, stats
- `experience-data.ts` - Work experience with achievements

## Design System

### Colors (Neo-Brutalist)

| Token | Value | Usage |
|-------|-------|-------|
| primary | `#22c55e` (green-500) | CTAs, highlights |
| secondary | `#6b7280` (gray-500) | Body text |
| background | `#f8f9fa` | Page background |
| foreground | `#1f2937` (gray-800) | Headings, borders |
| border | `#1f2937` (gray-800) | Card borders |
| card | `#ffffff` | Card backgrounds |

### Accent Colors

| Token | Value |
|-------|-------|
| accent-pink | `#fecaca` |
| accent-blue | `#93c5fd` |
| accent-purple | `#ddd6fe` |
| accent-green | `#bbf7d0` |
| accent-lime | `#a3e635` |
| accent-coral | `#f87171` |

### Typography

| Font | Usage | Google Font |
|------|-------|-------------|
| heading | Headlines, titles | Space Grotesk |
| body | Body text | DM Sans |

### Neo-Brutalist Card Style

```css
/* Applied via Tailwind classes */
bg-white border-2 border-gray-800 rounded-xl
shadow-card hover:shadow-hover
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
- No global state library needed (static content)
- No theme switching (single light mode)

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
