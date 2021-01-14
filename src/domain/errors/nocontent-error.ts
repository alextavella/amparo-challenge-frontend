export class NoContentError extends Error {
  constructor() {
    super('Recurso não encontrado. Tente novamente em breve.')
    this.name = 'NoContentError'
  }
}
