import { ActivityProvider, PatientProvider } from '@/presentation/hooks'
import React from 'react'

const AppProvider: React.FC = ({ children }) => {
  return (
    <ActivityProvider>
      <PatientProvider>{children}</PatientProvider>
    </ActivityProvider>
  )
}

export default AppProvider
