import 'dotenv/config'
import { env } from 'node:process'
import { defineConfig } from 'prisma/config'

export default defineConfig({
  schema: 'prisma/schema.prisma',
  migrations: {
    path: 'prisma/migrations',
  },
  datasource: {
    url:
      env.DATABASE_URL ||
      'postgresql://docker:docker@localhost:5432/api-store?schema=public',
  },
})
