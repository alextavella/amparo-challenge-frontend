import {
  FilterActivitiesValidation,
  ValidationComposite,
} from '@/validation/validators'

export const makeFilterActivitiesValidation = () => {
  const validation = new FilterActivitiesValidation()
  return ValidationComposite.build(validation, {
    invalidMessage:
      'Ocorreu um erro ao filtrar atividades, cheque os dados e tente novamente.',
  })
}
