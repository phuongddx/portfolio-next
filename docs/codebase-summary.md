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
│       ├── globals.css       # Global styles, CSS variables, print styles
│       ├── layout.tsx        # Root layout with providers (MotionProvider + ModeProvider)
│       └── page.tsx          # Homepage — renders ModeRouter (server component)
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
│   │   ├── social-link.tsx   # Reusable social link with hover animation
│   │   └── index.ts          # Barrel exports
│   ├── sections/             # Page sections
│   │   ├── hero-section.tsx          # iOS hero (name, title, CTAs)
│   │   ├── about-section.tsx         # iOS about
│   │   ├── experience-section.tsx    # iOS experience timeline
│   │   ├── skills-section.tsx        # iOS skills grid
│   │   ├── projects-section.tsx      # iOS projects
│   │   ├── side-projects-section.tsx # iOS side projects
│   │   ├── contact-section.tsx       # Shared contact form
│   │   ├── ai-hero-section.tsx       # AI hero with typing animation
│   │   ├── ai-workflow-section.tsx   # Terminal mockup with rAF typing
│   │   ├── ai-skills-section.tsx     # Animated skill bars (6 categories)
│   │   ├── ai-experience-section.tsx # Expandable cards with AI Impact
│   │   └── ai-projects-section.tsx   # Project cards with GitHub links
│   ├── context/              # React Context providers
│   │   └── mode-context.tsx  # iOS/AI mode state + useMode hook
│   ├── layout/               # Layout components
│   │   ├── navbar.tsx        # Fixed navbar with mode toggle
│   │   ├── mobile-menu.tsx   # Mobile navigation
│   │   ├── mode-toggle.tsx   # iOS/AI pill toggle
│   │   ├── mode-router.tsx   # Client wrapper for mode switching
│   │   ├── nav-links.ts      # Shared nav links by mode
│   │   ├── footer.tsx        # Site footer
│   │   └── page-transition.tsx
│   ├── effects/              # Animation system
│   │   ├── motion-provider.tsx   # LazyMotion + reduced motion
│   │   ├── animation-variants.ts # Reusable animation presets
│   │   └── scroll-reveal.tsx     # In-view animation wrapper
│   ├── hooks/                # Custom React hooks
│   │   └── use-typing-animation.ts # Character-by-character typing
│   └── data/                 # Static content data
│       ├── skills-data.ts
│       ├── projects-data.ts
│       ├── experience-data.ts
│       └── ai-resume-data.ts # AI mode data (skills, experience, projects, terminal)
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

| Section | Mode | Purpose |
|---------|------|---------|
| `HeroSection` | iOS | Name, title, CTAs, social links |
| `AboutSection` | iOS | Bio, stats, highlights |
| `ExperienceSection` | iOS | Work history timeline |
| `SkillsSection` | iOS | Skills by category grid |
| `ProjectsSection` | iOS | Project showcase cards |
| `SideProjectsSection` | iOS | GitHub-style side projects |
| `ContactSection` | Both | Contact form and info (shared) |
| `AIHeroSection` | AI | Hero with typing animation, badges, stats |
| `AIWorkflowSection` | AI | Terminal mockup with rAF-based typing |
| `AISkillsSection` | AI | Animated skill bars (6 categories) |
| `AIExperienceSection` | AI | Expandable cards with AI Impact badges |
| `AIProjectsSection` | AI | Project cards with GitHub links |

### Animation System (`components/effects/`)

| Component/Module | Purpose |
|------------------|---------|
| `MotionProvider` | LazyMotion wrapper with reduced motion support |
| `ScrollReveal` | Fade-in animation on scroll into view |
| `animation-variants.ts` | Reusable animation presets (fadeIn, stagger) |

## Data Layer

Static content separated into data files:

- `skills-data.ts` - iOS skill categories with arrays of skills
- `projects-data.ts` - Project objects with title, description, tech, stats
- `experience-data.ts` - iOS work experience with achievements
- `ai-resume-data.ts` - AI mode data: skills with proficiency levels, AI-impact experience, projects with GitHub URLs, terminal animation lines, hero data

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
- **Terminal typing** uses `requestAnimationFrame` for efficient line-by-line reveal (~11 DOM nodes)
- **Skill bars** animate via `whileInView` with `viewport={{ once: true }}`

### AI Mode Architecture

- **ModeRouter** (client component) conditionally renders iOS or AI sections
- **AI sections** loaded via `next/dynamic` with `ssr: false` — no iOS bundle bloat
- **AnimatePresence** cross-fade between modes (`mode="wait"`)
- **ModeContext** persists state in localStorage, syncs to URL params
- **ContactSection** shared across both modes

### State Management

- `ModeContext` (React Context) for iOS/AI mode switching
- Mode persists via localStorage + URL param `?mode=ai`
- Local state via `useState` for UI interactions
- Two-pass rendering: server renders iOS, client hydrates mode post-mount

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
