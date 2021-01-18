import { InputProps } from '@/presentation/components/input'
import { InputMask } from '@/presentation/components/input-mask'
import React from 'react'

const InputCpf: React.FC<InputProps> = ({ ...rest }: any) => {
  return <InputMask mask="999.999.999-99" {...rest} />
}

export default InputCpf
