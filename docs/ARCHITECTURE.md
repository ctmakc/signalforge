# Architecture

## Overview

SignalForge is a monorepo SaaS application for multi-platform lead intelligence and outreach.

```
Browser
  └─ Next.js App Router (apps/web)
       ├─ /app/(app)/*        — authenticated UI routes
       ├─ /app/api/*          — route handlers (REST-like)
       └─ /lib/adapters/*     — platform adapter layer
           ├─ RedditAdapter
           ├─ TelegramAdapter
           ├─ XAdapter
           └─ FacebookAdapter

Postgres (Prisma) ← ── Prisma Client ── ← Next.js API layer

Redis ← BullMQ ← Queue workers (ingestion, scoring, warmup, analytics)

Object Storage (S3-compatible) ← log snapshots, attachments
```

## Key subsystems

### 1. Signal detection pipeline
1. Ingestion job fetches raw content from source adapters
2. Content item stored in `ContentItem`
3. Scoring service evaluates intent/urgency/fit → creates `Signal`
4. Signal available in detection feed for operator review

### 2. Engagement workflow
1. Operator selects signal from feed
2. AI generates reply variants (via AI service abstraction)
3. Operator edits + approves (or auto-send if policy allows)
4. Reply dispatched via account adapter
5. `ThreadEngagement` created with status

### 3. DM pipeline
1. Lead invited to DM after public engagement (or directly)
2. `DmConversation` created, linked to `Lead`
3. Inbound messages ingested continuously
4. AI suggests reply at each turn
5. Operator sends or auto-sends per policy
6. Lead stage updated in `Lead.pipelineStage`

### 4. Warmup engine
1. `WarmupPlan` defines targets, schedule, tone
2. Scheduler generates `WarmupAction` records daily
3. Worker executes actions with humanized delays
4. `ConnectedAccount.reputationScore` updated after each batch

## Permissions

Route guards enforce `Role` at both page level (middleware) and API level (handler).

| Role     | Access                                          |
|----------|-------------------------------------------------|
| OWNER    | Everything including billing and team management|
| ADMIN    | Everything except billing ownership             |
| OPERATOR | Signals, replies, DMs, pipeline                 |
| ANALYST  | Sources, analytics, signal rules (read-heavy)   |

## Adapter interface

```ts
interface PlatformAdapter {
  connectAccount(): Promise<void>
  disconnectAccount(): Promise<void>
  validateConnection(): Promise<AccountHealth>
  listSources(query: SourceQuery): Promise<SourceResult[]>
  joinSource(sourceId: string): Promise<void>
  ingestContent(source: Source): Promise<ContentItem[]>
  publishReply(input: PublishReplyInput): Promise<PublishResult>
  openDm(input: OpenDmInput): Promise<ConversationRef>
  sendDm(input: SendDmInput): Promise<MessageResult>
  fetchConversation(ref: ConversationRef): Promise<ConversationData>
}
```
