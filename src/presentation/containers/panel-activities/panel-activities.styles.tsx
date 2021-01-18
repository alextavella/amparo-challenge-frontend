import styled from 'styled-components'

export const Container = styled.div`
  height: 100%;
  width: 100%;

  display: flex;
  justify-content: space-between;
  flex-direction: column;
`

export const FilterBar = styled.div`
  border-top-left-radius: ${props => `${props.theme.radii}px`};
  border-top-right-radius: ${props => `${props.theme.radii}px`};

  background: ${props => props.theme.pallette['color-primary-800']};
  padding: 12px;
  width: 100%;

  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: row;

  .input-form + * {
    margin-left: 8px;
  }
`

export const TableActivities = styled.table.attrs({
  cellspacing: '0',
  cellpadding: '0',
})`
  border: 1px solid ${props => props.theme.pallette['color-primary-800']};
  border-bottom-left-radius: ${props => `${props.theme.radii}px`};
  border-bottom-right-radius: ${props => `${props.theme.radii}px`};

  display: block;
  border-collapse: collapse;
  padding: 0;
  text-align: left;
  width: 100%;

  thead,
  tbody,
  tr {
    width: 100%;
  }

  td,
  th {
    padding: 6px;
  }

  thead {
    background: ${props => props.theme.pallette['color-primary-100']};

    font-size: 0.8rem;
  }

  tbody {
    border-bottom-left-radius: ${props => `${props.theme.radii}px`};
    border-bottom-right-radius: ${props => `${props.theme.radii}px`};

    font-size: 0.9rem;

    > tr {
      &:nth-child(odd) {
        background: #fff;
      }
      &:nth-child(even) {
        background: #efefef;
      }
      &:last-child {
        td:first-child {
          border-bottom-left-radius: ${props => `${props.theme.radii}px`};
        }
        td:last-child {
          border-bottom-right-radius: ${props => `${props.theme.radii}px`};
        }
      }
    }
  }
`
