import { LoadActivitiesModel, Pagination } from '@/domain/models'
import { LoadActivities } from '@/domain/usecases'
import { Button, Input, InputDate } from '@/presentation/components'
import React, { FormEvent } from 'react'
import {
  Container,
  FilterBar,
  TableActivities,
} from './panel-activities.styles'

interface PanelActivitiesProps {
  loadActiviesService: LoadActivities
}

const initFilterParams = {
  date: new Date(),
}

const PanelActivities: React.FC<PanelActivitiesProps> = ({
  loadActiviesService,
}) => {
  const [paginationActivities, setPaginationActivities] = React.useState(
    {} as Pagination<LoadActivitiesModel.Response>,
  )

  const activities = React.useMemo<LoadActivitiesModel.Response[]>(
    () => paginationActivities?.data || [],
    [paginationActivities],
  )

  const search = React.useCallback(
    (params: LoadActivitiesModel.Request) => {
      loadActiviesService
        .load(params)
        .then(response => setPaginationActivities(response))
        .catch(console.log)
    },
    [loadActiviesService],
  )

  const handleSubmit = React.useCallback((event: FormEvent) => {
    event.preventDefault()
  }, [])

  React.useEffect(() => {
    search(initFilterParams)
  }, [search])

  return (
    <Container>
      <FilterBar>
        <form onSubmit={handleSubmit}>
          <Input placeholder="CPF do Paciente" />
          <Input placeholder="Status do Aprazamento" />
          <InputDate placeholder="Data" />
          <Button type="submit">Filtrar</Button>
        </form>
      </FilterBar>
      <TableActivities>
        <thead>
          <tr>
            <th style={{ width: '25%' }}>Paciente</th>
            <th style={{ width: '15%' }}>CPF</th>
            <th style={{ width: '15%' }}>Data</th>
            <th style={{ width: '40%' }}>Atividade</th>
            <th style={{ width: '15%' }}>Status</th>
          </tr>
        </thead>
        <tbody>
          {activities.map(activity => (
            <tr key={activity.id}>
              <td>{activity.patient_name}</td>
              <td>{activity.patient_cpf}</td>
              <td>{activity.expire_date_formatted}</td>
              <td>{activity.name}</td>
              <td>{activity.status_formatted}</td>
            </tr>
          ))}
        </tbody>
      </TableActivities>
    </Container>
  )
}

export default PanelActivities
