import { HttpClient, HttpStatusCode } from '@/data/protocols/http'
import { ApiError, UnexpectedError } from '@/domain/errors'
import { ActivityStatus } from '@/domain/models'
import { LoadActivities } from '@/domain/usecases'

export class RemoteLoadActivities implements LoadActivities {
  constructor(
    private readonly url: string,
    private readonly httpClient: HttpClient,
  ) {}

  async load(
    request: LoadActivities.Request,
  ): Promise<LoadActivities.Response> {
    const { date, status, cpf, page } = request

    let url = `${this.url}/${date.toISOString()}/?page=${page}&size=10`

    if (ActivityStatus[status as ActivityStatus]) {
      url = `${url}&status=${status}`
    }

    if (!!cpf) {
      url = `${url}&cpf=${cpf}`
    }

    const httpResponse = await this.httpClient.request({
      url,
      method: 'get',
    })

    const response = httpResponse.data

    switch (httpResponse.statusCode) {
      case HttpStatusCode.ok:
        return response as LoadActivities.Response
      case HttpStatusCode.noContent:
        return { page: 1, size: 1, total: 0, data: [] }
      case HttpStatusCode.badRequest:
        throw new ApiError(response)
      default:
        throw new UnexpectedError()
    }
  }
}
