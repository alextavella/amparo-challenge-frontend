import { RemoteCreateActivities } from '@/data/usecases'
import { makeApiUrl, makeAxiosHttpClient } from '@/main/factories/http'

export const makeRemoteCreateActivities = () =>
  new RemoteCreateActivities(makeApiUrl('/activities'), makeAxiosHttpClient())
