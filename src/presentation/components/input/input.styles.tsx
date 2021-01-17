import styled, { css } from 'styled-components'

export const baseInputStyle = css`
  background: ${props => props.theme.input.root.bgColor};
  border: 1px solid #ccc;
  border-radius: ${props => props.theme.input.root.radius};
  color: ${props => props.theme.input.root.textColor};
  padding: ${props => props.theme.input.root.space};
`

export const InputContainer = styled.div`
  display: inline-block;

  > label,
  > input,
  > span {
    display: block;
  }

  > label {
    font-size: 0.9rem;
    color: #333;
  }

  > input {
    width: inherit;
  }

  > span.error {
    color: ${props => props.theme.pallette['color-danger-500']};
    font-size: 0.8rem;
    margin-top: 4px;
  }
`

export const InputElement = styled.input`
  ${baseInputStyle}
`
