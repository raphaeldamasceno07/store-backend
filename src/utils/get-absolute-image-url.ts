export const getAbsoluteImageUrl = (imageName: string) => {
  const baseUrl =
    process.env.BASE_URL?.replace(/\/$/, '') || 'http://localhost:3333'
  return `${baseUrl}/media/banners/${imageName}`
}
