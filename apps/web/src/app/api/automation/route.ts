import { NextRequest, NextResponse } from 'next/server'

let policy = {
  mode: 'assisted',
  publicReplyApprovalRequired: true,
  dmApprovalRequired: true,
  riskTolerance: 'low',
  quietHours: { start: '22:00', end: '08:00', timezone: 'UTC' },
}

export async function GET() {
  return NextResponse.json(policy)
}

export async function PATCH(req: NextRequest) {
  const body = await req.json()
  policy = { ...policy, ...body }
  return NextResponse.json(policy)
}
