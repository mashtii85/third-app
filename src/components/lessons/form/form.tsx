/**
 * Components - Lessons - Form - Form
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

import { lessonSchema as schema } from './schema'

// Constants
import { statusActive } from '../../../constants/status'

// Types
import { LessonFormType } from './types.d'
import { LESSON_TYPE, LESSON_STATUS } from '../../../types/lesson.d'
import { useCreateLesson } from '../hooks/useCreate'
import { LooseObject } from '../../../types/object'

export const LessonForm = ({
  courseId,
  moduleId,
  onSuccess,
  filters
}: {
  courseId?: number
  moduleId?: number
  onSuccess: () => void
  filters: LooseObject
}) => {
  const { user } = useContext(UserContext)
  const defaultValues = {}

  const { control, errors, handleSubmit, register } = useForm<LessonFormType>({
    defaultValues: defaultValues,
    resolver: yupResolver(schema)
  })

  const { createLesson } = useCreateLesson({
    clientId: user.client_id,
    courseId: courseId,
    moduleId: moduleId,
    title: 'title',
    description: 'description',
    type: LESSON_TYPE.Text,
    content: 'content',
    status: LESSON_STATUS.Active,
    ordering: 0,
    filters,
    onCompleted: onSuccess,
    onError: (error) => {
      console.error(error)
    }
  })

  const defaultOptions = {
    control: control,
    errors: errors,
    register: register
  }

  const onSubmit = async (form: LessonFormType) => {
    await createLesson({
      variables: { moduleId: user.client_id, accountId: user.account_id, ...form }
    })

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
      <FormLabel label="Type">
        <SelectField {...defaultOptions} name="type" options={LESSON_TYPE} />
      </FormLabel>
      <FormLabel label="Contetn">
        <TextareaField {...defaultOptions} name="content" rows={10} />
      </FormLabel>
      <FormLabel label="Status">
        <SelectField {...defaultOptions} name="status" options={statusActive} />
      </FormLabel>
      <FormLabel label="Ordering">
        <SelectField {...defaultOptions} name="ordering" />
      </FormLabel>
    </Form>
  )
}
