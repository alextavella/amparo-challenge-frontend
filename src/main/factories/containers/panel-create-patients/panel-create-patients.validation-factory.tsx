import {
  CreatePatientsValidation,
  ValidationComposite,
} from '@/validation/validators'

export const makeCreatePatientsValidation = () => {
  const validation = new CreatePatientsValidation()
  return ValidationComposite.build(validation, {
    invalidMessage:
      'Ocorreu um erro ao cadastrar o paciente, cheque os dados e tente novamente.',
  })
}
