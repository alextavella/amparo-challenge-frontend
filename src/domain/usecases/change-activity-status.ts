import { ChangeActivityStatusModel } from '@/domain/models'

export interface ChangeActivityStatus {
  change(
    request: ChangeActivityStatus.Request,
  ): Promise<ChangeActivityStatus.Response>
}

export namespace ChangeActivityStatus {
  export type Request = ChangeActivityStatusModel.Request
  export type Response = ChangeActivityStatusModel.Response
}
