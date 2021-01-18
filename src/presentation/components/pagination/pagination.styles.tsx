import styled from 'styled-components'

export const Container = styled.ul`
  list-style: none;
  margin-top: 10px;
  width: 100%;

  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: row;

  > li + li {
    margin-left: 10px;
  }
`
