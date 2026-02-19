import { InMemoryProductsRepository } from '@/repositories/in-memory/in-memory-products-repository.js'
import { productsMocked } from '@/utils/mocks/products-mocked.js'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { InvalidLimitError } from './errors/invalid-limit-error.js'
import { GetProductsUseCase } from './get-products.js'

let productsRepository: InMemoryProductsRepository
let sut: GetProductsUseCase

describe('Get products Use Case', () => {
  beforeEach(() => {
    productsRepository = new InMemoryProductsRepository()
    sut = new GetProductsUseCase(productsRepository)
    vi.restoreAllMocks()
  })

  //#region --- TESTES DE SUCESSO ---

  it('should be able to get all products', async () => {
    productsRepository.products = productsMocked

    const { products } = await sut.execute({ filter: {} })

    expect(products).toHaveLength(10)
    expect(products[0]).toHaveProperty('label', 'Notebook Dell Inspiron 15')
  })

  it('should be able to get products with limit', async () => {
    productsRepository.products = productsMocked

    const { products } = await sut.execute({
      filter: { limit: 5 },
    })

    expect(products).toHaveLength(5)
  })

  it('should be able to get products ordered by views', async () => {
    productsRepository.products = productsMocked

    const { products } = await sut.execute({
      filter: { order: 'views' },
    })

    expect(products[0]).toHaveProperty('label', 'Smartphone Samsung Galaxy S23')
  })

  it('should be able to get products ordered by selling', async () => {
    productsRepository.products = productsMocked

    const { products } = await sut.execute({
      filter: { order: 'selling' },
    })

    expect(products[0]).toHaveProperty('label', 'Mouse Gamer Logitech G403')
  })

  it('should be able to get products ordered by price', async () => {
    productsRepository.products = productsMocked

    const { products } = await sut.execute({
      filter: { order: 'price' },
    })

    expect(products[0]).toHaveProperty('label', 'Mouse Gamer Logitech G403')
    expect(products[0].price).toBeLessThanOrEqual(products[1].price)
  })

  it('should be able to get products with limit and order', async () => {
    productsRepository.products = productsMocked

    const { products } = await sut.execute({
      filter: { limit: 3, order: 'views' },
    })

    expect(products).toHaveLength(3)
    expect(products[0]).toHaveProperty('label', 'Smartphone Samsung Galaxy S23')
    expect(products[1]).toHaveProperty('label', 'Mouse Gamer Logitech G403')
    expect(products[2]).toHaveProperty('label', 'SSD Kingston NV2 1TB')
  })
  //#endregion

  //#region --- TESTES DE CENÁRIOS DE BORDA (EDGE CASES) ---

  it('should return an empty list when there are no products', async () => {
    // Garantimos que o repositório está vazio
    productsRepository.products = []

    const { products } = await sut.execute({ filter: {} })

    expect(products).toEqual([])
    expect(products).toHaveLength(0)
  })

  it('should return all available products if limit is higher than total', async () => {
    productsRepository.products = productsMocked

    const { products } = await sut.execute({
      filter: { limit: 100 },
    })

    expect(products).toHaveLength(10)
  })
  //#endregion

  //#region --- TESTES DE ERRO (NEGATIVE PATHS) ---

  it('should throw an error if the repository fails', async () => {
    vi.spyOn(productsRepository, 'findManyProducts').mockRejectedValueOnce(
      new Error('Database connection failed'),
    )

    // Em funções assíncronas, usamos .rejects.toThrow()
    await expect(sut.execute({ filter: {} })).rejects.toThrow(
      'Database connection failed',
    )
  })

  it('should not allow negative limits (Business Logic)', async () => {
    const promise = sut.execute({
      filter: { limit: -1 },
    })

    await expect(promise).rejects.toBeInstanceOf(InvalidLimitError)
  })
  //#endregion
})
