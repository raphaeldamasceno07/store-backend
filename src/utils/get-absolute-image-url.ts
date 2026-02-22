export const getAbsoluteImageUrl = (path: string) => {
  const baseUrl =
    process.env.BASE_URL?.replace(/\/$/, '') || 'http://localhost:3333'

  // Garante que o path comece com / se não tiver
  const cleanPath = path.startsWith('/') ? path : `/${path}`

  return `${baseUrl}${cleanPath}`
}
