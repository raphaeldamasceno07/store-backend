import { prisma } from '@/libs/prisma.js'
import type {
  BannerResponse,
  BannersRepository,
} from '../banners-repository.js'

export class PrismaBannersRepository implements BannersRepository {
  async findManyBanners(): Promise<BannerResponse[]> {
    const banners = await prisma.banner.findMany({
      select: {
        image: true,
        link: true,
      },
    })

    return banners
  }
}
