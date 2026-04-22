'use client'

import { Bell, Search } from 'lucide-react'

interface TopbarProps {
  title: string
  subtitle?: string
  actions?: React.ReactNode
}

export function Topbar({ title, subtitle, actions }: TopbarProps) {
  return (
    <header className="flex h-12 items-center justify-between border-b border-zinc-200 bg-white px-5">
      <div>
        <h1 className="text-sm font-semibold text-zinc-900">{title}</h1>
        {subtitle && <p className="text-xs text-zinc-400">{subtitle}</p>}
      </div>
      <div className="flex items-center gap-2">
        {actions}
        <button className="rounded p-1.5 text-zinc-400 hover:bg-zinc-100 hover:text-zinc-600">
          <Search className="h-4 w-4" />
        </button>
        <button className="relative rounded p-1.5 text-zinc-400 hover:bg-zinc-100 hover:text-zinc-600">
          <Bell className="h-4 w-4" />
          <span className="absolute right-1 top-1 h-1.5 w-1.5 rounded-full bg-red-500" />
        </button>
      </div>
    </header>
  )
}
