import { PageShell } from '@/components/layout/page-shell'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { PlatformIcon } from '@/components/ui/platform-icon'
import { ScoreRing } from '@/components/ui/score-ring'
import { mockAccounts } from '@/lib/mock-data'
import { Flame, Play, Pause, MoreHorizontal, CheckCircle2, Clock } from 'lucide-react'

const warmupAccounts = mockAccounts.filter((a) => a.authStatus === 'CONNECTED')

const recentActions = [
  { type: 'upvote', target: 'r/SaaS post about pricing models', account: 'u/growth_ops_1', time: '2m ago', status: 'done' },
  { type: 'comment', target: 'r/entrepreneur growth discussion', account: 'u/growth_ops_1', time: '18m ago', status: 'done' },
  { type: 'join', target: 'Telegram: SaaS Operators Hub', account: 'SignalBot Alpha', time: '34m ago', status: 'done' },
  { type: 'like', target: 'X post by @saas_founder_dao', account: '@growthacme', time: '1h ago', status: 'done' },
  { type: 'comment', target: 'r/startups pricing thread', account: 'u/growth_ops_1', time: '2h ago', status: 'done' },
  { type: 'upvote', target: 'r/SaaS cold outreach debate', account: 'SignalBot Alpha', time: '3h ago', status: 'done' },
]

const scheduledActions = [
  { type: 'comment', target: 'r/entrepreneur weekly thread', account: 'u/growth_ops_1', time: 'in 12m', status: 'scheduled' },
  { type: 'like', target: 'TG message in SaaS Founders Chat', account: 'SignalBot Alpha', time: 'in 28m', status: 'scheduled' },
  { type: 'upvote', target: 'r/startups AMA post', account: 'u/growth_ops_1', time: 'in 45m', status: 'scheduled' },
]

export default function WarmupPage() {
  return (
    <PageShell title="Reputation Engine" subtitle="Control account warmup and health">
      <div className="grid grid-cols-3 gap-4">
        {/* Account warmup status */}
        <div className="flex flex-col gap-3">
          <h2 className="text-xs font-semibold text-zinc-500 uppercase tracking-wide">Account Status</h2>
          {warmupAccounts.map((account) => (
            <Card key={account.id}>
              <CardContent className="p-3">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <PlatformIcon platform={account.platform} />
                    <div>
                      <p className="text-xs font-semibold text-zinc-900">{account.displayName}</p>
                      <p className="text-[10px] text-zinc-400">{account.platform}</p>
                    </div>
                  </div>
                  <button className="rounded p-1 hover:bg-zinc-100">
                    <MoreHorizontal className="h-4 w-4 text-zinc-400" />
                  </button>
                </div>

                <div className="grid grid-cols-2 gap-2 mb-3">
                  <div className="text-center">
                    <p className="text-[10px] text-zinc-400 mb-1">Reputation</p>
                    <ScoreRing score={account.reputationScore} size="sm" className="mx-auto" />
                  </div>
                  <div className="text-center">
                    <p className="text-[10px] text-zinc-400 mb-1">Risk</p>
                    <ScoreRing score={100 - account.riskScore} size="sm" className="mx-auto" />
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1">
                    <Flame className="h-3 w-3 text-orange-400" />
                    <Badge
                      variant={
                        account.warmupStatus === 'READY'
                          ? 'success'
                          : account.warmupStatus === 'WARMING'
                            ? 'info'
                            : 'default'
                      }
                    >
                      {account.warmupStatus}
                    </Badge>
                  </div>
                  <div className="flex gap-1">
                    {account.warmupStatus === 'WARMING' ? (
                      <Button variant="ghost" size="sm" className="px-1.5">
                        <Pause className="h-3.5 w-3.5" />
                      </Button>
                    ) : (
                      <Button variant="ghost" size="sm" className="px-1.5">
                        <Play className="h-3.5 w-3.5" />
                      </Button>
                    )}
                  </div>
                </div>

                {account.warmupStatus === 'WARMING' && (
                  <div className="mt-2">
                    <div className="flex justify-between mb-0.5">
                      <span className="text-[10px] text-zinc-400">Daily progress</span>
                      <span className="text-[10px] text-zinc-600">7 / {account.dailyActionLimit}</span>
                    </div>
                    <div className="h-1 rounded-full bg-zinc-100">
                      <div
                        className="h-1 rounded-full bg-blue-400"
                        style={{ width: `${(7 / account.dailyActionLimit) * 100}%` }}
                      />
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Scheduled actions */}
        <Card>
          <CardHeader>
            <CardTitle>Scheduled</CardTitle>
            <Badge variant="info">{scheduledActions.length}</Badge>
          </CardHeader>
          <CardContent className="p-0">
            {scheduledActions.map((action, i) => (
              <div key={i} className="flex items-start gap-2 border-b border-zinc-50 px-4 py-2.5">
                <Clock className="mt-0.5 h-3.5 w-3.5 flex-shrink-0 text-blue-400" />
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-medium text-zinc-800">
                    {action.type}
                    <span className="ml-1 font-normal text-zinc-400">in {action.time.replace('in ', '')}</span>
                  </p>
                  <p className="text-[10px] text-zinc-500 truncate">{action.target}</p>
                  <p className="text-[10px] text-zinc-400">{action.account}</p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Recent actions */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Actions</CardTitle>
            <Badge variant="success">{recentActions.length} today</Badge>
          </CardHeader>
          <CardContent className="p-0">
            {recentActions.map((action, i) => (
              <div key={i} className="flex items-start gap-2 border-b border-zinc-50 px-4 py-2.5">
                <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 flex-shrink-0 text-emerald-500" />
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-medium text-zinc-800">
                    {action.type}
                    <span className="ml-1 font-normal text-zinc-400">{action.time}</span>
                  </p>
                  <p className="text-[10px] text-zinc-500 truncate">{action.target}</p>
                  <p className="text-[10px] text-zinc-400">{action.account}</p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </PageShell>
  )
}
