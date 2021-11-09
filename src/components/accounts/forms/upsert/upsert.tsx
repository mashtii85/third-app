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
import { TaxonomySelect } from '../../../taxonomies/select/select'

// Types
import { AccountFormProps, CreateAccountForm } from './types.d'
import { TAXONOMY_TYPE } from '../../../../types/taxonomy.d'

// Helpers
import { prepareCreateAccount, prepareUpdateAccount } from './helpers'

import { CustomFieldElement } from '../../../taxonomies/customField/customFieldElement'
import { ACCOUNT_TYPE } from '../../../../types/account.d'
import { Options } from '../../../../types/options'

export const UpsertAccount = ({ defaultValues, filters, onSuccess }: AccountFormProps) => {
  const { control, errors, handleSubmit, register, setError, watch } = useForm<any>({
    defaultValues,
    resolver: yupResolver(schema)
  })

  const onError = (error: any) => {
    if (
      error.message.includes(
        'Uniqueness violation. duplicate key value violates unique constraint "user_email_key"'
      )
    ) {
      setError('email', {
        type: 'duplicate',
        message: 'Email is already exist, try another one!'
      })
    }
    console.error(error?.message | error)
  }

  const { createAccount } = useCreateAccount({
    filters,
    onCompleted: onSuccess,
    onError
  })

  const { updateAccount } = useUpdateAccount({
    onCompleted: onSuccess,
    onError
  })

  const submit = async (form: CreateAccountForm) => {
    if (defaultValues?.id) {
      const variables = prepareUpdateAccount({
        form,
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
    filters?.accountType === ACCOUNT_TYPE.Admin ? TAXONOMY_TYPE.Client : TAXONOMY_TYPE.Member
  const showTaxonomy =
    filters?.accountType === ACCOUNT_TYPE.Admin || filters?.accountType === ACCOUNT_TYPE.Client

  // Watchers
  const taxonomyWatch: Options = watch('taxonomy')
  const addContactUserWatch = watch('add_contact_user')

  return (
    <Form id="offCanvasForm" handleSubmit={handleSubmit(submit)}>
      <FormLabel label="Name">
        <FormField {...defaultOptions} name="name" />
        {errors.name && errors.name.type === 'required' && (
          <FormError message={errors?.name?.message} />
        )}
      </FormLabel>

      {showTaxonomy && (
        <>
          <TaxonomySelect {...defaultOptions} label="Type" name="taxonomy" type={taxonomyType} />
          {taxonomyWatch?.value && (
            <CustomFieldElement
              {...defaultValues}
              {...defaultOptions}
              taxonomyWatch={taxonomyWatch}
            />
          )}
        </>
      )}

      <FormLabel label="Status">
        <SelectField {...defaultOptions} name="status" options={statusActive} />
        {errors.status && errors.status.type === 'required' && (
          <FormError message={errors?.status?.message} />
        )}
      </FormLabel>
      {/* create an account is only available for the first time or
      as long as there is no user in account */}
      {!defaultValues?.userId && (
        <>
          <Checkbox
            {...defaultOptions}
            name="add_contact_user"
            data={[{ label: 'Add contact user', value: true }]}
          />

          {addContactUserWatch && (
            <>
              <FormLabel label="First name">
                <FormField {...defaultOptions} name="firstName" />
              </FormLabel>

              <FormLabel label="Last name">
                <FormField {...defaultOptions} name="lastName" />
              </FormLabel>

              <FormLabel label="Phone">
                <FormField {...defaultOptions} name={'phone'} />
                {errors.phone && <FormError message={errors.phone.message} />}
              </FormLabel>

              <FormLabel label="Email">
                <FormField type="email" {...defaultOptions} name="email" />
                {errors.email && <FormError message={errors.email.message} />}
              </FormLabel>

              <FormLabel label="Initial password">
                <FormField
                  {...defaultOptions}
                  helperMessage="The user will be asked to change it after first login"
                  name="password"
                />
                {errors?.password?.message && <FormError message={errors.password.message} />}
              </FormLabel>
            </>
          )}
        </>
      )}
    </Form>
  )
}
