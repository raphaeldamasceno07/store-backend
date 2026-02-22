import z from 'zod'

export type productFilter = {
  metadata?: { [key: string]: string }
  order?: string
  limit?: number
}

export const productFilterSchema = z.object({
  metadata: z.record(z.string(), z.string()).optional(),
  order: z.string().optional(),
  limit: z.number().int().positive().optional(), // Aqui o -1 é barrado
})

export type productsFilter = z.infer<typeof productFilterSchema>

export const ProductsRepositorySchema = {
  id: z.number().describe('ID do produto'),
  label: z.string().describe('Nome do produto'),
  price: z.number().describe('Preço do produto'),
  image: z.string().describe('Caminho da imagem do produto'),
  liked: z.boolean().describe('Se o produto foi curtido'),
}

export type ProductsResponse = z.infer<typeof ProductsRepositorySchema>

export interface ProductsRepository {
  findManyProducts(filter: productFilter): Promise<ProductsResponse[]>
}
