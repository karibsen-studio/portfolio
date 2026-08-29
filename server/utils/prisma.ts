import { PrismaPg } from '@prisma/adapter-pg'

import { PrismaClient } from '../generated/prisma/client.js'

const connectionString = process.env.DATABASE_URL

if (!connectionString) {
  throw new Error('DATABASE_URL is required to initialize Prisma')
}

const RELAXABLE_SSL_MODES = new Set(['require', 'prefer'])

const url = new URL(connectionString)
const sslMode = url.searchParams.get('sslmode')

if (sslMode && RELAXABLE_SSL_MODES.has(sslMode) && !url.searchParams.has('sslrootcert')) {
  url.searchParams.set('sslmode', 'no-verify')
}

const adapter = new PrismaPg({
  connectionString: url.toString()
})

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

export const prisma = globalForPrisma.prisma ?? new PrismaClient({ adapter })

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma

export default prisma
