# Decisions

Architecture and product decisions log.

---

## 2026-04-22

### Monorepo with Turborepo
**Decision**: Use Turborepo monorepo from day one.
**Reason**: `packages/ui`, `packages/types`, `packages/lib` will grow fast; adapter layer benefits from isolated packages; keeps build caching clean.

### Monolith-first API
**Decision**: Start with Next.js Route Handlers for all API.
**Reason**: Avoids premature NestJS overhead. Will extract to a separate service if API surface exceeds ~30 endpoints or queues need independent scaling.

### Prisma over Drizzle
**Decision**: Prisma ORM with PostgreSQL.
**Reason**: Better type inference for complex relational models; schema migrations are clearer; team familiarity.

### shadcn/ui NOT used initially
**Decision**: Custom primitive components (Badge, Button, Card, ScoreRing) without shadcn.
**Reason**: shadcn's default Radix styling would need constant overriding to match the dense operational design. Primitives built from scratch preserve full design fidelity.

### Zinc color palette as base
**Decision**: Zinc (not slate, not gray) as the neutral palette.
**Reason**: Zinc's warm neutrals feel more grounded for an ops tool. Emerald for success, amber for warning, red for danger, violet for AI-related elements.

### No dark mode
**Decision**: Light mode only.
**Reason**: PRD explicitly prohibits dark AI aesthetic. Light mode keeps the UI practical and easy to scan for operational workflows.

### Score ring instead of score badge
**Decision**: Circular ring component for intent/reputation/fit scores.
**Reason**: Scores are the primary signal in this product; rings convey magnitude at a glance better than flat text or progress bars.

### Platform adapters from day one
**Decision**: `PlatformAdapter` interface defined before any real integration.
**Reason**: Prevents coupling ingestion logic to specific platform APIs; allows mocking in Phase 1/2; forces clean abstraction early.
