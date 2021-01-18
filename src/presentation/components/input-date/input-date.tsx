import { InputProps } from '@/presentation/components/input'
import { InputMask } from '@/presentation/components/input-mask'
import React from 'react'

const InputDate: React.FC<InputProps> = ({ ...rest }: any) => {
  return <InputMask mask="99/99/9999" {...rest} />
}

export default InputDate
