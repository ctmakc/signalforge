import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/prisma'
import { getSession } from '@/lib/session'

export async function GET(req: NextRequest) {
  const session = await getSession(req)
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const accounts = await prisma.connectedAccount.findMany({
    where: { workspaceId: session.workspaceId },
    orderBy: { createdAt: 'desc' },
    select: {
      id: true, platform: true, displayName: true, username: true,
      authStatus: true, warmupStatus: true, healthStatus: true,
      reputationScore: true, riskScore: true, dailyActionLimit: true,
      lastSeenAt: true, createdAt: true,
    },
  })
  return NextResponse.json(accounts)
}

export async function POST(req: NextRequest) {
  const session = await getSession(req)
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const body = await req.json()
  const { platform, displayName, username, encryptedCredentials, authType } = body

  if (!platform || !username) {
    return NextResponse.json({ error: 'platform and username are required' }, { status: 400 })
  }

  const account = await prisma.connectedAccount.create({
    data: {
      workspaceId: session.workspaceId,
      platform,
      displayName: displayName || username,
      username,
      authType: authType || 'oauth',
      authStatus: 'PENDING',
      encryptedCredentials: encryptedCredentials || null,
    },
  })
  return NextResponse.json(account, { status: 201 })
}
