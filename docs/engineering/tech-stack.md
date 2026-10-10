# Tech Stack

Source: `package.json` (installed versions from `node_modules`).

| Layer | Choice |
| --- | --- |
| Language | TypeScript 5 (strict) |
| Framework | Next.js 14.2.35, App Router (`src/app/`) |
| UI | React 18.3 |
| Styling | Tailwind CSS 3.4 (`tailwind.config.ts`, `postcss.config.mjs`), `clsx` + `tailwind-merge` via `cn()` |
| Animation | framer-motion 11 (`LazyMotion` strict) |
| Theming | `next-themes` installed; wrapper `components/theme/theme-provider.tsx` currently unused |
| Fonts | Space Grotesk / DM Sans via `next/font` (`src/app/layout.tsx`) |
| Icons | Inline SVG (`components/ui/social-icons.tsx`); no icon library |
| Lint | ESLint 8 + `eslint-config-next` |
| Formatter | Not configured |
| Tests | Not configured |
| Package manager | npm (`package-lock.json`, lockfileVersion 3) |

## Commands
`npm run dev` · `npm run build` · `npm run start` · `npm run lint` · `npx tsc --noEmit`
