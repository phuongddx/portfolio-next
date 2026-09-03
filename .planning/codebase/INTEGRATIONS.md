# External Integrations

**Analysis Date:** 2026-09-03

## APIs & External Services

**None at runtime.** This is a fully static personal portfolio site.

- No `fetch()` calls, no HTTP client, no SDK imports anywhere in source
- All content is hardcoded TypeScript data modules: `components/data/projects-data.ts`, `components/data/ai-resume-data.ts`, `components/data/side-projects-data.ts`, `components/data/skills-data.ts`, `components/data/experience-data.ts`
- Contact "integration" is a plain `mailto:` link (`95doanphuong@gmail.com`) — no form backend, no email service (`components/sections/contact-section.tsx`, `components/layout/footer.tsx`)

**Build-time only:**
- Google Fonts (Space Grotesk, DM Sans) fetched by `next/font/google` during build (`src/app/layout.tsx:2`) and self-hosted — no runtime third-party requests

**External outbound links (static `<a href>`, not API calls):**
- GitHub — `https://github.com/phuongddx` (profile + repo links in `components/data/*.ts`, `components/layout/footer.tsx`, hero/contact sections)
- LinkedIn — `https://linkedin.com/in/phuongddx/`
- Apple App Store — deep links to published apps (e.g. Swiss Post, ZiLLearn, Windscribe) in `components/data/projects-data.ts` and `components/sections/hero-section.tsx`
- Résumé PDF served locally from `public/DoanPhuong.pdf`

## Data Storage

**Databases:**
- None. No database, no ORM, no Supabase/Prisma/Firebase — zero persistence layer

**File Storage:**
- Local filesystem only — static assets in `public/` (PDF, `screenshots/`, `robots.txt`, `sitemap.xml`)

**Caching:**
- None beyond Next.js/Vercel platform defaults

## Authentication & Identity

**Auth Provider:**
- None. Public single-page site; no auth, no sessions, no cookies, no middleware

## Monitoring & Observability

**Error Tracking:**
- None (docs mention analytics as a future optional env var in `docs/deployment-guide.md`, not implemented)

**Logs:**
- Next.js/Vercel platform logs only; no logging library, no `console.*` instrumentation strategy in app code

## CI/CD & Deployment

**Hosting:**
- Vercel — canonical site URL `https://portfolio-phi-lac-67.vercel.app` (hardcoded in `src/app/layout.tsx:19` as `siteUrl`, also in `public/robots.txt` and `public/sitemap.xml`)
- Git repo: `github.com/phuongddx/portfolio-next` (push-to-deploy via Vercel git integration; no `vercel.json` config present)

**CI Pipeline:**
- None. No `.github/` directory, no GitHub Actions, no lint/test gates automated
- Quality gates are manual: `npm run lint` and `npm run build`

## Environment Configuration

**Required env vars:**
- None — site runs with zero configuration

**Secrets location:**
- Not applicable — no secrets, no `.env` files exist

**Hardcoded values to be aware of:**
- `siteUrl` — `src/app/layout.tsx:19` (also drives `metadataBase`, canonical URL, OpenGraph)
- Sitemap URL — `public/sitemap.xml` (lastmod 2026-03-23, manually maintained)
- Email address — repeated in `src/app/layout.tsx` (JSON-LD), `components/sections/contact-section.tsx`, `components/sections/hero-section.tsx`, `components/sections/ai-hero-section.tsx`, `components/layout/footer.tsx`

## Webhooks & Callbacks

**Incoming:**
- None

**Outgoing:**
- None

## SEO / Discovery Surface (closest thing to "integrations")

- **JSON-LD structured data:** schema.org `Person` object injected via `<script type="application/ld+json">` in `src/app/layout.tsx:66-97` (name, jobTitle, sameAs → LinkedIn/GitHub, knowsAbout, postal address)
- **Dynamic OG image:** edge-rendered via `next/og` `ImageResponse` in `src/app/opengraph-image.tsx` (1200×630 PNG) — consumed by social platforms when the URL is shared
- **robots.txt + sitemap.xml:** static files in `public/`, both pointing at the Vercel URL
- **Security headers:** applied globally via `next.config.mjs` `headers()` (X-Frame-Options DENY, nosniff, referrer policy, permissions policy) — relevant to any future embed/iframe consumers

---

*Integration audit: 2026-09-03*
