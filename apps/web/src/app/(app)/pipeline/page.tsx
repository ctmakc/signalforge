'use client'
import { useState } from 'react'
import { PageShell } from '@/components/layout/page-shell'
import { mockLeads } from '@/lib/mock-data'
import { toast } from '@/store/toast'

const STAGES = [
  { key: 'NEW', label: 'New' },
  { key: 'CONTACTED', label: 'Contacted' },
  { key: 'REPLIED', label: 'Replied' },
  { key: 'QUALIFIED', label: 'Qualified' },
  { key: 'NEGOTIATION', label: 'Negotiation' },
  { key: 'WON', label: 'Won' },
  { key: 'LOST', label: 'Lost' },
]

const PLATFORM_META: Record<string, { icon: string; color: string }> = {
  REDDIT: { icon: 'forum', color: '#FF4500' },
  TELEGRAM: { icon: 'send', color: '#0088cc' },
  X: { icon: 'tag', color: '#1DA1F2' },
  FACEBOOK: { icon: 'thumb_up', color: '#1877F2' },
  LINKEDIN: { icon: 'work', color: '#0A66C2' },
}

const tempColor: Record<string, string> = {
  hot: 'text-[color:var(--color-error)]',
  warm: 'text-[color:var(--color-secondary)]',
  cold: 'text-[color:var(--color-outline)]',
}

type Lead = (typeof mockLeads)[0] & { pipelineStage: string }

export default function PipelinePage() {
  const [leads, setLeads] = useState<Lead[]>(mockLeads.map((l) => ({ ...l })))
  const [dragging, setDragging] = useState<string | null>(null)

  const totalValue = leads.reduce((s, l) => s + (l.estimatedValue ?? 0), 0)

  function moveToStage(leadId: string, newStage: string) {
    setLeads((prev) =>
      prev.map((l) => {
        if (l.id !== leadId) return l
        toast.success(`${l.displayName} moved to ${STAGES.find((s) => s.key === newStage)?.label}`)
        return { ...l, pipelineStage: newStage }
      })
    )
  }

  function onDragStart(leadId: string) {
    setDragging(leadId)
  }

  function onDrop(stage: string) {
    if (dragging) {
      moveToStage(dragging, stage)
      setDragging(null)
    }
  }

  return (
    <PageShell
      title="CRM Pipeline"
      subtitle="Track and manage prospect conversations from signal to close."
      headerActions={
        <div className="flex gap-3">
          <button className="flex items-center gap-2 px-4 py-2 bg-[color:var(--color-surface-container)] border border-[color:var(--color-outline-variant)] rounded text-label-md hover:bg-[color:var(--color-surface-container-high)] transition-colors">
            <span className="material-symbols-outlined" style={{ fontSize: 18 }}>filter_list</span>
            Filter
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-[color:var(--color-primary)] text-[color:var(--color-on-primary)] rounded text-label-md hover:opacity-90 transition-opacity shadow-sm">
            <span className="material-symbols-outlined" style={{ fontSize: 18 }}>add</span>
            Add Lead
          </button>
        </div>
      }
    >
      <div className="mb-4 flex items-center gap-4 text-body-md text-[color:var(--color-on-surface-variant)]">
        <span><span className="font-semibold text-[color:var(--color-on-background)]">{leads.length}</span> active leads</span>
        <span>Pipeline value: <span className="font-semibold text-[color:var(--color-secondary)]">${totalValue.toLocaleString()}/mo</span></span>
        <span className="text-label-md text-[color:var(--color-outline)]">Drag cards between columns to update stage</span>
      </div>

      <div className="flex gap-4 overflow-x-auto pb-4">
        {STAGES.map((stage) => {
          const stageLeads = leads.filter((l) => l.pipelineStage === stage.key)
          return (
            <div
              key={stage.key}
              className="flex-shrink-0 w-56"
              onDragOver={(e) => e.preventDefault()}
              onDrop={() => onDrop(stage.key)}
            >
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-label-md text-[color:var(--color-on-surface-variant)] uppercase tracking-wider">{stage.label}</h3>
                <span className="px-2 py-0.5 bg-[color:var(--color-surface-container-high)] rounded-full text-code text-[color:var(--color-on-surface-variant)]">{stageLeads.length}</span>
              </div>

              <div className="space-y-3 min-h-[60px]">
                {stageLeads.map((lead) => {
                  const meta = PLATFORM_META[lead.platform] ?? PLATFORM_META.REDDIT
                  return (
                    <article
                      key={lead.id}
                      draggable
                      onDragStart={() => onDragStart(lead.id)}
                      className="bg-[color:var(--color-surface-container-lowest)] border border-[color:var(--color-outline-variant)] rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow cursor-grab active:cursor-grabbing active:opacity-70 active:scale-[0.98]"
                    >
                      <div className="flex items-start justify-between gap-2 mb-3">
                        <div className="flex items-center gap-2">
                          <span className="material-symbols-outlined" style={{ color: meta.color, fontSize: 18 }}>{meta.icon}</span>
                          <span className="text-body-md font-medium text-[color:var(--color-on-background)] truncate">{lead.displayName}</span>
                        </div>
                        <div className="flex items-center gap-1 bg-[color:var(--color-surface-container-high)] rounded px-1.5 py-0.5 text-code text-[color:var(--color-on-surface)] font-semibold flex-shrink-0">
                          {lead.signalScore}
                        </div>
                      </div>
                      <p className="text-code text-[color:var(--color-outline)] mb-2">{lead.handle}</p>
                      <div className="flex flex-wrap gap-1 mb-3">
                        {lead.tags.map((t) => (
                          <span key={t} className="px-1.5 py-0.5 bg-[color:var(--color-surface-container)] rounded text-[11px] text-[color:var(--color-on-surface-variant)]">{t}</span>
                        ))}
                      </div>
                      <div className="flex items-center justify-between text-code">
                        <span className={`font-medium ${tempColor[lead.temperature] ?? ''}`}>{lead.temperature}</span>
                        <span className="text-[color:var(--color-on-surface-variant)]">${lead.estimatedValue}/mo</span>
                      </div>

                      {/* Quick stage mover */}
                      <div className="mt-3 pt-2 border-t border-[color:var(--color-surface-container-high)]">
                        <select
                          value={lead.pipelineStage}
                          onChange={(e) => moveToStage(lead.id, e.target.value)}
                          onClick={(e) => e.stopPropagation()}
                          className="w-full text-[11px] bg-[color:var(--color-surface-container)] border border-[color:var(--color-outline-variant)] rounded px-1.5 py-1 text-[color:var(--color-on-surface-variant)] cursor-pointer"
                        >
                          {STAGES.map((s) => (
                            <option key={s.key} value={s.key}>{s.label}</option>
                          ))}
                        </select>
                      </div>
                    </article>
                  )
                })}
                {stageLeads.length === 0 && (
                  <div className="border-2 border-dashed border-[color:var(--color-outline-variant)] rounded-lg p-6 text-center opacity-50">
                    <p className="text-code text-[color:var(--color-outline)]">Drop here</p>
                  </div>
                )}
              </div>
            </div>
          )
        })}
      </div>
    </PageShell>
  )
}
