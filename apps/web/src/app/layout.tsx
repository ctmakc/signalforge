import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'SignalForge — AI Outreach OS',
  description: 'Multi-platform lead intelligence and outreach operating system.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="h-full">
      <body className="h-full">{children}</body>
    </html>
  )
}
