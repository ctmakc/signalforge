import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/prisma'
import { getSession } from '@/lib/session'
import { redditAuth } from '@/lib/adapters/reddit-auth'

export async function POST(req: NextRequest) {
  const session = await getSession(req)
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { username, password, clientId, clientSecret, accountId } = await req.json()

  if (!username || !password || !clientId || !clientSecret) {
    return NextResponse.json({ error: 'username, password, clientId and clientSecret are required' }, { status: 400 })
  }

  // Get OAuth token from Reddit
  let tokenData: { access_token: string; expires_in: number }
  try {
    tokenData = await redditAuth({ username, password, clientId, clientSecret })
  } catch (err) {
    return NextResponse.json({ error: `Reddit auth failed: ${err instanceof Error ? err.message : String(err)}` }, { status: 400 })
  }

  const tokenExpiresAt = new Date(Date.now() + tokenData.expires_in * 1000)
  // Store credentials encrypted (simple base64 for local dev — swap for real encryption in prod)
  const encryptedCredentials = Buffer.from(JSON.stringify({ username, password, clientId, clientSecret })).toString('base64')

  if (accountId) {
    // Update existing account
    await prisma.connectedAccount.updateMany({
      where: { id: accountId, workspaceId: session.workspaceId },
      data: {
        authStatus: 'ACTIVE',
        accessToken: tokenData.access_token,
        tokenExpiresAt,
        encryptedCredentials,
        lastSeenAt: new Date(),
      },
    })
    return NextResponse.json({ ok: true, accountId })
  }

  // Create new account
  const account = await prisma.connectedAccount.create({
    data: {
      workspaceId: session.workspaceId,
      platform: 'REDDIT',
      displayName: `u/${username}`,
      username,
      authType: 'oauth',
      authStatus: 'ACTIVE',
      accessToken: tokenData.access_token,
      tokenExpiresAt,
      encryptedCredentials,
      dailyActionLimit: 30,
    },
  })
  return NextResponse.json({ ok: true, accountId: account.id })
}
