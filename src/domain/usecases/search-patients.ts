import { SearchPatientsModel } from '@/domain/models'

export interface SearchPatients {
  search(request: SearchPatients.Request): Promise<SearchPatients.Response>
}

export namespace SearchPatients {
  export type Request = SearchPatientsModel.Request
  export type Response = SearchPatientsModel.Response[]
}
