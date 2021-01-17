import { ValidationError } from 'yup'

interface Error {
  [key: string]: string
}

export default (errors: ValidationError): Error => {
  return errors.inner.reduce((acc: Error, error: ValidationError) => {
    const name = error.path!
    const message = error.message
    return { ...acc, [name]: message }
  }, {})
}
