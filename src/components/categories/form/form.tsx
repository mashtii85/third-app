/**
 * Components - Taxonomy - Form
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
import { CustomFieldForm } from './customFieldForm'
// Types
import { TaxonomyFormProps } from './type.d'
import { Taxonomy } from '../../../types/taxonomy.d'

export const TaxonomyForm = ({
  defaultValues,
  onSuccess,
  isShowQuestionForm
}: TaxonomyFormProps) => {
  const { control, errors, handleSubmit, register, setValue, watch } = useForm({
    defaultValues,
    resolver: yupResolver(schema)
  })
  const { parent_id: parentId, type: currentType } = defaultValues
  const watchLabel = watch('custom_fields.label') as string
  const { createTaxonomy } = useCreateTaxonomy({
    parentId,
    isParent: !!parentId,
    category: currentType,
    onCompleted: onSuccess,
    onError: console.error
  })

  const [updateTaxonomy] = useMutation(UPDATE_TAXONOMY, {
    onCompleted: onSuccess
  })

  const submit = async ({ id, ...form }: Taxonomy) => {
    // todo: hello, clientId is hard coded
    return id
      ? await updateTaxonomy({ variables: { taxonomyId: id, changes: form } })
      : await createTaxonomy({
        variables: {
          objects: [{ ...form, client_id: 2 }]
        }
      })
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
