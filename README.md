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
data/               TypeScript files with structured site data (plans, settlements, FAQ, guides)
public/             Static assets: images, SVG
config/             Site configuration (site.ts)
layouts/            Nuxt layouts (default + default-wrapper)
assets/css/         Global styles
```

## Data

**`content/`** -- Markdown files for news and promotions. Queried via `@nuxt/content` (`queryCollection`).
- `content/news/` -- announcements
- `content/promo/` -- promotions

**`data/`** -- TypeScript arrays with structured site data. Imported directly into pages and components.
- `data/internet-plans.ts` -- internet plans
- `data/cable-plans.ts` -- cable TV plans
- `data/settlements.ts` -- list of settlements (for the selector dropdown)
- `data/payment-faq.ts` -- payment FAQ
- `data/config-routers.ts` -- router models for setup guides
- `data/config-windows.ts` -- Windows versions for setup guides

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
- Settlements list: `data/settlements.ts`
- Devtools are enabled in development only (`nuxt.config.ts`)
