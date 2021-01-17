import { AppValidationError, FormValidationError } from '@/validation/errors'
import {
  ObjectValidation,
  Validation,
  ValidationOptions,
} from '@/validation/protocols'
import { getValidationErrors } from '@/validation/utils'
import * as Yup from 'yup'

export class ValidationComposite implements Validation {
  private constructor(
    private readonly validation: ObjectValidation,
    private readonly options?: ValidationOptions,
  ) {}

  static build(
    validation: ObjectValidation,
    options?: ValidationOptions,
  ): ValidationComposite {
    return new ValidationComposite(validation, options)
  }

  async validate<T>(data: T): Promise<T> {
    try {
      const schema = Yup.object().shape(this.validation.schema)
      await schema.validate(data, {
        abortEarly: false,
      })
      return data
    } catch (error) {
      if (error instanceof Yup.ValidationError) {
        const fieldErrors = getValidationErrors(error)
        throw new FormValidationError(fieldErrors)
      }
      throw new AppValidationError(
        this.options?.invalidMessage || 'Ocorreu um erro, tente mais tarde.',
      )
    }
  }
}
