import { createSwaggerSchema } from '@/libs/swagger.js'
import type { FastifyInstance } from 'fastify'
import { fetchBanners } from './fetch-banners.js'

export async function bannersRoutes(app: FastifyInstance) {
  app.get(
    '/banners',
    {
      schema: createSwaggerSchema({
        tags: ['Banners'],
        description: 'Listar todos os banners',
        response: {
          200: {
            description: 'Resposta de sucesso',
            type: 'object',
            properties: {
              banners: {
                type: 'array',
                items: {
                  type: 'object',
                  properties: {
                    image: { type: 'string', description: 'URL da imagem' },
                    link: { type: 'string', description: 'Link do banner' },
                  },
                },
              },
            },
          },
        },
      }),
    },
    fetchBanners,
  )
}
