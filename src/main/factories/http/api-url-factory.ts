export const makeApiUrl = (path: string): string =>
  `${process.env.REACT_APP_BASE_URL ?? 3000}${path}`
