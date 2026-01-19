import z from 'zod'

export type productFilter = {
  metadata?: { [key: string]: string }
  order?: string
  limit?: number
}

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
