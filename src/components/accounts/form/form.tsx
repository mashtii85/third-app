/**
 * Components - Accounts - Form
 */

// React Hook Form
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { AccountSchema as schema } from './schema'

// UI
import {
  Column,
  Form,
  FormField,
  FormError,
  FormLabel,
  SelectField,
  Row
} from '@drykiss/industry-ui'
import { statusActive } from '../../../constants/status'
import { TaxonomySelect } from './select'

// Hooks
import { useCreateAccount, useUpdateAccount } from '../hooks'
import { useCurrentUser } from '../../../utils/useCurrentUser'

// Types
import { AccountFormProps, CreateAccountForm } from './types.d'

// Helpers
import { prepareCreateAccount, prepareUpdateAccount } from './helpers'
import { ACCOUNT_TYPE } from '../../../types/account.d'

export const AccountForm = ({ defaultValues, filters, onSuccess }: AccountFormProps) => {
  const { control, errors, handleSubmit, register } = useForm<any>({
    defaultValues,
    resolver: yupResolver(schema)
  })

  const { user } = useCurrentUser()

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
      const object = prepareCreateAccount(form, filters?.type)

      createAccount({ variables: { object } })
    }
  }

  const defaultOptions = {
    control,
    errors,
    register
  }

  const isClientMember = user.account_type === ACCOUNT_TYPE.Client
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

      {/* <FormField {...defaultOptions} name="type" type="hidden" /> */}
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
      {isClientMember && (
        <>
          <div>Member</div>
          <Row>
            <Column md={6}>
              <TaxonomySelect
                {...defaultOptions}
                label="Member Type"
                name="taxonomy"
                type="members"
              />
            </Column>
          </Row>
        </>
      )}
    </Form>
  )
}
