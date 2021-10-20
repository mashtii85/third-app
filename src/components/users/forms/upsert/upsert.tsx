/**
 * Components - Users - Forms - Upsert - UpsertUser
 */

// React Hook Form
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

// UI
import {
  Column,
  FormField,
  Form,
  FormLabel,
  FormError,
  Row,
  SelectField
} from '@drykiss/industry-ui'
import { usersSchema as schema } from './schema'
import { statusActive } from '../../../../constants/status'
import { UserForm, UserFormProps } from './types.d'
import { useCreateUser, useUpdateUser } from '../../hooks'
import { UserRow } from '../../../accounts/lists/accountUsers/table/types'
import { CreateUserModel } from '../../hooks/useCreate/types'

export const UpsertUserForm = ({ defaultValues = {}, filters, onSuccess }: UserFormProps) => {
  const { errors, handleSubmit, register } = useForm<UserForm>({
    defaultValues,
    resolver: yupResolver(schema)
  })

  const defaultOptions = {
    errors: errors,
    register: register
  }
  const { createUser } = useCreateUser({
    filters,
    onCompleted: onSuccess,
    onError: (error) => {
      console.error(error)
    }
  })

  const { updateUser } = useUpdateUser({
    onCompleted: onSuccess,
    onError: (error) => {
      console.log(error.message)
    }
  })

  const onSubmit = (values: UserRow) => {
    if (defaultValues?.id) {
      updateUser({ variables: { userId: defaultValues.id, changes: values } })
    } else {
      const object: CreateUserModel = {
        accounts: { data: { account_id: filters?.accountId!, status: values.status } },
        ...values,
        is_verified: false
      }
      createUser({ variables: { object } })
    }
  }

  return (
    <Form id="offCanvasForm" handleSubmit={handleSubmit(onSubmit)}>
      <>
        <Row>
          <Column md={6}>
            <FormLabel label="First name">
              <FormField {...defaultOptions} name={'name_first'} />
              {errors.name_first && errors.name_first.type === 'required' && (
                <FormError message={errors?.name_first?.message} />
              )}
            </FormLabel>
          </Column>
          <Column md={6}>
            <FormLabel label="Last name">
              <FormField {...defaultOptions} name={'name_last'} />
              {errors.name_last && errors.name_last.type === 'required' && (
                <FormError message={errors?.name_last?.message} />
              )}
            </FormLabel>
          </Column>
          <Column md={6}>
            <FormLabel label="Email">
              <FormField {...defaultOptions} name={'email'} type="email" />
              {errors.email && errors.email.type === 'duplicate' && (
                <FormError message={errors.email.message} />
              )}
            </FormLabel>
          </Column>
          <Column md={6}>
            <FormLabel label="Phone">
              <FormField {...defaultOptions} name={'custom_fields.phone'} />
              {errors.custom_fields && <FormError message={errors?.custom_fields.phone?.message} />}
            </FormLabel>
          </Column>
        </Row>

        <FormLabel label="Status">
          <SelectField {...defaultOptions} name={'status'} options={statusActive} />
          {errors.status && errors.status.type === 'required' && (
            <FormError message={errors?.status?.message || ''} />
          )}
        </FormLabel>
        {!defaultValues?.id && (
          <FormLabel label="Password">
            <FormField {...defaultOptions} name="password" />
            {errors?.password?.message && <FormError message={errors.password.message} />}
          </FormLabel>
        )}
      </>
    </Form>
  )
}
