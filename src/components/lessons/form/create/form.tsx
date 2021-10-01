/**
 * Components - Lessons - Form - Add
 */

// React Hook Form
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

// UI
import { FormField, Form, FormLabel, SelectField, TextareaField } from '@drykiss/industry-ui'

import { lessonSchema as schema } from './schema'

// Constants
import { lessonType, lessonStatus, LessonFormType } from './types.d'

// Types
import { useCreateLesson } from '../../hooks/useCreate/useCreate'
import { useUpdateLesson } from '../../hooks/useUpdate/useUpdate'
import { LooseObject } from '../../../../types/object'

export const LessonForm = ({
  filters,
  onSuccess,
  defaultValues = {}
}: {
  filters: LooseObject
  onSuccess: () => void
  defaultValues: LessonFormType | LooseObject
}) => {
  const { control, errors, handleSubmit, register } = useForm<LessonFormType>({
    defaultValues: defaultValues,
    resolver: yupResolver(schema)
  })

  const { createLesson } = useCreateLesson(filters.moduleId, {
    onCompleted: onSuccess,
    onError: (error) => {
      console.error(error)
    }
  })

  const { updateLesson } = useUpdateLesson({
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
    if (defaultValues?.id) {
      updateLesson({ variables: { id: defaultValues.id, changes: form } })
    } else {
      await createLesson({
        variables: {
          courseId: filters.courseId,
          moduleId: filters.moduleId,
          title: form.title,
          description: form.description ?? '',
          type: form.type,
          content: form.content,
          status: form.status
        }
      })
    }
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
        <SelectField {...defaultOptions} name="type" options={lessonType} />
      </FormLabel>
      <FormLabel label="Content">
        <TextareaField {...defaultOptions} name="content" rows={10} />
      </FormLabel>
      <FormLabel label="Status">
        <SelectField {...defaultOptions} name="status" options={lessonStatus} />
      </FormLabel>
    </Form>
  )
}
