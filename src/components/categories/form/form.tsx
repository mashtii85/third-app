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
import { TaxonomySchema as schema } from './schema'

// Types
import { TaxonomyFormProps } from './type.d'
import { Taxonomy } from '../../../types/taxonomy.d'
// TODO: find a ways to
export const TaxonomyForm = ({ defaultValues, onSuccess, type }: TaxonomyFormProps) => {
  const { control, errors, handleSubmit, register } = useForm({
    defaultValues,
    resolver: yupResolver(schema)
  })

  const { createTaxonomy } = useCreateTaxonomy({
    category: defaultValues.type,
    onCompleted: onSuccess,
    onError: console.error
  })

  const [updateTaxonomy] = useMutation(UPDATE_TAXONOMY, {
    onCompleted: () => {
      onSuccess()
    }
  })

  const submit = async ({ id, ...form }: Taxonomy) => {
    return id
      ? await updateTaxonomy({ variables: { taxonomyId: id, changes: form } })
      : await createTaxonomy({ variables: { objects: [{ ...form, client_id: 2 }] } })
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
      {type === 'custom-field' && [
        // TODO: Input and Required and Label type is incorrect please review it later
        <FormLabel label="Input">
          <SelectField {...defaultOptions} name="input" options={statusActive} />
        </FormLabel>,
        <FormLabel label="Required">
          <SelectField {...defaultOptions} name="required" options={statusActive} />
        </FormLabel>,
        <FormLabel label="Label">
          <SelectField {...defaultOptions} name="label" options={statusActive} />
        </FormLabel>
      ]}
      <FormField {...defaultOptions} name="id" type="hidden" />
      <FormField {...defaultOptions} name="type" type="hidden" />
    </Form>
  )
}
