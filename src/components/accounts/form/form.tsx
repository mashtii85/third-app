/**
 * Components - Accounts - Form
 */

// React Hook Form
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { AccountSchema } from './schema'
// UI
import {
  Form,
  FormField,
  FormError,
  FormLabel,
  SelectField,
  RadioField
} from '@drykiss/industry-ui'
import { AddButton } from '../../common/buttons/addButton'
import { statusActive } from '../../../constants/status'
// hooks
import { useCreateAccount } from '../hooks/useCreate'
// Types
import { AccountFormProps } from './types.d'
import { Account } from '../../../types/account'

export const AccountForm = ({ defaultValues, onSuccess }: AccountFormProps) => {
  const { control, errors, handleSubmit, register } = useForm({
    defaultValues: {
      ...defaultValues
    },
    resolver: yupResolver(AccountSchema())
  })

  const { createAccount } = useCreateAccount({
    onCompleted: onSuccess,
    onError: console.error
  })

  const submit = async (form: Account) => {
    const variables = {
      objects: [
        {
          ...form,
          account_clients: { data: { client_id: defaultValues.clientId, status: form.status } }
        }
      ]
    }
    await createAccount({
      variables
    })
  }
  const defaultOptions = {
    control,
    errors: errors,
    register: register
  }

  return (
    <Form handleSubmit={handleSubmit(submit)}>
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
      <FormLabel label="Structure">
        <RadioField
          {...defaultOptions}
          data={[
            {
              id: 'Personal',
              label: 'Personal',
              value: 'Personal'
            },
            {
              id: 'Business',
              label: 'Business',
              value: 'Business'
            }
          ]}
          name="structure"
          stacked
        />
      </FormLabel>
      <FormField {...defaultOptions} name="type" type="hidden" />
      <AddButton content="Submit" type="submit" handleClick={console.log}>
        <div></div>
      </AddButton>
    </Form>
  )
}
