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

export const BoxContent = styled.div`
  background: #fff;

  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  margin: auto;

  width: 300px;
  height: 300px;
  padding: 10px;
  z-index: 100;

  > button {
    position: absolute;
    right: 10px;
    top: 10px;
  }

  > div {
  }
`

export const Overlay = styled.div`
  background: rgba(0, 0, 0, 0.8);
  z-index: 50;

  width: 100%;
  height: 100%;
`
