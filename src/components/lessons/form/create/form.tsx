/**
 * Components - Lessons - Form - Add
 */

// React Hook Form
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

// Hooks
import { useCreateLesson } from '../../hooks/useCreate/useCreate'
import { useUpdateLesson } from '../../hooks/useUpdate/useUpdate'

// UI
import { FormField, Form, FormLabel, SelectField, TextareaField } from '@drykiss/industry-ui'

import { lessonSchema as schema } from './schema'

// Types
import {
  LessonFormType,
  LESSON_TYPE_DROPDOWN,
  LESSON_STATUS_DROPDOWN,
  LessonUpsertFormFilterType
} from './types.d'

export const LessonForm = ({
  filters,
  onSuccess,
  defaultValues
}: {
  filters: Partial<LessonUpsertFormFilterType>
  onSuccess: (data: any) => void
  defaultValues: Partial<LessonFormType>
}) => {
  const lessonType: LESSON_TYPE_DROPDOWN[] = [
    { text: 'Text', value: 'text' },
    { text: 'Video', value: 'video' },
    { text: 'Quiz', value: 'quiz' },
    { text: 'Assignment', value: 'assignment' },
    { text: 'Pdf', value: 'pdf' },
    { text: 'PowerPoint', value: 'powerpoint' }
  ]

  const lessonStatus: LESSON_STATUS_DROPDOWN[] = [
    { text: 'Active', value: 'active' },
    { text: 'Inactive', value: 'inactive' }
  ]

  const { control, errors, handleSubmit, register } = useForm<LessonFormType>({
    defaultValues,
    resolver: yupResolver(schema)
  })

  const { createLesson } = useCreateLesson(filters.moduleId!, {
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
      await updateLesson({ variables: { id: defaultValues.id, changes: form } })
    } else {
      const obj = {
        course_id: filters.courseId,
        module_id: filters.moduleId,
        title: form.title,
        description: form.description ?? '',
        type: form.type,
        ordering: defaultValues.ordering,
        status: form.status
      }
      await createLesson({
        variables: { objects: [obj] }
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
      <FormLabel label="Status">
        <SelectField {...defaultOptions} name="status" options={lessonStatus} />
      </FormLabel>
    </Form>
  )
}
