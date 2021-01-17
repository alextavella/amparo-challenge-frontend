export class AppValidationError extends Error {
  constructor(message: string) {
    super(message)
    this.name = 'AppValidationError'
  }
}
