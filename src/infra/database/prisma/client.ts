import { env } from '@/env/index.js'
import { PrismaPg } from '@prisma/adapter-pg'
import { PrismaClient } from '@prisma/client'
import pg from 'pg'

// Configura o driver de conexão nativo
const pool = new pg.Pool({ connectionString: env.DATABASE_URL })
const adapter = new PrismaPg(pool)

export const prisma = new PrismaClient({
  adapter, // Aqui passamos o adaptador que o erro estava pedindo!
  log: env.NODE_ENV === 'dev' ? ['query'] : [],
})
