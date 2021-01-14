import React from 'react'
import { InputContainer } from './input.styles'

type InputProps = React.InputHTMLAttributes<HTMLInputElement>

const Input: React.FC<InputProps> = (props: any) => {
  return <InputContainer {...props} />
}

export default Input
