import { Sidebar } from '@/components/layout/sidebar'
import { Toaster } from '@/components/ui/toaster'

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex flex-1 flex-col ml-60 overflow-hidden">{children}</div>
      <Toaster />
    </div>
  )
}
