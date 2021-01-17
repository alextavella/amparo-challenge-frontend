import styled from 'styled-components'

export const Container = styled.div`
  width: 100%;
  height: 100%;

  form {
    margin-top: 10px;
    height: 100%;

    .input-form {
      width: 100%;

      & + * {
        margin-top: 10px;
      }
    }

    button {
      margin-top: 10px;
      width: 100%;
    }
  }
`
