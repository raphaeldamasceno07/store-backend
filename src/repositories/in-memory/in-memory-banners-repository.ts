import type { Banner } from '@prisma/client'
import type {
  BannerResponse,
  BannersRepository,
} from '../banners-repository.js'

export class InMemoryBannersRepository implements BannersRepository {
  public banners: Banner[] = []

  async findManyBanners(): Promise<BannerResponse[]> {
    return this.banners.map((banner) => ({
      image: banner.image,
      link: banner.link,
    }))
  }
}
