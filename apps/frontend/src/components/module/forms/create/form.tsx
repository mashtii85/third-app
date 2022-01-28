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
import { Select, Form, Input, Label, Textarea } from '@drykiss/industry-ui'
import { ModuleSchema as schema } from './schema'

// Constants
import { statusActive } from '@availabletowork/constants'

// Types
import { ModuleFormType } from '@availabletowork/types'

export const ModuleForm = ({
  defaultValues,
  onSuccess
}: {
  defaultValues: ModuleFormType
  onSuccess: () => void
}) => {
  const {
    control,
    formState: { errors = {} },
    handleSubmit,
    register
  } = useForm<ModuleFormType>({
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

  const defaultOptions = { control, errors, register, showError: true }

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
      <Label label="Title">
        <Input {...defaultOptions} name="title" />
      </Label>
      <Label label="Description">
        <Textarea {...defaultOptions} name="description" rows={3} />
      </Label>
      <Label label="Status">
        <Select {...defaultOptions} name="status" options={statusActive} />
      </Label>
    </Form>
  )
}
