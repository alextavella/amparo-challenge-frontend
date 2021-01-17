import styled, { css } from 'styled-components'

export const baseSelectStyle = css`
  background: ${props => props.theme.input.root.bgColor};
  border: ${props => props.theme.input.root.border};
  border-radius: ${props => props.theme.input.root.radius};
  color: ${props => props.theme.input.root.textColor};
  padding: ${props => props.theme.input.root.space};
`

export const SelectContainer = styled.div`
  display: inline-block;

  > label,
  > select,
  > span {
    display: block;
  }

  > label {
    font-size: 0.9rem;
    color: #333;
  }

  > select {
    width: inherit;
  }

  > span.error {
    color: ${props => props.theme.pallette['color-danger-500']};
    font-size: 0.8rem;
    margin-top: 4px;
  }
`

export const SelectElement = styled.select`
  ${baseSelectStyle}

  line-height: 1rem;

  margin: 0;
  padding-right: 40px;
  box-sizing: border-box;
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  -webkit-appearance: none;
  -moz-appearance: none;

  background-image: linear-gradient(45deg, transparent 50%, gray 50%),
    linear-gradient(135deg, gray 50%, transparent 50%),
    linear-gradient(to right, #ccc, #ccc);
  background-position: calc(100% - 20px) calc(1em + 2px),
    calc(100% - 15px) calc(1em + 2px), calc(100% - 2.5em) 0.5em;
  background-size: 5px 5px, 5px 5px, 1px 1.7em;
  background-repeat: no-repeat;
`
