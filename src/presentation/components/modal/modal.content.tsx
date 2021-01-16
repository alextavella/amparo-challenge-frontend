import { Button } from '@/presentation/components'
import React from 'react'
import { BoxContent, Container, Overlay } from './modal.styles'

type ModalContentProps = {
  onClose(): void
}

const ModalContent: React.FC<ModalContentProps> = ({ children, onClose }) => {
  return (
    <Container>
      <BoxContent>
        <Button color="secondary" onClick={onClose}>
          x
        </Button>
        <div>{children}</div>
      </BoxContent>
      <Overlay onClick={onClose} />
    </Container>
  )
}

export default ModalContent
