import { PageShell } from '@/components/layout/page-shell'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { PlatformIcon } from '@/components/ui/platform-icon'
import { ScoreRing } from '@/components/ui/score-ring'
import { mockAccounts } from '@/lib/mock-data'
import { timeAgo } from '@/lib/utils'
import { Plus, RefreshCw, MoreHorizontal, Shield, Flame } from 'lucide-react'

const statusVariant: Record<string, 'success' | 'warning' | 'danger' | 'default' | 'info'> = {
  HEALTHY: 'success',
  AT_RISK: 'danger',
  LIMITED: 'warning',
  UNKNOWN: 'default',
  BANNED: 'danger',
  CONNECTED: 'success',
  DISCONNECTED: 'default',
  PENDING: 'info',
  ERROR: 'danger',
  READY: 'success',
  WARMING: 'info',
  IDLE: 'default',
  PAUSED: 'warning',
  SUSPENDED: 'danger',
}

export default function AccountsPage() {
  return (
    <PageShell
      title="Accounts Hub"
      subtitle="Manage connected platform identities"
      actions={
        <Button size="sm" className="gap-1.5">
          <Plus className="h-3.5 w-3.5" />
          Connect Account
        </Button>
      }
    >
      {/* Stats row */}
      <div className="mb-4 grid grid-cols-4 gap-3">
        {[
          { label: 'Connected', value: 3, color: 'text-emerald-700' },
          { label: 'Warming', value: 1, color: 'text-blue-600' },
          { label: 'At Risk', value: 1, color: 'text-red-600' },
          { label: 'Disconnected', value: 1, color: 'text-zinc-500' },
        ].map((s) => (
          <div key={s.label} className="rounded-lg border border-zinc-200 bg-white p-3 shadow-sm">
            <p className="text-xs text-zinc-500">{s.label}</p>
            <p className={`text-xl font-bold ${s.color}`}>{s.value}</p>
          </div>
        ))}
      </div>

      <Card>
        <CardContent className="p-0">
          <div className="flex items-center justify-between border-b border-zinc-100 px-4 py-2.5">
            <div className="flex gap-2">
              {['All', 'Reddit', 'Telegram', 'X', 'Facebook'].map((f) => (
                <button
                  key={f}
                  className={`rounded px-2 py-1 text-xs ${
                    f === 'All'
                      ? 'bg-zinc-900 text-white'
                      : 'text-zinc-500 hover:bg-zinc-100'
                  }`}
                >
                  {f}
                </button>
              ))}
            </div>
            <button className="flex items-center gap-1 text-xs text-zinc-400 hover:text-zinc-700">
              <RefreshCw className="h-3.5 w-3.5" />
              Refresh health
            </button>
          </div>

          <table className="w-full text-xs">
            <thead>
              <tr className="border-b border-zinc-100 bg-zinc-50">
                <th className="px-4 py-2.5 text-left font-medium text-zinc-500">Account</th>
                <th className="px-4 py-2.5 text-left font-medium text-zinc-500">Auth</th>
                <th className="px-4 py-2.5 text-left font-medium text-zinc-500">Warmup</th>
                <th className="px-4 py-2.5 text-left font-medium text-zinc-500">Health</th>
                <th className="px-4 py-2.5 text-center font-medium text-zinc-500">Rep</th>
                <th className="px-4 py-2.5 text-center font-medium text-zinc-500">Risk</th>
                <th className="px-4 py-2.5 text-left font-medium text-zinc-500">Limit/day</th>
                <th className="px-4 py-2.5 text-left font-medium text-zinc-500">Last seen</th>
                <th className="px-4 py-2.5" />
              </tr>
            </thead>
            <tbody>
              {mockAccounts.map((account) => (
                <tr key={account.id} className="border-b border-zinc-50 hover:bg-zinc-50">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <PlatformIcon platform={account.platform} />
                      <div>
                        <p className="font-medium text-zinc-900">{account.displayName}</p>
                        <p className="text-[10px] text-zinc-400">{account.platform}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <Badge variant={statusVariant[account.authStatus] ?? 'default'}>
                      {account.authStatus}
                    </Badge>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-1">
                      <Flame className="h-3 w-3 text-orange-400" />
                      <Badge variant={statusVariant[account.warmupStatus] ?? 'default'}>
                        {account.warmupStatus}
                      </Badge>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-1">
                      <Shield className="h-3 w-3 text-zinc-400" />
                      <Badge variant={statusVariant[account.healthStatus] ?? 'default'}>
                        {account.healthStatus}
                      </Badge>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-center">
                    <ScoreRing score={account.reputationScore} size="sm" />
                  </td>
                  <td className="px-4 py-3 text-center">
                    <ScoreRing
                      score={100 - account.riskScore}
                      size="sm"
                    />
                  </td>
                  <td className="px-4 py-3 text-zinc-700">{account.dailyActionLimit}</td>
                  <td className="px-4 py-3 text-zinc-400">
                    {account.lastSeenAt ? timeAgo(account.lastSeenAt) : '—'}
                  </td>
                  <td className="px-4 py-3">
                    <button className="rounded p-1 hover:bg-zinc-100">
                      <MoreHorizontal className="h-4 w-4 text-zinc-400" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardContent>
      </Card>
    </PageShell>
  )
}
