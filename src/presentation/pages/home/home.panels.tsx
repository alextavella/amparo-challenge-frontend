import {
  makePanelCreateActivities,
  makePanelCreatePatients,
} from '@/main/factories/containers'
import React, { useEffect } from 'react'

export enum PanelRenders {
  none = 'none',
  patient = 'patient',
  activity = 'activity',
}

type Action<T> = {
  type: T
}

const panelRenderStateInitial = {
  panel: undefined,
}

type PanelState = {
  panel?: any
}

const reducer = (state: PanelState, action: Action<PanelRenders>) => {
  switch (action.type) {
    case PanelRenders.patient:
      return { panel: makePanelCreatePatients() }
    case PanelRenders.activity:
      return { panel: makePanelCreateActivities() }
    default:
      return state
  }
}

type HomePanelProps = {
  name: PanelRenders
}

const HomePanelComp: React.FC<HomePanelProps> = ({ name }) => {
  const [state, dispatch] = React.useReducer(reducer, panelRenderStateInitial)

  useEffect(() => {
    dispatch({ type: name })
    return () => {
      dispatch({ type: PanelRenders.none })
    }
  }, [name])

  return state.panel || null
}

export const HomePanel = React.memo(HomePanelComp)
