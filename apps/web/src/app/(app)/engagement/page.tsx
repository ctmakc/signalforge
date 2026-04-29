'use client'
import { useEffect, useState, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import { PageShell } from '@/components/layout/page-shell'
import { mockSignals } from '@/lib/mock-data'
import { useEngagementStore } from '@/store/engagement'
import { toast } from '@/store/toast'

const AI_DRAFTS = [
  {
    id: 1,
    text: "Getting banned is almost always an account age + action rate issue. What worked for us: decouple the detection layer from the posting layer entirely — detect signals with one set of read-only accounts, post replies with aged accounts that have actual karma history. Happy to share the specific stack we use if it helps.",
  },
  {
    id: 2,
    text: "The ban issue is usually predictable: new accounts, high velocity, repetitive patterns. We've run outreach on Reddit for 8 months without a single ban by treating accounts like real humans — warmup period, varied reply cadence, no copy-paste. What's your current account setup look like?",
  },
]

function ScoreBar({ label, value, colorClass }: { label: string; value: number; colorClass: string }) {
  return (
    <div>
      <div className="flex justify-between items-center mb-1">
        <span className="text-label-md text-[color:var(--color-on-surface-variant)]">{label}</span>
        <span className={`text-label-md font-bold ${colorClass}`}>{value}</span>
      </div>
      <div className="h-1.5 w-full bg-[color:var(--color-surface-container-high)] rounded-full overflow-hidden">
        <div className={`h-full rounded-full ${colorClass.replace('text-', 'bg-')}`} style={{ width: `${value}%` }} />
      </div>
    </div>
  )
}

function EngagementComposer() {
  const searchParams = useSearchParams()
  const signalId = searchParams.get('signalId')

  const signal = (signalId ? mockSignals.find((s) => s.id === signalId) : null) ?? mockSignals[0]

  const { selectedDraftId, activeTone, composeText, selectDraft, setTone, setComposeText, reset } = useEngagementStore()
  const [sending, setSending] = useState(false)

  async function handleSend() {
    if (!composeText.trim()) { toast.error('Reply text is empty'); return }
    setSending(true)
    await fetch('/api/engagements', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ signalId: signal.id, replyText: composeText, tone: activeTone, action: 'send' }),
    })
    toast.success('Reply sent to thread!')
    reset()
    setSending(false)
  }

  async function handleSaveDraft() {
    if (!composeText.trim()) { toast.info('Nothing to save'); return }
    await fetch('/api/engagements', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ signalId: signal.id, replyText: composeText, tone: activeTone, action: 'draft' }),
    })
    toast.info('Draft saved')
  }

  useEffect(() => {
    if (selectedDraftId === null) {
      selectDraft(1, AI_DRAFTS[0].text)
    }
  }, [selectedDraftId, selectDraft])

  function handleDraftClick(draft: (typeof AI_DRAFTS)[0]) {
    selectDraft(draft.id, draft.text)
  }

  return (
    <PageShell
      title="Engagement Composer"
      subtitle="High-Intent Signal Detected"
      subtitleIcon="radar"
      headerActions={
        <button className="px-4 py-2 rounded border border-[color:var(--color-outline)] bg-[color:var(--color-surface)] text-[color:var(--color-on-surface)] text-label-md hover:bg-[color:var(--color-surface-container-low)] transition-colors flex items-center gap-2">
          <span className="material-symbols-outlined" style={{ fontSize: 16 }}>skip_next</span>
          Skip Signal
        </button>
      }
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6" style={{ height: 'calc(100vh - 185px)', minHeight: 620 }}>
        {/* Left: Target Thread */}
        <section className="lg:col-span-5 bg-[color:var(--color-surface-container-lowest)] border border-[color:var(--color-outline-variant)] rounded-xl flex flex-col overflow-hidden shadow-sm">
          <div className="px-6 py-3 border-b border-[color:var(--color-outline-variant)] bg-[color:var(--color-surface-container-low)]/50 flex justify-between items-center flex-shrink-0">
            <h3 className="font-semibold text-[color:var(--color-on-surface)]" style={{ fontSize: 15 }}>Target Thread</h3>
            <span className="px-2 py-1 bg-[color:var(--color-tertiary-fixed)] text-[color:var(--color-on-tertiary-fixed)] rounded text-label-md uppercase tracking-wider font-bold" style={{ fontSize: 10 }}>Buying Intent</span>
          </div>

          <div className="flex-1 overflow-y-auto">
            <div className="p-6 pb-4">
              <div className="flex items-start gap-3 mb-4">
                <div className="w-11 h-11 rounded-full bg-[color:var(--color-surface-container-high)] flex items-center justify-center flex-shrink-0">
                  <span className="material-symbols-outlined text-[color:var(--color-outline)]">person</span>
                </div>
                <div>
                  <div className="text-body-lg font-semibold text-[color:var(--color-on-surface)]">{signal.authorName}</div>
                  <div className="text-label-md text-[color:var(--color-outline)] mt-0.5">
                    {signal.source} • {signal.platform}
                  </div>
                </div>
              </div>

              <div className="text-body-md text-[color:var(--color-on-surface)] leading-relaxed mb-4">{signal.bodyText}</div>

              {signal.title && (
                <div className="mb-4 px-3 py-2 bg-[color:var(--color-surface-container-low)] rounded border border-[color:var(--color-outline-variant)]">
                  <p className="text-label-md text-[color:var(--color-on-surface-variant)]">Post title</p>
                  <p className="text-body-md text-[color:var(--color-on-surface)]">{signal.title}</p>
                </div>
              )}
            </div>

            <div className="mx-5 mb-4 bg-[color:var(--color-surface-container-low)] border border-[color:var(--color-outline-variant)] rounded-lg p-4 space-y-3">
              <h4 className="text-label-md text-[color:var(--color-on-surface-variant)] uppercase tracking-wider mb-2">Signal Scores</h4>
              <ScoreBar label="Intent" value={signal.intentScore} colorClass="text-[color:var(--color-error)]" />
              <ScoreBar label="Urgency" value={signal.urgencyScore} colorClass="text-[color:var(--color-tertiary)]" />
              <ScoreBar label="Fit" value={signal.fitScore} colorClass="text-[color:var(--color-secondary)]" />
            </div>

            <div className="mx-5 mb-5 bg-[color:var(--color-primary-fixed)]/25 border border-[color:var(--color-primary-fixed)] rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <span className="material-symbols-outlined text-[color:var(--color-primary)]" style={{ fontSize: 16, fontVariationSettings: "'FILL' 1" }}>auto_awesome</span>
                <span className="text-label-md font-semibold text-[color:var(--color-primary)]">AI Analysis</span>
              </div>
              <p className="text-body-md text-[color:var(--color-on-surface)] mb-3" style={{ fontSize: 13 }}>{signal.aiSummary}</p>
              <div className="space-y-1.5">
                <div className="flex items-start gap-2">
                  <span className="text-label-md text-[color:var(--color-on-surface-variant)] uppercase tracking-wider flex-shrink-0 mt-0.5">Need</span>
                  <span className="text-label-md text-[color:var(--color-on-surface)] font-medium">{signal.extractedNeed}</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-label-md text-[color:var(--color-on-surface-variant)] uppercase tracking-wider flex-shrink-0 mt-0.5">Action</span>
                  <span className="text-label-md text-[color:var(--color-primary)] font-semibold">{signal.recommendedAction}</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Right: Composer */}
        <section className="lg:col-span-7 bg-[color:var(--color-surface-container-lowest)] border border-[color:var(--color-outline-variant)] rounded-xl flex flex-col shadow-sm overflow-hidden">
          {/* AI Toolbar */}
          <div className="px-6 py-2.5 border-b border-[color:var(--color-outline-variant)] bg-[color:var(--color-surface-container-low)] flex justify-between items-center flex-shrink-0">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-[color:var(--color-tertiary)]" style={{ fontVariationSettings: "'FILL' 1" }}>auto_awesome</span>
              <span className="text-label-md font-semibold text-[color:var(--color-on-surface)]">AI Drafts</span>
              <span className="px-1.5 py-0.5 bg-[color:var(--color-tertiary-fixed)] text-[color:var(--color-on-tertiary-fixed)] rounded text-label-md" style={{ fontSize: 10 }}>{AI_DRAFTS.length} options</span>
            </div>
            <div className="flex bg-[color:var(--color-surface-container)] border border-[color:var(--color-outline-variant)] rounded p-0.5">
              {(['Helpful', 'Expert', 'Casual'] as const).map((tone) => (
                <button
                  key={tone}
                  onClick={() => setTone(tone)}
                  className={`px-3 py-1.5 rounded-sm text-label-md font-medium transition-colors ${
                    activeTone === tone
                      ? 'bg-[color:var(--color-primary-container)] text-[color:var(--color-on-primary-container)] shadow-sm'
                      : 'text-[color:var(--color-on-surface-variant)] hover:text-[color:var(--color-on-surface)]'
                  }`}
                  style={{ fontSize: 11 }}
                >
                  {tone}
                </button>
              ))}
            </div>
          </div>

          {/* AI Suggestions */}
          <div className="p-4 border-b border-[color:var(--color-outline-variant)] bg-[color:var(--color-surface-bright)] space-y-2 flex-shrink-0">
            {AI_DRAFTS.map((draft) => {
              const isSelected = selectedDraftId === draft.id
              return (
                <div
                  key={draft.id}
                  onClick={() => handleDraftClick(draft)}
                  className={`p-4 rounded border cursor-pointer relative group ${
                    isSelected
                      ? 'border-[color:var(--color-primary)] bg-[color:var(--color-primary-fixed)]/20'
                      : 'border-[color:var(--color-outline-variant)] bg-[color:var(--color-surface)] hover:border-[color:var(--color-outline)] transition-colors'
                  }`}
                >
                  <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button
                      onClick={(e) => { e.stopPropagation(); navigator.clipboard.writeText(draft.text) }}
                      className="p-1 rounded bg-[color:var(--color-surface)] border border-[color:var(--color-outline-variant)] text-[color:var(--color-on-surface-variant)] hover:text-[color:var(--color-primary)]"
                    >
                      <span className="material-symbols-outlined" style={{ fontSize: 15 }}>content_copy</span>
                    </button>
                  </div>
                  {isSelected && (
                    <div className="flex items-center gap-1 mb-1.5">
                      <span className="material-symbols-outlined text-[color:var(--color-primary)]" style={{ fontSize: 13, fontVariationSettings: "'FILL' 1" }}>check_circle</span>
                      <span className="text-label-md text-[color:var(--color-primary)] font-medium" style={{ fontSize: 10 }}>Selected draft</span>
                    </div>
                  )}
                  <p
                    className={`text-body-md leading-snug transition-colors ${
                      isSelected ? 'text-[color:var(--color-on-surface)]' : 'text-[color:var(--color-on-surface-variant)] group-hover:text-[color:var(--color-on-surface)]'
                    }`}
                    style={{ fontSize: 13 }}
                  >
                    {draft.text}
                  </p>
                </div>
              )
            })}
          </div>

          {/* Editor */}
          <div className="flex-1 flex flex-col p-6 min-h-0">
            <textarea
              value={composeText}
              onChange={(e) => setComposeText(e.target.value)}
              className="w-full flex-1 resize-none bg-transparent border-none focus:ring-0 text-body-md text-[color:var(--color-on-surface)] placeholder:text-[color:var(--color-outline-variant)] outline-none"
              placeholder="Refine your reply here, or click a draft above to load it..."
            />
            <div className="flex items-center gap-1 mt-3 pt-3 border-t border-[color:var(--color-surface-container-high)] text-[color:var(--color-on-surface-variant)]">
              {['format_bold', 'format_italic', 'link', 'format_list_bulleted'].map((icon) => (
                <button key={icon} className="p-1.5 rounded hover:bg-[color:var(--color-surface-container)] transition-colors">
                  <span className="material-symbols-outlined" style={{ fontSize: 20 }}>{icon}</span>
                </button>
              ))}
              <div className="h-4 w-px bg-[color:var(--color-outline-variant)] mx-2" />
              <button className="p-1.5 rounded hover:bg-[color:var(--color-surface-container)] transition-colors flex items-center gap-1 text-label-md" style={{ fontSize: 11 }}>
                <span className="material-symbols-outlined" style={{ fontSize: 16 }}>attach_file</span>
                Attach
              </button>
              <div className="flex-1" />
              <div className="flex items-center gap-2 px-3 py-1 bg-[color:var(--color-surface-container)] border border-[color:var(--color-outline-variant)] rounded text-label-md text-[color:var(--color-on-surface-variant)]">
                <span className="material-symbols-outlined" style={{ fontSize: 14, color: '#FF4500' }}>forum</span>
                <span style={{ fontSize: 11 }}>u/growth_ops_1</span>
                <span className="material-symbols-outlined" style={{ fontSize: 14 }}>expand_more</span>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="px-6 py-3 border-t border-[color:var(--color-outline-variant)] bg-[color:var(--color-surface-container-lowest)] flex justify-between items-center rounded-b-xl flex-shrink-0">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 text-[color:var(--color-outline)] text-label-md" style={{ fontSize: 12 }}>
                <span className="material-symbols-outlined text-[color:var(--color-secondary)]" style={{ fontSize: 16 }}>check_circle</span>
                Saved to drafts
              </div>
              <button className="flex items-center gap-1.5 text-label-md text-[color:var(--color-on-surface-variant)] hover:text-[color:var(--color-on-surface)] transition-colors" style={{ fontSize: 12 }}>
                <span className="material-symbols-outlined" style={{ fontSize: 14 }}>person_add</span>
                Add to CRM after send
              </button>
            </div>
            <div className="flex gap-2">
              <button
                onClick={handleSaveDraft}
                className="px-4 py-2 rounded border border-[color:var(--color-outline-variant)] text-[color:var(--color-on-surface)] text-label-md hover:bg-[color:var(--color-surface-container-low)] transition-colors"
                style={{ fontSize: 13 }}
              >
                Save Draft
              </button>
              <button
                onClick={handleSend}
                disabled={sending}
                className="px-6 py-2 rounded bg-[color:var(--color-primary)] text-[color:var(--color-on-primary)] text-label-md font-semibold hover:opacity-90 transition-opacity shadow-sm flex items-center gap-2 disabled:opacity-60"
                style={{ fontSize: 13 }}
              >
                {sending ? 'Sending…' : 'Send to thread'}
                <span className="material-symbols-outlined" style={{ fontSize: 16 }}>send</span>
              </button>
            </div>
          </div>
        </section>
      </div>
    </PageShell>
  )
}

export default function EngagementPage() {
  return (
    <Suspense fallback={null}>
      <EngagementComposer />
    </Suspense>
  )
}
