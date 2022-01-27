/**
 * Components - Taxonomy - Forms - Upsert - UpsertForm
 */

import { useCurrentUser } from '../../../../utils/useCurrentUser'

// Apollo
import { useMutation } from '@apollo/client'
import { UPDATE_TAXONOMY } from '../../queries'

// React Hook Form
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

import { useCreateTaxonomy } from '../../hooks'

// UI
import { Form, Input, Label, Select } from '@drykiss/industry-ui'
import { TaxonomySchema as schema } from './schema'
import { CustomFieldForm } from '../customFieldForm/customFieldForm'

// Constants
import { statusActive } from '@availabletowork/types'

// Types
import { Taxonomy, TaxonomyFormProps, UseCreateTaxonomyProps } from '@availabletowork/types'

export const TaxonomyUpsert = ({
  defaultValues,
  onSuccess,
  isShowQuestionForm
}: TaxonomyFormProps) => {
  const { user } = useCurrentUser()
  const {
    control,
    formState: { errors = {} },
    handleSubmit,
    register,
    setValue,
    watch
  } = useForm({
    defaultValues,
    resolver: yupResolver(schema)
  })

  const createTaxonomyProps: UseCreateTaxonomyProps = {
    category: defaultValues.type,
    entity: defaultValues.entity,
    entityId: defaultValues.entity_id,
    parentId: defaultValues.parent_id,
    isParent: !!defaultValues.parent_id,
    taxonomyId: defaultValues.id,
    clientId: user.id,
    onCompleted: onSuccess,
    onError: (error) => console.error(error.message)
  }

  const watchLabel = watch('custom_fields.label') as string

  const { createTaxonomy } = useCreateTaxonomy(createTaxonomyProps)

  const [updateTaxonomy] = useMutation(UPDATE_TAXONOMY, {
    onCompleted: onSuccess
  })

  const submit = ({ id, ...form }: Taxonomy) => {
    const formData = { ...form }
    const options = (formData?.custom_fields?.options || []).map((i) => ({
      value: i.value,
      label: i.label
    }))

    const obj: Taxonomy = {
      custom_fields: { ...formData.custom_fields, options },
      name: formData.name,
      type: formData.type,
      status: formData.status,
      client_id: user.client_id,
      entity: formData.entity
      // entity_id: formData.entityOption.value
    }

    if (formData.parent_id !== undefined) obj.parent_id = defaultValues.parent_id
    if (id) {
      const variables = { taxonomyId: id, changes: obj }

      return updateTaxonomy({ variables })
    } else {
      if (defaultValues.entity) obj.entity = defaultValues.entity
      if (defaultValues.entity_id) obj.entity_id = defaultValues.entity_id
      return createTaxonomy({ variables: { objects: [obj] } })
    }
  }

  const defaultOptions = {
    control,
    errors,
    register,
    showError: true
  }

  setValue('name', (watchLabel || '').toLowerCase().split(' ').join('-'))
  return (
    <Form id="offCanvasForm" handleSubmit={handleSubmit(submit)}>
      {isShowQuestionForm && (
        <Label label="Label">
          <Input {...defaultOptions} name="custom_fields.label" />
        </Label>
      )}

      <Label label="Name">
        <Input {...defaultOptions} name="name" />
      </Label>

      {isShowQuestionForm && <CustomFieldForm defaultOptions={defaultOptions} />}

      <Label label="Status">
        <Select {...defaultOptions} name="status" options={statusActive} />
      </Label>

      <Input {...defaultOptions} name="id" type="hidden" />
      <Input {...defaultOptions} name="type" type="hidden" />
      {isShowQuestionForm && <Input {...defaultOptions} name="parent_id" type="hidden" />}
    </Form>
  )
}
