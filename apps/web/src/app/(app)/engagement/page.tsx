import { PageShell } from '@/components/layout/page-shell'

const aiDrafts = [
  {
    id: 1,
    selected: true,
    text: "Sarah, completely agree on the burn-rate of generic templates. We moved to a signal-based flow last quarter. The key was decoupling the 'intent detection' from the 'sending' platform, letting the CRM act solely as the system of record. Happy to share the specific stack we used if it's helpful.",
  },
  {
    id: 2,
    selected: false,
    text: "Spot on, Sarah. The bridge is usually the hardest part. Rather than ripping out existing CRM workflows, we found success routing intent signals into dedicated 'high-priority' queues for reps, accompanied by AI-generated contextual briefs. Keeps the workflow familiar but drastically improves the outreach quality.",
  },
]

export default function EngagementPage() {
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
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6" style={{ height: 'calc(100vh - 180px)', minHeight: 600 }}>
        {/* Left Pane: Target Thread */}
        <section className="lg:col-span-5 bg-[color:var(--color-surface-container-lowest)] border border-[color:var(--color-outline-variant)] rounded-xl flex flex-col overflow-hidden shadow-sm">
          <div className="px-6 py-3 border-b border-[color:var(--color-outline-variant)] bg-[color:var(--color-surface-container-low)]/50 flex justify-between items-center">
            <h3 className="text-[color:var(--color-on-surface)] font-semibold" style={{ fontSize: 16 }}>Target Thread</h3>
            <span className="px-2 py-1 bg-[color:var(--color-tertiary-fixed)] text-[color:var(--color-on-tertiary-fixed)] rounded text-label-md uppercase tracking-wider font-bold" style={{ fontSize: 10 }}>Buying Intent</span>
          </div>
          <div className="p-6 flex-1 overflow-y-auto">
            <div className="flex items-start gap-3 mb-4">
              <div className="w-12 h-12 rounded-full bg-[color:var(--color-surface-container-high)] flex items-center justify-center flex-shrink-0">
                <span className="material-symbols-outlined text-[color:var(--color-outline)]">person</span>
              </div>
              <div>
                <div className="text-body-lg text-[color:var(--color-on-surface)] font-semibold flex items-center gap-1">
                  Sarah Jenkins
                  <span className="material-symbols-outlined text-[color:var(--color-primary)]" style={{ fontSize: 14, fontVariationSettings: "'FILL' 1" }}>verified</span>
                </div>
                <div className="text-body-md text-[color:var(--color-on-surface-variant)]" style={{ fontSize: 13 }}>VP of Engineering @ CloudScale</div>
                <div className="text-label-md text-[color:var(--color-outline)] mt-0.5">2 hours ago • LinkedIn</div>
              </div>
            </div>

            <div className="text-body-md text-[color:var(--color-on-surface)] leading-relaxed space-y-3">
              <p>We&apos;re currently re-evaluating our entire outbound motion. The generic templated cadences just aren&apos;t cutting it anymore — our reps are burning through high-quality leads with zero personalization.</p>
              <p>Has anyone successfully transitioned their team to a more signal-based approach without completely breaking their existing CRM workflows? Looking for recommendations on tooling that actually bridges the gap between intent data and personalized execution.</p>
              <p className="text-[color:var(--color-primary)] cursor-pointer hover:underline">#SalesTech #GTM #RevOps</p>
            </div>

            <div className="mt-6 pt-4 border-t border-[color:var(--color-outline-variant)] flex gap-6 text-[color:var(--color-on-surface-variant)]">
              {[{ icon: 'thumb_up', value: 142 }, { icon: 'chat_bubble', value: 38 }, { icon: 'share', value: 12 }].map((m) => (
                <div key={m.icon} className="flex items-center gap-1.5 text-label-md" style={{ fontSize: 13 }}>
                  <span className="material-symbols-outlined" style={{ fontSize: 18 }}>{m.icon}</span>
                  {m.value}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Right Pane: Composer */}
        <section className="lg:col-span-7 bg-[color:var(--color-surface-container-lowest)] border border-[color:var(--color-outline-variant)] rounded-xl flex flex-col shadow-sm overflow-hidden">
          {/* AI Toolbar */}
          <div className="px-6 py-2 border-b border-[color:var(--color-outline-variant)] bg-[color:var(--color-surface-container-low)] flex justify-between items-center">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-[color:var(--color-tertiary)]" style={{ fontVariationSettings: "'FILL' 1" }}>auto_awesome</span>
              <span className="text-label-md font-semibold text-[color:var(--color-on-surface)]">AI Drafts</span>
            </div>
            <div className="flex bg-[color:var(--color-surface-container)] border border-[color:var(--color-outline-variant)] rounded p-0.5">
              {['Helpful', 'Expert', 'Casual'].map((tone, i) => (
                <button
                  key={tone}
                  className={`px-3 py-1.5 rounded-sm text-label-md font-medium transition-colors ${
                    i === 0
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
          <div className="p-4 border-b border-[color:var(--color-outline-variant)] bg-[color:var(--color-surface-bright)] space-y-2">
            {aiDrafts.map((draft) => (
              <div
                key={draft.id}
                className={`p-4 rounded border cursor-pointer relative group ${
                  draft.selected
                    ? 'border-[color:var(--color-primary)] bg-[color:var(--color-primary-fixed)]/20'
                    : 'border-[color:var(--color-outline-variant)] bg-[color:var(--color-surface)] hover:border-[color:var(--color-outline)] transition-colors'
                }`}
              >
                <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button className="p-1 rounded bg-[color:var(--color-surface)] border border-[color:var(--color-outline-variant)] text-[color:var(--color-on-surface-variant)] hover:text-[color:var(--color-primary)]">
                    <span className="material-symbols-outlined" style={{ fontSize: 16 }}>content_copy</span>
                  </button>
                </div>
                <p
                  className={`text-body-md leading-snug transition-colors ${
                    draft.selected
                      ? 'text-[color:var(--color-on-surface)]'
                      : 'text-[color:var(--color-on-surface-variant)] group-hover:text-[color:var(--color-on-surface)]'
                  }`}
                  style={{ fontSize: 13 }}
                >
                  {draft.text}
                </p>
              </div>
            ))}
          </div>

          {/* Editor */}
          <div className="flex-1 flex flex-col p-6 min-h-0">
            <textarea
              className="w-full flex-1 resize-none bg-transparent border-none focus:ring-0 text-body-md text-[color:var(--color-on-surface)] placeholder:text-[color:var(--color-outline-variant)] outline-none"
              placeholder="Refine your reply here..."
            />
            <div className="flex items-center gap-1 mt-4 pt-3 border-t border-[color:var(--color-surface-container-high)] text-[color:var(--color-on-surface-variant)]">
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
            </div>
          </div>

          {/* Footer */}
          <div className="px-6 py-3 border-t border-[color:var(--color-outline-variant)] bg-[color:var(--color-surface-container-lowest)] flex justify-between items-center rounded-b-xl">
            <div className="flex items-center gap-2 text-[color:var(--color-outline)] text-label-md" style={{ fontSize: 12 }}>
              <span className="material-symbols-outlined text-[color:var(--color-secondary)]" style={{ fontSize: 16 }}>check_circle</span>
              Saved to drafts
            </div>
            <button
              className="px-6 py-2 rounded bg-[color:var(--color-primary)] text-[color:var(--color-on-primary)] text-label-md font-semibold hover:opacity-90 transition-opacity shadow-sm flex items-center gap-2"
              style={{ fontSize: 13 }}
            >
              Send to thread
              <span className="material-symbols-outlined" style={{ fontSize: 16 }}>send</span>
            </button>
          </div>
        </section>
      </div>
    </PageShell>
  )
}
