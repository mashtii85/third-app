/**
 * Components - Accounts - Form
 */

// React Hook Form
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { AccountSchema as schema } from './schema'

// UI
import { Checkbox, Form, FormField, FormError, FormLabel, SelectField } from '@drykiss/industry-ui'
import { statusActive } from '../../../../constants/status'

// Hooks
import { useCreateAccount, useUpdateAccount } from '../../hooks'
// import { useTaxonomies } from '../../../taxonomies/hooks'
import { TaxonomySelect } from '../../../taxonomies/select/select'

// Types
import { AccountFormProps, CreateAccountForm } from './types.d'
import { Options, TAXONOMY_TYPE } from '../../../../types/taxonomy.d'

// Helpers
import { prepareCreateAccount, prepareUpdateAccount } from './helpers'

import { CustomFieldElement } from '../../../taxonomies/customField/customFieldElement'
import { ACCOUNT_TYPE } from '../../../../types/account.d'

export const UpsertAccount = ({ defaultValues, filters, onSuccess }: AccountFormProps) => {
  const { control, errors, handleSubmit, register, watch } = useForm<any>({
    defaultValues,
    resolver: yupResolver(schema)
  })
  const { createAccount } = useCreateAccount({
    filters,
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

  const submit = async (form: CreateAccountForm) => {
    const userId = defaultValues?.userId || 0

    if (defaultValues?.id) {
      const variables = prepareUpdateAccount({
        form,
        userId,
        accountId: defaultValues.id
      })
      updateAccount({
        variables
      })
    } else {
      const object = prepareCreateAccount(form, filters?.userType, filters?.userId)
      createAccount({ variables: { object } })
    }
  }

  const defaultOptions = {
    control,
    errors,
    register
  }

  const taxonomyType =
    filters?.accountType === ACCOUNT_TYPE.Admin ? TAXONOMY_TYPE.CLIENT : TAXONOMY_TYPE.MEMBER
  const showTaxonomy =
    filters?.accountType === ACCOUNT_TYPE.Admin || filters?.accountType === ACCOUNT_TYPE.Client
  // Watchers
  const taxonomyWatch: Options = watch('taxonomy')
  const addContactUserWatch = watch('add_contact_user')

  return (
    <Form id="offCanvasForm" handleSubmit={handleSubmit(submit)}>
      {showTaxonomy && (
        <>
          <div>{filters?.accountType}</div>
          <TaxonomySelect {...defaultOptions} label="Type" name="taxonomy" type={taxonomyType} />
          {taxonomyWatch?.value && (
            <CustomFieldElement
              {...defaultValues}
              {...defaultOptions}
              type={taxonomyType}
              taxonomyWatch={taxonomyWatch}
            />
          )}
        </>
      )}
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
      <Checkbox
        {...defaultOptions}
        name="add_contact_user"
        data={[{ label: 'Add contact user', value: true }]}
      />
      {addContactUserWatch && (
        <>
          <FormLabel label="First Name">
            <FormField {...defaultOptions} name="firstName" />
          </FormLabel>
          <FormLabel label="Last Name">
            <FormField {...defaultOptions} name="lastName" />
          </FormLabel>
          <FormLabel label="Email">
            <FormField type="email" {...defaultOptions} name="email" />
          </FormLabel>
        </>
      )}
    </Form>
  )
}
