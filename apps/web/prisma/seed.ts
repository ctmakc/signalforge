import { PrismaClient } from '@prisma/client'
import { PrismaLibSql } from '@prisma/adapter-libsql'

const adapter = new PrismaLibSql({ url: 'file:./dev.db' })
const prisma = new PrismaClient({ adapter })

async function main() {
  console.log('Seeding SignalForge dev database...')

  const workspace = await prisma.workspace.upsert({
    where: { slug: 'acme-growth' },
    update: {},
    create: { name: 'Acme Growth', slug: 'acme-growth', plan: 'pro' },
  })

  const user = await prisma.user.upsert({
    where: { email: 'm@acme.io' },
    update: {},
    create: { name: 'Maksym Stepanenko', email: 'm@acme.io', emailVerified: true, timezone: 'America/Toronto' },
  })

  await prisma.workspaceMember.upsert({
    where: { workspaceId_userId: { workspaceId: workspace.id, userId: user.id } },
    update: {},
    create: { workspaceId: workspace.id, userId: user.id, role: 'OWNER' },
  })

  await prisma.automationPolicy.upsert({
    where: { workspaceId: workspace.id },
    update: {},
    create: {
      workspaceId: workspace.id,
      mode: 'assisted',
      publicReplyApprovalRequired: true,
      dmApprovalRequired: true,
      riskTolerance: 'low',
      quietHours: JSON.stringify({ start: '22:00', end: '08:00', timezone: 'UTC' }),
    },
  })

  const accounts = [
    { id: 'acc_01', platform: 'REDDIT', displayName: 'u/growth_ops_1', username: 'growth_ops_1', authStatus: 'CONNECTED', warmupStatus: 'READY', healthStatus: 'HEALTHY', reputationScore: 78, riskScore: 12, dailyActionLimit: 40 },
    { id: 'acc_02', platform: 'TELEGRAM', displayName: 'SignalBot Alpha', username: 'signalbot_alpha', authStatus: 'CONNECTED', warmupStatus: 'WARMING', healthStatus: 'HEALTHY', reputationScore: 42, riskScore: 8, dailyActionLimit: 20 },
    { id: 'acc_03', platform: 'X', displayName: '@growthacme', username: 'growthacme', authStatus: 'CONNECTED', warmupStatus: 'READY', healthStatus: 'AT_RISK', reputationScore: 61, riskScore: 45, dailyActionLimit: 15 },
  ]

  for (const acc of accounts) {
    await prisma.connectedAccount.upsert({
      where: { id: acc.id },
      update: {},
      create: { workspaceId: workspace.id, authType: 'cookie', ...acc },
    })
  }

  const sources = [
    { id: 'src_01', platform: 'REDDIT', sourceType: 'subreddit', name: 'r/SaaS', url: 'https://reddit.com/r/saas', joinStatus: 'joined', priority: 9, tags: JSON.stringify(['saas', 'b2b']), ingestionStatus: 'active' },
    { id: 'src_02', platform: 'REDDIT', sourceType: 'subreddit', name: 'r/entrepreneur', url: 'https://reddit.com/r/entrepreneur', joinStatus: 'joined', priority: 7, tags: JSON.stringify(['startup']), ingestionStatus: 'active' },
    { id: 'src_03', platform: 'TELEGRAM', sourceType: 'group', name: 'SaaS Founders Chat', joinStatus: 'joined', priority: 8, tags: JSON.stringify(['saas', 'founders']), ingestionStatus: 'active' },
  ]

  for (const src of sources) {
    await prisma.source.upsert({
      where: { id: src.id },
      update: {},
      create: { workspaceId: workspace.id, monitoringMode: 'passive', ...src },
    })
  }

  console.log(`✓ Workspace: ${workspace.name}`)
  console.log(`✓ User: ${user.email}`)
  console.log(`✓ Accounts: ${accounts.length}`)
  console.log(`✓ Sources: ${sources.length}`)
  console.log('Seed complete.')
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect())
