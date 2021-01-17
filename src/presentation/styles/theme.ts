import { colors } from './colors'

export const theme = {
  pallette: colors,
  space: {
    sm: 8,
    md: 16,
    lg: 20,
  },
  radii: 8,
  input: {
    root: {
      bgColor: '#fff',
      border: '1px solid #ccc',
      radius: '6px',
      space: '12px',
      textColor: '#111',
    },
  },
  button: {
    primary: {
      bgColor: colors['color-primary-500'],
      radius: '6px',
      space: '12px',
      textColor: colors['color-primary-100'],
    },
    secondary: {
      bgColor: colors['color-secondary-500'],
      radius: '6px',
      space: '12px',
      textColor: colors['color-secondary-100'],
    },
  },
}

export type Theme = typeof theme
