export const parseToDate = (date: string): Date => {
  const [day, month, year] = date.split('/')
  return new Date(+year, +month - 1, +day)
}

export const formatDate = (date: Date): string => {
  const year = date.getFullYear()
  const month = Number(date.getMonth() + 1)
    .toString()
    .padStart(2, '0')
  const day = date.getDate().toString().padStart(2, '0')
  return `${day}/${month}/${year}`
}
