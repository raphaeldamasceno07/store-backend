import z from 'zod'

export const BannerResponseSchema = z.object({
  image: z.string().url().describe('URL da imgm do banner'),
  link: z.string().url().describe('Link de redirecionamento'),
})

export type BannerResponse = z.infer<typeof BannerResponseSchema>
export interface BannersRepository {
  findManyBanners(): Promise<BannerResponse[]>
}
