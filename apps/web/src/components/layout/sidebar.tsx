'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import {
  LayoutDashboard,
  Users,
  Radio,
  Flame,
  Zap,
  MessageSquare,
  KanbanSquare,
  Bot,
  BarChart3,
  Settings,
  ChevronDown,
} from 'lucide-react'

const nav = [
  { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/accounts', label: 'Accounts', icon: Users },
  { href: '/sources', label: 'Sources', icon: Radio },
  { href: '/warmup', label: 'Warmup', icon: Flame },
  { href: '/signals', label: 'Signals', icon: Zap },
  { href: '/engagement', label: 'Engagement', icon: MessageSquare },
  { href: '/pipeline', label: 'Pipeline', icon: KanbanSquare },
  { href: '/automation', label: 'Automation', icon: Bot },
  { href: '/analytics', label: 'Analytics', icon: BarChart3 },
  { href: '/settings', label: 'Settings', icon: Settings },
]

export function Sidebar() {
  const pathname = usePathname()

  return (
    <aside className="flex h-screen w-56 flex-col border-r border-zinc-200 bg-white">
      {/* Logo */}
      <div className="flex h-12 items-center gap-2 border-b border-zinc-100 px-4">
        <div className="flex h-6 w-6 items-center justify-center rounded bg-zinc-900 text-white text-xs font-bold">
          SF
        </div>
        <span className="text-sm font-semibold text-zinc-900">SignalForge</span>
      </div>

      {/* Workspace switcher */}
      <div className="border-b border-zinc-100 px-3 py-2">
        <button className="flex w-full items-center justify-between rounded px-2 py-1.5 text-xs hover:bg-zinc-50">
          <div className="flex items-center gap-2">
            <div className="h-4 w-4 rounded bg-violet-200" />
            <span className="font-medium text-zinc-800">Acme Growth</span>
          </div>
          <ChevronDown className="h-3 w-3 text-zinc-400" />
        </button>
      </div>

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto px-2 py-2">
        {nav.map(({ href, label, icon: Icon }) => {
          const active = pathname === href || pathname.startsWith(href + '/')
          return (
            <Link
              key={href}
              href={href}
              className={cn(
                'flex items-center gap-2.5 rounded px-2.5 py-1.5 text-sm transition-colors',
                active
                  ? 'bg-zinc-100 text-zinc-900 font-medium'
                  : 'text-zinc-500 hover:bg-zinc-50 hover:text-zinc-800'
              )}
            >
              <Icon className="h-4 w-4 flex-shrink-0" />
              {label}
            </Link>
          )
        })}
      </nav>

      {/* User */}
      <div className="border-t border-zinc-100 px-3 py-3">
        <div className="flex items-center gap-2">
          <div className="flex h-6 w-6 items-center justify-center rounded-full bg-zinc-200 text-xs font-semibold text-zinc-700">
            M
          </div>
          <div className="min-w-0 flex-1">
            <div className="truncate text-xs font-medium text-zinc-800">Maksym S.</div>
            <div className="truncate text-[10px] text-zinc-400">Owner</div>
          </div>
        </div>
      </div>
    </aside>
  )
}
