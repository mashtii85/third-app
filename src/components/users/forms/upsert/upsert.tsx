/**
 * Components - Users - Forms - Upsert - UpsertUser
 */

// Next
import { useRouter } from 'next/router'

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
import { hashPassword } from '../../../../services/auth/helpers'
import { User, UserMeta } from '../../../../types/user'
import { locales } from '../../../../types/locales.d'

export const UpsertUserForm = ({ defaultValues = {}, filters, onSuccess }: UserFormProps) => {
  const { errors, handleSubmit, register, setError } = useForm<UserForm>({
    defaultValues,
    resolver: yupResolver(schema(!defaultValues?.id!!))
  })

  const defaultOptions = {
    errors: errors,
    register: register
  }

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
    console.error(error?.message || error)
  }

  const onCompleted = ({ user }: { user: User }): void => {
    const locale = user?.meta?.locale
    if (router.locales !== locale) router.push(router.pathname, router.pathname, { locale })
    onSuccess()
  }

  const router = useRouter()

  const { createUser } = useCreateUser({ onCompleted, onError })

  const { updateUser } = useUpdateUser({
    onCompleted,
    onError
  })

  const onSubmit = (values: UserRow) => {
    if (defaultValues?.id) {
      const userMeta: Partial<UserMeta> = { ...defaultValues?.meta, locale: values?.meta?.locale }

      updateUser({
        variables: { userId: defaultValues.id, changes: { ...values, meta: userMeta } }
      })
    } else {
      const userMeta: Partial<UserMeta> = { ...defaultValues?.meta, locale: values?.meta?.locale }
      const { password, ...userObject } = values
      const object: CreateUserModel = {
        accounts: { data: { account_id: filters?.accountId!, status: values.status } },
        ...userObject,
        meta: userMeta,
        password: hashPassword(password),
        email_verified: false
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
              {errors.email && <FormError message={errors.email.message} />}
            </FormLabel>
          </Column>
          <Column md={6}>
            <FormLabel label="Phone">
              <FormField {...defaultOptions} name={'phone'} />
              {errors.phone && <FormError message={errors.phone.message} />}
            </FormLabel>
          </Column>
        </Row>

        <FormLabel label="Status">
          <SelectField {...defaultOptions} name={'status'} options={statusActive} />
          {errors.status && errors.status.type === 'required' && (
            <FormError message={errors?.status?.message || ''} />
          )}
        </FormLabel>

        <FormLabel label="Language">
          <SelectField {...defaultOptions} name={'meta.locale'} options={locales} />
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
