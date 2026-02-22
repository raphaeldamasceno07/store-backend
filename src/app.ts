import cors from '@fastify/cors'
import fastifyStatic from '@fastify/static'
import { fastifySwagger } from '@fastify/swagger'
import scalarApiReference from '@scalar/fastify-api-reference'
import fastify from 'fastify'
import {
  jsonSchemaTransform,
  serializerCompiler,
  validatorCompiler,
  type ZodTypeProvider,
} from 'fastify-type-provider-zod'
import path from 'node:path'
import { dirname } from 'path'
import { fileURLToPath } from 'url'
import { ZodError } from 'zod'
import { env } from './env/index.js'
import { bannersRoutes } from './http/controllers/banners/routes.js'
import { pingRoutes } from './http/controllers/ping/route.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

export const app = fastify().withTypeProvider<ZodTypeProvider>()

app.setValidatorCompiler(validatorCompiler)
app.setSerializerCompiler(serializerCompiler)

app.register(cors, {
  origin: '*',
})

app.register(fastifySwagger, {
  openapi: {
    info: {
      title: 'e-commerce API',
      description: 'API para um e-commerce',
      version: '1.0.0',
    },
  },
  transform: jsonSchemaTransform,
})

app.register(scalarApiReference, {
  routePrefix: '/docs',
})

app.register(pingRoutes)
app.register(bannersRoutes)

app.register(fastifyStatic, {
  root: path.join(__dirname, 'public'),
  prefix: '/public/',
})

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
