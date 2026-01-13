import type { FastifySchema } from 'fastify'
import type { ZodSchema } from 'zod'

interface SchemaProperty {
  type: 'string' | 'number' | 'integer' | 'boolean' | 'object' | 'array'
  description?: string
  enum?: (string | number)[]
  items?: SchemaProperty
  properties?: Record<string, SchemaProperty>
  required?: string[]
}

interface ResponseSchema {
  [statusCode: number]: {
    description: string
    type?: 'object' | 'array'
    properties?: Record<string, SchemaProperty>
    items?: SchemaProperty
  }
}

interface SwaggerDocOptions {
  tags?: string[]
  description?: string
  summary?: string
  params?: Record<string, SchemaProperty> | ZodSchema
  body?:
    | Record<string, SchemaProperty>
    | ZodSchema
    | {
        description?: string
        type: 'object'
        properties: Record<string, SchemaProperty>
        required?: string[]
      }
  response: ResponseSchema
}

function zodToSwaggerType(zodType: any): SchemaProperty {
  const typeName = zodType._def.typeName

  switch (typeName) {
    case 'ZodString': {
      const schema: SchemaProperty = { type: 'string' }
      if (zodType.description) schema.description = zodType.description
      // Extrair enums se houver
      if (zodType._def.checks) {
        const enumCheck = zodType._def.checks.find(
          (c: any) => c.kind === 'enum',
        )
        if (enumCheck) schema.enum = enumCheck.value
      }
      return schema
    }
    case 'ZodNumber': {
      const schema: SchemaProperty = { type: 'number' }
      if (zodType.description) schema.description = zodType.description
      return schema
    }
    case 'ZodBoolean': {
      const schema: SchemaProperty = { type: 'boolean' }
      if (zodType.description) schema.description = zodType.description
      return schema
    }
    case 'ZodArray': {
      const schema: SchemaProperty = {
        type: 'array',
        items: zodToSwaggerType(zodType._def.type),
      }
      if (zodType.description) schema.description = zodType.description
      return schema
    }
    case 'ZodObject': {
      const shape = zodType.shape || zodType._def.shape?.()
      const properties: Record<string, SchemaProperty> = {}
      const required: string[] = []

      for (const [key, value] of Object.entries(shape)) {
        properties[key] = zodToSwaggerType(value)
        // Verificar se é obrigatório (não é opcional)
        if (!(value as any)._def.typeName.includes('Optional')) {
          required.push(key)
        }
      }

      return {
        type: 'object',
        properties,
        required: required.length > 0 ? required : undefined,
      }
    }
    case 'ZodOptional': {
      return zodToSwaggerType(zodType._def.schema)
    }
    default:
      return { type: 'string' }
  }
}

function convertBodySchema(
  body:
    | Record<string, SchemaProperty>
    | ZodSchema
    | {
        description?: string
        type: 'object'
        properties: Record<string, SchemaProperty>
        required?: string[]
      }
    | undefined,
):
  | {
      description?: string
      type: 'object'
      properties: Record<string, SchemaProperty>
      required?: string[]
    }
  | undefined {
  if (!body) return undefined

  // Se for um schema manual
  if ('type' in body && body.type === 'object') {
    return body
  }

  // Se for um Zod Schema
  if ('_def' in body || '_parse' in body) {
    const swaggerSchema = zodToSwaggerType(body)
    return {
      type: 'object',
      properties: swaggerSchema.properties || {},
      required: swaggerSchema.required,
    }
  }

  // Se for um objeto com propriedades manuais
  return {
    type: 'object',
    properties: body as Record<string, SchemaProperty>,
  }
}

function convertParamsSchema(
  params: Record<string, SchemaProperty> | ZodSchema | undefined,
):
  | {
      type: 'object'
      properties: Record<string, SchemaProperty>
      required: string[]
    }
  | undefined {
  if (!params) return undefined

  // Se for um Zod Schema
  if ('_def' in params || '_parse' in params) {
    const swaggerSchema = zodToSwaggerType(params)
    return {
      type: 'object',
      properties: swaggerSchema.properties || {},
      required: Object.keys(swaggerSchema.properties || {}),
    }
  }

  // Se for um objeto com propriedades manuais
  return {
    type: 'object',
    properties: params,
    required: Object.keys(params),
  }
}

export function createSwaggerSchema(options: SwaggerDocOptions): FastifySchema {
  const schema: FastifySchema = {
    tags: options.tags,
    description: options.description,
    summary: options.summary,
    response: options.response,
  }

  if (options.params) {
    schema.params = convertParamsSchema(options.params)
  }

  if (options.body) {
    schema.body = convertBodySchema(options.body)
  }

  return schema
}
