import { makeGetAllBannersUseCase } from '@/use-cases/factories/make-get-all-banners-use-case.js'
import { getAbsoluteImageUrl } from '@/utils/get-absolute-image-url.js'
import type { FastifyReply, FastifyRequest } from 'fastify'

export async function fetchBanners(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const fetchBanners = makeGetAllBannersUseCase()
  const { banners } = await fetchBanners.execute()

  // O Controller usa o utilitário para formatar o dado para o cliente
  const bannersWithAbsoluteUrl = banners.map((banner) => ({
    ...banner,
    image: getAbsoluteImageUrl(banner.image),
  }))

  return reply.status(200).send({ banners: bannersWithAbsoluteUrl })
}
