import {
  makeRemoteCreateActivities,
  makeRemoteSearchPatients,
} from '@/main/factories/usecases'
import { PanelCreateActivities } from '@/presentation/containers'
import React from 'react'
import { makeCreateActivitiesValidation } from './panel-create-activities.validation-factory'

export const makePanelCreateActivities = () => (
  <PanelCreateActivities
    createActivitiesService={makeRemoteCreateActivities()}
    searchPatientsService={makeRemoteSearchPatients()}
    validationService={makeCreateActivitiesValidation()}
  />
)
