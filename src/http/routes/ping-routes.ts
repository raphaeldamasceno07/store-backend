import { createSwaggerSchema } from '@/providers/swagger.js'
import type { FastifyInstance } from 'fastify'
import { ping } from '../controllers/ping/ping.js'

export async function pingRoutes(app: FastifyInstance) {
  app.get(
    '/ping',
    {
      schema: createSwaggerSchema({
        tags: ['Health Check'],
        description: 'Verificar se a API está respondendo',
        response: {
          200: {
            description: 'API está funcionando corretamente',
            type: 'object',
            properties: {
              pong: {
                type: 'boolean',
              },
            },
          },
        },
      }),
    },
    ping,
  )
}
