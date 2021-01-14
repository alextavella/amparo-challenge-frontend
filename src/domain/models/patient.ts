export type Patient = {
  id: string
  name: string
  cpf: string
}

export namespace CreatePatientModel {
  export type Request = {
    name: string
    cpf: string
  }
  export type Response = Patient
}

export namespace SearchPatientsModel {
  export type Request = {
    term: string
  }
  export type Response = {
    id: string
    name: string
  }
}
