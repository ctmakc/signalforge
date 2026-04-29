import { NextRequest } from 'next/server'
import { auth } from './auth'
import prisma from './prisma'

export type SessionContext = {
  userId: string
  workspaceId: string
  email: string
}

export async function getSession(req: NextRequest): Promise<SessionContext | null> {
  const session = await auth.api.getSession({ headers: req.headers })
  if (!session?.user?.id) return null

  // Find or create a workspace for this user
  let member = await prisma.workspaceMember.findFirst({
    where: { userId: session.user.id },
    include: { workspace: true },
  })

  if (!member) {
    // Auto-create workspace on first API call
    const workspace = await prisma.workspace.create({
      data: {
        name: `${session.user.name ?? session.user.email}'s workspace`,
        slug: session.user.id.slice(0, 12),
      },
    })
    member = await prisma.workspaceMember.create({
      data: { workspaceId: workspace.id, userId: session.user.id, role: 'OWNER' },
      include: { workspace: true },
    })
  }

  return {
    userId: session.user.id,
    workspaceId: member.workspaceId,
    email: session.user.email,
  }
}
