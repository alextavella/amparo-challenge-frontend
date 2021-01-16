import React from 'react'
import { SelectContainer } from './select.styles'

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  value?: string
  options: {
    label: string
    value: any
  }[]
}

const Select: React.FC<SelectProps> = ({
  options,
  value: selected,
  ...rest
}) => {
  return (
    <SelectContainer defaultValue={selected} {...rest}>
      {options.map((opt, index) => (
        <option key={`${index}-${opt.value}`} value={opt.value}>
          {opt.label}
        </option>
      ))}
    </SelectContainer>
  )
}

export default Select
