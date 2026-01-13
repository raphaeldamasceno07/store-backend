import { app } from '@/app.js'
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

    console.log(response.body)

    expect(response.status).toEqual(200)
    expect(response.body.banners).toHaveLength(5)
    expect(response.body.banners).toEqual([
      expect.objectContaining({
        image: 'https://example.com/banner1.jpg',
        link: 'https://example.com/product1',
      }),
      expect.objectContaining({
        image: 'https://example.com/banner2.jpg',
        link: 'https://example.com/product2',
      }),
      expect.objectContaining({
        image: 'https://example.com/banner3.jpg',
        link: 'https://example.com/product3',
      }),
      expect.objectContaining({
        image: 'https://example.com/banner4.jpg',
        link: 'https://example.com/product4',
      }),
      expect.objectContaining({
        image: 'https://example.com/banner5.jpg',
        link: 'https://example.com/product5',
      }),
    ])
  })
})
