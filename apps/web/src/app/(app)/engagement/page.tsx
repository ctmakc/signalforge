import { PageShell } from '@/components/layout/page-shell'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { PlatformIcon } from '@/components/ui/platform-icon'
import { ScoreRing } from '@/components/ui/score-ring'
import { mockSignals } from '@/lib/mock-data'
import { timeAgo } from '@/lib/utils'
import { RefreshCw, Send, ThumbsUp, ThumbsDown, AlertCircle } from 'lucide-react'

const activeSignal = mockSignals[0]

const suggestedReplies = [
  {
    id: 'r1',
    tone: 'Value-first',
    text: "We've been working exactly on this problem. SignalForge lets you run controlled, reputation-aware outreach across Reddit + X without triggering bans — warmup baked in, action rate-limited per account. Happy to show you how it works if you're exploring options.",
    risk: 'low',
  },
  {
    id: 'r2',
    tone: 'Conversational',
    text: "What specifically kept getting you banned? Was it post frequency, account age, or the reply patterns? Asking because different root causes need different solutions — some of what I've seen work is warming accounts before any outreach and keeping reply-to-original-post ratios natural.",
    risk: 'low',
  },
  {
    id: 'r3',
    tone: 'Direct pitch',
    text: "Check out SignalForge — it was literally built for this. Multi-account Reddit+X outreach with warmup engine, proxy assignment, and daily action controls. We're in early access. DM me if you want in.",
    risk: 'medium',
  },
]

export default function EngagementPage() {
  return (
    <PageShell title="Engagement Composer" subtitle="Draft and approve public thread replies">
      <div className="grid grid-cols-2 gap-4 h-[calc(100vh-8rem)]">
        {/* Left: Source content */}
        <div className="flex flex-col gap-3 overflow-hidden">
          <Card className="flex-shrink-0">
            <CardHeader>
              <CardTitle>Source Post</CardTitle>
              <div className="flex items-center gap-2">
                <PlatformIcon platform={activeSignal.platform} size="sm" />
                <span className="text-xs text-zinc-500">{activeSignal.source}</span>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex items-start gap-3">
                <ScoreRing score={activeSignal.intentScore} />
                <div className="flex-1">
                  <p className="text-xs font-semibold text-zinc-900 mb-1">
                    {activeSignal.authorName}
                    <span className="ml-2 font-normal text-zinc-400">
                      {timeAgo(activeSignal.postedAt)}
                    </span>
                  </p>
                  {activeSignal.title && (
                    <p className="text-sm font-medium text-zinc-800 mb-1">{activeSignal.title}</p>
                  )}
                  <p className="text-sm text-zinc-600">{activeSignal.bodyText}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="flex-1 overflow-hidden">
            <CardHeader>
              <CardTitle>AI Analysis</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="rounded bg-violet-50 border border-violet-100 p-3">
                  <p className="text-xs font-medium text-violet-700 mb-1">Summary</p>
                  <p className="text-xs text-violet-800">{activeSignal.aiSummary}</p>
                </div>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { label: 'Intent', value: activeSignal.intentScore },
                    { label: 'Urgency', value: activeSignal.urgencyScore },
                    { label: 'Fit', value: activeSignal.fitScore },
                  ].map((m) => (
                    <div key={m.label} className="rounded border border-zinc-100 p-2 text-center">
                      <p className="text-[10px] text-zinc-400">{m.label}</p>
                      <ScoreRing score={m.value} size="sm" className="mx-auto mt-1" />
                    </div>
                  ))}
                </div>
                <div>
                  <p className="text-xs font-medium text-zinc-500 mb-1">Detected need</p>
                  <p className="text-xs text-zinc-800">{activeSignal.extractedNeed}</p>
                </div>
                <div>
                  <p className="text-xs font-medium text-zinc-500 mb-1">Recommended action</p>
                  <p className="text-xs text-zinc-800">{activeSignal.recommendedAction}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right: Reply composer */}
        <div className="flex flex-col gap-3 overflow-hidden">
          <Card className="flex-shrink-0">
            <CardHeader>
              <CardTitle>Reply Variants</CardTitle>
              <Button variant="ghost" size="sm">
                <RefreshCw className="h-3.5 w-3.5" />
                Regenerate
              </Button>
            </CardHeader>
            <CardContent className="space-y-3">
              {suggestedReplies.map((r) => (
                <div key={r.id} className="rounded border border-zinc-200 p-3">
                  <div className="flex items-center justify-between mb-2">
                    <Badge variant="default">{r.tone}</Badge>
                    <Badge variant={r.risk === 'low' ? 'success' : 'warning'}>
                      {r.risk} risk
                    </Badge>
                  </div>
                  <p className="text-xs text-zinc-700 leading-relaxed">{r.text}</p>
                  <div className="mt-2 flex gap-1">
                    <Button variant="ghost" size="sm" className="px-1.5">
                      <ThumbsUp className="h-3.5 w-3.5" />
                    </Button>
                    <Button variant="ghost" size="sm" className="px-1.5">
                      <ThumbsDown className="h-3.5 w-3.5" />
                    </Button>
                    <Button variant="outline" size="sm" className="ml-auto">
                      Use this
                    </Button>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card className="flex-1 flex flex-col">
            <CardHeader>
              <CardTitle>Final Reply</CardTitle>
              <div className="flex items-center gap-1 text-xs text-amber-600">
                <AlertCircle className="h-3 w-3" />
                Requires approval
              </div>
            </CardHeader>
            <CardContent className="flex flex-1 flex-col gap-3">
              <textarea
                className="flex-1 resize-none rounded border border-zinc-200 bg-zinc-50 p-3 text-sm text-zinc-800 focus:border-zinc-400 focus:outline-none focus:bg-white"
                defaultValue={suggestedReplies[0].text}
                rows={6}
              />
              <div className="flex items-center gap-2">
                <div className="flex gap-1">
                  {['Professional', 'Casual', 'Direct'].map((t) => (
                    <button
                      key={t}
                      className={`rounded px-2 py-1 text-xs ${
                        t === 'Value-first'
                          ? 'bg-zinc-900 text-white'
                          : 'border border-zinc-200 text-zinc-500 hover:bg-zinc-50'
                      }`}
                    >
                      {t}
                    </button>
                  ))}
                </div>
                <div className="ml-auto flex gap-2">
                  <Button variant="outline" size="sm">
                    Skip
                  </Button>
                  <Button variant="success" size="sm">
                    <Send className="h-3.5 w-3.5" />
                    Approve & Send
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </PageShell>
  )
}
