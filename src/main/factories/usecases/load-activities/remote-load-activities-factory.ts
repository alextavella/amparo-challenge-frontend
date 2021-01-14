import { RemoteLoadActivities } from '@/data/usecases'
import { makeApiUrl, makeAxiosHttpClient } from '@/main/factories/http'

export const makeRemoteLoadActivities = () =>
  new RemoteLoadActivities(makeApiUrl('/activities'), makeAxiosHttpClient())
