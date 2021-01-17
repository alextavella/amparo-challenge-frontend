import {
  makePanelCreateActivities,
  makePanelCreatePatients,
} from '@/main/factories/containers'
import ModalContent, {
  ModalContentProps,
} from '@/presentation/components/modal/modal.content'
import { usePatient } from '@/presentation/hooks'
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
  size: { width: 500, height: 500 },
}

type PanelState = {
  panel?: JSX.Element
  size: { width: number; height: number }
}

const reducer = (state: PanelState, action: Action<PanelRenders>) => {
  switch (action.type) {
    case PanelRenders.patient:
      return {
        panel: makePanelCreatePatients(),
        size: { width: 500, height: 320 },
      }
    case PanelRenders.activity:
      return {
        panel: makePanelCreateActivities(),
        size: { width: 500, height: 450 },
      }
    default:
      return state
  }
}

interface HomePanelProps extends ModalContentProps {
  name: PanelRenders
}

const HomePanel: React.FC<HomePanelProps> = ({ name, onClose }) => {
  const { patientState } = usePatient()

  const [state, dispatch] = React.useReducer(reducer, panelRenderStateInitial)

  useEffect(() => {
    if (!!patientState.data) {
      onClose()
    }
  }, [onClose, patientState])

  useEffect(() => {
    dispatch({ type: name })
    return () => {
      dispatch({ type: PanelRenders.none })
    }
  }, [name])

  return !!state.panel ? (
    <ModalContent size={state.size} onClose={onClose}>
      {state.panel}
    </ModalContent>
  ) : null
}

export { HomePanel }
