# Design Mapping

Maps every product screen to its route and component breakdown.

---

## Screen: Dashboard
- Route: `/dashboard`
- Components:
  - `KPICard` — stat blocks (leads, signals, replies, DMs, accounts, risk)
  - `SignalsTable` — top signals today with inline scores and actions
  - `AccountHealthRow` — per-account health strip
  - `ActivityFeed` — timestamped event list
- Notes:
  - Dense operational layout, not a marketing dashboard
  - KPI row is 6-column at xl, 3-column at lg, 2-column below
  - Score rings use color tiers: emerald ≥80, amber 60–79, orange 40–59, red <40

---

## Screen: Accounts Hub
- Route: `/accounts`
- Components:
  - `AccountsStatRow` — 4-stat summary (connected/warming/at-risk/disconnected)
  - `AccountsTable` — platform, auth, warmup, health, reputation score, risk score, limit, last seen
  - `AccountDrawer` (future) — detail/edit panel
  - `ConnectAccountModal` (future)
- Notes:
  - Health status chips use consistent color system
  - Reputation score shown as ring (higher = better); risk score inverted for display

---

## Screen: Signal Sources
- Route: `/sources`
- Components:
  - `SourcesStatRow` — active/paused/signals-today/platforms
  - `SourcesTable` — platform, type, tags, priority, signal count, status, join status
  - `AddSourceModal` (future)
  - `SourceRuleEditor` (future)

---

## Screen: Reputation Engine / Warmup
- Route: `/warmup`
- Components:
  - `AccountWarmupCard` — per-account reputation/risk rings, progress bar, controls
  - `ScheduledActionsPanel` — upcoming queued warmup actions
  - `RecentActionsPanel` — completed actions feed

---

## Screen: Lead Detection Feed
- Route: `/signals`
- Components:
  - `SignalFilterBar` — filter by status/score/platform
  - `SignalRow` — score ring, author, body excerpt, AI summary strip, score breakdown, action buttons
- Notes:
  - AI summary strip uses violet accent
  - Primary actions: Engage, DM, Save, Dismiss
  - Dense stream layout — no cards, table-like rows

---

## Screen: Engagement Composer
- Route: `/engagement`
- Components:
  - `SourcePostPanel` — left side: original post with context
  - `AIAnalysisPanel` — AI summary, scores, need, recommended action
  - `ReplyVariants` — 3 AI-generated reply options with tone labels and risk flags
  - `ReplyEditor` — editable textarea + tone selector + Approve & Send
- Notes:
  - Two-column side-by-side layout
  - Approve & Send requires explicit confirmation when policy requires it

---

## Screen: DM Pipeline
- Route: `/pipeline`
- Components:
  - `KanbanBoard` — 7 columns (New → Won/Lost)
  - `LeadCard` — platform icon, score, tags, temperature, value, last interaction
  - `ConversationDrawer` (future) — DM thread + AI assist
- Notes:
  - Horizontal scroll on smaller screens
  - Column headers use stage-specific color accents

---

## Screen: Automation & Agents
- Route: `/automation`
- Components:
  - `ModeSelector` — Manual / Assisted / Autopilot selection cards
  - `PolicyToggleList` — approval/automation policy switches with risk labels
  - `QueueStatsPanel` — pending/scheduled/processing/completed counts
  - `RateLimitsPanel` — per-platform limits
  - `QuietHoursBar` — visual quiet hours indicator

---

## Screen: Analytics
- Route: `/analytics`
- Components:
  - `KPIRow` — 4 top metrics with trend indicators
  - `ConversionFunnel` — stage-by-stage funnel with bar visualization
  - `SourcePerformanceTable` — signals/replies/conversions per source
  - `PlatformMetricsCard` — rates and timing metrics
  - `KeywordBarsCard` — top intent keywords

---

## Screen: Settings
- Route: `/settings`
- Components:
  - `SettingsSidenav` — section navigation
  - `WorkspaceForm` — workspace name/slug/plan
  - `ProfileForm` — user profile fields
  - `RiskControlsForm` — global safety limits
