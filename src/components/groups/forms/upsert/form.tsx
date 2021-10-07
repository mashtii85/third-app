/**
 * Components - Groups - Forms - Upsert
 */

// React Hook Form
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

// // Hooks
import { useCreateGroup } from '../../hooks/useCreate/useCreate'
import { useUpdateGroup } from '../../hooks/useUpdate/useUpdate'

// // UI
import { SelectField, Form, FormField, FormLabel, TextareaField } from '@drykiss/industry-ui'
import { GroupSchema as schema } from './schema'

// Types
import { GroupFormType } from './types.d'
import { statusActive } from '../../../../constants/status'

export const GroupForm = ({
  defaultValues,
  onSuccess
}: {
  defaultValues: GroupFormType
  onSuccess: () => void
}) => {
  const { control, errors, handleSubmit, register } = useForm<GroupFormType>({
    defaultValues,
    resolver: yupResolver(schema)
  })

  const { createGroup } = useCreateGroup(defaultValues.accountId as number, {
    onCompleted: onSuccess,
    onError: (error) => {
      console.error(error)
    }
  })

  const { updateGroup } = useUpdateGroup({
    onCompleted: onSuccess,
    onError: (error) => {
      console.error(error)
    }
  })

  const defaultOptions = { control, errors, register }

  const onSubmit = async (form: GroupFormType) => {
    const obj = {
      account_id: defaultValues.accountId,
      name: form.name,
      description: form.description ?? null,
      status: form.status
    }
    if (defaultValues.id) {
      await updateGroup({ variables: { id: defaultValues.id, changes: obj } })
    } else {
      await createGroup({ variables: { objects: [obj] } })
    }
  }

  return (
    <Form id="offCanvasForm" handleSubmit={handleSubmit(onSubmit)}>
      <FormLabel label="Name">
        <FormField {...defaultOptions} name="name" />
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
