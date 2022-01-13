/**
 * Components - Lessons - Form - Add
 */

// React Hook Form
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

// UI
import { Form, Input, Textarea } from '@drykiss/industry-ui'
import { AddButton } from '../../../common/buttons/addButton'
import { lessonSchema as schema } from './schema'

// Types
import { LessonFormType } from './types.d'
import { useUpdateLesson } from '../../hooks/useUpdate/useUpdate'

export const LessonContentEdit = ({
  onSuccess,
  defaultValues
}: {
  onSuccess: () => void
  defaultValues: LessonFormType
}) => {
  const {
    control,
    formState: { errors = {} },
    handleSubmit,
    register
  } = useForm<LessonFormType>({
    defaultValues: defaultValues,
    resolver: yupResolver(schema)
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

  const onSubmit = (form: LessonFormType) => {
    updateLesson({ variables: { id: defaultValues.id, changes: form } })
  }

  return (
    <Form id="contentEditForm" handleSubmit={onSubmit}>
      <Input {...defaultOptions} name="id" type="hidden" />
      <Input {...defaultOptions} name="type" type="hidden" />
      <Textarea {...defaultOptions} name="content" rows={20} />
      <AddButton content="Submit" type="submit" handleClick={handleSubmit(onSubmit)} />
    </Form>
  )
}
