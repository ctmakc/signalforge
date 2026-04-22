import { PageShell } from '@/components/layout/page-shell'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { PlatformIcon } from '@/components/ui/platform-icon'
import { ScoreRing } from '@/components/ui/score-ring'
import { mockLeads } from '@/lib/mock-data'
import { timeAgo } from '@/lib/utils'
import { Plus, MessageSquare, ChevronRight } from 'lucide-react'

const STAGES = [
  { key: 'NEW', label: 'New', color: 'bg-zinc-100 text-zinc-600' },
  { key: 'CONTACTED', label: 'Contacted', color: 'bg-blue-50 text-blue-700' },
  { key: 'REPLIED', label: 'Replied', color: 'bg-sky-50 text-sky-700' },
  { key: 'QUALIFIED', label: 'Qualified', color: 'bg-violet-50 text-violet-700' },
  { key: 'NEGOTIATION', label: 'Negotiation', color: 'bg-amber-50 text-amber-700' },
  { key: 'WON', label: 'Won', color: 'bg-emerald-50 text-emerald-700' },
  { key: 'LOST', label: 'Lost', color: 'bg-red-50 text-red-700' },
]

const tempColor: Record<string, string> = {
  hot: 'text-red-500',
  warm: 'text-amber-500',
  cold: 'text-blue-400',
}

function LeadCard({ lead }: { lead: (typeof mockLeads)[0] }) {
  return (
    <div className="rounded-lg border border-zinc-200 bg-white p-3 shadow-sm hover:shadow-md transition-shadow cursor-pointer">
      <div className="flex items-start justify-between gap-2 mb-2">
        <div className="flex items-center gap-1.5">
          <PlatformIcon platform={lead.platform} size="sm" />
          <span className="text-xs font-semibold text-zinc-900">{lead.displayName}</span>
        </div>
        <ScoreRing score={lead.signalScore} size="sm" />
      </div>
      <p className="text-[10px] text-zinc-400 mb-2">{lead.handle}</p>
      <div className="flex flex-wrap gap-1 mb-2">
        {lead.tags.map((t) => (
          <Badge key={t} variant="default" className="text-[9px]">
            {t}
          </Badge>
        ))}
      </div>
      <div className="flex items-center justify-between">
        <div>
          <span className={`text-xs font-medium ${tempColor[lead.temperature]}`}>
            {lead.temperature}
          </span>
          {lead.estimatedValue && (
            <span className="ml-1.5 text-xs text-zinc-400">${lead.estimatedValue}/mo</span>
          )}
        </div>
        <div className="flex gap-1">
          <button className="rounded p-1 hover:bg-zinc-100">
            <MessageSquare className="h-3 w-3 text-zinc-400" />
          </button>
          <button className="rounded p-1 hover:bg-zinc-100">
            <ChevronRight className="h-3 w-3 text-zinc-400" />
          </button>
        </div>
      </div>
      <p className="mt-1.5 text-[10px] text-zinc-400">{timeAgo(lead.lastInteractionAt)}</p>
    </div>
  )
}

export default function PipelinePage() {
  const totalValue = mockLeads.reduce((sum, l) => sum + (l.estimatedValue ?? 0), 0)

  return (
    <PageShell
      title="DM Pipeline"
      subtitle="Move private conversations through the deal funnel"
      actions={
        <Button size="sm">
          <Plus className="h-3.5 w-3.5" />
          Add Lead
        </Button>
      }
    >
      {/* Summary */}
      <div className="mb-4 flex items-center gap-4 text-xs text-zinc-500">
        <span>
          <span className="font-semibold text-zinc-900">{mockLeads.length}</span> leads
        </span>
        <span>
          Pipeline value:{' '}
          <span className="font-semibold text-emerald-700">${totalValue.toLocaleString()}/mo</span>
        </span>
      </div>

      {/* Kanban board */}
      <div className="flex gap-3 overflow-x-auto pb-4">
        {STAGES.map((stage) => {
          const leads = mockLeads.filter((l) => l.pipelineStage === stage.key)
          return (
            <div key={stage.key} className="flex w-56 flex-shrink-0 flex-col gap-2">
              {/* Column header */}
              <div className="flex items-center justify-between">
                <div className={`rounded px-2 py-0.5 text-xs font-medium ${stage.color}`}>
                  {stage.label}
                </div>
                <span className="text-xs text-zinc-400">{leads.length}</span>
              </div>

              {/* Cards */}
              <div className="flex flex-col gap-2">
                {leads.map((lead) => (
                  <LeadCard key={lead.id} lead={lead} />
                ))}
                {leads.length === 0 && (
                  <div className="rounded-lg border border-dashed border-zinc-200 p-4 text-center">
                    <p className="text-xs text-zinc-300">No leads</p>
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
