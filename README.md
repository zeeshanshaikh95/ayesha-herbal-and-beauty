# Ayesha Herbal & Beauty — Website

**Live storefront (static demo):** https://zeeshanshaikh95.github.io/ayesha-herbal-and-beauty/

Mobile-first storefront for **Ayesha Herbal & Beauty**, an everyday herbal beauty and self-care brand. Primary conversion: browse → cart → **order on WhatsApp** (no payment gateway by design).

The catalogue is the client's own published range — 14 products, five categories, real prices and product photography, all editable from a protected admin panel.

> The GitHub Pages build currently runs with `VITE_DEMO_MODE=true`, so the storefront works from a bundled catalogue without the API. The admin panel, live edits and analytics require the Express API + MongoDB (see Deployment).

---

## Tech stack

| Layer | Technology |
| --- | --- |
| Frontend | React 18 + Vite 6 + TypeScript, Tailwind CSS 3, React Router 6, react-helmet-async |
| Backend | Node.js + Express 4 + TypeScript, Zod validation |
| Database | MongoDB + Mongoose 8 (Atlas free tier for production) |
| Auth | JWT bearer tokens + bcrypt password hashing, protected `/api/admin/*` routes |
| Security | Helmet, CORS allow-list, rate limiting, input validation, secrets via env |
| Images | Cloudinary (server-side uploads) with local-disk fallback |
| Hosting | GitHub Pages (frontend) + Render free tier (API) + MongoDB Atlas |

## Project structure

```
├── client/                 React SPA
│   ├── public/             robots.txt, sitemap.xml, favicons, brand + product images
│   └── src/
│       ├── admin/          Protected admin panel (lazy-loaded bundle)
│       ├── api/            Centralized API client + typed endpoints
│       ├── components/     Reusable UI (ProductCard, MiniCart, BrandLogo, Seo…)
│       ├── context/        Cart / Settings / Toast providers
│       ├── hooks/          useApi, usePageView
│       ├── lib/            WhatsApp message builder, analytics, formatting, brand
│       └── pages/          Public pages
├── server/
│   └── src/
│       ├── config/         Env config + Mongo connection
│       ├── controllers/    Public + admin route handlers
│       ├── middleware/     Auth (JWT), errors, rate limits, uploads
│       ├── models/         Mongoose schemas
│       ├── routes/         /api and /api/admin routers
│       ├── seed/           Admin + settings + first-party catalogue bootstrap
│       ├── services/       Settings singleton, Cloudinary + media services
│       ├── utils/          asyncHandler, query helpers
│       └── validation/     Zod schemas for every write
├── scripts/                Brand asset + product image pipelines
└── docs/DEPLOYMENT.md      Free-tier deployment guide
```

## Pages

- **Home** — hero, values, categories, bestsellers, brand band, featured products, story teaser, reviews (when approved), Instagram gallery (when populated), WhatsApp CTA
- **Shop** — search, category filter, sort, responsive product grid
- **Category** — category hero + filtered products
- **Product** — gallery lightbox, variants, quantity, benefits, how-to-use, care notes, related products, reviews
- **About / Our Story** — brand story, promises, WhatsApp CTA
- **Reviews** — approved customer reviews only
- **Gallery** — Instagram gallery managed from the admin
- **Contact** — WhatsApp, Instagram, email, how ordering works
- **Admin** — dashboard analytics, product CRUD, categories + reorder, review moderation, gallery manager, settings

## Quick start (local)

**Prerequisites:** Node 20+ and MongoDB — either a local/Atlas instance you already have, or the bundled dev database (no installation required).

```
# 1 — install
npm install

# 2 — configure the server
cp .env.example server/.env
# → edit server/.env: set MONGODB_URI, JWT_SECRET (long random string),
#   ADMIN_EMAIL and ADMIN_PASSWORD before any real deployment.

# 3 — start a database (skip if you already run MongoDB / use Atlas)
npm run dev:db

# 4 — bootstrap admin, settings and the 14-product catalogue
npm run seed                 # or: npm run seed:reset to rebuild the catalogue

# 5 — run the API and the client
npm run dev
# Client: http://localhost:5173     API: http://localhost:4000/api/health
```

`npm run dev:all` runs the dev database, API and client together in one terminal.

**Admin panel:** `http://localhost:5173/admin` → log in with `ADMIN_EMAIL` / `ADMIN_PASSWORD` from `server/.env`. A freshly bootstrapped account must change its password before the panel becomes usable.

### Catalogue & contact defaults

The seed creates:

- 5 categories: Face Care, Soap Bars, Body Care, Face & Body, Hair Care
- 14 products with the client's published names, prices, descriptions and photos
- WhatsApp number `+91 98929 34245` and the brand's Instagram link

All of it is editable in **Admin → Products / Categories / Settings**. Re-running `npm run seed` never overwrites edits.

## Scripts

| Command | Purpose |
| --- | --- |
| `npm run dev` | Run API + client together (concurrently) |
| `npm run dev:all` | Dev database + API + client in one command |
| `npm run dev:db` | Local dev MongoDB (data persisted in `server/.data/mongo`) |
| `npm run dev:server` / `npm run dev:client` | Run one side |
| `npm run build` | Typecheck + build both workspaces |
| `npm run typecheck` | TypeScript project-wide |
| `npm run seed` / `npm run seed:reset` | Seed / rebuild admin, settings and catalogue |
| `npm run brand:assets` | Regenerate logo, favicons and OG image from the SVG roundel |
| `npm run images:prepare -- <folder>` | Re-derive WebP product images from source PNGs |
| `node server/scripts/api-smoke.mjs` | End-to-end API test (public + admin CRUD + auth) |

## Environment variables

See [.env.example](.env.example) — copied to `server/.env` (never committed):

| Variable | Purpose |
| --- | --- |
| `PORT` | API port (4000) |
| `MONGODB_URI` | Mongo connection string (local or Atlas) |
| `JWT_SECRET` | Long random secret for signing admin JWTs |
| `JWT_EXPIRES_IN` | Token lifetime (12h) |
| `CORS_ORIGINS` | Comma-separated allowed frontend origins |
| `PUBLIC_SITE_URL` | Frontend URL (canonical/OG defaults) |
| `ADMIN_EMAIL` / `ADMIN_PASSWORD` | First admin account (seed only) |
| `CLOUDINARY_*` | Server-side image storage (optional; falls back to disk) |

Client build-time vars: `VITE_BASE` (default `/`), `VITE_API_BASE_URL`, `VITE_PUBLIC_SITE_URL`.

## Brand assets & colours

The brand mark is a recreation of the roundel used on the client's own packaging: a pink disc with a crescent and star, the serif **Ayesha** wordmark, and `HERBAL & BEAUTY`.

| Asset | Purpose |
| --- | --- |
| `brand/ayesha-logo.svg` | Vector source of truth |
| `brand/ayesha-logo.png` | Full-size raster |
| `brand/ayesha-logo-transparent.png` | Transparent background |
| `brand/ayesha-logo-trimmed.png` | Trimmed — navbar, footer, admin |
| `favicon-32.png`, `favicon-48.png`, `apple-touch-icon.png` | Browser / app icons |
| `og-image.png` | 1200×630 social sharing image |

Regenerate everything with `npm run brand:assets`.

**Palette:** brand pink `#E91E63`, primary CTA rose `#D81B60`, blush cream `#FFF0F5`, ink `#211018`, herbal green and antique gold accents. Typography: **Playfair Display** headings + **DM Sans** body.

## Security notes

- Passwords: bcrypt (12 rounds); never stored or logged in plaintext.
- Every `/api/admin/*` request requires a valid JWT; tokens of deleted admins are rejected.
- Login rate-limited (10 attempts / 15 min); analytics + uploads separately limited.
- Zod validation on all writes; Mongo validation as a second layer.
- Central error handler never leaks stack traces; CORS restricted via env in production.
- Admin UI is code-split and route-guarded, but **security is enforced server-side only**.

## Where content lives

| Data | Where it is set |
| --- | --- |
| Products, prices, images, variants | Admin → Products |
| Categories | Admin → Categories |
| Reviews | Admin → Reviews (approved status required to display) |
| Gallery | Admin → Gallery |
| WhatsApp number, Instagram, email, Maps | Admin → Settings |
| Hero / About copy, images | Admin → Settings |
| Domain, sitemap host | `client/public/robots.txt`, `client/public/sitemap.xml`, `VITE_PUBLIC_SITE_URL` |

## Deployment

See [docs/DEPLOYMENT.md](docs/DEPLOYMENT.md):

1. MongoDB Atlas free tier → connection string
2. Render → API (uses `render.yaml`)
3. GitHub Pages → frontend (workflow included), custom domain `ayeshaherbalandbeauty.com`
4. Point `VITE_API_BASE_URL` at the Render URL, set `CORS_ORIGINS`, then seed/production-check

## Notes on real data

Reviews start empty and only display once an admin approves them — no testimonials are invented. The initial gallery uses the brand's own product photography and links to Instagram; product copy avoids medical or guaranteed-result language, and packaging directions and cautions are carried through to each product page.
