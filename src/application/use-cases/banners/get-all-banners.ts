import type { BannersRepository } from '@/domain/repositories/banners-repository.js'
import { Banner } from '@/domain/entities/banner.js'

interface GetAllBannersUseCaseResponse {
  banners: Banner[]
}

export class GetAllBannersUseCase {
  constructor(private bannersRepository: BannersRepository) {}

  async execute(): Promise<GetAllBannersUseCaseResponse> {
    const banners = await this.bannersRepository.findMany()
    return { banners }
  }
}
