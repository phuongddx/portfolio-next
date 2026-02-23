# DDP Portfolio - Next.js

A modern, responsive portfolio website for DOAN DUY PHUONG - iOS Software Engineer with 5+ years of experience. Built with Next.js 14, TypeScript, Tailwind CSS, and Framer Motion.

## Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Open http://localhost:3000
```

## Project Structure

```
portfolio-next/
├── src/app/                    # Next.js App Router
│   ├── globals.css             # Global styles, CSS variables
│   ├── layout.tsx              # Root layout with providers
│   └── page.tsx                # Homepage
├── components/
│   ├── ui/                     # Reusable UI primitives
│   ├── sections/               # Page sections (hero, about, etc.)
│   ├── layout/                 # Layout components (navbar, footer)
│   ├── effects/                # Animation system
│   ├── theme/                  # Theme management
│   └── data/                   # Static content data
├── lib/
│   └── utils.ts                # Utility functions (cn helper)
├── public/                     # Static assets
├── tailwind.config.ts          # Tailwind configuration
└── tsconfig.json               # TypeScript configuration
```

## Key Features

- **6 Portfolio Sections**: Hero, About, Experience, Skills, Projects, Contact
- **Dark/Light Theme**: System preference detection with manual toggle
- **Smooth Animations**: Framer Motion with LazyMotion for performance
- **Glassmorphism Design**: Modern glass-effect UI components
- **Fully Responsive**: Mobile-first design
- **Accessible**: ARIA labels, keyboard nav, skip links, reduced motion
- **SEO Optimized**: Meta tags, Open Graph, Twitter Cards

## Tech Stack

| Category | Technology |
|----------|------------|
| Framework | Next.js 14 (App Router) |
| Language | TypeScript 5 (strict mode) |
| Styling | Tailwind CSS 3.4 |
| Animations | Framer Motion 11 |
| Theme | next-themes |
| Utilities | clsx, tailwind-merge |

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server (port 3000) |
| `npm run build` | Build for production |
| `npm run start` | Start production server |
| `npm run lint` | Run ESLint |

## Deployment

### Vercel (Recommended)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

Or connect your GitHub repository at [vercel.com](https://vercel.com).

### Other Platforms

See [docs/deployment-guide.md](./docs/deployment-guide.md) for Netlify, Docker, and static export options.

## Design System

### Colors

| Token | Hex | Usage |
|-------|-----|-------|
| primary | `#18181B` | Headings, primary text |
| secondary | `#3F3F46` | Body text |
| cta | `#2563EB` | Buttons, accents |
| background | `#FAFAFA` | Page background |

### Typography

| Font | Usage |
|------|-------|
| Space Grotesk | Headings |
| DM Sans | Body text |

## Documentation

- [Project Overview (PDR)](./docs/project-overview-pdr.md)
- [Design Guidelines](./docs/design-guidelines.md)
- [System Architecture](./docs/system-architecture.md)
- [Code Standards](./docs/code-standards.md)
- [Codebase Summary](./docs/codebase-summary.md)
- [Project Roadmap](./docs/project-roadmap.md)
- [Deployment Guide](./docs/deployment-guide.md)

## Static HTML Version

A lightweight static HTML version is available in the parent directory:

```
../
├── index.html      # Static HTML version
├── styles.css      # Custom styles
└── script.js       # Mobile menu toggle
```

## Owner

**DOAN DUY PHUONG** - iOS Software Engineer

- Email: 95doanphuong@gmail.com
- LinkedIn: [linkedin.com/in/phuongddx](https://linkedin.com/in/phuongddx)
- GitHub: [github.com/phuongddx](https://github.com/phuongddx)
- Location: Ho Chi Minh, Vietnam

## License

Personal portfolio project. All rights reserved.
