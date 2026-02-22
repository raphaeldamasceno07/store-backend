import type {
  productFilter,
  ProductsRepository,
  ProductsResponse,
} from '@/repositories/products-repository.js'
import { InvalidLimitError } from './errors/invalid-limit-error.js'

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

    if (limit !== undefined && limit < 1) {
      throw new InvalidLimitError()
    }

    const products = await this.productRepository.findManyProducts(filter)

    return { products }
  }
}
