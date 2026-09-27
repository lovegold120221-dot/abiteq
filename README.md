# ABI Tech — abitekapp

Corporate site for **ABI Tech** (AI implementation & automation company, Ortigas Center, Pasig, Philippines).

Production site: **https://www.abitech.site/**

What it is: marketing site + services catalog + use cases / case studies + blog (Supabase-backed with local seed fallback) + careers / contact + legacy `abitech-apps` showcase served as static files.

## Tech stack

- **TanStack Start + TanStack Router** (file-based routes in `src/routes/`), React 19
- **Vite 8 + Nitro (Vercel preset)** for SSR / build
- **Tailwind CSS v4**, Radix UI primitives, lucide-react, recharts, zustand, zod + react-hook-form
- **Postgres via Kysely + PGLite** (local dev) / `DATABASE_URL` (deploy). Better Auth pre-wired but opt-in.
- Supabase REST (anon key) for blog posts, with `src/lib/blog-seed.ts` fallback.

## Requirements

- Node `22.x` (see `.nvmrc`)
- npm (deps preinstalled in sandbox; `npm install` works for adding JS packages)

## Quick start

```bash
npm run dev        # http://0.0.0.0:8080 (preview contract — keep host/port)
npm run typecheck  # tsc --noEmit
npm run build      # vite build + db:migrate
npm run preview:restart  # serve built output on 127.0.0.1:8081 (QA only)
```

Other scripts:

| Script | What it does |
|---|---|
| `npm run dev` | Dev server with app-env wrapper (`scripts/with-app-env.mjs`) |
| `npm run build` | Production build + `db:migrate` |
| `npm run build:dev` | Build in development mode |
| `npm run preview` / `preview:restart` / `preview:stop` | Serve/stop built output (loopback `:8081`) |
| `npm run db:migrate` | Apply `migrations/` (`scripts/migrate.mjs`) |
| `npm run typecheck` | TypeScript check |
| `npm run lint` / `npm run format` | ESLint / Prettier |
| `npm run test` | Node tests (`scripts/**/*.test.mjs` + lib tests) |
| `npm run check:auth` | Auth-invariant check |

`startup.sh` (repo root) is the restart contract: probes `:8080`, starts `npm run dev` in background if down. Keep it in sync if start command/port changes.

## Project structure

```
src/
  router.tsx            # getRouter() + AppErrorComponent (required contract)
  routes/
    __root.tsx          # document shell — keep <AuthProvider>, <PreviewHostBridge/>
    index.tsx           # home (/)
    about.tsx / approach.tsx / careers.tsx / contact.tsx
    services.{tsx,index.tsx} / services.$slug.tsx
    use-cases.{tsx,index.tsx} / use-cases.$slug.tsx
    case-studies.{tsx,index.tsx} / case-studies.$slug.tsx
    blog.{tsx,index.tsx} / blog.$slug.tsx
    privacy.tsx / terms.tsx / sitemap[.]xml.ts
  components/
    home/               # Hero, Trusted, WhatWeDo, Industries, FeaturedCases, ...
    layout/             # header / footer / shell
    services/ / seo/ / modals/ / ui/
  lib/
    site-data.ts        # COMPANY, NAV, SERVICES, INDUSTRIES, CASE_STUDIES, JOBS, ...
    blog.ts / blog-seed.ts  # blog fetching + fallback content
    seo.ts              # seoHead(), JSON-LD helpers, SITE_URL
    db.ts / env.server.ts / cn.ts / ui-store.ts / og/
    auth/ / app-data/ / multiplayer/
  styles.css            # @import "tailwindcss" + button cursor rule
public/
  logo.png / favicon.* / og.jpg / robots.txt / images/
  abitech-apps/         # legacy static showcase (mirrored at repo-root abitech-apps/)
server/middleware/grok-pwa.ts  # platform chrome — do not delete
scripts/                # with-app-env, migrate, preview, browser-smoke, grok-pwa-*
migrations/auth/        # auth tables (opt-in)
```

## Routes

| Path | Content |
|---|---|
| `/` | Hero, trusted-by, services, industries, featured cases, blog teaser, approach, why-us, CTA |
| `/about`, `/approach`, `/careers` | Company |
| `/services`, `/services/:slug` | `ai-strategy`, `custom-ai`, `automation`, `dedicated-teams` |
| `/use-cases`, `/use-cases/:slug` | Industry use cases (healthcare, finance, retail, education, manufacturing, government) |
| `/case-studies`, `/case-studies/:slug` | Patient support, document processing, multilingual support |
| `/blog`, `/blog/:slug` | Insights (Supabase → seed fallback) |
| `/contact` | Email (`admin@abitech.site`), WhatsApp, Ortigas address, maps link |
| `/privacy`, `/terms` | Legal |
| `/sitemap.xml` | Generated sitemap |
| `/abitech-apps/index.html` | Legacy static apps showcase |

## Content editing

Most marketing copy lives in **`src/lib/site-data.ts`**:

- `COMPANY` — name, email, WhatsApp, office address, maps link
- `NAV` — header navigation (Company / Services / Work / Insights / Apps / Contact)
- `SERVICES` (4), `INDUSTRIES` (6), `CASE_STUDIES` (3), `AUTOMATION_FLOWS` (10), `STEPS` (5), `STATS`, `JOBS` (5), `PARTNERS`

Blog:

- `src/lib/blog.ts` fetches from Supabase (`VITE_SUPABASE_URL` / `VITE_SUPABASE_ANON_KEY`) and falls back to `SEED_POSTS` in `src/lib/blog-seed.ts`.
- Post shape: `BlogPost` / `BlogBlock` (`p`, `h2`, `h3`, `ul`, `quote`, `img`, `callout`) + `faqs`.

SEO:

- Per-route `head: () => seoHead({...})` in each route file; shared helpers + JSON-LD (`organizationJsonLd`, `websiteJsonLd`, `breadcrumbJsonLd`, `articleJsonLd`) in `src/lib/seo.ts`.
- Canonical base URL: `VITE_SITE_URL` (defaults to `https://www.abitech.site/`).
- Never put `og:*` / `twitter:card` in `__root.tsx` — the PWA injector owns them.

## Environment variables

No `.env` file — platform injects secrets on deploy. Only `VITE_`-prefixed vars reach the browser.

| Var | Used for |
|---|---|
| `VITE_SITE_URL` | Canonical site URL for SEO / sitemap (default `https://www.abitech.site/`) |
| `VITE_SUPABASE_URL` / `VITE_SUPABASE_ANON_KEY` | Blog content source (falls back to seed) |
| `DATABASE_URL` | Postgres on deploy (PGLite locally) |
| `XAI_API_KEY` | Server-only xAI access (never expose to client) |

## Deploy

- Target: **Vercel** (`vercel.json`: `framework: tanstack-start`, `buildCommand: npm run build`).
- Deploy constraints: no runtime filesystem writes, no server-only Node APIs at import time, no dev-only deps, no hard-coded hosts/ports/secrets.
- Keep `vite.config.ts` contracts: `:8080` dev / `:8081` preview ports, build/preview-gated Nitro plugin, `grokPwaPlugin()`. Don't recreate `vite.config.ts` / `tsconfig.json` or import a vendored preset.

## Shell contracts (do not break)

- `src/router.tsx` must export named `getRouter()` with `defaultErrorComponent`.
- `src/routes/__root.tsx` must keep `<AuthProvider>` and `<PreviewHostBridge />` near top of `<body>`.
- Keep `grokPwaPlugin()` + `server/middleware/grok-pwa.ts` (branding pill / install page). Never hide the pill with CSS or add a CSP blocking `https://grok.com`.
- Auth routes (`login.tsx`, `api/auth/$.ts`) and `@/lib/db` / migrations only for an accounts/sign-in ask — otherwise localStorage/zustand only. Never create `src/routes/auth/popup.tsx` (Vite plugin serves `/auth/popup`).

## QA

```bash
node scripts/browser-smoke.mjs   # desktop + mobile render + console check
```

Screenshots go under `screenshots/`. Interactive checks use the `agent-browser` CLI. Verify dev (`:8080`) and built output (`preview:restart` → `:8081`) before calling it done.
