import { createGlobalStyle } from 'styled-components'
import { formFieldset } from './form'

export default createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    outline: 0;
    box-sizing: border-box;
  }

  body {
    background: #fff;
    color: #111;
    font-family: 'Roboto', sans-serif;
    font-weight: 400;
    font-size: 14px;
    -webkit-font-smoothing: antialiased;
  }

  ${formFieldset}
`
