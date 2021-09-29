/**
 * Components - Taxonomy - Form
 */

import { useCurrentUser } from '../../../utils/useCurrentUser'

// Apollo
import { useMutation } from '@apollo/client'
import { UPDATE_TAXONOMY } from '../queries'

// React Hook Form
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { useCreateTaxonomy } from '../hooks/useCreate'

// UI
import { Form, FormField, FormError, FormLabel, SelectField } from '@drykiss/industry-ui'
import { statusActive } from '../../../constants/status'
import { TaxonomySchema as schema } from './schema'
import { CustomFieldForm } from './customFieldForm'

// Types
import { TaxonomyFormProps } from './type.d'
import { Taxonomy } from '../../../types/taxonomy.d'
import { UseCreateTaxonomyProps } from '../hooks/types.d'

export const TaxonomyForm = ({
  defaultValues,
  onSuccess,
  isShowQuestionForm
}: TaxonomyFormProps) => {
  const { user } = useCurrentUser()
  const { control, errors, handleSubmit, register, setValue, watch } = useForm({
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
    onCompleted: onSuccess,
    onError: (error) => console.error(error.message)
  }

  const watchLabel = watch('custom_fields.label') as string
  const { createTaxonomy } = useCreateTaxonomy(createTaxonomyProps)

  const [updateTaxonomy] = useMutation(UPDATE_TAXONOMY, {
    onCompleted: onSuccess
  })

  const submit = async ({ id, ...form }: Taxonomy) => {
    const formData = { ...form }
    const obj: Taxonomy = {
      custom_fields: formData.custom_fields,
      name: formData.name,
      type: formData.type,
      status: formData.status
    }
    if (formData.parent_id !== undefined) obj.parent_id = defaultValues.parent_id
    if (id) {
      return await updateTaxonomy({ variables: { taxonomyId: id, changes: obj } })
    } else {
      obj.entity = defaultValues.entity
      obj.entity_id = defaultValues.entity_id
      obj.client_id = user.client_id
      return await createTaxonomy({ variables: { objects: [obj] } })
    }
  }

  const defaultOptions = {
    control,
    errors: errors,
    register: register
  }
  const onChangeLabel = () => {
    const makeName: any = (watchLabel || '').toLowerCase().split(' ').join('-')
    setValue('name', makeName)
  }

  return (
    <Form id="offCanvasForm" handleSubmit={handleSubmit(submit)}>
      {isShowQuestionForm && (
        <FormLabel label="Label">
          <FormField {...defaultOptions} name="custom_fields.label" onChange={onChangeLabel} />
        </FormLabel>
      )}

      <FormLabel label="Name">
        <FormField {...defaultOptions} name="name" />
        {errors.name && errors.name.type === 'required' && (
          <FormError message={errors?.name?.message} />
        )}
      </FormLabel>

      {isShowQuestionForm && <CustomFieldForm defaultOptions={defaultOptions} />}

      <FormLabel label="Status">
        <SelectField {...defaultOptions} name="status" options={statusActive} />
        {errors.status && errors.status.type === 'required' && (
          <FormError message={errors?.status?.message} />
        )}
      </FormLabel>

      <FormField {...defaultOptions} name="id" type="hidden" />
      <FormField {...defaultOptions} name="type" type="hidden" />
      {isShowQuestionForm && <FormField {...defaultOptions} name="parent_id" type="hidden" />}
    </Form>
  )
}
