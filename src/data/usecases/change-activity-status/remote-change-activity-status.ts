import { HttpClient, HttpStatusCode } from '@/data/protocols/http'
import { UnexpectedError } from '@/domain/errors'
import { ChangeActivityStatus } from '@/domain/usecases'

export class RemoteChangeActivityStatus implements ChangeActivityStatus {
  constructor(
    private readonly url: string,
    private readonly httpClient: HttpClient,
  ) {}

  async change(
    request: ChangeActivityStatus.Request,
  ): Promise<ChangeActivityStatus.Response> {
    const httpResponse = await this.httpClient.request({
      url: `${this.url}/${request.id}`,
      method: 'patch',
      body: {
        status: request.status,
      },
    })

    const response = httpResponse.data

    switch (httpResponse.statusCode) {
      case HttpStatusCode.ok:
        return response as ChangeActivityStatus.Response
      default:
        throw new UnexpectedError()
    }
  }
}
