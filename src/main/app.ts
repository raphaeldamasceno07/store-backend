import { env } from '@/env/index.js'
import { bannersRoutes } from '@/http/routes/banners-routes.js'
import { pingRoutes } from '@/http/routes/ping-routes.js'
import { registerSwagger } from '@/providers/swagger-config.js'

import cors from '@fastify/cors'
import fastify from 'fastify'

import { ZodError } from 'zod'

export const app = fastify()

app.register(cors, {
  origin: '*',
})

registerSwagger(app)

app.register(bannersRoutes)
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
