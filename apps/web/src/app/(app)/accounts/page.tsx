'use client'
import { useEffect, useState } from 'react'
import { PageShell } from '@/components/layout/page-shell'

type ConnectedAccount = {
  id: string
  platform: string
  displayName: string
  username: string
  authStatus: string
  warmupStatus: string
  healthStatus: string
  reputationScore: number
  riskScore: number
  dailyActionLimit: number
  lastSeenAt: string | null
}

const PLATFORM_META: Record<string, { icon: string; color: string; bg: string }> = {
  REDDIT:   { icon: 'forum',     color: '#FF4500', bg: '#fff3ee' },
  TELEGRAM: { icon: 'send',      color: '#0088cc', bg: '#e6f3ff' },
  X:        { icon: 'tag',       color: '#1DA1F2', bg: '#e8f5fd' },
  FACEBOOK: { icon: 'thumb_up',  color: '#1877F2', bg: '#e8eef9' },
}

function statusBadge(s: string) {
  if (s === 'ACTIVE') return 'bg-emerald-100 text-emerald-700'
  if (s === 'PENDING') return 'bg-amber-100 text-amber-700'
  if (s === 'ERROR' || s === 'SUSPENDED') return 'bg-red-100 text-red-700'
  return 'bg-gray-100 text-gray-500'
}

export default function AccountsPage() {
  const [accounts, setAccounts] = useState<ConnectedAccount[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [connecting, setConnecting] = useState(false)
  const [error, setError] = useState('')
  const [form, setForm] = useState({ username: '', password: '', clientId: '', clientSecret: '' })

  useEffect(() => { void fetchAccounts() }, [])

  async function fetchAccounts() {
    setLoading(true)
    const res = await fetch('/api/accounts')
    if (res.ok) setAccounts(await res.json() as ConnectedAccount[])
    setLoading(false)
  }

  async function connectReddit(e: React.FormEvent) {
    e.preventDefault()
    setConnecting(true)
    setError('')
    const res = await fetch('/api/accounts/reddit-connect', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    })
    const data = await res.json() as { ok?: boolean; error?: string }
    if (!res.ok || !data.ok) {
      setError(data.error ?? 'Connection failed')
      setConnecting(false)
      return
    }
    setShowForm(false)
    setForm({ username: '', password: '', clientId: '', clientSecret: '' })
    await fetchAccounts()
    setConnecting(false)
  }

  async function removeAccount(id: string) {
    await fetch(`/api/accounts/${id}`, { method: 'DELETE' })
    setAccounts((a) => a.filter((acc) => acc.id !== id))
  }

  const meta = (platform: string) => PLATFORM_META[platform] ?? { icon: 'account_circle', color: '#888', bg: '#f5f5f5' }

  return (
    <PageShell
      title="Connected Accounts"
      subtitle={`${accounts.length} account${accounts.length !== 1 ? 's' : ''} · manage platform credentials and warmup status`}
      headerActions={
        <button
          type="button"
          onClick={() => setShowForm(true)}
          className="inline-flex items-center gap-2 px-4 py-2 bg-[color:var(--color-primary)] text-[color:var(--color-on-primary)] rounded-lg text-label-md font-semibold hover:opacity-90 transition-opacity"
        >
          <span className="material-symbols-outlined text-base">add</span>
          Connect Reddit
        </button>
      }
    >
      {showForm && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50" onClick={() => setShowForm(false)}>
          <form
            onClick={(e) => e.stopPropagation()}
            onSubmit={(e) => void connectReddit(e)}
            className="bg-[color:var(--color-surface)] rounded-2xl p-6 w-full max-w-md shadow-xl space-y-4"
          >
            <div className="flex items-center gap-3 mb-2">
              <span className="material-symbols-outlined text-[#FF4500] text-2xl">forum</span>
              <h2 className="text-h2 text-[color:var(--color-on-surface)]">Connect Reddit Account</h2>
            </div>
            <p className="text-body-sm text-[color:var(--color-on-surface-variant)]">
              Create a "script" app at <strong>reddit.com/prefs/apps</strong> to get your client ID and secret.
            </p>

            {error && <div className="px-3 py-2 bg-red-50 text-red-600 rounded text-body-sm">{error}</div>}

            {[
              { key: 'username', label: 'Reddit username', placeholder: 'Late-Development3721', type: 'text' },
              { key: 'password', label: 'Reddit password', placeholder: '••••••••', type: 'password' },
              { key: 'clientId', label: 'Client ID', placeholder: 'abc123xyz', type: 'text' },
              { key: 'clientSecret', label: 'Client Secret', placeholder: 'secret456', type: 'password' },
            ].map(({ key, label, placeholder, type }) => (
              <div key={key}>
                <label className="text-label-sm text-[color:var(--color-on-surface-variant)] mb-1 block">{label}</label>
                <input
                  required
                  type={type}
                  placeholder={placeholder}
                  value={form[key as keyof typeof form]}
                  onChange={(e) => setForm((f) => ({ ...f, [key]: e.target.value }))}
                  className="w-full px-3 py-2 bg-[color:var(--color-surface-container)] border border-[color:var(--color-outline-variant)] rounded text-body-md outline-none focus:ring-1 focus:ring-[color:var(--color-primary)]"
                />
              </div>
            ))}

            <div className="flex gap-3 pt-2">
              <button type="button" onClick={() => setShowForm(false)} className="flex-1 py-2 border border-[color:var(--color-outline-variant)] rounded-lg text-label-md hover:bg-[color:var(--color-surface-container)] transition-colors">
                Cancel
              </button>
              <button type="submit" disabled={connecting} className="flex-1 py-2 bg-[color:var(--color-primary)] text-[color:var(--color-on-primary)] rounded-lg text-label-md font-semibold disabled:opacity-60">
                {connecting ? 'Connecting…' : 'Connect'}
              </button>
            </div>
          </form>
        </div>
      )}

      {loading ? (
        <div className="text-body-md text-[color:var(--color-on-surface-variant)] py-12 text-center">Loading accounts…</div>
      ) : accounts.length === 0 ? (
        <div className="text-center py-16">
          <span className="material-symbols-outlined text-5xl text-[color:var(--color-outline)] mb-4 block">manage_accounts</span>
          <p className="text-body-lg text-[color:var(--color-on-surface-variant)]">No accounts connected yet.</p>
          <p className="text-body-md text-[color:var(--color-on-surface-variant)] mt-1">Click "Connect Reddit" to get started.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {accounts.map((acc) => {
            const m = meta(acc.platform)
            return (
              <article key={acc.id} className="bg-[color:var(--color-surface-container-lowest)] border border-[color:var(--color-outline-variant)] rounded-2xl p-5 flex flex-col gap-4">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ background: m.bg }}>
                      <span className="material-symbols-outlined text-xl" style={{ color: m.color }}>{m.icon}</span>
                    </div>
                    <div>
                      <div className="font-semibold text-[color:var(--color-on-surface)]">{acc.displayName}</div>
                      <div className="text-body-sm text-[color:var(--color-on-surface-variant)]">{acc.platform}</div>
                    </div>
                  </div>
                  <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${statusBadge(acc.authStatus)}`}>
                    {acc.authStatus}
                  </span>
                </div>

                <div className="grid grid-cols-3 gap-2 text-center">
                  <div className="bg-[color:var(--color-surface-container)] rounded-lg py-2">
                    <div className="text-label-lg font-bold text-[color:var(--color-on-surface)]">{acc.reputationScore}</div>
                    <div className="text-label-sm text-[color:var(--color-on-surface-variant)]">Rep</div>
                  </div>
                  <div className="bg-[color:var(--color-surface-container)] rounded-lg py-2">
                    <div className="text-label-lg font-bold text-[color:var(--color-on-surface)]">{acc.riskScore}</div>
                    <div className="text-label-sm text-[color:var(--color-on-surface-variant)]">Risk</div>
                  </div>
                  <div className="bg-[color:var(--color-surface-container)] rounded-lg py-2">
                    <div className="text-label-lg font-bold text-[color:var(--color-on-surface)]">{acc.dailyActionLimit}</div>
                    <div className="text-label-sm text-[color:var(--color-on-surface-variant)]">Limit/d</div>
                  </div>
                </div>

                <div className="flex items-center justify-between text-body-sm text-[color:var(--color-on-surface-variant)]">
                  <span>Warmup: <strong>{acc.warmupStatus}</strong></span>
                  {acc.lastSeenAt && <span>{new Date(acc.lastSeenAt).toLocaleDateString()}</span>}
                </div>

                <button
                  type="button"
                  onClick={() => void removeAccount(acc.id)}
                  className="text-label-sm text-red-500 hover:text-red-700 text-left transition-colors"
                >
                  Remove account
                </button>
              </article>
            )
          })}
        </div>
      )}
    </PageShell>
  )
}
