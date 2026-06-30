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
│   │   ├── hero-section.tsx  # iOS hero
│   │   ├── about-section.tsx
│   │   ├── experience-section.tsx  # iOS experience
│   │   ├── skills-section.tsx      # iOS skills
│   │   ├── projects-section.tsx    # iOS projects
│   │   ├── contact-section.tsx     # Shared contact
│   │   ├── ai-hero-section.tsx     # AI hero (terminal)
│   │   ├── ai-workflow-section.tsx # AI workflow (6-phase)
│   │   ├── ai-skills-section.tsx   # AI skills (bars)
│   │   ├── ai-experience-section.tsx # AI experience (AI Impact)
│   │   └── ai-projects-section.tsx # AI projects (GitHub)
│   ├── context/              # React Context providers
│   │   └── mode-context.tsx  # Mode state + useMode hook
│   ├── layout/               # Layout components
│   │   ├── navbar.tsx        # Main navbar with mode toggle
│   │   ├── mobile-menu.tsx
│   │   ├── mode-toggle.tsx   # iOS/AI pill toggle
│   │   ├── mode-router.tsx   # Mode-aware section renderer
│   │   ├── nav-links.ts      # Mode-aware nav links
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
│       ├── skills-data.ts    # iOS skills
│       ├── projects-data.ts  # iOS projects
│       ├── experience-data.ts # iOS experience
│       └── ai-resume-data.ts # AI mode data
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
│   └── ModeProvider (Client - iOS/AI mode context)
│       └── MotionProvider (Client - Framer Motion LazyMotion)
│           ├── Skip Link (Accessibility)
│           ├── GlassNavbar (Client)
│           │   ├── Logo
│           │   ├── Nav Links (mode-aware)
│           │   ├── ModeToggle (iOS/AI pill toggle)
│           │   ├── ThemeToggle (Client)
│           │   └── MobileMenu (Client)
│           ├── ModeRouter (Client)
│           │   ├── AnimatePresence (fade transition)
│           │   ├── IOSContent (static sections)
│           │   │   ├── HeroSection
│           │   │   ├── AboutSection
│           │   │   ├── ExperienceSection
│           │   │   ├── SkillsSection
│           │   │   ├── ProjectsSection
│           │   │   └── SideProjectsSection
│           │   └── AIContent (dynamic sections)
│           │       ├── AIHeroSection
│           │       ├── AIWorkflowSection
│           │       ├── AISkillsSection
│           │       ├── AIExperienceSection
│           │       └── AIProjectsSection
│           ├── ContactSection (Client - shared)
│           └── Footer (Server)
```

## Data Flow

### Static Content Flow

```
┌──────────────────────────┬──────────────────────────┐
│   iOS Data               │   AI Mode Data           │
│                          │                          │
│ ┌──────────────────────┐ │ ┌──────────────────────┐ │
│ │ skills-data.ts       │ │ │ ai-resume-data.ts    │ │
│ │ projects-data.ts     │ │ │  - skills/levels     │ │
│ │ experience-data.ts   │ │ │  - experiences/AI... │ │
│ │                      │ │ │  - projects/GitHub   │ │
│ └──────────────────────┘ │ │  - terminal lines    │ │
│                          │ │  - workflow steps    │ │
└──────────────┬───────────┴──────────────┬───────────┘
               │                         │
               v                         v
┌──────────────────────────┬──────────────────────────┐
│   iOS Sections           │   AI Sections            │
│   (static imports)       │   (dynamic imports)      │
│                          │                          │
│ HeroSection              │ AIHeroSection            │
│ AboutSection             │ AIWorkflowSection        │
│ ExperienceSection        │ AISkillsSection          │
│ SkillsSection            │ AIExperienceSection      │
│ ProjectsSection          │ AIProjectsSection        │
│ SideProjectsSection      │                          │
└──────────────┬───────────┴──────────────┬───────────┘
               │                         │
               └──────────┬──────────────┘
                          v
             ┌────────────────────────────┐
             │     ModeRouter (Client)    │
             │   - Selects iOS or AI      │
             │   - AnimatePresence fade   │
             │   - SectionSkeleton loader │
             └────────────────────────────┘
```

### Mode State Flow

```
ModeContext (iOS | AI)
     ↓
  useMode() hook
     ↓
ModeRouter (renders based on mode)
     ↓
AnimatePresence (300ms fade transition)
     ↓
iOS or AI content sections
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

### Mode State Flow (localStorage + URL)

```
ModeProvider (ModeContext)
     ↓
setMode(next) → localStorage + URL param update
     ↓
useMode() subscribers (ModeRouter, ModeToggle)
     ↓
Trigger re-render with AnimatePresence fade
     ↓
Load iOS or AI sections
```

### Animation Flow

```
MotionProvider (LazyMotion + domAnimation)
     ↓
├─ ScrollReveal (in-view animations)
│   └─ Section content (fadeInUp)
│
├─ ModeRouter (cross-fade on mode change)
│   └─ AnimatePresence (300ms fade)
│
└─ Component animations
    ├─ Skill bars (whileInView)
    ├─ Terminal typing (requestAnimationFrame)
    └─ Interactive elements (spring transitions)
```

## State Management

### Approach: Local State + Context

| State Type | Solution | Example |
|------------|----------|---------|
| Theme | next-themes context | Dark/light mode |
| Mode (iOS/AI) | ModeContext | Mode selection + persistence |
| UI State | Local useState | Mobile menu, disclosure toggles |
| Animation | Framer Motion | In-view animations, transitions |
| Content | Static imports | Skills, projects, experience, AI data |

### Context Providers

The application uses:
- **ThemeProvider** (next-themes) - Dark/light theme management
- **ModeProvider** (ModeContext) - iOS/AI mode switching with localStorage + URL sync
- **MotionProvider** (Framer Motion LazyMotion) - Animation configuration
- Local component state for transient UI interactions

### Data Persistence

- **Theme**: persisted via next-themes (system preference + localStorage)
- **Mode**: persisted via localStorage (`portfolio-mode`) and URL parameter (`?mode=ai`)
  - URL params take precedence (enables shareable links)
  - Post-mount hydration prevents layout shift

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
2. **Dynamic Imports** - AI sections use `next/dynamic` with `ssr: false`
   - iOS users never download AI bundle code
   - AI sections load on-demand when user switches mode
3. **Static Generation** - No server-side rendering needed for static content
4. **Font Optimization** - Next.js font loading with CSS variables
5. **Image Optimization** - Next.js Image component ready (currently using external images)
6. **Code Splitting** - Automatic with App Router
7. **Two-Pass Rendering** - ModeRouter pre-renders iOS to avoid hydration mismatch
8. **SectionSkeleton** - Loading state for lazy-loaded AI sections
