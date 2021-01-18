import { Button } from '@/presentation/components'
import React from 'react'
import { Container } from './pagination.styles'

type PaginationProps = {
  page: number
  total: number
  stepSize?: number
  onClick(page: number): void
}

const Pagination: React.FC<PaginationProps> = ({
  page: currentPage,
  total,
  stepSize = 5,
  onClick,
}) => {
  const step = React.useMemo<{ min: number; max: number }>(() => {
    const middle = Math.round(stepSize - Math.ceil(5 * 0.5))

    let min = Math.max(currentPage - middle, 0)
    const max = Math.min(Math.ceil(min + stepSize), total)
    min = Math.max(max - 1 - stepSize, 0)

    return { min, max }
  }, [currentPage, stepSize, total])

  const numPages = React.useMemo<number[]>(
    () =>
      Array.from(
        { length: Math.min(total, stepSize) },
        (_, i) => step.min + i + 1,
      ),
    [step.min, stepSize, total],
  )

  return (
    <Container>
      {numPages.map(page => (
        <li key={page}>
          <Button disabled={page === currentPage} onClick={() => onClick(page)}>
            {page}
          </Button>
        </li>
      ))}
    </Container>
  )
}

export default Pagination
