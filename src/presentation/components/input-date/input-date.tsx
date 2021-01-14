import React from 'react'
import { InputContainer } from './input-date.styles'

type InputProps = React.InputHTMLAttributes<HTMLInputElement>

const Input: React.FC<InputProps> = (props: any) => {
  return <InputContainer mask="99/99/9999" {...props} />
}

export default Input
