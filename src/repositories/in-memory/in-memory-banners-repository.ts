import type {
  BannerResponse,
  BannersRepository,
} from '../banners-repository.js'

export class InMemoryBannersRepository implements BannersRepository {
  public banners: BannerResponse[] = []

  async findManyBanners(): Promise<BannerResponse[]> {
    return this.banners
  }
}
