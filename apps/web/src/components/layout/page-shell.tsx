import { Topbar } from './topbar'

interface PageShellProps {
  title: string
  subtitle?: string
  subtitleIcon?: string
  headerActions?: React.ReactNode
  topbarActions?: React.ReactNode
  children: React.ReactNode
}

export function PageShell({ title, subtitle, subtitleIcon, headerActions, topbarActions, children }: PageShellProps) {
  return (
    <div className="flex min-h-screen flex-col">
      <Topbar actions={topbarActions} />
      <main className="flex-1 overflow-auto p-[24px] max-w-[1600px] w-full mx-auto">
        {/* Page header */}
        <div className="mb-6 flex justify-between items-end">
          <div>
            {subtitle && subtitleIcon && (
              <div className="flex items-center gap-2 text-[color:var(--color-on-surface-variant)] text-label-md mb-1">
                <span className="material-symbols-outlined" style={{ fontSize: 16 }}>{subtitleIcon}</span>
                <span>{subtitle}</span>
              </div>
            )}
            <h2 className="text-h1">{title}</h2>
            {subtitle && !subtitleIcon && (
              <p className="text-body-md text-[color:var(--color-on-surface-variant)] mt-1">{subtitle}</p>
            )}
          </div>
          {headerActions && <div className="flex gap-3">{headerActions}</div>}
        </div>
        {children}
      </main>
    </div>
  )
}
