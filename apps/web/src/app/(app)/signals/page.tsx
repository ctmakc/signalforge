import { PageShell } from '@/components/layout/page-shell'

const feedItems = [
  {
    name: 'jeffk_founder',
    role: 'Founder @ Buildfast Labs',
    time: '22 mins ago',
    platform: 'Reddit',
    platformIcon: 'forum',
    platformColor: '#FF4500',
    source: 'r/SaaS',
    intent: 94,
    urgency: 88,
    fit: 92,
    intentLevel: 'high' as const,
    body: 'We are trying to reach SaaS buyers on Reddit and X but keep getting banned. Any tools that actually work and stay under the radar? Would pay good money for something reliable.',
    tags: ['#RedditOutreach', '#SaaS', '#BanPrevention'],
    aiSummary: 'Founder explicitly searching for outreach automation with platform safety requirements.',
    extractedNeed: 'Reddit + X outreach with account safety',
    recommendedAction: 'Engage with value reply + soft pitch',
  },
  {
    name: 'startup_maria_b',
    role: 'Co-founder @ Proxima',
    time: '47 mins ago',
    platform: 'Reddit',
    platformIcon: 'forum',
    platformColor: '#FF4500',
    source: 'r/entrepreneur',
    intent: 87,
    urgency: 72,
    fit: 89,
    intentLevel: 'high' as const,
    body: 'Cold email is basically dead in our niche. Looking for alternatives that don\'t feel spammy. Been thinking Reddit/communities but not sure how to do it systematically.',
    tags: ['#ColdEmail', '#LeadGen', '#Community'],
    aiSummary: 'Founder actively looking for cold email alternatives, open to community outreach.',
    extractedNeed: 'Alternative to cold email for lead generation',
    recommendedAction: 'Reply with community outreach methodology',
  },
  {
    name: 'dmitry_saas',
    role: 'Head of Growth @ Wavespace',
    time: '1 hr 35 mins ago',
    platform: 'Telegram',
    platformIcon: 'send',
    platformColor: '#0088cc',
    source: 'SaaS Founders Chat',
    intent: 76,
    urgency: 61,
    fit: 83,
    intentLevel: 'medium' as const,
    body: 'What CRM does everyone use for tracking leads from multiple channels? Trying to consolidate Telegram + Reddit + email into one pipeline.',
    tags: ['#CRM', '#Pipeline', '#MultiChannel'],
    aiSummary: 'Founder looking for multi-channel CRM with pipeline management.',
    extractedNeed: 'Multi-channel lead pipeline management',
    recommendedAction: 'DM with product positioning',
  },
]

function ScorePill({ label, value, color }: { label: string; value: number; color: string }) {
  return (
    <div className={`flex flex-col items-center px-3 py-1.5 rounded ${color}`}>
      <span className="text-[10px] font-medium opacity-70 uppercase tracking-wider leading-none mb-0.5">{label}</span>
      <span className="text-label-md font-bold leading-none">{value}</span>
    </div>
  )
}

function intentAccent(level: string) {
  if (level === 'high') return 'bg-[color:var(--color-error)]'
  return 'bg-[color:var(--color-secondary-container)]'
}

export default function SignalsPage() {
  return (
    <PageShell
      title="Live Signal Feed"
      subtitle="Real-time detection of high-intent prospects across channels."
      headerActions={
        <div className="flex gap-3">
          <button className="flex items-center gap-2 px-4 py-2 bg-[color:var(--color-surface-container)] border border-[color:var(--color-outline-variant)] rounded text-label-md hover:bg-[color:var(--color-surface-container-high)] transition-colors text-[color:var(--color-on-surface)]">
            <span className="material-symbols-outlined" style={{ fontSize: 18 }}>tune</span>
            Manage Rules
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-[color:var(--color-primary)] text-[color:var(--color-on-primary)] rounded text-label-md hover:opacity-90 transition-opacity">
            <span className="material-symbols-outlined" style={{ fontSize: 18 }}>play_arrow</span>
            Start Auto-Engage
          </button>
        </div>
      }
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Filter sidebar */}
        <aside className="hidden lg:block col-span-3 bg-[color:var(--color-surface)] border border-[color:var(--color-outline-variant)] rounded-lg p-4 sticky top-24">
          <div className="flex items-center justify-between mb-4 border-b border-[color:var(--color-outline-variant)]/50 pb-2">
            <h3 className="text-h2 text-[color:var(--color-on-background)]">Filters</h3>
            <button className="text-label-md text-[color:var(--color-primary)] hover:underline">Reset</button>
          </div>

          <div className="mb-6">
            <h4 className="text-label-md text-[color:var(--color-on-surface-variant)] mb-3 uppercase tracking-wider">Platform</h4>
            <div className="space-y-2">
              {[
                { label: 'Reddit', icon: 'forum', color: '#FF4500', checked: true },
                { label: 'Telegram', icon: 'send', color: '#0088cc', checked: true },
                { label: 'Twitter / X', icon: 'tag', color: '#1DA1F2', checked: false },
                { label: 'LinkedIn', icon: 'work', color: '#0A66C2', checked: false },
              ].map((p) => (
                <label key={p.label} className="flex items-center gap-3 cursor-pointer group">
                  <input defaultChecked={p.checked} type="checkbox" className="rounded border-[color:var(--color-outline-variant)] w-4 h-4 accent-[color:var(--color-primary)]" />
                  <span className="material-symbols-outlined" style={{ fontSize: 16, color: p.color }}>{p.icon}</span>
                  <span className="text-body-md text-[color:var(--color-on-surface)] group-hover:text-[color:var(--color-primary)] transition-colors">{p.label}</span>
                </label>
              ))}
            </div>
          </div>

          <div className="mb-6">
            <h4 className="text-label-md text-[color:var(--color-on-surface-variant)] mb-3 uppercase tracking-wider">Min Intent Score</h4>
            <div className="px-1">
              <input type="range" min="0" max="100" defaultValue="70" className="w-full h-1 bg-[color:var(--color-surface-container-high)] rounded-lg appearance-none cursor-pointer accent-[color:var(--color-primary)]" />
              <div className="flex justify-between text-label-md text-[color:var(--color-on-surface-variant)] mt-2">
                <span>0</span><span className="font-medium text-[color:var(--color-primary)]">70+</span><span>100</span>
              </div>
            </div>
          </div>

          <div className="mb-6">
            <h4 className="text-label-md text-[color:var(--color-on-surface-variant)] mb-3 uppercase tracking-wider">Min Fit Score</h4>
            <div className="px-1">
              <input type="range" min="0" max="100" defaultValue="80" className="w-full h-1 bg-[color:var(--color-surface-container-high)] rounded-lg appearance-none cursor-pointer accent-[color:var(--color-primary)]" />
              <div className="flex justify-between text-label-md text-[color:var(--color-on-surface-variant)] mt-2">
                <span>0</span><span className="font-medium text-[color:var(--color-primary)]">80+</span><span>100</span>
              </div>
            </div>
          </div>

          <div>
            <h4 className="text-label-md text-[color:var(--color-on-surface-variant)] mb-3 uppercase tracking-wider">Signal Keywords</h4>
            <div className="flex flex-wrap gap-2">
              {['"alternative to"', '"need recommendations"', '"getting banned"'].map((kw) => (
                <span key={kw} className="px-2 py-1 bg-[color:var(--color-primary-container)] text-[color:var(--color-on-primary-container)] rounded-full text-code flex items-center gap-1 cursor-pointer">
                  {kw}
                  <span className="material-symbols-outlined" style={{ fontSize: 13 }}>close</span>
                </span>
              ))}
              <div className="relative w-full mt-2">
                <span className="material-symbols-outlined absolute left-2 top-1.5 text-[color:var(--color-on-surface-variant)]" style={{ fontSize: 16 }}>add</span>
                <input className="w-full pl-8 pr-2 py-1 bg-[color:var(--color-surface-container)] text-sm border-none rounded focus:ring-1 focus:ring-[color:var(--color-primary)] outline-none" placeholder="Add keyword..." />
              </div>
            </div>
          </div>

          {/* Quick stats */}
          <div className="mt-6 pt-4 border-t border-[color:var(--color-outline-variant)]/50 space-y-2">
            {[
              { label: 'Signals today', value: '109', color: 'text-[color:var(--color-primary)]' },
              { label: 'High intent (80+)', value: '34', color: 'text-[color:var(--color-error)]' },
              { label: 'Awaiting action', value: '12', color: 'text-[color:var(--color-secondary)]' },
            ].map((s) => (
              <div key={s.label} className="flex justify-between items-center">
                <span className="text-label-md text-[color:var(--color-on-surface-variant)]">{s.label}</span>
                <span className={`text-label-md font-bold ${s.color}`}>{s.value}</span>
              </div>
            ))}
          </div>
        </aside>

        {/* Feed stream */}
        <div className="col-span-1 lg:col-span-9 space-y-4">
          <div className="flex justify-center mb-2">
            <button className="bg-[color:var(--color-surface-container-high)] text-[color:var(--color-primary)] text-label-md px-4 py-1.5 rounded-full shadow-sm hover:bg-[color:var(--color-surface-variant)] transition-colors flex items-center gap-2">
              <span className="material-symbols-outlined" style={{ fontSize: 16 }}>arrow_upward</span>
              3 new signals detected
            </button>
          </div>

          {feedItems.map((item) => (
            <article key={item.name} className="bg-[color:var(--color-surface)] border border-[color:var(--color-outline-variant)] rounded-lg hover:border-[color:var(--color-primary)]/30 transition-colors shadow-sm relative overflow-hidden">
              <div className={`absolute left-0 top-0 bottom-0 w-1 ${intentAccent(item.intentLevel)}`} />

              {/* Header */}
              <div className="flex justify-between items-start p-6 pb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[color:var(--color-surface-container-high)] flex items-center justify-center flex-shrink-0">
                    <span className="material-symbols-outlined text-[color:var(--color-outline)]">person</span>
                  </div>
                  <div>
                    <h4 className="text-h2 text-[color:var(--color-on-background)]" style={{ fontSize: 16 }}>{item.name}</h4>
                    <p className="text-body-md text-[color:var(--color-on-surface-variant)] text-sm">{item.role} • {item.time}</p>
                  </div>
                </div>
                <div className="flex flex-col items-end gap-2">
                  {/* Score triple */}
                  <div className="flex gap-1.5">
                    <ScorePill
                      label="Intent"
                      value={item.intent}
                      color={item.intent >= 85 ? 'bg-[color:var(--color-error-container)] text-[color:var(--color-on-error-container)]' : 'bg-[color:var(--color-tertiary-fixed)] text-[color:var(--color-on-tertiary-fixed)]'}
                    />
                    <ScorePill label="Urgency" value={item.urgency} color="bg-[color:var(--color-surface-container-high)] text-[color:var(--color-on-surface)]" />
                    <ScorePill label="Fit" value={item.fit} color="bg-[color:var(--color-secondary-container)]/40 text-[color:var(--color-on-secondary-fixed-variant)]" />
                  </div>
                  <span className="text-xs text-[color:var(--color-on-surface-variant)] flex items-center gap-1">
                    <span className="material-symbols-outlined" style={{ fontSize: 14, color: item.platformColor }}>{item.platformIcon}</span>
                    {item.source}
                  </span>
                </div>
              </div>

              {/* Body */}
              <div className="px-6 pb-4">
                <p className="text-body-lg text-[color:var(--color-on-surface)] leading-relaxed mb-3">{item.body}</p>
                <div className="flex flex-wrap gap-2">
                  {item.tags.map((tag) => (
                    <span key={tag} className="px-2 py-1 bg-[color:var(--color-surface-container)] border border-[color:var(--color-outline-variant)]/50 text-[color:var(--color-on-surface-variant)] rounded text-xs text-code">{tag}</span>
                  ))}
                </div>
              </div>

              {/* AI Insight strip */}
              <div className="mx-6 mb-4 bg-[color:var(--color-primary-fixed)]/30 border border-[color:var(--color-primary-fixed)] rounded-lg px-4 py-2.5 flex items-start gap-3">
                <span className="material-symbols-outlined text-[color:var(--color-primary)] flex-shrink-0" style={{ fontSize: 16, fontVariationSettings: "'FILL' 1" }}>auto_awesome</span>
                <div className="flex-1 min-w-0">
                  <p className="text-label-md text-[color:var(--color-on-surface-variant)] mb-0.5">AI Insight</p>
                  <p className="text-body-md text-[color:var(--color-on-surface)]" style={{ fontSize: 13 }}>{item.aiSummary}</p>
                </div>
                <div className="flex-shrink-0 text-right">
                  <p className="text-label-md text-[color:var(--color-on-surface-variant)] mb-0.5">Recommended</p>
                  <p className="text-body-md text-[color:var(--color-primary)] font-medium" style={{ fontSize: 12 }}>{item.recommendedAction}</p>
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-3 px-6 py-4 border-t border-[color:var(--color-outline-variant)]/30">
                <button className="flex items-center gap-2 px-4 py-2 bg-[color:var(--color-primary)] text-[color:var(--color-on-primary)] rounded text-label-md hover:opacity-90 transition-opacity shadow-sm">
                  <span className="material-symbols-outlined" style={{ fontSize: 18 }}>send</span>
                  Draft Engagement
                </button>
                <button className="flex items-center gap-2 px-4 py-2 bg-[color:var(--color-surface)] border border-[color:var(--color-outline-variant)] text-[color:var(--color-on-surface)] rounded text-label-md hover:bg-[color:var(--color-surface-variant)] transition-colors">
                  <span className="material-symbols-outlined" style={{ fontSize: 18 }}>person_add</span>
                  Add to CRM
                </button>
                <div className="flex-1" />
                <button className="text-[color:var(--color-on-surface-variant)] hover:text-[color:var(--color-on-surface)] p-2 rounded-full hover:bg-[color:var(--color-surface-container)] transition-colors">
                  <span className="material-symbols-outlined">more_horiz</span>
                </button>
              </div>
            </article>
          ))}
        </div>
      </div>
    </PageShell>
  )
}
