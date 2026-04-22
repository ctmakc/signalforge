# SignalForge

**Multi-platform lead intelligence and outreach operating system.**

SignalForge allows operators to connect multiple accounts across platforms, define signal sources, monitor for intent signals, warm up account reputation, engage publicly in threads, continue conversations in DMs, and track leads through a CRM pipeline.

## Stack

- **Frontend**: Next.js 15 (App Router), TypeScript, Tailwind CSS
- **Backend**: Next.js Route Handlers → NestJS/Fastify when needed
- **Database**: PostgreSQL + Prisma ORM
- **Auth**: Better Auth (email/password + Google)
- **Queues**: BullMQ + Redis
- **Monorepo**: Turborepo

## Getting started

```bash
npm install
cd apps/web
cp .env.example .env        # fill DATABASE_URL
npx prisma migrate dev
npm run dev
```

App runs at `http://localhost:3000` and redirects to `/dashboard`.

## Monorepo structure

```
apps/web          — Next.js app (frontend + API layer)
packages/ui       — Shared design components
packages/types    — Shared TypeScript types
packages/lib      — Shared utilities
docs/             — Architecture, data model, API spec, design mapping
```

## Docs

- [Architecture](docs/ARCHITECTURE.md)
- [Data Model](docs/DATA_MODEL.md)
- [API Spec](docs/API_SPEC.md)
- [Design Mapping](docs/DESIGN_MAPPING.md)
- [Project Status](docs/PROJECT_STATUS.md)
- [Decisions](docs/DECISIONS.md)

## Phase status

- [x] Phase 1 — Static UI shell with mock data
- [ ] Phase 2 — Auth + core backend models
- [ ] Phase 3 — Operational features
- [ ] Phase 4 — Real platform integrations
- [ ] Phase 5 — Testing + hardening + deployment
