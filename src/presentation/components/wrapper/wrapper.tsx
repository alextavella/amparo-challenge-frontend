import React from 'react'
import { Container } from './wrapper.styles'

const Wrapper: React.FC = ({ children }) => {
  return <Container>{children}</Container>
}

export default Wrapper
