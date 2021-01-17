import { useField } from '@unform/core'
import React from 'react'
import { InputContainer, InputElement } from './input.styles'

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
  name: string
  disabled?: boolean
}

const Input: React.FC<InputProps> = ({ label, name, ...rest }: any) => {
  const inputRef = React.useRef<any>(null)

  const { fieldName, defaultValue, registerField, error } = useField(name)

  React.useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef.current,
      path: 'value',
    })
  }, [fieldName, registerField])

  return (
    <InputContainer className="input-form">
      {!!label && <label htmlFor={name}>{label}:</label>}
      <InputElement
        id={name}
        ref={inputRef}
        defaultValue={defaultValue}
        {...rest}
      />
      {!!error && <span className="error">{error}</span>}
    </InputContainer>
  )
}

export default Input
