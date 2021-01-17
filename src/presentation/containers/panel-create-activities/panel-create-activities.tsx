import { ApiError } from '@/domain/errors'
import { ActivityStatus, SearchPatientsModel } from '@/domain/models'
import { CreateActivities, SearchPatients } from '@/domain/usecases'
import {
  Button,
  Input,
  InputAutocomplete,
  InputDate,
  Select,
} from '@/presentation/components'
import { useActivity } from '@/presentation/hooks'
import { parseToDate } from '@/presentation/utils'
import { FormValidationError } from '@/validation/errors'
import { Validation } from '@/validation/protocols'
import { FormHandles } from '@unform/core'
import { Form } from '@unform/web'
import React from 'react'
import { Container } from './panel-create-activities.styles'

const statusOptions = [
  { label: 'Aberto', value: ActivityStatus.aberto },
  { label: 'Atrasado', value: ActivityStatus.atrasado },
  { label: 'Finalizado', value: ActivityStatus.finalizado },
]

type FormData = {
  patient_name: string
  expire_date: string
  status: number
  name: string
}

type RegisterData = {
  patient_id: string
  expire_date: string
  status: number
  name: string
}

type PanelCreateActivitiesProps = {
  createActivitiesService: CreateActivities
  searchPatientsService: SearchPatients
  validationService: Validation
}

const PanelCreateActivities: React.FC<PanelCreateActivitiesProps> = ({
  createActivitiesService,
  searchPatientsService,
  validationService,
}) => {
  const { create, activityState } = useActivity()
  const [patients, setPatients] = React.useState<SearchPatients.Response>([])
  const [
    selectedPatient,
    setSelectedPatient,
  ] = React.useState<SearchPatientsModel.Response>()

  const formRef = React.useRef<FormHandles | null>(null)

  const patientsOptions = React.useMemo(
    () => patients.map(p => ({ id: p.id, label: p.name })),
    [patients],
  )
  const isDisabled = React.useMemo<boolean>(() => activityState.loading, [
    activityState.loading,
  ])

  const handleError = React.useCallback(
    (error: Error) => {
      if (error instanceof FormValidationError) {
        formRef.current?.setErrors(error.errors)
        return
      }
      create.error()
      if (error instanceof ApiError && !!error.errors) {
        formRef.current?.setErrors(error.errors)
        return
      }
      alert(error.message)
    },
    [create],
  )

  const searchPatients = React.useCallback(
    (term: string) => {
      searchPatientsService
        .search({ term })
        .then(setPatients)
        .catch(handleError)
    },
    [handleError, searchPatientsService],
  )

  const handleSelectPatient = React.useCallback(
    (id: string) => {
      const patient = patients.find(p => p.id === id)
      setSelectedPatient(patient)
      setPatients([])
    },
    [patients],
  )

  const register = React.useCallback(
    (data: RegisterData) => {
      const { patient_id, expire_date, status, name } = data

      const payload = {
        patient_id,
        expire_date: parseToDate(expire_date).toISOString(),
        status,
        name,
      }

      create.exec()
      createActivitiesService
        .create(payload)
        .then(create.success)
        .catch(handleError)
    },
    [create, createActivitiesService, handleError],
  )

  const handleSubmit = React.useCallback(
    (data: FormData) => {
      formRef.current?.setErrors({})

      const { expire_date, status, name } = data
      const payload: RegisterData = {
        patient_id: selectedPatient?.id ?? '',
        expire_date,
        status: status ? +status : -1,
        name,
      }

      validationService.validate(payload).then(register).catch(handleError)
    },
    [handleError, register, selectedPatient?.id, validationService],
  )

  React.useEffect(() => {
    if (!!activityState.data) {
      create.reset()
    }
  }, [activityState.data, create])

  return (
    <Container>
      <fieldset className="form-fieldset">
        <legend>Nova Atividade</legend>
        <Form ref={formRef} onSubmit={handleSubmit}>
          <div className="form-fieldset--inputs">
            <InputAutocomplete
              label="Nome do Paciente"
              name="patient_id"
              options={patientsOptions}
              onAutoCompleteSearch={searchPatients}
              onAutoCompleteSelect={handleSelectPatient}
              disabled={isDisabled}
            />
            <InputDate
              label="Data de expiração"
              name="expire_date"
              disabled={isDisabled}
            />
            <Select
              label="Status"
              name="status"
              disabled={isDisabled}
              options={statusOptions}
            />
            <Input
              label="Nome da Atividade"
              name="name"
              disabled={isDisabled}
            />
          </div>
          <div className="form-fieldset--controls">
            <Button
              type="submit"
              title="Cadastrar atividasde"
              disabled={isDisabled}
            >
              Cadastrar atividade
            </Button>
          </div>
        </Form>
      </fieldset>
    </Container>
  )
}

export default PanelCreateActivities
