# Infrastructure

## Runtime
- Node.js 18.17+ (stated in `docs/deployment-guide.md`). No `.nvmrc`, `.node-version`, or `engines` field.
- Next.js server output (no `output` set in `next.config.mjs`). Environment variables: none required.
- `next.config.mjs` sets `reactStrictMode` and global security headers (`X-Frame-Options: DENY`, `X-Content-Type-Options`, `Referrer-Policy`, `Permissions-Policy`).

## CI
Not configured (no `.github/workflows`, no other CI config). Local gates: `npm run lint`, `npx tsc --noEmit`, `npm run build`.

## Deploy targets
- No deploy config committed (`vercel.json`, `netlify.toml`, `Dockerfile` absent).
- `docs/deployment-guide.md` recommends Vercel and also describes Netlify, Docker, static export, and PM2. The Docker (`output: 'standalone'`) and static export (`output: 'export'`) options need config changes that are not present.
- Static SEO assets: `public/sitemap.xml`, `public/robots.txt`; OG image via `src/app/opengraph-image.tsx` (edge runtime).
- Production domain: `https://www.phuongddx.cc` (apex 307 → www; Vercel behind Cloudflare). The canonical URL is hardcoded in `src/app/layout.tsx` (`siteUrl`), `public/robots.txt` and `public/sitemap.xml`; change all three together.

## Remote
`origin` → `github.com:phuongddx/portfolio-next` (SSH alias). Single branch `main`.
