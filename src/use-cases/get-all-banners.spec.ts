import { InMemoryBannersRepository } from '@/repositories/in-memory/in-memory-banners-repository'
import { bannersMocked } from '@/utils/mocks/banners-mocked'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { GetAllBannersUseCase } from './get-all-banners'

let bannersRepository: InMemoryBannersRepository
let sut: GetAllBannersUseCase

describe('Get All Banners Unit', () => {
  beforeEach(() => {
    bannersRepository = new InMemoryBannersRepository()
    sut = new GetAllBannersUseCase(bannersRepository)
    vi.restoreAllMocks()
  })

  //#region --- TESTES DE SUCESSO ---
  it('should be able to get all banners', async () => {
    bannersRepository.banners = bannersMocked

    const { banners } = await sut.execute()

    expect(banners).toHaveLength(5)
    expect(banners[0]).toHaveProperty('image')
    expect(banners[0]).toHaveProperty('link')
    expect(banners[0]).not.toHaveProperty('id')
    expect(banners[0]).not.toHaveProperty('created_at')
    expect(banners[0]).not.toHaveProperty('updated_at')
  })
  //#endregion

  //#region --- TESTES DE CENÁRIOS DE BORDA (EDGE CASES) ---
  it('should return an empty list when there are no banners', async () => {
    bannersRepository.banners = [] // Garante estado vazio

    const { banners } = await sut.execute()

    expect(banners).toEqual([])
    expect(banners).toHaveLength(0)
  })

  it('should throw an error if the repository fails', async () => {
    vi.spyOn(bannersRepository, 'findManyBanners').mockRejectedValueOnce(
      new Error('Database connection failed'),
    )

    await expect(sut.execute()).rejects.toThrow('Database connection failed')
  })

  //#endregion
})
