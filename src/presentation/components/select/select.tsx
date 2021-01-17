import { useField } from '@unform/core'
import React from 'react'
import { SelectContainer, SelectElement } from './select.styles'

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  name: string
  label?: string
  options: {
    label: string
    value: any
  }[]
  disabled?: boolean
}

const Select: React.FC<SelectProps> = ({ name, label, options, ...rest }) => {
  const selectRef = React.useRef<any>(null)

  const { fieldName, defaultValue, registerField, error } = useField(name)

  React.useEffect(() => {
    registerField({
      name: fieldName,
      ref: selectRef.current,
      getValue: (refs: HTMLSelectElement) => refs.value,
    })
  }, [fieldName, registerField])

  return (
    <SelectContainer className="input-form">
      {!!label && <label htmlFor={name}>{label}:</label>}
      <SelectElement ref={selectRef} defaultValue={defaultValue} {...rest}>
        {options.map((opt, index) => (
          <option key={`${index}-${opt.value}`} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </SelectElement>
      {!!error && <span className="error">{error}</span>}
    </SelectContainer>
  )
}

export default Select
