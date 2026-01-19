import { getAbsoluteImageUrl } from '@/utils/get-absolute-image-url.js'
import type { Product } from '@prisma/client'
import type {
  productFilter,
  ProductsRepository,
  ProductsResponse,
} from '../products-repository.js'

export class InMemoryProductsRepository implements ProductsRepository {
  public items: Product[] = []

  async findManyProducts(filters: productFilter): Promise<ProductsResponse[]> {
    let filteredItems = [...this.items]

    if (filters.order) {
      filteredItems.sort((a, b) => {
        switch (filters.order) {
          case 'views':
            return (b.views_count ?? 0) - (a.views_count ?? 0)
          case 'selling':
            return (b.sales_count ?? 0) - (a.sales_count ?? 0)
          case 'price':
            return a.price - b.price
          default:
            return 0
        }
      })
    }

    // 3. Simulação do Limite
    if (filters.limit) {
      filteredItems = filteredItems.slice(0, filters.limit)
    }

    // 4. Mapeamento para o formato de Resposta (ProductsResponse)
    const response: ProductsResponse[] = filteredItems.map((item) => {
      // Define o caminho relativo primeiro
      const relativePath = item.image
        ? `media/products/${item.image}`
        : `media/image.svg`

      return {
        id: item.id,
        label: item.label,
        price: item.price,
        image: getAbsoluteImageUrl(relativePath),
        liked: false,
      }
    })

    return response
  }
}
