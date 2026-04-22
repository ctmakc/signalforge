import { PageShell } from '@/components/layout/page-shell'

const kpis = [
  { label: 'Leads Detected', value: '1,248', trend: '+12%', up: true, icon: 'person_search', color: 'text-[color:var(--color-primary)]', bg: 'bg-[color:var(--color-primary-fixed)]' },
  { label: 'Replies Sent', value: '842', trend: '+8%', up: true, icon: 'chat', color: 'text-[color:var(--color-tertiary)]', bg: 'bg-[color:var(--color-tertiary-fixed)]' },
  { label: 'DM Conversions', value: '156', trend: '+24%', up: true, icon: 'check_circle', color: 'text-[color:var(--color-secondary)]', bg: 'bg-[color:var(--color-secondary-container)]/40' },
  { label: 'Est. Revenue Impact', value: '$14.2k', trend: 'flat', up: null, icon: 'payments', color: 'text-[color:var(--color-on-surface-variant)]', bg: 'bg-[color:var(--color-surface-container-high)]' },
]

const feedItems = [
  {
    icon: 'forum',
    iconBg: 'bg-orange-100 text-orange-600',
    author: 'jeffk_founder',
    action: 'posted in r/SaaS',
    body: '"We are trying to reach SaaS buyers on Reddit and X but keep getting banned. Any tools that actually work and stay under the radar?"',
    time: '2 min ago',
    intent: 94,
    intentHigh: true,
    tags: [
      { label: 'Reddit', cls: 'bg-[color:var(--color-surface-variant)] text-[color:var(--color-on-surface-variant)]' },
      { label: 'High Intent', cls: 'bg-[color:var(--color-error-container)] text-[color:var(--color-on-error-container)]' },
    ],
  },
  {
    icon: 'alternate_email',
    iconBg: 'bg-blue-100 text-blue-600',
    author: 'startup_maria_b',
    action: 'mentioned "cold email alternatives"',
    body: '"Cold email is basically dead in our niche. Been thinking Reddit/communities but not sure how to do it systematically."',
    time: '18 min ago',
    intent: 87,
    intentHigh: true,
    tags: [
      { label: 'Reddit', cls: 'bg-[color:var(--color-surface-variant)] text-[color:var(--color-on-surface-variant)]' },
      { label: 'High Intent', cls: 'bg-[color:var(--color-error-container)] text-[color:var(--color-on-error-container)]' },
    ],
  },
  {
    icon: 'send',
    iconBg: 'bg-sky-100 text-sky-600',
    author: 'dmitry_saas',
    action: 'asked in SaaS Founders Chat',
    body: '"What CRM does everyone use for tracking leads from multiple channels? Trying to consolidate Telegram + Reddit + email into one pipeline."',
    time: '1 hr ago',
    intent: 76,
    intentHigh: false,
    tags: [
      { label: 'Telegram', cls: 'bg-[color:var(--color-surface-variant)] text-[color:var(--color-on-surface-variant)]' },
      { label: 'Medium Intent', cls: 'bg-[color:var(--color-tertiary-fixed)] text-[color:var(--color-on-tertiary-fixed)]' },
    ],
  },
]

const agents = [
  {
    name: 'Scout-Alpha',
    status: 'Running',
    active: true,
    platform: 'Reddit',
    platformIcon: 'forum',
    platformColor: '#FF4500',
    account: 'u/growth_ops_1',
    rate: '185 signals/hr',
    queued: 12,
    reputation: 78,
    progress: 60,
  },
  {
    name: 'Outreach-Bot-01',
    status: 'Running',
    active: true,
    platform: 'Telegram',
    platformIcon: 'send',
    platformColor: '#0088cc',
    account: 'SignalBot Alpha',
    rate: '24 actions/hr',
    queued: 3,
    reputation: 42,
    progress: 35,
  },
  {
    name: 'X-Watcher',
    status: 'Cooling down',
    active: false,
    platform: 'Twitter / X',
    platformIcon: 'tag',
    platformColor: '#1DA1F2',
    account: '@growthacme',
    rate: '14m remaining',
    queued: 0,
    reputation: 61,
    progress: 0,
  },
]

const sources = [
  { label: 'Reddit', pct: 40, color: '#FF4500', count: '499 signals' },
  { label: 'Telegram', pct: 28, color: '#0088cc', count: '349 signals' },
  { label: 'Twitter/X', pct: 20, color: '#1DA1F2', count: '250 signals' },
  { label: 'LinkedIn', pct: 8, color: '#0A66C2', count: '100 signals' },
  { label: 'Other', pct: 4, color: '#c2c6d8', count: '50 signals' },
]

export default function DashboardPage() {
  return (
    <PageShell
      title="Overview"
      subtitle="Real-time performance and active signal streams."
      headerActions={
        <button className="px-4 py-2 bg-[color:var(--color-surface-container-lowest)] border border-[color:var(--color-outline-variant)] rounded text-label-md text-[color:var(--color-on-surface)] flex items-center gap-2 hover:bg-[color:var(--color-surface-container-low)] transition-colors">
          <span className="material-symbols-outlined" style={{ fontSize: 16 }}>calendar_today</span>
          Today
          <span className="material-symbols-outlined" style={{ fontSize: 16 }}>arrow_drop_down</span>
        </button>
      }
    >
      {/* KPIs */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        {kpis.map((kpi) => (
          <div key={kpi.label} className="bg-[color:var(--color-surface-container-lowest)] border border-[color:var(--color-outline-variant)] rounded-lg p-6">
            <div className="flex justify-between items-start mb-4">
              <p className="text-label-md text-[color:var(--color-on-surface-variant)]">{kpi.label}</p>
              <div className={`w-8 h-8 rounded-full ${kpi.bg} flex items-center justify-center ${kpi.color}`}>
                <span className="material-symbols-outlined" style={{ fontSize: 18 }}>{kpi.icon}</span>
              </div>
            </div>
            <div className="flex items-baseline gap-3">
              <h3 className="text-display text-[color:var(--color-on-background)]">{kpi.value}</h3>
              <span className={`text-label-md flex items-center gap-0.5 ${kpi.up === true ? 'text-[color:var(--color-secondary-fixed-dim)]' : 'text-[color:var(--color-outline)]'}`}>
                <span className="material-symbols-outlined" style={{ fontSize: 14 }}>
                  {kpi.up === true ? 'trending_up' : kpi.up === false ? 'trending_down' : 'trending_flat'}
                </span>
                {kpi.trend}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Bento grid */}
      <div className="grid grid-cols-12 gap-6 mb-6">
        {/* Live Signal Feed */}
        <div className="col-span-12 lg:col-span-8 bg-[color:var(--color-surface-container-lowest)] border border-[color:var(--color-outline-variant)] rounded-lg p-6 flex flex-col" style={{ height: 520 }}>
          <div className="flex justify-between items-center mb-6 pb-4 border-b border-[color:var(--color-surface-container-high)] flex-shrink-0">
            <div className="flex items-center gap-2">
              <h2 className="text-h2 text-[color:var(--color-on-background)]">Live Signal Feed</h2>
              <span className="relative flex h-2 w-2 ml-1">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[color:var(--color-primary)] opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[color:var(--color-primary)]" />
              </span>
            </div>
            <button className="text-label-md text-[color:var(--color-primary)] hover:opacity-80 transition-opacity">View All</button>
          </div>
          <div className="flex-1 overflow-y-auto pr-1 space-y-3">
            {feedItems.map((item, i) => (
              <div key={i} className="flex gap-4 p-4 rounded-lg hover:bg-[color:var(--color-surface-container-low)] transition-colors border border-transparent hover:border-[color:var(--color-outline-variant)]/50 cursor-pointer group">
                <div className={`w-10 h-10 rounded-full ${item.iconBg} flex items-center justify-center flex-shrink-0`}>
                  <span className="material-symbols-outlined">{item.icon}</span>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-start mb-1">
                    <p className="text-label-md text-[color:var(--color-on-background)]">
                      <span className="font-bold">{item.author}</span>{' '}
                      <span className="text-[color:var(--color-on-surface-variant)] font-normal">{item.action}</span>
                    </p>
                    <span className="text-code text-[color:var(--color-outline-variant)] ml-4 whitespace-nowrap flex-shrink-0">{item.time}</span>
                  </div>
                  <p className="text-body-md text-[color:var(--color-on-surface-variant)] line-clamp-2 mb-2">{item.body}</p>
                  <div className="flex items-center gap-2">
                    {item.tags.map((tag) => (
                      <span key={tag.label} className={`px-2 py-0.5 ${tag.cls} rounded text-[11px] font-medium uppercase tracking-wider`}>{tag.label}</span>
                    ))}
                    <span className={`ml-auto text-label-md font-bold ${item.intentHigh ? 'text-[color:var(--color-error)]' : 'text-[color:var(--color-tertiary)]'}`}>
                      {item.intent} intent
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Agent Status */}
        <div className="col-span-12 lg:col-span-4 bg-[color:var(--color-surface-container-lowest)] border border-[color:var(--color-outline-variant)] rounded-lg p-6 flex flex-col" style={{ height: 520 }}>
          <div className="flex justify-between items-center mb-6 pb-4 border-b border-[color:var(--color-surface-container-high)] flex-shrink-0">
            <h2 className="text-h2 text-[color:var(--color-on-background)]">Agent Fleet</h2>
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-[color:var(--color-secondary)]" />
              <span className="text-label-md text-[color:var(--color-secondary)]">2 active</span>
            </div>
          </div>

          <div className="space-y-4 flex-1 overflow-y-auto">
            {agents.map((agent) => (
              <div
                key={agent.name}
                className={`p-4 border rounded-lg flex flex-col gap-3 ${
                  agent.active
                    ? 'border-[color:var(--color-outline-variant)] bg-[color:var(--color-surface)]'
                    : 'border-[color:var(--color-outline-variant)]/50 bg-[color:var(--color-surface-container-low)] opacity-70'
                }`}
              >
                {/* Agent header */}
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <div className={`w-2 h-2 rounded-full flex-shrink-0 ${agent.active ? 'bg-[color:var(--color-secondary)]' : 'bg-[color:var(--color-outline)]'}`} />
                    <span className="text-label-md font-semibold text-[color:var(--color-on-background)]">{agent.name}</span>
                  </div>
                  <span className={`px-2 py-0.5 rounded text-[11px] font-medium ${
                    agent.active
                      ? 'bg-[color:var(--color-secondary-container)]/30 text-[color:var(--color-on-secondary-fixed-variant)]'
                      : 'bg-[color:var(--color-surface-container-high)] text-[color:var(--color-on-surface-variant)]'
                  }`}>{agent.status}</span>
                </div>

                {/* Platform + account */}
                <div className="flex items-center gap-2 text-label-md text-[color:var(--color-on-surface-variant)]">
                  <span className="material-symbols-outlined" style={{ fontSize: 14, color: agent.platformColor }}>{agent.platformIcon}</span>
                  <span>{agent.account}</span>
                </div>

                {/* Stats row */}
                <div className="grid grid-cols-2 gap-2 text-center">
                  <div className="bg-[color:var(--color-surface-container-low)] rounded p-2">
                    <p className="text-code text-[color:var(--color-outline)] mb-0.5">{agent.active ? 'Rate' : 'Cooldown'}</p>
                    <p className="text-label-md font-semibold text-[color:var(--color-on-background)]">{agent.rate}</p>
                  </div>
                  <div className="bg-[color:var(--color-surface-container-low)] rounded p-2">
                    <p className="text-code text-[color:var(--color-outline)] mb-0.5">Queued</p>
                    <p className={`text-label-md font-semibold ${agent.queued > 0 ? 'text-[color:var(--color-primary)]' : 'text-[color:var(--color-outline)]'}`}>{agent.queued}</p>
                  </div>
                </div>

                {/* Reputation + progress */}
                {agent.active && (
                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-code text-[color:var(--color-outline)]">Account health</span>
                      <span className={`text-code font-medium ${agent.reputation >= 70 ? 'text-[color:var(--color-secondary)]' : agent.reputation >= 50 ? 'text-[color:var(--color-tertiary)]' : 'text-[color:var(--color-error)]'}`}>{agent.reputation}%</span>
                    </div>
                    <div className="w-full bg-[color:var(--color-surface-container-high)] h-1.5 rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full ${agent.reputation >= 70 ? 'bg-[color:var(--color-secondary)]' : agent.reputation >= 50 ? 'bg-[color:var(--color-tertiary)]' : 'bg-[color:var(--color-error)]'}`}
                        style={{ width: `${agent.progress}%` }}
                      />
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          <button className="w-full mt-4 py-2 border border-[color:var(--color-outline-variant)] text-[color:var(--color-on-surface-variant)] rounded text-label-md hover:bg-[color:var(--color-surface-container-low)] transition-colors flex items-center justify-center gap-2 flex-shrink-0">
            <span className="material-symbols-outlined" style={{ fontSize: 16 }}>tune</span>
            Manage Fleet
          </button>
        </div>
      </div>

      {/* Source distribution */}
      <div className="bg-[color:var(--color-surface-container-lowest)] border border-[color:var(--color-outline-variant)] rounded-lg p-6">
        <div className="flex justify-between items-center mb-6 pb-4 border-b border-[color:var(--color-surface-container-high)]">
          <div>
            <h2 className="text-h2 text-[color:var(--color-on-background)]">Signal Source Distribution</h2>
            <p className="text-body-md text-[color:var(--color-on-surface-variant)] mt-1">Volume of actionable leads by platform (Last 24h)</p>
          </div>
          <span className="text-label-md text-[color:var(--color-on-surface-variant)]">1,248 total</span>
        </div>
        <div className="flex flex-col gap-6">
          <div className="w-full h-8 flex rounded overflow-hidden shadow-sm">
            {sources.map((s) => (
              <div
                key={s.label}
                className="h-full flex items-center justify-center text-[11px] font-semibold"
                style={{ width: `${s.pct}%`, backgroundColor: s.color, color: s.label === 'Other' ? '#131b2e' : 'white' }}
                title={`${s.label} (${s.pct}%)`}
              >
                {s.pct >= 10 ? `${s.pct}%` : ''}
              </div>
            ))}
          </div>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {sources.map((s) => (
              <div key={s.label} className="flex items-center gap-3">
                <div className="w-3 h-3 rounded-sm flex-shrink-0" style={{ backgroundColor: s.color }} />
                <div>
                  <p className="text-label-md text-[color:var(--color-on-background)]">{s.label}</p>
                  <p className="text-code text-[color:var(--color-outline)]">{s.count}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </PageShell>
  )
}
