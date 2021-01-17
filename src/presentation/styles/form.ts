import { css } from 'styled-components'

export const formFieldset = css`
  fieldset.form-fieldset {
    border: 0;
    height: 100%;

    display: flex;
    justify-content: space-between;
    flex-direction: column;

    legend {
      color: #111;
      font-size: 1.2rem;
      font-weight: 800;
      padding: 12px;
    }

    form {
      display: flex;
      flex-direction: column;
    }

    .form-fieldset--inputs {
      flex: 1;
      padding: 12px;
    }

    .form-fieldset--controls {
      background: #efefef;
      padding: 12px;
    }
  }
`
