import { app } from '@/app.js'
import request from 'supertest'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

describe('Test ping route (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to see the pong response', async () => {
    const response = await request(app.server).get('/ping').send()

    expect(response.statusCode).toEqual(200)
    expect(response.body).toEqual(expect.objectContaining({ pong: true }))
  })
})
