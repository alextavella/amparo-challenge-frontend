import { ActivityStatus } from '@/domain/models'
import { ObjectValidation } from '@/validation/protocols'
import * as Yup from 'yup'

export class CreateActivitiesValidation implements ObjectValidation {
  readonly schema: { [key: string]: any }

  constructor() {
    this.schema = {
      patient_id: Yup.string().required('Nome do paciente é obrigatório'),
      expire_date: Yup.string()
        .matches(
          /^(0?[1-9]|[12][0-9]|3[01])\/(0?[1-9]|1[012])\/\d{4}$/,
          'Data inválida',
        )
        .required('Status é obrigatório'),
      status: Yup.number()
        .min(ActivityStatus.aberto, 'Status inválido')
        .max(ActivityStatus.finalizado, 'Status inválido')
        .required('Status é obrigatório'),
      name: Yup.string()
        .matches(/\w\s\w+/, 'Nome da atividade deve ser composto')
        .required('Nome da atividade é obrigatório'),
    }
  }
}
