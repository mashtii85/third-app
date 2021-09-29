/**
 * Components - Locations - Forms - Upsert - Upsert
 */

// React Hook Form
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

// UI
import { FormField, Form, FormLabel, SelectField } from '@drykiss/industry-ui'

import { LocationSchema as schema } from './schema'

// Constants
import { statusActive } from '../../../../constants/status'

// Types
import { LocationFormType, LocationFormProps } from './types'

// Hooks
import { useCreateLocation, useUpdateLocation } from '../../hooks'
import { useCurrentUser } from '../../../../utils/useCurrentUser'

export const UpsertLocation = ({ onSuccess, defaultValues = {}, filters }: LocationFormProps) => {
  const { user } = useCurrentUser()
  const { control, errors, handleSubmit, register } = useForm<LocationFormType>({
    defaultValues,
    resolver: yupResolver(schema)
  })

  const { createLocation } = useCreateLocation({
    accountId: user.account_id,
    filters,
    onCompleted: onSuccess,
    onError: (error) => {
      console.error(error)
    }
  })

  const { updateLocation } = useUpdateLocation({
    onCompleted: onSuccess,
    onError: (error) => {
      console.error(error)
    }
  })

  const defaultOptions = {
    control: control,
    errors: errors,
    register: register
  }

  const onSubmit = async (form: LocationFormType) => {
    if (defaultValues?.id) {
      await updateLocation({ variables: { locationId: defaultValues.id, set: form } })
    } else {
      await createLocation({
        variables: { object: { ...form, account_id: user.account_id } }
      })
    }
  }
  return (
    <Form id="offCanvasForm" handleSubmit={handleSubmit(onSubmit)}>
      <FormLabel label="Name">
        <FormField {...defaultOptions} name="name" />
      </FormLabel>
      <FormLabel label="Status">
        <SelectField {...defaultOptions} name="status" options={statusActive} />
      </FormLabel>
    </Form>
  )
}
