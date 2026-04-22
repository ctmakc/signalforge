import { PageShell } from '@/components/layout/page-shell'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { TrendingUp, TrendingDown, Minus } from 'lucide-react'

function MetricRow({
  label,
  value,
  delta,
  trend,
}: {
  label: string
  value: string | number
  delta: string
  trend: 'up' | 'down' | 'flat'
}) {
  return (
    <div className="flex items-center justify-between py-2 border-b border-zinc-50 last:border-0">
      <span className="text-xs text-zinc-600">{label}</span>
      <div className="flex items-center gap-2">
        <span className="text-sm font-semibold text-zinc-900">{value}</span>
        <div
          className={`flex items-center gap-0.5 text-[10px] ${
            trend === 'up' ? 'text-emerald-600' : trend === 'down' ? 'text-red-500' : 'text-zinc-400'
          }`}
        >
          {trend === 'up' ? (
            <TrendingUp className="h-3 w-3" />
          ) : trend === 'down' ? (
            <TrendingDown className="h-3 w-3" />
          ) : (
            <Minus className="h-3 w-3" />
          )}
          {delta}
        </div>
      </div>
    </div>
  )
}

function MiniBar({ value, max, color }: { value: number; max: number; color: string }) {
  return (
    <div className="h-1.5 flex-1 rounded-full bg-zinc-100">
      <div
        className={`h-1.5 rounded-full ${color}`}
        style={{ width: `${(value / max) * 100}%` }}
      />
    </div>
  )
}

const sourcePerformance = [
  { name: 'r/SaaS', signals: 34, replies: 12, conversions: 3 },
  { name: 'r/startups', signals: 29, replies: 9, conversions: 2 },
  { name: 'r/entrepreneur', signals: 21, replies: 7, conversions: 1 },
  { name: 'SaaS Founders Chat', signals: 17, replies: 6, conversions: 2 },
  { name: '#outreach #saas', signals: 8, replies: 2, conversions: 0 },
]

const funnel = [
  { stage: 'Signals detected', value: 109, pct: 100 },
  { stage: 'High intent (70+)', value: 34, pct: 31 },
  { stage: 'Engaged publicly', value: 18, pct: 17 },
  { stage: 'Converted to DM', value: 9, pct: 8 },
  { stage: 'Qualified leads', value: 5, pct: 5 },
  { stage: 'Won / Closed', value: 1, pct: 1 },
]

export default function AnalyticsPage() {
  return (
    <PageShell
      title="Analytics"
      subtitle="Signal-to-revenue performance"
      actions={
        <div className="flex gap-1">
          {['7d', '30d', '90d'].map((r) => (
            <button
              key={r}
              className={`rounded px-2 py-1 text-xs ${
                r === '30d' ? 'bg-zinc-900 text-white' : 'border border-zinc-200 text-zinc-500'
              }`}
            >
              {r}
            </button>
          ))}
        </div>
      }
    >
      <div className="grid grid-cols-4 gap-4">
        {/* KPIs */}
        {[
          { label: 'Signals Detected', value: '109', delta: '+18%', trend: 'up' as const },
          { label: 'Replies Sent', value: '31', delta: '+12%', trend: 'up' as const },
          { label: 'DM Conversion Rate', value: '8.3%', delta: '+1.2pp', trend: 'up' as const },
          { label: 'Est. Pipeline Value', value: '$5.1k/mo', delta: '+$890', trend: 'up' as const },
        ].map((kpi) => (
          <div key={kpi.label} className="rounded-lg border border-zinc-200 bg-white p-4 shadow-sm">
            <p className="text-xs text-zinc-500">{kpi.label}</p>
            <p className="mt-1 text-2xl font-bold text-zinc-900">{kpi.value}</p>
            <div
              className={`mt-0.5 flex items-center gap-1 text-xs ${
                kpi.trend === 'up' ? 'text-emerald-600' : 'text-red-500'
              }`}
            >
              <TrendingUp className="h-3 w-3" />
              {kpi.delta} vs prev period
            </div>
          </div>
        ))}

        {/* Funnel */}
        <Card className="col-span-2">
          <CardHeader>
            <CardTitle>Conversion Funnel</CardTitle>
            <Badge variant="default">Last 30 days</Badge>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {funnel.map((stage) => (
                <div key={stage.stage}>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs text-zinc-600">{stage.stage}</span>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-semibold text-zinc-900">{stage.value}</span>
                      <span className="text-[10px] text-zinc-400">{stage.pct}%</span>
                    </div>
                  </div>
                  <MiniBar
                    value={stage.value}
                    max={funnel[0].value}
                    color={
                      stage.pct > 50 ? 'bg-blue-400' : stage.pct > 20 ? 'bg-violet-400' : stage.pct > 5 ? 'bg-amber-400' : 'bg-emerald-500'
                    }
                  />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Source performance */}
        <Card className="col-span-2">
          <CardHeader>
            <CardTitle>Source Performance</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <table className="w-full text-xs">
              <thead>
                <tr className="border-b border-zinc-100">
                  <th className="px-4 py-2 text-left font-medium text-zinc-500">Source</th>
                  <th className="px-4 py-2 text-center font-medium text-zinc-500">Signals</th>
                  <th className="px-4 py-2 text-center font-medium text-zinc-500">Replies</th>
                  <th className="px-4 py-2 text-center font-medium text-zinc-500">Conversions</th>
                </tr>
              </thead>
              <tbody>
                {sourcePerformance.map((s) => (
                  <tr key={s.name} className="border-b border-zinc-50 hover:bg-zinc-50">
                    <td className="px-4 py-2.5 font-medium text-zinc-800">{s.name}</td>
                    <td className="px-4 py-2.5 text-center text-zinc-600">{s.signals}</td>
                    <td className="px-4 py-2.5 text-center text-zinc-600">{s.replies}</td>
                    <td className="px-4 py-2.5 text-center">
                      <span
                        className={`font-semibold ${
                          s.conversions > 2 ? 'text-emerald-700' : s.conversions > 0 ? 'text-amber-600' : 'text-zinc-300'
                        }`}
                      >
                        {s.conversions}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </CardContent>
        </Card>

        {/* Account performance */}
        <Card className="col-span-2">
          <CardHeader>
            <CardTitle>Platform Metrics</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-1">
              <MetricRow label="Reddit reply acceptance rate" value="68%" delta="+4%" trend="up" />
              <MetricRow label="Telegram DM open rate" value="82%" delta="+11%" trend="up" />
              <MetricRow label="X reply engagement rate" value="23%" delta="-2%" trend="down" />
              <MetricRow label="Avg reply-to-DM time" value="4.2h" delta="-0.8h" trend="up" />
              <MetricRow label="DM-to-qualified rate" value="55%" delta="flat" trend="flat" />
            </div>
          </CardContent>
        </Card>

        {/* Top keywords */}
        <Card className="col-span-2">
          <CardHeader>
            <CardTitle>Top Intent Keywords</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {[
                { word: 'outreach tool', count: 14 },
                { word: 'cold email alternative', count: 11 },
                { word: 'Reddit automation', count: 9 },
                { word: 'lead generation', count: 8 },
                { word: 'account banned', count: 7 },
                { word: 'Telegram leads', count: 6 },
              ].map((kw) => (
                <div key={kw.word} className="flex items-center gap-2">
                  <span className="text-xs text-zinc-700 w-36 truncate">{kw.word}</span>
                  <MiniBar value={kw.count} max={14} color="bg-violet-400" />
                  <span className="text-[10px] text-zinc-400 w-4">{kw.count}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </PageShell>
  )
}
