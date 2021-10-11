/**
 * Components - Accounts - Form
 */

import { ACCOUNT_TYPE } from '../../../../types/account'
import { LooseObject } from '../../../../types/object'
import { CreateAccountForm } from './types'

export const prepareCreateAccount = (
  form: CreateAccountForm,
  accountType?: ACCOUNT_TYPE,
  accountId?: number
): LooseObject => {
  const data = {
    name: form.name,
    status: form.status,
    custom_fields: form.custom_fields,
    taxonomy_id: form.taxonomy.value,
    client_id: accountId,
    type: accountType,
    users: {
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
      custom_fields: form.custom_fields
      // client_id: clientId
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
