'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'

const nav = [
  { href: '/dashboard', label: 'Dashboard', icon: 'dashboard' },
  { href: '/accounts', label: 'Accounts', icon: 'manage_accounts' },
  { href: '/signals', label: 'Signals', icon: 'radar' },
  { href: '/warmup', label: 'Reputation', icon: 'thermostat' },
  { href: '/sources', label: 'Lead Detection', icon: 'person_search' },
  { href: '/engagement', label: 'Engagement', icon: 'edit_note' },
  { href: '/pipeline', label: 'CRM Pipeline', icon: 'view_kanban' },
  { href: '/automation', label: 'Automation', icon: 'smart_toy' },
  { href: '/analytics', label: 'Analytics', icon: 'monitoring' },
]

const bottom = [
  { href: '/settings', label: 'Settings', icon: 'settings' },
  { href: '#', label: 'Support', icon: 'help_outline' },
]

export function Sidebar() {
  const pathname = usePathname()

  const isActive = (href: string) => pathname === href || pathname.startsWith(href + '/')

  return (
    <aside className="fixed left-0 top-0 h-screen w-60 border-r border-slate-200 bg-slate-50 flex flex-col py-4 z-50">
      {/* Logo */}
      <div className="px-6 mb-8 mt-2">
        <h1 className="text-lg font-black text-slate-900 uppercase tracking-widest">SignalForge</h1>
        <p className="text-label-md text-[color:var(--color-outline)] mt-1">AI Outreach OS</p>
      </div>

      {/* New Campaign CTA */}
      <div className="px-4 mb-6">
        <button className="w-full bg-[color:var(--color-primary)] text-white text-label-md py-2 rounded flex items-center justify-center gap-2 hover:opacity-90 transition-opacity">
          <span className="material-symbols-outlined" style={{ fontSize: 18 }}>add</span>
          New Campaign
        </button>
      </div>

      {/* Main nav */}
      <div className="flex-1 flex flex-col px-2 space-y-0.5 overflow-y-auto">
        {nav.map(({ href, label, icon }) => (
          <Link
            key={href}
            href={href}
            className={cn(
              'flex items-center gap-3 px-4 py-2 text-label-md rounded-r transition-all duration-150',
              isActive(href)
                ? 'nav-active'
                : 'nav-inactive text-slate-600 hover:bg-slate-100 hover:text-slate-900'
            )}
          >
            <span className="material-symbols-outlined" style={{ fontSize: 20 }}>{icon}</span>
            {label}
          </Link>
        ))}
      </div>

      {/* Bottom nav */}
      <div className="mt-auto flex flex-col px-2 pt-4 border-t border-slate-200 space-y-0.5">
        {bottom.map(({ href, label, icon }) => (
          <Link
            key={href}
            href={href}
            className={cn(
              'flex items-center gap-3 px-4 py-2 text-label-md rounded-r transition-colors nav-inactive',
              isActive(href)
                ? 'nav-active'
                : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
            )}
          >
            <span className="material-symbols-outlined" style={{ fontSize: 20 }}>{icon}</span>
            {label}
          </Link>
        ))}
      </div>
    </aside>
  )
}
