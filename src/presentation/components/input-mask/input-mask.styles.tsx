import { baseInputStyle } from '@/presentation/components/input/input.styles'
import InputMask from 'react-input-mask'
import styled from 'styled-components'

export const InputContainer = styled.div`
  display: inline-block;

  > label,
  > input,
  > span {
    display: block;
  }

  > label {
    font-size: 0.9rem;
    color: #333;
  }

  > input {
    width: inherit;
  }

  > span.error {
    color: ${props => props.theme.pallette['color-danger-500']};
    font-size: 0.8rem;
    margin-top: 4px;
  }
`

export const InputElement = styled(InputMask)`
  ${baseInputStyle}
`
