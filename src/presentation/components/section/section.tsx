import { Wrapper } from '@/presentation/components'
import React from 'react'
import {
  Breadcrumb,
  Container,
  Navigation,
  TitleContainer,
} from './section.styles'

type SectionProps = {
  title: string
  breadcrumb?: string[]
}

const Section: React.FC<SectionProps> = ({
  children,
  title,
  breadcrumb = [],
}) => {
  return (
    <Container>
      <Wrapper>
        <TitleContainer>
          <h2>{title}</h2>

          <Breadcrumb>
            {breadcrumb.map((item, index) => (
              <span key={`${index}-${item}`}>{item}</span>
            ))}
          </Breadcrumb>
        </TitleContainer>

        <Navigation>{children}</Navigation>
      </Wrapper>
    </Container>
  )
}

export default Section
