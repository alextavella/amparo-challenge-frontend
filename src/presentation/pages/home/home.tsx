import { makePanelActivities } from '@/main/factories/containers'
import {
  Button,
  Header,
  Modal,
  Section,
  Wrapper,
} from '@/presentation/components'
import React from 'react'
import { PanelContainer } from './home-styles'
import { HomePanel, PanelRenders } from './home.panels'

const Home: React.FC = () => {
  const [showModal, setShowModal] = React.useState<boolean>(false)
  const [panel, setPanel] = React.useState<PanelRenders>(PanelRenders.none)

  const handleOpenPanel = React.useCallback((panel: PanelRenders) => {
    setPanel(panel)
    setShowModal(true)
  }, [])

  return (
    <>
      <Header />
      <Section
        title="Lista de Atividades"
        breadcrumb={['início', 'lista de atividades']}
      >
        <Button onClick={() => handleOpenPanel(PanelRenders.patient)}>
          Novo Paciente
        </Button>
        <Button onClick={() => handleOpenPanel(PanelRenders.activity)}>
          Nova Atividade
        </Button>
      </Section>
      {showModal && (
        <Modal>
          <HomePanel name={panel} onClose={() => setShowModal(false)} />
        </Modal>
      )}
      <Wrapper>
        <PanelContainer>{makePanelActivities()}</PanelContainer>
      </Wrapper>
    </>
  )
}

export default Home
