/**
 * Components - Accounts - Form
 */

// React Hook Form
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { AccountSchema as schema } from './schema'

// UI
import { Checkbox, Form, Input, Error, Label, Select } from '@drykiss/industry-ui'
import { statusActive } from '../../../../constants/status'

// Hooks
import { useCreateAccount, useUpdateAccount } from '../../hooks'

// Types
import {
  AccountFormProps,
  ClientModuleProps,
  CLIENT_MODULE_TYPE,
  CreateAccountForm
} from './types.d'
import { TAXONOMY_TYPE } from '../../../../types/taxonomy.d'

// Helpers
import { prepareCreateAccount, prepareUpdateAccount } from './helpers'

import { CustomFieldElement } from '../../../taxonomies/customField/customFieldElement'
import { ACCOUNT_TYPE } from '../../../../types/account.d'
import { CheckboxDataType } from '../../../lessons/view/components/assignment/forms/upsert/types'
import { CustomSelect } from '../../../selects/select'
import { ENTITIES } from '../../../../constants/entities'

export const UpsertAccount = ({ defaultValues, filters, onSuccess }: AccountFormProps) => {
  const hasUser = !!defaultValues?.userId
  const {
    control,
    formState: { errors = {} },
    handleSubmit,
    register,
    setError,
    watch
  } = useForm<CreateAccountForm>({
    defaultValues,
    resolver: yupResolver(schema(hasUser))
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

  const submit = (form: CreateAccountForm) => {
    const features: ClientModuleProps = { locations: false, events: false, learning: false }
    Object.keys(CLIENT_MODULE_TYPE).forEach((key) => {
      const keyname = key.toLocaleLowerCase()
      features[keyname as keyof ClientModuleProps] =
        form?.clientModules?.length > 0 ? form.clientModules.indexOf(keyname) >= 0 : false
    })

    if (defaultValues?.id) {
      form.meta = { ...defaultValues.meta, features }

      const variables = prepareUpdateAccount({
        form,
        accountId: defaultValues.id,
        hasUser
      })
      updateAccount({ variables })
    } else {
      form.meta = features
      const object = prepareCreateAccount(form, filters?.userType, filters?.userId)

      createAccount({ variables: { object } })
    }
  }

  const defaultOptions = {
    control,
    errors,
    register,
    showError: true
  }

  const taxonomyType =
    filters?.accountType === ACCOUNT_TYPE.Admin ? TAXONOMY_TYPE.Client : TAXONOMY_TYPE.Member
  const showTaxonomy =
    filters?.accountType === ACCOUNT_TYPE.Admin || filters?.accountType === ACCOUNT_TYPE.Client
  const showClientModules = filters?.accountType === ACCOUNT_TYPE.Admin

  // Watchers
  const taxonomyWatch = watch('taxonomy')
  const addContactUserWatch = watch('add_contact_user')

  const clientModules = (): CheckboxDataType[] => {
    const result = Object.keys(CLIENT_MODULE_TYPE).map((key) => ({
      label: key,
      value: CLIENT_MODULE_TYPE[key as keyof typeof CLIENT_MODULE_TYPE]
    }))
    return result
  }

  return (
    <Form id="offCanvasForm" handleSubmit={handleSubmit(submit)}>
      <Label label="Name">
        <Input {...defaultOptions} errors={errors} name="name" />
      </Label>

      {showTaxonomy && (
        <>
          <CustomSelect
            {...defaultOptions}
            label="Type"
            name="taxonomy"
            entity={ENTITIES.Taxonomy}
            taxonomyType={taxonomyType}
          />
          {taxonomyWatch?.value && (
            <CustomFieldElement
              {...defaultValues}
              {...defaultOptions}
              taxonomyWatch={taxonomyWatch}
            />
          )}
        </>
      )}

      {showClientModules && (
        <Label label="Client modules">
          {clientModules().map(({ label, value }, index) => {
            return (
              <Checkbox
                key={label + index}
                label={label}
                name={'clientModules'}
                value={value}
                {...defaultOptions}
              />
            )
          })}
        </Label>
      )}

      <Label label="Status">
        <Select {...defaultOptions} name="status" options={statusActive} />
        {errors.status && errors.status.type === 'required' && (
          <Error message={errors?.status?.message} />
        )}
      </Label>
      {/* create an account is only available for the first time or
      as long as there is no user in account */}
      {!defaultValues?.userId && (
        <>
          <Checkbox
            {...defaultOptions}
            name="add_contact_user"
            label="Add contact user"
            value={!defaultValues?.userId}
          />

          {addContactUserWatch && (
            <>
              <Label label="First name">
                <Input {...defaultOptions} name="firstName" />
              </Label>

              <Label label="Last name">
                <Input {...defaultOptions} name="lastName" />
              </Label>

              <Label label="Phone">
                <Input {...defaultOptions} name={'phone'} />
                {/* {errors.phone && <Error message={errors.phone.message} />} */}
              </Label>

              <Label label="Email">
                <Input type="email" {...defaultOptions} name="email" />
                {/* {errors.email && <Error message={errors.email.message} />} */}
              </Label>

              <Label label="Initial password">
                <Input
                  {...defaultOptions}
                  helperMessage="The user will be asked to change it after first login"
                  name="password"
                />
                {/* {errors?.password?.message && <Error message={errors.password.message} />} */}
              </Label>
            </>
          )}
        </>
      )}
    </Form>
  )
}
