import type { Banner } from '@prisma/client'

export type BannerResponse = Pick<Banner, 'image' | 'link'>

export interface BannersRepository {
  findManyBanners(): Promise<BannerResponse[]>
}
