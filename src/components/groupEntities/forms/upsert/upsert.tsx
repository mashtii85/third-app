/**
 * Components - GroupEntities - Forms - Upsert - Upsert
 */

// React Hook Form
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

// // Hooks
import { useCreateGroupEntity } from '../../hooks'

// // UI
import { SelectField, Form, FormError, FormLabel } from '@drykiss/industry-ui'
import { GroupSchema as schema } from './schema'

// Types
import { GroupEntityFormType } from './types'
import { statusActive } from '../../../../constants/status'
import { GroupEntityFilter } from '../../hooks/useGroupEntities/types'
import { GroupSelect } from '../../../selects/group/group'

export const UpsertGroupEntity = ({
  onSuccess,
  filters
}: {
  onSuccess: () => void
  filters: Partial<GroupEntityFilter>
}) => {
  const { control, errors, handleSubmit, register } = useForm<any>({
    resolver: yupResolver(schema)
  })

  const { createGroupEntity } = useCreateGroupEntity({
    filters,
    onCompleted: onSuccess,
    onError: (error) => {
      console.error(error)
    }
  })

  const defaultOptions = { control, errors, register }

  const onSubmit = (form: GroupEntityFormType) => {
    const objects = {
      entity: filters.entity,
      entity_id: filters.entityId,
      status: form.status,
      group_id: Number(form.group.value)
    }
    createGroupEntity({
      variables: {
        objects
      }
    })
  }

  return (
    <Form id="offCanvasForm" handleSubmit={handleSubmit(onSubmit)}>
      <GroupSelect {...defaultOptions} label="Groups" name="group" filters={filters} />
      {errors?.group && <FormError message={<FormError message="Group is required" />} />}
      <FormLabel label="Status">
        <SelectField {...defaultOptions} name="status" options={statusActive} />
      </FormLabel>
      {/* {errors &&
        Object.entries(errors).map((item) => {
          return <FormError message={item[1].message} />
        })} */}
    </Form>
  )
}
