/**
 * Components - Addresss - Form - Add
 */

// React Hook Form
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

// UI
import { FormField, Form, FormLabel, Row, Column } from '@drykiss/industry-ui'

import { addressSchema as schema } from './schema'

// Types
import { AddressFormType } from './types'
import { useCreateAddress } from '../../hooks/useCreate/useCreate'
import { useUpdateAddress } from '../../hooks/useUpdate/useUpdate'
import { LooseObject } from '../../../../types/object'
import { ADDRESS_STATUS } from '../../../../types/address.d'
import { UseAddressProps } from '../../hooks/types'

export const AddressForm = ({
  filters,
  onSuccess,
  defaultValues = {}
}: {
  filters: UseAddressProps
  onSuccess: () => void
  defaultValues: AddressFormType | LooseObject
}) => {
  const { control, errors, handleSubmit, register } = useForm<AddressFormType>({
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
    register: register
  }

  const onSubmit = async (form: AddressFormType) => {
    if (defaultValues?.id) {
      updateAddress({ variables: { id: defaultValues.id, changes: form } })
    } else {
      const variables = {
        entity: filters.entity,
        entityId: filters.entityId,
        name: form.name,
        line1: form.line1,
        line2: form.line2,
        line3: form.line3,
        city: form.city,
        postcode: form.postcode,
        county: form.county,
        status: ADDRESS_STATUS.Active,
        metaType: filters.type
      }
      await createAddress({ variables: variables })
    }
  }

  return (
    <Form id="offCanvasForm" handleSubmit={handleSubmit(onSubmit)}>
      {/* {defaultValues.id && <FormField {...defaultOptions} name="id" type="hidden" />} */}
      <Row>
        <Column md={12}>
          <FormLabel label="Address name">
            <FormField {...defaultOptions} name="name" />
          </FormLabel>
        </Column>

        <Column md={6}>
          <FormLabel label="Address Line 1">
            <FormField {...defaultOptions} name="line1" />
          </FormLabel>
        </Column>

        <Column md={6}>
          <FormLabel label="Address Line 2">
            <FormField {...defaultOptions} name="line2" />
          </FormLabel>
        </Column>

        <Column md={6}>
          <FormLabel label="Address Line 3">
            <FormField {...defaultOptions} name="line3" />
          </FormLabel>
        </Column>

        <Column md={6}>
          <FormLabel label="City">
            <FormField {...defaultOptions} name="city" />
          </FormLabel>
        </Column>

        <Column md={6}>
          <FormLabel label="Post Code">
            <FormField {...defaultOptions} name="postcode" />
          </FormLabel>
        </Column>

        <Column md={6}>
          <FormLabel label="County">
            <FormField {...defaultOptions} name="county" />
          </FormLabel>
        </Column>
        {/* {defaultValues.status &&
           <FormField {...defaultOptions} name="status" type="hidden" />} */}
      </Row>
    </Form>
  )
}
