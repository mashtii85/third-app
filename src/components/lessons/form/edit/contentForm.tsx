/**
 * Components - Lessons - Form - Add
 */

// React Hook Form
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

// UI
import { Form, FormField, TextareaField } from '@drykiss/industry-ui'
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
  const { control, errors, handleSubmit, register } = useForm<LessonFormType>({
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
    register: register
  }

  const onSubmit = async (form: LessonFormType) => {
    await updateLesson({ variables: { id: defaultValues.id, changes: form } })
  }

  return (
    <Form id="contentEditForm">
      <FormField {...defaultOptions} name="id" type="hidden" />
      <FormField {...defaultOptions} name="type" type="hidden" />
      <TextareaField {...defaultOptions} name="content" rows={7} />
      <AddButton content="Submit" type="submit" handleClick={handleSubmit(onSubmit)} />
    </Form>
  )
}
