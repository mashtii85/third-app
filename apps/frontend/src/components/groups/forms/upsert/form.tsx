/**
 * Components - Groups - Forms - Upsert
 */

// React Hook Form
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

// Hooks
import { useCreateGroup } from '../../hooks/useCreate/useCreate'
import { useUpdateGroup } from '../../hooks/useUpdate/useUpdate'

// UI
import { Select, Form, Input, Label, Textarea } from '@drykiss/industry-ui'
import { GroupSchema as schema } from './schema'

//Constants
import { statusActive } from '@availabletowork/constants'

// Types
import { GroupFormType } from '@availabletowork/types'

export const GroupForm = ({
  defaultValues,
  onSuccess
}: {
  defaultValues: GroupFormType
  onSuccess: () => void
}) => {
  const {
    control,
    formState: { errors = {} },
    handleSubmit,
    register
  } = useForm<GroupFormType>({
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

  const defaultOptions = { control, errors, register, showError: true }

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
      <Label label="Name">
        <Input {...defaultOptions} name="name" />
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
