/**
 * Components - Compliance - Form
 */

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
import { TaxonomySchema } from './schema'

// Types
import { TaxonomyFormProps } from './type'
import { Taxonomy } from '../../../types/taxonomy'

export const TaxonomyForm = ({ defaultValues, onSuccess }: TaxonomyFormProps) => {
  const { control, errors, handleSubmit, register } = useForm({
    defaultValues: {
      ...defaultValues
    },
    resolver: yupResolver(TaxonomySchema())
  })

  const { createTaxonomy } = useCreateTaxonomy({
    category: 'course-categories',
    onCompleted: onSuccess,
    onError: console.log
  })

  const [updateTaxonomy] = useMutation(UPDATE_TAXONOMY, {
    onCompleted: () => {
      onSuccess()
    }
  })

  const submit = async ({ id, ...form }: Taxonomy) => {
    return id
      ? await updateTaxonomy({ variables: { taxonomyId: id, changes: form } })
      : await createTaxonomy({ variables: { objects: [form] } })
  }

  const defaultOptions = {
    control,
    errors: errors,
    register: register
  }

  return (
    <Form id="offCanvasForm" handleSubmit={handleSubmit(submit)}>
      <FormLabel label="Name">
        <FormField {...defaultOptions} name="name" />
        {errors.name && errors.name.type === 'required' && (
          <FormError message={errors?.name?.message} />
        )}
      </FormLabel>
      <FormLabel label="Status">
        <SelectField {...defaultOptions} name="status" options={statusActive} />
        {errors.status && errors.status.type === 'required' && (
          <FormError message={errors?.status?.message} />
        )}
      </FormLabel>
      <FormField {...defaultOptions} name="id" type="hidden" />
      <FormField {...defaultOptions} name="type" type="hidden" />
      <FormField {...defaultOptions} name="client_id" type="hidden" />
      <FormField {...defaultOptions} name="entity_id" type="hidden" />
    </Form>
  )
}
