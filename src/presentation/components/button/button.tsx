import React from 'react'
import { ButtonColors } from './button.props'
import { ButtonContainer } from './button.styles'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  color?: ButtonColors
}

const Button: React.FC<ButtonProps> = ({
  children,
  color = 'primary',
  ...rest
}) => {
  return (
    <ButtonContainer color={color} {...rest}>
      {children}
    </ButtonContainer>
  )
}

export default Button
