import { RemoteCreatePatients } from '@/data/usecases'
import { makeApiUrl, makeAxiosHttpClient } from '@/main/factories/http'

export const makeRemoteCreatePatients = () =>
  new RemoteCreatePatients(makeApiUrl('/patients'), makeAxiosHttpClient())
