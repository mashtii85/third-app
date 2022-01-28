/**
 * Components - GroupEntities - Forms - Upsert - Upsert
 */

// React Hook Form
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

// Hooks
import { useCreateGroupEntity } from '../../hooks'

// UI
import { Select, Form, Error, Label } from '@drykiss/industry-ui'
import { GroupSchema as schema } from './schema'
import { GroupSelect } from '../../../selects/group/group'

//Constants
import { statusActive } from '@availabletowork/constants'

// Types
import { GroupEntityFilter, GroupEntityFormType } from '@availabletowork/types'

export const UpsertGroupEntity = ({
  onSuccess,
  filters
}: {
  onSuccess: () => void
  filters: Partial<GroupEntityFilter>
}) => {
  const {
    control,
    formState: { errors = {} },
    handleSubmit,
    register
  } = useForm<any>({
    resolver: yupResolver(schema)
  })

  const { createGroupEntity } = useCreateGroupEntity({
    filters,
    onCompleted: onSuccess,
    onError: (error) => {
      console.error(error)
    }
  })

  const defaultOptions = { control, errors, register, showError: true }

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
      {errors?.group && <Error message={<Error message="Group is required" />} />}
      <Label label="Status">
        <Select {...defaultOptions} name="status" options={statusActive} />
      </Label>
      {/* {errors &&
        Object.entries(errors).map((item) => {
          return <Error message={item[1].message} />
        })} */}
    </Form>
  )
}
