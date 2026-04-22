import { PageShell } from '@/components/layout/page-shell'

const accounts = [
  {
    name: '@alex_outreach',
    platform: 'Telegram',
    icon: 'send',
    color: '#0088cc',
    status: 'Active',
    statusCls: 'bg-[color:var(--color-secondary)] text-[color:var(--color-on-secondary)]',
    reputation: 84,
    risk: 12,
    daily: { done: 18, limit: 30 },
  },
  {
    name: '@tech_founder_ai',
    platform: 'Twitter',
    icon: 'tag',
    color: '#1DA1F2',
    status: 'Warming',
    statusCls: 'bg-[color:var(--color-tertiary-fixed)] text-[color:var(--color-on-tertiary-fixed)]',
    reputation: 52,
    risk: 34,
    daily: { done: 7, limit: 15 },
  },
  {
    name: 'u/growth_ops',
    platform: 'Reddit',
    icon: 'forum',
    color: '#FF4500',
    status: 'Limited',
    statusCls: 'bg-[color:var(--color-surface-container-high)] text-[color:var(--color-on-surface-variant)]',
    reputation: 38,
    risk: 61,
    daily: { done: 3, limit: 8 },
  },
]

const scheduled = [
  { type: 'comment', target: 'r/entrepreneur weekly thread', account: 'u/growth_ops', time: 'in 12m' },
  { type: 'like', target: 'TG message in SaaS Founders Chat', account: '@alex_outreach', time: 'in 28m' },
  { type: 'upvote', target: 'r/startups AMA post', account: 'u/growth_ops', time: 'in 45m' },
  { type: 'join', target: 'Telegram: SaaS Ops Hub', account: '@tech_founder_ai', time: 'in 1h 10m' },
]

const recent = [
  { type: 'upvote', target: 'r/SaaS post about pricing models', account: 'u/growth_ops', time: '2m ago' },
  { type: 'comment', target: 'r/entrepreneur growth discussion', account: 'u/growth_ops', time: '18m ago' },
  { type: 'join', target: 'Telegram: SaaS Operators Hub', account: '@alex_outreach', time: '34m ago' },
  { type: 'like', target: 'X post by @saas_founder_dao', account: '@tech_founder_ai', time: '1h ago' },
  { type: 'comment', target: 'r/startups pricing thread', account: 'u/growth_ops', time: '2h ago' },
  { type: 'upvote', target: 'r/SaaS cold outreach debate', account: '@alex_outreach', time: '3h ago' },
]

const typeIcon: Record<string, string> = {
  upvote: 'thumb_up',
  comment: 'chat_bubble',
  like: 'favorite',
  join: 'group_add',
}

function ScoreBar({ value, color }: { value: number; color: string }) {
  return (
    <div>
      <div className="flex justify-between items-center mb-1">
        <span className="text-[color:var(--color-on-surface-variant)] text-label-md" style={{ fontSize: 10 }}>
          {value}%
        </span>
      </div>
      <div className="h-1.5 w-full bg-[color:var(--color-surface-container-high)] rounded-full overflow-hidden">
        <div className="h-full rounded-full" style={{ width: `${value}%`, backgroundColor: color }} />
      </div>
    </div>
  )
}

export default function WarmupPage() {
  return (
    <PageShell
      title="Reputation Engine"
      subtitle="Control account warmup and monitor connection health."
      headerActions={
        <button className="flex items-center gap-2 px-4 py-2 bg-[color:var(--color-primary)] text-[color:var(--color-on-primary)] rounded text-label-md hover:opacity-90 transition-opacity shadow-sm">
          <span className="material-symbols-outlined" style={{ fontSize: 18 }}>add</span>
          Add Account
        </button>
      }
    >
      <div className="grid grid-cols-12 gap-6">
        {/* Account cards */}
        <div className="col-span-4 space-y-4">
          {accounts.map((acc) => (
            <div
              key={acc.name}
              className="bg-[color:var(--color-surface-container-lowest)] border border-[color:var(--color-outline-variant)] rounded-xl p-5 shadow-sm"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full flex items-center justify-center" style={{ backgroundColor: `${acc.color}15`, color: acc.color }}>
                    <span className="material-symbols-outlined" style={{ fontSize: 20 }}>{acc.icon}</span>
                  </div>
                  <div>
                    <p className="text-body-md font-semibold text-[color:var(--color-on-background)]">{acc.name}</p>
                    <p className="text-label-md text-[color:var(--color-on-surface-variant)] uppercase tracking-wider">{acc.platform}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className={`${acc.statusCls} text-label-md px-2 py-1 rounded-full`}>{acc.status}</span>
                  <button className="p-1 text-[color:var(--color-on-surface-variant)] hover:bg-[color:var(--color-surface-container)] rounded transition-colors">
                    <span className="material-symbols-outlined" style={{ fontSize: 18 }}>more_vert</span>
                  </button>
                </div>
              </div>

              <div className="space-y-3 mb-4">
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-label-md text-[color:var(--color-on-surface-variant)]">Reputation</span>
                    <span className="text-label-md font-semibold text-[color:var(--color-secondary)]">{acc.reputation}%</span>
                  </div>
                  <ScoreBar value={acc.reputation} color="var(--color-secondary)" />
                </div>
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-label-md text-[color:var(--color-on-surface-variant)]">Risk level</span>
                    <span className={`text-label-md font-semibold ${acc.risk > 50 ? 'text-[color:var(--color-error)]' : 'text-[color:var(--color-outline)]'}`}>{acc.risk}%</span>
                  </div>
                  <ScoreBar value={acc.risk} color={acc.risk > 50 ? 'var(--color-error)' : 'var(--color-outline)'} />
                </div>
              </div>

              <div>
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

              <div className="flex gap-2 mt-4 pt-3 border-t border-[color:var(--color-outline-variant)]">
                <button className="flex-1 py-1.5 text-label-md border border-[color:var(--color-outline-variant)] text-[color:var(--color-on-surface)] rounded hover:bg-[color:var(--color-surface-container-low)] transition-colors flex items-center justify-center gap-1">
                  <span className="material-symbols-outlined" style={{ fontSize: 16 }}>settings</span>
                  Configure
                </button>
                <button className="flex-1 py-1.5 text-label-md border border-[color:var(--color-outline-variant)] text-[color:var(--color-on-surface)] rounded hover:bg-[color:var(--color-surface-container-low)] transition-colors flex items-center justify-center gap-1">
                  <span className="material-symbols-outlined" style={{ fontSize: 16 }}>pause</span>
                  Pause
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Scheduled + Recent */}
        <div className="col-span-8 space-y-6">
          {/* Scheduled */}
          <div className="bg-[color:var(--color-surface-container-lowest)] border border-[color:var(--color-outline-variant)] rounded-xl overflow-hidden shadow-sm">
            <div className="px-6 py-4 border-b border-[color:var(--color-outline-variant)] flex items-center justify-between">
              <h3 className="text-h2 text-[color:var(--color-on-background)]">Scheduled Actions</h3>
              <span className="px-2 py-0.5 bg-[color:var(--color-tertiary-fixed)] text-[color:var(--color-on-tertiary-fixed)] rounded-full text-label-md">{scheduled.length}</span>
            </div>
            {scheduled.map((a, i) => (
              <div key={i} className="flex items-center gap-4 px-6 py-3 border-b border-[color:var(--color-surface-container-high)] last:border-0 hover:bg-[color:var(--color-surface-container-low)] transition-colors">
                <div className="w-8 h-8 rounded-full bg-[color:var(--color-tertiary-fixed)] flex items-center justify-center flex-shrink-0">
                  <span className="material-symbols-outlined text-[color:var(--color-on-tertiary-fixed)]" style={{ fontSize: 16 }}>{typeIcon[a.type] ?? 'schedule'}</span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-body-md text-[color:var(--color-on-background)] font-medium capitalize">{a.type}</p>
                  <p className="text-code text-[color:var(--color-outline)] truncate">{a.target}</p>
                </div>
                <div className="text-right flex-shrink-0">
                  <p className="text-label-md text-[color:var(--color-on-surface-variant)]">{a.account}</p>
                  <p className="text-label-md text-[color:var(--color-tertiary)]">{a.time}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Recent */}
          <div className="bg-[color:var(--color-surface-container-lowest)] border border-[color:var(--color-outline-variant)] rounded-xl overflow-hidden shadow-sm">
            <div className="px-6 py-4 border-b border-[color:var(--color-outline-variant)] flex items-center justify-between">
              <h3 className="text-h2 text-[color:var(--color-on-background)]">Recent Actions</h3>
              <span className="px-2 py-0.5 bg-[color:var(--color-secondary-container)]/30 text-[color:var(--color-secondary)] rounded-full text-label-md">{recent.length} today</span>
            </div>
            {recent.map((a, i) => (
              <div key={i} className="flex items-center gap-4 px-6 py-3 border-b border-[color:var(--color-surface-container-high)] last:border-0 hover:bg-[color:var(--color-surface-container-low)] transition-colors">
                <div className="w-8 h-8 rounded-full bg-[color:var(--color-secondary-container)]/30 flex items-center justify-center flex-shrink-0">
                  <span className="material-symbols-outlined text-[color:var(--color-secondary)]" style={{ fontSize: 16 }}>{typeIcon[a.type] ?? 'check_circle'}</span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-body-md text-[color:var(--color-on-background)] font-medium capitalize">{a.type}</p>
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
