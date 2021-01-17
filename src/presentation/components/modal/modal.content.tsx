import { Button } from '@/presentation/components'
import React from 'react'
import { BoxContent, Container, Overlay } from './modal.styles'

export type ModalContentProps = {
  size?: {
    width: number
    height: number
  }
  onClose(): void
}

const ModalContent: React.FC<ModalContentProps> = ({
  children,
  size = { width: 500, height: 500 },
  onClose,
}) => {
  return (
    <Container>
      <BoxContent size={size}>
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
