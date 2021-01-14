import { GlobalStyle } from '@/presentation/styles'
import React from 'react'
import { ThemeProvider } from 'styled-components'

const theme = {}

const Theme: React.FC = ({ children }) => {
  return (
    <ThemeProvider theme={theme}>
      {children}
      <GlobalStyle />
    </ThemeProvider>
  )
}

export default Theme
