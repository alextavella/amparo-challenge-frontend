import { RemoteSearchPatients } from '@/data/usecases'
import { makeApiUrl, makeAxiosHttpClient } from '@/main/factories/http'

export const makeRemoteSearchPatients = () =>
  new RemoteSearchPatients(
    makeApiUrl('/patients/search'),
    makeAxiosHttpClient(),
  )
