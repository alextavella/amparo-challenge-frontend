import { HttpClient, HttpStatusCode } from '@/data/protocols/http'
import { ApiError, UnexpectedError } from '@/domain/errors'
import { CreatePatients } from '@/domain/usecases'

export class RemoteCreatePatients implements CreatePatients {
  constructor(
    private readonly url: string,
    private readonly httpClient: HttpClient,
  ) {}

  async create(
    request: CreatePatients.Request,
  ): Promise<CreatePatients.Response> {
    const httpResponse = await this.httpClient.request({
      url: this.url,
      method: 'post',
      body: request,
    })

    const response = httpResponse.data

    switch (httpResponse.statusCode) {
      case HttpStatusCode.created:
        return response as CreatePatients.Response
      case HttpStatusCode.badRequest:
        throw new ApiError(response)
      default:
        throw new UnexpectedError()
    }
  }
}
