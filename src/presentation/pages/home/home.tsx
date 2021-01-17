import { makePanelActivities } from '@/main/factories/containers'
import {
  Button,
  Header,
  Modal,
  Section,
  Wrapper,
} from '@/presentation/components'
import { usePatient } from '@/presentation/hooks'
import React from 'react'
import { PanelContainer } from './home-styles'
import { HomePanel, PanelRenders } from './home.panels'

const Home: React.FC = () => {
  const { create } = usePatient()

  const [showModal, setShowModal] = React.useState<boolean>(false)
  const [panel, setPanel] = React.useState<PanelRenders>(PanelRenders.none)

  const handleToggleModal = React.useCallback(() => {
    setShowModal(!showModal)
    if (showModal) {
      create.reset()
    }
  }, [create, showModal])

  const handleOpenPanel = React.useCallback(
    (panel: PanelRenders) => {
      setPanel(panel)
      handleToggleModal()
    },
    [handleToggleModal],
  )

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
          <HomePanel name={panel} onClose={handleToggleModal} />
        </Modal>
      )}
      <Wrapper>
        <PanelContainer>{makePanelActivities()}</PanelContainer>
      </Wrapper>
    </>
  )
}

export default Home
