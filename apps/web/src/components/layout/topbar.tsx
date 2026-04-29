'use client'
import { useSession, signOut } from '@/lib/auth-client'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

interface TopbarProps {
  actions?: React.ReactNode
}

export function Topbar({ actions }: TopbarProps) {
  const { data: session } = useSession()
  const router = useRouter()
  const [menuOpen, setMenuOpen] = useState(false)

  async function handleSignOut() {
    await signOut()
    router.push('/login')
  }

  const initials = session?.user?.name
    ? session.user.name.split(' ').map((w) => w[0]).join('').slice(0, 2).toUpperCase()
    : '?'

  return (
    <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-md shadow-[0_1px_2px_rgba(0,0,0,0.03)] flex justify-between items-center h-16 px-6 w-full">
      {/* Search */}
      <div className="relative">
        <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-[color:var(--color-outline-variant)]" style={{ fontSize: 18 }}>
          search
        </span>
        <input
          className="pl-10 pr-4 py-1.5 bg-[color:var(--color-surface-container-low)] border border-[color:var(--color-outline-variant)] rounded text-body-md focus:border-[color:var(--color-primary)] focus:ring-2 focus:ring-[color:var(--color-primary)]/20 focus:outline-none w-64 transition-all placeholder:text-[color:var(--color-outline)]"
          placeholder="Search signals, accounts..."
          type="text"
        />
      </div>

      {/* Right */}
      <div className="flex items-center gap-2">
        {actions}
        {['notifications', 'history'].map((icon) => (
          <button key={icon} className="p-2 text-slate-500 hover:bg-slate-50 rounded-full flex items-center justify-center transition-colors">
            <span className="material-symbols-outlined">{icon}</span>
          </button>
        ))}

        {/* User avatar + menu */}
        <div className="ml-4 pl-4 border-l border-slate-200 relative">
          <button
            onClick={() => setMenuOpen((v) => !v)}
            className="w-8 h-8 rounded-full bg-[color:var(--color-primary-container)] border border-[color:var(--color-primary)] flex items-center justify-center text-label-md font-bold text-[color:var(--color-on-primary-container)] hover:opacity-90 transition-opacity"
          >
            {initials}
          </button>

          {menuOpen && (
            <>
              <div className="fixed inset-0 z-40" onClick={() => setMenuOpen(false)} />
              <div className="absolute right-0 top-10 z-50 w-52 bg-[color:var(--color-surface-container-lowest)] border border-[color:var(--color-outline-variant)] rounded-lg shadow-lg overflow-hidden">
                <div className="px-4 py-3 border-b border-[color:var(--color-surface-container-high)]">
                  <p className="text-body-md font-semibold text-[color:var(--color-on-surface)] truncate">{session?.user?.name ?? 'User'}</p>
                  <p className="text-label-md text-[color:var(--color-on-surface-variant)] truncate">{session?.user?.email ?? ''}</p>
                </div>
                <button
                  onClick={() => { setMenuOpen(false); router.push('/settings') }}
                  className="w-full flex items-center gap-2 px-4 py-2.5 text-label-md text-[color:var(--color-on-surface)] hover:bg-[color:var(--color-surface-container-low)] transition-colors"
                >
                  <span className="material-symbols-outlined" style={{ fontSize: 16 }}>settings</span>
                  Settings
                </button>
                <button
                  onClick={handleSignOut}
                  className="w-full flex items-center gap-2 px-4 py-2.5 text-label-md text-[color:var(--color-error)] hover:bg-[color:var(--color-error-container)]/20 transition-colors"
                >
                  <span className="material-symbols-outlined" style={{ fontSize: 16 }}>logout</span>
                  Sign out
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </header>
  )
}
