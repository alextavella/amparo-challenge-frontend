import { LoadActivitiesModel, PaginationModel } from '@/domain/models'

export interface LoadActivities {
  load(request: LoadActivities.Request): Promise<LoadActivities.Response>
}

export namespace LoadActivities {
  export type Request = LoadActivitiesModel.Request
  export type Response = PaginationModel<LoadActivitiesModel.Response>
}
