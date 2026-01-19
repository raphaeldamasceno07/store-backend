import { InMemoryProductsRepository } from '@/repositories/in-memory/in-memory-products-repository.js'
import { beforeEach, describe, expect, it } from 'vitest'
import { GetProductsUseCase } from './get-products.js'
import { productsMocked } from '@/utils/mocks/products-mocked.js'

let productsRepository: InMemoryProductsRepository
let sut: GetProductsUseCase

describe('Get products', () => {
  beforeEach(() => {
    productsRepository = new InMemoryProductsRepository()
    sut = new GetProductsUseCase(productsRepository)
  })

  it('should be able to get products all', async () => {
    productsRepository.products = productsMocked

    const { products } = await sut.execute({
      filter: {},
    })

    expect(products).toHaveLength(10)
  })
})
