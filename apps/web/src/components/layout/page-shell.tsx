import { Topbar } from './topbar'

interface PageShellProps {
  title: string
  subtitle?: string
  actions?: React.ReactNode
  children: React.ReactNode
}

export function PageShell({ title, subtitle, actions, children }: PageShellProps) {
  return (
    <div className="flex min-h-screen flex-col">
      <Topbar title={title} subtitle={subtitle} actions={actions} />
      <main className="flex-1 overflow-auto bg-zinc-50 p-5">{children}</main>
    </div>
  )
}
