import { NextRequest, NextResponse } from 'next/server'
import { mockSignals } from '@/lib/mock-data'

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const minIntent = parseInt(searchParams.get('minIntent') ?? '0')
  const minFit = parseInt(searchParams.get('minFit') ?? '0')
  const platformsParam = searchParams.get('platforms')
  const platforms = platformsParam ? platformsParam.split(',') : []

  let signals = [...mockSignals]
  if (minIntent > 0) signals = signals.filter((s) => s.intentScore >= minIntent)
  if (minFit > 0) signals = signals.filter((s) => s.fitScore >= minFit)
  if (platforms.length > 0) signals = signals.filter((s) => platforms.includes(s.platform))

  return NextResponse.json(signals)
}
