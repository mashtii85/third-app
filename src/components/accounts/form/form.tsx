/**
 * Components - Accounts - Form
 */

// React Hook Form
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { AccountSchema as schema } from './schema'
// UI
import {
  Column,
  Details2,
  Form,
  FormField,
  FormError,
  FormLabel,
  SelectField,
  Row
} from '@drykiss/industry-ui'
import { AddButton } from '../../common/buttons/addButton'
import { statusActive } from '../../../constants/status'
import { TaxonomySelect } from './select'
// Hooks
import { useCreateAccount } from '../hooks/useCreate'

// Types
import { AccountFormProps } from './types.d'
import { ACCOUNT_TYPE } from '../../../types/account.d'
import { SubmissionFormProps } from './types'

export const AccountForm = ({ defaultValues, onSuccess }: AccountFormProps) => {
  const { control, errors, handleSubmit, register } = useForm({
    defaultValues,
    resolver: yupResolver(schema)
  })

  const { createAccount } = useCreateAccount({
    onCompleted: onSuccess,
    onError: console.error
  })

  const submit = async ({ taxonomy, ...form }: SubmissionFormProps) => {
    const variables = {
      objects: [
        {
          ...form,
          taxonomy_id: taxonomy.value,
          client_id: defaultValues.clientId
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

  const isClientMember = defaultValues.type === ACCOUNT_TYPE.Client

  return (
    <Form handleSubmit={handleSubmit(submit)}>
      <Details2 open title="Account">
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
      </Details2>
      {isClientMember && (
        <Details2 open title="Member" fitParentHeight={false} uniqueId="1">
          <Row>
            <Column md={6}>
              <TaxonomySelect
                {...defaultOptions}
                label="Member Type"
                name="taxonomy"
                type="members"
              />
            </Column>
          </Row>
        </Details2>
      )}
      <AddButton content="Submit" type="submit" handleClick={console.log}>
        <div></div>
      </AddButton>
      <FormField {...defaultOptions} name="type" type="hidden" />
    </Form>
  )
}
