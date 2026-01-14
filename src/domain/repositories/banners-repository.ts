import { Banner } from '../entities/banner.js'

export interface BannersRepository {
  findMany(): Promise<Banner[]>
}
