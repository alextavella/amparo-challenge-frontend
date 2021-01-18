export type Activity = {
  id: string
  patient_id: string
  expire_date: string
  expire_date_formatted: string
  status: ActivityStatus
  status_formatted: string
  name: string
}

export namespace CreateActivityModel {
  export type Request = {
    patient_id: string
    expire_date: string
    status: ActivityStatus
    name: string
  }
  export type Response = Activity
}

export namespace LoadActivitiesModel {
  export type Request = {
    page: number
    date: Date
    cpf?: string
    status?: ActivityStatus
  }
  export type Response = {
    id: string
    expire_date: string
    expire_date_formatted: string
    status: ActivityStatus
    status_formatted: string
    name: string
    patient_name: string
    patient_cpf: string
  }
}

export namespace ChangeActivityStatusModel {
  export type Request = {
    id: string
    status: ActivityStatus
  }
  export type Response = Omit<Activity, 'patient_id'>
}

export enum ActivityStatus {
  aberto = 1,
  atrasado = 2,
  finalizado = 3,
}
