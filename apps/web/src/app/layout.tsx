import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })

export const metadata: Metadata = {
  title: 'SignalForge — Lead Intelligence & Outreach OS',
  description:
    'Multi-platform lead discovery, reputation warming, engagement, DM outreach, and pipeline management.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} h-full antialiased`}>
      <body className="h-full bg-zinc-50 text-zinc-900">{children}</body>
    </html>
  )
}
