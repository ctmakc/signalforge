import { NextRequest, NextResponse } from 'next/server'
import { mockLeads } from '@/lib/mock-data'

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const stage = searchParams.get('stage')
  const temp = searchParams.get('temperature')

  let leads = [...mockLeads]
  if (stage) leads = leads.filter((l) => l.pipelineStage === stage.toUpperCase())
  if (temp) leads = leads.filter((l) => l.temperature === temp)

  return NextResponse.json(leads)
}

export async function POST(req: NextRequest) {
  const body = await req.json()
  const lead = { id: `lead_${Date.now()}`, ...body, createdAt: new Date() }
  return NextResponse.json(lead, { status: 201 })
}
