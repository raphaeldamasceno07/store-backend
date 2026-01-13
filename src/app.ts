import cors from '@fastify/cors'
import fastifyStatic from '@fastify/static'
import fastifySwagger from '@fastify/swagger'
import fastifySwaggerUi from '@fastify/swagger-ui'
import fastify from 'fastify'
import path from 'node:path'

import { dirname } from 'path'
import { fileURLToPath } from 'url'
import { ZodError } from 'zod'
import { env } from './env/index.js'
import { bannersRoutes } from './http/controllers/banners/routes.js'
import { pingRoutes } from './http/controllers/ping/route.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

export const app = fastify()

app.register(cors, {
  origin: '*',
})

app.register(fastifySwagger, {
  swagger: {
    info: {
      title: 'Store API',
      description: 'API Documentation for Store Backend',
      version: '1.0.0',
    },
    host: 'localhost:3333',
    schemes: ['http'],
    consumes: ['application/json'],
    produces: ['application/json'],
  },
})

app.register(fastifySwaggerUi, {
  routePrefix: '/docs',
})

app.register(bannersRoutes)

app.register(fastifyStatic, {
  root: path.join(__dirname, 'public'),
  prefix: '/public/',
})

app.register(pingRoutes)

app.setErrorHandler((error, _, reply) => {
  if (error instanceof ZodError) {
    return reply.status(400).send({
      message: 'validation error.',
      issues: error.format(),
    })
  }
  if (env.NODE_ENV !== 'prod') {
    console.error(error)
  } else {
    //TODO - Here I should log the error to an external tool like DataDog/NewRelic/Sentry
  }

  return reply.status(500).send({
    message: 'Ocorreu algum erro',
  })
})
