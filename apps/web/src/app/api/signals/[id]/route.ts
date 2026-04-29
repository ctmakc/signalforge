import { NextRequest, NextResponse } from 'next/server'
import { mockSignals } from '@/lib/mock-data'

export async function GET(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const signal = mockSignals.find((s) => s.id === id)
  if (!signal) return NextResponse.json({ error: 'Not found' }, { status: 404 })
  return NextResponse.json(signal)
}

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const body = await req.json()
  // In production this would update the DB record
  return NextResponse.json({ id, ...body })
}
