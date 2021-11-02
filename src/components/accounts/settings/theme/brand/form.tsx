/**
 * Components - Accounts - Settings - Theme - Brand
 *
 * Allows a client to update brand details
 */

// React Hook Form
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { BrandSchema as schema } from './schema'

// Lodash
import cloneDeep from 'lodash/cloneDeep'

// UI
import { Form, FormError, FormField, FormLabel, useConfig } from '@drykiss/industry-ui'
import { useUpdateAccount } from '../../../hooks'

// Types
import { Account } from '../../../../../types/account'

export const BrandForm = ({
  account,
  handleSuccess
}: {
  account: Account | undefined
  handleSuccess: () => void
}) => {
  const { config, setConfig } = useConfig()

  const { updateAccount } = useUpdateAccount({
    onCompleted: () => { },
    onError: (error) => {
      console.error(error.message)
    }
  })

  const defaults = {
    name: config?.Brand?.name || account?.name || ''
  }

  const { control, errors, handleSubmit, register } = useForm({
    defaultValues: { ...defaults },
    resolver: yupResolver(schema)
  })

  const onSubmit = async (form: any) => {
    const updatedBrand = { ...config.Brand }
    updatedBrand.name = form.name

    const meta = account?.meta ? cloneDeep(account?.meta) : { config: {} }
    meta.config = meta.config ? { ...meta.config, Brand: updatedBrand } : { Brand: updatedBrand }

    setConfig({ ...config, Brand: updatedBrand })

    // Update a
    await updateAccount({
      variables: {
        accountId: account?.id,
        accountSet: {
          meta
        },
        hasUser: false
      }
    })

    handleSuccess()
  }

  const defaultOptions = {
    control: control,
    errors: errors,
    register: register
  }

  return (
    <Form id="offCanvasForm" handleSubmit={handleSubmit(onSubmit)}>
      <FormLabel label="Name">
        <FormField {...defaultOptions} name="name" />
        {errors.name && errors.name.type === 'required' && (
          <FormError message={errors?.name?.message} />
        )}
      </FormLabel>
    </Form>
  )
}
