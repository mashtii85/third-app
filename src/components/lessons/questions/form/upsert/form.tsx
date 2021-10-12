/**
 * Components - Lessons - Questions - Forms - Upsert
 */

// Apollo
import { useMutation } from '@apollo/client'
import { UPDATE_TAXONOMY } from '../../../../taxonomies/queries'

// React Hook Form
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { useCreateTaxonomy } from '../../../../taxonomies/hooks'
import { useCurrentUser } from '../../../../../utils/useCurrentUser'

// UI
import { Form, FormField, FormError, FormLabel, SelectField } from '@drykiss/industry-ui'
import { statusActive } from '../../../../../constants/status'
import { TaxonomySchema as schema } from './schema'

// Forms
import { AnswerForm } from '../answers/form'

// Types
import { TaxonomyFormProps } from './type'
import { Taxonomy } from '../../../../../types/taxonomy'
import { UseCreateTaxonomyProps } from '../../../../taxonomies/hooks/useCreate/types'

export const LessonQuestionForm = ({ defaultValues, onSuccess }: TaxonomyFormProps) => {
  const { user } = useCurrentUser()

  const { control, errors, handleSubmit, register } = useForm({
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
    onError: console.error
  }
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

  return (
    <Form id="offCanvasForm" handleSubmit={handleSubmit(submit)}>
      <FormField {...defaultOptions} name="id" type="hidden" />
      <FormField {...defaultOptions} name="type" type="hidden" />

      <FormLabel label="Question">
        <FormField {...defaultOptions} name="name" />
        {errors.name && errors.name.type === 'required' && (
          <FormError message={errors?.name?.message} />
        )}
      </FormLabel>

      <AnswerForm defaultOptions={defaultOptions} />

      <FormLabel label="Status">
        <SelectField {...defaultOptions} name="status" options={statusActive} />
        {errors.status && errors.status.type === 'required' && (
          <FormError message={errors?.status?.message} />
        )}
      </FormLabel>
    </Form>
  )
}
