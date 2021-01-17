import { CreatePatients } from '@/domain/usecases'
import React from 'react'

type PatientState<T = any> = {
  loading: boolean
  error: boolean
  data: T
}

enum PatientActions {
  CREATE_REQUEST = 'CREATE_REQUEST',
  CREATE_ERROR = 'CREATE_ERROR',
  CREATE_SUCCESS = 'CREATE_SUCCESS',
  CREATE_RESET = 'CREATE_RESET',
}

type Action<T> = {
  type: T
  data?: any
}

const reducer = (state: PatientState, action: Action<PatientActions>) => {
  switch (action.type) {
    case PatientActions.CREATE_REQUEST:
      return {
        loading: true,
        error: false,
        data: undefined,
      }
    case PatientActions.CREATE_ERROR:
      return {
        loading: false,
        error: true,
        data: undefined,
      }
    case PatientActions.CREATE_SUCCESS:
      return {
        loading: false,
        error: false,
        data: action.data,
      }
    case PatientActions.CREATE_RESET:
      return {
        loading: false,
        error: false,
        data: undefined,
      }
    default:
      return state
  }
}

const stateInitial: PatientState = {
  loading: false,
  error: false,
  data: undefined,
}

type PatientContextData = {
  patientState: PatientState<CreatePatients.Response>
  create: {
    exec(): void
    error(): void
    success(data: CreatePatients.Response): void
    reset(): void
  }
}

const PatientContext = React.createContext({} as PatientContextData)

const PatientProvider: React.FC = ({ children }) => {
  const [state, dispatch] = React.useReducer(reducer, stateInitial)

  const create = {
    exec: () => dispatch({ type: PatientActions.CREATE_REQUEST }),
    error: () => dispatch({ type: PatientActions.CREATE_ERROR }),
    success: (data: CreatePatients.Response) =>
      dispatch({ type: PatientActions.CREATE_SUCCESS, data }),
    reset: () => dispatch({ type: PatientActions.CREATE_RESET }),
  }

  const patientData: PatientContextData = {
    patientState: state,
    create,
  }

  return (
    <PatientContext.Provider value={patientData}>
      {children}
    </PatientContext.Provider>
  )
}

const usePatient = () => {
  const context = React.useContext(PatientContext)

  if (!context) {
    throw new Error('usePatient must be used within a PatientProvider')
  }

  return context
}

export { usePatient, PatientProvider }
