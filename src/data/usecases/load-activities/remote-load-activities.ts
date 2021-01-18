import { HttpClient, HttpStatusCode } from '@/data/protocols/http'
import { UnexpectedError } from '@/domain/errors'
import { LoadActivities } from '@/domain/usecases'

export class RemoteLoadActivities implements LoadActivities {
  constructor(
    private readonly url: string,
    private readonly httpClient: HttpClient,
  ) {}

  async load(
    request: LoadActivities.Request,
  ): Promise<LoadActivities.Response> {
    const { date, page } = request
    const url = `${this.url}/${date.toISOString()}/?page=${page}&size=10`
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
      default:
        throw new UnexpectedError()
    }
  }
}
