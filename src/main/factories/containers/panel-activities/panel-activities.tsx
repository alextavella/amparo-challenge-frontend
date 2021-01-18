import {
  makeRemoteChangeActivityStatus,
  makeRemoteLoadActivities,
} from '@/main/factories/usecases'
import { PanelActivities } from '@/presentation/containers'
import React from 'react'
import { makeFilterActivitiesValidation } from './panel-activities.validation-factory'

export const makePanelActivities = () => (
  <PanelActivities
    loadActiviesService={makeRemoteLoadActivities()}
    changeActivityStatusService={makeRemoteChangeActivityStatus()}
    validationService={makeFilterActivitiesValidation()}
  />
)
