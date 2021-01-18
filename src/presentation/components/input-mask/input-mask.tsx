import { InputProps } from '@/presentation/components/input'
import { useField } from '@unform/core'
import React from 'react'
import { InputContainer, InputElement } from './input-mask.styles'

export interface InputMaskProps extends InputProps {
  mask: string
}

const InputMask: React.FC<InputMaskProps> = ({
  mask,
  label,
  name,
  ...rest
}: any) => {
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
        mask={mask}
        {...rest}
      />
      {!!error && <span className="error">{error}</span>}
    </InputContainer>
  )
}

export default InputMask
