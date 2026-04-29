import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  const body = await req.json()
  const { signalId, accountId, replyText, tone, action } = body

  if (!signalId || !replyText) {
    return NextResponse.json({ error: 'signalId and replyText are required' }, { status: 400 })
  }

  const engagement = {
    id: `eng_${Date.now()}`,
    signalId,
    accountId: accountId ?? 'acc_01',
    replyText,
    tone: tone ?? 'Helpful',
    actionStatus: action === 'send' ? 'SENT' : 'DRAFT',
    aiGenerated: true,
    createdAt: new Date(),
  }

  return NextResponse.json(engagement, { status: 201 })
}
