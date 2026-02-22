import { env } from '@/env'
import { PrismaPg } from '@prisma/adapter-pg'
import { PrismaClient } from '@prisma/client'
import pg from 'pg'

const pool = new pg.Pool({ connectionString: env.DATABASE_URL })
const adapter = new PrismaPg(pool)

export const prisma = new PrismaClient({
  adapter,
  log: env.NODE_ENV === 'dev' ? ['query', 'error', 'warn'] : ['error'],
})
