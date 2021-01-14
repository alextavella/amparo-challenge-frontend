import { Theme } from '@/presentation/styles'
import 'styled-components'

declare module 'styled-components' {
  export type DefaultTheme = Theme
}
