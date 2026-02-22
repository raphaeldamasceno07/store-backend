import { prisma } from '@/lib/prisma/prisma.js'
import 'dotenv/config'
import { randomUUID } from 'node:crypto'
import type { Environment } from 'vitest/environments'

function getDatabaseUrl(schema: string) {
  if (!process.env.DATABASE_URL) {
    throw new Error('please provide DATABASE_URL env variable to run tests')
  }
  const url = new URL(process.env.DATABASE_URL)
  url.searchParams.set('schema', schema)
  return url.toString()
}

export default <Environment>{
  name: 'prisma',
  transformMode: 'ssr',
  async setup() {
    const schema = randomUUID()
    const databaseUrl = getDatabaseUrl(schema)

    process.env.DATABASE_URL = databaseUrl

    return {
      async teardown() {
        // No Prisma 7, garanta que o schema seja deletado com o client que usa a nova URL
        await prisma.$executeRawUnsafe(
          `DROP SCHEMA IF EXISTS "${schema}" CASCADE`,
        )
        await prisma.$disconnect()
      },
    }
  },
}
