import { Wrapper } from '@/presentation/components'
import React from 'react'
import { Container } from './header.styles'

const Header: React.FC = () => {
  return (
    <Container>
      <Wrapper>
        <h1>
          <img
            src="https://amparosaude.com.br/wp-content/uploads/2020/04/logotipo-amparo-white.png"
            title="Amparo Saúde"
          />
        </h1>

        <span>Atividades</span>
      </Wrapper>
    </Container>
  )
}

export default Header
