import { ApiError } from '@/domain/errors'
import { CreatePatients } from '@/domain/usecases'
import { Button, Input, InputCpf } from '@/presentation/components'
import { usePatient } from '@/presentation/hooks'
import { FormValidationError } from '@/validation/errors'
import { Validation } from '@/validation/protocols'
import { FormHandles } from '@unform/core'
import { Form } from '@unform/web'
import React from 'react'
import { Container } from './panel-create-patients.styles'

type FormData = {
  name: string
  cpf: string
}

type PanelCreatePatientsProps = {
  createPatientsService: CreatePatients
  validationService: Validation
}

const PanelCreatePatients: React.FC<PanelCreatePatientsProps> = ({
  createPatientsService,
  validationService,
}) => {
  const { create, patientState } = usePatient()

  const formRef = React.useRef<FormHandles | null>(null)

  const isDisabled = React.useMemo<boolean>(() => patientState.loading, [
    patientState.loading,
  ])

  const handleError = React.useCallback(
    (error: Error) => {
      if (error instanceof FormValidationError) {
        formRef.current?.setErrors(error.errors)
        return
      }
      create.error()
      if (error instanceof ApiError) {
        formRef.current?.setErrors(error.errors)
        return
      }
      alert(error.message)
    },
    [create],
  )

  const register = React.useCallback(
    (data: FormData) => {
      create.exec()
      createPatientsService.create(data).then(create.success).catch(handleError)
    },
    [create, createPatientsService, handleError],
  )

  const handleSubmit = React.useCallback(
    (data: FormData) => {
      formRef.current?.setErrors({})
      validationService.validate(data).then(register).catch(handleError)
    },
    [handleError, register, validationService],
  )

  React.useEffect(() => {
    if (!!patientState.data) {
      create.reset()
    }
  }, [patientState.data, create])

  return (
    <Container>
      <fieldset className="form-fieldset">
        <legend>Novo Paciente</legend>
        <Form ref={formRef} onSubmit={handleSubmit}>
          <div className="form-fieldset--inputs">
            <Input label="Nome" name="name" disabled={isDisabled} />
            <InputCpf label="CPF" name="cpf" disabled={isDisabled} />
          </div>
          <div className="form-fieldset--controls">
            <Button
              type="submit"
              title="Cadastrar paciente"
              disabled={isDisabled}
            >
              Cadastrar paciente
            </Button>
          </div>
        </Form>
      </fieldset>
    </Container>
  )
}

export default PanelCreatePatients
