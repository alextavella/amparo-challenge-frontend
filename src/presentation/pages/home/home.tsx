import { makePanelActivities } from '@/main/factories/containers'
import {
  Button,
  Header,
  Modal,
  ModalContent,
  Section,
  Wrapper,
} from '@/presentation/components'
import React from 'react'
import { PanelContainer } from './home-styles'
import { HomePanel, PanelRenders } from './home.panels'

const Home: React.FC = () => {
  const [showModal, setShowModal] = React.useState<boolean>(false)
  const [panel, setPanel] = React.useState<PanelRenders>(PanelRenders.none)

  const handleToggleModal = React.useCallback(() => {
    setShowModal(!showModal)
  }, [showModal])

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
          <ModalContent onClose={handleToggleModal}>
            <HomePanel name={panel} />
          </ModalContent>
        </Modal>
      )}
      <Wrapper>
        <PanelContainer>{makePanelActivities()}</PanelContainer>
      </Wrapper>
    </>
  )
}

export default Home
