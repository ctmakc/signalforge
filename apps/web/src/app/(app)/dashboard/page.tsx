import { PageShell } from '@/components/layout/page-shell'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { PlatformIcon } from '@/components/ui/platform-icon'
import { ScoreRing } from '@/components/ui/score-ring'
import {
  mockDashboardKPIs,
  mockActivityFeed,
  mockSignals,
  mockAccounts,
} from '@/lib/mock-data'
import { timeAgo } from '@/lib/utils'
import {
  Zap,
  TrendingUp,
  MessageSquare,
  Users,
  ArrowUpRight,
  AlertTriangle,
  CheckCircle2,
  Clock,
} from 'lucide-react'

function KPICard({
  label,
  value,
  delta,
  icon: Icon,
  accent,
}: {
  label: string
  value: number | string
  delta?: string
  icon: React.ElementType
  accent?: string
}) {
  return (
    <div className="rounded-lg border border-zinc-200 bg-white p-4 shadow-sm">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs text-zinc-500">{label}</p>
          <p className={`mt-1 text-2xl font-bold ${accent ?? 'text-zinc-900'}`}>{value}</p>
          {delta && <p className="mt-0.5 text-xs text-emerald-600">{delta}</p>}
        </div>
        <div className="rounded-md bg-zinc-100 p-2">
          <Icon className="h-4 w-4 text-zinc-500" />
        </div>
      </div>
    </div>
  )
}

function ActivityIcon({ type }: { type: string }) {
  switch (type) {
    case 'signal':
      return <Zap className="h-3.5 w-3.5 text-violet-500" />
    case 'reply':
      return <MessageSquare className="h-3.5 w-3.5 text-blue-500" />
    case 'dm':
      return <ArrowUpRight className="h-3.5 w-3.5 text-emerald-500" />
    case 'warmup':
      return <TrendingUp className="h-3.5 w-3.5 text-amber-500" />
    case 'lead':
      return <Users className="h-3.5 w-3.5 text-zinc-500" />
    default:
      return <Clock className="h-3.5 w-3.5 text-zinc-400" />
  }
}

function AccountHealthRow({
  account,
}: {
  account: (typeof mockAccounts)[0]
}) {
  const statusVariant: Record<string, 'success' | 'warning' | 'danger' | 'default'> = {
    HEALTHY: 'success',
    AT_RISK: 'danger',
    LIMITED: 'warning',
    UNKNOWN: 'default',
    BANNED: 'danger',
  }

  return (
    <div className="flex items-center gap-3 py-2">
      <PlatformIcon platform={account.platform} />
      <div className="min-w-0 flex-1">
        <p className="truncate text-xs font-medium text-zinc-800">{account.displayName}</p>
        <p className="text-[10px] text-zinc-400">
          Rep {account.reputationScore} · Risk {account.riskScore}
        </p>
      </div>
      <Badge variant={statusVariant[account.healthStatus] ?? 'default'}>
        {account.healthStatus}
      </Badge>
    </div>
  )
}

export default function DashboardPage() {
  const kpis = mockDashboardKPIs

  return (
    <PageShell title="Dashboard" subtitle="Today's operational overview">
      {/* KPI row */}
      <div className="grid grid-cols-2 gap-3 lg:grid-cols-3 xl:grid-cols-6">
        <KPICard
          label="Leads Detected"
          value={kpis.leadsDetectedToday}
          delta="+4 vs yesterday"
          icon={Users}
        />
        <KPICard
          label="High Intent"
          value={kpis.highIntentSignals}
          icon={Zap}
          accent="text-violet-700"
        />
        <KPICard
          label="Replies Sent"
          value={kpis.repliesSent}
          delta="+2 vs yesterday"
          icon={MessageSquare}
        />
        <KPICard
          label="DM Conversions"
          value={kpis.dmConversions}
          icon={ArrowUpRight}
          accent="text-emerald-700"
        />
        <KPICard label="Active Accounts" value={kpis.activeAccounts} icon={CheckCircle2} />
        <KPICard
          label="At Risk"
          value={kpis.atRiskAccounts}
          icon={AlertTriangle}
          accent="text-red-600"
        />
      </div>

      <div className="mt-4 grid grid-cols-1 gap-4 xl:grid-cols-3">
        {/* Recent signals */}
        <Card className="xl:col-span-2">
          <CardHeader>
            <CardTitle>Top Signals Today</CardTitle>
            <a href="/signals" className="text-xs text-zinc-400 hover:text-zinc-700">
              View all →
            </a>
          </CardHeader>
          <CardContent className="p-0">
            <table className="w-full text-xs">
              <thead>
                <tr className="border-b border-zinc-100">
                  <th className="px-4 py-2 text-left font-medium text-zinc-500">Author</th>
                  <th className="px-4 py-2 text-left font-medium text-zinc-500">Signal</th>
                  <th className="px-4 py-2 text-center font-medium text-zinc-500">Score</th>
                  <th className="px-4 py-2 text-left font-medium text-zinc-500">Status</th>
                </tr>
              </thead>
              <tbody>
                {mockSignals.slice(0, 5).map((s) => (
                  <tr key={s.id} className="border-b border-zinc-50 hover:bg-zinc-50">
                    <td className="px-4 py-2.5">
                      <div className="flex items-center gap-1.5">
                        <PlatformIcon platform={s.platform} size="sm" />
                        <span className="font-medium text-zinc-800">{s.authorName}</span>
                      </div>
                    </td>
                    <td className="max-w-[260px] px-4 py-2.5">
                      <p className="truncate text-zinc-600">{s.extractedNeed}</p>
                      <p className="text-[10px] text-zinc-400">{timeAgo(s.postedAt)}</p>
                    </td>
                    <td className="px-4 py-2.5 text-center">
                      <ScoreRing score={s.intentScore} size="sm" />
                    </td>
                    <td className="px-4 py-2.5">
                      <Badge
                        variant={
                          s.status === 'NEW'
                            ? 'info'
                            : s.status === 'ENGAGED'
                              ? 'success'
                              : 'default'
                        }
                      >
                        {s.status}
                      </Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </CardContent>
        </Card>

        {/* Right column */}
        <div className="flex flex-col gap-4">
          {/* Account health */}
          <Card>
            <CardHeader>
              <CardTitle>Account Health</CardTitle>
              <a href="/accounts" className="text-xs text-zinc-400 hover:text-zinc-700">
                Manage →
              </a>
            </CardHeader>
            <CardContent className="py-1">
              <div className="divide-y divide-zinc-50">
                {mockAccounts.map((a) => (
                  <AccountHealthRow key={a.id} account={a} />
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Activity feed */}
          <Card className="flex-1">
            <CardHeader>
              <CardTitle>Activity Feed</CardTitle>
            </CardHeader>
            <CardContent className="py-1">
              <div className="space-y-1">
                {mockActivityFeed.map((item) => (
                  <div key={item.id} className="flex items-start gap-2 py-1.5">
                    <div className="mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-zinc-100">
                      <ActivityIcon type={item.type} />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-xs text-zinc-700">{item.message}</p>
                      <p className="text-[10px] text-zinc-400">
                        {item.actor} · {timeAgo(item.time)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </PageShell>
  )
}
