/**
 * Components - Accounts - Form
 */

// React Hook Form
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { AccountSchema as schema } from './schema'

// UI
import { Form, FormField, FormError, FormLabel, SelectField } from '@drykiss/industry-ui'
import { statusActive } from '../../../constants/status'
import { TaxonomySelect } from '../../taxonomies/select/select'

// Hooks
import { useCreateAccount, useUpdateAccount } from '../hooks'
import { useTaxonomies } from '../../taxonomies/hooks'

// Types
import { AccountFormProps, CreateAccountForm } from './types.d'
import { Options, TAXONOMY_TYPE } from '../../../types/taxonomy.d'

// Helpers
import { prepareCreateAccount, prepareUpdateAccount } from './helpers'

import { CustomFieldElement } from '../../taxonomies/customField/customFieldElement'

export const AccountForm = ({ defaultValues, isAdmin, filters, onSuccess }: AccountFormProps) => {
  const { control, errors, handleSubmit, register, watch } = useForm<any>({
    defaultValues,
    resolver: yupResolver(schema)
  })
  const isClientMember = isAdmin ? TAXONOMY_TYPE.CLIENT : TAXONOMY_TYPE.MEMBER

  const { taxonomies } = useTaxonomies({
    category: isClientMember
  })
  console.log('defaultValues', defaultValues)
  const { createAccount } = useCreateAccount({
    filters: { ...filters, clientId: defaultValues?.client_id, type: defaultValues?.type },
    onCompleted: onSuccess,
    onError: (error) => {
      console.error(error.message)
    }
  })

  const { updateAccount } = useUpdateAccount({
    onCompleted: onSuccess,
    onError: (error) => {
      console.error(error.message)
    }
  })

  const submit = (form: CreateAccountForm) => {
    if (defaultValues?.id) {
      const variables = prepareUpdateAccount({
        form,
        userId: defaultValues.userId,
        accountId: defaultValues.id
      })
      updateAccount({
        variables
      })
    } else {
      const object = prepareCreateAccount(form)
      createAccount({ variables: { object } })
    }
  }

  const defaultOptions = {
    control,
    errors,
    register
  }

  // Watchers
  const taxonomyWatch: Options = watch('taxonomy')

  const isClientCreateMember = taxonomies.length > 0
  const isClientUser = isClientMember && isClientCreateMember

  const taxonomySelectTitle = isAdmin ? 'Client' : 'Member'

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

      <div>User</div>
      <FormLabel label="First Name">
        <FormField {...defaultOptions} name="firstName" />
      </FormLabel>
      <FormLabel label="Last Name">
        <FormField {...defaultOptions} name="lastName" />
      </FormLabel>
      <FormLabel label="Email">
        <FormField type="email" {...defaultOptions} name="email" />
      </FormLabel>
      {(isClientUser || isAdmin) && (
        <>
          <div>{taxonomySelectTitle}</div>
          <TaxonomySelect
            {...defaultOptions}
            label={`${taxonomySelectTitle} Type`}
            name="taxonomy"
            type={isClientMember}
          />
          {taxonomyWatch?.value && (
            <CustomFieldElement
              {...defaultValues}
              {...defaultOptions}
              type={isClientMember}
              taxonomyWatch={taxonomyWatch}
            />
          )}
        </>
      )}
      <FormField {...defaultOptions} name="client_id" type="hidden" />
      <FormField {...defaultOptions} name="type" type="hidden" />
    </Form>
  )
}
