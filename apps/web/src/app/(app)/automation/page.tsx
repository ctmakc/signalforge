import { PageShell } from '@/components/layout/page-shell'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { AlertTriangle, Bot, CheckCircle2, Clock, Zap } from 'lucide-react'

const modes = [
  {
    key: 'manual',
    label: 'Manual',
    description: 'All actions require explicit operator approval.',
    icon: CheckCircle2,
    color: 'border-zinc-200 bg-white',
    badge: 'default' as const,
  },
  {
    key: 'assisted',
    label: 'Assisted',
    description: 'AI drafts replies and DMs, operator approves before sending.',
    icon: Bot,
    color: 'border-blue-200 bg-blue-50',
    badge: 'info' as const,
    active: true,
  },
  {
    key: 'auto',
    label: 'Autopilot',
    description: 'AI handles all actions within configured limits. High-risk actions still require approval.',
    icon: Zap,
    color: 'border-zinc-200 bg-white',
    badge: 'warning' as const,
  },
]

const policies = [
  { label: 'Require approval for public replies', value: true, risk: 'low' },
  { label: 'Require approval for first DM', value: true, risk: 'low' },
  { label: 'Require approval when AI confidence < 70%', value: true, risk: 'low' },
  { label: 'Auto-dismiss signals below score 40', value: false, risk: 'low' },
  { label: 'Auto-engage with high intent (90+) signals', value: false, risk: 'medium' },
  { label: 'Auto-send DM follow-ups after 48h no reply', value: false, risk: 'high' },
]

const rateLimits = [
  { platform: 'Reddit', maxRepliesDay: 8, maxDmsDay: 3, cooldownMin: 45 },
  { platform: 'Telegram', maxRepliesDay: 15, maxDmsDay: 10, cooldownMin: 20 },
  { platform: 'X', maxRepliesDay: 10, maxDmsDay: 5, cooldownMin: 30 },
  { platform: 'Facebook', maxRepliesDay: 5, maxDmsDay: 2, cooldownMin: 60 },
]

const queueStats = [
  { label: 'Pending approval', value: 4, color: 'text-amber-600' },
  { label: 'Scheduled', value: 12, color: 'text-blue-600' },
  { label: 'Processing', value: 2, color: 'text-violet-600' },
  { label: 'Completed today', value: 31, color: 'text-emerald-600' },
]

export default function AutomationPage() {
  return (
    <PageShell title="Automation & Agents" subtitle="Control how autonomous the system operates">
      <div className="grid grid-cols-3 gap-4">
        {/* Mode selector */}
        <div className="col-span-3">
          <h2 className="mb-2 text-xs font-semibold uppercase tracking-wide text-zinc-500">
            Automation Mode
          </h2>
          <div className="grid grid-cols-3 gap-3">
            {modes.map((mode) => {
              const Icon = mode.icon
              return (
                <button
                  key={mode.key}
                  className={`rounded-lg border-2 p-4 text-left transition-all hover:shadow-sm ${
                    mode.active ? 'border-blue-400 bg-blue-50' : 'border-zinc-200 bg-white hover:border-zinc-300'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <Icon
                      className={`h-5 w-5 ${mode.active ? 'text-blue-600' : 'text-zinc-400'}`}
                    />
                    {mode.active && <Badge variant="info">Active</Badge>}
                  </div>
                  <p
                    className={`text-sm font-semibold ${mode.active ? 'text-blue-900' : 'text-zinc-700'}`}
                  >
                    {mode.label}
                  </p>
                  <p className="mt-1 text-xs text-zinc-500">{mode.description}</p>
                </button>
              )
            })}
          </div>
        </div>

        {/* Policies */}
        <Card className="col-span-2">
          <CardHeader>
            <CardTitle>Approval Policies</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            {policies.map((policy, i) => (
              <div
                key={i}
                className="flex items-center justify-between border-b border-zinc-50 px-4 py-3"
              >
                <div className="flex items-center gap-2">
                  <div
                    className={`h-4 w-7 rounded-full flex items-center transition-colors ${
                      policy.value ? 'bg-zinc-900' : 'bg-zinc-200'
                    }`}
                  >
                    <div
                      className={`h-3 w-3 rounded-full bg-white shadow transition-transform mx-0.5 ${
                        policy.value ? 'translate-x-3' : 'translate-x-0'
                      }`}
                    />
                  </div>
                  <span className="text-xs text-zinc-700">{policy.label}</span>
                </div>
                <div className="flex items-center gap-2">
                  {policy.risk !== 'low' && (
                    <div className="flex items-center gap-1">
                      <AlertTriangle
                        className={`h-3 w-3 ${policy.risk === 'high' ? 'text-red-400' : 'text-amber-400'}`}
                      />
                      <span
                        className={`text-[10px] ${policy.risk === 'high' ? 'text-red-500' : 'text-amber-500'}`}
                      >
                        {policy.risk} risk
                      </span>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Queue stats */}
        <div className="flex flex-col gap-3">
          <Card>
            <CardHeader>
              <CardTitle>Queue Status</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {queueStats.map((s) => (
                  <div key={s.label} className="flex items-center justify-between">
                    <span className="text-xs text-zinc-500">{s.label}</span>
                    <span className={`text-sm font-bold ${s.color}`}>{s.value}</span>
                  </div>
                ))}
              </div>
              <Button variant="outline" size="sm" className="mt-3 w-full">
                <Clock className="h-3.5 w-3.5" />
                View queue
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Rate Limits</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              {rateLimits.map((r) => (
                <div key={r.platform} className="border-b border-zinc-50 px-4 py-2.5">
                  <p className="text-xs font-medium text-zinc-800 mb-1">{r.platform}</p>
                  <div className="flex gap-3 text-[10px] text-zinc-400">
                    <span>Replies: <span className="text-zinc-700">{r.maxRepliesDay}/day</span></span>
                    <span>DMs: <span className="text-zinc-700">{r.maxDmsDay}/day</span></span>
                    <span>Cooldown: <span className="text-zinc-700">{r.cooldownMin}m</span></span>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Quiet hours */}
        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Quiet Hours</CardTitle>
            <Badge variant="success">Active 22:00 – 08:00 UTC</Badge>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-4">
              <div className="h-2 flex-1 rounded-full bg-zinc-100 relative overflow-hidden">
                <div className="absolute inset-y-0 bg-zinc-300" style={{ left: '0%', right: '67%' }} />
                <div className="absolute inset-y-0 bg-zinc-300" style={{ left: '91%', right: '0%' }} />
              </div>
              <span className="text-xs text-zinc-500 flex-shrink-0">00:00 – 24:00 UTC</span>
            </div>
            <p className="mt-2 text-xs text-zinc-400">
              No automated actions will execute between 22:00 and 08:00 UTC. Manual actions still available.
            </p>
          </CardContent>
        </Card>
      </div>
    </PageShell>
  )
}
