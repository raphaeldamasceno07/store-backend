import type { FastifyInstance } from 'fastify'
import { ping } from './ping.js'

export async function pingRoutes(app: FastifyInstance) {
  app.get('/ping', ping)
}
