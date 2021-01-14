import { HttpClient, HttpStatusCode } from '@/data/protocols/http'
import { UnexpectedError } from '@/domain/errors'
import { SearchPatients } from '@/domain/usecases'

export class RemoteSearchPatients implements SearchPatients {
  constructor(
    private readonly url: string,
    private readonly httpClient: HttpClient,
  ) {}

  async search(
    request: SearchPatients.Request,
  ): Promise<SearchPatients.Response> {
    const httpResponse = await this.httpClient.request({
      url: `${this.url}/?term=${request.term}`,
      method: 'get',
    })

    const response = httpResponse.data

    switch (httpResponse.statusCode) {
      case HttpStatusCode.ok:
        return response as SearchPatients.Response
      case HttpStatusCode.noContent:
        return []
      default:
        throw new UnexpectedError()
    }
  }
}
