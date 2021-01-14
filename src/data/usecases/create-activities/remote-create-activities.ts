import { HttpClient, HttpStatusCode } from '@/data/protocols/http'
import { UnexpectedError } from '@/domain/errors'
import { CreateActivities } from '@/domain/usecases'

export class RemoteCreateActivities implements CreateActivities {
  constructor(
    private readonly url: string,
    private readonly httpClient: HttpClient,
  ) {}

  async create(
    request: CreateActivities.Request,
  ): Promise<CreateActivities.Response> {
    const httpResponse = await this.httpClient.request({
      url: this.url,
      method: 'post',
      body: request,
    })

    const response = httpResponse.data

    switch (httpResponse.statusCode) {
      case HttpStatusCode.created:
        return response as CreateActivities.Response
      default:
        throw new UnexpectedError()
    }
  }
}
