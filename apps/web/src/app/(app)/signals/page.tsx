'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { PageShell } from '@/components/layout/page-shell'
import { mockSignals } from '@/lib/mock-data'
import { useSignalStore } from '@/store/signals'
import { toast } from '@/store/toast'

const PLATFORM_META: Record<string, { icon: string; color: string; label: string }> = {
  REDDIT: { icon: 'forum', color: '#FF4500', label: 'Reddit' },
  TELEGRAM: { icon: 'send', color: '#0088cc', label: 'Telegram' },
  X: { icon: 'tag', color: '#1DA1F2', label: 'Twitter / X' },
  FACEBOOK: { icon: 'thumb_up', color: '#1877F2', label: 'Facebook' },
  LINKEDIN: { icon: 'work', color: '#0A66C2', label: 'LinkedIn' },
}

const ALL_PLATFORMS = ['REDDIT', 'TELEGRAM', 'X', 'FACEBOOK', 'LINKEDIN']

function ScorePill({ label, value, color }: { label: string; value: number; color: string }) {
  return (
    <div className={`flex flex-col items-center px-3 py-1.5 rounded ${color}`}>
      <span className="text-[10px] font-medium opacity-70 uppercase tracking-wider leading-none mb-0.5">{label}</span>
      <span className="text-label-md font-bold leading-none">{value}</span>
    </div>
  )
}

function intentAccent(score: number) {
  return score >= 85 ? 'bg-[color:var(--color-error)]' : 'bg-[color:var(--color-secondary-container)]'
}

function timeAgo(date: Date) {
  const diff = Math.floor((Date.now() - date.getTime()) / 60000)
  if (diff < 60) return `${diff} mins ago`
  return `${Math.floor(diff / 60)} hr ${diff % 60} mins ago`
}

export default function SignalsPage() {
  const router = useRouter()
  const { filters, togglePlatform, setMinIntent, setMinFit, addKeyword, removeKeyword, resetFilters, setSelectedSignal } =
    useSignalStore()
  const [newKeyword, setNewKeyword] = useState('')

  const filtered = mockSignals.filter(
    (s) =>
      filters.platforms.includes(s.platform) &&
      s.intentScore >= filters.minIntent &&
      s.fitScore >= filters.minFit
  )

  function handleDraftEngagement(signalId: string) {
    setSelectedSignal(signalId)
    router.push(`/engagement?signalId=${signalId}`)
  }

  function handleAddToCRM(authorName: string) {
    toast.success(`${authorName} added to CRM pipeline`)
  }

  function handleAddKeyword(e: React.FormEvent) {
    e.preventDefault()
    const kw = newKeyword.trim()
    if (kw && !filters.keywords.includes(kw)) addKeyword(kw)
    setNewKeyword('')
  }

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
            <button onClick={resetFilters} className="text-label-md text-[color:var(--color-primary)] hover:underline">Reset</button>
          </div>

          <div className="mb-6">
            <h4 className="text-label-md text-[color:var(--color-on-surface-variant)] mb-3 uppercase tracking-wider">Platform</h4>
            <div className="space-y-2">
              {ALL_PLATFORMS.map((p) => {
                const meta = PLATFORM_META[p]
                return (
                  <label key={p} className="flex items-center gap-3 cursor-pointer group">
                    <input
                      type="checkbox"
                      checked={filters.platforms.includes(p)}
                      onChange={() => togglePlatform(p)}
                      className="rounded border-[color:var(--color-outline-variant)] w-4 h-4 accent-[color:var(--color-primary)]"
                    />
                    <span className="material-symbols-outlined" style={{ fontSize: 16, color: meta.color }}>{meta.icon}</span>
                    <span className="text-body-md text-[color:var(--color-on-surface)] group-hover:text-[color:var(--color-primary)] transition-colors">{meta.label}</span>
                  </label>
                )
              })}
            </div>
          </div>

          <div className="mb-6">
            <h4 className="text-label-md text-[color:var(--color-on-surface-variant)] mb-3 uppercase tracking-wider">Min Intent Score</h4>
            <div className="px-1">
              <input
                type="range" min="0" max="100"
                value={filters.minIntent}
                onChange={(e) => setMinIntent(parseInt(e.target.value))}
                className="w-full h-1 bg-[color:var(--color-surface-container-high)] rounded-lg appearance-none cursor-pointer accent-[color:var(--color-primary)]"
              />
              <div className="flex justify-between text-label-md text-[color:var(--color-on-surface-variant)] mt-2">
                <span>0</span>
                <span className="font-medium text-[color:var(--color-primary)]">{filters.minIntent}+</span>
                <span>100</span>
              </div>
            </div>
          </div>

          <div className="mb-6">
            <h4 className="text-label-md text-[color:var(--color-on-surface-variant)] mb-3 uppercase tracking-wider">Min Fit Score</h4>
            <div className="px-1">
              <input
                type="range" min="0" max="100"
                value={filters.minFit}
                onChange={(e) => setMinFit(parseInt(e.target.value))}
                className="w-full h-1 bg-[color:var(--color-surface-container-high)] rounded-lg appearance-none cursor-pointer accent-[color:var(--color-primary)]"
              />
              <div className="flex justify-between text-label-md text-[color:var(--color-on-surface-variant)] mt-2">
                <span>0</span>
                <span className="font-medium text-[color:var(--color-primary)]">{filters.minFit}+</span>
                <span>100</span>
              </div>
            </div>
          </div>

          <div>
            <h4 className="text-label-md text-[color:var(--color-on-surface-variant)] mb-3 uppercase tracking-wider">Signal Keywords</h4>
            <div className="flex flex-wrap gap-2">
              {filters.keywords.map((kw) => (
                <span key={kw} className="px-2 py-1 bg-[color:var(--color-primary-container)] text-[color:var(--color-on-primary-container)] rounded-full text-code flex items-center gap-1">
                  {kw}
                  <button onClick={() => removeKeyword(kw)}>
                    <span className="material-symbols-outlined" style={{ fontSize: 13 }}>close</span>
                  </button>
                </span>
              ))}
              <form onSubmit={handleAddKeyword} className="relative w-full mt-2">
                <span className="material-symbols-outlined absolute left-2 top-1.5 text-[color:var(--color-on-surface-variant)]" style={{ fontSize: 16 }}>add</span>
                <input
                  value={newKeyword}
                  onChange={(e) => setNewKeyword(e.target.value)}
                  className="w-full pl-8 pr-2 py-1 bg-[color:var(--color-surface-container)] text-sm border-none rounded focus:ring-1 focus:ring-[color:var(--color-primary)] outline-none"
                  placeholder="Add keyword..."
                />
              </form>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-[color:var(--color-outline-variant)]/50 space-y-2">
            {[
              { label: 'Signals today', value: String(mockSignals.length), color: 'text-[color:var(--color-primary)]' },
              { label: 'High intent (80+)', value: String(mockSignals.filter((s) => s.intentScore >= 80).length), color: 'text-[color:var(--color-error)]' },
              { label: 'Showing now', value: String(filtered.length), color: 'text-[color:var(--color-secondary)]' },
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

          {filtered.length === 0 && (
            <div className="text-center py-16 text-[color:var(--color-on-surface-variant)]">
              <span className="material-symbols-outlined block mb-2" style={{ fontSize: 40 }}>filter_list_off</span>
              <p className="text-body-md">No signals match current filters</p>
              <button onClick={resetFilters} className="mt-3 text-[color:var(--color-primary)] text-label-md hover:underline">Reset filters</button>
            </div>
          )}

          {filtered.map((item) => {
            const meta = PLATFORM_META[item.platform]
            return (
              <article key={item.id} className="bg-[color:var(--color-surface)] border border-[color:var(--color-outline-variant)] rounded-lg hover:border-[color:var(--color-primary)]/30 transition-colors shadow-sm relative overflow-hidden">
                <div className={`absolute left-0 top-0 bottom-0 w-1 ${intentAccent(item.intentScore)}`} />

                <div className="flex justify-between items-start p-6 pb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-[color:var(--color-surface-container-high)] flex items-center justify-center flex-shrink-0">
                      <span className="material-symbols-outlined text-[color:var(--color-outline)]">person</span>
                    </div>
                    <div>
                      <h4 className="text-h2 text-[color:var(--color-on-background)]" style={{ fontSize: 16 }}>{item.authorName}</h4>
                      <p className="text-body-md text-[color:var(--color-on-surface-variant)] text-sm">
                        {item.source} • {timeAgo(item.postedAt)}
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-col items-end gap-2">
                    <div className="flex gap-1.5">
                      <ScorePill
                        label="Intent"
                        value={item.intentScore}
                        color={item.intentScore >= 85 ? 'bg-[color:var(--color-error-container)] text-[color:var(--color-on-error-container)]' : 'bg-[color:var(--color-tertiary-fixed)] text-[color:var(--color-on-tertiary-fixed)]'}
                      />
                      <ScorePill label="Urgency" value={item.urgencyScore} color="bg-[color:var(--color-surface-container-high)] text-[color:var(--color-on-surface)]" />
                      <ScorePill label="Fit" value={item.fitScore} color="bg-[color:var(--color-secondary-container)]/40 text-[color:var(--color-on-secondary-fixed-variant)]" />
                    </div>
                    <span className="text-xs text-[color:var(--color-on-surface-variant)] flex items-center gap-1">
                      <span className="material-symbols-outlined" style={{ fontSize: 14, color: meta.color }}>{meta.icon}</span>
                      {item.platform}
                    </span>
                  </div>
                </div>

                <div className="px-6 pb-4">
                  <p className="text-body-lg text-[color:var(--color-on-surface)] leading-relaxed mb-3">{item.bodyText}</p>
                </div>

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

                <div className="flex gap-3 px-6 py-4 border-t border-[color:var(--color-outline-variant)]/30">
                  <button
                    onClick={() => handleDraftEngagement(item.id)}
                    className="flex items-center gap-2 px-4 py-2 bg-[color:var(--color-primary)] text-[color:var(--color-on-primary)] rounded text-label-md hover:opacity-90 transition-opacity shadow-sm"
                  >
                    <span className="material-symbols-outlined" style={{ fontSize: 18 }}>send</span>
                    Draft Engagement
                  </button>
                  <button
                    onClick={() => handleAddToCRM(item.authorName)}
                    className="flex items-center gap-2 px-4 py-2 bg-[color:var(--color-surface)] border border-[color:var(--color-outline-variant)] text-[color:var(--color-on-surface)] rounded text-label-md hover:bg-[color:var(--color-surface-variant)] transition-colors"
                  >
                    <span className="material-symbols-outlined" style={{ fontSize: 18 }}>person_add</span>
                    Add to CRM
                  </button>
                  <div className="flex-1" />
                  <button className="text-[color:var(--color-on-surface-variant)] hover:text-[color:var(--color-on-surface)] p-2 rounded-full hover:bg-[color:var(--color-surface-container)] transition-colors">
                    <span className="material-symbols-outlined">more_horiz</span>
                  </button>
                </div>
              </article>
            )
          })}
        </div>
      </div>
    </PageShell>
  )
}
