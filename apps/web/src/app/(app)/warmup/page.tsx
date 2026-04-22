import { PageShell } from '@/components/layout/page-shell'

const accounts = [
  {
    name: 'u/growth_ops_1',
    platform: 'Reddit',
    icon: 'forum',
    color: '#FF4500',
    status: 'Ready',
    statusIcon: 'check_circle',
    statusCls: 'bg-[color:var(--color-secondary-container)]/40 text-[color:var(--color-secondary)]',
    warmupPhase: 5,
    warmupTotal: 5,
    reputation: 78,
    risk: 12,
    daily: { done: 24, limit: 40 },
    karma: 1847,
    age: '4 months',
    aiSummary: 'Account is fully warmed and operating at capacity. Low risk profile. Safe for public replies and DMs.',
  },
  {
    name: 'SignalBot Alpha',
    platform: 'Telegram',
    icon: 'send',
    color: '#0088cc',
    status: 'Warming',
    statusIcon: 'local_fire_department',
    statusCls: 'bg-[color:var(--color-tertiary-fixed)] text-[color:var(--color-tertiary)]',
    warmupPhase: 3,
    warmupTotal: 5,
    reputation: 42,
    risk: 8,
    daily: { done: 7, limit: 20 },
    karma: null,
    age: '3 weeks',
    aiSummary: 'Phase 3 of 5 warmup. Gradually increasing message volume. On track to reach Ready status in ~12 days.',
  },
  {
    name: '@growthacme',
    platform: 'Twitter / X',
    icon: 'tag',
    color: '#1DA1F2',
    status: 'At Risk',
    statusIcon: 'warning',
    statusCls: 'bg-[color:var(--color-error-container)] text-[color:var(--color-error)]',
    warmupPhase: 4,
    warmupTotal: 5,
    reputation: 61,
    risk: 45,
    daily: { done: 3, limit: 15 },
    karma: null,
    age: '2 months',
    aiSummary: 'Elevated risk score detected. Recommend pausing outreach for 48h and reviewing recent action patterns.',
  },
]

const scheduled = [
  { type: 'upvote', target: 'r/SaaS — "Best outreach tools 2025?"', account: 'u/growth_ops_1', time: 'in 8m', icon: 'thumb_up' },
  { type: 'comment', target: 'r/entrepreneur — Weekly growth thread', account: 'u/growth_ops_1', time: 'in 22m', icon: 'chat_bubble' },
  { type: 'message', target: 'SaaS Founders Chat — pinned post', account: 'SignalBot Alpha', time: 'in 41m', icon: 'send' },
  { type: 'upvote', target: 'r/startups — AMA post by @y_combinator', account: 'u/growth_ops_1', time: 'in 55m', icon: 'thumb_up' },
  { type: 'join', target: 'Telegram: B2B SaaS Operators', account: 'SignalBot Alpha', time: 'in 1h 20m', icon: 'group_add' },
]

const recent = [
  { type: 'upvote', target: 'r/SaaS post about pricing models', account: 'u/growth_ops_1', time: '4m ago', icon: 'thumb_up', ok: true },
  { type: 'comment', target: 'r/entrepreneur growth discussion', account: 'u/growth_ops_1', time: '19m ago', icon: 'chat_bubble', ok: true },
  { type: 'join', target: 'Telegram: SaaS Operators Hub', account: 'SignalBot Alpha', time: '35m ago', icon: 'group_add', ok: true },
  { type: 'like', target: 'X post by @saas_founder_dao', account: '@growthacme', time: '1h ago', icon: 'favorite', ok: false },
  { type: 'comment', target: 'r/startups pricing thread', account: 'u/growth_ops_1', time: '2h ago', icon: 'chat_bubble', ok: true },
  { type: 'upvote', target: 'r/SaaS cold outreach debate', account: 'u/growth_ops_1', time: '3h ago', icon: 'thumb_up', ok: true },
]

const warmupPhaseLabels = ['Observe', 'Like', 'Comment', 'Post', 'Outreach']

function ReputationRing({ value, risk }: { value: number; risk: boolean }) {
  const color = risk
    ? 'text-[color:var(--color-error)]'
    : value >= 70
    ? 'text-[color:var(--color-secondary)]'
    : value >= 50
    ? 'text-[color:var(--color-tertiary)]'
    : 'text-[color:var(--color-outline)]'

  const barColor = risk
    ? 'bg-[color:var(--color-error)]'
    : value >= 70
    ? 'bg-[color:var(--color-secondary)]'
    : value >= 50
    ? 'bg-[color:var(--color-tertiary)]'
    : 'bg-[color:var(--color-outline)]'

  return (
    <div>
      <div className="h-1.5 w-full bg-[color:var(--color-surface-container-high)] rounded-full overflow-hidden">
        <div className={`h-full rounded-full ${barColor}`} style={{ width: `${value}%` }} />
      </div>
      <span className={`text-label-md font-bold ${color}`}>{value}%</span>
    </div>
  )
}

export default function WarmupPage() {
  return (
    <PageShell
      title="Reputation Engine"
      subtitle="Control account warmup and monitor connection health."
      headerActions={
        <div className="flex gap-3">
          <button className="flex items-center gap-2 px-4 py-2 bg-[color:var(--color-surface-container-lowest)] border border-[color:var(--color-outline-variant)] rounded text-label-md hover:bg-[color:var(--color-surface-container-low)] transition-colors text-[color:var(--color-on-surface)]">
            <span className="material-symbols-outlined" style={{ fontSize: 18 }}>schedule</span>
            Schedule
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-[color:var(--color-primary)] text-[color:var(--color-on-primary)] rounded text-label-md hover:opacity-90 transition-opacity shadow-sm">
            <span className="material-symbols-outlined" style={{ fontSize: 18 }}>add</span>
            Add Account
          </button>
        </div>
      }
    >
      <div className="grid grid-cols-12 gap-6">
        {/* Account cards */}
        <div className="col-span-12 lg:col-span-5 space-y-4">
          {accounts.map((acc) => (
            <div key={acc.name} className="bg-[color:var(--color-surface-container-lowest)] border border-[color:var(--color-outline-variant)] rounded-xl p-5 shadow-sm">
              {/* Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0" style={{ backgroundColor: `${acc.color}18` }}>
                    <span className="material-symbols-outlined" style={{ fontSize: 20, color: acc.color }}>{acc.icon}</span>
                  </div>
                  <div>
                    <p className="text-body-md font-semibold text-[color:var(--color-on-background)]">{acc.name}</p>
                    <p className="text-label-md text-[color:var(--color-on-surface-variant)]">{acc.platform} · {acc.age}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className={`${acc.statusCls} text-label-md px-2 py-1 rounded-full flex items-center gap-1`}>
                    <span className="material-symbols-outlined" style={{ fontSize: 13 }}>{acc.statusIcon}</span>
                    {acc.status}
                  </span>
                  <button className="p-1 text-[color:var(--color-on-surface-variant)] hover:bg-[color:var(--color-surface-container)] rounded transition-colors">
                    <span className="material-symbols-outlined" style={{ fontSize: 18 }}>more_vert</span>
                  </button>
                </div>
              </div>

              {/* Warmup phase track */}
              <div className="mb-4">
                <div className="flex justify-between mb-2">
                  <span className="text-label-md text-[color:var(--color-on-surface-variant)]">Warmup Phase</span>
                  <span className="text-label-md font-semibold text-[color:var(--color-on-surface)]">{acc.warmupPhase}/{acc.warmupTotal}</span>
                </div>
                <div className="flex gap-1">
                  {warmupPhaseLabels.map((label, i) => (
                    <div key={label} className="flex-1 flex flex-col items-center gap-1">
                      <div className={`w-full h-1.5 rounded-full ${i < acc.warmupPhase ? 'bg-[color:var(--color-primary)]' : 'bg-[color:var(--color-surface-container-high)]'}`} />
                      <span className="text-[color:var(--color-outline)]" style={{ fontSize: 9 }}>{label}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Scores */}
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-label-md text-[color:var(--color-on-surface-variant)]">Reputation</span>
                  </div>
                  <ReputationRing value={acc.reputation} risk={false} />
                </div>
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-label-md text-[color:var(--color-on-surface-variant)]">Risk</span>
                  </div>
                  <ReputationRing value={acc.risk} risk={acc.risk > 30} />
                </div>
              </div>

              {/* Daily progress */}
              <div className="mb-4">
                <div className="flex justify-between mb-1">
                  <span className="text-label-md text-[color:var(--color-on-surface-variant)]">Daily actions</span>
                  <span className="text-label-md text-[color:var(--color-on-surface)]">{acc.daily.done} / {acc.daily.limit}</span>
                </div>
                <div className="h-2 bg-[color:var(--color-surface-container-high)] rounded-full overflow-hidden">
                  <div
                    className="h-full bg-[color:var(--color-primary)] rounded-full"
                    style={{ width: `${(acc.daily.done / acc.daily.limit) * 100}%` }}
                  />
                </div>
              </div>

              {/* AI note */}
              <div className="bg-[color:var(--color-primary-fixed)]/20 border border-[color:var(--color-primary-fixed)] rounded-lg px-3 py-2 mb-4">
                <p className="text-body-md text-[color:var(--color-on-surface)]" style={{ fontSize: 12 }}>{acc.aiSummary}</p>
              </div>

              {/* Actions */}
              <div className="flex gap-2">
                <button className="flex-1 py-1.5 text-label-md border border-[color:var(--color-outline-variant)] text-[color:var(--color-on-surface)] rounded hover:bg-[color:var(--color-surface-container-low)] transition-colors flex items-center justify-center gap-1">
                  <span className="material-symbols-outlined" style={{ fontSize: 15 }}>settings</span>
                  Configure
                </button>
                <button className="flex-1 py-1.5 text-label-md border border-[color:var(--color-outline-variant)] text-[color:var(--color-on-surface)] rounded hover:bg-[color:var(--color-surface-container-low)] transition-colors flex items-center justify-center gap-1">
                  <span className="material-symbols-outlined" style={{ fontSize: 15 }}>pause</span>
                  Pause
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Feeds */}
        <div className="col-span-12 lg:col-span-7 flex flex-col gap-6">
          {/* Scheduled */}
          <div className="bg-[color:var(--color-surface-container-lowest)] border border-[color:var(--color-outline-variant)] rounded-xl overflow-hidden shadow-sm">
            <div className="px-6 py-4 border-b border-[color:var(--color-outline-variant)] flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[color:var(--color-tertiary)]" style={{ fontSize: 18 }}>schedule</span>
                <h3 className="text-h2 text-[color:var(--color-on-background)]">Scheduled Actions</h3>
              </div>
              <span className="px-2 py-0.5 bg-[color:var(--color-tertiary-fixed)] text-[color:var(--color-on-tertiary-fixed)] rounded-full text-label-md">{scheduled.length} pending</span>
            </div>
            {scheduled.map((a, i) => (
              <div key={i} className="flex items-center gap-4 px-6 py-3.5 border-b border-[color:var(--color-surface-container-high)] last:border-0 hover:bg-[color:var(--color-surface-container-low)] transition-colors">
                <div className="w-8 h-8 rounded-full bg-[color:var(--color-tertiary-fixed)] flex items-center justify-center flex-shrink-0">
                  <span className="material-symbols-outlined text-[color:var(--color-on-tertiary-fixed)]" style={{ fontSize: 15 }}>{a.icon}</span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-body-md font-medium text-[color:var(--color-on-background)] capitalize">{a.type}</p>
                  <p className="text-code text-[color:var(--color-outline)] truncate">{a.target}</p>
                </div>
                <div className="text-right flex-shrink-0">
                  <p className="text-label-md text-[color:var(--color-on-surface-variant)]">{a.account}</p>
                  <p className="text-label-md text-[color:var(--color-tertiary)] font-medium">{a.time}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Recent */}
          <div className="bg-[color:var(--color-surface-container-lowest)] border border-[color:var(--color-outline-variant)] rounded-xl overflow-hidden shadow-sm">
            <div className="px-6 py-4 border-b border-[color:var(--color-outline-variant)] flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[color:var(--color-secondary)]" style={{ fontSize: 18 }}>history</span>
                <h3 className="text-h2 text-[color:var(--color-on-background)]">Recent Actions</h3>
              </div>
              <span className="px-2 py-0.5 bg-[color:var(--color-secondary-container)]/30 text-[color:var(--color-secondary)] rounded-full text-label-md">{recent.length} today</span>
            </div>
            {recent.map((a, i) => (
              <div key={i} className="flex items-center gap-4 px-6 py-3.5 border-b border-[color:var(--color-surface-container-high)] last:border-0 hover:bg-[color:var(--color-surface-container-low)] transition-colors">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${a.ok ? 'bg-[color:var(--color-secondary-container)]/30' : 'bg-[color:var(--color-error-container)]'}`}>
                  <span className={`material-symbols-outlined ${a.ok ? 'text-[color:var(--color-secondary)]' : 'text-[color:var(--color-error)]'}`} style={{ fontSize: 15 }}>{a.icon}</span>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <p className="text-body-md font-medium text-[color:var(--color-on-background)] capitalize">{a.type}</p>
                    {!a.ok && (
                      <span className="text-label-md text-[color:var(--color-error)] flex items-center gap-0.5" style={{ fontSize: 10 }}>
                        <span className="material-symbols-outlined" style={{ fontSize: 12 }}>warning</span>
                        flagged
                      </span>
                    )}
                  </div>
                  <p className="text-code text-[color:var(--color-outline)] truncate">{a.target}</p>
                </div>
                <div className="text-right flex-shrink-0">
                  <p className="text-label-md text-[color:var(--color-on-surface-variant)]">{a.account}</p>
                  <p className="text-label-md text-[color:var(--color-outline)]">{a.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </PageShell>
  )
}
