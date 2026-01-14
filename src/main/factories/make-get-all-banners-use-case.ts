import { PrismaBannersRepository } from '@/infra/database/prisma/repositories/prisma-banners-repository.js'
import { GetAllBannersUseCase } from '../../application/use-cases/banners/get-all-banners.js'

export function makeGetAllBannersUseCase() {
  const bannersRepository = new PrismaBannersRepository()
  const useCase = new GetAllBannersUseCase(bannersRepository)

  return useCase
}
