import { CreateActivities } from '@/domain/usecases'
import React from 'react'

type ActivityState<T = any> = {
  loading: boolean
  error: boolean
  data: T
}

enum ActivityActions {
  CREATE_REQUEST = 'CREATE_REQUEST',
  CREATE_ERROR = 'CREATE_ERROR',
  CREATE_SUCCESS = 'CREATE_SUCCESS',
  CREATE_RESET = 'CREATE_RESET',
}

type Action<T> = {
  type: T
  data?: any
}

const reducer = (state: ActivityState, action: Action<ActivityActions>) => {
  switch (action.type) {
    case ActivityActions.CREATE_REQUEST:
      return {
        loading: true,
        error: false,
        data: undefined,
      }
    case ActivityActions.CREATE_ERROR:
      return {
        loading: false,
        error: true,
        data: undefined,
      }
    case ActivityActions.CREATE_SUCCESS:
      return {
        loading: false,
        error: false,
        data: action.data,
      }
    case ActivityActions.CREATE_RESET:
      return {
        loading: false,
        error: false,
        data: undefined,
      }
    default:
      return state
  }
}

const stateInitial: ActivityState = {
  loading: false,
  error: false,
  data: undefined,
}

type ActivityContextData = {
  activityState: ActivityState<CreateActivities.Response>
  create: {
    exec(): void
    error(): void
    success(data: CreateActivities.Response): void
    reset(): void
  }
}

const ActivityContext = React.createContext({} as ActivityContextData)

const ActivityProvider: React.FC = ({ children }) => {
  const [state, dispatch] = React.useReducer(reducer, stateInitial)

  const create = {
    exec: () => dispatch({ type: ActivityActions.CREATE_REQUEST }),
    error: () => dispatch({ type: ActivityActions.CREATE_ERROR }),
    success: (data: CreateActivities.Response) =>
      dispatch({ type: ActivityActions.CREATE_SUCCESS, data }),
    reset: () => dispatch({ type: ActivityActions.CREATE_RESET }),
  }

  const patientData: ActivityContextData = {
    activityState: state,
    create,
  }

  return (
    <ActivityContext.Provider value={patientData}>
      {children}
    </ActivityContext.Provider>
  )
}

const useActivity = () => {
  const context = React.useContext(ActivityContext)

  if (!context) {
    throw new Error('useActivity must be used within a ActivityProvider')
  }

  return context
}

export { useActivity, ActivityProvider }
