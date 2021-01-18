import { ActivityStatus } from '@/domain/models'
import { ObjectValidation } from '@/validation/protocols'
import * as Yup from 'yup'

const activity_status = [
  ActivityStatus.aberto,
  ActivityStatus.atrasado,
  ActivityStatus.finalizado,
]

export class FilterActivitiesValidation implements ObjectValidation {
  readonly schema: { [key: string]: any }

  constructor() {
    this.schema = {
      cpf: Yup.string()
        .notRequired()
        .test('cpf', 'CPF incompleto', value => {
          if (!!value) {
            const schema = Yup.string().matches(
              /[0-9]{3}\.[0-9]{3}\.[0-9]{3}-[0-9]{2}/,
              'CPF incompleto',
            )
            return schema.isValidSync(value)
          }
          return true
        }),
      status: Yup.number()
        .notRequired()
        .test('status', 'Status inválido', value => {
          if (!!value) {
            const schema = Yup.number().oneOf(
              activity_status,
              'Status inválido',
            )
            return schema.isValidSync(value)
          }
          return true
        }),
      expire_date: Yup.string()
        .notRequired()
        .test('expire_date', 'Data inválida', value => {
          if (!!value) {
            const schema = Yup.string().matches(
              /^(0?[1-9]|[12][0-9]|3[01])\/(0?[1-9]|1[012])\/\d{4}$/,
              'Data inválida',
            )
            return schema.isValidSync(value)
          }
          return true
        }),
    }
  }
}
