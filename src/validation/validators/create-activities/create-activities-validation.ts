import { ActivityStatus } from '@/domain/models'
import { ObjectValidation } from '@/validation/protocols'
import * as Yup from 'yup'

const activity_status = [
  ActivityStatus.aberto,
  ActivityStatus.atrasado,
  ActivityStatus.finalizado,
]

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
        .oneOf(activity_status, 'Status inválido')
        .required('Status é obrigatório'),
      name: Yup.string()
        .matches(/.+\s.+/, 'Nome da atividade deve ser composto')
        .required('Nome da atividade é obrigatório'),
    }
  }
}
