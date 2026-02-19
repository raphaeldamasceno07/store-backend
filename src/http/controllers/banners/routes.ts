import type { FastifyInstance } from 'fastify'
import { fetchBanners } from './fetch-banners.js'

export async function bannersRoutes(app: FastifyInstance) {
  app.get('/banners', fetchBanners)
}
