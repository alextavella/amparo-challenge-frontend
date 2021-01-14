import { makeHomePage } from '@/main/factories/pages'
import { ThemeProvider } from '@/presentation/containers'
import React from 'react'

export const App: React.FC = () => {
  return <ThemeProvider>{makeHomePage()}</ThemeProvider>
}
