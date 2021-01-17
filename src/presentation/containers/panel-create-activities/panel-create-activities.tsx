import React from 'react'
import { Container } from './panel-create-activities.styles'

const PanelCreateActivities: React.FC = ({ ...rest }) => {
  return (
    <Container {...rest}>
      <h2>Nova Atividade</h2>
    </Container>
  )
}

export default PanelCreateActivities
