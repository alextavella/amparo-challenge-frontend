import styled from 'styled-components'

export const InputContainer = styled.div`
  display: inline-block;
  position: relative;

  .input-content {
    position: relative;
    width: inherit;

    > span {
      font-size: 0.6rem;
      position: absolute;
      right: 10px;
      top: 20px;
    }
  }
`

export const TermsContainer = styled.ul`
  border: ${props => props.theme.input.root.border};

  background: #fff;
  display: block;
  max-height: 180px;
  overflow-x: hidden;
  overflow-y: auto;
  width: 100%;

  position: absolute;
  top: 52px;
  left: 0;
  right: 0;

  > li {
    color: #333;
    cursor: pointer;
    font-size: 1rem;
    padding: 10px;

    transition: background-color 0.3s, color 0.3s;

    &:hover {
      color: #111;
      background: ${props =>
        props.theme.pallette['color-primary-transparent-500']};
    }
  }
`
