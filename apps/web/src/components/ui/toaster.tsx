'use client'
import { useToastStore } from '@/store/toast'

export function Toaster() {
  const { toasts, remove } = useToastStore()

  if (toasts.length === 0) return null

  const colors: Record<string, string> = {
    success: 'bg-[color:var(--color-secondary-container)] text-[color:var(--color-on-secondary-container)] border-[color:var(--color-secondary)]',
    error: 'bg-[color:var(--color-error-container)] text-[color:var(--color-on-error-container)] border-[color:var(--color-error)]',
    info: 'bg-[color:var(--color-primary-container)] text-[color:var(--color-on-primary-container)] border-[color:var(--color-primary)]',
  }
  const icons: Record<string, string> = { success: 'check_circle', error: 'error', info: 'info' }

  return (
    <div className="fixed bottom-6 right-6 z-[100] flex flex-col gap-2 pointer-events-none">
      {toasts.map((t) => (
        <div
          key={t.id}
          className={`flex items-center gap-3 px-4 py-3 rounded-lg border shadow-md text-body-md font-medium pointer-events-auto animate-in slide-in-from-bottom-2 ${colors[t.type]}`}
          style={{ minWidth: 260 }}
        >
          <span className="material-symbols-outlined flex-shrink-0" style={{ fontSize: 18, fontVariationSettings: "'FILL' 1" }}>{icons[t.type]}</span>
          <span className="flex-1">{t.message}</span>
          <button onClick={() => remove(t.id)} className="opacity-60 hover:opacity-100 transition-opacity">
            <span className="material-symbols-outlined" style={{ fontSize: 16 }}>close</span>
          </button>
        </div>
      ))}
    </div>
  )
}
