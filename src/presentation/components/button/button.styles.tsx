import { darken, lighten } from 'polished'
import styled, { css } from 'styled-components'
import { ButtonColors } from './button.props'

export const baseButtonStyle = (color: ButtonColors) => css`
  background: ${props => props.theme.button[color].bgColor};
  border: none;
  border-radius: ${props => props.theme.button[color].radius};
  color: ${props => props.theme.button[color].textColor};
  padding: ${props => props.theme.button[color].space};
`

interface ButtonContainerProps {
  color: ButtonColors
}

export const ButtonContainer = styled.button<ButtonContainerProps>`
  ${props => baseButtonStyle(props.color)}

  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background: ${props =>
      lighten(0.1, props.theme.button[props.color].bgColor)};
  }

  &:disabled {
    cursor: default;
    background: ${props =>
      darken(0.1, props.theme.button[props.color].bgColor)};
  }
`
