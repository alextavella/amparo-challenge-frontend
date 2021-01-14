import { makePanelActivities } from '@/main/factories/containers'
import { Header, Wrapper, Section, Button } from '@/presentation/components'
import React from 'react'
import { PanelContainer } from './home-styles'

const Home: React.FC = () => {
  return (
    <>
      <Header />
      <Section
        title="Lista de Atividades"
        breadcrumb={['início', 'lista de atividades']}
      >
        <Button>Novo Paciente</Button>
        <Button>Nova Atividade</Button>
      </Section>
      <Wrapper>
        <PanelContainer>{makePanelActivities()}</PanelContainer>
      </Wrapper>
    </>
  )
}

export default Home
