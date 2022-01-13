/**
 * Components - Users - Forms - Upsert - UpsertUser
 */

// Next
import { useRouter } from 'next/router'

// React Hook Form
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

// UI
import { Column, Form, Error, Input, Label, Row, Select } from '@drykiss/industry-ui'
import { usersSchema as schema } from './schema'
import { statusActive } from '../../../../constants/status'
import { UserForm, UserFormProps } from './types.d'
import { useCreateUser, useUpdateUser } from '../../hooks'
import { UserRow } from '../../../accounts/lists/accountUsers/table/types'
import { CreateUserModel } from '../../hooks/useCreate/types'
import { hashPassword } from '../../../../services/auth/helpers'
import { User, UserMeta } from '../../../../types/user'
import { locales } from '../../../../types/locales'

export const UpsertUserForm = ({ defaultValues = {}, filters, onSuccess }: UserFormProps) => {
  const {
    control,
    formState: { errors = {} },
    handleSubmit,
    register,
    setError
  } = useForm<UserForm>({
    defaultValues,
    resolver: yupResolver(schema(!defaultValues?.id ?? false))
  })

  const defaultOptions = {
    control,
    errors: errors,
    register: register,
    showError: true
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

    if (router.locale !== locale) router.push(router.pathname, router.pathname, { locale })
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
      const { name_first, name_last, phone, status, meta } = values
      const userMeta: Partial<UserMeta> = { ...defaultValues?.meta, locale: meta?.locale }

      const variables = {
        userId: defaultValues.id,
        changes: {
          name_first,
          name_last,
          phone,
          status,
          meta: userMeta
        }
      }

      updateUser({
        variables
      })
    } else {
      const userMeta: Partial<UserMeta> = { ...defaultValues?.meta, locale: values?.meta?.locale }
      const { password, ...userObject } = values
      const object: CreateUserModel = {
        accounts: {
          data: { account_id: filters?.accountId && filters.accountId, status: values.status }
        },
        ...userObject,
        meta: userMeta,
        password: hashPassword(password),
        email_verified: false
      }

      createUser({ variables: { object } })
    }
  }
  console.log(errors?.meta?.locale)

  return (
    <Form id="offCanvasForm" handleSubmit={handleSubmit(onSubmit)}>
      <>
        <Row>
          <Column md={6}>
            <Label label="First name">
              <Input {...defaultOptions} errors={{}} name={'name_first'} />
            </Label>
          </Column>
          <Column md={6}>
            <Label label="Last name">
              <Input {...defaultOptions} errors={{}} name={'name_last'} />
            </Label>
          </Column>
          <Column md={6}>
            <Label label="Email">
              <Input {...defaultOptions} errors={errors} name={'email'} type="email" />
            </Label>
          </Column>
          <Column md={6}>
            <Label label="Phone">
              <Input {...defaultOptions} errors={errors} name={'phone'} />
            </Label>
          </Column>
        </Row>

        <Label label="Status">
          <Select {...defaultOptions} name={'status'} options={statusActive} />
          {errors.status && errors.status.type === 'required' && (
            <Error message={errors?.status?.message || ''} />
          )}
        </Label>

        <Label label="Language">
          <Select {...defaultOptions} name={'meta.locale'} options={locales} />
          <Error message={errors?.meta?.locale?.message ?? ''} />
        </Label>

        {!defaultValues?.id && (
          <Label label="Password">
            <Input {...defaultOptions} name="password" errors={errors} />
          </Label>
        )}
      </>
    </Form>
  )
}
