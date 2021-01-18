import { Button } from '@/presentation/components'
import React from 'react'
import { Container } from './pagination.styles'

type PaginationProps = {
  page: number
  total: number
  onClick(page: number): void
}

const Pagination: React.FC<PaginationProps> = ({
  page: currentPage,
  total,
  onClick,
}) => {
  const pages = React.useMemo<number[]>(
    () => Array.from({ length: total }, (_, i) => i + 1),
    [total],
  )

  return (
    <Container>
      {pages.map(page => (
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
