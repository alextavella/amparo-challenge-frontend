import { ObjectValidation } from '@/validation/protocols'
import * as Yup from 'yup'

export class CreatePatientsValidation implements ObjectValidation {
  readonly schema: { [key: string]: any }

  constructor() {
    this.schema = {
      name: Yup.string()
        .matches(/.+\s.+/, 'Nome deve ser composto')
        .required('Nome do endereço é obrigatório'),
      cpf: Yup.string()
        .matches(/[0-9]{3}\.[0-9]{3}\.[0-9]{3}-[0-9]{2}/, 'CPF incompleto')
        .required('CPF é obrigatório'),
    }
  }
}
