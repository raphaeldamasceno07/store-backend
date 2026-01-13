import type { BannersRepository } from '@/repositories/banners-repository.js'
import type { Banner } from '@prisma/client'

interface GetAllBannersUseCaseResponse {
  banners: Pick<Banner, 'image' | 'link'>[]
}

export class GetAllBannersUseCase {
  constructor(private bannersRepository: BannersRepository) {}

  async execute(): Promise<GetAllBannersUseCaseResponse> {
    const banners = await this.bannersRepository.findManyBanners()
    return { banners }
  }
}
