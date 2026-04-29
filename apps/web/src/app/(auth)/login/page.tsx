'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { signIn } from '@/lib/auth-client'
import Link from 'next/link'

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState('m@acme.io')
  const [password, setPassword] = useState('admin123')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    setLoading(true)
    const { error: err } = await signIn.email({ email, password, callbackURL: '/dashboard' })
    if (err) {
      setError(err.message ?? 'Invalid credentials')
      setLoading(false)
      return
    }
    router.push('/dashboard')
  }

  return (
    <div className="w-full max-w-sm">
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-2 mb-4">
          <span className="material-symbols-outlined text-[color:var(--color-primary)]" style={{ fontSize: 28, fontVariationSettings: "'FILL' 1" }}>radar</span>
          <span className="text-xl font-bold text-[color:var(--color-on-background)]">SignalForge</span>
        </div>
        <h1 className="text-h1 text-[color:var(--color-on-background)]">Welcome back</h1>
        <p className="text-body-md text-[color:var(--color-on-surface-variant)] mt-1">Sign in to your workspace</p>
      </div>

      <form onSubmit={handleSubmit} className="bg-[color:var(--color-surface-container-lowest)] border border-[color:var(--color-outline-variant)] rounded-xl p-6 space-y-4 shadow-sm">
        {error && (
          <div className="px-3 py-2 bg-[color:var(--color-error-container)] text-[color:var(--color-on-error-container)] rounded text-body-md">
            {error}
          </div>
        )}

        <div>
          <label className="text-label-md text-[color:var(--color-on-surface-variant)] mb-1 block">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder="you@company.com"
            className="w-full px-3 py-2 bg-[color:var(--color-surface-container)] border border-[color:var(--color-outline-variant)] rounded text-body-md text-[color:var(--color-on-surface)] outline-none focus:ring-1 focus:ring-[color:var(--color-primary)] focus:border-[color:var(--color-primary)] transition-colors"
          />
        </div>

        <div>
          <label className="text-label-md text-[color:var(--color-on-surface-variant)] mb-1 block">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            placeholder="••••••••"
            className="w-full px-3 py-2 bg-[color:var(--color-surface-container)] border border-[color:var(--color-outline-variant)] rounded text-body-md text-[color:var(--color-on-surface)] outline-none focus:ring-1 focus:ring-[color:var(--color-primary)] focus:border-[color:var(--color-primary)] transition-colors"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full py-2.5 bg-[color:var(--color-primary)] text-[color:var(--color-on-primary)] rounded font-semibold text-label-md hover:opacity-90 transition-opacity disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {loading ? 'Signing in…' : 'Sign in'}
        </button>

        <p className="text-center text-body-md text-[color:var(--color-on-surface-variant)]">
          No account?{' '}
          <Link href="/register" className="text-[color:var(--color-primary)] hover:underline">
            Create one
          </Link>
        </p>
      </form>
    </div>
  )
}
