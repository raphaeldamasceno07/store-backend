import type {
  BannerResponse,
  BannersRepository,
} from '@/repositories/banners-repository.js'

interface GetAllBannersUseCaseResponse {
  banners: BannerResponse[]
}

export class GetAllBannersUseCase {
  constructor(private bannersRepository: BannersRepository) {}

  async execute(): Promise<GetAllBannersUseCaseResponse> {
    const banners = await this.bannersRepository.findManyBanners()
    return { banners }
  }
}
