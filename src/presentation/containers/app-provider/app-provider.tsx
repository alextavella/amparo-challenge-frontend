import { PatientProvider } from '@/presentation/hooks'
import React from 'react'

const AppProvider: React.FC = ({ children }) => {
  return <PatientProvider>{children}</PatientProvider>
}

export default AppProvider
