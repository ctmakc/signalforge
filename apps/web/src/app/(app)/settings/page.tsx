import { PageShell } from '@/components/layout/page-shell'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { mockWorkspace, mockUser } from '@/lib/mock-data'
import { Shield, Bell, CreditCard, Users, Plug, FileText } from 'lucide-react'

const sections = [
  { label: 'Workspace', icon: Shield, active: true },
  { label: 'Team Members', icon: Users },
  { label: 'Integrations', icon: Plug },
  { label: 'Notifications', icon: Bell },
  { label: 'Billing', icon: CreditCard },
  { label: 'Audit Logs', icon: FileText },
]

export default function SettingsPage() {
  return (
    <PageShell title="Settings" subtitle="Workspace and account configuration">
      <div className="flex gap-4">
        {/* Sidebar nav */}
        <div className="w-44 flex-shrink-0">
          <nav className="flex flex-col gap-0.5">
            {sections.map((s) => {
              const Icon = s.icon
              return (
                <button
                  key={s.label}
                  className={`flex items-center gap-2 rounded px-3 py-2 text-sm ${
                    s.active
                      ? 'bg-zinc-100 text-zinc-900 font-medium'
                      : 'text-zinc-500 hover:bg-zinc-50 hover:text-zinc-800'
                  }`}
                >
                  <Icon className="h-4 w-4 flex-shrink-0" />
                  {s.label}
                </button>
              )
            })}
          </nav>
        </div>

        {/* Content */}
        <div className="flex-1 flex flex-col gap-4">
          {/* Workspace */}
          <Card>
            <CardHeader>
              <CardTitle>Workspace</CardTitle>
              <Badge variant="info">{mockWorkspace.plan} plan</Badge>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { label: 'Workspace name', value: mockWorkspace.name },
                  { label: 'Slug', value: mockWorkspace.slug },
                  { label: 'Workspace ID', value: mockWorkspace.id },
                  { label: 'Plan', value: mockWorkspace.plan },
                ].map((f) => (
                  <div key={f.label}>
                    <label className="block text-xs font-medium text-zinc-500 mb-1">
                      {f.label}
                    </label>
                    <input
                      className="w-full rounded border border-zinc-200 bg-zinc-50 px-3 py-1.5 text-sm text-zinc-800 focus:border-zinc-400 focus:outline-none focus:bg-white"
                      defaultValue={f.value}
                      readOnly={f.label === 'Workspace ID' || f.label === 'Plan'}
                    />
                  </div>
                ))}
              </div>
              <div className="mt-4 flex justify-end">
                <Button size="sm">Save changes</Button>
              </div>
            </CardContent>
          </Card>

          {/* Your profile */}
          <Card>
            <CardHeader>
              <CardTitle>Your Profile</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-zinc-200 text-lg font-semibold text-zinc-700">
                  {mockUser.name[0]}
                </div>
                <div className="flex-1 grid grid-cols-2 gap-4">
                  {[
                    { label: 'Full name', value: mockUser.name },
                    { label: 'Email', value: mockUser.email },
                    { label: 'Timezone', value: 'America/Toronto' },
                    { label: 'Role', value: mockUser.role },
                  ].map((f) => (
                    <div key={f.label}>
                      <label className="block text-xs font-medium text-zinc-500 mb-1">
                        {f.label}
                      </label>
                      <input
                        className="w-full rounded border border-zinc-200 bg-zinc-50 px-3 py-1.5 text-sm text-zinc-800 focus:border-zinc-400 focus:outline-none focus:bg-white"
                        defaultValue={f.value}
                        readOnly={f.label === 'Role'}
                      />
                    </div>
                  ))}
                </div>
              </div>
              <div className="mt-4 flex justify-end">
                <Button size="sm">Update profile</Button>
              </div>
            </CardContent>
          </Card>

          {/* Integrations placeholder */}
          <Card>
            <CardHeader>
              <CardTitle>Risk Controls</CardTitle>
              <Badge variant="warning">Review recommended</Badge>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { label: 'Max daily replies per account', value: '10' },
                  { label: 'Max DMs per account per day', value: '5' },
                  { label: 'Cooldown between replies (min)', value: '30' },
                  { label: 'Similarity detection threshold (%)', value: '80' },
                ].map((f) => (
                  <div key={f.label}>
                    <label className="block text-xs font-medium text-zinc-500 mb-1">
                      {f.label}
                    </label>
                    <input
                      className="w-full rounded border border-zinc-200 bg-zinc-50 px-3 py-1.5 text-sm text-zinc-800 focus:border-zinc-400 focus:outline-none focus:bg-white"
                      defaultValue={f.value}
                      type="number"
                    />
                  </div>
                ))}
              </div>
              <div className="mt-4 flex justify-end">
                <Button size="sm">Save risk controls</Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </PageShell>
  )
}
