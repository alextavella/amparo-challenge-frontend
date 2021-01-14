import { CreateActivityModel } from '@/domain/models'

export interface CreateActivities {
  create(request: CreateActivities.Request): Promise<CreateActivities.Response>
}

export namespace CreateActivities {
  export type Request = CreateActivityModel.Request
  export type Response = CreateActivityModel.Response
}
