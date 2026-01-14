import type { Banner as PrismaBanner } from '@prisma/client'
import { Banner } from '@/domain/entities/banner.js'
import { prisma } from '../client.js'
import type { BannersRepository } from '@/domain/repositories/banners-repository.js'

export class PrismaBannersRepository implements BannersRepository {
  async findMany(): Promise<Banner[]> {
    const banners: PrismaBanner[] = await prisma.banner.findMany()

    return banners.map((banner) => new Banner(banner.image, banner.link))
  }
}
