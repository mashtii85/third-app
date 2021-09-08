/**
 * Components - Users - List - Form
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
import { statusActive } from '../../constants/status'
import { UserFormProps } from './types.d'

export const UserForm = ({ defaultValues, submit }: UserFormProps) => {
  const { errors, handleSubmit, register } = useForm({
    defaultValues: defaultValues,
    resolver: yupResolver(schema)
  })

  const defaultOptions = {
    errors: errors,
    register: register
  }

  return (
    <Form id="offCanvasForm" handleSubmit={handleSubmit(submit)}>
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
              {errors?.custom_fields?.phone && errors?.custom_fields?.phone?.type === 'matches' && (
                <FormError message={errors?.custom_fields?.phone?.message} />
              )}
            </FormLabel>
          </Column>
        </Row>

        <FormLabel label="Status">
          <SelectField {...defaultOptions} name={'status'} options={statusActive} />
          {errors.status && errors.status.type === 'required' && (
            <FormError message={errors?.status?.message || ''} />
          )}
        </FormLabel>
        <FormField {...defaultOptions} name="id" type="hidden" />
      </>
    </Form>
  )
}
