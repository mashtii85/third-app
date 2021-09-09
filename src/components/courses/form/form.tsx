/**
 * Components - Courses - Form - Form
 */

// React
import { useContext } from 'react'

// React Hook Form
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

// UI
import {
  FormField,
  Form,
  FormLabel,
  SelectField,
  TextareaField,
  UserContext
} from '@drykiss/industry-ui'

import { courseSchema as schema } from './schema'

// Constants
import { statusActive } from '../../../constants/status'

// Types
import { CourseFormType } from './types.d'

import { useCreateCourse } from '../hooks'

export const CourseForm = ({ onSuccess, filters }: { onSuccess: () => void; filters: any }) => {
  const { user } = useContext(UserContext)
  const defaultValues = {}

  const { control, errors, handleSubmit, register } = useForm<CourseFormType>({
    defaultValues: defaultValues,
    resolver: yupResolver(schema)
  })

  const { createCourse } = useCreateCourse({
    clientId: user.id,
    filters,
    onCompleted: (data) => {
      console.log(data)
      onSuccess()
    }
  })

  const defaultOptions = {
    control: control,
    errors: errors,
    register: register
  }

  const onSubmit = async (form: CourseFormType) => {
    await createCourse({
      variables: { clientId: user.id, accountId: user.id, ...form }
    })

    console.log(form)
  }

  return (
    <Form id="offCanvasForm" handleSubmit={handleSubmit(onSubmit)}>
      <FormLabel label="Title">
        <FormField {...defaultOptions} name="title" />
      </FormLabel>
      <FormLabel label="Status">
        <SelectField {...defaultOptions} name="status" options={statusActive} />
      </FormLabel>
      <FormLabel label="Description">
        <TextareaField {...defaultOptions} name="description" rows={3} />
      </FormLabel>
    </Form>
  )
}
