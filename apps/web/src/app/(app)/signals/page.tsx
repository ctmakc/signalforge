import { PageShell } from '@/components/layout/page-shell'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { PlatformIcon } from '@/components/ui/platform-icon'
import { ScoreRing } from '@/components/ui/score-ring'
import { mockSignals } from '@/lib/mock-data'
import { timeAgo } from '@/lib/utils'
import { MessageSquare, X, Bookmark, ArrowRight, SlidersHorizontal } from 'lucide-react'

function SignalRow({ signal }: { signal: (typeof mockSignals)[0] }) {
  const statusVariant: Record<string, 'info' | 'success' | 'default' | 'warning'> = {
    NEW: 'info',
    REVIEWED: 'default',
    ENGAGED: 'success',
    DISMISSED: 'default',
    CONVERTED: 'success',
  }

  return (
    <div className="border-b border-zinc-100 px-4 py-3 hover:bg-zinc-50">
      <div className="flex items-start gap-3">
        {/* Score */}
        <ScoreRing score={signal.intentScore} size="md" className="flex-shrink-0 mt-0.5" />

        {/* Content */}
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2 mb-0.5">
            <PlatformIcon platform={signal.platform} size="sm" />
            <span className="text-xs font-semibold text-zinc-900">{signal.authorName}</span>
            <span className="text-xs text-zinc-400">via {signal.source}</span>
            <span className="text-xs text-zinc-300">·</span>
            <span className="text-xs text-zinc-400">{timeAgo(signal.postedAt)}</span>
            <Badge variant={statusVariant[signal.status] ?? 'default'} className="ml-auto">
              {signal.status}
            </Badge>
          </div>

          {signal.title && (
            <p className="text-sm font-medium text-zinc-800 mb-0.5">{signal.title}</p>
          )}
          <p className="text-xs text-zinc-500 line-clamp-2">{signal.bodyText}</p>

          {/* AI summary strip */}
          <div className="mt-2 rounded bg-violet-50 border border-violet-100 px-2.5 py-1.5">
            <p className="text-xs text-violet-800">
              <span className="font-medium">AI: </span>
              {signal.aiSummary}
            </p>
            <p className="mt-0.5 text-[10px] text-violet-500">
              Need: <span className="font-medium">{signal.extractedNeed}</span>
              <span className="mx-1.5">·</span>
              Action: <span className="font-medium">{signal.recommendedAction}</span>
            </p>
          </div>

          {/* Score breakdown */}
          <div className="mt-2 flex items-center gap-4">
            <span className="text-[10px] text-zinc-400">
              Intent <span className="font-semibold text-zinc-700">{signal.intentScore}</span>
            </span>
            <span className="text-[10px] text-zinc-400">
              Urgency <span className="font-semibold text-zinc-700">{signal.urgencyScore}</span>
            </span>
            <span className="text-[10px] text-zinc-400">
              Fit <span className="font-semibold text-zinc-700">{signal.fitScore}</span>
            </span>
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-shrink-0 flex-col gap-1.5">
          <Button variant="primary" size="sm">
            <MessageSquare className="h-3.5 w-3.5" />
            Engage
          </Button>
          <Button variant="outline" size="sm">
            <ArrowRight className="h-3.5 w-3.5" />
            DM
          </Button>
          <div className="flex gap-1">
            <Button variant="ghost" size="sm" className="px-1.5">
              <Bookmark className="h-3.5 w-3.5" />
            </Button>
            <Button variant="ghost" size="sm" className="px-1.5">
              <X className="h-3.5 w-3.5" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function SignalsPage() {
  return (
    <PageShell
      title="Lead Detection Feed"
      subtitle="Incoming intent signals from all sources"
      actions={
        <Button variant="outline" size="sm">
          <SlidersHorizontal className="h-3.5 w-3.5" />
          Filters
        </Button>
      }
    >
      {/* Filter bar */}
      <div className="mb-4 flex items-center gap-2">
        {['All', 'New', 'High Intent (80+)', 'Reviewed', 'Engaged'].map((f) => (
          <button
            key={f}
            className={`rounded px-2.5 py-1.5 text-xs ${
              f === 'All' ? 'bg-zinc-900 text-white' : 'bg-white border border-zinc-200 text-zinc-600 hover:bg-zinc-50'
            }`}
          >
            {f}
          </button>
        ))}
        <div className="ml-auto flex gap-2">
          {['All Platforms', 'Reddit', 'Telegram', 'X'].map((p) => (
            <button
              key={p}
              className="rounded border border-zinc-200 bg-white px-2.5 py-1.5 text-xs text-zinc-600 hover:bg-zinc-50"
            >
              {p}
            </button>
          ))}
        </div>
      </div>

      <Card>
        <CardContent className="p-0">
          {/* Column headers */}
          <div className="flex items-center gap-3 border-b border-zinc-100 bg-zinc-50 px-4 py-2">
            <div className="w-10 text-xs font-medium text-zinc-500">Score</div>
            <div className="flex-1 text-xs font-medium text-zinc-500">Signal</div>
            <div className="w-32 text-xs font-medium text-zinc-500">Actions</div>
          </div>

          {mockSignals.map((signal) => (
            <SignalRow key={signal.id} signal={signal} />
          ))}
        </CardContent>
      </Card>
    </PageShell>
  )
}
