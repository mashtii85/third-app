/**
 * Components - Courses - Form - Add - Form
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
import { statusActive } from '../../../../constants/status'

// Types
import { CourseFormType } from './types.d'

// Hooks
import { useCreateCourse, useUpdateCourse } from '../../hooks'
import { CourseFilter } from '../../hooks/types'
import { LooseObject } from '../../../../types/object'

export const CourseForm = ({
  onSuccess,
  defaultValues = {},
  filters
}: {
  onSuccess: () => void
  filters: CourseFilter
  defaultValues?: CourseFormType | LooseObject
}) => {
  const { user } = useContext(UserContext)

  const { control, errors, handleSubmit, register } = useForm<CourseFormType>({
    defaultValues,
    resolver: yupResolver(schema)
  })

  const { createCourse } = useCreateCourse({
    clientId: user.client_id,
    filters,
    onCompleted: onSuccess,
    onError: (error) => {
      console.error(error)
    }
  })

  const { updateCourse } = useUpdateCourse({
    onCompleted: onSuccess,
    onError: (error) => {
      console.error(error)
    }
  })

  const defaultOptions = {
    control,
    errors,
    register
  }

  const onSubmit = async (form: CourseFormType) => {
    if (defaultValues?.id) {
      updateCourse({ variables: { courseId: defaultValues.id, set: form } })
    } else {
      await createCourse({
        variables: { clientId: user.client_id, accountId: user.account_id, ...form }
      })
    }
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
