import { InMemoryBannersRepository } from '@/repositories/in-memory/in-memory-banners-repository'
import { bannersMocked } from '@/utils/mocks/banners-mocked'
import { beforeEach, describe, expect, it } from 'vitest'
import { GetAllBannersUseCase } from './get-all-banners'

let bannersRepository: InMemoryBannersRepository
let sut: GetAllBannersUseCase

describe('Get All Banners Unit', () => {
  beforeEach(() => {
    bannersRepository = new InMemoryBannersRepository()
    sut = new GetAllBannersUseCase(bannersRepository)
  })

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
})
