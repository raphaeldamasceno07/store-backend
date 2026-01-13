import { makeGetAllBannersUseCase } from '@/use-cases/factories/make-get-all-banners-use-case.js'
import type { FastifyReply, FastifyRequest } from 'fastify'

export async function fetchBanners(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const fetchBanners = makeGetAllBannersUseCase()

  const { banners } = await fetchBanners.execute()

  return reply.status(200).send({ banners })
}
