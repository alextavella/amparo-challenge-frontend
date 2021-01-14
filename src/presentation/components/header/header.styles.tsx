import styled from 'styled-components'

export const Container = styled.header`
  background: ${props => props.theme.pallette['color-primary-transparent-500']};

  h1 {
    height: 35px;

    img {
      width: 120px;
      height: inherit;
    }
  }

  span {
    color: ${props => props.theme.pallette['color-primary-500']};
  }

  > div {
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-direction: row;
  }
`
