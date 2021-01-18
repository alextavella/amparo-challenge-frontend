import { ApiError } from '@/domain/errors'
import {
  ActivityStatus,
  LoadActivitiesModel,
  PaginationModel,
} from '@/domain/models'
import { ChangeActivityStatus, LoadActivities } from '@/domain/usecases'
import {
  Button,
  Input,
  InputDate,
  Pagination,
  Select,
} from '@/presentation/components'
import { useActivity } from '@/presentation/hooks'
import { formatDate, parseToDate } from '@/presentation/utils'
import { FormValidationError } from '@/validation/errors'
import { Validation } from '@/validation/protocols'
import { FormHandles } from '@unform/core'
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
  validationService: Validation
}

type FormData = {
  cpf: string
  status: number
  expire_date: string
}

const initFormData: FormData = {
  cpf: '',
  status: 0,
  expire_date: formatDate(new Date(Date.now())),
}

type FilterData = {
  page: number
  date: string
  cpf?: string
  status?: number
}

const initFilterParams: FilterData = {
  page: 1,
  date: formatDate(new Date(Date.now())),
  cpf: undefined,
  status: undefined,
}

const filterStatusOptions = [
  { label: 'Selecionar', value: 0 },
  { label: 'Aberto', value: ActivityStatus.aberto },
  { label: 'Atrasado', value: ActivityStatus.atrasado },
  { label: 'Finalizado', value: ActivityStatus.finalizado },
]

const statusOptions = [
  { label: 'Aberto', value: ActivityStatus.aberto },
  { label: 'Atrasado', value: ActivityStatus.atrasado },
  { label: 'Finalizado', value: ActivityStatus.finalizado },
]

const PanelActivities: React.FC<PanelActivitiesProps> = ({
  loadActiviesService,
  changeActivityStatusService,
  validationService,
}) => {
  const { activityState } = useActivity()

  const formRef = React.useRef<FormHandles | null>(null)

  const [filter, setFilter] = React.useState<FilterData>(initFilterParams)
  const [paginationActivities, setPaginationActivities] = React.useState({
    page: 0,
    size: 0,
    total: 0,
    data: [],
  } as PaginationModel<LoadActivitiesModel.Response>)

  const activities = React.useMemo<LoadActivitiesModel.Response[]>(
    () => paginationActivities?.data || [],
    [paginationActivities],
  )

  const handleError = React.useCallback((error: Error) => {
    if (error instanceof FormValidationError) {
      formRef.current?.setErrors(error.errors)
      return
    }
    if (error instanceof ApiError && !!error.errors) {
      formRef.current?.setErrors(error.errors)
      return
    }
    alert(error.message)
  }, [])

  const search = React.useCallback(
    (params: FilterData) => {
      const { date, status, cpf, page } = params

      const payload: LoadActivitiesModel.Request = {
        date: parseToDate(date),
        page,
        status,
        cpf,
      }

      loadActiviesService
        .load(payload)
        .then(response => setPaginationActivities(response))
        .catch(handleError)
    },
    [handleError, loadActiviesService],
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

  const handleSubmit = React.useCallback(
    (formData: FormData) => {
      formRef.current?.setErrors({})

      const { expire_date, cpf, status } = formData

      const param_date =
        !!expire_date && expire_date.length > 0 ? expire_date : ''
      const param_cpf = !!cpf && cpf.length >= 0 ? cpf : ''
      const param_status = status || 0

      const formDataFormatted: FormData = {
        expire_date: param_date,
        cpf: param_cpf,
        status: param_status,
      }

      validationService
        .validate(formDataFormatted)
        .then((data: FormData) => {
          const { expire_date, cpf, status } = data

          setFilter(state => ({
            ...state,
            page: 1,
            date: expire_date ?? state.date,
            cpf: cpf ?? state.cpf,
            status: status ?? state.status,
          }))
        })
        .catch(handleError)
    },
    [handleError, validationService],
  )

  const handleChangeActivityStatus = React.useCallback(
    (event: React.ChangeEvent<HTMLSelectElement>, activityId: string) => {
      changeActivityStatus(activityId, +event.target.value)
    },
    [changeActivityStatus],
  )

  const handlePagination = React.useCallback((page: number) => {
    setFilter(state => ({ ...state, page }))
  }, [])

  React.useEffect(() => {
    if (filter) {
      search(filter)
    }
  }, [activityState.data, filter, search])

  React.useEffect(() => {
    if (!!activityState.data) {
      search(filter)
    }
  }, [activityState.data, filter, search])

  return (
    <Container>
      <FilterBar>
        <Form ref={formRef} onSubmit={handleSubmit} initialData={initFormData}>
          <Input name="cpf" placeholder="CPF do Paciente" />
          <Select
            name="status"
            options={filterStatusOptions}
            defaultValue={filter.status}
          />
          <InputDate name="expire_date" placeholder="Data" />
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
          {activities.length === 0 ? (
            <tr>
              <td className="table-empty" colSpan={5}>
                Não há atividades
              </td>
            </tr>
          ) : (
            activities.map(activity => (
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
            ))
          )}
        </tbody>
      </TableActivities>
      <Pagination
        page={paginationActivities.page}
        total={paginationActivities.total}
        onClick={handlePagination}
      />
    </Container>
  )
}

export default PanelActivities
