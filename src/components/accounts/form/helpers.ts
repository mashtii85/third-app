/**
 * Components - Accounts - Form
 */

import { LooseObject } from '../../../types/object.d'
import { CreateAccountForm } from './types.d'

export const prepareCreateAccount = (form: CreateAccountForm): LooseObject => {
  const data: any = {
    name: form.name,
    status: form.status,
    custom_fields: form.custom_fields,
    taxonomy_id: form.taxonomy.value,
    client_id: form.client_id,
    type: form.type
  }
  if (form?.add_contact_user) {
    data.users = {
      data: {
        status: form.status,
        user: {
          data: {
            email: form.email,
            name_first: form.firstName,
            name_last: form.lastName,
            status: form.status
          }
        }
      }
    }
  }
  return data
}

export const prepareUpdateAccount = ({
  form,
  accountId,
  userId
}: {
  form: CreateAccountForm
  accountId: number
  userId: number
}): LooseObject => {
  const variables: any = {
    accountId,
    userId: userId,
    status: form.status,
    accountSet: {
      name: form.name,
      status: form.status,
      taxonomy_id: form.taxonomy.value,
      custom_fields: form.custom_fields,
      client_id: form.clientId
    },
    userSet: {
      email: form.email,
      name_first: form.firstName,
      name_last: form.lastName,
      status: form.status,
      taxonomy_id: form.taxonomy.value
    }
  }

  return variables
}
