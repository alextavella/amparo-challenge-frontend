import {
  CreateActivitiesValidation,
  ValidationComposite,
} from '@/validation/validators'

export const makeCreateActivitiesValidation = () => {
  const validation = new CreateActivitiesValidation()
  return ValidationComposite.build(validation, {
    invalidMessage:
      'Ocorreu um erro ao cadastrar o paciente, cheque os dados e tente novamente.',
  })
}
