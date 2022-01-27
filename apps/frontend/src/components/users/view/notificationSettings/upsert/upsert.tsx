/**
 * Components - Users - View - Upsert - Upsert
 */

// React Hook Form
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { NotificationSettingsSchema as schema } from './schema'

// UI
import { Checkbox, Form } from '@drykiss/industry-ui'

// Types
import { ApolloError } from '@apollo/client'
import {
  NotificationSettingsProps,
  NotificationSettingsType,
  UserMeta
} from '@availabletowork/types'

// Hooks
import { useUpdateUser } from '../../../hooks'

export const UpsertNotificationSettingsForm = ({
  userMeta,
  userId,
  onSuccess
}: NotificationSettingsProps) => {
  const defaultValues = userMeta?.notifications ?? {}
  const {
    formState: { errors = {} },
    handleSubmit,
    register
  } = useForm<any>({
    defaultValues,
    resolver: yupResolver(schema)
  })

  const defaultOptions = {
    errors: errors,
    register: register
  }

  const onError = (error: ApolloError) => {
    console.error(error?.message || error)
  }

  const { updateUser } = useUpdateUser({
    onCompleted: onSuccess,
    onError
  })

  const onSubmit = (notifications: NotificationSettingsType) => {
    const meta: UserMeta = { ...userMeta, notifications }
    updateUser({
      variables: { userId, changes: { meta } }
    })
  }

  return (
    <Form id="offCanvasForm" handleSubmit={handleSubmit(onSubmit)}>
      <>
        <Checkbox {...defaultOptions} name="alert" label="Alert" value={true} />

        <Checkbox {...defaultOptions} name="email" label="Email" value={true} />

        <Checkbox {...defaultOptions} name="push" label="Push" value={true} />

        <Checkbox {...defaultOptions} name="sms" label="SMS" value={true} />
      </>
    </Form>
  )
}
