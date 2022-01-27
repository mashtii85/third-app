/**
 * Components - Addresses - Form - Add
 */

// React Hook Form
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

// Hooks
import { useCreateAddress } from '../../hooks/useCreate/useCreate'
import { useUpdateAddress } from '../../hooks/useUpdate/useUpdate'

// UI
import { Input, Form, Label, Row, Column } from '@drykiss/industry-ui'
import { addressSchema as schema } from './schema'

// Types
import { AddressFormType, UseAddressProps } from '@availabletowork/types'

export const AddressForm = ({
  filters,
  onSuccess,
  defaultValues
}: {
  filters: Partial<UseAddressProps>
  onSuccess: () => void
  defaultValues: Partial<AddressFormType>
}) => {
  const {
    control,
    formState: { errors = {} },
    handleSubmit,
    register
  } = useForm<AddressFormType>({
    defaultValues: defaultValues,
    resolver: yupResolver(schema)
  })

  const { createAddress } = useCreateAddress(filters, {
    onCompleted: onSuccess,
    onError: (error) => {
      console.error(error)
    }
  })

  const { updateAddress } = useUpdateAddress({
    onCompleted: onSuccess,
    onError: (error) => {
      console.error(error)
    }
  })

  const defaultOptions = {
    control: control,
    errors: errors,
    register: register,
    showError: true
  }

  const onSubmit = async (form: AddressFormType) => {
    if (defaultValues?.id) {
      updateAddress({ variables: { id: defaultValues.id, changes: form } })
    } else {
      const variables = {
        entity: filters.entity,
        entity_id: filters.entityId,
        name: form.name,
        line1: form.line1,
        line2: form.line2,
        line3: form.line3,
        city: form.city,
        postcode: form.postcode,
        county: form.county,
        status: defaultValues.status
      }
      await createAddress({ variables: { objects: [variables] } })
    }
  }

  return (
    <Form id="offCanvasForm" handleSubmit={handleSubmit(onSubmit)}>
      <Row>
        <Column md={12}>
          <Label label="Address name">
            <Input {...defaultOptions} name="name" />
          </Label>
        </Column>

        <Column md={6}>
          <Label label="Address Line 1">
            <Input {...defaultOptions} name="line1" />
          </Label>
        </Column>

        <Column md={6}>
          <Label label="Address Line 2">
            <Input {...defaultOptions} name="line2" />
          </Label>
        </Column>

        <Column md={6}>
          <Label label="Address Line 3">
            <Input {...defaultOptions} name="line3" />
          </Label>
        </Column>

        <Column md={6}>
          <Label label="City">
            <Input {...defaultOptions} name="city" />
          </Label>
        </Column>

        <Column md={6}>
          <Label label="Post Code">
            <Input {...defaultOptions} name="postcode" />
          </Label>
        </Column>

        <Column md={6}>
          <Label label="County">
            <Input {...defaultOptions} name="county" />
          </Label>
        </Column>
      </Row>
    </Form>
  )
}
