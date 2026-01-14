import fastifySwagger from '@fastify/swagger'
import fastifySwaggerUi from '@fastify/swagger-ui'
import type { FastifyInstance } from 'fastify'

export async function registerSwagger(app: FastifyInstance) {
  await app.register(fastifySwagger, {
    swagger: {
      info: {
        title: 'Store API',
        description: 'API Documentation for Store Backend',
        version: '1.0.0',
      },
      consumes: ['application/json'],
      produces: ['application/json'],
    },
  })

  await app.register(fastifySwaggerUi, {
    routePrefix: '/docs',
  })
}
