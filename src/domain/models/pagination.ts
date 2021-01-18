export type PaginationModel<T> = {
  page: number
  size: number
  total: number
  data: T[]
}
