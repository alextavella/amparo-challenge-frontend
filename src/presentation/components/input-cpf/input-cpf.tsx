import Input, { InputProps } from '@/presentation/components/input/input'
import React from 'react'
import { InputContainer } from './input-cpf.styles'

const InputCpf: React.FC<InputProps> = ({ disabled, ...rest }: any) => {
  return (
    <InputContainer mask="999.999.999-99" disabled={disabled}>
      <Input type="tel" disableUnderline {...rest} />
    </InputContainer>
  )
}

export default InputCpf
