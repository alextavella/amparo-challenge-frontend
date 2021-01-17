import {
  ActivityStatus,
  LoadActivitiesModel,
  Pagination,
} from '@/domain/models'
import { ChangeActivityStatus, LoadActivities } from '@/domain/usecases'
import { Button, Input, InputDate, Select } from '@/presentation/components'
import { useActivity } from '@/presentation/hooks'
import { formatDate, parseToDate } from '@/presentation/utils'
import { Form } from '@unform/web'
import React from 'react'
import {
  Container,
  FilterBar,
  TableActivities,
} from './panel-activities.styles'

interface PanelActivitiesProps {
  loadActiviesService: LoadActivities
  changeActivityStatusService: ChangeActivityStatus
}

type FormData = {
  cpf: string
  date: string
  status: string
}

type FilterData = {
  date: string
}

const initFilterParams: FilterData = {
  date: formatDate(new Date()),
}

const statusOptions = [
  { label: 'Aberto', value: ActivityStatus.aberto },
  { label: 'Atrasado', value: ActivityStatus.atrasado },
  { label: 'Finalizado', value: ActivityStatus.finalizado },
]

const PanelActivities: React.FC<PanelActivitiesProps> = ({
  loadActiviesService,
  changeActivityStatusService,
}) => {
  const { activityState } = useActivity()

  const [filter, setFilter] = React.useState(initFilterParams)
  const [paginationActivities, setPaginationActivities] = React.useState(
    {} as Pagination<LoadActivitiesModel.Response>,
  )

  const [loaded, setLoaded] = React.useState<boolean>(false)
  const activities = React.useMemo<LoadActivitiesModel.Response[]>(
    () => paginationActivities?.data || [],
    [paginationActivities],
  )

  const search = React.useCallback(
    (params: FilterData) => {
      const payload: LoadActivitiesModel.Request = {
        date: parseToDate(params.date),
      }

      loadActiviesService
        .load(payload)
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
    const { date } = data
    setFilter({ date })
  }, [])

  const handleChangeActivityStatus = React.useCallback(
    (event: React.ChangeEvent<HTMLSelectElement>, activityId: string) => {
      changeActivityStatus(activityId, +event.target.value)
    },
    [changeActivityStatus],
  )

  React.useEffect(() => {
    if (!loaded || !!activityState.data) {
      setLoaded(true)
      search(filter)
    }
  }, [loaded, activityState.data, filter, search])

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
                <Form onSubmit={() => {}}>
                  <Select
                    name="status"
                    options={statusOptions}
                    defaultValue={activity.status.toString()}
                    onChange={e => handleChangeActivityStatus(e, activity.id)}
                  />
                </Form>
              </td>
            </tr>
          ))}
        </tbody>
      </TableActivities>
    </Container>
  )
}

export default PanelActivities
