import { PrismaBannersRepository } from '@/repositories/prisma/prisma-banners-repository.js'
import { GetAllBannersUseCase } from '../get-all-banners.js'

export function makeGetAllBannersUseCase() {
  const bannersRepository = new PrismaBannersRepository()
  const useCase = new GetAllBannersUseCase(bannersRepository)

  return useCase
}
