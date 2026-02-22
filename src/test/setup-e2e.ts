import { prisma } from '@/lib/prisma/prisma.js'
import { afterAll, beforeAll } from 'vitest'

beforeAll(async () => {
  console.log('🔧 Setup E2E iniciado...')
  // Limpa todas as tabelas relevantes
  await prisma.banner.deleteMany()
})

afterAll(async () => {
  console.log('🧹 Finalizando testes E2E...')
  await prisma.$disconnect()
})
