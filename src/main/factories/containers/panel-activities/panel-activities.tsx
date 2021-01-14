import { makeRemoteLoadActivities } from '@/main/factories/usecases'
import { PanelActivities } from '@/presentation/containers'
import React from 'react'

export const makePanelActivities = () => (
  <PanelActivities loadActiviesService={makeRemoteLoadActivities()} />
)
