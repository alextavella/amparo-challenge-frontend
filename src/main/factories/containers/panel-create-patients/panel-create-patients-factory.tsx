import { makeRemoteCreatePatients } from '@/main/factories/usecases'
import { PanelCreatePatients } from '@/presentation/containers'
import React from 'react'
import { makeCreatePatientsValidation } from './panel-create-patients.validation-factory'

export const makePanelCreatePatients = () => (
  <PanelCreatePatients
    createPatientsService={makeRemoteCreatePatients()}
    validationService={makeCreatePatientsValidation()}
  />
)
