import { betterAuth } from 'better-auth'
import { prismaAdapter } from 'better-auth/adapters/prisma'
import prisma from './prisma'

export const auth = betterAuth({
  database: prismaAdapter(prisma, { provider: 'sqlite' }),
  secret: process.env.BETTER_AUTH_SECRET ?? 'dev-secret-change-in-prod',
  baseURL: process.env.NEXT_PUBLIC_APP_URL ?? 'http://localhost:3001',
  emailAndPassword: { enabled: true },
  session: {
    expiresIn: 60 * 60 * 24 * 7, // 7 days
  },
})
