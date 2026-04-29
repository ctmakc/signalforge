import { PageShell } from '@/components/layout/page-shell'

const sources = [
  { name: 'r/SaaS', platform: 'Reddit', icon: 'forum', color: '#FF4500', type: 'Subreddit', tags: ['saas', 'b2b'], priority: 9, signals: 34, status: 'active' },
  { name: 'r/entrepreneur', platform: 'Reddit', icon: 'forum', color: '#FF4500', type: 'Subreddit', tags: ['startup'], priority: 7, signals: 21, status: 'active' },
  { name: 'SaaS Founders Chat', platform: 'Telegram', icon: 'send', color: '#0088cc', type: 'Group', tags: ['saas', 'founders'], priority: 8, signals: 17, status: 'active' },
  { name: '#outreach #saas', platform: 'Twitter / X', icon: 'tag', color: '#1DA1F2', type: 'Keyword stream', tags: ['outreach'], priority: 6, signals: 8, status: 'paused' },
  { name: 'r/startups', platform: 'Reddit', icon: 'forum', color: '#FF4500', type: 'Subreddit', tags: ['startup', 'early-stage'], priority: 7, signals: 29, status: 'active' },
]

export default function SourcesPage() {
  return (
    <PageShell
      title="Lead Detection Sources"
      subtitle="Configure where to monitor for high-intent signals."
      headerActions={
        <button className="flex items-center gap-2 px-6 py-2 bg-[color:var(--color-primary)] text-[color:var(--color-on-primary)] rounded text-label-md hover:opacity-90 transition-opacity shadow-sm">
          <span className="material-symbols-outlined" style={{ fontSize: 18 }}>add</span>
          Add Source
        </button>
      }
    >
      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        {[
          { label: 'Active Sources', value: 4, icon: 'radar', color: 'text-[color:var(--color-secondary)]' },
          { label: 'Paused', value: 1, icon: 'pause_circle', color: 'text-[color:var(--color-outline)]' },
          { label: 'Signals Today', value: 109, icon: 'bolt', color: 'text-[color:var(--color-primary)]' },
          { label: 'Platforms', value: 3, icon: 'device_hub', color: 'text-[color:var(--color-tertiary)]' },
        ].map((s) => (
          <div key={s.label} className="bg-[color:var(--color-surface-container-lowest)] border border-[color:var(--color-outline-variant)] rounded-lg p-6 shadow-sm">
            <div className="flex justify-between items-start mb-4">
              <p className="text-label-md text-[color:var(--color-on-surface-variant)]">{s.label}</p>
              <span className={`material-symbols-outlined ${s.color}`}>{s.icon}</span>
            </div>
            <p className={`text-display ${s.color}`}>{s.value}</p>
          </div>
        ))}
      </div>

      {/* Sources table */}
      <div className="bg-[color:var(--color-surface-container-lowest)] border border-[color:var(--color-outline-variant)] rounded-lg shadow-sm overflow-hidden">
        <div className="flex items-center justify-between px-6 py-4 border-b border-[color:var(--color-surface-container-high)]">
          <h3 className="text-h2 text-[color:var(--color-on-background)]">Configured Sources</h3>
          <div className="flex gap-2">
            {['All', 'Reddit', 'Telegram', 'Twitter'].map((f) => (
              <button key={f} className={`px-3 py-1 rounded text-label-md transition-colors ${f === 'All' ? 'bg-[color:var(--color-primary)] text-[color:var(--color-on-primary)]' : 'border border-[color:var(--color-outline-variant)] text-[color:var(--color-on-surface)] hover:bg-[color:var(--color-surface-container-low)]'}`}>
                {f}
              </button>
            ))}
          </div>
        </div>
        <table className="w-full">
          <thead>
            <tr className="border-b border-[color:var(--color-surface-container-high)] bg-[color:var(--color-surface-container-low)]">
              {['Source', 'Type', 'Tags', 'Priority', 'Signals', 'Status', ''].map((h) => (
                <th key={h} className="px-6 py-3 text-left text-label-md text-[color:var(--color-on-surface-variant)] uppercase tracking-wider">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {sources.map((s) => (
              <tr key={s.name} className="border-b border-[color:var(--color-surface-container-high)] hover:bg-[color:var(--color-surface-container-low)] transition-colors">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <span className="material-symbols-outlined" style={{ color: s.color }}>{s.icon}</span>
                    <div>
                      <p className="text-body-md text-[color:var(--color-on-background)] font-medium">{s.name}</p>
                      <p className="text-code text-[color:var(--color-outline)]">{s.platform}</p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 text-body-md text-[color:var(--color-on-surface-variant)]">{s.type}</td>
                <td className="px-6 py-4">
                  <div className="flex flex-wrap gap-1">
                    {s.tags.map((t) => (
                      <span key={t} className="px-2 py-0.5 bg-[color:var(--color-surface-container)] border border-[color:var(--color-outline-variant)]/50 rounded text-code text-[color:var(--color-on-surface-variant)]">{t}</span>
                    ))}
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className="text-body-md font-semibold text-[color:var(--color-on-background)]">{s.priority}/10</span>
                </td>
                <td className="px-6 py-4">
                  <span className="text-body-md font-semibold text-[color:var(--color-primary)]">{s.signals}</span>
                </td>
                <td className="px-6 py-4">
                  {s.status === 'active' ? (
                    <span className="flex items-center gap-1 text-[color:var(--color-secondary)] text-label-md">
                      <span className="w-2 h-2 rounded-full bg-[color:var(--color-secondary)]" />Active
                    </span>
                  ) : (
                    <span className="flex items-center gap-1 text-[color:var(--color-outline)] text-label-md">
                      <span className="w-2 h-2 rounded-full bg-[color:var(--color-outline)]" />Paused
                    </span>
                  )}
                </td>
                <td className="px-6 py-4">
                  <button className="p-1 text-[color:var(--color-on-surface-variant)] hover:bg-[color:var(--color-surface-container)] rounded transition-colors">
                    <span className="material-symbols-outlined">more_horiz</span>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </PageShell>
  )
}
