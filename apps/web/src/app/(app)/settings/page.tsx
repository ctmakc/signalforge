import { PageShell } from '@/components/layout/page-shell'

const navSections = [
  { label: 'Workspace', icon: 'domain', active: true },
  { label: 'Team Members', icon: 'group' },
  { label: 'Integrations', icon: 'electrical_services' },
  { label: 'Notifications', icon: 'notifications' },
  { label: 'Billing', icon: 'credit_card' },
  { label: 'Audit Logs', icon: 'history' },
]

const workspaceFields = [
  { label: 'Workspace name', value: 'Acme Outreach', readOnly: false },
  { label: 'Slug', value: 'acme-outreach', readOnly: false },
  { label: 'Workspace ID', value: 'ws_01hy4x8q1f2n3p', readOnly: true },
  { label: 'Plan', value: 'Growth', readOnly: true },
]

const profileFields = [
  { label: 'Full name', value: 'Alex Martinez', readOnly: false },
  { label: 'Email', value: 'alex@acme.com', readOnly: false },
  { label: 'Timezone', value: 'America/New_York', readOnly: false },
  { label: 'Role', value: 'Owner', readOnly: true },
]

const riskFields = [
  { label: 'Max daily replies per account', value: '10' },
  { label: 'Max DMs per account per day', value: '5' },
  { label: 'Cooldown between replies (min)', value: '30' },
  { label: 'Similarity detection threshold (%)', value: '80' },
]

export default function SettingsPage() {
  return (
    <PageShell title="Settings" subtitle="Workspace and account configuration.">
      <div className="flex gap-6">
        {/* Sidebar nav */}
        <nav className="w-48 flex-shrink-0 space-y-0.5">
          {navSections.map((s) => (
            <button
              key={s.label}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-label-md transition-colors ${
                s.active
                  ? 'bg-[color:var(--color-primary-fixed)]/20 text-[color:var(--color-primary)] font-medium'
                  : 'text-[color:var(--color-on-surface-variant)] hover:bg-[color:var(--color-surface-container-low)] hover:text-[color:var(--color-on-surface)]'
              }`}
            >
              <span className="material-symbols-outlined" style={{ fontSize: 18 }}>{s.icon}</span>
              {s.label}
            </button>
          ))}
        </nav>

        {/* Content */}
        <div className="flex-1 space-y-6">
          {/* Workspace */}
          <div className="bg-[color:var(--color-surface-container-lowest)] border border-[color:var(--color-outline-variant)] rounded-xl overflow-hidden shadow-sm">
            <div className="px-6 py-4 border-b border-[color:var(--color-surface-container-high)] flex items-center justify-between">
              <h3 className="text-h2 text-[color:var(--color-on-background)]">Workspace</h3>
              <span className="px-2 py-0.5 bg-[color:var(--color-tertiary-fixed)] text-[color:var(--color-on-tertiary-fixed)] text-label-md rounded-full">Growth Plan</span>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-2 gap-4 mb-6">
                {workspaceFields.map((f) => (
                  <div key={f.label}>
                    <label className="block text-label-md text-[color:var(--color-on-surface-variant)] mb-1.5">{f.label}</label>
                    <input
                      className={`w-full rounded-lg border px-3 py-2 text-body-md text-[color:var(--color-on-surface)] outline-none transition-colors ${
                        f.readOnly
                          ? 'bg-[color:var(--color-surface-container-low)] border-[color:var(--color-outline-variant)] text-[color:var(--color-on-surface-variant)] cursor-not-allowed'
                          : 'bg-[color:var(--color-surface)] border-[color:var(--color-outline-variant)] focus:border-[color:var(--color-primary)] focus:ring-2 focus:ring-[color:var(--color-primary)]/20'
                      }`}
                      defaultValue={f.value}
                      readOnly={f.readOnly}
                    />
                  </div>
                ))}
              </div>
              <div className="flex justify-end">
                <button className="px-5 py-2 bg-[color:var(--color-primary)] text-[color:var(--color-on-primary)] text-label-md rounded hover:opacity-90 transition-opacity shadow-sm">
                  Save changes
                </button>
              </div>
            </div>
          </div>

          {/* Profile */}
          <div className="bg-[color:var(--color-surface-container-lowest)] border border-[color:var(--color-outline-variant)] rounded-xl overflow-hidden shadow-sm">
            <div className="px-6 py-4 border-b border-[color:var(--color-surface-container-high)]">
              <h3 className="text-h2 text-[color:var(--color-on-background)]">Your Profile</h3>
            </div>
            <div className="p-6">
              <div className="flex items-start gap-5 mb-5">
                <div className="w-14 h-14 rounded-full bg-[color:var(--color-primary-fixed)] flex items-center justify-center text-[color:var(--color-primary)] font-bold text-xl flex-shrink-0">
                  A
                </div>
                <div className="flex-1 grid grid-cols-2 gap-4">
                  {profileFields.map((f) => (
                    <div key={f.label}>
                      <label className="block text-label-md text-[color:var(--color-on-surface-variant)] mb-1.5">{f.label}</label>
                      <input
                        className={`w-full rounded-lg border px-3 py-2 text-body-md text-[color:var(--color-on-surface)] outline-none transition-colors ${
                          f.readOnly
                            ? 'bg-[color:var(--color-surface-container-low)] border-[color:var(--color-outline-variant)] text-[color:var(--color-on-surface-variant)] cursor-not-allowed'
                            : 'bg-[color:var(--color-surface)] border-[color:var(--color-outline-variant)] focus:border-[color:var(--color-primary)] focus:ring-2 focus:ring-[color:var(--color-primary)]/20'
                        }`}
                        defaultValue={f.value}
                        readOnly={f.readOnly}
                      />
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex justify-end">
                <button className="px-5 py-2 bg-[color:var(--color-primary)] text-[color:var(--color-on-primary)] text-label-md rounded hover:opacity-90 transition-opacity shadow-sm">
                  Update profile
                </button>
              </div>
            </div>
          </div>

          {/* Risk Controls */}
          <div className="bg-[color:var(--color-surface-container-lowest)] border border-[color:var(--color-outline-variant)] rounded-xl overflow-hidden shadow-sm">
            <div className="px-6 py-4 border-b border-[color:var(--color-surface-container-high)] flex items-center justify-between">
              <h3 className="text-h2 text-[color:var(--color-on-background)]">Risk Controls</h3>
              <span className="flex items-center gap-1 text-label-md text-[color:var(--color-error)]">
                <span className="material-symbols-outlined" style={{ fontSize: 16 }}>warning</span>
                Review recommended
              </span>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-2 gap-4 mb-6">
                {riskFields.map((f) => (
                  <div key={f.label}>
                    <label className="block text-label-md text-[color:var(--color-on-surface-variant)] mb-1.5">{f.label}</label>
                    <input
                      type="number"
                      className="w-full rounded-lg border border-[color:var(--color-outline-variant)] bg-[color:var(--color-surface)] px-3 py-2 text-body-md text-[color:var(--color-on-surface)] outline-none focus:border-[color:var(--color-primary)] focus:ring-2 focus:ring-[color:var(--color-primary)]/20 transition-colors"
                      defaultValue={f.value}
                    />
                  </div>
                ))}
              </div>
              <div className="flex justify-end">
                <button className="px-5 py-2 bg-[color:var(--color-primary)] text-[color:var(--color-on-primary)] text-label-md rounded hover:opacity-90 transition-opacity shadow-sm">
                  Save risk controls
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageShell>
  )
}
