/**
 * Components - Accounts - Form
 */

import { ACCOUNT_TYPE } from '../../../types/account'
import { LooseObject } from '../../../types/object.d'
import { CreateAccountForm } from './types.d'

export const prepareCreateAccount = (form: CreateAccountForm, type?: ACCOUNT_TYPE): LooseObject => {
  const data = {
    name: form.name,
    status: form.status,
    type,
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
  const variables = {
    accountId,
    accountSet: {
      name: form.name,
      status: form.status,
      taxonomy_id: form.taxonomy.value
    },
    userId,
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
