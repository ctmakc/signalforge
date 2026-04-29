'use client'
import { PageShell } from '@/components/layout/page-shell'
import { useAutomationStore, type AutoMode } from '@/store/automation'
import { toast } from '@/store/toast'

const MODES: { key: AutoMode; label: string; icon: string; desc: string }[] = [
  { key: 'manual', label: 'Manual', icon: 'person', desc: 'All actions require explicit operator approval before execution.' },
  { key: 'assisted', label: 'Assisted', icon: 'smart_toy', desc: 'AI drafts replies and DMs, operator approves before sending.' },
  { key: 'autopilot', label: 'Autopilot', icon: 'auto_mode', desc: 'AI handles all actions within configured limits. High-risk actions still require review.' },
]

const queue = [
  { label: 'Pending approval', value: 4, color: 'text-[color:var(--color-error)]' },
  { label: 'Scheduled', value: 12, color: 'text-[color:var(--color-primary)]' },
  { label: 'Processing', value: 2, color: 'text-[color:var(--color-tertiary)]' },
  { label: 'Completed today', value: 31, color: 'text-[color:var(--color-secondary)]' },
]

export default function AutomationPage() {
  const { mode, policies, setMode, togglePolicy } = useAutomationStore()

  async function handleModeChange(newMode: AutoMode) {
    setMode(newMode)
    await fetch('/api/automation', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ mode: newMode }),
    })
    toast.success(`Mode switched to ${newMode}`)
  }

  function handlePolicyToggle(index: number) {
    togglePolicy(index)
    const policy = policies[index]
    toast.info(`${policy.on ? 'Disabled' : 'Enabled'}: ${policy.label.slice(0, 40)}…`)
  }

  return (
    <PageShell title="Automation & Agents" subtitle="Configure how autonomously the system operates.">
      {/* Mode selector */}
      <div className="mb-6">
        <h3 className="text-h2 text-[color:var(--color-on-background)] mb-3">Automation Mode</h3>
        <div className="grid grid-cols-3 gap-4">
          {MODES.map((m) => {
            const active = mode === m.key
            return (
              <button
                key={m.key}
                onClick={() => handleModeChange(m.key)}
                className={`rounded-lg p-6 text-left border-2 transition-all ${
                  active
                    ? 'border-[color:var(--color-primary)] bg-[color:var(--color-primary-fixed)]/10'
                    : 'border-[color:var(--color-outline-variant)] bg-[color:var(--color-surface-container-lowest)] hover:border-[color:var(--color-primary)]/50'
                }`}
              >
                <div className="flex items-center justify-between mb-4">
                  <span className={`material-symbols-outlined text-[28px] ${active ? 'text-[color:var(--color-primary)]' : 'text-[color:var(--color-outline)]'}`}>
                    {m.icon}
                  </span>
                  {active && (
                    <span className="bg-[color:var(--color-primary)] text-[color:var(--color-on-primary)] text-label-md px-2 py-0.5 rounded-full">Active</span>
                  )}
                </div>
                <p className={`text-h2 mb-1 ${active ? 'text-[color:var(--color-primary)]' : 'text-[color:var(--color-on-background)]'}`}>{m.label}</p>
                <p className="text-body-md text-[color:var(--color-on-surface-variant)]">{m.desc}</p>
              </button>
            )
          })}
        </div>
      </div>

      <div className="grid grid-cols-3 gap-6">
        {/* Policies */}
        <div className="col-span-2 bg-[color:var(--color-surface-container-lowest)] border border-[color:var(--color-outline-variant)] rounded-lg shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b border-[color:var(--color-surface-container-high)]">
            <h3 className="text-h2 text-[color:var(--color-on-background)]">Approval Policies</h3>
          </div>
          {policies.map((p, i) => (
            <div key={i} className="flex items-center justify-between px-6 py-4 border-b border-[color:var(--color-surface-container-high)] last:border-0">
              <div className="flex items-center gap-3">
                <button
                  onClick={() => handlePolicyToggle(i)}
                  className={`w-9 h-5 rounded-full flex items-center transition-colors flex-shrink-0 ${p.on ? 'bg-[color:var(--color-primary)]' : 'bg-[color:var(--color-outline-variant)]'}`}
                  aria-label={p.on ? 'Disable' : 'Enable'}
                >
                  <div className={`w-4 h-4 rounded-full bg-white shadow transition-transform mx-0.5 ${p.on ? 'translate-x-4' : 'translate-x-0'}`} />
                </button>
                <span className="text-body-md text-[color:var(--color-on-surface)]">{p.label}</span>
              </div>
              {p.risk && (
                <span className={`text-label-md flex items-center gap-1 ${p.risk === 'high' ? 'text-[color:var(--color-error)]' : 'text-[color:var(--color-secondary-fixed-dim)]'}`}>
                  <span className="material-symbols-outlined" style={{ fontSize: 16 }}>warning</span>
                  {p.risk} risk
                </span>
              )}
            </div>
          ))}
        </div>

        {/* Queue stats */}
        <div className="flex flex-col gap-4">
          <div className="bg-[color:var(--color-surface-container-lowest)] border border-[color:var(--color-outline-variant)] rounded-lg p-6 shadow-sm">
            <h3 className="text-h2 text-[color:var(--color-on-background)] mb-4">Queue Status</h3>
            <div className="space-y-4">
              {queue.map((q) => (
                <div key={q.label} className="flex items-center justify-between">
                  <span className="text-body-md text-[color:var(--color-on-surface-variant)]">{q.label}</span>
                  <span className={`text-display text-[28px] font-bold ${q.color}`}>{q.value}</span>
                </div>
              ))}
            </div>
            <button className="w-full mt-4 py-2 border border-[color:var(--color-outline-variant)] text-[color:var(--color-on-surface-variant)] rounded text-label-md hover:bg-[color:var(--color-surface-container-low)] transition-colors flex items-center justify-center gap-2">
              <span className="material-symbols-outlined" style={{ fontSize: 18 }}>schedule</span>
              View queue
            </button>
          </div>

          <div className="bg-[color:var(--color-surface-container-lowest)] border border-[color:var(--color-outline-variant)] rounded-lg p-6 shadow-sm">
            <h3 className="text-h2 text-[color:var(--color-on-background)] mb-4">Quiet Hours</h3>
            <div className="bg-[color:var(--color-primary-fixed)]/20 border border-[color:var(--color-primary-fixed)] rounded p-3 mb-3">
              <p className="text-label-md text-[color:var(--color-primary)] flex items-center gap-1">
                <span className="material-symbols-outlined" style={{ fontSize: 16 }}>check_circle</span>
                Active: 22:00 – 08:00 UTC
              </p>
            </div>
            <p className="text-body-md text-[color:var(--color-on-surface-variant)]">No automated actions execute outside business hours.</p>
          </div>
        </div>
      </div>
    </PageShell>
  )
}
