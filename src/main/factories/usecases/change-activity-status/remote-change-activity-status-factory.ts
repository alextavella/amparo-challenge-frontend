import { RemoteChangeActivityStatus } from '@/data/usecases'
import { makeApiUrl, makeAxiosHttpClient } from '@/main/factories/http'

export const makeRemoteChangeActivityStatus = () =>
  new RemoteChangeActivityStatus(
    makeApiUrl('/activities'),
    makeAxiosHttpClient(),
  )
