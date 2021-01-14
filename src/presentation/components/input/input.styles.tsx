import styled, { css } from 'styled-components'

export const baseInputStyle = css`
  background: ${props => props.theme.input.root.bgColor};
  border: none;
  border-radius: ${props => props.theme.input.root.radius};
  color: ${props => props.theme.input.root.textColor};
  padding: ${props => props.theme.input.root.space};
`

export const InputContainer = styled.input`
  ${baseInputStyle}
`
