# Favoryt TV/NET

Website for a local ISP in Khodoriv and surrounding area (Lviv region, Ukraine).
Internet and cable TV plans, news, promotions, setup guides, and a service request form.

<!-- Production: https://favorite.lviv.ua -->

## Tech stack

- Nuxt 4 (compatibility mode), Vue 3
- @nuxt/ui v3 (Tailwind-based UI kit)
- @nuxt/content (markdown-driven news/promo)
- @nuxt/image
- @nuxtjs/sitemap
- Iconify (heroicons, mdi, material-symbols, etc.)

## Getting started

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # production build (SSR)
npm run preview    # preview production build
npm run generate   # static generation
```

## Project structure

```
pages/              Pages (file-based routing)
components/         Vue components (auto-imported by folder nesting)
content/            Markdown content for @nuxt/content (news, promo)
data/               TypeScript files with plan pricing data
public/             Static assets: images, SVG, JSON files
public/json/        JSON data served via server route (settlements, FAQ, config guides)
server/routes/      Server API routes (Nitro)
config/             Site configuration (site.ts)
layouts/            Nuxt layouts (default + default-wrapper)
assets/css/         Global styles
```

## Data

**`content/`** -- Markdown files for news and promotions. Queried via `@nuxt/content` (`queryCollection`).
- `content/news/` -- announcements
- `content/promo/` -- promotions

**`data/`** -- TypeScript arrays with pricing plans. Imported directly into pages.
- `data/internet-plans.ts` -- internet plans
- `data/cable-plans.ts` -- cable TV plans

**`public/json/`** -- JSON files served through the `/json/*` server route:
- `settlements.json` -- list of settlements (for the selector dropdown)
- `payment-faq.json` -- payment FAQ
- `config-routers.json` -- router models for setup guides
- `config-windows.json` -- Windows versions for setup guides

## Pages

| Route | Description |
|---|---|
| `/` | Home: hero, features, latest news, service request form |
| `/internet` | Internet plans (Khodoriv / region) |
| `/tv/cable` | Cable TV (Khodoriv only) |
| `/tv/ip` | IPTV (Sweet TV) |
| `/payment` | Payment via PrivatBank / EasyPay |
| `/contact` | Contacts, map, messengers |
| `/faq` | FAQ |
| `/config/routers` | Router setup guides |
| `/config/windows` | PPPoE setup guides for Windows |
| `/news` | News list |
| `/news/[slug]` | Single news article |
| `/promo` | Promotions list |
| `/promo/[slug]` | Single promotion |

## Service request form

Used in two places:
- `pages/index.vue` -- "Submit request" form at the bottom of the home page
- `components/Modal/PlansSubmit.vue` -- modal when selecting a plan (internet, cable TV)

Both send a POST to `https://forminit.com/f/bejrjqda`.
To change the endpoint, search for `forminit` in these two files.

## JSON API

Server route `server/routes/json/[...path].get.ts` serves JSON files from `public/json/` as parsed JSON.

Consumers:
- `components/Selector/Settlements.vue` -> `GET /json/settlements.json`
- `pages/payment.vue` -> `GET /json/payment-faq.json`
- `pages/config/routers.vue` -> `GET /json/config-routers.json`
- `pages/config/windows.vue` -> `GET /json/config-windows.json`

## Deployment

The project runs as SSR (Nitro server):

```bash
npm run build
node .output/server/index.mjs
```

Alternatively, use `npm run generate` for full static generation.

## Developer notes

- Site config (phones, social links, payment URLs): `config/site.ts`
- Internet plans: `data/internet-plans.ts`
- Cable TV plans: `data/cable-plans.ts`
- News/promotions: `content/news/`, `content/promo/` (Markdown with frontmatter)
- Settlements list: `public/json/settlements.json`
- Devtools are enabled in development only (`nuxt.config.ts`)
