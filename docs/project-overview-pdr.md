# Product Development Requirements (PDR)

## Project Name

DDP Portfolio - Personal Portfolio Website

## Project Description

A modern, responsive portfolio website showcasing the skills, experience, and projects of DOAN DUY PHUONG, an iOS Software Engineer with 5+ years of experience. The project exists in two versions:

1. **Static HTML Version** - Lightweight, CDN-hosted vanilla HTML/CSS/JS
2. **Next.js Version** - Full-featured React application with advanced animations

## Purpose

- Showcase professional experience and technical skills
- Display featured projects with measurable outcomes
- Provide contact information and social links
- Demonstrate modern web development capabilities

## Target Audience

| Segment | Description |
|---------|-------------|
| Recruiters | Technical recruiters seeking iOS developers |
| Hiring Managers | Engineering managers evaluating candidates |
| Potential Clients | Companies looking for iOS development services |
| Fellow Developers | Developers interested in portfolio implementation |

## Core Features

### Must Have (P0)

- [x] Hero section with name, title, and availability status
- [x] About section with bio and key statistics
- [x] Experience timeline with detailed work history
- [x] Skills section organized by category
- [x] Projects showcase with tech stack and outcomes
- [x] Contact section with email and social links
- [x] Responsive design (mobile, tablet, desktop)
- [x] Accessibility support (ARIA, keyboard nav, skip links)

### Should Have (P1)

- [x] Dark/light theme toggle (Next.js version)
- [x] Smooth scroll-triggered animations
- [x] Glassmorphism design elements
- [x] SEO optimization (meta tags, Open Graph)
- [x] Custom scrollbar styling

### Nice to Have (P2)

- [ ] Blog/writing section
- [ ] Resume download functionality
- [ ] Contact form with email integration
- [ ] Analytics integration
- [ ] Performance monitoring

## Non-Functional Requirements

### Performance

| Metric | Target |
|--------|--------|
| First Contentful Paint | < 1.5s |
| Largest Contentful Paint | < 2.5s |
| Time to Interactive | < 3.0s |
| Cumulative Layout Shift | < 0.1 |

### Accessibility

- WCAG 2.1 Level AA compliance
- Keyboard navigation support
- Screen reader compatible
- Reduced motion preference support

### Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+
- Mobile Safari (iOS 14+)
- Chrome Mobile (Android 10+)

### SEO

- Semantic HTML structure
- Meta tags for social sharing (Open Graph, Twitter Cards)
- Structured data (JSON-LD) ready
- Robots.txt and sitemap.xml

## Success Metrics

| Metric | Target | Measurement |
|--------|--------|-------------|
| Page Load Time | < 3s | Lighthouse |
| Accessibility Score | > 90 | Lighthouse |
| SEO Score | > 90 | Lighthouse |
| Mobile Responsiveness | 100% | Manual testing |
| Cross-browser Compatibility | 100% | Manual testing |

## Owner Information

| Field | Value |
|-------|-------|
| Name | DOAN DUY PHUONG |
| Role | iOS Software Engineer |
| Experience | 5+ years |
| Email | 95doanphuong@gmail.com |
| LinkedIn | linkedin.com/in/phuongddx |
| GitHub | github.com/phuongddx |
| Location | Ho Chi Minh, Vietnam |

## Version Comparison

| Feature | Static HTML | Next.js |
|---------|-------------|---------|
| Technology | Vanilla HTML/CSS/JS + Tailwind CDN | Next.js 14 + TypeScript + Tailwind |
| Animations | CSS keyframes | Framer Motion with LazyMotion |
| Theme | Light only (dark CSS prepared) | Dark/Light with next-themes |
| Bundle Size | ~50KB | ~150KB gzipped |
| Build Time | None | ~30s |
| Hosting | Any static host | Vercel/Netlify/Node.js |

## Project Scope

### In Scope

- Single-page portfolio website
- Six main sections (Hero, About, Experience, Skills, Projects, Contact)
- Responsive design
- Accessibility features
- SEO optimization

### Out of Scope

- Backend API development
- Database integration
- User authentication
- Content management system
- Multi-language support
