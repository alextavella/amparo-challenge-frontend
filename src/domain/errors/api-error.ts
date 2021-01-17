import { BadRequestError } from './bad-request-error'

export class ApiError extends BadRequestError {
  errors: any
  constructor(err: any) {
    super(err.message)
    this.errors = err.errors
  }
}
