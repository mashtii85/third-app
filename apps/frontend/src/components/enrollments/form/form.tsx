/**
 * Components - Enrollments - Form - Form
 */

// React Hook Form
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

// UI
import { Input, Form, Label, Select, Textarea } from '@drykiss/industry-ui'

import { courseSchema as schema } from './schema'

// Constants
import { statusActive } from '@availabletowork/types'

// Types
import { EnrollmentFormType, LooseObject } from '@availabletowork/types'

// Hooks
import { useCreateEnrollment } from '../hooks'
import { useCurrentUser } from '../../../utils/useCurrentUser'

export const CourseForm = ({
  onSuccess,
  filters
}: {
  onSuccess: () => void
  filters: LooseObject
}) => {
  const { user } = useCurrentUser()
  const defaultValues = {}

  const {
    control,
    formState: { errors = {} },
    handleSubmit,
    register
  } = useForm<EnrollmentFormType>({
    defaultValues: defaultValues,
    resolver: yupResolver(schema)
  })

  const { createEnrollment } = useCreateEnrollment({
    userId: user.id,
    filters,
    onCompleted: onSuccess,
    onError: (error) => {
      console.error(error)
    }
  })

  const defaultOptions = {
    control: control,
    errors: errors,
    register: register,
    showError: true
  }

  const onSubmit = async (form: EnrollmentFormType) => {
    await createEnrollment({
      variables: { clientId: user.client_id, accountId: user.account_id, ...form }
    })
  }

  return (
    <Form id="offCanvasForm" handleSubmit={handleSubmit(onSubmit)}>
      <Label label="Title">
        <Input {...defaultOptions} name="title" />
      </Label>
      <Label label="Status">
        <Select {...defaultOptions} name="status" options={statusActive} />
      </Label>
      <Label label="Description">
        <Textarea {...defaultOptions} name="description" rows={3} />
      </Label>
    </Form>
  )
}
