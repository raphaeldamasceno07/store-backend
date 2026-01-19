import type {
  productFilter,
  ProductsRepository,
  ProductsResponse,
} from '@/repositories/products-repository.js'

interface GetProductsUseCaseParamsRequest {
  filter: productFilter
}
interface GetProductsUseCaseResponse {
  products: ProductsResponse[]
}

export class GetProductsUseCase {
  constructor(private productRepository: ProductsRepository) {}

  async execute({
    filter,
  }: GetProductsUseCaseParamsRequest): Promise<GetProductsUseCaseResponse> {
    const { limit, metadata, order } = filter

    const finalFilter: productFilter = {
      ...(limit !== undefined && { limit }),
      ...(order !== undefined && { order }),
      ...(metadata !== undefined && { metadata }),
    }

    const products = await this.productRepository.findManyProducts(finalFilter)

    return { products }
  }
}
