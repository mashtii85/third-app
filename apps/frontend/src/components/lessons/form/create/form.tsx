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
import { Input, Form, Label, Select, Textarea } from '@drykiss/industry-ui'

import { lessonSchema as schema } from './schema'

// Types
import {
  LessonFormType,
  LESSON_TYPE_DROPDOWN,
  LESSON_STATUS_DROPDOWN,
  LessonUpsertFormFilterType
} from '@availabletowork/types'

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

  const {
    control,
    formState: { errors = {} },
    handleSubmit,
    register
  } = useForm<LessonFormType>({
    defaultValues,
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
    register: register,
    showError: true
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
      <Label label="Title">
        <Input {...defaultOptions} name="title" />
      </Label>
      <Label label="Description">
        <Textarea {...defaultOptions} name="description" rows={3} />
      </Label>
      <Label label="Type">
        <Select {...defaultOptions} name="type" options={lessonType} />
      </Label>
      <Label label="Status">
        <Select {...defaultOptions} name="status" options={lessonStatus} />
      </Label>
    </Form>
  )
}
