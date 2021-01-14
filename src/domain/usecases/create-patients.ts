import { CreatePatientModel } from '@/domain/models'

export interface CreatePatients {
  create(request: CreatePatients.Request): Promise<CreatePatients.Response>
}

export namespace CreatePatients {
  export type Request = CreatePatientModel.Request
  export type Response = CreatePatientModel.Response
}
