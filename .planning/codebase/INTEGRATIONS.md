# External Integrations

**Analysis Date:** 2026-08-29

## APIs & External Services

**None detected.**

This portfolio is a fully static site. There are zero runtime API calls — no `fetch()`, no HTTP client libraries, no SDK calls to external services. All data is hardcoded in TypeScript files under `components/data/`:
- `components/data/projects-data.ts` — Project portfolio entries
- `components/data/experience-data.ts` — Work experience
- `components/data/skills-data.ts` — Technical skills
- `components/data/side-projects-data.ts` — Side projects
- `components/data/ai-resume-data.ts` — AI-mode terminal lines and workflow steps

**Outbound links only (no API integration):**
- App Store URLs in project data (e.g., `https://apps.apple.com/us/app/swiss-post/id378676700` in `components/data/projects-data.ts`)
- LinkedIn: `https://linkedin.com/in/phuongddx/` in `components/sections/contact-section.tsx`
- GitHub: `https://github.com/phuongddx` in `components/sections/contact-section.tsx`
- Email: `mailto:95doanphuong@gmail.com` in `components/sections/contact-section.tsx`

## Data Storage

**Databases:**
- None. All content is static TypeScript data files.

**File Storage:**
- Local filesystem only — screenshots in `public/screenshots/`, resume PDF at `public/DoanPhuong.pdf`

**Caching:**
- None beyond Next.js default static generation and browser cache.

## Authentication & Identity

**Auth Provider:**
- None. This is a public portfolio site with no user authentication.

## Monitoring & Observability

**Error Tracking:**
- None

**Logs:**
- None beyond Vercel platform-level logs

## CI/CD & Deployment

**Hosting:**
- Vercel (site URL in `src/app/layout.tsx` metadata: `https://portfolio-phi-lac-67.vercel.app`)

**CI Pipeline:**
- None configured. No `.github/workflows/` directory detected. No `vercel.json` configuration file.
- Build command from `package.json`: `next build`
- Lint check: `next lint`

## Environment Configuration

**Required env vars:**
- None

**Secrets location:**
- No secrets required. No `.env` files present.

## Webhooks & Callbacks

**Incoming:**
- None

**Outgoing:**
- None

## Structured Data

**JSON-LD:**
- Person schema embedded in `src/app/layout.tsx` for SEO (name, job title, social links, address)

**Open Graph:**
- Programmatic OG image generated at `src/app/opengraph-image.tsx` using Next.js Edge Runtime `ImageResponse`
- Full OG and Twitter card metadata in `src/app/layout.tsx`

---

*Integration audit: 2026-08-29*