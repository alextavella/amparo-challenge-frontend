import {
  ActivityStatus,
  LoadActivitiesModel,
  Pagination,
} from '@/domain/models'
import { ChangeActivityStatus, LoadActivities } from '@/domain/usecases'
import { Button, Input, InputDate } from '@/presentation/components'
import { Form } from '@unform/web'
import React, { FormEvent } from 'react'
import {
  ActivityStatusSelect,
  Container,
  FilterBar,
  TableActivities,
} from './panel-activities.styles'

interface PanelActivitiesProps {
  loadActiviesService: LoadActivities
  changeActivityStatusService: ChangeActivityStatus
}

const initFilterParams = {
  date: new Date(),
}

const statusOptions = [
  { label: 'Aberto', value: ActivityStatus.aberto },
  { label: 'Atrasado', value: ActivityStatus.atrasado },
  { label: 'Finalizado', value: ActivityStatus.finalizado },
]

type FormData = {
  cpf: string
  date: string
  status: string
}

const PanelActivities: React.FC<PanelActivitiesProps> = ({
  loadActiviesService,
  changeActivityStatusService,
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

  const changeActivityStatus = React.useCallback(
    (id: string, status: number) => {
      changeActivityStatusService
        .change({
          id,
          status,
        })
        .catch(console.log)
    },
    [changeActivityStatusService],
  )

  const handleSubmit = React.useCallback((data: FormData) => {
    console.log(data)
  }, [])

  const handleChangeActivityStatus = React.useCallback(
    (event: React.ChangeEvent<HTMLSelectElement>, activityId: string) => {
      changeActivityStatus(activityId, +event.target.value)
    },
    [changeActivityStatus],
  )

  React.useEffect(() => {
    search(initFilterParams)
  }, [search])

  return (
    <Container>
      <FilterBar>
        <Form onSubmit={handleSubmit}>
          <Input name="cpf" placeholder="CPF do Paciente" />
          <Input name="status" placeholder="Status do Aprazamento" />
          <InputDate name="date" placeholder="Data" />
          <Button type="submit">Filtrar</Button>
        </Form>
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
              <td>
                <ActivityStatusSelect
                  value={activity.status.toString()}
                  options={statusOptions}
                  onChange={e => handleChangeActivityStatus(e, activity.id)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </TableActivities>
    </Container>
  )
}

export default PanelActivities
