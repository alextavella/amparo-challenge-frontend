import styled from 'styled-components'

export const Container = styled.div`
  background: ${props => props.theme.pallette['color-secondary-500']};

  color: #fff;
  padding: 12px 0;

  > div {
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-direction: row;
  }
`

export const TitleContainer = styled.div`
  > h2 {
    display: block;
    color: #fff;
    font-size: 2rem;
  }
`

export const Breadcrumb = styled.div`
  > span {
    font-size: 0.8rem;
    color: #efefef;

    &:not(:first-child)::before {
      content: '>';
      color: #fff;
      margin: 0 10px;
    }
  }
`

export const Navigation = styled.nav`
  display: flex;
  align-items: center;
  justify-content: space-around;
  flex-direction: row;

  button + button {
    margin-left: 10px;
  }
`
