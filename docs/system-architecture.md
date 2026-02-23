# System Architecture

## Overview

The portfolio project consists of two independent implementations sharing the same design system and content structure.

```
portfolio3/
├── index.html          # Static HTML version
├── styles.css          # Custom styles for static version
├── script.js           # Mobile menu toggle
└── portfolio-next/     # Next.js version
    ├── src/app/        # App Router pages
    ├── components/     # React components
    ├── lib/            # Utilities
    └── public/         # Static assets
```

## Technology Stack

### Static HTML Version

| Layer | Technology |
|-------|------------|
| Markup | HTML5 |
| Styling | Tailwind CSS (CDN) + Custom CSS |
| Scripts | Vanilla JavaScript |
| Fonts | Google Fonts (CDN) |
| Hosting | Any static host |

### Next.js Version

| Layer | Technology | Version |
|-------|------------|---------|
| Framework | Next.js | 14.2.35 |
| Language | TypeScript | 5.x |
| Styling | Tailwind CSS | 3.4.1 |
| Animations | Framer Motion | 11.18.2 |
| Theme | next-themes | 0.4.6 |
| Utilities | clsx, tailwind-merge | - |

## Component Architecture

### Directory Structure

```
portfolio-next/
├── src/
│   └── app/
│       ├── globals.css       # CSS variables, base styles
│       ├── layout.tsx        # Root layout + providers
│       └── page.tsx          # Homepage
├── components/
│   ├── ui/                   # Primitive components
│   │   ├── badge.tsx
│   │   ├── button.tsx
│   │   ├── glass-card.tsx
│   │   ├── device-mockup.tsx
│   │   ├── project-card.tsx
│   │   ├── social-icons.tsx
│   │   └── index.ts          # Barrel exports
│   ├── sections/             # Page sections
│   │   ├── hero-section.tsx
│   │   ├── about-section.tsx
│   │   ├── experience-section.tsx
│   │   ├── skills-section.tsx
│   │   ├── projects-section.tsx
│   │   └── contact-section.tsx
│   ├── layout/               # Layout components
│   │   ├── glass-navbar.tsx
│   │   ├── mobile-menu.tsx
│   │   ├── footer.tsx
│   │   └── page-transition.tsx
│   ├── effects/              # Animation system
│   │   ├── motion-provider.tsx
│   │   ├── animation-variants.ts
│   │   └── scroll-reveal.tsx
│   ├── theme/                # Theme management
│   │   ├── theme-provider.tsx
│   │   └── theme-toggle.tsx
│   └── data/                 # Static content
│       ├── skills-data.ts
│       ├── projects-data.ts
│       └── experience-data.ts
└── lib/
    └── utils.ts              # cn() helper
```

### Architecture Diagram (ASCII)

```
┌─────────────────────────────────────────────────────────────────┐
│                        RootLayout                                │
│  ┌───────────────────────────────────────────────────────────┐  │
│  │                    ThemeProvider                           │  │
│  │  ┌─────────────────────────────────────────────────────┐  │  │
│  │  │                  MotionProvider                      │  │  │
│  │  │  ┌───────────────────────────────────────────────┐  │  │  │
│  │  │  │  GlassNavbar                                 │  │  │  │
│  │  │  │  ┌─────────────────────────────────────────┐  │  │  │  │
│  │  │  │  │ Logo    Nav Links         ThemeToggle  │  │  │  │  │
│  │  │  │  └─────────────────────────────────────────┘  │  │  │  │
│  │  │  └───────────────────────────────────────────────┘  │  │  │
│  │  │                                                       │  │  │
│  │  │  ┌───────────────────────────────────────────────┐  │  │  │
│  │  │  │  Main Content (page.tsx)                      │  │  │  │
│  │  │  │                                               │  │  │  │
│  │  │  │  ┌─────────────────────────────────────────┐ │  │  │  │
│  │  │  │  │ HeroSection                             │ │  │  │  │
│  │  │  │  │  - Name, Title, CTAs, Social Links      │ │  │  │  │
│  │  │  │  └─────────────────────────────────────────┘ │  │  │  │
│  │  │  │                                               │  │  │  │
│  │  │  │  ┌─────────────────────────────────────────┐ │  │  │  │
│  │  │  │  │ AboutSection                            │ │  │  │  │
│  │  │  │  │  - Bio, Stats, Highlights               │ │  │  │  │
│  │  │  │  └─────────────────────────────────────────┘ │  │  │  │
│  │  │  │                                               │  │  │  │
│  │  │  │  ┌─────────────────────────────────────────┐ │  │  │  │
│  │  │  │  │ ExperienceSection                       │ │  │  │  │
│  │  │  │  │  - Timeline, Job Cards                  │ │  │  │  │
│  │  │  │  └─────────────────────────────────────────┘ │  │  │  │
│  │  │  │                                               │  │  │  │
│  │  │  │  ┌─────────────────────────────────────────┐ │  │  │  │
│  │  │  │  │ SkillsSection                           │ │  │  │  │
│  │  │  │  │  - Skill Categories Grid                │ │  │  │  │
│  │  │  │  └─────────────────────────────────────────┘ │  │  │  │
│  │  │  │                                               │  │  │  │
│  │  │  │  ┌─────────────────────────────────────────┐ │  │  │  │
│  │  │  │  │ ProjectsSection                         │ │  │  │  │
│  │  │  │  │  - Project Cards Grid                   │ │  │  │  │
│  │  │  │  └─────────────────────────────────────────┘ │  │  │  │
│  │  │  │                                               │  │  │  │
│  │  │  │  ┌─────────────────────────────────────────┐ │  │  │  │
│  │  │  │  │ ContactSection                          │ │  │  │  │
│  │  │  │  │  - Contact Cards, CTAs                  │ │  │  │  │
│  │  │  │  └─────────────────────────────────────────┘ │  │  │  │
│  │  │  └───────────────────────────────────────────────┘  │  │  │
│  │  │                                                       │  │  │
│  │  │  ┌───────────────────────────────────────────────┐  │  │  │
│  │  │  │  Footer                                        │  │  │  │
│  │  │  └───────────────────────────────────────────────┘  │  │  │
│  │  └─────────────────────────────────────────────────────┘  │  │
│  └───────────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────────┘
```

## Component Hierarchy

```
RootLayout (Server)
├── ThemeProvider (Client - next-themes)
│   └── MotionProvider (Client - Framer Motion LazyMotion)
│       ├── Skip Link (Accessibility)
│       ├── GlassNavbar (Client)
│       │   ├── Logo
│       │   ├── Nav Links
│       │   ├── ThemeToggle (Client)
│       │   └── MobileMenu (Client)
│       ├── Main Content
│       │   └── Page Sections (Client/Server hybrid)
│       │       ├── ScrollReveal wrappers
│       │       ├── GlassCard containers
│       │       └── UI primitives (Button, Badge)
│       └── Footer (Server)
```

## Data Flow

### Static Content Flow

```
┌─────────────────┐     ┌─────────────────┐     ┌─────────────────┐
│   skills-data   │     │  projects-data  │     │ experience-data │
│       .ts       │     │       .ts       │     │       .ts       │
└────────┬────────┘     └────────┬────────┘     └────────┬────────┘
         │                       │                       │
         v                       v                       v
┌─────────────────────────────────────────────────────────────────┐
│                      Section Components                          │
│  (SkillsSection, ProjectsSection, ExperienceSection)             │
└─────────────────────────────────────────────────────────────────┘
         │
         v
┌─────────────────────────────────────────────────────────────────┐
│                      UI Components                               │
│  (Badge, GlassCard, ProjectCard)                                 │
└─────────────────────────────────────────────────────────────────┘
```

### Theme State Flow

```
┌─────────────────┐
│ ThemeProvider   │  (next-themes context)
│ theme, setTheme │
└────────┬────────┘
         │
    ┌────┴────┐
    v         v
┌────────┐  ┌────────────┐
│Navbar  │  │ThemeToggle │
│(reads) │  │(toggles)   │
└────────┘  └────────────┘
```

### Animation Flow

```
┌─────────────────┐
│ MotionProvider  │  (LazyMotion + domAnimation)
└────────┬────────┘
         │
         v
┌─────────────────┐     ┌─────────────────┐
│ ScrollReveal    │────>│ Section Content │
│ (in-view detect)│     │ (fadeInUp)      │
└─────────────────┘     └─────────────────┘
```

## State Management

### Approach: Local State + Context

| State Type | Solution | Example |
|------------|----------|---------|
| Theme | next-themes context | Dark/light mode |
| UI State | Local useState | Mobile menu open/close |
| Animation | Framer Motion | In-view animations |
| Content | Static imports | Skills, projects, experience |

### No Global State Library

The application uses:
- React context for theme only
- Local component state for UI interactions
- Static data imports (no runtime data fetching)

## Client vs Server Components

### Server Components (Default)

- `layout.tsx` - Root layout
- `page.tsx` - Page composition
- `footer.tsx` - Static footer

### Client Components (marked with `"use client"`)

- `motion-provider.tsx` - Uses Framer Motion
- `theme-provider.tsx` - Uses next-themes context
- `theme-toggle.tsx` - Interactive toggle
- `glass-navbar.tsx` - Mobile menu state
- `scroll-reveal.tsx` - Intersection Observer
- All section components - Use Framer Motion
- All UI components - Use Framer Motion or event handlers

## Build Output

### Static HTML Version

```
No build required - served as-is
├── index.html
├── styles.css
└── script.js
```

### Next.js Version

```
.next/
├── static/         # Static assets
├── server/         # Server components
└── server/app/     # App router output

Output: Static HTML (SSG by default)
```

## Security Headers

Configured in `next.config.mjs`:

| Header | Value |
|--------|-------|
| X-Frame-Options | DENY |
| X-Content-Type-Options | nosniff |
| Referrer-Policy | strict-origin-when-cross-origin |
| Permissions-Policy | camera=(), microphone=(), geolocation=() |

## Performance Optimizations

1. **LazyMotion** - Reduces Framer Motion bundle by lazy-loading animations
2. **Static Generation** - No server-side rendering needed for static content
3. **Font Optimization** - Next.js font loading with CSS variables
4. **Image Optimization** - Next.js Image component ready (currently using external images)
5. **Code Splitting** - Automatic with App Router
