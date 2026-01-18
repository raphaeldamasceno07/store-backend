import { app } from '@/app.js'
import { prisma } from '@/libs/prisma.js'
import request from 'supertest'
import { afterAll, beforeAll, beforeEach, describe, expect, it } from 'vitest'

describe('Fetch Banners (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  beforeEach(async () => {
    await prisma.banner.deleteMany()
    await prisma.banner.create({
      data: {
        image: 'fake_banner.svg',
        link: '/categories/test',
      },
    })
  })

  afterAll(async () => {
    await app.close()
    await prisma.$disconnect()
  })

  it('should be able to fetch banners', async () => {
    const response = await request(app.server).get('/banners').send()

    expect(response.status).toEqual(200)
    expect(response.body.banners).toHaveLength(1)
    expect(response.body.banners).toEqual([
      expect.objectContaining({
        image: 'http://localhost:3333/media/banners/fake_banner.svg',
        link: '/categories/test',
      }),
    ])
  })
})
