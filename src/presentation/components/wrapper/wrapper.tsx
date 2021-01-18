import React from 'react'
import { Container } from './wrapper.styles'

const Wrapper: React.FC = ({ children, ...rest }) => {
  return <Container {...rest}>{children}</Container>
}

export default Wrapper
