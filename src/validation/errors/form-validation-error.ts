type FormValidationErrorData = {
  [key: string]: string
}

export class FormValidationError extends Error {
  constructor(readonly errors: FormValidationErrorData) {
    super()
    this.name = 'FormValidationError'
  }
}
