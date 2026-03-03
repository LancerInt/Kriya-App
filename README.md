# Kriya Product Catalog + Media Library

Production-oriented monorepo for Kriya public PWA and IT-only admin CMS.

## Stack
- Next.js + TypeScript (public app + admin + API routes)
- PostgreSQL + Prisma
- JWT auth with role/status controls
- PWA service worker for offline behavior
- Media upload pipeline endpoint with mandatory blur for packing photos before publishing

## Monorepo structure
- `apps/web`: Next.js app (public frontend + admin + API)
- `packages/db`: Prisma schema, migrations, seed
- `packages/shared`: shared types/i18n constants
- `docs/ADMIN_GUIDE.md`: IT admin instructions

## Setup
1. `npm install`
2. Copy `.env.example` to `.env`
3. Start postgres and app: `docker compose up`
4. In another shell run migrations/seed:
   - `npm run db:migrate`
   - `npm run db:seed`

Admin seed login:
- email: `admin@kriya.ltd`
- password: `Admin@123`

## Key product requirements mapped
- Public can browse products, media, dossier, facilities, finder, and quote form.
- Signup/login exists; new users default to `PENDING`.
- Offline pack endpoint provided (`/api/offline-pack`) and PWA cache installed with offline indicator.
- TDS/certificate metadata includes `version`, `lastUpdatedAt`, optional `expiryDate` in `metaJson`.
- WhatsApp prefill follows required template with region/country/product/qty fields.
- Packing photo publication flow enforces blur transformation on upload endpoint.

## Deployment
- Deploy Next.js app as Node server or container.
- Use managed Postgres.
- Configure S3/R2 env vars and replace local upload stubs with object storage adapters in `apps/web/src/lib`.

