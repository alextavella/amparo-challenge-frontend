import { makeHomePage } from '@/main/factories/pages'
import { AppProvider, ThemeProvider } from '@/presentation/containers'
import React from 'react'

export const App: React.FC = () => {
  return (
    <ThemeProvider>
      <AppProvider>{makeHomePage()}</AppProvider>
    </ThemeProvider>
  )
}
