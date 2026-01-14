export class Banner {
  constructor(
    public readonly image: string,
    public readonly link: string,
  ) {
    if (!image) {
      throw new Error('Banner precisa de uma imagem')
    }

    if (!link.startsWith('http')) {
      throw new Error('Link do banner deve ser uma URL válida')
    }
  }
}
