import { app } from '@/main/app.js'
import request from 'supertest'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

describe('Fetch Banners (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to fetch banners', async () => {
    const response = await request(app.server).get('/banners').send()

    expect(response.status).toEqual(200)
    expect(response.body.banners).toHaveLength(1)
    expect(response.body.banners).toEqual([
      expect.objectContaining({
        image: 'fake_banner.svg',
        link: '/categories/test',
      }),
    ])
  })
})
