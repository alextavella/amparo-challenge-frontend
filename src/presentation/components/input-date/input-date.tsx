import Input, { InputProps } from '@/presentation/components/input/input'
import React from 'react'
import { InputContainer } from './input-date.styles'

const InputDate: React.FC<InputProps> = ({ disabled, ...rest }: any) => {
  return (
    <InputContainer mask="99/99/9999" disabled={disabled}>
      <Input type="tel" disableUnderline {...rest} />
    </InputContainer>
  )
}

export default InputDate
