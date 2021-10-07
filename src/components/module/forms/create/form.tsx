/**
 * Components - Module - Forms - Create
 */

// React Hook Form
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

// // Hooks
import { useCreateModule } from '../../hooks/useCreate/useCreate'
import { useUpdateModule } from '../../hooks/useUpdate/useUpdate'

// // UI
import { SelectField, Form, FormField, FormLabel, TextareaField } from '@drykiss/industry-ui'
import { ModuleSchema as schema } from './schema'

// Types
import { ModuleFormType } from './types.d'
import { statusActive } from '../../../../constants/status'

export const ModuleForm = ({
  defaultValues,
  onSuccess
}: {
  defaultValues: ModuleFormType
  onSuccess: () => void
}) => {
  const { control, errors, handleSubmit, register } = useForm<ModuleFormType>({
    defaultValues,
    resolver: yupResolver(schema)
  })

  const { createModule } = useCreateModule(defaultValues.courseId, {
    onCompleted: onSuccess,
    onError: (error) => {
      console.error(error)
    }
  })

  const { updateModule } = useUpdateModule({
    onCompleted: onSuccess,
    onError: (error) => {
      console.error(error)
    }
  })

  const defaultOptions = { control, errors, register }

  const onSubmit = async (form: ModuleFormType) => {
    const obj = {
      course_id: defaultValues.courseId,
      description: form.description ?? null,
      status: form.status,
      title: form.title,
      ordering: form.ordering ?? null
    }
    if (defaultValues.id) {
      await updateModule({ variables: { id: defaultValues.id, changes: obj } })
    } else {
      await createModule({ variables: { objects: [obj] } })
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
      <FormLabel label="Status">
        <SelectField {...defaultOptions} name="status" options={statusActive} />
      </FormLabel>
    </Form>
  )
}
