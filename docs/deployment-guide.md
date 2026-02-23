# Deployment Guide

## Prerequisites

### Required

- Node.js 18.17 or later
- npm, yarn, pnpm, or bun

### Optional

- Vercel CLI (for Vercel deployment)
- Netlify CLI (for Netlify deployment)

## Local Development

### 1. Clone and Install

```bash
cd portfolio-next
npm install
```

### 2. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the site.

### 3. Build for Production

```bash
npm run build
```

### 4. Run Production Build Locally

```bash
npm run start
```

## Available Scripts

| Script | Command | Description |
|--------|---------|-------------|
| dev | `npm run dev` | Start development server (port 3000) |
| build | `npm run build` | Build for production |
| start | `npm run start` | Start production server |
| lint | `npm run lint` | Run ESLint |

## Environment Variables

Currently, no environment variables are required for the portfolio.

### Optional Variables (Future)

```env
# Analytics (when implemented)
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX

# Contact Form (when implemented)
SMTP_HOST=smtp.example.com
SMTP_PORT=587
SMTP_USER=user@example.com
SMTP_PASS=password
```

## Deployment Options

### Option 1: Vercel (Recommended)

Vercel is the recommended platform for Next.js applications.

#### Automatic Deployment

1. Push code to GitHub
2. Import project at [vercel.com/new](https://vercel.com/new)
3. Vercel detects Next.js automatically
4. Click Deploy

#### CLI Deployment

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Deploy to production
vercel --prod
```

#### Configuration

Create `vercel.json` (optional):

```json
{
  "framework": "nextjs",
  "buildCommand": "npm run build",
  "outputDirectory": ".next"
}
```

### Option 2: Netlify

#### Automatic Deployment

1. Push code to GitHub
2. Import at [app.netlify.com](https://app.netlify.com)
3. Set build command: `npm run build`
4. Set publish directory: `.next`
5. Enable Netlify Next.js plugin (auto-detected)

#### CLI Deployment

```bash
# Install Netlify CLI
npm i -g netlify-cli

# Build
npm run build

# Deploy
netlify deploy --prod
```

#### netlify.toml

```toml
[build]
  command = "npm run build"
  publish = ".next"

[[plugins]]
  package = "@netlify/plugin-nextjs"
```

### Option 3: Docker

#### Dockerfile

```dockerfile
FROM node:18-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM node:18-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/public ./public

EXPOSE 3000
CMD ["node", "server.js"]
```

#### Build and Run

```bash
docker build -t portfolio-next .
docker run -p 3000:3000 portfolio-next
```

### Option 4: Static Export

For static hosting (GitHub Pages, AWS S3, etc.):

#### Update next.config.mjs

```javascript
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true
  }
};
```

#### Build

```bash
npm run build
```

Output will be in `out/` directory.

### Option 5: Node.js Server

```bash
# Build
npm run build

# Start (requires all dependencies)
npm run start
```

For PM2:

```bash
pm2 start npm --name "portfolio" -- start
```

## Static HTML Version Deployment

The static HTML version requires no build step:

```
portfolio3/
├── index.html
├── styles.css
└── script.js
```

### Deploy Options

| Platform | Method |
|----------|--------|
| GitHub Pages | Push to gh-pages branch |
| Netlify | Drag and drop folder |
| Vercel | Import as static site |
| AWS S3 | Upload files to bucket |
| Any web server | Copy files to web root |

## Build Output

### Next.js Build Output

```
.next/
├── static/           # Static assets (JS, CSS)
├── server/           # Server components
└── server/app/       # App router pages

# With standalone output
.next/standalone/     # Self-contained server
.next/static/         # Static assets (copy to standalone)
```

### Static Export Output

```
out/
├── index.html
├── _next/
│   └── static/
└── [other pages]
```

## Performance Checklist

Before deployment:

- [ ] Run `npm run build` without errors
- [ ] Run `npm run lint` without errors
- [ ] Test all pages and interactions
- [ ] Verify responsive design on mobile
- [ ] Check dark/light theme toggle
- [ ] Validate accessibility (keyboard nav)
- [ ] Test in multiple browsers

## Post-Deployment

### Verify

1. All pages load correctly
2. Navigation works
3. Theme toggle functions
4. Responsive design displays properly
5. Social links open correctly

### Monitor

- Set up uptime monitoring (UptimeRobot, Pingdom)
- Configure error tracking (Sentry, LogRocket)
- Enable analytics (Google Analytics, Vercel Analytics)

## Troubleshooting

### Build Fails

```bash
# Clear cache
rm -rf .next node_modules
npm install
npm run build
```

### Hydration Errors

- Check for mismatched client/server content
- Ensure `suppressHydrationWarning` on `<html>` tag

### Theme Flash on Load

ThemeProvider is configured with `disableTransitionOnChange` to prevent flash.

### Images Not Loading

- For external images, configure `next.config.mjs`:
```javascript
images: {
  remotePatterns: [
    { hostname: 'your-image-host.com' }
  ]
}
```
