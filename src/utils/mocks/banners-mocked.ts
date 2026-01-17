import type { Banner } from '@prisma/client'

export const bannersMocked: Banner[] = [
  {
    id: 1,
    image: 'https://example.com/banner1.jpg',
    link: 'https://example.com/promo1',
    created_at: new Date('2025-01-01T10:00:00Z'),
    updated_at: new Date('2025-01-10T15:30:00Z'),
  },
  {
    id: 2,
    image: 'https://example.com/banner2.jpg',
    link: 'https://example.com/promo2',
    created_at: new Date('2025-01-02T11:00:00Z'),
    updated_at: new Date('2025-01-11T09:15:00Z'),
  },
  {
    id: 3,
    image: 'https://example.com/banner3.jpg',
    link: 'https://example.com/promo3',
    created_at: new Date('2025-01-03T12:00:00Z'),
    updated_at: new Date('2025-01-12T14:45:00Z'),
  },
  {
    id: 4,
    image: 'https://example.com/banner4.jpg',
    link: 'https://example.com/promo4',
    created_at: new Date('2025-01-04T13:00:00Z'),
    updated_at: new Date('2025-01-11T16:20:00Z'),
  },
  {
    id: 5,
    image: 'https://example.com/banner5.jpg',
    link: 'https://example.com/promo5',
    created_at: new Date('2025-01-05T14:00:00Z'),
    updated_at: new Date('2025-01-12T11:00:00Z'),
  },
]
