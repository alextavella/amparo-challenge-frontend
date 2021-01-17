import styled from 'styled-components'

export const Container = styled.div`
  width: 100vw;
  height: 100vh;

  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
`

type BoxContentProp = {
  size: {
    width: number
    height: number
  }
}

export const BoxContent = styled.div<BoxContentProp>`
  width: ${props => `${props.size.width}px`};
  height: ${props => `${props.size.height}px`};

  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  margin: auto;

  background: #fff;
  z-index: 100;

  > button {
    position: absolute;
    right: 10px;
    top: 10px;
  }

  > div {
    height: 100%;
    width: 100%;
  }
`

export const Overlay = styled.div`
  background: rgba(0, 0, 0, 0.8);
  z-index: 50;

  width: 100%;
  height: 100%;
`
