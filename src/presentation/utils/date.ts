export const parseToDate = (date: string): Date => {
  const [day, month, year] = date.split('/')
  return new Date(+year, +month, +day)
}

export const formatDate = (date: Date): string => {
  const year = date.getFullYear()
  const month = Number(date.getMonth() + 1).toFixed(2)
  const day = date.getDate().toFixed(2)
  return `${year}/${month}/${day}`
}
