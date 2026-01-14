import type { BannersRepository } from '@/domain/repositories/banners-repository.js'
import type { Banner } from '@prisma/client'

export class InMemoryBannersRepository implements BannersRepository {
  public banners: Banner[] = []

  async findMany() {
    return this.banners.map((banner) => ({
      image: banner.image,
      link: banner.link,
    }))
  }
}
