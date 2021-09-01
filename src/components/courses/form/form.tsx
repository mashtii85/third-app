/**
 * Components - Courses - Form - Form
 */

// React Hook Form
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

// UI
import { FormField, Form, FormLabel, TextareaField } from '@drykiss/industry-ui'

import { courseSchema as schema } from './schema'

// Types
import type { Course } from '../../../types/course.d'

export const CourseForm = () => {
  const defaultValues = {}

  const { control, errors, handleSubmit, register } = useForm({
    defaultValues: defaultValues,
    resolver: yupResolver(schema)
  })

  const defaultOptions = {
    control: control,
    errors: errors,
    register: register
  }

  const onSubmit = (form: Course) => {
    console.log(form)
  }

  return (
    <Form id="offCanvasForm" handleSubmit={handleSubmit(onSubmit)}>
      <FormLabel label="Title">
        <FormField {...defaultOptions} name="title" />
      </FormLabel>
      <FormLabel label="Description">
        <TextareaField {...defaultOptions} name="description" rows={3} />
      </FormLabel>
    </Form>
  )
}
