import { PageShell } from '@/components/layout/page-shell'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { PlatformIcon } from '@/components/ui/platform-icon'
import { mockSources } from '@/lib/mock-data'
import { Plus, MoreHorizontal, Radio, Pause } from 'lucide-react'

export default function SourcesPage() {
  return (
    <PageShell
      title="Signal Sources"
      subtitle="Define where to monitor for leads"
      actions={
        <Button size="sm">
          <Plus className="h-3.5 w-3.5" />
          Add Source
        </Button>
      }
    >
      <div className="mb-4 grid grid-cols-4 gap-3">
        {[
          { label: 'Active Sources', value: 4 },
          { label: 'Paused', value: 1 },
          { label: 'Signals Today', value: 109 },
          { label: 'Platforms', value: 3 },
        ].map((s) => (
          <div key={s.label} className="rounded-lg border border-zinc-200 bg-white p-3 shadow-sm">
            <p className="text-xs text-zinc-500">{s.label}</p>
            <p className="text-xl font-bold text-zinc-900">{s.value}</p>
          </div>
        ))}
      </div>

      <Card>
        <CardContent className="p-0">
          <div className="flex items-center gap-2 border-b border-zinc-100 px-4 py-2.5">
            {['All', 'Reddit', 'Telegram', 'X', 'Facebook'].map((f) => (
              <button
                key={f}
                className={`rounded px-2 py-1 text-xs ${
                  f === 'All' ? 'bg-zinc-900 text-white' : 'text-zinc-500 hover:bg-zinc-100'
                }`}
              >
                {f}
              </button>
            ))}
          </div>

          <table className="w-full text-xs">
            <thead>
              <tr className="border-b border-zinc-100 bg-zinc-50">
                <th className="px-4 py-2.5 text-left font-medium text-zinc-500">Source</th>
                <th className="px-4 py-2.5 text-left font-medium text-zinc-500">Type</th>
                <th className="px-4 py-2.5 text-left font-medium text-zinc-500">Tags</th>
                <th className="px-4 py-2.5 text-center font-medium text-zinc-500">Priority</th>
                <th className="px-4 py-2.5 text-center font-medium text-zinc-500">Signals</th>
                <th className="px-4 py-2.5 text-left font-medium text-zinc-500">Status</th>
                <th className="px-4 py-2.5 text-left font-medium text-zinc-500">Join</th>
                <th className="px-4 py-2.5" />
              </tr>
            </thead>
            <tbody>
              {mockSources.map((source) => (
                <tr key={source.id} className="border-b border-zinc-50 hover:bg-zinc-50">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <PlatformIcon platform={source.platform} />
                      <div>
                        <p className="font-medium text-zinc-900">{source.name}</p>
                        {source.url && (
                          <p className="text-[10px] text-zinc-400 truncate max-w-[180px]">
                            {source.url}
                          </p>
                        )}
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-zinc-500">{source.sourceType}</td>
                  <td className="px-4 py-3">
                    <div className="flex flex-wrap gap-1">
                      {source.tags.map((t) => (
                        <Badge key={t} variant="default">
                          {t}
                        </Badge>
                      ))}
                    </div>
                  </td>
                  <td className="px-4 py-3 text-center">
                    <span className="font-semibold text-zinc-800">{source.priority}/10</span>
                  </td>
                  <td className="px-4 py-3 text-center">
                    <span className="font-semibold text-violet-700">{source.signalCount}</span>
                  </td>
                  <td className="px-4 py-3">
                    {source.ingestionStatus === 'active' ? (
                      <div className="flex items-center gap-1 text-emerald-600">
                        <Radio className="h-3 w-3" />
                        <span>Active</span>
                      </div>
                    ) : (
                      <div className="flex items-center gap-1 text-amber-500">
                        <Pause className="h-3 w-3" />
                        <span>Paused</span>
                      </div>
                    )}
                  </td>
                  <td className="px-4 py-3">
                    <Badge
                      variant={source.joinStatus === 'joined' || source.joinStatus === 'active' ? 'success' : 'warning'}
                    >
                      {source.joinStatus}
                    </Badge>
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
